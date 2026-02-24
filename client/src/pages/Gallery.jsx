import React, { useState, useEffect, useMemo } from "react";
import { useTranslation } from "react-i18next";
import axiosInstance from "../components/utils/axiosInstance";
import { FaPlay, FaTimes, FaDownload } from "react-icons/fa";
import { motion, AnimatePresence } from "framer-motion";

export const GalleryAlt = () => {
  const { t } = useTranslation();

  const [media, setMedia] = useState([]);
  const [preview, setPreview] = useState(null);
  const [loading, setLoading] = useState(true);
  const [page, setPage] = useState(1);

  useEffect(() => {
    fetchMedia(page);
  }, [page]);

  const fetchMedia = async (pageNumber) => {
    try {
      setLoading(true);
      const res = await axiosInstance.get(
        `/api/media?page=${pageNumber}&limit=20`
      );

      setMedia((prev) => [...prev, ...res.data]);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  // Group by year
  const groupedMedia = useMemo(() => {
    const groups = {};
    media.forEach((item) => {
      const year = item.year || "Archive";
      if (!groups[year]) groups[year] = [];
      groups[year].push(item);
    });
    return Object.entries(groups).sort((a, b) => b[0] - a[0]);
  }, [media]);

  const handleDownload = (url) => {
    const link = document.createElement("a");
    link.href = url; // original url
    link.download = "";
    document.body.appendChild(link);
    link.click();
    link.remove();
  };

  return (
    <div className="min-h-screen bg-slate-50 px-4 py-8">
      <h1 className="text-2xl font-semibold text-orange-700 mb-6">
        {t("gallery")}
      </h1>

      {/* Gallery */}
      {groupedMedia.map(([year, items]) => (
        <div key={year} className="mb-10">
          <h2 className="text-sm font-semibold text-gray-500 uppercase tracking-widest mb-4">
            {year}
          </h2>

          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4">
            {items.map((item) => (
              <motion.div
                key={item._id}
                whileTap={{ scale: 0.95 }}
                className="relative aspect-square rounded-xl overflow-hidden shadow-md cursor-pointer bg-gray-100"
                onClick={() => setPreview(item)}
              >
                {item.type === "image" ? (
                  <img
                    src={item.thumbnail || item.optimizedUrl || item.url}
                    loading="lazy"
                    decoding="async"
                    className="w-full h-full object-cover"
                    alt=""
                  />
                ) : (
                  <div className="w-full h-full bg-black flex items-center justify-center">
                    <FaPlay className="text-white text-3xl opacity-80" />
                  </div>
                )}
              </motion.div>
            ))}
          </div>
        </div>
      ))}

      {/* Load More Button */}
      <div className="flex justify-center mt-6">
        <button
          onClick={() => setPage((prev) => prev + 1)}
          className="px-6 py-2 bg-orange-600 text-white rounded-full"
        >
          Load More
        </button>
      </div>

      {/* Preview Modal */}
      <AnimatePresence>
        {preview && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black z-50 flex flex-col"
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
                className="flex items-center gap-2 text-xs bg-white/10 px-3 py-2 rounded-full hover:bg-white/20"
              >
                <FaDownload /> Download
              </button>
            </div>

            <div className="flex-1 flex items-center justify-center bg-black">
              {preview.type === "image" ? (
                <img
                  src={preview.optimizedUrl || preview.url}
                  alt=""
                  className="w-full h-full object-contain"
                />
              ) : (
                <video
                  key={preview.url}
                  src={preview.url}
                  controls
                  autoPlay
                  playsInline
                  className="w-full h-full object-contain"
                />
              )}
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {loading && (
        <div className="text-center mt-4 text-gray-500">Loading...</div>
      )}
    </div>
  );
};

export default GalleryAlt;