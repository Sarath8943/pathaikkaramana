import React, { useState, useEffect } from "react";
import axiosInstance from "../utils/axiosInstance";
import {
  FiTrash2,
  FiPlus,
  FiCheckCircle,
  FiVideo,
  FiX,
  FiEye,
} from "react-icons/fi";

const MediaGallery = () => {
  const [mediaList, setMediaList] = useState([]);
  const [loading, setLoading] = useState(true);
  const [file, setFile] = useState(null);
  const [year, setYear] = useState("");
  const [uploading, setUploading] = useState(false);
  const [showSuccess, setShowSuccess] = useState(false);
  const [previewItem, setPreviewItem] = useState(null);

  // 1. Fetch all media from backend
  const fetchMedia = async () => {
    try {
      setLoading(true);
      const res = await axiosInstance.get("/media");
      const data = Array.isArray(res.data)
        ? res.data
        : res.data.media || res.data.data || [];
      setMediaList(data);
    } catch (err) {
      console.error("Fetch Error:", err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchMedia();
  }, []);

  // 2. Handle File Upload
  const handleUpload = async (e) => {
    e.preventDefault();
    if (!file || !year) return;

    const formData = new FormData();
    formData.append("file", file); // Ensure backend uses upload.single("file")
    formData.append("year", year);

    const fileType = file.type.startsWith("video") ? "video" : "image";
    formData.append("type", fileType);

    try {
      setUploading(true);
      await axiosInstance.post("/media/upload", formData, {
        headers: { "Content-Type": "multipart/form-data" },
      });

      await fetchMedia(); // Refresh list
      setFile(null);
      setYear("");
      e.target.reset();

      setShowSuccess(true);
      setTimeout(() => setShowSuccess(false), 3000);
    } catch (err) {
      console.error("Upload failed", err);
      alert("Upload failed! Check backend logs.");
    } finally {
      setUploading(false);
    }
  };

  // 3. Handle Delete
  const handleDelete = async (id) => {
    try {
      await axiosInstance.delete(`/media/${id}`);
      setMediaList((prev) => prev.filter((item) => item._id !== id));
    } catch (err) {
      console.error("Delete failed");
    }
  };

  // Stats calculation
  const totalPhotos = mediaList.filter((item) => item.type === "image").length;
  const totalVideos = mediaList.filter((item) => item.type === "video").length;

  return (
    <div className="p-4 md:p-8 max-w-7xl mx-auto font-sans bg-amber-50/20 min-h-screen">
      {/* Header & Stats */}
      <header className="flex flex-col md:flex-row justify-between items-start md:items-end gap-6 mb-10">
        <div>
          <h1 className="text-4xl font-black text-amber-950 tracking-tighter italic">
            Media Manager
          </h1>
        </div>

        <div className="flex gap-4 w-full md:w-auto">
          <div className="flex-1 md:min-w-[120px] bg-white border-b-4 border-amber-800 p-4 rounded-3xl shadow-sm text-center">
            <p className="text-[10px] font-black text-amber-500 uppercase">
              Photos
            </p>
            <p className="text-2xl font-black text-amber-900">{totalPhotos}</p>
          </div>
          <div className="flex-1 md:min-w-[120px] bg-white border-b-4 border-amber-950 p-4 rounded-3xl shadow-sm text-center">
            <p className="text-[10px] font-black text-amber-500 uppercase">
              Videos
            </p>
            <p className="text-2xl font-black text-amber-900">{totalVideos}</p>
          </div>
        </div>
      </header>

      {/* Success Alert */}
      {showSuccess && (
        <div className="fixed top-10 left-1/2 -translate-x-1/2 z-[100] bg-amber-800 text-white px-8 py-4 rounded-full shadow-2xl flex items-center gap-3 animate-bounce">
          <FiCheckCircle size={20} />
          <span className="font-bold tracking-wide">
            Uploaded successfully!
          </span>
        </div>
      )}

      {/* Upload Form Section */}
      <div className="bg-white p-6 md:p-10 rounded-[3rem] shadow-xl border border-amber-100 mb-16 transition-all">
        <h2 className="text-xl font-black mb-8 flex items-center gap-3 text-amber-950 uppercase tracking-tight">
          <span className="p-3 bg-amber-100 rounded-2xl">
            <FiPlus className="text-amber-900" />
          </span>
          Add New Content
        </h2>
        <form
          onSubmit={handleUpload}
          className="grid grid-cols-1 md:grid-cols-3 gap-8 items-end"
        >
          <div className="space-y-3">
            <label className="text-[11px] font-black uppercase text-amber-600 ml-2">
              Archive Year
            </label>
            <input
              type="text"
              placeholder="year"
              value={year}
              onChange={(e) => setYear(e.target.value)}
              className="w-full p-4 bg-amber-50/50 border-2 border-transparent rounded-2xl outline-none focus:border-amber-500 font-bold text-amber-900 transition-all shadow-inner"
              required
            />
          </div>
          <div className="space-y-3">
            <label className="text-[11px] font-black uppercase text-amber-600 ml-2">
              Choose File
            </label>
            <input
              type="file"
              onChange={(e) => setFile(e.target.files[0])}
              className="w-full p-2.5 text-xs bg-amber-50/50 border-2 border-dashed border-amber-200 rounded-2xl cursor-pointer file:bg-amber-900 file:text-white file:border-0 file:px-5 file:py-2.5 file:rounded-xl file:font-black file:uppercase file:text-[10px] file:mr-4 hover:border-amber-400 transition-colors"
              required
            />
          </div>
          <button
            disabled={uploading}
            className={`w-full py-4.5 rounded-2xl font-black text-sm uppercase tracking-widest text-white shadow-lg transition-all transform active:scale-95 h-[58px] ${
              uploading
                ? "bg-amber-300 animate-pulse"
                : "bg-amber-900 hover:bg-amber-800"
            }`}
          >
            {uploading ? "Uploading." : "upload"}
          </button>
        </form>
      </div>

      {/* Media Grid List */}
      <div className="mb-10 flex items-center justify-between px-2">
        <h3 className="text-sm font-black text-amber-900/40 uppercase tracking-[0.3em]">
          Recent Archive
        </h3>
        <div className="h-px flex-1 bg-amber-100 mx-6 hidden md:block"></div>
      </div>

      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-6">
        {mediaList.map((item) => (
          <div
            key={item._id}
            className="group relative aspect-square bg-white rounded-[2.5rem] overflow-hidden shadow-md border-4 border-white transition-all hover:shadow-2xl"
          >
            {item.type === "image" ? (
              <img
                src={item.url}
                alt=""
                className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
              />
            ) : (
              <div className="w-full h-full bg-amber-950 flex items-center justify-center">
                <FiVideo size={48} className="text-amber-100/20" />
                <div className="absolute inset-0 flex items-center justify-center">
                  <div className="w-12 h-12 bg-white/10 rounded-full flex items-center justify-center backdrop-blur-sm">
                    <FiVideo className="text-white" />
                  </div>
                </div>
              </div>
            )}

            {/* Year Tag */}
            <div className="absolute top-4 left-4 bg-white/90 backdrop-blur-md px-3 py-1.5 rounded-2xl text-[10px] font-black text-amber-900 shadow-sm border border-amber-50">
              {item.year}
            </div>

            {/* Hover Actions */}
            <div className="absolute inset-0 bg-amber-950/60 backdrop-blur-[2px] opacity-0 group-hover:opacity-100 transition-all duration-400 flex items-center justify-center gap-4">
              <button
                onClick={() => setPreviewItem(item)}
                className="p-4 bg-white text-amber-950 rounded-2xl shadow-xl hover:bg-amber-50 transition-transform hover:scale-110 active:scale-90"
              >
                <FiEye size={22} />
              </button>
              <button
                onClick={() => handleDelete(item._id)}
                className="p-4 bg-red-500 text-white rounded-2xl shadow-xl hover:bg-red-600 transition-transform hover:scale-110 active:scale-90"
              >
                <FiTrash2 size={22} />
              </button>
            </div>
          </div>
        ))}
      </div>

      {/* Loading & Empty States */}
      {loading && (
        <p className="text-center text-amber-900 font-bold animate-pulse mt-10">
          Loading Archive...
        </p>
      )}
      {!loading && mediaList.length === 0 && (
        <div className="text-center py-24 bg-white rounded-[4rem] border-4 border-dashed border-amber-50 mt-10">
          <p className="text-amber-900/30 text-xl font-black italic uppercase tracking-widest">
            No Media Found
          </p>
        </div>
      )}

      {/* PREVIEW MODAL - FULL IMAGE VIEW */}
      {previewItem && (
        <div className="fixed inset-0 z-[200] flex items-center justify-center p-4 md:p-10 bg-black/95 backdrop-blur-md transition-all">
          <button
            onClick={() => setPreviewItem(null)}
            className="absolute top-8 right-8 p-4 bg-white/5 text-white rounded-full hover:bg-white/20 transition-all border border-white/10"
          >
            <FiX size={28} />
          </button>

          <div className="w-full h-full flex items-center justify-center">
            {previewItem.type === "image" ? (
              <img
                src={previewItem.url}
                className="max-w-full max-h-full object-contain select-none shadow-2xl rounded-sm"
                alt="Full View"
              />
            ) : (
              <video
                src={previewItem.url}
                controls
                autoPlay
                className="max-w-full max-h-full shadow-2xl rounded-xl outline-none"
              />
            )}
          </div>

          <div className="absolute bottom-10 px-6 py-2 bg-white/5 backdrop-blur-xl rounded-full border border-white/10">
            <p className="text-white text-sm font-black italic tracking-widest uppercase">
              Archive {previewItem.year}
            </p>
          </div>
        </div>
      )}
    </div>
  );
};

export default MediaGallery;
