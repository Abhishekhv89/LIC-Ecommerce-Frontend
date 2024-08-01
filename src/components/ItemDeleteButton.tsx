import { Button } from '@chakra-ui/react'
import axios from 'axios';
import React from 'react'
import { useAuthContext } from '../hooks/useAuthContext';
import { CartItem } from '../interfaces/cartItemsInterface';
import { useCart } from '../context/CartContext';
import { useNavigate } from 'react-router-dom';


interface Props{
    productId:string;
    // handleDelete:(cart:CartItem[])=>void;
}
function ItemDeleteButton({productId}:Props) {

    const { user }: any = useAuthContext();
    const { cartItems, addToCart, removeFromCart, clearCart } = useCart();
    const navigate = useNavigate();
  const onDelete =(productId:string)=>{

if(user){
axios.post(`http://localhost:3001/cart/${user.userId}/remove`, { productId})
      .then(res => {
        // console.log("res.data : ",res.data);
        // setItemsAddedToCart(res.data);
        // handleDelete(res.data);
        removeFromCart(productId);
        
        // setShowCart(true);
      })
      .catch(e => {
        console.log("error : ", e);
      });
}
  
}
  return (
    <div className='deleteButton'>
      <Button size="sm" onClick={() => onDelete(productId)} colorScheme='red'>remove</Button>
    </div>
  )
}

export default ItemDeleteButton
