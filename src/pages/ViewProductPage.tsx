import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { ParsedData } from '../interfaces/ParsedDataInterface';
import ProductImage from '../components/ProductImage';
import ProductDetails from '../components/ProductDetails';
import Navigationbar from '../components/Navbar';
import Breadcrumbs from '../components/Breadcrumbs';
import CartPopUp from '../components/CartPopUp';
import { useAuthContext } from '../hooks/useAuthContext';
import { CartItem } from '../interfaces/cartItemsInterface';
import { useCart } from '../context/CartContext';



function ViewProduct() {
  //contect
const { user }: any = useAuthContext();
const { cartItems, addToCart, removeFromCart, clearCart } = useCart();

// console.log(user);
  const { id } = useParams();
  const [productDetail, setProductDetail] = useState<ParsedData | null>(null);
  // const [itemsAddedToCart, setItemsAddedToCart] = useState<CartItem[]>([]);
  const [showCart, setShowCart] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    axios.get(`http://localhost:3001/product/${id}`)
      .then(res => {
        if (res.data.product) {
          setProductDetail(res.data.product);
        } else {
          console.log(res.data.error);
          setProductDetail(null);
          navigate('/dashboard');
        }
      })
      .catch(e => {
        console.log(e);
        setProductDetail(null);
      });
  }, [id, navigate]);

  const crumbs = [
    { name: 'Home', path: '/', active: false },
    { name: 'Dashboard', path: '/dashboard', active: false },
    { name: `${productDetail?.name}`, path: '/product/:id', active: true }
  ];


  

  const handleAddToCart = (product: ParsedData) => {
    // console.log(product);
    if(user){
axios.post(`http://localhost:3001/cart/${user.userId}/add`, { productId: product._id })
      .then(res => {
        // console.log("res.data : ",res.data);
        if(!res.data.error){
          addToCart(res.data)
        // setItemsAddedToCart(res.data);
        setShowCart(true);
        }
        
      })
      .catch(e => {
        // console.log("failed");
        console.log("error : ", e);
      });
    }
    
  };
  
// const onDelete =(cart:CartItem[])=>{

// setItemsAddedToCart(cart);
// }

// console.log(itemsAddedToCart);
  return (
    <div>
      {/* <Navigationbar /> */}
      {productDetail &&
        <>
          <div style={{ paddingLeft: '13px', backgroundColor: '#212121' }}>
            <Breadcrumbs crumbs={crumbs} />
          </div>
          <div className='productContainer'>
            {showCart && (<div className="addToCartPopUp">
              <CartPopUp  onClose={() => setShowCart(false)} />
            </div>)}
            <ProductImage images={productDetail.images} />
            <ProductDetails product={productDetail} handleAddToCart={handleAddToCart} />
          </div>
        </>
      }
    </div>
  );
}

export default ViewProduct;
