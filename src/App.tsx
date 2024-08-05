// App.tsx
import React from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import Home from './pages/HomePage';
import LoginPage from './pages/LoginPage';
import RegistrationPage from './pages/RegistrationPage';
import ForgotPasswordPage from './pages/ForgotPasswordPage';
import DashboardPage from './pages/DashboardPage';
import AgentRegistrationPage from './pages/AgentRegisterPage';
import { Toaster } from 'react-hot-toast';
import { useAuthContext } from './hooks/useAuthContext';
import PrivateRoute from './PrivateRoute';
import ViewProductPage from './pages/ViewProductPage';
import CheckoutPage from './pages/CheckoutPage';
import AdminProtectedRoute from './AdminProtectedRoute';
import AdminPage from './pages/AdminPage';
import Layout from './components/Layout';

function App() {
  const { user }: any = useAuthContext();

  return (
    <div className='appDiv'>
      <BrowserRouter>
        <Toaster
          position='top-center'
          toastOptions={{
            duration: 5000,
            style: { color: 'white' },
            success: { style: { background: 'green' } },
            error: { style: { background: 'red' } },
          }}
        />
        <Routes>
          
            
            <Route path='login' element={!user ? <LoginPage /> : <Navigate to='/dashboard' />} />
            <Route path='register' element={!user ? <RegistrationPage /> : <Navigate to='/dashboard' />} />
            <Route path='forgot-password' element={!user ? <ForgotPasswordPage /> : <Navigate to='/dashboard' />} />
            
            <Route element={<PrivateRoute />}>
            <Route path='/' element={<Layout />}>
              <Route index element={<Home />} />
              <Route path='dashboard' element={<DashboardPage />} />
              <Route path='agentRegistration' element={<AgentRegistrationPage />} />
              <Route path='product/:id' element={<ViewProductPage />} />
              <Route path='checkout' element={<CheckoutPage />} />
              <Route element={<AdminProtectedRoute />}>
                <Route path='user/admin' element={<AdminPage />} />
              </Route>
            </Route>
          </Route>
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
