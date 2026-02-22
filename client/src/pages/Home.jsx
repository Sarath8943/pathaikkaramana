import React from "react";
import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";
import { useTranslation } from "react-i18next";
import GalleryFuter from "../components/Futures/GalleryFuter";

const images = [
  "/pathikkara manna.jpg",
  "/pathaikkara.jpg",
  "/pathikkara1.jpg",
];
const architectureImages = ["/pathikkara1.jpg", "/pathaikkara.jpg"];

export const Home = () => {
  const { t } = useTranslation();
  const navigate = useNavigate();

  const [currentImage, setCurrentImage] = React.useState(0);
  const [currentArchImage, setCurrentArchImage] = React.useState(0);

  // Sliders remain same
  React.useEffect(() => {
    const interval = setInterval(() => setCurrentImage((p) => (p + 1) % images.length), 4000);
    return () => clearInterval(interval);
  }, []);

  React.useEffect(() => {
    const interval = setInterval(() => setCurrentArchImage((p) => (p + 1) % architectureImages.length), 4000);
    return () => clearInterval(interval);
  }, []);

  return (
    // മെയിൻ ഡിവിഷനിൽ w-full overflow-hidden നൽകി സ്പേസ് ഇല്ലാതാക്കുന്നു
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
            <img src={src} alt="Temple Slide" className="w-full h-full object-cover" />
            <div className="absolute inset-0 bg-black/30" />
          </motion.div>
        ))}

        <div className="absolute inset-0 flex flex-col justify-center items-center text-center px-2">
          <motion.h1 
            className="text-3xl sm:text-5xl md:text-7xl font-extrabold text-white drop-shadow-2xl"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
          >
            {t("home.hero_title")}
          </motion.h1>
        </div>
      </div>

      {/* Main Content Section - grid-cols-1 ഫോണിൽ ഫുൾ വിഡ്ത്ത് നൽകുന്നു */}
      <div className="bg-gray-100 w-full py-12 px-4 md:px-8">
        <div className="max-w-7xl mx-auto">
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
              <h2 className="text-lg">{t("home.sub_heading")}</h2>
              <h1 className="text-2xl md:text-4xl font-bold text-yellow-700 border-b-2 border-yellow-700 pb-2">
                {t("home.main_title")}
              </h1>
              <p className="leading-relaxed">{t("home.para1")}</p>
              <p className="leading-relaxed">{t("home.para2")}</p>
              
              <div className="pt-4">
                <button
                  onClick={() => navigate("/history")}
                  className="bg-yellow-700 text-white px-8 py-3 rounded-lg hover:bg-yellow-800 transition w-full md:w-auto"
                >
                  {t("home.button")}
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
      <GalleryFuter />
    </div>
  );
};

export default Home;
