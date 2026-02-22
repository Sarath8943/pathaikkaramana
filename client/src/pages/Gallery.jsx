import React, { useState, useEffect } from "react";
import { useTranslation } from "react-i18next";
import axiosInstance from "../components/utils/axiosInstance";
import { FaPlay, FaTimes, FaDownload } from "react-icons/fa";
import { motion, AnimatePresence } from "framer-motion";

export const GalleryAlt = () => {
  const { t } = useTranslation();
  const [media, setMedia] = useState([]);
  const [preview, setPreview] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchMedia = async () => {
      setLoading(true);
      setError(null);
      try {
        const res = await axiosInstance.get("/api/media");
        const mediaData = Array.isArray(res.data) ? res.data : [];
        setMedia(mediaData);
      } catch (err) {
        console.error("Error fetching media:", err);
        setError("Failed to load gallery.");
        setMedia([]);
      } finally {
        setLoading(false);
      }
    };
    fetchMedia();
  }, []);

  const handleDownload = async (url) => {
    if (!url) return;
    try {
      const response = await axiosInstance.get(url, { responseType: "blob" });
      const blob = response.data;
      const blobUrl = window.URL.createObjectURL(blob);
      const link = document.createElement("a");
      link.href = blobUrl;
      link.download = url.split("/").pop() || "download";
      document.body.appendChild(link);
      link.click();
      link.remove();
      window.URL.revokeObjectURL(blobUrl);
    } catch (err) {
      console.error("Download failed:", err);
      alert("Failed to download file.");
    }
  };

  return (
    <div className="min-h-screen bg-slate-50 text-black px-6 py-10 space-y-12">
      <h1 className="text-3xl font-serif text-orange-700">{t("gallery")}</h1>

      {loading && (
        <div className="flex flex-col items-center justify-center py-20">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-orange-700"></div>
        </div>
      )}

      {!loading && !error && (
        <>
          {[...new Set(media.map((i) => i.year || "Archive"))]
            .sort()
            .reverse()
            .map((year) => (
              <div key={year} className="space-y-4">
                <h2 className="text-sm text-gray-600 uppercase tracking-widest">
                  {year}
                </h2>
                <div className="flex gap-6 overflow-x-auto pb-4">
                  {media
                    .filter((i) => (i.year || "Archive") === year)
                    .map((item) => (
                      <motion.div
                        key={item._id}
                        whileHover={{ scale: 1.05 }}
                        className="min-w-65 h-90 rounded-2xl overflow-hidden relative cursor-pointer bg-gray-100 shadow-lg"
                        onClick={() => setPreview(item)}
                      >
                        {item.type === "image" ? (
                          <img
                            src={item.url}
                            className="w-full h-full object-cover"
                            alt="Gallery item"
                          />
                        ) : (
                          <>
                            <video
                              src={item.url}
                              className="w-full h-full object-cover opacity-80"
                            />
                            <FaPlay className="absolute inset-0 m-auto text-4xl opacity-70 text-white" />
                          </>
                        )}
                      </motion.div>
                    ))}
                </div>
              </div>
            ))}
        </>
      )}

      <AnimatePresence>
        {preview && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/90 z-100 flex flex-col"
          >
            <div className="flex justify-between items-center px-6 py-4 text-white">
              <h3 className="truncate">{preview.title || "Media Preview"}</h3>
              <div className="flex gap-4 items-center">
                <button
                  onClick={() => handleDownload(preview.url)}
                  className="flex items-center gap-2 px-4 py-2 text-white rounded-full text-xs font-bold hover:bg-white/20"
                >
                  <FaDownload /> Download
                </button>
                <button
                  onClick={() => setPreview(null)}
                  className="hover:bg-white/20 p-2 rounded-full"
                >
                  <FaTimes size={22} />
                </button>
              </div>
            </div>
            <div className="flex-1 flex items-center justify-center p-6 bg-black">
              {preview.type === "image" ? (
                <img
                  src={preview.url}
                  className="w-full h-full object-contain"
                  alt="Preview"
                />
              ) : (
                <video
                  src={preview.url}
                  controls
                  autoPlay
                  className="w-full h-full object-contain"
                />
              )}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default GalleryAlt;
