



import React, { useState, useMemo, useEffect } from "react";
import axiosInstance from "../components/utils/axiosInstance";
import { FaPlay, FaTimes } from "react-icons/fa";
import { AnimatePresence, motion } from "framer-motion";
import { useTranslation } from "react-i18next";

const GALLERY_CACHE_KEY = "gallery_media_cache_v1";

export const Gallery = () => {
  const { t } = useTranslation();
  
  // 1. ഉടനെ ഡാറ്റ കാണിക്കാൻ LocalStorage ഉപയോഗിക്കുന്നു
  const [media, setMedia] = useState(() => {
    const cached = localStorage.getItem(GALLERY_CACHE_KEY);
    return cached ? JSON.parse(cached).items : [];
  });

  const [preview, setPreview] = useState(null);
  const [visibleCount, setVisibleCount] = useState(20); // ആദ്യം 20 എണ്ണം മാത്രം കാണിക്കുന്നു

  const resolveMediaUrl = (rawUrl) => {
    if (!rawUrl) return "";
    if (rawUrl.startsWith("http")) return rawUrl;
    const apiOrigin = axiosInstance.defaults.baseURL ? new URL(axiosInstance.defaults.baseURL).origin : window.location.origin;
    return `${apiOrigin}${rawUrl.startsWith("/") ? rawUrl : `/${rawUrl}`}`;
  };

  useEffect(() => {
    const fetchMedia = async () => {
      try {
        const res = await axiosInstance.get("/media");
        const fetchedData = Array.isArray(res.data) ? res.data : res.data?.media || [];
        
        setMedia(fetchedData);
        localStorage.setItem(GALLERY_CACHE_KEY, JSON.stringify({ items: fetchedData, savedAt: Date.now() }));
      } catch (err) {
        console.error(err);
      }
    };
    fetchMedia();
  }, []);

  // സ്ക്രോൾ ചെയ്യുമ്പോൾ കൂടുതൽ ഡാറ്റ ലോഡ് ചെയ്യാൻ
  useEffect(() => {
    const handleScroll = () => {
      if (window.innerHeight + window.scrollY >= document.body.offsetHeight - 500) {
        setVisibleCount((prev) => prev + 20);
      }
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const groupedMedia = useMemo(() => {
    const groups = {};
    // ലിമിറ്റ് ചെയ്ത ഡാറ്റ മാത്രം ഗ്രൂപ്പ് ചെയ്യുന്നു (വേഗത കൂട്ടാൻ)
    media.slice(0, visibleCount).forEach((item) => {
      const year = item.year || "Archive";
      if (!groups[year]) groups[year] = [];
      groups[year].push(item);
    });
    return Object.entries(groups).sort((a, b) => b[0] - a[0]);
  }, [media, visibleCount]);

  return (
    <div className="min-h-screen bg-amber-50/20 p-4 md:p-12">
      <h1 className="text-4xl font-black text-amber-950 mb-12 uppercase italic">{t("gallery")}</h1>

      {groupedMedia.length === 0 && (
        <div className="grid grid-cols-2 md:grid-cols-5 gap-4">
          {[...Array(10)].map((_, i) => <div key={i} className="aspect-square bg-amber-100 animate-pulse rounded-2xl" />)}
        </div>
      )}

      {groupedMedia.map(([year, items]) => (
        <div key={year} className="mb-12">
          <h2 className="text-xl font-bold text-amber-900 mb-6 flex items-center gap-3">
            <span className="w-6 h-1 bg-amber-600 rounded-full"></span> {year}
          </h2>
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4">
            {items.map((item) => (
              <motion.div
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                key={item._id}
                onClick={() => setPreview(item)}
                className="relative aspect-square bg-white rounded-2xl overflow-hidden cursor-pointer shadow-sm hover:scale-[1.02] transition-transform"
              >
                <img
                  src={resolveMediaUrl(item.thumbnail || item.optimizedUrl || item.url)}
                  alt=""
                  loading="lazy" 
                  className="w-full h-full object-cover"
                />
                {item.type !== "image" && (
                  <div className="absolute inset-0 flex items-center justify-center bg-black/20">
                    <FaPlay className="text-white text-3xl" />
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
            initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/95 z-[100] flex items-center justify-center p-4"
            onClick={() => setPreview(null)}
          >
            <div className="max-w-5xl w-full h-full flex items-center justify-center">
              {preview.type === "image" ? (
                <img src={resolveMediaUrl(preview.url)} className="max-h-full object-contain" alt="" />
              ) : (
                <video src={resolveMediaUrl(preview.url)} controls autoPlay className="max-h-full" />
              )}
            </div>
            <button className="absolute top-5 right-5 text-white text-3xl"><FaTimes /></button>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default Gallery;