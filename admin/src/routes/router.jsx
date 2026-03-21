import { createBrowserRouter, Navigate } from "react-router-dom";
import Login from "../page/Login";
import Signup from "../page/Signup";
import Dashboard from "../page/Dashboard";
import Gallery from "../page/Gallery";
import AdminProfile from "../page/AdminProfile";
import ChangePassword from "../page/ChangePassword";
import ProtectedRoute from "../components/ProtectedRoute";

export const router = createBrowserRouter([
  {
    path: "/",
    element: <Navigate to="/login" replace />,
  },
  {
    path: "/login",
    element:<Login/>,
  },
  {
    path: "/signup",
    element: <Signup />,
  },
  {
    path: "/change-password",
    element: <ChangePassword />,
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
        path: "gallery",
        element: <Gallery />,
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
        index: true,
        element: <Navigate to="gallery" replace />,
      },
    ],
  },
]);

export default router;
