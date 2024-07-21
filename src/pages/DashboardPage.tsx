import React, { useEffect, useState } from 'react'
import Dashboard from '../components/Dashboard'
import Navigationbar from '../components/Navbar';
import {ParsedData} from '../interfaces/ParsedDataInterface'
import axios from 'axios';
import { useAuthContext } from '../hooks/useAuthContext'
import { useNavigate } from 'react-router-dom'




function DashboardPage() {

   const [isFile,setIsFile]=useState(false);
   const navigate = useNavigate();
   const[data,setData]= useState<ParsedData[]>([]);

  const {user}:any = useAuthContext();

  useEffect(()=>{
     axios.get("http://localhost:3001/product/isUploaded")
              .then(res=>{
                if(res)
                  setIsFile(res.data);
                  
              })
              .catch(e=>console.log(e))
  },[user])
  
 const [isRefresh,setIsRefreash]=useState(false);
  // const [fileData , setFileData] = useState<ParsedData[]>([]);
  const handleFileUpload= async( )=>{
  
  try {
    // const response = await fetch('https://fakestoreapi.com/products');
    // const data: any[] = await response.json();
    // const images: string[] = [];

    // data.forEach((item: any) => {
    //   if (item.category === "men's clothing" || item.category === "women's clothing" && images.length < 19) {
    //     images.push(String(item.image));
    //   }
    // });

    // Data.forEach((item, i) => {
    //       if (i < images.length) {
    //         item.img = images[images.length-i-1];
    //       } else {
    //         item.img = images[images.length - (i-images.length) -1]; // Or handle accordingly if there are not enough images
    //       }
    //     });
    // console.log(Data);
    setIsRefreash(true);
    setIsFile(true);
    
  } catch (error) {
    console.error('Error fetching T-shirt images:', error);
  }

    
  }

  const handleRefreash =(str:boolean)=>{
    
    setIsRefreash(false);
  }

 
  
  return (
    <div>
      <div>
        <Navigationbar isFileUploaded={isFile} onFileUpload={handleFileUpload} />
      </div>
      
      <Dashboard isFileUploaded={isFile} onRefreash={handleRefreash} refreash={isRefresh} />
    </div>
  )
}

export default DashboardPage
