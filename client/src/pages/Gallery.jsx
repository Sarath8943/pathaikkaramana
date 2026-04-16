import React, { useState, useMemo, useEffect } from "react";
import axiosInstance from "../components/utils/axiosInstance";
import { FaPlay, FaTimes, FaDownload } from "react-icons/fa";
import { motion, AnimatePresence } from "framer-motion";
import { useTranslation } from "react-i18next";

export const GalleryAlt = () => {
  const { t } = useTranslation();
  const [media, setMedia] = useState([]);
  const [loading, setLoading] = useState(true);
  const [preview, setPreview] = useState(null);

  useEffect(() => {
    const fetchMedia = async () => {
      try {
        setLoading(true);
        const res = await axiosInstance.get("/media");
        const fetchedData = Array.isArray(res.data)
          ? res.data
          : res.data.media || res.data.data || [];
        setMedia(fetchedData);
      } catch (err) {
        console.error("Gallery Fetch Error:", err);
      } finally {
        setLoading(false);
      }
    };
    fetchMedia();
  }, []);

  const groupedMedia = useMemo(() => {
    const groups = {};
    if (!media.length) return [];
    media.forEach((item) => {
      const year = item.year || "Archive";
      if (!groups[year]) groups[year] = [];
      groups[year].push(item);
    });
    return Object.entries(groups).sort((a, b) => b[0] - a[0]);
  }, [media]);

  const getVideoPoster = (item) => item.thumbnail || item.optimizedUrl || "";
  const getGridImage = (item) => item.thumbnail || item.optimizedUrl || item.url;

  const handleDownload = async (url, filename) => {
    try {
      const response = await fetch(url);
      const blob = await response.blob();
      const blobUrl = window.URL.createObjectURL(blob);
      const link = document.createElement("a");
      link.href = blobUrl;
      link.download = filename || "download";
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
      window.URL.revokeObjectURL(blobUrl);
    } catch (error) {
      console.error("Download failed:", error);
    }
  };

  if (loading) {
    return (
      <div className="text-center p-20 text-amber-800 font-bold tracking-widest animate-pulse uppercase">
        Loading Gallery...
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-amber-50/20 p-6 md:p-12 font-sans">
      <h1 className="text-4xl font-black text-amber-950 mb-12 tracking-tighter italic uppercase">
        {t("gallery")}
      </h1>

      {groupedMedia.length === 0 ? (
        <div className="text-center py-24 bg-white rounded-[4rem] border-4 border-dashed border-amber-50">
          <p className="text-amber-900/30 text-xl font-black italic uppercase tracking-widest">
            No Media Found
          </p>
        </div>
      ) : (
        groupedMedia.map(([year, items]) => (
          <div key={year} className="mb-16">
            <h2 className="text-xl font-black text-amber-900 mb-8 flex items-center gap-4">
              <span className="w-8 h-1 bg-amber-600 rounded-full"></span>
              {year}
            </h2>
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-6">
              {items.map((item) => (
                <motion.div
                  key={item._id}
                  whileHover={{ scale: 1.02 }}
                  onClick={() => setPreview(item)}
                  className="cursor-pointer bg-white rounded-[2rem] shadow-md overflow-hidden aspect-square relative border-4 border-white transition-all hover:shadow-xl"
                >
                  {item.type === "image" ? (
                    <img
                      src={getGridImage(item)}
                      className="w-full h-full object-cover"
                      alt=""
                      loading="lazy"
                      decoding="async"
                      fetchPriority="low"
                      crossOrigin="anonymous"
                    />
                  ) : (
                    <div className="w-full h-full overflow-hidden bg-amber-950 relative">
                      {getVideoPoster(item) ? (
                        <img
                          src={getVideoPoster(item)}
                          className="w-full h-full object-cover"
                          alt=""
                          loading="lazy"
                          decoding="async"
                          fetchPriority="low"
                        />
                      ) : null}
                      <div className="absolute inset-0 flex items-center justify-center bg-black/20">
                        <FaPlay className="text-white/80 text-4xl z-10" />
                      </div>
                    </div>
                  )}
                </motion.div>
              ))}
            </div>
          </div>
        ))
      )}

      <AnimatePresence>
        {preview && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/95 z-[100] flex items-center justify-center p-4 backdrop-blur-sm"
          >
            <div className="absolute top-6 right-6 flex items-center gap-6 z-[110]">
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  handleDownload(preview.url, `media-${preview.year}`);
                }}
                className="text-white/70 hover:text-white transition-colors flex items-center gap-2 bg-white/10 px-4 py-2 rounded-full backdrop-blur-md border border-white/20"
              >
                <FaDownload />{" "}
                <span className="text-xs font-bold uppercase tracking-widest">
                  Download
                </span>
              </button>

              <button
                onClick={() => setPreview(null)}
                className="text-white/50 hover:text-white text-3xl transition-colors"
              >
                <FaTimes />
              </button>
            </div>

            <div
              className="w-full h-full flex items-center justify-center"
              onClick={() => setPreview(null)}
            >
              {preview.type === "image" ? (
                <motion.img
                  initial={{ scale: 0.9 }}
                  animate={{ scale: 1 }}
                  src={preview.url}
                  className="max-h-[90vh] max-w-full object-contain shadow-2xl"
                  alt="Full view"
                />
              ) : (
                <video
                  src={preview.url}
                  poster={getVideoPoster(preview)}
                  controls
                  autoPlay
                  className="max-h-[90vh] max-w-full shadow-2xl"
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
