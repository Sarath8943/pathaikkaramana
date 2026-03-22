import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Mail, Lock, ShieldCheck, LogIn, AlertCircle } from "lucide-react";
import axiosInstance from "../utils/axiosInstance";

export const Login = () => {
  const navigate = useNavigate();
  const [form, setForm] = useState({ email: "", password: "" });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [isOffline, setIsOffline] = useState(
    typeof navigator !== "undefined" ? !navigator.onLine : false,
  );

  useEffect(() => {
    const existingToken = sessionStorage.getItem("token");
    if (existingToken) {
      navigate("/dashboard", { replace: true });
    }
  }, [navigate]);

  useEffect(() => {
    const handleOnline = () => {
      setIsOffline(false);
      setError("");
    };

    const handleOffline = () => {
      setIsOffline(true);
      setError("No internet connection. Reconnect and try signing in again.");
    };

    window.addEventListener("online", handleOnline);
    window.addEventListener("offline", handleOffline);

    return () => {
      window.removeEventListener("online", handleOnline);
      window.removeEventListener("offline", handleOffline);
    };
  }, []);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleLogin = async (e) => {
    e.preventDefault();
    if (typeof navigator !== "undefined" && !navigator.onLine) {
      setIsOffline(true);
      setError("No internet connection. Reconnect and try signing in again.");
      return;
    }

    setLoading(true);
    setError("");

    try {
      const res = await axiosInstance.post("/admin/login", form);

      // മാറ്റം വരുത്തിയത് ഇവിടെയാണ്: localStorage-ന് പകരം sessionStorage ഉപയോഗിക്കുന്നു
      sessionStorage.setItem("token", res.data.token);

      // ഡാഷ്ബോർഡിലേക്ക് പോകുന്നു
      navigate("/dashboard", { replace: true });
    } catch (error) {
      const errorMsg =
        error.code === "ERR_NETWORK" || !error.response
          ? "Unable to reach the server. Check your internet connection and try again."
          :
        error.response?.data?.message ||
        "Invalid email or password. Please try again.";
      setError(errorMsg);
    } finally {
      setLoading(false);
    }
  };

  const inputStyle =
    "w-full pl-10 pr-4 py-3 bg-amber-50/50 border border-amber-200 rounded-xl focus:ring-2 focus:ring-amber-600 focus:border-transparent outline-none transition-all placeholder:text-amber-300 text-amber-950";
  const iconStyle =
    "absolute left-3 top-1/2 -translate-y-1/2 text-amber-700 w-5 h-5";

  return (
    <div className="min-h-screen flex items-center justify-center bg-stone-50 p-6">
      <div className="w-full max-w-4xl bg-white rounded-[2.5rem] shadow-2xl overflow-hidden flex flex-col md:flex-row border border-amber-100">
        {/* Left Side: Branding */}
        <div className="md:w-2/5 bg-amber-800 p-10 text-white flex flex-col justify-between relative overflow-hidden">
          <div className="relative z-10">
            <ShieldCheck className="w-12 h-12 mb-6 text-amber-300" />
            <h2 className="text-3xl font-bold leading-tight">
              Admin
              <br />
              Console
            </h2>
            <p className="text-amber-100/80 mt-4 font-light leading-relaxed">
              Securely sign in to manage your platform. Closing the tab will end
              your session.
            </p>
          </div>
          <div className="relative z-10 text-sm text-amber-200/50 italic font-mono">
            System Auth v2.1
          </div>
          <div className="absolute -bottom-20 -left-20 w-64 h-64 bg-amber-700 rounded-full opacity-50 blur-3xl"></div>
        </div>

        {/* Right Side: Form */}
        <div className="flex-1 p-10 lg:p-14 bg-white">
          <div className="mb-8">
            <h3 className="text-2xl font-bold text-stone-800">Welcome Back</h3>
            <p className="text-stone-500 text-sm">
              Please enter your admin credentials
            </p>
          </div>

          {isOffline && (
            <div className="mb-4 p-4 rounded-xl text-sm font-medium bg-amber-50 text-amber-800 border border-amber-200 flex items-center gap-2">
              <AlertCircle size={18} />
              You appear to be offline. The admin login needs an internet connection.
            </div>
          )}

          {error && (
            <div className="mb-6 p-4 rounded-xl text-sm font-medium bg-rose-50 text-rose-700 border border-rose-100 flex items-center gap-2">
              <AlertCircle size={18} />
              {error}
            </div>
          )}

          <form onSubmit={handleLogin} className="space-y-5">
            <div className="relative">
              <label className="block text-xs font-bold uppercase tracking-wider text-amber-800 mb-1 ml-1">
                Admin Email
              </label>
              <div className="relative">
                <Mail className={iconStyle} />
                <input
                  type="email"
                  name="email"
                  placeholder="admin@example.com"
                  required
                  className={inputStyle}
                  onChange={handleChange}
                />
              </div>
            </div>

            <div className="relative">
              <label className="block text-xs font-bold uppercase tracking-wider text-amber-800 mb-1 ml-1">
                Password
              </label>
              <div className="relative">
                <Lock className={iconStyle} />
                <input
                  type="password"
                  name="password"
                  placeholder="••••••••"
                  required
                  className={inputStyle}
                  onChange={handleChange}
                />
              </div>
            </div>

            <div className="space-y-3 pt-2">
              <button
                type="submit"
                disabled={loading || isOffline}
                className="w-full bg-amber-800 text-white py-4 rounded-2xl font-bold hover:bg-amber-900 transition-all shadow-xl active:scale-[0.97] disabled:bg-amber-800 flex items-center justify-center gap-2 group"
              >
                {loading ? (
                  "Verifying..."
                ) : (
                  <>
                    Sign In
                    <LogIn className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                  </>
                )}
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Login;
