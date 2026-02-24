import React, { useState, useMemo, useEffect } from "react";
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
    fetchMedia();
  }, []);

  const fetchMedia = async () => {
    try {
      setLoading(true);
      const res = await axiosInstance.get("/api/media?limit=30");

      console.log("API Response:", res.data);

      // Handle different possible API formats safely
      if (Array.isArray(res.data)) {
        setMedia(res.data);
      } else if (Array.isArray(res.data?.data)) {
        setMedia(res.data.data);
      } else {
        setMedia([]);
      }
    } catch (err) {
      console.error("Media fetch error:", err);
      setMedia([]);
    } finally {
      setLoading(false);
    }
  };

  const groupedMedia = useMemo(() => {
    if (!Array.isArray(media)) return [];

    const groups = {};
    media.forEach((item) => {
      const year = item?.year || "Archive";
      if (!groups[year]) groups[year] = [];
      groups[year].push(item);
    });

    return Object.entries(groups).sort((a, b) => {
      const yearA = Number(a[0]);
      const yearB = Number(b[0]);

      if (isNaN(yearA) || isNaN(yearB)) return 0;
      return yearB - yearA;
    });
  }, [media]);

  const handleDownload = (url) => {
    if (!url) return;
    window.open(url, "_blank");
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        Loading...
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-slate-50 px-4 py-8">
      <h1 className="text-2xl font-semibold text-orange-700 mb-6">
        {t("gallery")}
      </h1>

      {groupedMedia.length === 0 && (
        <div className="text-center text-gray-500">
          No media available
        </div>
      )}

      {groupedMedia.map(([year, items]) => (
        <div key={year} className="mb-10">
          <h2 className="text-sm font-semibold text-gray-500 uppercase tracking-widest mb-4">
            {year}
          </h2>

          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4">
            {items.map((item) => (
              <motion.div
                key={item._id}
                whileHover={{ scale: 1.03 }}
                whileTap={{ scale: 0.97 }}
                className="relative aspect-square rounded-xl overflow-hidden bg-gray-200 cursor-pointer"
                onClick={() => setPreview(item)}
              >
                {item.type === "image" ? (
                  <img
                    src={item.thumbnail || item.optimizedUrl || item.url}
                    loading="lazy"
                    alt="Gallery item"
                    className="w-full h-full object-cover"
                    onError={(e) => {
                      if (item.url) e.target.src = item.url;
                    }}
                  />
                ) : (
                  <div className="w-full h-full bg-black flex items-center justify-center relative">
                    {item.thumbnail && (
                      <img
                        src={item.thumbnail}
                        className="w-full h-full object-cover opacity-60"
                        alt=""
                      />
                    )}
                    <FaPlay className="text-white text-3xl absolute" />
                  </div>
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
            className="fixed inset-0 bg-black/90 z-50 flex flex-col"
          >
            <div className="flex justify-between p-4 text-white">
              <button onClick={() => setPreview(null)}>
                <FaTimes size={24} />
              </button>
              <button
                onClick={() => handleDownload(preview.url)}
                className="flex items-center gap-2"
              >
                <FaDownload /> Download
              </button>
            </div>

            <div className="flex-1 flex items-center justify-center p-2">
              {preview.type === "image" ? (
                <img
                  src={preview.url}
                  className="max-h-full max-w-full object-contain"
                  alt=""
                />
              ) : (
                <video
                  src={preview.url}
                  controls
                  autoPlay
                  preload="metadata"
                  className="max-h-full max-w-full"
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