import React, { useContext } from 'react'

import { Navigate, useLocation } from 'react-router';
import { AuthContext } from '../context/AuthContext';

const PrivateRoute = ({ children }) => {
    const { user, loading,roleLoading } = useContext(AuthContext)

    const location = useLocation()

    if (loading|| roleLoading) {
        console.log("from private route")
        return <div className="min-h-screen flex justify-center items-center flex-col">
            Loading...
            <progress className="progress w-56"></progress>
        </div>;
    }
    if (user && user?.email) {
        return children
      }

  return (
      <Navigate state={location.pathname} to='/login'></Navigate>
  )
}

export default PrivateRoute