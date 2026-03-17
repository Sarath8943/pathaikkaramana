import { Navigate } from "react-router-dom";

const ProtectedRoute = ({ children }) => {
  // മാറ്റം വരുത്തിയത് ഇവിടെയാണ്: localStorage-ന് പകരം sessionStorage ഉപയോഗിക്കുന്നു
  const token = sessionStorage.getItem("token");

  if (!token) {
    // യൂസർ ലോഗിൻ ചെയ്തിട്ടില്ലെങ്കിൽ നേരിട്ട് ലോഗിൻ പേജിലേക്ക് തിരിച്ചുവിടുന്നു
    return <Navigate to="/login" replace />;
  }

  // ലോഗിൻ ചെയ്തിട്ടുണ്ടെങ്കിൽ മാത്രം പേജ് കാണിക്കുന്നു
  return children;
};

export default ProtectedRoute;