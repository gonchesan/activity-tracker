import React from 'react';

import { Outlet } from 'react-router-dom';
import Navbar from '@/components/ui/Navbar';
import Topbar from '@/components/ui/Topbar';

const Layout: React.FC = () => {
  return (
    <>
      <div className="mx-auto w-screen bg-white overflow-y-hidden h-screen">
        <Topbar />
        <main className="h-[calc(100vh-9.25rem)]">
          <Outlet />
        </main>
        <Navbar />
      </div>
    </>
  );
};

export default Layout;
