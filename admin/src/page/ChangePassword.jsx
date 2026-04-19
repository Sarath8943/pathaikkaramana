import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  Lock,
  KeyRound,
  CheckCircle2,
  AlertCircle,
  ShieldCheck,
  Eye,
  EyeOff,
  ArrowLeft,
} from "lucide-react";
import axiosInstance from "../utils/axiosInstance";

const ChangePassword = () => {
  const navigate = useNavigate();

  const [passwords, setPasswords] = useState({
    oldPassword: "",
    newPassword: "",
    confirmPassword: "",
  });

  const [showOld, setShowOld] = useState(false);
  const [showNew, setShowNew] = useState(false);
  const [showConfirm, setShowConfirm] = useState(false);

  const [loading, setLoading] = useState(false);
  const [feedback, setFeedback] = useState({ message: "", type: "" });

  const handleChange = (e) => {
    setPasswords({ ...passwords, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (passwords.newPassword !== passwords.confirmPassword) {
      return setFeedback({
        message: "New passwords do not match!",
        type: "error",
      });
    }

    setLoading(true);
    setFeedback({ message: "", type: "" });

    try {
      const response = await axiosInstance.put("/admin/change-password", {
        oldPassword: passwords.oldPassword,
        newPassword: passwords.newPassword,
      });

      setFeedback({
        message: "Success! Redirecting to login...",
        type: "success",
      });

      sessionStorage.removeItem("token");
      sessionStorage.removeItem("role");

      setTimeout(() => {
        navigate("/login", { replace: true });
      }, 2000);
    } catch (error) {
      const errorMsg =
        error.response?.data?.message || "Failed to update password";
      setFeedback({ message: errorMsg, type: "error" });
    } finally {
      setLoading(false);
    }
  };

  const inputStyle =
    "w-full pl-10 pr-12 py-3 bg-amber-50/50 border border-amber-200 rounded-xl focus:ring-2 focus:ring-amber-600 focus:border-transparent outline-none transition-all";
  const iconStyle =
    "absolute left-3 top-1/2 -translate-y-1/2 text-amber-700 w-5 h-5";
  const eyeIconStyle =
    "absolute right-4 top-1/2 -translate-y-1/2 text-amber-400 hover:text-amber-700 cursor-pointer transition-colors";

  return (
    <div className="min-h-screen bg-stone-50 flex items-center justify-center p-4">
      <div className="max-w-xl w-full bg-white rounded-[2.5rem] shadow-2xl border border-amber-100 overflow-hidden">
        <div className="bg-amber-800 p-8 text-white relative">
          <button
            type="button"
            onClick={(e) => {
              e.preventDefault();
              navigate("/dashboard/profile");
            }}
            className="absolute top-6 right-6 text-amber-200 hover:text-white flex items-center gap-1 text-sm font-bold transition-all z-50 cursor-pointer bg-amber-900/30 py-2 px-3 rounded-lg border border-amber-700/50 hover:bg-amber-700"
          >
            <ArrowLeft size={18} />
            <span>Back to profile</span>
          </button>

          <div className="relative z-10">
            <ShieldCheck className="w-12 h-12 mb-3 text-amber-300" />
            <h2 className="text-2xl font-bold">Security Settings</h2>
            <p className="text-amber-200/80 text-sm">
              Update your administrator password
            </p>
          </div>

          <div className="absolute top-0 right-0 w-32 h-32 bg-amber-700/30 rounded-full -mr-16 -mt-16 blur-2xl pointer-events-none"></div>
        </div>

        <form onSubmit={handleSubmit} className="p-8 lg:p-12 space-y-6">
          {feedback.message && (
            <div
              className={`p-4 rounded-2xl text-sm font-medium flex items-center gap-3 animate-bounce-short ${
                feedback.type === "success"
                  ? "bg-emerald-50 text-emerald-700 border border-emerald-100"
                  : "bg-rose-50 text-rose-700 border border-rose-100"
              }`}
            >
              {feedback.type === "success" ? (
                <CheckCircle2 className="w-5 h-5" />
              ) : (
                <AlertCircle className="w-5 h-5" />
              )}
              {feedback.message}
            </div>
          )}

          <div className="space-y-1">
            <label className="text-xs font-bold uppercase tracking-widest text-amber-900 ml-1">
              Current Password
            </label>
            <div className="relative">
              <Lock className={iconStyle} />
              <input
                type={showOld ? "text" : "password"}
                name="oldPassword"
                value={passwords.oldPassword}
                placeholder="••••••••"
                required
                className={inputStyle}
                onChange={handleChange}
              />
              <div
                onClick={() => setShowOld(!showOld)}
                className={eyeIconStyle}
              >
                {showOld ? <EyeOff size={18} /> : <Eye size={18} />}
              </div>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 pt-2">
            <div className="space-y-1">
              <label className="text-xs font-bold uppercase tracking-widest text-amber-900 ml-1">
                New Password
              </label>
              <div className="relative">
                <KeyRound className={iconStyle} />
                <input
                  type={showNew ? "text" : "password"}
                  name="newPassword"
                  value={passwords.newPassword}
                  placeholder="••••••••"
                  required
                  className={inputStyle}
                  onChange={handleChange}
                />
                <div
                  onClick={() => setShowNew(!showNew)}
                  className={eyeIconStyle}
                >
                  {showNew ? <EyeOff size={18} /> : <Eye size={18} />}
                </div>
              </div>
            </div>

            <div className="space-y-1">
              <label className="text-xs font-bold uppercase tracking-widest text-amber-900 ml-1">
                Confirm New
              </label>
              <div className="relative">
                <Lock className={iconStyle} />
                <input
                  type={showConfirm ? "text" : "password"}
                  name="confirmPassword"
                  value={passwords.confirmPassword}
                  placeholder="••••••••"
                  required
                  className={inputStyle}
                  onChange={handleChange}
                />
                <div
                  onClick={() => setShowConfirm(!showConfirm)}
                  className={eyeIconStyle}
                >
                  {showConfirm ? <EyeOff size={18} /> : <Eye size={18} />}
                </div>
              </div>
            </div>
          </div>

          <div className="pt-4">
            <button
              type="submit"
              disabled={loading}
              className="w-full bg-amber-800 text-white py-4 rounded-2xl font-bold text-lg hover:bg-amber-900 transition-all active:scale-[0.98] disabled:bg-amber-200 shadow-xl shadow-amber-900/10 flex items-center justify-center gap-2"
            >
              {loading ? "Processing..." : " Change Password"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default ChangePassword;
