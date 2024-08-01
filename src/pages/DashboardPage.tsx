import React, { useEffect, useState } from 'react'
import Dashboard from '../components/Dashboard'
import Navigationbar from '../components/Navbar';
import {ParsedData} from '../interfaces/ParsedDataInterface'
import axios from 'axios';
import "../CSS/style.css"
// import "../CSS/style.css"
// import "bootstrap/dist/css/bootstrap.min.css";

import { useAuthContext } from '../hooks/useAuthContext'
import { useNavigate } from 'react-router-dom'




function DashboardPage() {

   const [isFile,setIsFile]=useState(false);
 

  const {user}:any = useAuthContext();

  useEffect(()=>{
     axios.get("http://localhost:3001/product/isUploaded")
              .then(res=>{
                if(res)
                  setIsFile(res.data);
                  
              })
              .catch(e=>console.log(e))
  },[user])
  

  const handleFileUpload= async( )=>{
  
  try {
    setIsFile(true);
    
  } catch (error) {
    console.error('Error :', error);
  }
  }

 

 
  
  return (
    <div>
      <div>
        {/* <Navigationbar isFileUploaded={isFile} onFileUpload={handleFileUpload} /> */}
      </div>
      
      <Dashboard isFileUploaded={isFile}  />
    </div>
  )
}

export default DashboardPage
