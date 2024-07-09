import React, { useState } from 'react'
import Dashboard from '../components/Dashboard'
import Navigationbar from '../components/Navbar';
import {ParsedData} from '../components/Navbar'

// interface ParsedData {
//   [key: string]: any;


// }

function DashboardPage() {
  const [isFile,setIsFile]=useState(false);
  const [fileData , setFileData] = useState<ParsedData[]>([]);
  const handleFileUpload= async(Data : ParsedData[] )=>{
    

  try {
    const response = await fetch('https://fakestoreapi.com/products');
    const data: any[] = await response.json();
    const images: string[] = [];

    data.forEach((item: any) => {
      if (item.category === "men's clothing" || item.category === "women's clothing" && images.length < 19) {
        images.push(String(item.image));
      }
    });

    Data.forEach((item, i) => {
          if (i < images.length) {
            item.img = images[images.length-i-1];
          } else {
            item.img = images[images.length - (i-images.length) -1]; // Or handle accordingly if there are not enough images
          }
        });
    console.log(Data);

  } catch (error) {
    console.error('Error fetching T-shirt images:', error);
  }

    setFileData(Data);
    setIsFile(true);
  }
  return (
    <div>
      <div>
        <Navigationbar isFileUploaded={isFile} onFileUpload={handleFileUpload} />
      </div>
      <Dashboard isFileUploaded={isFile} fileData={fileData}/>
    </div>
  )
}

export default DashboardPage
