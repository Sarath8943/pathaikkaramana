import React, { useState, useMemo, useEffect } from "react";
import { useTranslation } from "react-i18next";
import axiosInstance from "../components/utils/axiosInstance";
import { FaPlay, FaTimes, FaDownload } from "react-icons/fa";
import { motion, AnimatePresence } from "framer-motion";

export const GalleryAlt = () => {
  const { t } = useTranslation();
  const [media, setMedia] = useState([]);
  const [preview, setPreview] = useState(null);

  useEffect(() => {
    fetchMedia();
  }, []);

  const fetchMedia = async () => {
    try {
      const res = await axiosInstance.get("/api/media?limit=20");

      const data = Array.isArray(res.data)
        ? res.data
        : res.data?.data || [];

      setMedia(data);
    } catch (err) {
      console.error("Media fetch error:", err);
      setMedia([]);
    }
  };

  const groupedMedia = useMemo(() => {
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

  return (
    <div className="min-h-screen bg-slate-50 px-4 py-8">
      <h1 className="text-2xl font-semibold text-orange-700 mb-6">
        {t("gallery")}
      </h1>

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
                    alt=""
                    className="w-full h-full object-cover"
                  />
                ) : (
                  <div className="relative w-full h-full overflow-hidden">
                    
                    {/* If thumbnail exists */}
                    {item.thumbnail ? (
                      <img
                        src={item.thumbnail}
                        className="w-full h-full object-cover"
                        alt=""
                      />
                    ) : (
                      /* Fallback to video first frame */
                      <video
                        src={item.url}
                        muted
                        preload="metadata"
                        playsInline
                        className="w-full h-full object-cover"
                      />
                    )}

                    {/* Play icon overlay */}
                    <div className="absolute inset-0 flex items-center justify-center bg-black/30">
                      <FaPlay className="text-white text-4xl" />
                    </div>
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
            className="fixed inset-0 bg-black z-50 flex flex-col"
          >
            <div className="flex justify-between p-4 text-white z-10">
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

            <div className="flex-1 flex items-center justify-center">
              {preview.type === "image" ? (
                <img
                  src={preview.url}
                  alt=""
                  className="w-screen h-screen object-contain"
                />
              ) : (
                <video
                  src={preview.url}
                  controls
                  autoPlay
                  playsInline
                  preload="metadata"
                  className="w-screen h-screen object-contain"
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