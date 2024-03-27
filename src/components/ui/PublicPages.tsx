import React from 'react';

import useAuth from '@/hooks/useAuth';
import { Navigate, Outlet } from 'react-router-dom';

const PublicPages: React.FC = () => {
  const { user } = useAuth();

  if (user.id) {
    return <Navigate to="/home" />;
  }

  return <Outlet />;
};

export default PublicPages;
