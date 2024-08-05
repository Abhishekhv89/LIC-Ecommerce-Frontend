import React, { createContext, useState, useContext, ReactNode, useEffect } from 'react';
import { CartItem } from '../interfaces/cartItemsInterface';
import axios from 'axios';
import { useAuthContext } from '../hooks/useAuthContext';

// Define the context type
interface CartContextType {
  cartItems: CartItem[];
  addToCart: (items: CartItem[]) => void;
  removeFromCart: (itemId: string) => void;
  clearCart: () => void;
}

// Create the context with an initial value
const CartContext = createContext<CartContextType | undefined>(undefined);

// Create a provider component
export const CartProvider = ({ children }: { children: ReactNode }) => {
  const { user }:any = useAuthContext();

  // Initially, cartItems is null to indicate it's not yet loaded
  const [cartItems, setCartItems] = useState<CartItem[] | null>(null);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (user) {
      axios.get(`http://localhost:3001/cart/${user.userId}`)
        .then(res => {
          setCartItems(res.data);
        })
        .catch(e => {
          console.error('Failed to fetch cart items:', e);
          setError('Failed to fetch cart items.');
        });
    }
  }, [user]);

  const addToCart = (items: CartItem[]) => {
    setCartItems(items);
  };

  const removeFromCart = (itemId: string) => {
    setCartItems(prevItems => prevItems?.filter(item => item.product._id !== itemId) || []);
  };

  const clearCart = () => {
    setCartItems([]);
  };

  // Handle loading and error states
  if (cartItems === null) return <div>Loading cart items...</div>;
  if (error) return <div>Error: {error}</div>;

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
