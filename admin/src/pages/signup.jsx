import React, { useState } from "react";
import { Link } from "react-router-dom";
import { User, Phone, Mail, Lock, UserPlus } from "lucide-react"; // Optional icons
import axiosInstance from "../utils/axiosInstance";

export const Signup = () => {
  const [formData, setFormData] = useState({
    name: "",
    phone: "",
    email: "",
    password: "",
  });

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await axiosInstance.post("/signup", formData);
      alert(res.data.message);
    } catch (error) {
      alert(error.response?.data?.message || "Signup failed");
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-stone-50 p-6 font-sans">
      <div className="w-full max-w-lg bg-white rounded-3xl shadow-2xl border border-stone-100 overflow-hidden">
        
        {/* Header Section */}
        <div className="bg-amber-800 p-10 text-center">
          <div className="inline-flex p-3 bg-amber-700/50 rounded-full mb-4">
            <UserPlus className="text-white w-8 h-8" />
          </div>
          <h2 className="text-3xl font-black text-white tracking-tight uppercase">
            Create Admin <span className="font-light">Account</span>
          </h2>
          <p className="text-amber-100/70 text-sm mt-2">Enter details to register as a system administrator</p>
        </div>

        {/* Form Section */}
        <form onSubmit={handleSubmit} className="p-8 md:p-10 space-y-5">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {/* Name Field */}
            <div className="space-y-1.5">
              <label className="text-xs font-bold text-stone-500 uppercase tracking-wider ml-1">Full Name</label>
              <div className="relative">
                <User className="absolute left-3 top-3.5 h-5 w-5 text-stone-400" />
                <input
                  type="text"
                  name="name"
                  placeholder="Admin Name"
                  onChange={handleChange}
                  required
                  className="w-full pl-10 pr-4 py-3 bg-stone-50 border-2 border-stone-100 rounded-xl focus:ring-4 focus:ring-amber-800/10 focus:border-amber-800 outline-none transition-all"
                />
              </div>
            </div>

            {/* Phone Field */}
            <div className="space-y-1.5">
              <label className="text-xs font-bold text-stone-500 uppercase tracking-wider ml-1">Phone Number</label>
              <div className="relative">
                <Phone className="absolute left-3 top-3.5 h-5 w-5 text-stone-400" />
                <input
                  type="text"
                  name="phone"
                  placeholder="9876543210"
                  onChange={handleChange}
                  required
                  className="w-full pl-10 pr-4 py-3 bg-stone-50 border-2 border-stone-100 rounded-xl focus:ring-4 focus:ring-amber-800/10 focus:border-amber-800 outline-none transition-all"
                />
              </div>
            </div>
          </div>

          {/* Email Field */}
          <div className="space-y-1.5">
            <label className="text-xs font-bold text-stone-500 uppercase tracking-wider ml-1">Email Address</label>
            <div className="relative">
              <Mail className="absolute left-3 top-3.5 h-5 w-5 text-stone-400" />
              <input
                type="email"
                name="email"
                placeholder="admin@example.com"
                onChange={handleChange}
                required
                className="w-full pl-10 pr-4 py-3 bg-stone-50 border-2 border-stone-100 rounded-xl focus:ring-4 focus:ring-amber-800/10 focus:border-amber-800 outline-none transition-all"
              />
            </div>
          </div>

          {/* Password Field */}
          <div className="space-y-1.5">
            <label className="text-xs font-bold text-stone-500 uppercase tracking-wider ml-1">Secure Password</label>
            <div className="relative">
              <Lock className="absolute left-3 top-3.5 h-5 w-5 text-stone-400" />
              <input
                type="password"
                name="password"
                placeholder="••••••••"
                onChange={handleChange}
                required
                className="w-full pl-10 pr-4 py-3 bg-stone-50 border-2 border-stone-100 rounded-xl focus:ring-4 focus:ring-amber-800/10 focus:border-amber-800 outline-none transition-all"
              />
            </div>
          </div>

          {/* Signup Button */}
          <button
            type="submit"
            className="w-full bg-amber-800 hover:bg-amber-900 text-white font-bold py-4 rounded-xl shadow-lg shadow-amber-800/30 transition-all active:scale-[0.98] mt-4"
          >
            CREATE ACCOUNT
          </button>

          {/* Footer Link */}
          <div className="text-center pt-6 border-t border-stone-100">
            <p className="text-stone-500 text-sm">
              Already have an admin account?{" "}
              <Link to="/login" className="text-amber-800 font-bold hover:underline underline-offset-4 decoration-2">
                Login Here
              </Link>
            </p>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Signup;