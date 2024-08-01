import React, { createContext, useState, useContext, ReactNode, useEffect } from 'react';
import { CartItem } from '../interfaces/cartItemsInterface';
import axios from 'axios';
import { useAuthContext } from '../hooks/useAuthContext';

// const {user} :any = useAuthContext();
// Define the type for a cart item


// Define the context type
interface CartContextType {
  cartItems: CartItem[];
  addToCart: (items: CartItem[]) => void;
  removeFromCart: (itemId: string) => void;
//   getCart: () => CartItem[];
  clearCart: () => void;
}



// Create the context with an initial value
const CartContext = createContext<CartContextType | undefined>(undefined);



// Create a provider component
export const CartProvider = ({ children }: { children: ReactNode }) => {
    // initialState();
    // console.log("cart :",cart);
const {user} :any = useAuthContext();
    // console.log("initial : ",initialState)
  const [cartItems, setCartItems] = useState<CartItem[]>([]);


  useEffect(() => {
if(user){
axios.get(`http://localhost:3001/cart/${user.userId}`)
      .then(res => {
        setCartItems(res.data)
      })
      .catch(e => {
        console.log(e);
      });
}
    
  }, []);


  const addToCart = (items: CartItem[]) => {
    setCartItems(items);
  };

//   const getCart = () => {
//     return cartItems;
//   };

  const removeFromCart = (itemId: string) => {
    setCartItems((prevItems) => prevItems.filter(item => item.product._id !== itemId));
  };

  const clearCart = () => {
    setCartItems([]);
  };

  return (
    <CartContext.Provider value={{ cartItems, addToCart, removeFromCart, clearCart }}>
      {children}
    </CartContext.Provider>
  );
};

// Custom hook to use the CartContext
export const useCart = () => {
  const context = useContext(CartContext);
  if (context === undefined) {
    throw new Error('useCart must be used within a CartProvider');
  }
  return context;
};
