import React, { useEffect, useState } from 'react'
import Checkout from '../components/Checkout'
import { useAuthContext } from '../hooks/useAuthContext';
import axios from 'axios';
import { ParsedData } from '../interfaces/ParsedDataInterface';
import Navigationbar from '../components/Navbar';
import Breadcrumbs from '../components/Breadcrumbs';
import { Col, Row } from 'react-bootstrap';
import { Button } from '@chakra-ui/react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faIndianRupeeSign } from '@fortawesome/free-solid-svg-icons';
import { useNavigate } from 'react-router-dom';
import { useCart } from '../context/CartContext';


interface CartItem{
  product:ParsedData;
  _id:string;
  quantity: number;
}

function CheckoutPage() {
  const [totalAmt,setTotalAmt] = useState(0);
  const { user }: any = useAuthContext();
  // const [cartItems, setCartItems] = useState<CartItem[]>([]);
  const { cartItems,addToCart, removeFromCart, clearCart } = useCart();
  // const [cartItems,setCartItems] = useState<CartItem[]>([])

  const navigate= useNavigate();
  //  useEffect(() => {
  //   axios.get(`http://localhost:3001/cart/${user.userId}`)
  //     .then(res => {
  //       // console.log(res.data);
  //       addToCart(res.data)
  //       // console.log(cartItems)

  //       setCartItems(res.data);
  //       // console.log(res.data)
  //       // setCartItems(res.data);
  //     })
  //     .catch(e => {
  //       console.log(e);
  //     });
      
  // }, []);

  // const onDelete = (cart:CartItem[])=>{
  //   setCartItems(cart);
  // }
const crumbs = [
    { name: 'Home', path: '/', active: false },
    { name: 'Dashboard', path: '/dashboard', active: false },
    {name:'Checkout',path:'/checkout',active: true }
  ];

  const getTotal=(totalAmt:number)=>{
    setTotalAmt(totalAmt);
  }
// console.log(cartItems)
  return (
    <div className='checkoutPage'>
      <div style={{paddingLeft:'13px' }}>
                  <Breadcrumbs crumbs={crumbs}/>
               </div>
       {/* <Navigationbar /> */}
       <div className='d-flex'>
        <div className='cartItems'>
        <Checkout cartItems={cartItems} calcTotal={getTotal}/>
        </div>

        
        <div className='grandTotalContainer'>
          <div className="grandTotal">
           <h4 className='mt-3'>PRICE DETAILS</h4> 
            <hr/>
            <div className="d-flex justify-content-between ">
              <div><h5>Price ({cartItems.length} items)</h5></div>
              <div><h5><FontAwesomeIcon icon={faIndianRupeeSign} style={{height:"17px"}} className='mt-1 mx-1'/>{totalAmt}</h5></div>
            </div>
            <div className="d-flex justify-content-between ">
              <div><h5>Discount </h5></div>
              <div><h5>- 0</h5></div>
            </div>
            <hr style={{borderTop: 'dashed' }} /> 
         
         <div className="d-flex justify-content-between my-2">
              <div><h4>Total Amount </h4></div>
              <div><h4><FontAwesomeIcon icon={faIndianRupeeSign} style={{height:"19px"}} className='mt-1 mx-1'/>{totalAmt}</h4></div>
            </div>
            
            <hr style={{borderTop: 'dashed' }}/> 

             <Row className='mt-4'>
        <Col><center><Button
        // bgColor={'#ef7a0b'}
        colorScheme='orange'
        width='160px'
        height='50px'
        onClick={()=>{navigate('/dashboard')}}
        >
          Continue shopping
        </Button></center>
        </Col>

        <Col><center><Button colorScheme={'blue'}
        width='160px'
        height='50px'
        // onClick={onCheckout}
        >
          Checkout
          </Button></center>
          </Col>
      </Row>
          </div>
      </div>
        
       </div>
      
      
    </div>

  )
}

export default CheckoutPage