import React from 'react';
import ReactDOM from 'react-dom/client';
// import "./CSS/style.css"
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import { UserContextProvider } from './context/UserContext';
import { ChakraProvider } from '@chakra-ui/react'
import { CartProvider } from './context/CartContext';
// import theme from './Themes/colors';

// import React from 'react';
// import ReactDOM from 'react-dom';
// import App from './App';

// Create a custom theme


// Custom CssBaseline component to avoid conflicts




const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);
root.render(
  <React.StrictMode>
   <ChakraProvider>
    <UserContextProvider>
       <CartProvider>
        
       <App />
        
       </CartProvider>
    </UserContextProvider>
   </ChakraProvider>
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
