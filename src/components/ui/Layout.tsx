import React from 'react';

import { Outlet } from 'react-router-dom';

import Navbar from './Navbar';

const Layout: React.FC = () => {
    return (
        <>
            <Navbar />
            <section className="container mx-auto px-4 pt-14 lg:pt-12">
                <Outlet />
            </section>
        </>
    );
};

export default Layout;
