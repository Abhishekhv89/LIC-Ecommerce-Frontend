import React from 'react'

import Button from 'react-bootstrap/Button';

import "bootstrap/dist/css/bootstrap.min.css";
import { useNavigate } from 'react-router-dom';
import Breadcrumbs from '../components/Breadcrumbs';


function Home() {
const navigate = useNavigate();

  const handler = ()=>{
    navigate('/login');
  };
   const crumbs = [
    { name: 'Home', path: '/', active: true },
  ];
  return (
    <div>
      <div className="mx-3"><Breadcrumbs crumbs={crumbs} /></div>
      
     <center ><h1>HOME PAGE</h1>

      <Button onClick={handler}> Login page</Button>
      </center> 
    </div>
  )
}

export default Home
