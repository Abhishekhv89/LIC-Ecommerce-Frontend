// components/PrivateRoute.tsx
import React from 'react';
import { Navigate, Outlet } from 'react-router-dom';
import { useAuthContext } from './hooks/useAuthContext';

const PrivateRoute: React.FC = () => {
  const { user }: any = useAuthContext();

  return user ? <Outlet /> : <Navigate to="/login" />;
};

export default PrivateRoute;
