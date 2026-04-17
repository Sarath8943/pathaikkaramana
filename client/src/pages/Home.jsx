import React from "react";
import { useNavigate } from "react-router-dom";
import { useTranslation } from "react-i18next";
import GalleryFuter from "../components/Futures/GalleryFuter";

const images = [
  "/pathikkara manna.jpg",
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

  React.useEffect(() => {
    const heroImg = new Image();
    heroImg.src = images[0];

    const archImg = new Image();
    archImg.src = architectureImages[0];
  }, []);

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

  return (
    <div className="w-full min-h-screen overflow-x-hidden bg-gray-50 text-gray-900">
      <section className="relative w-full h-[70vh] md:h-screen overflow-hidden px-3 pt-3">
        <div className="relative w-full h-full rounded-3xl overflow-hidden">
          <img
            key={images[currentImage]}
            src={images[currentImage]}
            alt="Temple"
            loading="eager"
            fetchPriority="high"
            decoding="async"
            className="absolute inset-0 w-full h-full object-cover transition-opacity duration-700"
          />

          <div className="absolute inset-0 bg-black/30" />

          <div className="absolute inset-0 flex items-center justify-center text-center px-4">
            <h1 className="text-2xl sm:text-4xl md:text-6xl font-bold text-white drop-shadow-xl">
              {t("home.hero_title")}
            </h1>
          </div>
        </div>
      </section>

      <section className="w-full py-14 bg-gray-100">
        <div className="max-w-7xl mx-auto px-4">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 items-center">
            <div className="relative w-full h-72 md:h-105 rounded-2xl shadow-2xl overflow-hidden">
              <img
                key={architectureImages[currentArchImage]}
                src={architectureImages[currentArchImage]}
                className="absolute inset-0 w-full h-full object-cover transition-opacity duration-700"
                alt="Temple architecture"
                loading="lazy"
                decoding="async"
              />
            </div>

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
