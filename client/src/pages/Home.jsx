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

  React.useEffect(() => {
    const interval = setInterval(() => {
      setCurrentImage((prev) => (prev + 1) % images.length);
    }, 4000);
    return () => clearInterval(interval);
  }, []);

  React.useEffect(() => {
    const interval = setInterval(() => {
      setCurrentArchImage((prev) => (prev + 1) % architectureImages.length);
    }, 4000);
    return () => clearInterval(interval);
  }, []);

  const slideUp = {
    hidden: { opacity: 0, y: 30 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.8 } },
  };

  const slideLeft = {
    hidden: { opacity: 0, x: -40 },
    visible: { opacity: 1, x: 0, transition: { duration: 0.8 } },
  };

  const slideRight = {
    hidden: { opacity: 0, x: 40 },
    visible: { opacity: 1, x: 0, transition: { duration: 0.8 } },
  };

  return (
    <div className="bg-gray-50 text-gray-900 w-full">
      <div className="relative w-full min-h-screen overflow-hidden">
        {images.map((src, index) => (
          <motion.img
            key={index}
            src={src}
            alt="Temple Slide"
            className="absolute inset-0 w-full h-full object-cover"
            initial={{ opacity: 0 }}
            animate={{ opacity: index === currentImage ? 1 : 0 }}
            transition={{ duration: 1 }}
          />
        ))}

        <div className="absolute inset-0 flex flex-col justify-end items-center text-center px-4 md:pb-24">
          <motion.h1
            className="text-3xl sm:text-7xl font-extrabold text-white drop-shadow-2xl mb-6"
            style={{ textShadow: "3px 3px 6px rgba(0, 0, 0, 0.8)" }}
            initial="hidden"
            animate="visible"
            variants={slideUp}
          >
            {t("home.hero_title")}
          </motion.h1>
        </div>
      </div>

      <div className="bg-gray-100 w-full py-12 md:py-20 px-4">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
            <motion.div
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              variants={slideLeft}
            >
              <div className="relative overflow-hidden rounded-xl shadow-2xl h-70 md:h-105">
                {architectureImages.map((img, index) => (
                  <motion.img
                    key={index}
                    src={img}
                    alt="Architecture"
                    className="absolute inset-0 w-full h-full object-cover"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: index === currentArchImage ? 1 : 0 }}
                    transition={{ duration: 1 }}
                  />
                ))}
              </div>
            </motion.div>

            <motion.div
              className="prose max-w-none text-gray-700 space-y-4"
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              variants={slideRight}
            >
              <div className="mb-6">
                <h2 className="text-lg text-gray-700">
                  {t("home.sub_heading")}
                </h2>
                <h1 className="text-2xl md:text-4xl font-bold text-yellow-700 border-b-2 border-yellow-700 pb-1">
                  {t("home.main_title")}
                </h1>
              </div>

              <p className="leading-relaxed">{t("home.para1")}</p>
              <p className="leading-relaxed">{t("home.para2")}</p>
              <p className="leading-relaxed">{t("home.para3")}</p>

              <div className="mt-8 flex justify-center">
                <button
                  onClick={() => navigate("/history")}
                  className="bg-yellow-700 text-white px-6 py-2 rounded-md hover:bg-yellow-800 transition"
                >
                  {t("home.button")}
                </button>
              </div>
            </motion.div>
          </div>
        </div>
      </div>
      <GalleryFuter />
    </div>
  );
};

export default Home;
