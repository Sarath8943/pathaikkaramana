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

  const fadeIn = {
    hidden: { opacity: 0 },
    visible: { opacity: 1, transition: { duration: 0.8 } },
  };

  const slideUp = {
    hidden: { opacity: 0, y: 30 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.8 } },
  };

  const slideLeft = {
    hidden: { opacity: 0, x: 50 },
    visible: { opacity: 1, x: 0, transition: { duration: 0.8 } },
  };

  const slideRight = {
    hidden: { opacity: 0, x: -50 },
    visible: { opacity: 1, x: 0, transition: { duration: 0.8 } },
  };

  return (
    <div className="bg-gray-50 text-gray-900">
      <div className="relative w-full h-screen min-h-screen overflow-hidden">
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
        <div className="absolute inset-0 bg-linear-to-b from-black/60 via-black/40 to-black/60" />

        <div className="absolute inset-0 flex flex-col justify-center items-center text-center px-4">
          <motion.h1
            className="text-3xl xs:text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-extrabold text-white drop-shadow-lg mb-4 leading-tight"
            initial="hidden"
            animate="visible"
            variants={slideUp}
          >
            {t("history_page.hero.title")}
          </motion.h1>

          <motion.p
            className="text-sm xs:text-base sm:text-lg md:text-xl lg:text-2xl text-yellow-200 max-w-3xl mb-8 leading-relaxed"
            animate="visible"
            variants={slideUp}
            transition={{ delay: 0.3 }}
          >
            {t("history_page.hero.subtitle")}
          </motion.p>
        </div>
      </div>

      <div id="history" className="w-full py-12 sm:py-20 px-4 sm:px-8">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
            <motion.div
              className="relative order-2 md:order-1"
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              variants={slideRight}
            >
              <img
                src="/pathikkara manna.jpg"
                alt="Mana"
                className="rounded-xl shadow-2xl"
              />
            </motion.div>

            <motion.div
              className="order-1 md:order-2"
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              variants={slideLeft}
            >
              <h2 className="text-2xl sm:text-4xl font-bold text-yellow-700 mb-6">
                {t("history_page.story.title")}
              </h2>
              <div className="text-gray-700 space-y-4 text-sm sm:text-base">
                <p>{t("history_page.story.p1")}</p>
                <p>{t("history_page.story.p2")}</p>
                <p>{t("history_page.story.p3")}</p>
                <p>{t("history_page.story.p4")}</p>
                <p>{t("history_page.story.p5")}</p>
              </div>
            </motion.div>
          </div>
        </div>
      </div>

      <div className="bg-gray-100 py-20 px-6">
        <div className="max-w-7xl mx-auto">
          <motion.h2
            className="text-3xl sm:text-4xl font-bold text-center text-yellow-700 mb-12"
            initial="hidden"
            whileInView="visible"
            variants={slideUp}
          >
            {t("history_page.valluvanad.title")}
          </motion.h2>
          <div className="grid md:grid-cols-2 gap-12">
            <motion.div
              className="space-y-4 text-gray-700"
              initial="hidden"
              whileInView="visible"
              variants={slideLeft}
            >
              <p>{t("history_page.valluvanad.p1")}</p>
              <p>{t("history_page.valluvanad.p2")}</p>
              <p>{t("history_page.valluvanad.p3")}</p>
              <p>{t("history_page.valluvanad.p4")}</p>
              <p>{t("history_page.valluvanad.p5")}</p>
            </motion.div>
            <motion.div
              className="rounded-xl overflow-hidden shadow-2xl"
              variants={slideRight}
              initial="hidden"
              whileInView="visible"
            >
              <img src="/pathaikkara.jpg" alt="History" />
            </motion.div>
          </div>
        </div>
      </div>

      <div className="w-full py-20 px-4">
        <div className="max-w-7xl mx-auto bg-white rounded-2xl shadow-xl overflow-hidden">
          <div className="grid md:grid-cols-2">
            <motion.img
              src="/Bhagawathy.jpg"
              alt="Deity"
              className="w-full h-full object-cover"
              variants={slideRight}
              initial="hidden"
              whileInView="visible"
            />
            <motion.div
              className="p-8 md:p-12"
              variants={slideLeft}
              initial="hidden"
              whileInView="visible"
            >
              <h2 className="text-3xl font-bold text-yellow-700 mb-6">
                {t("history_page.deity.title")}
              </h2>
              <div className="space-y-4 text-gray-700">
                <p>{t("history_page.deity.p1")}</p>
                <p>{t("history_page.deity.p2")}</p>
                <p>{t("history_page.deity.p3")}</p>
                <p>{t("history_page.deity.p4")}</p>
                <p>{t("history_page.deity.p5")}</p>
                <p>{t("history_page.deity.p6")}</p>
                <p>{t("history_page.deity.p7")}</p>
                <p>{t("history_page.deity.p8")}</p>
                <p>{t("history_page.deity.p9")}</p>
              </div>
            </motion.div>
          </div>
        </div>
      </div>

      <div className="bg-gray-100 py-20 px-4">
        <div className="max-w-7xl mx-auto">
          <h2 className="text-3xl font-bold text-center text-yellow-700 mb-12">
            {t("history_page.architecture.title")}
          </h2>
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <motion.img
              src="/pathikkara1.jpg"
              className="rounded-xl shadow-2xl"
              variants={slideLeft}
              initial="hidden"
              whileInView="visible"
            />
            <div className="space-y-2 text-gray-700">
              <p>{t("history_page.architecture.p1")}</p>
              <p>{t("history_page.architecture.p2")}</p>
              <p>{t("history_page.architecture.p3")}</p>
              <p>{t("history_page.architecture.p4")}</p>
              <p>{t("history_page.architecture.p5")}</p>
            </div>
          </div>
        </div>
      </div>

      <div className="w-full py-20 px-4">
        <div className="max-w-7xl mx-auto bg-white rounded-2xl shadow-xl p-8 md:p-12">
          <div className="space-y-4 text-gray-700">
            <p>{t("history_page.keepers.p1")}</p>
            <p>{t("history_page.keepers.p2")}</p>
            <p>{t("history_page.keepers.p3")}</p>
            <p>{t("history_page.keepers.p4")}</p>
            <p>{t("history_page.keepers.p5")}</p>
            <p>{t("history_page.keepers.p6")}</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default History;
