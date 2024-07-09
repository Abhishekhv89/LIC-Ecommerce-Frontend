import { useEffect, useState } from 'react'
import { useAuthContext } from '../hooks/useAuthContext'
import { useNavigate } from 'react-router-dom'
import axios from 'axios'
import toast from 'react-hot-toast';
import { useLogout } from '../hooks/useLogout'
import { Button, Center, Flex, Grid, GridItem, Show, SimpleGrid, Text } from '@chakra-ui/react'
import {ParsedData} from './Navbar'
import ItemCard from './ItemCard'
import BrandsDisplay from './MUltiCheckBox'
import SellersDiplay from './MUltiCheckBox'
import "../CSS/style.css"
import "bootstrap/dist/css/bootstrap.min.css";
import { tShirtBrands,sellers } from './constants'
import SearchInput from './SearchInput'
import { LiaRupeeSignSolid } from 'react-icons/lia'
import Range from './Range'



interface props{
  isFileUploaded:boolean
   fileData:ParsedData[]
}



function Dashboard({isFileUploaded,fileData}:props) {
const {user}:any = useAuthContext();
  const navigate = useNavigate();

const {logout} = useLogout();

   useEffect(()=>{
    if(user){
      
      axios.get("http://localhost:3001/profile",{
            headers:{
              "Authorization":`Bearer ${user.token}`
            }}).then(result=>{
              if(result.data.auth){
               
                
              }else if(result.data.error){
                toast.error(result.data.error);
                 logout()
                navigate('/login');
              }
             
            })
              .catch(error=>console.log(error))
       
    }
   
        
  },[user])


  
    if(!user){
      logout()
    navigate('/login');
  }


useEffect(()=>{
 
  if(fileData.length){
       const minPrice = fileData.reduce((min, item) => item.price < min ? item.price : min, fileData[0].price);
       const maxPrice = fileData.reduce((max, item) => item.price > max ? item.price : max, fileData[0].price);
   setRange([minPrice,maxPrice]);
  }
  
},[fileData])
 
const [range,setRange] = useState([0,5000]);

const [selectedBrands, setsSelectedBrands] = useState<string[]>([]);
const [selectedSellers,setSelectedSellers] = useState<string[]>([]);

  const handleBrands = (e: React.ChangeEvent<HTMLInputElement>) => {
        const value = e.target.value;
        setsSelectedBrands(prev =>
            e.target.checked ? [...prev, value] : prev.filter(item => item !== value)
        );
    };

    const handleSellers = (e: React.ChangeEvent<HTMLInputElement>) => {
        const value = e.target.value;
        setSelectedSellers(prev =>
            e.target.checked ? [...prev, value] : prev.filter(item => item !== value)
        );
    };

    const handleSearch = (searchText:string)=>{
      if(searchText.length){
         setsSelectedBrands([searchText.toUpperCase()])
      }
      else
      setsSelectedBrands([])
    }

    const handleRange =(val:number[])=>{
      setRange(val);
    }


  const [itemDisplayCount, setItemDisplayCount] = useState(9); // State to manage number of items displayed
  useEffect(()=>{
    setItemDisplayCount(9);
  },[selectedBrands,selectedSellers,range])
   
  const filteredItems = fileData.filter((item) => (
    ((selectedBrands.length === 0 || selectedBrands.includes(item.brand)) &&
    (selectedSellers.length === 0 || selectedSellers.includes(item.seller)) &&
    (range[0] <= item.price && item.price <= range[1]))
  ));

  const itemsToShow = filteredItems.slice(0, itemDisplayCount);

  const handleShowMore = () => {
    setItemDisplayCount(itemDisplayCount + 9); // Increase display count by 10 on "show more"
  };

   

  return (
   <div className='dashboard-container'>
    {!isFileUploaded && <center  style={{height:'38.8em'}}>
        <h1 className='mt-5'> Please upload Data file to view the gallery </h1> 
           
        </center> }
     {isFileUploaded &&
     <>
        <Grid 
        templateAreas={{
          base:`" main main"`,
          lg:`"aside main"`
        }}
         templateColumns='repeat(7, 1fr)'>
       
      <Show above='lg'>
      <GridItem colSpan={{base:0 , lg:1}} area='aside' bg='#171717' width={'370px'} className="sticky-container">
        
       <SimpleGrid 
  columns={1} 
  width={'150px'}
>
  <center>
    <h2 style={{ width: '350px', marginTop: '100px' }}>
      <Text><u>Filters</u></Text>
    </h2>
  </center>
  <div className="brands">
    <BrandsDisplay list={tShirtBrands} onChange={handleBrands} title={'Brands'} />
  </div>

  <div className="rangeContainer">
    <Text fontSize={'25px'} margin={'0px 0px 7px 9px'}>
      Price:
    </Text>
    <div className="range">
      <div className="rangeDiv">
        <div className="d-flex">
          <LiaRupeeSignSolid className='mt-1'/>{range[0]}
        </div>
      </div>
      <Range range={range} onChangeRange={handleRange}/>
      <div className="rangeDiv">
        <div className="d-flex">
          <LiaRupeeSignSolid className='mt-1'/>{range[1]}
        </div>
      </div>
    </div>
  </div>

  <div className="sellers">
    <SellersDiplay list={sellers} onChange={handleSellers} title={'Sellers'}/>
  </div>
</SimpleGrid>


      </GridItem>
      </Show>    
  
     <GridItem area='main'
      padding={'10'}
colSpan={{base:7,lg:6}}
className="sticky-container"
     >
          <SearchInput onSearch={handleSearch}/>
        <SimpleGrid 
  columns={3} 
  spacing={10} 
  paddingLeft={{ lg: '0', sm: '7' }} 

>
  {itemsToShow.map((item, i) => (
        <Center key={item.slno}>
          <ItemCard item={item}/>
        </Center>
      ))}


</SimpleGrid>
 
      {filteredItems.length > itemDisplayCount && (
       <center><Button  
       onClick={handleShowMore} 
       size='lg'
       height='48px'
       width='450px' 
       margin={'40px 0px'}
       colorScheme='teal'
       >
        Show More
        </Button></center>  
      )}

     </GridItem>
 
</Grid>

     </>
      
     }
       
          
      </div>
  )
}

export default Dashboard
