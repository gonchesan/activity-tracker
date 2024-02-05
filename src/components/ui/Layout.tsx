import React from 'react';

import { Outlet } from 'react-router-dom';

import Sidebar from './Sidebar';

const Layout: React.FC = () => {
    return (
        <div className="mx-auto h-screen w-screen overflow-hidden bg-white flex">
            <Sidebar />
            <Outlet />
        </div>
    );
};

export default Layout;
