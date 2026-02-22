import React from "react";
import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";
import { useTranslation } from "react-i18next";
import GalleryFuter from "../components/Futures/GalleryFuter";

const images = ["/pathikkara manna.jpg", "/pathaikkara.jpg", "/pathikkara1.jpg"];
const architectureImages = ["/pathikkara1.jpg", "/pathaikkara.jpg"];

export const Home = () => {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const [currentImage, setCurrentImage] = React.useState(0);
  const [currentArchImage, setCurrentArchImage] = React.useState(0);

  // Sliders
  React.useEffect(() => {
    const interval = setInterval(() => setCurrentImage((p) => (p + 1) % images.length), 4000);
    return () => clearInterval(interval);
  }, []);

  React.useEffect(() => {
    const interval = setInterval(() => setCurrentArchImage((p) => (p + 1) % architectureImages.length), 4000);
    return () => clearInterval(interval);
  }, []);

  return (
    // ഇവിടെ ശ്രദ്ധിക്കുക: overflow-x-hidden എന്നത് വശങ്ങളിലെ ബ്ലാങ്ക് സ്പേസ് ഒഴിവാക്കാൻ നിർബന്ധമാണ്
    <div className="bg-gray-50 text-gray-900 w-full overflow-x-hidden">
      
      {/* Hero Section */}
      <div className="relative w-full h-[60vh] md:h-screen">
        {images.map((src, index) => (
          <motion.div
            key={index}
            className="absolute inset-0 w-full h-full"
            initial={{ opacity: 0 }}
            animate={{ opacity: index === currentImage ? 1 : 0 }}
            transition={{ duration: 1 }}
          >
            <img src={src} className="w-full h-full object-cover" alt="Temple" />
            <div className="absolute inset-0 bg-black/30" />
          </motion.div>
        ))}

        <div className="absolute inset-0 flex flex-col justify-center items-center text-center px-2">
          <h1 className="text-3xl sm:text-5xl md:text-7xl font-extrabold text-white drop-shadow-2xl">
            {t("home.hero_title")}
          </h1>
        </div>
      </div>

      {/* Main Content Section */}
      <div className="bg-gray-100 w-full py-12">
        {/* max-w-7xl ന് പുറത്ത് px-4 കൊടുക്കുന്നത് വഴി സ്ക്രീന്റെ അറ്റത്ത് ഒട്ടിക്കിടക്കും */}
        <div className="max-w-7xl mx-auto px-4">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 md:gap-12 items-center">
            
            <div className="relative w-full h-72 md:h-105 rounded-xl shadow-2xl overflow-hidden">
              {architectureImages.map((img, index) => (
                <motion.img
                  key={index}
                  src={img}
                  className="absolute inset-0 w-full h-full object-cover"
                  animate={{ opacity: index === currentArchImage ? 1 : 0 }}
                />
              ))}
            </div>

            <div className="text-gray-700 space-y-4">
              <h1 className="text-2xl md:text-4xl font-bold text-yellow-700 border-b-2 border-yellow-700 pb-2">
                {t("home.main_title")}
              </h1>
              <p className="leading-relaxed">{t("home.para1")}</p>
              <button
                onClick={() => navigate("/history")}
                className="bg-yellow-700 text-white px-8 py-3 rounded-lg w-full md:w-auto"
              >
                {t("home.button")}
              </button>
            </div>
          </div>
        </div>
      </div>
      <GalleryFuter />
    </div>
  );
};

export default Home;