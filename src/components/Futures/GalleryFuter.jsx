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
        <h1 className="text-[25vw] md:text-[20vw] font-black text-white/2 uppercase tracking-tighter">
          Explore
        </h1>
      </div>

      {PHOTOS.map((photo, index) => (
        <motion.div
          key={photo.id}
          onClick={handleNavigation}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: index * 0.2, duration: 0.8 }}
        
          whileHover={{ flex: 2.5 }} 
          className="relative flex-1 flex items-stretch overflow-hidden group border-b md:border-b-0 md:border-r border-white/10 transition-all duration-700 ease-in-out cursor-pointer"
          style={{ minHeight: '33.33vh', md: { minHeight: '100vh' } }}
        >
          
          <img
            src={photo.src}
            alt=""
            className="absolute inset-0 w-full h-full object-cover grayscale-30 group-hover:grayscale-0 group-hover:scale-110 transition-all duration-[1.5s] ease-out"
          />

         
          <div className="absolute inset-0 bg-linear-to-t from-black/70 via-transparent to-transparent opacity-60 group-hover:opacity-20 transition-opacity duration-500" />
          
          <div className="absolute bottom-0 left-0 w-full h-1 bg-white scale-x-0 group-hover:scale-x-100 transition-transform duration-700 origin-left" />
        </motion.div>
      ))}

     
      <div className="absolute bottom-8 left-0 w-full md:left-auto md:right-8 md:w-auto z-20 px-6 flex justify-center">
        <button 
          onClick={handleNavigation}
          className="w-full md:w-auto bg-white text-[#a0521c] px-10 py-4 rounded-full font-bold text-xs tracking-[0.2em] hover:bg-white/90 active:scale-95 transition-all shadow-[0_20px_50px_rgba(0,0,0,0.5)] uppercase"
        >
         view gallery
        </button>
      </div>
    </div>
  );
};

export default GalleryFuter;