import { use} from "react";
import { AuthContext } from "../context/AuthContext";
import { Navigate } from "react-router";


const DashboardRedirect = () => {
     const { role, roleLoading } = use(AuthContext)
     if (roleLoading) {
         console.log("from private route")
         return <div className="min-h-screen flex justify-center items-center flex-col">
             Loading...
             <progress className="progress w-56"></progress>
         </div>;
     }

  switch (role) {
    case "admin":
      return <Navigate to="/dashboard/employees" replace />;
    case "hr":
      return <Navigate to="/dashboard/employee-list" replace />;
    case "employee":
      return <Navigate to="/dashboard/worksheet" replace />;
    default:
      return <Navigate to="/dashboard" replace />;
  }
};

export default DashboardRedirect;
