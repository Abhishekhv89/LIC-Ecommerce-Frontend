// components/PrivateRoute.tsx
import React from 'react';
import { Navigate, Outlet, useLocation } from 'react-router-dom';
import { useAuthContext } from './hooks/useAuthContext';
interface Props{
  isAdmin:boolean;
}

const PrivateRoute: React.FC = () => {
  const { user }: any = useAuthContext();
  const location = useLocation();

  return user ? <Outlet /> : <Navigate to="/login" state={{from:location}} replace/>;
};

export default PrivateRoute;
