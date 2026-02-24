import React from "react";
import { motion } from "framer-motion";

const PHOTOS = [
  { id: 1, src: "/img3.jpg" },
  { id: 2, src: "/pooram.jpg" },
  { id: 3, src: "/pooram2.jpg" },
];

export const GalleryFuter = () => {
  const handleNavigation = () => {
    window.location.href = "/gallery";
  };

  return (
    <div className="relative w-full min-h-screen bg-black overflow-hidden flex flex-col md:flex-row">

 
      <div className="absolute inset-0 flex items-center justify-center pointer-events-none z-0">
        <h1 className="text-[25vw] md:text-[20vw] font-black text-white/5 uppercase tracking-tighter select-none">
          Explore
        </h1>
      </div>

      {PHOTOS.map((photo, index) => (
        <motion.div
          key={photo.id}
          onClick={handleNavigation}
          initial={{ opacity: 0, scale: 0.98 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: index * 0.2, duration: 0.6 }}
          whileHover={{ scale: 1.02 }}
          className="relative flex-1 overflow-hidden group border-b md:border-b-0 md:border-r border-white/10 cursor-pointer"
          style={{ minHeight: "33.33vh" }}
        >
          <img
            src={photo.src}
            loading="lazy"
            decoding="async"
            alt=""
            className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 ease-out will-change-transform group-hover:scale-110"
          />

          
          <div className="absolute inset-0 bg-linear-to-t from-black/70 via-transparent to-transparent opacity-60 group-hover:opacity-30 transition-opacity duration-500" />

          
          <div className="absolute bottom-0 left-0 w-full h-1 bg-white scale-x-0 group-hover:scale-x-100 transition-transform duration-500 origin-left" />
        </motion.div>
      ))}

      
      <div className="absolute bottom-8 left-0 w-full md:left-auto md:right-8 md:w-auto z-20 px-6 flex justify-center">
        <button
          onClick={handleNavigation}
          className="w-full md:w-auto bg-white text-[#a0521c] px-10 py-4 rounded-full font-bold text-xs tracking-[0.2em] hover:bg-white/90 active:scale-95 transition-all uppercase"
        >
          VIEW GALLERY
        </button>
      </div>
    </div>
  );
};

export default GalleryFuter;