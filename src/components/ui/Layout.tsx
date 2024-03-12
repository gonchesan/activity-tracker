import React from 'react';

import { Outlet } from 'react-router-dom';
import Navbar from './Navbar';
import UserDropdown from './UserDropdown';

import NavbarIcon from '@/assets/icons/navbar-icon.svg?react';

const Layout: React.FC = () => {
  return (
    <div className="mx-auto h-screen w-screen overflow-hidden bg-white">
      <aside className="flex justify-between items-center px-4">
        <NavbarIcon />
        <UserDropdown />
      </aside>
      <Outlet />
      <Navbar />
    </div>
  );
};

export default Layout;
