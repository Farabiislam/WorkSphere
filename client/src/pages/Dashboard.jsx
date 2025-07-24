import React, { useContext } from 'react'
import Navbar from '../root/Navbar'
import { NavLink, Outlet } from 'react-router'
import Footer from '../root/Footer'
import { AuthContext } from '../context/AuthContext'
import { Toaster } from 'sonner'

const Dashboard = () => {
    const {role}=useContext(AuthContext)
    return (
        <div>
            <Navbar />
            <Toaster/>
            <div className='min-h-screen flex'>
                <aside className="hidden sm:flex sm:flex-col w-50 bg-secondary border-r min-h-screen">
                    <nav className="p-4 space-y-2">
                        {role === 'admin' && (
                            <>
                                <NavLink to="/dashboard/employees" className="flex items-center gap-2 p-2 rounded hover:bg-secondary/80">All Employee List</NavLink>
                                <NavLink to="/dashboard/payroll" className="flex items-center gap-2 p-2 rounded hover:bg-secondary/80">Payroll</NavLink>
                            </>
                        )}
                        {/* HR routes */}
                        {role === 'hr' && (
                            <>
                                <NavLink to="/dashboard/employee-list" className="flex items-center gap-2 p-2 rounded hover:bg-secondary/80">Employee List</NavLink>
                                <NavLink to="/dashboard/work-progress" className="flex items-center gap-2 p-2 rounded hover:bg-secondary/80">Work Progress</NavLink>
                            </>
                        )}
                        {/* Employee routes */}
                        {role === 'employee' && (
                            <>
                                <NavLink to="/dashboard/worksheet" className="flex items-center gap-2 p-2 rounded hover:bg-secondary/80">Work Sheet</NavLink>
                                <NavLink to="/dashboard/payment-history" className="flex items-center gap-2 p-2 rounded hover:bg-secondary/80">Payment History</NavLink>
                            </>
                        )}
                    </nav>
                </aside>
                <main className="flex-1 overflow-x-auto">
                    <Outlet />
                </main>
            </div>
            <Footer />
        </div>
    )
}

export default Dashboard