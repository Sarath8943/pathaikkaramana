import React, { useEffect, useState } from "react";
import axiosInstance from "../utils/axiosInstance";
import { FiEye, FiTrash2, FiVideo, FiX } from "react-icons/fi";

const MediaGallery = () => {
  const [mediaList, setMediaList] = useState([]);
  const [loading, setLoading] = useState(true);
  const [file, setFile] = useState(null);
  const [year, setYear] = useState("");
  const [uploading, setUploading] = useState(false);
  const [previewItem, setPreviewItem] = useState(null);

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

  const handleUpload = async (e) => {
    e.preventDefault();
    if (!file || !year) return;

    const formData = new FormData();
    formData.append("file", file);
    formData.append("year", year);
    formData.append("type", file.type.startsWith("video") ? "video" : "image");

    try {
      setUploading(true);
      await axiosInstance.post("/media/upload", formData, {
        headers: { "Content-Type": "multipart/form-data" },
      });
      await fetchMedia();
      setFile(null);
      setYear("");
      e.target.reset();
    } catch (err) {
      console.error("Upload failed", err);
      alert("Upload failed! Check backend logs.");
    } finally {
      setUploading(false);
    }
  };

  const handleDelete = async (id) => {
    try {
      await axiosInstance.delete(`/media/${id}`);
      setMediaList((prev) => prev.filter((item) => item._id !== id));
    } catch (err) {
      console.error("Delete failed", err);
    }
  };

  return (
    <div className="min-h-screen max-w-7xl mx-auto bg-amber-50/20 p-4 md:p-8 font-sans">
      <header className="mb-10 flex flex-col items-start justify-between gap-6 md:flex-row md:items-end">
        <h1 className="text-4xl font-black uppercase italic tracking-tighter text-amber-950">
          Media Manager
        </h1>
        <div className="flex gap-4">
          <div className="min-w-[110px] rounded-3xl border-b-4 border-amber-800 bg-white p-4 text-center shadow-sm">
            <p className="text-[10px] font-black uppercase text-amber-500">
              Photos
            </p>
            <p className="text-2xl font-black text-amber-900">
              {mediaList.filter((item) => item.type === "image").length}
            </p>
          </div>
          <div className="min-w-[110px] rounded-3xl border-b-4 border-amber-950 bg-white p-4 text-center shadow-sm">
            <p className="text-[10px] font-black uppercase text-amber-500">
              Videos
            </p>
            <p className="text-2xl font-black text-amber-900">
              {mediaList.filter((item) => item.type === "video").length}
            </p>
          </div>
        </div>
      </header>

      <div className="mb-16 rounded-[3rem] border border-amber-100 bg-white p-6 shadow-xl md:p-10">
        <form
          onSubmit={handleUpload}
          className="grid grid-cols-1 items-end gap-8 md:grid-cols-3"
        >
          <div className="space-y-3">
            <label className="ml-2 text-[11px] font-black uppercase text-amber-600">
              Archive Year
            </label>
            <input
              type="text"
              placeholder="Year (e.g. 2024)"
              value={year}
              onChange={(e) => setYear(e.target.value)}
              className="w-full rounded-2xl bg-amber-50/50 p-4 font-bold outline-none focus:border-amber-500"
              required
            />
          </div>
          <div className="space-y-3">
            <label className="ml-2 text-[11px] font-black uppercase text-amber-600">
              Choose File
            </label>
            <input
              type="file"
              onChange={(e) => setFile(e.target.files[0])}
              className="w-full rounded-2xl border-2 border-dashed border-amber-200 p-2.5 text-xs"
              required
            />
          </div>
          <button
            disabled={uploading}
            className={`w-full h-[58px] rounded-2xl py-4.5 font-black tracking-widest text-white ${
              uploading
                ? "bg-amber-300 animate-pulse"
                : "bg-amber-900 hover:bg-amber-800"
            }`}
          >
            {uploading ? "UPLOADING..." : "UPLOAD"}
          </button>
        </form>
      </div>

      <div className="grid grid-cols-2 gap-6 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5">
        {mediaList.map((item) => (
          <div
            key={item._id}
            className="group relative aspect-square overflow-hidden rounded-[2.5rem] border-4 border-white bg-white shadow-md transition-all hover:shadow-2xl"
          >
            {item.type === "image" ? (
              <img
                src={item.url}
                className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-110"
                alt=""
              />
            ) : (
              <div className="flex h-full w-full items-center justify-center bg-amber-950">
                <FiVideo size={48} className="text-white/20" />
              </div>
            )}
            <div className="absolute top-4 left-4 rounded-2xl bg-white/90 px-3 py-1.5 text-[10px] font-black text-amber-900">
              {item.year}
            </div>
            <div className="absolute inset-0 flex items-center justify-center gap-4 bg-amber-950/60 opacity-0 transition-all group-hover:opacity-100">
              <button
                onClick={() => setPreviewItem(item)}
                className="rounded-2xl bg-white p-4 text-amber-950"
              >
                <FiEye size={22} />
              </button>
              <button
                onClick={() => handleDelete(item._id)}
                className="rounded-2xl bg-red-500 p-4 text-white"
              >
                <FiTrash2 size={22} />
              </button>
            </div>
          </div>
        ))}
      </div>

      {previewItem && (
        <div
          className="fixed inset-0 z-[200] flex items-center justify-center bg-black/95 p-4 backdrop-blur-md"
          onClick={() => setPreviewItem(null)}
        >
          <button className="absolute top-8 right-8 text-white">
            <FiX size={32} />
          </button>
          {previewItem.type === "image" ? (
            <img
              src={previewItem.url}
              className="max-h-full max-w-full object-contain"
              alt=""
            />
          ) : (
            <video
              src={previewItem.url}
              controls
              autoPlay
              className="max-h-full max-w-full"
            />
          )}
        </div>
      )}
    </div>
  );
};

export default MediaGallery;
