import React from "react";
import { useTranslation } from "react-i18next";
import OfferingFuter from "../components/Futures/OfferingFuter";

export const Offering = () => {
  const { t } = useTranslation();
  const qrImage = "/qrcode.jpg";
  const offerings = t("offerings", { returnObjects: true });

  return (
    <div className="min-h-screen bg-linear-to-b from-slate-50 to-white py-10 px-4 font-sans">
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-8">
          <h1 className="text-2xl font-semibold text-[#b36b00] tracking-tight">
            {t("title")}
          </h1>
          <div className="w-20 h-0.5 bg-[#d4a156] mx-auto mt-2"></div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-5 mb-10">
          {offerings?.map((offering, index) => (
            <OfferingFuter
              key={index}
              title={offering.title}
              image={offering.image}
              items={offering.items}
              small={offering.small}
            />
          ))}
        </div>

        <div className="bg-white rounded-2xl shadow-md p-6 text-center mb-8">
          <h3 className="text-xl font-bold text-gray-800 mb-3">
            {t("donation.title")}
          </h3>
          <p className="text-amber-800 mb-6 text-base leading-relaxed">
            {t("donation.text")}
          </p>
          <div className="flex justify-center">
            <div className="bg-gray-50 p-6 rounded-xl shadow-inner">
              <img
                src={qrImage}
                alt="Temple Donation QR Code"
                className="w-64 h-64 object-contain"
              />
            </div>
          </div>
        </div>

        <div className="bg-linear-to-r from-amber-100 to-yellow-100 rounded-2xl shadow-md p-5 border-l-4 border-amber-500">
          <h3 className="text-base font-semibold text-amber-900 mb-1">
            {t("notice.title")}
          </h3>
          <p className="text-amber-800 text-sm leading-snug">
            {t("notice.text")}
          </p>
        </div>

        <div className="text-center mt-10 py-6">
          <img
            src="/Bhagawathy.jpg"
            alt="Bhagavathy"
            className="mx-auto w-14 h-14 mb-2 rounded-full object-cover shadow-md border-2 border-amber-400"
          />
          <p className="text-gray-600 text-sm font-medium">
            {t("footer.text")}
          </p>
        </div>
      </div>
    </div>
  );
};

export default Offering;
