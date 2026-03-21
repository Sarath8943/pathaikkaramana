import { createBrowserRouter, Navigate } from "react-router-dom";
import Login from "../page/login";
import Signup from "../page/signup";
import Dashboard from "../page/Dashboard";
import Gallery from "../page/gallery";
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
    element: <Login />,
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
      // 1. ഗാലറി പേജ്
      {
        path: "gallery",
        element: <Gallery />
      },
      // 2. അഡ്മിൻ പ്രൊഫൈൽ പേജ് (ഇതാണ് നിങ്ങൾ മിസ്സ് ചെയ്തത്)
      {
        path: "profile", 
        element: <AdminProfile/>
      },
      // 3. ചേഞ്ച് പാസ്‌വേഡ് (സെപ്പറേറ്റ് ആയി വേണമെങ്കിൽ മാത്രം)
      {
        path: "change-password",
        element: <ChangePassword />
      },
      // ഡാഷ്ബോർഡിൽ കയറുമ്പോൾ ആദ്യം എന്ത് കാണണം എന്ന് ഇവിടെ തീരുമാനിക്കാം
      {
        index: true,
        element: <Navigate to="gallery" replace /> 
      }
    ],
  },
]);

export default router;