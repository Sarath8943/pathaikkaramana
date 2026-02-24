import React from "react";
import { useTranslation } from "react-i18next";
import { motion } from "framer-motion";

export const History = () => {
  const { t } = useTranslation();
  const images = ["/pathikkara manna.jpg", "/pathaikkara.jpg"];
  const [currentImage, setCurrentImage] = React.useState(0);

  React.useEffect(() => {
    const interval = setInterval(() => {
      setCurrentImage((prev) => (prev + 1) % images.length);
    }, 4000);
    return () => clearInterval(interval);
  }, [images.length]);

  const slideUp = { hidden: { opacity: 0, y: 30 }, visible: { opacity: 1, y: 0, transition: { duration: 0.8 } } };
  const slideLeft = { hidden: { opacity: 0, x: 50 }, visible: { opacity: 1, x: 0, transition: { duration: 0.8 } } };
  const slideRight = { hidden: { opacity: 0, x: -50 }, visible: { opacity: 1, x: 0, transition: { duration: 0.8 } } };

  return (
    <div className="bg-gray-50 text-gray-900">
      {/* Hero Section */}
      <div className="relative w-full h-screen min-h-125 overflow-hidden">
        {images.map((src, index) => (
          <img
            key={index}
            src={src}
            alt="Temple Slide"
            className={`absolute inset-0 w-full h-full object-cover transition-opacity duration-1000 ${
              index === currentImage ? "opacity-100" : "opacity-0"
            }`}
          />
        ))}
        <div className="absolute inset-0 bg-black/60" />
        <div className="absolute inset-0 flex flex-col justify-center items-center text-center px-4">
          <motion.h1
            className="text-4xl md:text-7xl font-extrabold text-white mb-4"
            initial="hidden"
            animate="visible"
            variants={slideUp}
          >
            {t("history_page.hero.title")}
          </motion.h1>
          <motion.p
            className="text-lg md:text-2xl text-yellow-200 max-w-3xl"
            animate="visible"
            variants={slideUp}
            transition={{ delay: 0.3 }}
          >
            {t("history_page.hero.subtitle")}
          </motion.p>
        </div>
      </div>

      {/* Main Content Sections */}
      <div className="py-12 sm:py-20 px-4 sm:px-8 space-y-16">
        
        {/* Story Section */}
        <section className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
          <motion.img src="/pathikkara manna.jpg" alt="Mana" className="rounded-xl shadow-2xl w-full" initial="hidden" whileInView="visible" variants={slideRight} />
          <motion.div initial="hidden" whileInView="visible" variants={slideLeft}>
            <h2 className="text-3xl font-bold text-yellow-700 mb-6">{t("history_page.story.title")}</h2>
            <div className="text-gray-700 space-y-4 text-sm sm:text-base">
              {[1, 2, 3, 4, 5].map((i) => <p key={i}>{t(`history_page.story.p${i}`)}</p>)}
            </div>
          </motion.div>
        </section>

        {/* Valluvanad Section */}
        <section className="bg-gray-100 py-16 px-4 rounded-3xl max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
          <motion.div initial="hidden" whileInView="visible" variants={slideLeft}>
            <h2 className="text-3xl font-bold text-yellow-700 mb-6">{t("history_page.valluvanad.title")}</h2>
            <div className="text-gray-700 space-y-4">{[1, 2, 3, 4, 5].map((i) => <p key={i}>{t(`history_page.valluvanad.p${i}`)}</p>)}</div>
          </motion.div>
          <motion.img src="/pathaikkara.jpg" alt="History" className="rounded-xl shadow-2xl w-full" initial="hidden" whileInView="visible" variants={slideRight} />
        </section>

        {/* Deity Section */}
        <section className="max-w-7xl mx-auto bg-white p-6 sm:p-12 rounded-2xl shadow-xl grid grid-cols-1 md:grid-cols-2 gap-8">
          <motion.img src="/Bhagawathy.jpg" alt="Deity" className="w-full h-auto rounded-xl" initial="hidden" whileInView="visible" variants={slideRight} />
          <motion.div initial="hidden" whileInView="visible" variants={slideLeft}>
            <h2 className="text-3xl font-bold text-yellow-700 mb-6">{t("history_page.deity.title")}</h2>
            <div className="text-gray-700 space-y-4">{[1, 2, 3, 4, 5, 6, 7, 8, 9].map((i) => <p key={i}>{t(`history_page.deity.p${i}`)}</p>)}</div>
          </motion.div>
        </section>

        {/* Architecture & Keepers */}
        <section className="max-w-7xl mx-auto space-y-16">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
            <motion.img src="/pathikkara1.jpg" className="rounded-xl shadow-2xl w-full" initial="hidden" whileInView="visible" variants={slideLeft} />
            <div className="space-y-4 text-gray-700">
              <h2 className="text-3xl font-bold text-yellow-700">{t("history_page.architecture.title")}</h2>
              {[1, 2, 3, 4, 5].map((i) => <p key={i}>{t(`history_page.architecture.p${i}`)}</p>)}
            </div>
          </div>

          <div className="bg-white p-8 rounded-2xl shadow-xl">
            <div className="space-y-4 text-gray-700">{[1, 2, 3, 4, 5, 6].map((i) => <p key={i}>{t(`history_page.keepers.p${i}`)}</p>)}</div>
          </div>
        </section>
      </div>
    </div>
  );
};

export default History;