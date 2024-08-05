import React, { useState } from 'react';
import Carousel from 'react-bootstrap/Carousel';
import 'bootstrap/dist/css/bootstrap.min.css';
// import './ProductImage.css'; // Import the CSS file
// 
interface Props {
  images: string[];
}

function ProductImage({ images }: Props) {
  const [index, setIndex] = useState(0);

  const handleSelect = (selectedIndex: number) => {
    setIndex(selectedIndex);
  };

  return (
    <div className="productImg">
      <div className='images d-flex'>
        <div className="preview-images">
        {images.map((image, idx) => (
          <img
            key={idx}
            className={`preview ${idx === index ? 'active' : ''}`}
            src={image}
            alt={`Preview ${idx + 1}`}
            onClick={() => setIndex(idx)}
          />
        ))}
      </div>
      <Carousel activeIndex={index} onSelect={handleSelect} interval={null} className="custom-carousel" variant='dark'>
        
      
        {images.map((image, idx) => (
          <Carousel.Item key={idx}>
            <center><img src={image} alt={`image ${idx + 1}`} className="main-image" /></center>
          </Carousel.Item>
        ))}
      
        
      </Carousel>

      </div>
   
    </div>
  );
}

export default ProductImage;
