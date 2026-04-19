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
    } catch (err) {
      setMessage({ text: "Update failed. Try again.", type: "error" });
    } finally {
      setLoading(false);
    }
  };

  const inputStyle = `w-full px-4 py-3 rounded-xl border transition-all outline-none ${
    isEditing ? "bg-white border-amber-200 focus:ring-2 focus:ring-amber-500 text-stone-900" : "bg-stone-50 border-transparent text-stone-500 cursor-not-allowed"
  }`;

  return (
    <div className="max-w-4xl mx-auto space-y-6 animate-in fade-in duration-700">
      <div className="bg-white rounded-[2.5rem] shadow-sm border border-stone-100 overflow-hidden">
        <div className="bg-amber-900 h-24 relative"></div>
        <div className="px-6 md:px-10 pb-10">
          <div className="relative -mt-12 mb-8 flex flex-col md:flex-row items-center md:items-end gap-6">
            <div className="relative group">
              <div className="w-32 h-32 rounded-[2rem] bg-stone-200 border-4 border-white shadow-xl overflow-hidden flex items-center justify-center">
                {preview ? <img src={preview} alt="Profile" className="w-full h-full object-cover" /> : <User size={50} className="text-stone-400" />}
              </div>
              {isEditing && (
                <label className="absolute inset-0 flex items-center justify-center bg-black/40 rounded-[2rem] cursor-pointer opacity-0 group-hover:opacity-100 transition-opacity">
                  <Camera className="text-white" /><input type="file" className="hidden" onChange={handleImageChange} accept="image/*" />
                </label>
              )}
            </div>
            <div className="flex-1 text-center md:text-left">
              <h2 className="text-2xl font-black text-stone-800 uppercase tracking-tight">{adminData.name || "Admin"}</h2>
              <p className="text-amber-700 font-bold text-xs uppercase tracking-widest mt-1 flex items-center justify-center md:justify-start gap-1"><Shield size={14} /> System Administrator</p>
            </div>
            <button onClick={() => isEditing ? handleSave() : setIsEditing(true)} className={`px-8 py-3 rounded-2xl font-bold transition-all shadow-lg ${isEditing ? "bg-emerald-600 text-white hover:bg-emerald-700" : "bg-stone-900 text-white hover:bg-stone-800"}`}>{loading ? "Saving..." : isEditing ? "Save Changes" : "Edit Profile"}</button>
          </div>
          {message.text && (
            <div className={`mb-6 p-4 rounded-xl text-sm font-bold flex items-center gap-2 ${message.type === "success" ? "bg-emerald-50 text-emerald-700" : "bg-rose-50 text-rose-700"}`}>
              {message.type === "success" ? <CheckCircle size={18} /> : <AlertCircle size={18} />}{message.text}
            </div>
          )}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-2"><label className="text-[10px] font-black text-stone-400 uppercase tracking-widest ml-1">Full Name</label><input disabled={!isEditing} className={inputStyle} value={adminData.name} onChange={(e) => setAdminData({ ...adminData, name: e.target.value })} /></div>
            <div className="space-y-2"><label className="text-[10px] font-black text-stone-400 uppercase tracking-widest ml-1">Phone Number</label><input disabled={!isEditing} className={inputStyle} value={adminData.phone} onChange={(e) => setAdminData({ ...adminData, phone: e.target.value })} /></div>
            <div className="space-y-2 md:col-span-2"><label className="text-[10px] font-black text-stone-400 uppercase tracking-widest ml-1">Email Address</label><input disabled={!isEditing} className={inputStyle} value={adminData.email} onChange={(e) => setAdminData({ ...adminData, email: e.target.value })} /></div>
          </div>
        </div>
      </div>
      <div className="flex justify-center"><button onClick={() => navigate("/dashboard/change-password")} className="flex items-center gap-2 text-stone-400 hover:text-amber-800 transition-colors py-2 px-4 rounded-lg text-xs font-bold uppercase tracking-widest"><Lock size={14} /> Change Account Password</button></div>
    </div>
  );
};

export default AdminProfile;
