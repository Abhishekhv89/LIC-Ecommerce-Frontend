import React from 'react';

import Home from './components/Home';
import { BrowserRouter,Routes,Route,Navigate } from 'react-router-dom';
import LoginPage from './pages/LoginPage';
import RegistrationPage from './pages/RegistrationPage';
import ForgotPasswordPage from './pages/ForgotPasswordPage';
import DashboardPage from './pages/DashboardPage';


import {Toaster} from 'react-hot-toast';


import { useAuthContext } from './hooks/useAuthContext';


function App() {
  const {user}:any = useAuthContext();
 
  // console.log(user)
  return (
    <div className='appDiv'>
      <BrowserRouter>
      
             <Toaster position='top-center' toastOptions={{duration:5000,style:{color:'white'},success:{style:{background:'green'}},error:{style:{background:'red'}}}} />
             
             
              <Routes>
              <Route path='/' element ={<Home/>} />
              <Route path="/dashboard" element={user ? <DashboardPage /> : <Navigate to="/login" />} />

              <Route path='/login' element ={!user ? <LoginPage/> : <Navigate to='/dashboard'/>} />

               <Route path='/register' element ={!user ? <RegistrationPage/> : <Navigate to='/dashboard'/>} />
               <Route path='/forgot-password' element={!user ? <ForgotPasswordPage/> : <Navigate to='/dashboard'/>}/>
  
              
               
            </Routes>
       
      </BrowserRouter>
       
    </div>
  );
}

export default App;
