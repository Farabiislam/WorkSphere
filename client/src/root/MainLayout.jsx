import React, { useContext } from 'react';
import { Outlet } from "react-router";
import Navbar from './Navbar';
import Footer from './Footer';
import { AuthContext } from '../context/AuthContext';
import { Toaster } from "@/components/ui/sonner"
const MainLayout = () => {
  const { user, loading, roleLoading } = useContext(AuthContext);

  if (loading || (user && (loading || roleLoading))) {
    console.log("from main layout 2 with user with loading or roleLoading");
    return <div className="min-h-screen flex justify-center items-center flex-col">
      Loading...
      <progress className="progress w-56"></progress>
    </div>;
  }
  return (
    <div className='overflow-hidden'> {/**/}
      <Navbar />
      <Toaster/>
      <div className='min-h-screen w-11/12 mx-auto sm:p-4 '>
        <Outlet />
      </div>
      <Footer />
    </div>
  );
};

export default MainLayout;