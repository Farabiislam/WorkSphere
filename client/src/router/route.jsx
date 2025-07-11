import { createBrowserRouter } from "react-router";
import MainLayout from "../root/MainLayout";

 const router = createBrowserRouter([
  {
    path: "/",
    Component: MainLayout,
  },
]);

export default router