import React, { useContext } from 'react';
import { Outlet } from "react-router";
import Navbar from './Navbar';
import Footer from './Footer';
import { AuthContext } from '../context/AuthContext';

const MainLayout = () => {
  const { loading, roleLoading } = useContext(AuthContext);
  if (loading || roleLoading) {
    return <span className="loading loading-spinner loading-xl"></span>
  }
  return (
    <div className='overflow-hidden'> {/**/}
      <Navbar />
      <div className='min-h-screen w-11/12 mx-auto sm:p-4 '>
        <Outlet />
      </div>

      <Footer/>
    </div>
  );
};

export default MainLayout;