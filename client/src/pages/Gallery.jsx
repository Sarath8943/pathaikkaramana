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

  useEffect(() => {
    const fetchMedia = async () => {
      try {
        const res = await axiosInstance.get("/api/media");
        setMedia(Array.isArray(res.data) ? res.data : []);
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    };
    fetchMedia();
  }, []);

  const handleDownload = async (url) => {
    if (!url) return;
    const response = await axiosInstance.get(url, { responseType: "blob" });
    const blobUrl = window.URL.createObjectURL(response.data);
    const link = document.createElement("a");
    link.href = blobUrl;
    link.download = url.split("/").pop();
    link.click();
    window.URL.revokeObjectURL(blobUrl);
  };

  return (
    <div className="min-h-screen bg-slate-50 px-4 py-8">
      <h1 className="text-2xl font-semibold text-orange-700 mb-6">
        {t("gallery")}
      </h1>

      {loading && (
        <div className="grid grid-cols-2 gap-4">
          {[...Array(6)].map((_, i) => (
            <div key={i} className="aspect-square bg-gray-200 animate-pulse rounded-xl"></div>
          ))}
        </div>
      )}

      {!loading &&
        [...new Set(media.map((i) => i.year || "Archive"))]
          .sort()
          .reverse()
          .map((year) => (
            <div key={year} className="mb-10">
              
              
              <h2 className="text-sm font-semibold text-gray-500 uppercase tracking-widest mb-4">
                {year}
              </h2>

              
              <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4">
                {media
                  .filter((i) => (i.year || "Archive") === year)
                  .map((item) => (
                    <motion.div
                      key={item._id}
                      whileTap={{ scale: 0.95 }}
                      className="relative aspect-square rounded-xl overflow-hidden shadow-md cursor-pointer"
                      onClick={() => setPreview(item)}
                    >
                      {item.type === "image" ? (
                        <img
                          src={item.url}
                          loading="lazy"
                          className="w-full h-full object-cover"
                          alt="gallery"
                        />
                      ) : (
                        <>
                          <video
                            src={item.url}
                            preload="metadata"
                            className="w-full h-full object-cover"
                          />
                          <FaPlay className="absolute inset-0 m-auto text-white text-3xl opacity-80" />
                        </>
                      )}
                    </motion.div>
                  ))}
              </div>
            </div>
          ))}

      <AnimatePresence>
        {preview && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/95 z-50 flex flex-col"
          >
            <div className="flex justify-between items-center p-4 text-white">
              <button
                onClick={() => setPreview(null)}
                className="p-2 rounded-full hover:bg-white/20"
              >
                <FaTimes size={20} />
              </button>

              <button
                onClick={() => handleDownload(preview.url)}
                className="flex items-center gap-2 text-xs bg-white/10 px-3 py-2 rounded-full"
              >
                <FaDownload /> Download
              </button>
            </div>

            <div className="flex-1 flex items-center justify-center p-4">
              {preview.type === "image" ? (
                <img
                  src={preview.url}
                  className="max-h-full max-w-full object-contain"
                  alt="preview"
                />
              ) : (
                <video
                  src={preview.url}
                  controls
                  autoPlay
                  className="max-h-full max-w-full object-contain"
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