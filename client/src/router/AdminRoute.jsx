import React, { use } from 'react'
import { AuthContext } from '../context/AuthContext'
import { Navigate } from 'react-router'

const AdminRoute = ({childern}) => {
    const { user,role, loading } = use(AuthContext)
    if (loading ) {
        return <span className="loading loading-spinner loading-xl"></span>
    }

    if (!user || role !== 'admin') {
        return <Navigate state={{ from: location.pathname }} to="/"></Navigate>
    }

  return (
    childern
  )
}

export default AdminRoute