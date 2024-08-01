// components/AdminProtectedRoute.tsx
import React from 'react';
import { Navigate, Outlet, useLocation } from 'react-router-dom';
import { useAuthContext } from './hooks/useAuthContext';
interface Props{
  isAdmin:boolean;
}

const AdminProtectedRoute: React.FC = () => {
  const { user }: any = useAuthContext();
  // console.log(user);
  const location = useLocation();

  return user.role=="admin" ? <Outlet /> : 
  <Navigate to="/dashboard" state={{from:location}} replace/>
  // <Outlet />
  ;
};

export default AdminProtectedRoute;
