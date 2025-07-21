import { createBrowserRouter } from "react-router";
import MainLayout from "../root/MainLayout";
import Home from "../pages/Home";
import Login from "../pages/Login";
import Register from "../pages/Register";
import ContactUs from "../pages/ContactUs";
import Dashboard from "../pages/Dashboard";
import Error404 from "../pages/Error404";
import PrivateRoute from "./PrivateRoute";
import Profile from "../pages/Profile";
import AllEmployee from "../components/AdminDashboard/AllEmployee";
import Payroll from "../components/AdminDashboard/Payroll";
import EmployeeList from "../components/HrDashboard/EmployeeList";
import PaymentHistory from "../components/EmployeeDashboard/PaymentHistory";
import WorkProgress from "../components/HrDashboard/WorkProgress";
import WorkSheet from "../components/EmployeeDashboard/WorkSheet";
import DashboardHome from "../pages/DashboardHome";
import AdminRoute from "./AdminRoute";
import HrRoute from "./HrRoute";
import EmployeeRoute from "./EmployeeRoute";

const router = createBrowserRouter([
  {
    path: "/",
    Component: MainLayout,
    hydrateFallbackElement: <div className="min-h-screen flex justify-center items-center flex-col">
      Wait...
      <progress className="progress w-56"></progress>
    </div>,
    children: [
      {
        path: "/",
        element: <Home />,
      }, {
        path: "/login",
        element: <Login />,
      },
      {
        path: '/register',
        element: <Register />
      }, {
        path: '/contact',
        element: <ContactUs />
      }
    ],
  },
  {
    path: "/dashboard",
    element: <PrivateRoute><Dashboard /></PrivateRoute>,
    children: [
      {
        index: true,
        path: '/dashboard',
        element:<DashboardHome/>
      },
      {
        path: '/dashboard/employees',
        element: <AdminRoute><AllEmployee /></AdminRoute>
      },
      {
        path: '/dashboard/payroll',
        element: <AdminRoute><Payroll /></AdminRoute>
      },
      {
        path: '/dashboard/employee-list',
        element: <HrRoute><EmployeeList /></HrRoute>
      },
      {
        path: '/dashboard/work-progress',
        element: <HrRoute><WorkProgress /></HrRoute>
      },
      {
        path: '/dashboard/worksheet',
        element: <EmployeeRoute><WorkSheet /></EmployeeRoute>
      },
      {
        path: '/dashboard/payment-history',
        element: <EmployeeRoute><PaymentHistory /></EmployeeRoute>
      }
    ]

  },
  {
    path: "/*",
    Component: Error404,
  }

]);

export default router;
