import React, { use } from 'react'
import { AuthContext } from '../context/AuthContext'
import { Navigate } from 'react-router'

const AdminRoute = ({childern}) => {
    const { user,role, loading, roleLoading } = use(AuthContext)
  if (loading || roleLoading ) {
        return <span className="loading loading-spinner loading-xl"></span>
  }
  console.log(role)
    if (role !== 'admin') {
        return <Navigate state={{ from: location.pathname }} to="/*"></Navigate>
    }

  return (
    childern
  )
}

export default AdminRoute