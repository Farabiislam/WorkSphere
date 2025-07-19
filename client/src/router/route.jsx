import { createBrowserRouter } from "react-router";
import MainLayout from "../root/MainLayout";
import Home from "../pages/Home";
import Login from "../pages/Login";
import Register from "../pages/Register";
import ContactUs from "../pages/ContactUs";
import Dashboard from "../pages/Dashboard";

const router = createBrowserRouter([
  {
    path: "/",
    Component: MainLayout,
    hydrateFallbackElement: <div>Loading...</div>,
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
    Component: Dashboard,

  }
  
]);

export default router;
