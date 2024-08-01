import React, { useEffect, useState } from 'react';
import { Button } from 'react-bootstrap';
import { NavLink, useLocation, useNavigate } from 'react-router-dom';
import { useAuthContext } from '../hooks/useAuthContext';
import { useLogout } from '../hooks/useLogout';
import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
// import "../CSS/style.css";
import Form from 'react-bootstrap/Form';
import * as XLSX from 'xlsx';
import { Avatar } from '@chakra-ui/react';
import axios from 'axios';
import toast from 'react-hot-toast';
import { ParsedData } from '../interfaces/ParsedDataInterface';
import { Props } from '../interfaces/NavebarInterface';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCartShopping } from '@fortawesome/free-solid-svg-icons';
import { User } from '../interfaces/userInterface';
import { useCart } from '../context/CartContext';

const Navigationbar: React.FC<Props> = ({ onFileUpload = () => { }, isFileUploaded }: Props) => {
  const { cartItems, addToCart, removeFromCart, clearCart } = useCart();
  const [isDisabled, setIsDisabled] = useState(true);
  const { logout } = useLogout();
  const navigate = useNavigate();
  const location = useLocation();

  const handleLogout = () => {
    logout();
    setIsOpen(false);
    // navigate('/login');
  };

  const [productData, setProductData] = useState<ParsedData[]>([]);
  const [isOpen, setIsOpen] = useState(false);

  const handleUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    setIsOpen(false);
    const file = e.target.files?.[0];
    if (!file) {
      setIsDisabled(true);
      return;
    }

    const reader = new FileReader();
    reader.readAsBinaryString(file);
    reader.onload = (e: ProgressEvent<FileReader>) => {
      const result = e.target?.result;
      if (typeof result !== 'string') return;

      const workbook = XLSX.read(result, { type: 'binary' });
      const sheetName = workbook.SheetNames[0];
      const sheet = workbook.Sheets[sheetName];
      const parsedData = XLSX.utils.sheet_to_json<ParsedData>(sheet);

      const processedData: ParsedData[] = parsedData.map((item: any) => ({
        ...item,
        sizes: typeof item.sizes === 'string' ? item.sizes.split(',').map((s: any) => s.trim()) : item.sizes,
        images: typeof item.images === 'string' ? item.images.split(',').map((s: any) => s.trim()) : item.images
      }));
      setProductData(processedData);
      setIsDisabled(false);
    };
  };

  const handleClick = async (e: any) => {
    setIsOpen(false);
    try {
      // e.preventDefault();
      const { data } = await axios.post('http://localhost:3001/product/upload', productData);
      // console.log(data);
      if (!data.error && data.success) {
        toast.success(`file uploaded successfully`);
        setIsOpen(false);
        onFileUpload();
      } else {
        toast.error(data.error);
      }
    } catch (error) {
      console.log("error while uploading :", error);
    }
  };

  const toggleDropdown = () => setIsOpen(!isOpen);
  
  useEffect(()=>{
    setIsOpen(false);
  },[])

  const [userDetail, setUserDetail] = useState<User | null>(null);
  const { user }: any = useAuthContext();

  useEffect(() => {
    if(user){
      axios.get(`http://localhost:3001/${user.userId}`)
      .then(res => {
        if (res.data.error) {
          // console.log("error: ",res.data.error);
          const store = localStorage.getItem("user");
          if (store) {
            let user = JSON.parse(store);
            user = { ...user, role: "user" }
            localStorage.setItem("user", JSON.stringify(user));
          }
        }

        if (res.data.user) {
          const userRole = res.data.user.role;
          if (userRole === "admin") {
            const store = localStorage.getItem("user");
            if (store) {
              let user = JSON.parse(store);
              user = { ...user, role: "admin" };
              localStorage.setItem("user", JSON.stringify(user));
            }
          }
          setUserDetail(res.data.user);
        }
      })
      .catch(e => {
        console.log(e);
      });
    }
   
    
  }, [user, userDetail]);

  return (
    
      <Navbar expand="lg" className='navbar sticky'>
        <Container fluid>
          <Navbar.Brand href="/">Logo</Navbar.Brand>
          <Navbar.Toggle aria-controls="navbarScroll" />
          <Navbar.Collapse id="navbarScroll">
            <Nav className="me-auto my-2 my-lg-0" style={{ maxHeight: '140px' }} navbarScroll>
              <NavLink to="/" className={({ isActive }) => isActive ? "nav-link active-link" : "nav-link"}>Home</NavLink>
              <NavLink to="/agentRegistration" className={({ isActive }) => isActive ? "nav-link active-link" : "nav-link"}>Agent Registration</NavLink>
              <NavLink to="/" className={({ isActive }) => isActive ? "nav-link active-link" : "nav-link"}>About</NavLink>
            </Nav>

            {location.pathname === '/dashboard' && userDetail?.role === "admin" && (
              <Form className="d-flex" onSubmit={handleClick}>
                <Form.Control
                  type="file"
                  accept='.xlsx, .xls'
                  placeholder="upload File"
                  className="me-2 input"
                  onChange={handleUpload}
                />
                <Button type="submit" variant="outline-dark" disabled={isDisabled} className='file-btn'>upload file</Button>
              </Form>
            )}

            <Button variant='outline-dark' className='cartButton' onClick={() => navigate('/checkout')}><FontAwesomeIcon icon={faCartShopping} /> {cartItems.length}</Button>

            {user && <div className="user-dropdown">
              <button onClick={toggleDropdown} >
                <div className="navbar-toggler-icon"></div>
              </button>
              {isOpen && (
                <ul className="dropdown-menu">
                  <li><Navbar.Text className='p-1 d-flex'><Avatar size={'sm'} marginRight={3} src='https://bit.ly/broken-link' /><b>{user.username}</b> </Navbar.Text></li>
                  <li><Button variant="outline-dark" size='sm' className='logout-btn' onClick={handleLogout}>Logout</Button></li>
                  {userDetail?.role == 'admin' && <li><Button size='sm' className='logout-btn mb-2' onClick={() => {setIsOpen(false); navigate('/user/admin') }}>Admin Page</Button></li>}
                </ul>
              )}
            </div>}
          </Navbar.Collapse>
        </Container>
      </Navbar>
    
  )
}

export default Navigationbar;
