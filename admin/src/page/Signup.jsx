import React, { useState } from "react";
import { useNavigate, Link } from "react-router-dom"; // 1. Link കൂടി ഇമ്പോർട്ട് ചെയ്തു
import { User, Mail, Phone, Lock, ShieldCheck, ArrowRight } from "lucide-react";
import axiosInstance from "../utils/axiosInstance";

export const AdminSignup = () => {
  const navigate = useNavigate();
  
  const [formData, setFormData] = useState({
    name: "",
    phone: "",
    email: "",
    password: "",
  });

  const [loading, setLoading] = useState(false);
  const [feedback, setFeedback] = useState({ message: "", type: "" });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setFeedback({ message: "", type: "" });

    try {
      const response = await axiosInstance.post("/admin/signup", formData);
      if (response.status === 201 || response.status === 200) {
        setFeedback({ message: "Registration Success! Redirecting...", type: "success" });
        setTimeout(() => {
          navigate("/dashboard");
        }, 1500);
      }
    } catch (error) {
      const errorMsg = error.response?.data?.message || "Registration failed. Try again.";
      setFeedback({ message: errorMsg, type: "error" });
    } finally {
      setLoading(false);
    }
  };

  const inputStyle = "w-full pl-10 pr-4 py-3 bg-amber-50/50 border border-amber-200 rounded-xl focus:ring-2 focus:ring-amber-600 focus:border-transparent outline-none transition-all placeholder:text-amber-400";
  const iconStyle = "absolute left-3 top-1/2 -translate-y-1/2 text-amber-700 w-5 h-5";

  return (
    <div className="min-h-screen flex items-center justify-center bg-stone-50 p-6">
      <div className="w-full max-w-4xl bg-white rounded-[2.5rem] shadow-2xl overflow-hidden flex flex-col md:flex-row border border-amber-100">
        
        {/* Left Side: Branding */}
        <div className="md:w-2/5 bg-amber-800 p-10 text-white flex flex-col justify-between relative overflow-hidden">
          <div className="relative z-10">
            <ShieldCheck className="w-12 h-12 mb-6 text-amber-300" />
            <h2 className="text-3xl font-bold leading-tight">Admin<br/>Registration</h2>
            <p className="text-amber-100/80 mt-4 font-light leading-relaxed">
              Create your secure administrator account to start managing the platform effectively.
            </p>
          </div>
          <div className="relative z-10 text-sm text-amber-200/50 italic">
            Secure Infrastructure v2.0
          </div>
          {/* Decorative background circle */}
          <div className="absolute -bottom-20 -left-20 w-64 h-64 bg-amber-700 rounded-full opacity-50 blur-3xl"></div>
        </div>

        {/* Right Side: Form */}
        <div className="flex-1 p-10 lg:p-14 bg-white">
          <div className="mb-8">
            <h3 className="text-2xl font-bold text-stone-800">Get Started</h3>
            <p className="text-stone-500 text-sm">Fill in the details below</p>
          </div>

          {feedback.message && (
            <div className={`mb-6 p-4 rounded-xl text-sm font-medium animate-pulse ${
              feedback.type === "success" ? "bg-emerald-50 text-emerald-700 border border-emerald-100" : "bg-rose-50 text-rose-700 border border-rose-100"
            }`}>
              {feedback.message}
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="relative">
              <User className={iconStyle} />
              <input type="text" name="name" placeholder="Full Name" required className={inputStyle} onChange={handleChange} />
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="relative">
                <Mail className={iconStyle} />
                <input type="email" name="email" placeholder="Email Address" required className={inputStyle} onChange={handleChange} />
              </div>
              <div className="relative">
                <Phone className={iconStyle} />
                <input type="text" name="phone" placeholder="Phone Number" required className={inputStyle} onChange={handleChange} />
              </div>
            </div>

            <div className="relative">
              <Lock className={iconStyle} />
              <input type="password" name="password" placeholder="Strong Password" required className={inputStyle} onChange={handleChange} />
            </div>

            <button
              type="submit"
              disabled={loading}
              className="w-full bg-amber-800 text-white py-4 rounded-2xl font-bold hover:bg-amber-900 transition-all shadow-xl shadow-amber-900/10 active:scale-[0.97] disabled:bg-amber-300 flex items-center justify-center gap-2 group"
            >
              {loading ? "Processing..." : (
                <>
                  Registration
                  <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                </>
              )}
            </button>
          </form>

          {/* --- LOGIN OPTION --- */}
          <div className="mt-8 pt-6 border-t border-stone-100 text-center">
            <p className="text-stone-500 text-sm font-medium">
              Already have an admin account?{" "}
              <Link 
                to="/login" 
                className="text-amber-700 hover:text-amber-900 font-bold underline underline-offset-4 transition-colors"
              >
                Log In Here
              </Link>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminSignup;