import React from 'react';
import './App.css';
import Login from './components/Login';
import Registration from './components/Registration';
import Home from './components/Home';
import { BrowserRouter,Routes,Route } from 'react-router-dom';
import ForgotPassword from './components/ForgotPassword';
import LoginPage from './pages/LoginPage';
import RegistrationPage from './pages/RegistrationPage';
import ForgotPasswordPage from './pages/ForgotPasswordPage';

function App() {
  return (
    <div className='appDiv'>
      <BrowserRouter>
            <Routes>
              <Route path='/' element ={<Home/>} />
              <Route path='/login' element ={<LoginPage/>} />
               <Route path='/register' element ={<RegistrationPage/>} />
               <Route path='/forgot-password' element={<ForgotPasswordPage/>}/>
               
               
            </Routes>
      </BrowserRouter>
       
    </div>
  );
}

export default App;
