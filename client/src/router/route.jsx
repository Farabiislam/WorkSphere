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
import AllEmployee from "../pages/AllEmployee";
import Payroll from "../pages/Payroll";
import EmployeeList from "../pages/EmployeeList";
import PaymentHistory from "../pages/PaymentHistory";
import WorkProgress from "../pages/WorkProgress";
import WorkSheet from "../pages/WorkSheet";
import DashboardHome from "../pages/DashboardHome";

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
        element: <AllEmployee />
      },
      {
        path: '/dashboard/payroll',
        element: <Payroll />
      },
      {
        path: '/dashboard/employee-list',
        element: <EmployeeList />
      },
      {
        path: '/dashboard/work-progress',
        element: <WorkProgress />
      },
      {
        path: '/dashboard/worksheet',
        element: <WorkSheet />
      },
      {
        path: '/dashboard/payment-history',
        element: <PaymentHistory />
      }
    ]

  },
  {
    path: "/*",
    Component: Error404,
  }

]);

export default router;
