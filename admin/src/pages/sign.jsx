import React, { useState } from "react";
import { Link } from "react-router-dom";
import { Eye, EyeOff, Lock, Mail } from "lucide-react"; // npm install lucide-react
import axiosInstance from "../utils/axiosInstance";

export const Login = () => {
  const [formData, setFormData] = useState({ email: "", password: "" });
  const [showPassword, setShowPassword] = useState(false); // Password കാണിക്കണോ വേണ്ടയോ എന്ന് തീരുമാനിക്കാൻ

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await axiosInstance.post("/login", formData);
      alert(res.data.message);
    } catch (error) {
      alert(error.response?.data?.message || "Login failed");
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-stone-50 font-sans p-4">
      <div className="w-full max-w-md bg-white rounded-3xl shadow-2xl overflow-hidden border border-stone-100">
        
        {/* Header Section */}
        <div className="bg-amber-800 px-8 py-10 text-center relative">
          <h2 className="text-4xl font-black text-white tracking-tighter mb-2 relative z-10">
            ADMIN <span className="font-light">PANEL</span>
          </h2>
          <p className="text-amber-100/80 text-sm font-medium relative z-10">
            Secure Administrator Login
          </p>
        </div>

        {/* Form Section */}
        <form onSubmit={handleSubmit} className="p-8 space-y-6">
          <div className="space-y-4">
            
            {/* Email Field */}
            <div>
              <label className="text-xs font-bold uppercase tracking-widest text-stone-500 ml-1">
                Admin Email
              </label>
              <div className="relative mt-1.5">
                <Mail className="absolute left-4 top-3.5 h-5 w-5 text-stone-400" />
                <input
                  type="email"
                  name="email"
                  onChange={handleChange}
                  required
                  className="w-full pl-12 pr-4 py-3.5 bg-stone-50 border-2 border-stone-100 rounded-xl focus:ring-4 focus:ring-amber-800/10 focus:border-amber-800 outline-none transition-all"
                  placeholder="admin@yourdomain.com"
                />
              </div>
            </div>

            {/* Password Field with Eye Toggle */}
            <div>
              <label className="text-xs font-bold uppercase tracking-widest text-stone-500 ml-1">
                Password
              </label>
              <div className="relative mt-1.5">
                <Lock className="absolute left-4 top-3.5 h-5 w-5 text-stone-400" />
                <input
                  type={showPassword ? "text" : "password"} // State അനുസരിച്ച് ടൈപ്പ് മാറുന്നു
                  name="password"
                  onChange={handleChange}
                  required
                  className="w-full pl-12 pr-12 py-3.5 bg-stone-50 border-2 border-stone-100 rounded-xl focus:ring-4 focus:ring-amber-800/10 focus:border-amber-800 outline-none transition-all"
                  placeholder="••••••••"
                />
                
                {/* Password Toggle Button */}
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-4 top-3.5 text-stone-400 hover:text-amber-800 transition-colors focus:outline-none"
                >
                  {showPassword ? (
                    <EyeOff className="h-5 w-5" />
                  ) : (
                    <Eye className="h-5 w-5" />
                  )}
                </button>
              </div>
            </div>
          </div>

          <button
            type="submit"
            className="w-full bg-amber-800 hover:bg-amber-900 text-white font-bold py-4 rounded-xl shadow-lg shadow-amber-800/30 transition-all active:scale-[0.98]"
          >
            LOGIN
          </button>

          <div className="pt-4 border-t border-stone-100 text-center">
            <p className="text-stone-500 text-sm">
              Don't have an admin account?{" "}
              <Link to="/signup" className="text-amber-800 font-bold hover:underline decoration-2">
                Register Now
              </Link>
            </p>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Login;