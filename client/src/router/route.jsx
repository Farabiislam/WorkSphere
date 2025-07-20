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
        element:<ContactUs/>
      }
    ],
  },
  {
    path: "/dashboard",
    element: <PrivateRoute><Dashboard /></PrivateRoute>,
    children: [
      {
        index: true,
        path:'/dashboard',
        element: <div className="p-10 text-center">Welcome to the Dashboard</div>
      },
      {
        path: '/dashboard/employees',
        element: <div>All Employee List</div>
      },
      {
        path: '/dashboard/payroll',
        element: <div>Payroll</div>
      },
      {
        path: '/dashboard/employee-list',
        element: <div>Employee List</div>
      },
      {
        path: '/dashboard/work-progress',
        element: <div>Work Progress</div>
      },
      {
        path: '/dashboard/worksheet',
        element: <div>Work Sheet</div>
      },
      {
        path: '/dashboard/payment-history',
        element: <div>Payment History</div>
      }
    ]

  },
  {
    path: "/*",
    Component: Error404,
  }
  
]);

export default router;
