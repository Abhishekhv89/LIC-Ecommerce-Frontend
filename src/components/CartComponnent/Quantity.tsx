import React, { useEffect, useState } from 'react'
import { useAuthContext } from '../../hooks/useAuthContext';
import axios from 'axios';
// import { CartItem } from '../../interfaces/cartItemsInterface';
import { Box, IconButton, Input, InputGroup, InputLeftElement, InputRightElement } from '@chakra-ui/react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faMinus, faPlus } from '@fortawesome/free-solid-svg-icons';
import { useNavigate } from 'react-router-dom';

interface Props{
    productId:string;
    onQuantityChange:(productId:string,newQuantity:number)=>void;
    qty:number;
}
function Quantity({productId,onQuantityChange,qty}:Props) {

    const [quantity, setQuantity] = useState<number>(qty);
    const navigate = useNavigate();
    // console.log("qty :",quantity);

    const { user }: any = useAuthContext();

  

  const updateCartInDB = async (productId: string, newQuantity: number) => {
    if(user){
try {
      const userId = user.userId; // Replace with actual user ID
      await axios.patch(`http://localhost:3001/cart/${userId}`, { userId, productId, quantity: newQuantity });
    } catch (error) {
      console.error("Failed to update cart in the database", error);
    }
    }
    
  };

  const handleQuantityChange = async(productId: string, newQuantity: number) => {
    if (newQuantity < 1) return;

    // const updatedQuantities = { ...quantities, [productId]: newQuantity };
    // console.log(newQuantity)
    setQuantity(newQuantity);
   await updateCartInDB(productId, newQuantity);
    onQuantityChange(productId,newQuantity);
    
  };

  const incrementQuantity = (productId: string) => {
    handleQuantityChange(productId, quantity + 1);
  };

  const decrementQuantity = (productId: string) => {
    handleQuantityChange(productId, quantity - 1);
  };
  return (
    <Box display='flex' alignItems='center'>
                    <h6>Qty: </h6>
                    <InputGroup size='sm' width='100px' marginLeft={'5px'}>
                      <InputLeftElement>
                        <IconButton
                          aria-label='Decrement quantity'
                          icon={<FontAwesomeIcon icon={faMinus} />}
                          onClick={() => decrementQuantity(productId)}
                          size='sm'
                          // variant='outline'
                        />
                      </InputLeftElement>
                      <Input
                        type='number'
                        value={quantity}
                        onChange={(e) => handleQuantityChange(productId, parseInt(e.target.value))}
                        min={1}
                        textAlign='center'
                        borderRadius={'5px'}
                      />
                      <InputRightElement>
                        <IconButton
                          aria-label='Increment quantity'
                          icon={<FontAwesomeIcon icon={faPlus} />}
                          onClick={() => incrementQuantity(productId)}
                          size='sm'
                          // variant='outline'
                        />
                      </InputRightElement>
                    </InputGroup>
                  </Box>
  )
}

export default Quantity
