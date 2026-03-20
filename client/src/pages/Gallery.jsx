import React, { useState, useMemo, useEffect } from "react";
// Path കൃത്യമാണെന്ന് ഉറപ്പുവരുത്തുക
import axiosInstance from "../components/utils/axiosInstance"; 
import { FaPlay, FaTimes } from "react-icons/fa";
import { motion, AnimatePresence } from "framer-motion";

export const GalleryAlt = () => {
  const [media, setMedia] = useState([]);
  const [loading, setLoading] = useState(true);
  const [preview, setPreview] = useState(null);

  useEffect(() => {
    const fetchMedia = async () => {
      try {
        setLoading(true);
        const res = await axiosInstance.get("/api/media");
        
        // Console-ൽ ഡാറ്റ വരുന്നുണ്ടോ എന്ന് ചെക്ക് ചെയ്യുക
        console.log("Gallery Data:", res.data);

        // ഡാറ്റ അറേ ആണോ എന്ന് ഉറപ്പുവരുത്തുന്നു
        const fetchedData = Array.isArray(res.data) 
          ? res.data 
          : (res.data.media || res.data.data || []);
          
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
    // വർഷം പുതിയത് ആദ്യം വരാൻ (Descending Order)
    return Object.entries(groups).sort((a, b) => b[0] - a[0]);
  }, [media]);

  if (loading) return <div className="text-center p-20 text-amber-800 font-bold">Loading Gallery...</div>;

  return (
    <div className="min-h-screen bg-amber-50/20 p-6 md:p-12">
      {groupedMedia.length === 0 ? (
        <div className="text-center py-20 bg-white rounded-3xl border-2 border-dashed border-amber-200">
           <p className="text-amber-800 font-bold italic">No media found in the archive.</p>
        </div>
      ) : (
        groupedMedia.map(([year, items]) => (
          <div key={year} className="mb-16">
            <h2 className="text-2xl font-black text-amber-900 mb-6 flex items-center gap-3">
              <span className="w-2 h-8 bg-amber-600 rounded-full"></span>
              {year}
            </h2>
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-6">
              {items.map((item) => (
                <motion.div 
                  key={item._id} 
                  whileHover={{ scale: 1.05 }}
                  onClick={() => setPreview(item)}
                  className="cursor-pointer bg-white rounded-[2rem] shadow-md overflow-hidden aspect-square relative border-4 border-white transition-all hover:shadow-xl"
                >
                  {item.type === "image" ? (
                    <img src={item.url} className="w-full h-full object-cover" alt="" loading="lazy" />
                  ) : (
                    <div className="w-full h-full flex items-center justify-center bg-amber-950 relative">
                       <FaPlay className="text-amber-100/50 text-4xl z-10" />
                       {item.thumbnail && (
                         <img src={item.thumbnail} className="absolute inset-0 w-full h-full object-cover opacity-40" alt="" />
                       )}
                    </div>
                  )}
                </motion.div>
              ))}
            </div>
          </div>
        ))
      )}

      {/* Preview Modal - Simplified & Full View */}
      <AnimatePresence>
        {preview && (
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/95 z-[100] flex items-center justify-center p-4 md:p-10 backdrop-blur-sm"
          >
            <button 
              onClick={() => setPreview(null)} 
              className="absolute top-8 right-8 text-white/50 hover:text-white text-4xl transition-colors"
            >
              <FaTimes />
            </button>
            
            <div className="w-full h-full flex items-center justify-center">
              {preview.type === "image" ? (
                <img src={preview.url} className="max-h-full max-w-full object-contain rounded-lg shadow-2xl" alt="Preview" />
              ) : (
                <video src={preview.url} controls autoPlay className="max-h-full max-w-full rounded-lg shadow-2xl" />
              )}
            </div>
            
            <div className="absolute bottom-10 bg-white/10 px-6 py-2 rounded-full backdrop-blur-md">
                <p className="text-white font-bold tracking-widest uppercase text-xs italic">{preview.year}</p>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default GalleryAlt;