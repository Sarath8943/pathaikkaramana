import React from "react";
import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";
import { useTranslation } from "react-i18next";
import GalleryFuter from "../components/Futures/GalleryFuter";

const images = [
  "/pathikkara-manna.jpg",
  "/pathaikkara.jpg",
  "/pathikkara1.jpg",
];

const architectureImages = [
  "/pathikkara1.jpg",
  "/pathaikkara.jpg",
];

export const Home = () => {
  const { t } = useTranslation();
  const navigate = useNavigate();

  const [currentImage, setCurrentImage] = React.useState(0);
  const [currentArchImage, setCurrentArchImage] = React.useState(0);

  /* 🔥 Preload First Image (No delay on mobile) */
  React.useEffect(() => {
    const img = new Image();
    img.src = images[0];
  }, []);

  /* 🔥 Hero Slider */
  React.useEffect(() => {
    const interval = setInterval(() => {
      setCurrentImage((prev) => (prev + 1) % images.length);
    }, 4000);
    return () => clearInterval(interval);
  }, []);

  /* 🔥 Architecture Slider */
  React.useEffect(() => {
    const interval = setInterval(() => {
      setCurrentArchImage((prev) => (prev + 1) % architectureImages.length);
    }, 4000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="w-full min-h-screen overflow-x-hidden bg-gray-50 text-gray-900">

      {/* ================= HERO SECTION ================= */}
      <section className="relative w-full h-[70vh] md:h-screen overflow-hidden px-3 pt-3">

        <div className="relative w-full h-full rounded-3xl overflow-hidden">

          {images.map((src, index) => (
            <motion.img
              key={index}
              src={src}
              alt="Temple"
              loading={index === 0 ? "eager" : "lazy"}
              className="absolute inset-0 w-full h-full object-cover"
              initial={index === 0 ? false : { opacity: 0 }}
              animate={{ opacity: currentImage === index ? 1 : 0 }}
              transition={{ duration: 1 }}
            />
          ))}

          {/* Overlay */}
          <div className="absolute inset-0 bg-black/30" />

          {/* Title */}
          <div className="absolute inset-0 flex items-center justify-center text-center px-4">
            <h1 className="text-2xl sm:text-4xl md:text-6xl font-bold text-white drop-shadow-xl">
              {t("home.hero_title")}
            </h1>
          </div>

        </div>
      </section>

      {/* ================= MAIN SECTION ================= */}
      <section className="w-full py-14 bg-gray-100">
        <div className="max-w-7xl mx-auto px-4">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 items-center">

            {/* Architecture Slider */}
            <div className="relative w-full h-72 md:h-105 rounded-2xl shadow-2xl overflow-hidden">
              {architectureImages.map((img, index) => (
                <motion.img
                  key={index}
                  src={img}
                  className="absolute inset-0 w-full h-full object-cover"
                  initial={false}
                  animate={{ opacity: index === currentArchImage ? 1 : 0 }}
                  transition={{ duration: 1 }}
                />
              ))}
            </div>

            {/* Text Section */}
            <div className="text-gray-700 space-y-6">
              <h2 className="text-2xl md:text-4xl font-bold text-yellow-700 border-b-2 border-yellow-700 pb-2">
                {t("home.main_title")}
              </h2>

              <p className="leading-relaxed text-base md:text-lg">
                {t("home.para1")}
              </p>

              <button
                onClick={() => navigate("/history")}
                className="bg-yellow-700 hover:bg-yellow-800 transition text-white px-8 py-3 rounded-lg w-full md:w-auto"
              >
                {t("home.button")}
              </button>
            </div>

          </div>
        </div>
      </section>

      <GalleryFuter />
    </div>
  );
};

export default Home;