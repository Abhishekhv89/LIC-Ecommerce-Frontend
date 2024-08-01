import { useEffect, useState } from 'react';
import { useAuthContext } from '../hooks/useAuthContext';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import toast from 'react-hot-toast';
import { useLogout } from '../hooks/useLogout';
import { Button, Center, Grid, GridItem, Show, SimpleGrid, Spinner, Text } from '@chakra-ui/react';
import { ParsedData } from '../interfaces/ParsedDataInterface';
import ItemCard from './ItemCard';
import BrandsDisplay from './MUltiCheckBox';
import SellersDiplay from './MUltiCheckBox';
// import "./style.css"
import "../CSS/style.css"
import "bootstrap/dist/css/bootstrap.min.css";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faIndianRupeeSign } from '@fortawesome/free-solid-svg-icons'
import Range from './Range';
import Breadcrumbs from './Breadcrumbs';
import{Props} from '../interfaces/DashboardInterface'
import { User } from '../interfaces/userInterface';
import AutocompleteSearchbar from './AutocompleteSearchbar';
import { Filter } from '../interfaces/FilterInterface';

axios.defaults.withCredentials = true;


const Dashboard = ({ isFileUploaded}: Props) => {
  const { user }: any = useAuthContext();
  const navigate = useNavigate();
  const { logout } = useLogout();
  const [isLoading, setIsLoading] = useState(false);

  const [itemsToShow, setItemsToShow] = useState<ParsedData[]>([]);
  const [currentPage, setCurrentPage] = useState(2);

  const [selectedBrands, setSelectedBrands] = useState<string[]>([]);
  const [selectedSellers, setSelectedSellers] = useState<string[]>([]);
  const [itemDisplayCount, setItemDisplayCount] = useState(9); // State to manage number of items displayed
  const [userDetail,setUserDetail]=useState<User|null>(null);

  const [range, setRange] = useState([0, 5000]);
  const [shouldApplyFilters, setShouldApplyFilters] = useState(false);


  useEffect(() => {
    const fetchInitialItems = async () => {
      setIsLoading(true);
      const initialItems = await fetchItems(1, selectedBrands, selectedSellers, range);
      setItemsToShow(initialItems);

      setIsLoading(false);
    };
    console.log(itemsToShow)
    if (isFileUploaded) {
      fetchInitialItems();
      // setIsProductFound(true);
    }
  }, [isFileUploaded]);



  useEffect(() => {
    if (user) {
      // axios.defaults.withCredentials = true;
      const config = {
      headers: { "Content-Type": "application/json" },
    };
      axios.get("http://localhost:3001/profile",{withCredentials:true}).then(result => {
        if (!result.data.auth) {
          toast.error(result.data.error);
          logout();
          navigate('/login');
        }
      }).catch(error => console.log('Failed to fetch user data:',error.response.data));
    }
  }, [user]);

  useEffect(() => {
    if (shouldApplyFilters) {

      applyFilters();
      setShouldApplyFilters(false);
    }
  }, [shouldApplyFilters]);
const [searchInput,setSearchInput]= useState<Filter[]>([])

  const handleBrands = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    const newArray :string[]= e.target.checked ? [...selectedBrands, value] : selectedBrands.filter(item => item !== value)
    // console.log(newArray);
    
      const updatedBrands:Filter[] = newArray.map(item=>(
      {title:item,group:"Brand"}
      ))

      setSearchInput(updatedBrands);
    
    

    setSelectedBrands(prev =>
      e.target.checked ? [...prev, value] : prev.filter(item => item !== value)
    );

    setShouldApplyFilters(true);
  };

  const handleSellers = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;

    const newArray :string[]= e.target.checked ? [...selectedSellers, value] : selectedSellers.filter(item => item !== value)
    // console.log(newArray);
    
      const updatedSellers:Filter[] = newArray.map(item=>(
      {title:item,group:"Seller"}
      ))

      setSearchInput(updatedSellers);



    setSelectedSellers(prev =>
      e.target.checked ? [...prev, value] : prev.filter(item => item !== value)
    );
    setShouldApplyFilters(true);
  };

  const handleRange = (val: number[]) => {
    setRange(val);
  };

  const applyFilters = async () => {
    setItemsToShow([]);
    setCurrentPage(1);
    setItemDisplayCount(9);
    await loadMoreItems(1, selectedBrands, selectedSellers, range);
  }

  const fetchItems = async (page: number, brands: string[], sellers: string[], priceRange: number[]) => {
    const response = await axios.get(`http://localhost:3001/product/getProducts`, {
      params: {
        page,
        limit: 9,
        brands: brands.join(','),
        sellers: sellers.join(','),
        minPrice: priceRange[0],
        maxPrice: priceRange[1]
      }
    });
    return response.data;
  };

  const loadMoreItems = async (page = currentPage, brands = selectedBrands, sellers = selectedSellers, priceRange = range) => {
    setIsLoading(true);
    const nextPageItems = await fetchItems(page, brands, sellers, priceRange);
    setItemsToShow(prevItems => [...prevItems, ...nextPageItems]);

    setCurrentPage(prevPage => prevPage + 1);
    setIsLoading(false);
    // setIsProductFound(true);
  };



  const handleSearch = async (filters: Filter[]) => {
    setItemsToShow([]);
    setCurrentPage(1);
    setItemDisplayCount(9);
    if (filters.length) {
      let brands : string[]=[]
      let sellers :string[]=[]

      filters.map(filter =>{
        if(filter.group==="Brand"){
          brands.push(filter.title);
        }else if(filter.group==="Seller"){
          sellers.push(filter.title);
        }
      })

      setSelectedBrands(brands);
      setSelectedSellers(sellers)
      await loadMoreItems(1, brands, sellers, range);
    } else {
      setSelectedBrands([]);
      await loadMoreItems(1, [], selectedSellers, range);
    }
  };
   const crumbs = [
    { name: 'Home', path: '/', active: false },
    { name: 'Dashboard', path: '/dashboard', active: true },
  ];


   useEffect(()=>{
    if(user){
      axios.get(`http://localhost:3001/${user.userId}`)
      .then(res => {
        // console.log(res.data)
        if(res.data.error){
          // console.log("error: ",res.data.error);
          

          const store = localStorage.getItem("user");
      //  const data = {...usr,role:"admin"}
      if(store){
        let user = JSON.parse(store);
        user = {...user,role:"user"}
        localStorage.setItem("user",JSON.stringify(user))
      }


        }
        if(res.data.user){
          setUserDetail(res.data.user);
        }
       
      })
      .catch(e => {
        console.log(e);
      });
    }
  },[user,userDetail])

  const [brandsList,setBrandsList]= useState<string[]>([]);
  const [sellersList,setSellersList]= useState<string[]>([]);

  useEffect(() => {
    const fetchFilters = async () => {
      try {
        const { data } = await axios.get("http://localhost:3001/getFilters", { withCredentials: true });
        if (data.error) {
          console.error("Error:", data.error);
        }
        if (data.filters) {
          const filters:Filter[] = data.filters;

        let brands : string[]=[]
       let sellers :string[]=[]

      filters.map(filter =>{
        if(filter.group==="Brand"){
          brands.push(filter.title);
        }else if(filter.group==="Seller"){
          sellers.push(filter.title);
        }
      })

      setBrandsList(brands);
      setSellersList(sellers);

          // setFilters(data.filters);
        }
      } catch (error) {
        console.error("Error:", error);
      }
    };
    fetchFilters();
  }, []);


  return (
    <div className='dashboard-container'>
      
      {!isFileUploaded && (
        <Center style={{ height: '45.6em', paddingTop: '1.5em' }}>
          <h1 className='mt-5'> Please upload Data file to view the gallery </h1>
        </Center>
      )}
      {isFileUploaded && (
        <Grid
          templateAreas={{
            base: ` " main main"`,
            lg: `"aside main"`
          }}
          templateColumns='repeat(7, 1fr)'
        >
          <Show above='lg'>
            
            <GridItem colSpan={{ base: 0, lg: 1 }} area='aside' bg='#171717' width={'370px'} className="sticky-container">
              <SimpleGrid
                columns={1}
                width={'150px'}
              >
                <div style={{ width: '350px',paddingLeft:'13px'}}>
                  <Breadcrumbs crumbs={crumbs}/>
               </div>
                
                <Center style={{ width: '350px' }}>
                  <h2 >
                    <u>Filters</u>
                  </h2>
                </Center>
              
                <div className="brands">
                  <BrandsDisplay list={brandsList} onChange={handleBrands} 
                  title={'Brands'} 
                  selectedItems={selectedBrands} 
                  onClear={()=>{
                    setSelectedBrands([]);
                    setSearchInput(prev => prev.filter(item => item.group !== "Brand"));
                    setShouldApplyFilters(true);

                  }}/>
                </div>
                <div className="rangeContainer">
                  <Text fontSize={'25px'} margin={'0px 0px 7px 9px'}>
                    Price:
                  </Text>
                  <div className="range">
                    <div className="rangeDiv">
                      
                        
                       <FontAwesomeIcon icon={faIndianRupeeSign} style={{height:"15px"}} className='mt-2 mx-1'/>{range[0]}
                      
                    </div>
                    <Range range={range} onChangeRange={handleRange} />
                    <div className="rangeDiv">
                      
                        <FontAwesomeIcon icon={faIndianRupeeSign} style={{height:"15px"}} className='mt-2 mx-1'/>{range[1]}
                      
                    </div>
                    <Button onClick={applyFilters} height={'30px'}>Go</Button>
                  </div>
                </div>
                <div className="sellers">
                  <SellersDiplay list={sellersList}
                  onChange={handleSellers}
                   title={'Sellers'} 
                   selectedItems={selectedSellers} 
                   onClear={()=>{
                    setSelectedSellers([]);
                    setSearchInput(prev => prev.filter(item => item.group !== "Seller"));
                    setShouldApplyFilters(true);
                    }} />
                </div>
              </SimpleGrid>
            </GridItem>
          </Show>
          <GridItem area='main'
            padding={'10'}
            colSpan={{ base: 7, lg: 6 }}
            className="sticky-container"
          >

            {/* <div className='mt-5'></div> */}
           {userDetail?.role==="admin" && <AutocompleteSearchbar 
           onSearch={handleSearch} 
            placeholder='Search by brand or seller'
            initialFilters={searchInput}
           />} 
            <SimpleGrid
              columns={3}
              spacing={10}
              paddingLeft={{ lg: '0', sm: '7' }}
            >
              {itemsToShow.map((item) => (
                <Center key={item._id}>
                  <ItemCard item={item} />
                </Center>
              ))}
            </SimpleGrid>
            {isLoading && (
              <Center>
                <Spinner
                  thickness='4px'
                  speed='0.75s'
                  emptyColor='gray.200'
                  color='#2adb94'
                  size='xl'
                  marginTop='20px'
                />
              </Center>
            )}
            {itemsToShow.length !==0 && !(itemsToShow.length % 9) && <Center>
              <Button
                onClick={() => loadMoreItems(currentPage)}
                size='lg'
                height='48px'
                width='450px'
                margin={'40px 0px'}
                colorScheme='teal'
              >
                Show More
              </Button>
            </Center>}
            {itemsToShow.length===0 &&<Center > <h2>No product found!!</h2></Center>}
          </GridItem>
        </Grid>
      )}
    </div>
  );
}

export default Dashboard;

