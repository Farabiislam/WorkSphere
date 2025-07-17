import React from 'react';
import { Outlet } from "react-router";
import Navbar from './Navbar';
import Footer from './Footer';

const MainLayout = () => {
  return (
    <div >
      <Navbar />
      <div className='min-h-screen w-11/12 mx-auto sm:p-4 '>
        <Outlet />
      </div>

      <Footer/>
    </div>
  );
};

export default MainLayout;