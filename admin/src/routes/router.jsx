import { createBrowserRouter, Navigate } from "react-router-dom";
import Login from "../page/AdminLogin";
import Dashboard from "../page/Dashboard";
import AdminProfile from "../page/AdminProfile";
import ChangePassword from "../page/ChangePassword";
import ProtectedRoute from "../components/ProtectedRoute";
import Overview from "../page/Overview"; 
import Gallery from "../page/Gallery";
import FestivalEdit from "../page/FestivalEdit";
import Offering from "../page/OfferingEdit";

export const router = createBrowserRouter([
  {
    path: "/",
    element: <Navigate to="/login" replace />,
  },
  {
    path: "/login",
    element: <Login />,
  },
  {
    path: "/dashboard",
    element: (
      <ProtectedRoute>
        <Dashboard />
      </ProtectedRoute>
    ),
    children: [
      {
        index: true,
        element: <Overview />, 
      },
      {
        path: "gallery",
        element: <Gallery/>,
      },
      {
        path: "profile",
        element: <AdminProfile />,
        
      },
      {
        path: "change-password",
        element: <ChangePassword />,
      },
      {
        path: "festival",
        element: <FestivalEdit/>,
      },
      {
        path: "offerings",
        element: <Offering/>
      }
    ],
  },
]);

export default router;
