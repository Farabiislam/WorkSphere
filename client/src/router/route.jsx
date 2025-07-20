import { createBrowserRouter } from "react-router";
import MainLayout from "../root/MainLayout";
import Home from "../pages/Home";
import Login from "../pages/Login";
import Register from "../pages/Register";
import ContactUs from "../pages/ContactUs";
import Dashboard from "../pages/Dashboard";
import Error404 from "../pages/Error404";
import PrivateRoute from "./PrivateRoute";

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
    element:<PrivateRoute><Dashboard /></PrivateRoute>,

  },
  {
    path: "/*",
    Component: Error404,
  }
  
]);

export default router;
