import { createElement, useEffect, useState } from "react";
import { Link, Outlet, useNavigate, useLocation } from "react-router-dom";
import {
  LayoutDashboard,
  Image as GalleryIcon,
  ShieldCheck,
  LogOut,
  ChevronDown,
  UserCircle,
  Menu,
  X,
  CalendarDays,
  HandCoins,
} from "lucide-react";
import axiosInstance from "../utils/axiosInstance";

export const Dashboard = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const [sidebarOpen, setSidebarOpen] = useState(false);
  
  const [profileImage, setProfileImage] = useState(localStorage.getItem("profileImage") || "");

  useEffect(() => {
    const token = sessionStorage.getItem("token");
    if (!token) {
      navigate("/login", { replace: true });
    }

    
    const handleStorageChange = () => {
      setProfileImage(localStorage.getItem("profileImage") || "");
    };

    window.addEventListener("storage", handleStorageChange);
    
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
    localStorage.removeItem("profileImage"); 
    navigate("/login", { replace: true });
  };

  const navItems = [
    { to: "/dashboard", label: "Overview", icon: LayoutDashboard },
    { to: "/dashboard/gallery", label: "Gallery", icon: GalleryIcon },
    { to: "/dashboard/festival", label: "Festival", icon: CalendarDays },
    { to: "/dashboard/offerings", label: "Offering", icon: HandCoins },
  ];

  const isActiveRoute = (path) =>
    path === "/dashboard"
      ? location.pathname === "/dashboard"
      : location.pathname.startsWith(path);

  const navLinkStyle = (path) =>
    `flex items-center gap-3 rounded-xl p-3 transition-all duration-200 ${
      isActiveRoute(path)
        ? "bg-amber-700 text-white shadow-lg"
        : "text-amber-100 hover:bg-amber-800/50"
    }`;

  const pageTitle =
    location.pathname === "/dashboard"
      ? "Dashboard / Overview"
      : location.pathname
          .replace("/dashboard/", "Dashboard / ")
          .replace(/-/g, " ");

  const sidebarContent = (
    <>
      <div className="flex items-center gap-3 border-b border-amber-900 px-2 pb-6 lg:mb-10">
        <div className="rounded-xl bg-amber-100 p-2">
          <ShieldCheck className="h-6 w-6 text-amber-950" />
        </div>
        <h2 className="text-lg font-black tracking-widest uppercase sm:text-xl">
          Admin Panel
        </h2>
      </div>

      <nav className="mt-6 flex-1 space-y-2 lg:mt-0">
        {navItems.map(({ to, label, icon }) => (
          <Link
            key={to}
            to={to}
            onClick={() => setSidebarOpen(false)}
            className={navLinkStyle(to)}
          >
            {createElement(icon, { size: 20 })}
            <span className="text-xs font-semibold tracking-wider uppercase">
              {label}
            </span>
          </Link>
        ))}
      </nav>

      <div className="mt-8 border-t border-amber-900 pt-6">
        <button
          onClick={handleLogout}
          className="group flex w-full items-center justify-center gap-2 rounded-xl bg-red-500/10 py-3 font-bold text-red-400 transition-all hover:bg-red-500 hover:text-white"
        >
          <LogOut size={18} /> Logout
        </button>
      </div>
    </>
  );

  return (
    <div className="min-h-screen bg-stone-50 font-sans text-stone-900 lg:flex">
      {sidebarOpen && (
        <button
          type="button"
          aria-label="Close sidebar overlay"
          className="fixed inset-0 z-30 bg-black/40 backdrop-blur-sm lg:hidden"
          onClick={() => setSidebarOpen(false)}
        />
      )}

      <aside
        className={`fixed inset-y-0 left-0 z-40 flex w-[min(18rem,85vw)] flex-col bg-amber-950 p-5 text-white shadow-2xl transition-transform duration-300 lg:sticky lg:top-0 lg:h-screen lg:w-72 lg:translate-x-0 lg:p-6 ${
          sidebarOpen ? "translate-x-0" : "-translate-x-full"
        }`}
      >
        <button
          type="button"
          aria-label="Close sidebar"
          onClick={() => setSidebarOpen(false)}
          className="absolute top-4 right-4 rounded-xl p-2 text-amber-100 hover:bg-amber-900 lg:hidden"
        >
          <X size={20} />
        </button>
        {sidebarContent}
      </aside>

      <div className="flex min-h-screen min-w-0 flex-1 flex-col">
        <header className="sticky top-0 z-20 flex items-center justify-between gap-3 border-b border-stone-200 bg-white px-4 py-3 shadow-sm sm:px-6 lg:px-10 lg:py-4">
          <div className="flex min-w-0 items-center gap-3">
            <button
              type="button"
              aria-label="Open sidebar"
              onClick={() => setSidebarOpen(true)}
              className="rounded-xl border border-stone-200 p-2 text-amber-900 shadow-sm lg:hidden"
            >
              <Menu size={20} />
            </button>
            <h1 className="truncate text-xs font-bold text-amber-900 uppercase sm:text-sm">
              {pageTitle}
            </h1>
          </div>

          <Link
            to="/dashboard/profile"
            className="group flex shrink-0 items-center gap-2 rounded-2xl p-1 transition-all hover:bg-stone-50 sm:gap-3 sm:pr-4"
          >
            <div className="relative">
              <div className="flex h-10 w-10 items-center justify-center overflow-hidden rounded-xl border border-amber-200 bg-amber-100 shadow-sm">
                {profileImage ? (
                  <img
                    src={profileImage}
                    alt="Profile"
                    className="h-full w-full object-cover"
                  />
                ) : (
                  <UserCircle size={28} className="text-amber-900" />
                )}
              </div>
              <div className="absolute -top-1 -right-1 h-3.5 w-3.5 rounded-full border-2 border-white bg-green-500"></div>
            </div>
            <div className="hidden text-left sm:block">
              <p className="mb-1 text-[11px] leading-none font-black text-stone-800 uppercase">
                Profile
              </p>
              <p className="text-[10px] leading-none font-bold text-stone-400">
                Manage Account
              </p>
            </div>
            <ChevronDown
              size={14}
              className="hidden text-stone-300 group-hover:text-amber-600 sm:block"
            />
          </Link>
        </header>

        <main className="flex-1 overflow-x-hidden bg-stone-50/50 p-4 sm:p-6 lg:p-8">
          <div className="mx-auto w-full max-w-6xl">
            <Outlet />
          </div>
        </main>
      </div>
    </div>
  );
};

export default Dashboard;
