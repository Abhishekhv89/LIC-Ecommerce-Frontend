import React, { useRef, useState } from 'react'
import { Button } from 'react-bootstrap'
import { useNavigate } from 'react-router-dom'
import { useAuthContext } from '../hooks/useAuthContext'
import { useLogout } from '../hooks/useLogout'
import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import "../CSS/style.css"
import Form from 'react-bootstrap/Form';
import * as XLSX from 'xlsx'

import { Avatar } from '@chakra-ui/react'
import axios from 'axios'
import toast from 'react-hot-toast'
import { ParsedData } from '../interfaces/ParsedDataInterface';
import {Props}from '../interfaces/NavebarInterface'




const Navigationbar: React.FC<Props> = ({ onFileUpload = () => { }, isFileUploaded }:Props) => {
  const { logout } = useLogout();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout()
    navigate('/login');
  }

  const [data, setData] = useState<ParsedData[]>([]);
  const [isOpen, setIsOpen] = useState(false);
 

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

  const handleClick = async(e:any) => {
    // e.preventDefault();
    
    data.map( async (product) =>{
      const {data} = await axios.post('http://localhost:3001/product/upload',{...product});
    })
    toast.success(` file uploaded succssfully`);
    // const form = document.querySelector(".input") as HTMLInputElement;
    // form.value='';
    setIsOpen(false)
     onFileUpload();
  }

  const toggleDropdown = () => setIsOpen(!isOpen);

  const { user }: any = useAuthContext();
  return (
    <div>
      <Navbar expand="lg" fixed="top" className='navbar'>
        <Container fluid>
          <Navbar.Brand href="/">Logo</Navbar.Brand>
          <Navbar.Toggle aria-controls="navbarScroll" />
          <Navbar.Collapse id="navbarScroll">
            <Nav
              className="me-auto my-2 my-lg-0"
              style={{ maxHeight: '140px' }}
              navbarScroll
            >
              <Nav.Link href="/">Home</Nav.Link>
              <Nav.Link href="/agentRegistration">Agent Registration</Nav.Link>
              <Nav.Link href="#About">About</Nav.Link>
              <Nav.Link href="/dashboard">Dashboard</Nav.Link>
            </Nav>
            
              <Form className="d-flex" onSubmit={handleClick}>
                <Form.Control
                  type="file"
                  accept='.xlsx, .xls'
                  placeholder="upload File"
                  className="me-2 input"
                  onChange={handleUpload}
                
                />
                <Button type="submit" variant="outline-dark" className='file-btn'>upload file</Button>
              </Form>
            

            {user && <div className="user-dropdown">
              <button onClick={toggleDropdown} >
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
