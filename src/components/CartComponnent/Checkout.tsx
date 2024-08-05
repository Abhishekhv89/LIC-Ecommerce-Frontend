import React, { useEffect, useState } from 'react'
import { CartItem } from '../../interfaces/cartItemsInterface'
import { Box, Button, IconButton, Input, InputGroup, InputLeftElement, InputRightElement, Text } from '@chakra-ui/react'
import { Col, Row } from 'react-bootstrap'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faIndianRupeeSign, faMinus, faPlus } from '@fortawesome/free-solid-svg-icons'
import ItemDeleteButton from './ItemDeleteButton'
import Quantity from './Quantity'
import { updateClassDeclaration } from 'typescript'
import { useCart } from '../../context/CartContext'
import axios from 'axios'
import { useAuthContext } from '../../hooks/useAuthContext'
import { useNavigate } from 'react-router-dom'

interface Props{
  cartItems:CartItem[];
  // onDelete:(cart:CartItem[])=>void;
  calcTotal:(totalAmt:number)=>void;
}


function Checkout({calcTotal}:Props) {
  const {  addToCart, removeFromCart, clearCart } = useCart();
  const{user}:any = useAuthContext();
  const [quantities, setQuantities] = useState<Record<string, number>>({});
  const [cartItems,setCartItems] = useState<CartItem[]>([])
  const navigate = useNavigate();
  // const [total,setTotal] =useState(0);

  useEffect(() => {
    // console.log("inside useeffect",cartItems);
    if(user){
      axios.get(`http://localhost:3001/cart/${user.userId}`)
      .then(res => {
        // console.log(res.data);
        addToCart(res.data)
        // console.log(cartItems)

        setCartItems(res.data);
        // console.log(res.data)
        // setCartItems(res.data);


        const initialQuantities: Record<string, number> = {};
    cartItems.forEach(item => {
      initialQuantities[item.product._id] = item.quantity || 1;
    });
    setQuantities(initialQuantities);
    let sum = 0;
    cartItems.forEach(item => {
      sum =sum + item.quantity*item.product.price;
    });

    // setTotal(sum);
    calcTotal(sum);

    
      })
      .catch(e => {
        console.log(e);
      });


    }




  }, [cartItems]);

  useEffect(()=>{
    let sum = 0;
    cartItems.forEach(item => {
      sum =sum + quantities[item.product._id]*item.product.price;
    });

    // setTotal(sum);
    calcTotal(sum);
  },[quantities])

// const handleDelete =(cart:CartItem[])=>{
//     onDelete(cart);
//   }

  const onQuantityChange = (productId:string,newQuantity:number)=>{
    if (newQuantity < 1) return;
    const updatedQuantities = { ...quantities, [productId]: newQuantity };
    setQuantities(updatedQuantities);
  }
// console.log(cartItems);

  return (
    <div className='checkoutContainer'>
      {cartItems.length==0 && <center><h2>No items in the Cart</h2></center>}
        {cartItems.map((item) => (
          <div key={item.product._id} className='checkoutPro'>
          <h3>{item.product.name}</h3>
           <div  className='d-flex'>
            
             {item.product.images && item.product.images.length > 0 ? (
              <img src={item.product.images[0]} alt={item.product.name} />
            ) : (
              <div>No image available</div>
            )}
            <div className='checkoutProDetails'>
                            <Row>
                <Col xs={2} >
                  <h4 className='py-2'>{item.product.name}</h4>
                  <ItemDeleteButton productId={item.product._id}/>
                </Col>
                <Col xs={3}>
                  <h5>Product ID</h5>
                  {item.product._id}
                </Col>
                <Col xs={2}>
                    <h5>Price</h5>
                  <h6><FontAwesomeIcon icon={faIndianRupeeSign} style={{height:"15px"}} className='mt-2 mx-1'/>{item.product.price}</h6> 
                </Col >
                <Col xs={3}>
                   <h5>Quantity</h5>
                   <Quantity onQuantityChange={onQuantityChange} productId={item.product._id} qty={item.quantity} />
                </Col >
                <Col xs={2}>
                  <h5>Total</h5>
                  <h6><FontAwesomeIcon icon={faIndianRupeeSign} style={{height:"15px"}} className='mt-2 mx-1'/>{quantities[item.product._id] * item.product.price}</h6> 
                </Col>
               
              </Row>

              
            </div>
          </div>
          </div>
         
          
        ))}
      
    </div>
  )
}

export default Checkout
