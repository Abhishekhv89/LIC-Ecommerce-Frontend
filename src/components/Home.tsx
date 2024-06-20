import React from 'react'

import Button from 'react-bootstrap/Button';

import "bootstrap/dist/css/bootstrap.min.css";
import { useNavigate } from 'react-router-dom';


function Home() {
const navigate = useNavigate();

  const handler = ()=>{
    navigate('/login');
  }
  return (
    <div>
     <center ><h1>HOME PAGE</h1>

      <Button onClick={handler}> Login page</Button>
      </center> 
    </div>
  )
}

export default Home
