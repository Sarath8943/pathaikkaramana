import React, { useState, useEffect } from "react";
import { User, Camera, Shield, CheckCircle, AlertCircle, Lock } from "lucide-react";
import { useNavigate } from "react-router-dom";
import axiosInstance from "../utils/axiosInstance";

export const AdminProfile = () => {
  const navigate = useNavigate();
  const [isEditing, setIsEditing] = useState(false);
  const [loading, setLoading] = useState(false);
  const [adminData, setAdminData] = useState({ name: "", email: "", phone: "", profileImage: "" });
  const [selectedFile, setSelectedFile] = useState(null);
  const [preview, setPreview] = useState(null);
  const [message, setMessage] = useState({ text: "", type: "" });

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const res = await axiosInstance.get("/admin/profile");
        const data = res.data.admin; 
        if (data) {
          setAdminData({ name: data.name, email: data.email, phone: data.phone, profileImage: data.profileImage });
          setPreview(data.profileImage);
          localStorage.setItem("profileImage", data.profileImage || "");
        }
      } catch (err) {
        if (err.response?.status === 401) {
          sessionStorage.clear();
          navigate("/login", { replace: true });
        }
      }
    };
    fetchProfile();
  }, [navigate]);

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setSelectedFile(file);
      setPreview(URL.createObjectURL(file));
    }
  };

  const handleSave = async () => {
    setLoading(true);
    setMessage({ text: "", type: "" });
    const formData = new FormData();
    formData.append("name", adminData.name);
    formData.append("email", adminData.email);
    formData.append("phone", adminData.phone);
    if (selectedFile) formData.append("profilePic", selectedFile);

    try {
      const res = await axiosInstance.put("/admin/update-profile", formData, {
        headers: { "Content-Type": "multipart/form-data" },
      });

      if (res.data) {
        setMessage({ text: "Profile updated successfully!", type: "success" });
        const updated = res.data.admin;
        setAdminData(updated);

        if (updated.profileImage) {
          localStorage.setItem("profileImage", updated.profileImage);
          window.dispatchEvent(new Event("storage"));
        }

        setIsEditing(false);
        setSelectedFile(null);
      }
    } catch {
      setMessage({ text: "Update failed. Try again.", type: "error" });
    } finally {
      setLoading(false);
    }
  };

  const inputStyle = `w-full px-4 py-3 rounded-xl border transition-all outline-none ${
    isEditing ? "bg-white border-amber-200 focus:ring-2 focus:ring-amber-500 text-stone-900" : "bg-stone-50 border-transparent text-stone-500 cursor-not-allowed"
  }`;

  return (
    <div className="mx-auto max-w-4xl space-y-6 animate-in fade-in duration-700">
      <div className="overflow-hidden rounded-2xl border border-stone-100 bg-white shadow-sm sm:rounded-[2rem] lg:rounded-[2.5rem]">
        <div className="relative h-24 bg-amber-900"></div>
        <div className="px-4 pb-8 sm:px-6 md:px-10 md:pb-10">
          <div className="relative -mt-12 mb-8 flex flex-col items-center gap-5 md:flex-row md:items-end md:gap-6">
            <div className="relative group">
              <div className="flex h-28 w-28 items-center justify-center overflow-hidden rounded-3xl border-4 border-white bg-stone-200 shadow-xl sm:h-32 sm:w-32 sm:rounded-[2rem]">
                {preview ? <img src={preview} alt="Profile" className="w-full h-full object-cover" /> : <User size={50} className="text-stone-400" />}
              </div>
              {isEditing && (
                <label className="absolute inset-0 flex items-center justify-center bg-black/40 rounded-[2rem] cursor-pointer opacity-0 group-hover:opacity-100 transition-opacity">
                  <Camera className="text-white" /><input type="file" className="hidden" onChange={handleImageChange} accept="image/*" />
                </label>
              )}
            </div>
            <div className="min-w-0 flex-1 text-center md:text-left">
              <h2 className="break-words text-2xl font-black tracking-tight text-stone-800 uppercase">{adminData.name || "Admin"}</h2>
              <p className="text-amber-700 font-bold text-xs uppercase tracking-widest mt-1 flex items-center justify-center md:justify-start gap-1"><Shield size={14} /> System Administrator</p>
            </div>
            <button onClick={() => isEditing ? handleSave() : setIsEditing(true)} className={`w-full rounded-2xl px-8 py-3 font-bold shadow-lg transition-all sm:w-auto ${isEditing ? "bg-emerald-600 text-white hover:bg-emerald-700" : "bg-stone-900 text-white hover:bg-stone-800"}`}>{loading ? "Saving..." : isEditing ? "Save Changes" : "Edit Profile"}</button>
          </div>
          {message.text && (
            <div className={`mb-6 p-4 rounded-xl text-sm font-bold flex items-center gap-2 ${message.type === "success" ? "bg-emerald-50 text-emerald-700" : "bg-rose-50 text-rose-700"}`}>
              {message.type === "success" ? <CheckCircle size={18} /> : <AlertCircle size={18} />}{message.text}
            </div>
          )}
          <div className="grid grid-cols-1 gap-5 md:grid-cols-2 md:gap-6">
            <div className="space-y-2"><label className="text-[10px] font-black text-stone-400 uppercase tracking-widest ml-1">Full Name</label><input disabled={!isEditing} className={inputStyle} value={adminData.name} onChange={(e) => setAdminData({ ...adminData, name: e.target.value })} /></div>
            <div className="space-y-2"><label className="text-[10px] font-black text-stone-400 uppercase tracking-widest ml-1">Phone Number</label><input disabled={!isEditing} className={inputStyle} value={adminData.phone} onChange={(e) => setAdminData({ ...adminData, phone: e.target.value })} /></div>
            <div className="space-y-2 md:col-span-2"><label className="text-[10px] font-black text-stone-400 uppercase tracking-widest ml-1">Email Address</label><input disabled={!isEditing} className={inputStyle} value={adminData.email} onChange={(e) => setAdminData({ ...adminData, email: e.target.value })} /></div>
          </div>
        </div>
      </div>
      <div className="flex justify-center"><button onClick={() => navigate("/dashboard/change-password")} className="flex flex-wrap items-center justify-center gap-2 rounded-lg px-4 py-2 text-center text-xs font-bold tracking-widest text-stone-400 uppercase transition-colors hover:text-amber-800"><Lock size={14} /> Change Account Password</button></div>
    </div>
  );
};

export default AdminProfile;
