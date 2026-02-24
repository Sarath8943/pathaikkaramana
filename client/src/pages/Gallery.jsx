import React, { useState, useMemo } from "react";
import { useTranslation } from "react-i18next";
import axiosInstance from "../components/utils/axiosInstance";
import { FaPlay, FaTimes, FaDownload } from "react-icons/fa";
import { motion, AnimatePresence } from "framer-motion";

export const GalleryAlt = () => {
  const { t } = useTranslation();
  const [media, setMedia] = useState([]);
  const [preview, setPreview] = useState(null);
  const [loading, setLoading] = useState(true);

  // useEffect കോൾ മുകളിൽ ഉള്ളത് പോലെ തന്നെ നിലനിർത്തുക
  React.useEffect(() => {
    fetchMedia();
  }, []);

  const fetchMedia = async () => {
    try {
      setLoading(true);
      const res = await axiosInstance.get(`/api/media?limit=50`);
      setMedia(res.data);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

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
    // സുരക്ഷിതമായി ഡൗൺലോഡ് ചെയ്യാൻ anchor tag ഉപയോഗിക്കുന്നു
    const link = document.createElement("a");
    link.href = url;
    link.setAttribute("download", "");
    link.setAttribute("target", "_blank");
    document.body.appendChild(link);
    link.click();
    link.remove();
  };

  return (
    <div className="min-h-screen bg-slate-50 px-4 py-8">
      <h1 className="text-2xl font-semibold text-orange-700 mb-6">{t("gallery")}</h1>

      {groupedMedia.map(([year, items]) => (
        <div key={year} className="mb-10">
          <h2 className="text-sm font-semibold text-gray-500 uppercase tracking-widest mb-4">
            {year}
          </h2>

          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4">
            {items.map((item) => (
              <motion.div
                key={item._id}
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                className="relative aspect-square rounded-xl overflow-hidden shadow-sm bg-gray-200 cursor-pointer"
                onClick={() => setPreview(item)}
              >
                {item.type === "image" ? (
                  <img
                    src={item.thumbnail || item.optimizedUrl}
                    loading="lazy"
                    decoding="async"
                    alt="Gallery item"
                    className="w-full h-full object-cover"
                    sizes="(max-width: 640px) 50vw, (max-width: 1024px) 25vw, 200px"
                  />
                ) : (
                  <div className="w-full h-full bg-slate-800 flex items-center justify-center relative">
                   
                    {item.thumbnail && (
                      <img src={item.thumbnail} className="w-full h-full object-cover opacity-60" alt="" />
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
            <div className="flex justify-between p-4">
              <button onClick={() => setPreview(null)} className="text-white p-2">
                <FaTimes size={24} />
              </button>
              <button onClick={() => handleDownload(preview.url)} className="text-white flex items-center gap-2">
                <FaDownload /> Download
              </button>
            </div>
            <div className="flex-1 flex items-center justify-center p-2">
              {preview.type === "image" ? (
                <img src={preview.url} className="max-h-full max-w-full object-contain" alt="" />
              ) : (
                <video src={preview.url} controls autoPlay className="max-h-full max-w-full" />
              )}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default GalleryAlt;