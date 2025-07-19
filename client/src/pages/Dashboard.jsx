import React from 'react'
import Navbar from '../root/Navbar'
import { NavLink, Outlet } from 'react-router'
import Footer from '../root/Footer'

const Dashboard = () => {
    return (
        <div>
            <Navbar />
            <div className='min-h-screen flex'>
                <aside className="hidden sm:flex sm:flex-col w-45 bg-secondary border-r min-h-screen">
                    <div className="p-6 font-bold text-lg border-b">Dashboard</div>
                    <nav className="p-4 space-y-2">
                        {/* admin routes */}
                        <NavLink to="/employees" className="flex items-center gap-2 p-2 rounded hover:bg-secondary/80" >All Employee List</NavLink>
                        <NavLink to="/payroll" className="flex items-center gap-2 p-2 rounded hover:bg-secondary/80" >Payroll</NavLink>
                        {/* hr routes */}
                        <NavLink to="/employee-list" className="flex items-center gap-2 p-2 rounded hover:bg-secondary/80" >Employee List</NavLink>
                        <NavLink to="/work-progress" className="flex items-center gap-2 p-2 rounded hover:bg-secondary/80" >Work Progress</NavLink>
                        {/* employee routes */}
                        <NavLink to="/worksheet" className="flex items-center gap-2 p-2 rounded hover:bg-secondary/80" >Work Sheet</NavLink>
                        <NavLink to="/payment-history" className="flex items-center gap-2 p-2 rounded hover:bg-secondary/80" >Payment History</NavLink>
                    </nav>
                </aside>
                <main className="flex-1">
                    <Outlet />
                </main>
            </div>

            <Footer />
        </div>
    )
}

export default Dashboard