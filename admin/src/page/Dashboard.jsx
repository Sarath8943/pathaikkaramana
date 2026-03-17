import { useEffect } from "react"; // useEffect ആഡ് ചെയ്തു
import { Link, Outlet, useNavigate, useLocation } from "react-router-dom";
import {
  LayoutDashboard,
  Image as GalleryIcon,
  ShieldCheck,
  LogOut,
  UserCircle,
  ChevronDown,
} from "lucide-react";

export const Dashboard = () => {
  const navigate = useNavigate();
  const location = useLocation();

  // ഡാഷ്ബോർഡ് ലോഡ് ചെയ്യുമ്പോൾ ടോക്കൺ ഉണ്ടോ എന്ന് ഉറപ്പുവരുത്തുന്നു
  useEffect(() => {
    const token = sessionStorage.getItem("token");
    if (!token) {
      navigate("/login", { replace: true });
    }
  }, [navigate]);

  const handleLogout = () => {
    // sessionStorage ക്ലിയർ ചെയ്യുന്നു
    sessionStorage.removeItem("token");
    sessionStorage.removeItem("role"); // role സേവ് ചെയ്യുന്നുണ്ടെങ്കിൽ അതും കളയുക
    
    // എല്ലാ സെഷൻ ഡാറ്റയും ഒന്നിച്ച് കളയാൻ sessionStorage.clear() ഉപയോഗിക്കാം
    sessionStorage.clear(); 

    navigate("/login", { replace: true });
  };

  const navLinkStyle = (path) => `
    flex items-center gap-3 p-3 rounded-xl transition-all duration-200
    ${
      location.pathname === path
        ? "bg-amber-700 text-white shadow-lg"
        : "hover:bg-amber-800/50 text-amber-100"
    }
  `;

  return (
    <div className="flex min-h-screen bg-stone-50 text-stone-900 font-sans">
      {/* --- Sidebar --- */}
      <aside className="w-72 bg-amber-950 text-white p-6 flex flex-col shadow-2xl z-10">
        <div className="flex items-center gap-3 mb-10 px-2 border-b border-amber-900 pb-6">
          <div className="bg-amber-100 p-2 rounded-xl shadow-inner">
            <ShieldCheck className="text-amber-950 w-6 h-6" />
          </div>
          <h2 className="text-xl font-black tracking-tighter uppercase tracking-widest">
            Admin Panel
          </h2>
        </div>

        <nav className="space-y-2 flex-1">
          <Link to="/dashboard" className={navLinkStyle("/dashboard")}>
            <LayoutDashboard size={20} />
            <span className="font-semibold uppercase text-xs tracking-wider">
              Overview
            </span>
          </Link>

          <Link
            to="/dashboard/gallery"
            className={navLinkStyle("/dashboard/gallery")}
          >
            <GalleryIcon size={20} />
            <span className="font-semibold uppercase text-xs tracking-wider">
              Gallery Manager
            </span>
          </Link>
        </nav>

        {/* Sidebar Logout */}
        <div className="mt-auto pt-6 border-t border-amber-900">
          <button
            onClick={handleLogout}
            className="flex items-center justify-center gap-2 w-full bg-red-500/10 text-red-400 py-3 rounded-xl font-bold hover:bg-red-500 hover:text-white transition-all duration-300 group"
          >
            <LogOut
              size={18}
              className="group-hover:-translate-x-1 transition-transform"
            />
            Logout
          </button>
        </div>
      </aside>

      {/* --- Main Content Area --- */}
      <div className="flex-1 flex flex-col h-screen overflow-hidden">
        {/* --- Top Header --- */}
        <header className="bg-white border-b border-stone-200 py-4 px-10 flex justify-between items-center shadow-sm z-20">
          <div>
            <h1 className="text-amber-900 font-bold text-sm uppercase tracking-tighter">
              {location.pathname
                .replace("/dashboard", "Dashboard")
                .replace("/", " / ")}
            </h1>
          </div>

          <div className="flex items-center">
            <Link
              to="/dashboard/profile"
              className={`flex items-center gap-3 p-1 pr-4 rounded-2xl transition-all duration-300 group
                  ${
                    location.pathname === "/dashboard/profile"
                      ? "bg-amber-50 ring-1 ring-amber-200"
                      : "hover:bg-stone-50"
                  }
                `}
            >
              <div className="relative">
                <div className="w-10 h-10 bg-amber-100 rounded-xl flex items-center justify-center border border-amber-200 text-amber-900 overflow-hidden shadow-sm group-hover:shadow-md transition-shadow">
                  <UserCircle size={28} strokeWidth={1.5} />
                </div>
                <div className="absolute -top-1 -right-1 w-3.5 h-3.5 bg-green-500 border-2 border-white rounded-full"></div>
              </div>

              <div className="text-left hidden sm:block">
                <p className="text-[11px] font-black text-stone-800 uppercase leading-none mb-1 tracking-tight">
                  Profile
                </p>
                <p className="text-[10px] text-stone-400 font-bold leading-none tracking-tighter">
                  Manage Account
                </p>
              </div>
              <ChevronDown
                size={14}
                className="ml-1 text-stone-300 group-hover:text-amber-600 transition-colors"
              />
            </Link>
          </div>
        </header>

        {/* --- Body Content --- */}
        <main className="flex-1 overflow-y-auto p-8 md:p-12 bg-stone-50/50">
          <div className="max-w-6xl mx-auto">
            <Outlet />
          </div>
        </main>
      </div>
    </div>
  );
};

export default Dashboard;