import React, { useEffect, useState } from 'react';
// import { ParsedData } from '../../interfaces/ParsedDataInterface';
import { Box, Button, Input, InputGroup, InputLeftElement, InputRightElement, IconButton ,Text} from '@chakra-ui/react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faIndianRupeeSign, faXmark, faPlus, faMinus } from '@fortawesome/free-solid-svg-icons';
import { Col, Row } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { useAuthContext } from '../../hooks/useAuthContext';
// import { CartItem } from '../../interfaces/cartItemsInterface';
// import ItemDeleteButton from './ItemDeleteButton';
// import Quantity from './Quantity';
import { useCart } from '../../context/CartContext';
import ItemDeleteButton from './ItemDeleteButton';
import Quantity from './Quantity';

interface Props {
  
  onClose: () => void;
  // onDelete:(cart:CartItem[])=>void;
}

function CartPopUp({ onClose }: Props) {
  // console.log(cart);
  const { user }: any = useAuthContext();
  const { cartItems, addToCart, removeFromCart, clearCart } = useCart();

  const navigate = useNavigate();
  const [quantities, setQuantities] = useState<Record<string, number>>({});

  useEffect(() => {
    const initialQuantities: Record<string, number> = {};
    cartItems.forEach(item => {
      initialQuantities[item.product._id] = item.quantity || 1;
    });
    setQuantities(initialQuantities);
  }, [cartItems]);

  const onContinueShopping = () => {
    navigate('/dashboard');
  };

  const onCheckout = () => {
    navigate('/checkout');
  };

  // const handleDelete =(cart:CartItem[])=>{
  //   onDelete(cart);
  // }
  const onQuantityChange = (productId:string,newQuantity:number)=>{
    if (newQuantity < 1) return;
    const updatedQuantities = { ...quantities, [productId]: newQuantity };
    setQuantities(updatedQuantities);
  }
  

  return (
    <div>
      <div className='cartPopUpHeader'>
        <h4>Items added to your shopping cart</h4>
        <Button margin={'6px 0px'} size={'sm'} _hover={{ bg: 'red.500' }} onClick={onClose}>
          <FontAwesomeIcon icon={faXmark} />
        </Button>
      </div>

      <Box className='cartContainer' maxH='348px' overflowY='auto' margin={0}>

        {cartItems.length==0 && <center><h2>No items in the Cart</h2></center>}

        {cartItems.map((item) => (
          // consol.log()
          <div key={item.product._id} className='cartProduct'>
             {item.product.images && item.product.images.length > 0 ? (
              <img src={item.product.images[0]} alt={item.product.name} />
            ) : (
              <div>No image available</div>
            )}
            <div className='proDetails'>
                            <Row>
                <Col xs={10}>
                  <h5>{item.product.name}</h5>
                </Col>
                <Col xs={2} >
                   <ItemDeleteButton productId={item.product._id}/>
                </Col>
              </Row>
  
              <Row>
                <Col>
                 
                  <Quantity onQuantityChange={onQuantityChange} productId={item.product._id} qty={item.quantity} />
                </Col>
                <Col>
                  <Text>Price: <FontAwesomeIcon icon={faIndianRupeeSign} style={{ height: "15px" }} /> {item.product.price}</Text>
                </Col>
              </Row>
            </div>
          </div>
        ))}
      </Box>
      <Row className='my-3'>
        <Col><center><Button onClick={onContinueShopping}>Continue shopping</Button></center></Col>
        <Col><center><Button colorScheme={'blue'} onClick={onCheckout} isDisabled={cartItems.length==0?true:false}>Checkout</Button></center></Col>
      </Row>
    </div>
  );
}

export default CartPopUp;
