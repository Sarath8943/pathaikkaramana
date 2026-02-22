import React from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, Pagination, EffectCoverflow } from "swiper/modules";
import { useTranslation } from "react-i18next";

import "swiper/css";
import "swiper/css/effect-coverflow";
import "swiper/css/pagination";

export const ContactFuter = () => {
  const { t } = useTranslation();
  const members = t("committee.members", { returnObjects: true }) || [];

  return (
    <section className="w-full bg-slate-50 py-12 md:py-20 overflow-hidden">
      <style>{`
        .committee-swiper {
          padding-bottom: 70px !important;
        }
        .committee-swiper .swiper-pagination-bullet-active {
          background: #92400e !important;
          width: 20px;
          border-radius: 5px;
        }
      `}</style>

      <div className="max-w-7xl mx-auto px-4 text-center mb-12">
        <h2 className="text-3xl md:text-4xl font-black text-slate-900 mb-4">
          {t("committee.title")}
        </h2>
        <div className="h-1.5 w-16 bg-amber-800 mx-auto rounded-full"></div>
      </div>

      <div className="max-w-7xl mx-auto px-6">
        <Swiper
          modules={[Autoplay, Pagination, EffectCoverflow]}
          effect="coverflow"
          grabCursor={true}
          centeredSlides={true}
          loop={members.length >= 3}
          autoplay={{ delay: 3500, disableOnInteraction: false }}
          pagination={{ clickable: true, dynamicBullets: true }}
          breakpoints={{
            0: { slidesPerView: 1, spaceBetween: 20 },
            768: { slidesPerView: 2, spaceBetween: 30 },
            1024: { slidesPerView: 3, spaceBetween: 40 },
          }}
          coverflowEffect={{
            rotate: 0,
            stretch: 0,
            depth: 100,
            modifier: 1,
            slideShadows: false,
          }}
          className="committee-swiper"
        >
          {Array.isArray(members) &&
            members.map((m, i) => (
              <SwiperSlide key={i} className="flex justify-center">
                <div className="w-full bg-white rounded-[2.5rem] p-8 md:p-10 shadow-sm border border-slate-100 transition-all duration-500 hover:shadow-2xl hover:shadow-amber-900/10">
                  <div className="flex flex-col items-center text-center">
                    <img
                      src={m.img}
                      className="w-32 h-32 md:w-36 md:h-36 rounded-full object-cover shadow-md border-4 border-white mb-6"
                    />
                    <div className="space-y-2">
                      <h3 className="text-xl md:text-2xl font-bold text-slate-800 tracking-tight">
                        {m.name}
                      </h3>
                      <p className="text-amber-800 font-bold text-xs uppercase tracking-[0.15em]">
                        {m.role}
                      </p>
                    </div>
                  </div>
                </div>
              </SwiperSlide>
            ))}
        </Swiper>
      </div>
    </section>
  );
};

export default ContactFuter;
