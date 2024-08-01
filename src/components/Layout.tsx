// components/Layout.tsx
import React from 'react';
import { Outlet } from 'react-router-dom';
import Navigationbar from './Navbar';

const Layout = () => {
  return (
    <div>
      <Navigationbar />
      <main>
        <Outlet />
      </main>
    </div>
  );
};

export default Layout;
