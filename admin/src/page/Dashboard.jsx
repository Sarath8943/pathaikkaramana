import { useEffect, useState } from "react";
import { Link, Outlet, useNavigate, useLocation } from "react-router-dom";
import {
  LayoutDashboard,
  Image as GalleryIcon,
  ShieldCheck,
  LogOut,
  ChevronDown,
  UserCircle
} from "lucide-react";
import axiosInstance from "../utils/axiosInstance";

export const Dashboard = () => {
  const navigate = useNavigate();
  const location = useLocation();
  
  // പ്രൊഫൈൽ ഇമേജ് സ്റ്റേറ്റ്
  const [profileImage, setProfileImage] = useState(localStorage.getItem("profileImage") || "");

  useEffect(() => {
    const token = sessionStorage.getItem("token");
    if (!token) {
      navigate("/login", { replace: true });
    }

    // പ്രൊഫൈൽ പേജിൽ ഫോട്ടോ മാറ്റുമ്പോൾ ഹെഡറിലും മാറാൻ ഈ ലിസണർ സഹായിക്കും
    const handleStorageChange = () => {
      setProfileImage(localStorage.getItem("profileImage") || "");
    };

    window.addEventListener("storage", handleStorageChange);
    
    // ആദ്യ തവണ ലോഡ് ചെയ്യുമ്പോൾ ബാക്ക് എൻഡിൽ നിന്ന് ഫോട്ടോ എടുക്കുന്നു
    const fetchHeaderImage = async () => {
      try {
        const res = await axiosInstance.get("/admin/profile");
        if (res.data?.admin?.profileImage) {
          setProfileImage(res.data.admin.profileImage);
          localStorage.setItem("profileImage", res.data.admin.profileImage);
        }
      } catch (err) {
        console.error("Header image fetch error", err);
      }
    };

    fetchHeaderImage();

    return () => window.removeEventListener("storage", handleStorageChange);
  }, [navigate]);

  const handleLogout = () => {
    sessionStorage.clear();
    localStorage.removeItem("profileImage"); // ലോഗൗട്ട് ചെയ്യുമ്പോൾ ഇമേജും കളയുന്നു
    navigate("/login", { replace: true });
  };

  const navLinkStyle = (path) => `
    flex items-center gap-3 p-3 rounded-xl transition-all duration-200
    ${location.pathname === path ? "bg-amber-700 text-white shadow-lg" : "hover:bg-amber-800/50 text-amber-100"}
  `;

  return (
    <div className="flex min-h-screen bg-stone-50 text-stone-900 font-sans">
      <aside className="w-72 bg-amber-950 text-white p-6 flex flex-col shadow-2xl z-10">
        <div className="flex items-center gap-3 mb-10 px-2 border-b border-amber-900 pb-6">
          <div className="bg-amber-100 p-2 rounded-xl">
            <ShieldCheck className="text-amber-950 w-6 h-6" />
          </div>
          <h2 className="text-xl font-black uppercase tracking-widest">Admin Panel</h2>
        </div>

        <nav className="space-y-2 flex-1">
          <Link to="/dashboard" className={navLinkStyle("/dashboard")}>
            <LayoutDashboard size={20} />
            <span className="font-semibold uppercase text-xs tracking-wider">Overview</span>
          </Link>
          <Link to="/dashboard/gallery" className={navLinkStyle("/dashboard/gallery")}>
            <GalleryIcon size={20} />
            <span className="font-semibold uppercase text-xs tracking-wider">Gallery Manager</span>
          </Link>
        </nav>

        <div className="mt-auto pt-6 border-t border-amber-900">
          <button onClick={handleLogout} className="flex items-center justify-center gap-2 w-full bg-red-500/10 text-red-400 py-3 rounded-xl font-bold hover:bg-red-500 transition-all group">
            <LogOut size={18} /> Logout
          </button>
        </div>
      </aside>

      <div className="flex-1 flex flex-col h-screen overflow-hidden">
        <header className="bg-white border-b border-stone-200 py-4 px-10 flex justify-between items-center shadow-sm z-20">
          <h1 className="text-amber-900 font-bold text-sm uppercase">
            {location.pathname.replace("/dashboard", "Dashboard").replace("/", " / ")}
          </h1>

          <Link to="/dashboard/profile" className="flex items-center gap-3 p-1 pr-4 rounded-2xl hover:bg-stone-50 transition-all group">
            <div className="relative">
              <div className="w-10 h-10 bg-amber-100 rounded-xl flex items-center justify-center border border-amber-200 overflow-hidden shadow-sm">
                {profileImage ? (
                  <img src={profileImage} alt="Profile" className="w-full h-full object-cover" />
                ) : (
                  <UserCircle size={28} className="text-amber-900" />
                )}
              </div>
              <div className="absolute -top-1 -right-1 w-3.5 h-3.5 bg-green-500 border-2 border-white rounded-full"></div>
            </div>
            <div className="text-left hidden sm:block">
              <p className="text-[11px] font-black text-stone-800 uppercase leading-none mb-1">Profile</p>
              <p className="text-[10px] text-stone-400 font-bold leading-none">Manage Account</p>
            </div>
            <ChevronDown size={14} className="text-stone-300 group-hover:text-amber-600" />
          </Link>
        </header>

        <main className="flex-1 overflow-y-auto p-8 bg-stone-50/50">
          <div className="max-w-6xl mx-auto"><Outlet /></div>
        </main>
      </div>
    </div>
  );
};

export default Dashboard;
