import React, { useState } from 'react'
import { Button } from 'react-bootstrap'
import { useNavigate } from 'react-router-dom'
import { useAuthContext } from '../hooks/useAuthContext'
import { useLogout } from '../hooks/useLogout'
import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar  from 'react-bootstrap/Navbar';
import "../CSS/style.css"
import Form from 'react-bootstrap/Form';
import * as XLSX from 'xlsx'
import { IoReorderThreeOutline } from "react-icons/io5";
import { Avatar } from '@chakra-ui/react'

export interface ParsedData {
  slno:number,
  name:string,
  brand:string,
  category:string,
  size:number,
  quantity:	number,
  price:number,
  seller:string,
  img:string,

}

interface props{
  isFileUploaded:boolean,
  onFileUpload:(item:ParsedData[])=>void;
}


function Navigationbar({onFileUpload,isFileUploaded}:props) {
    
    const {logout} = useLogout();
    const navigate = useNavigate();
    const handleLogout =()=>{
    logout()
    navigate('/login');
    }

      const [data, setData] = useState<ParsedData[]>([]);
      const [isOpen, setIsOpen] = useState(false);

    
      // const 
      const handleUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
        setIsOpen(false)
    const file = e.target.files?.[0];
    if (!file) return;

    const reader = new FileReader();
    reader.readAsBinaryString(file);
    reader.onload = (e: ProgressEvent<FileReader>) => {
      const result = e.target?.result;
      if (typeof result !== 'string') return;

      const workbook = XLSX.read(result, { type: 'binary' });
      const sheetName = workbook.SheetNames[0];
      const sheet = workbook.Sheets[sheetName];
      const parsedData = XLSX.utils.sheet_to_json<ParsedData>(sheet);
      setData(parsedData);
    };
  };

    
    const handleClick = ()=>{
      // console.log(data)
      setIsOpen(false)
      onFileUpload(data);
    }


 
  

  const toggleDropdown = () => setIsOpen(!isOpen);


    const {user}:any = useAuthContext();
  return (
    <div >
      <Navbar expand="lg" fixed="top" className='navbar'>
      <Container fluid>
        <Navbar.Brand  href="/">Logo</Navbar.Brand>
        <Navbar.Toggle aria-controls="navbarScroll" />
        <Navbar.Collapse id="navbarScroll">
          <Nav
            className="me-auto my-2 my-lg-0"
            style={{ maxHeight: '140px' }}
            navbarScroll
          >
            <Nav.Link href="/">Home</Nav.Link>
            <Nav.Link href="#Agent registration">Agent Registration</Nav.Link>
            <Nav.Link href="#About">About</Nav.Link>
          </Nav>
          {!isFileUploaded &&
          <Form className="d-flex">
            <Form.Control
              type="file"
              accept='.xlsx, .xls'
              placeholder="upload File"
              className="me-2"
              //  value={file}
              onChange={handleUpload}

            />
            <Button variant="outline-dark" className='file-btn' onClick={handleClick}>upload file</Button>
          </Form>
          }

         {/* <Dropdown.Item href="#/action-1"> </Dropdown.Item>
        <Dropdown.Item href="#/action-2"></Dropdown.Item> */}
          
          {user&& <div className="user-dropdown">
      <button onClick={toggleDropdown} >
        {/* <IoReorderThreeOutline size={50}/> */}
        <div className="navbar-toggler-icon"></div>
      </button>
      {isOpen && (
        <ul className="dropdown-menu">
          <li><Navbar.Text className='p-2'><b>{user.username}</b> <Avatar size={'sm'} marginLeft={3} src='https://bit.ly/broken-link' /></Navbar.Text></li>
          <li><Button variant="outline-dark" size='sm' className='logout-btn' onClick={handleLogout}>Logout</Button></li>
        </ul>
      )}
    </div>}
        
        </Navbar.Collapse>
      </Container>
    </Navbar>

       
    </div>
  )
}

export default Navigationbar
