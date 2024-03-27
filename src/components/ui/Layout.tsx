import React from 'react';

import { Navigate, Outlet } from 'react-router-dom';
import Navbar from '@/components/ui/Navbar';
import Topbar from '@/components/ui/Topbar';
import useAuth from '@/hooks/useAuth';

const Layout: React.FC = () => {
  const { user } = useAuth();

  if (!user) {
    return <Navigate to="/login" />;
  }
  return (
    <div className="mx-auto w-screen bg-white overflow-y-hidden h-screen">
      <Topbar />
      <main className="h-[calc(100vh-9.25rem)]">
        <Outlet />
      </main>
      <Navbar />
    </div>
  );
};

export default Layout;
