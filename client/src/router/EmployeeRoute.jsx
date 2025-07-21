import React, { use } from 'react'
import { AuthContext } from '../context/AuthContext'
import { Navigate } from 'react-router'

const EmployeeRoute = ({ children }) => {
    
    const { user, role, loading } = use(AuthContext)
    if (loading) {
        return <span className="loading loading-spinner loading-xl"></span>
    }

    if (!user || role !== 'employee') {
        return <Navigate state={{ from: location.pathname }} to="/"></Navigate>
    }
    return (
        children
    )
}

export default EmployeeRoute