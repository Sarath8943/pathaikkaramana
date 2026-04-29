import React from "react";
import { useTranslation } from "react-i18next";

export const Donation = ({ embedded = false }) => {
  const { t } = useTranslation();
  const qrLeftTrimPx = 14;

  return (
    <div
      className={`bg-linear-to-b from-amber-50 via-white to-slate-50 px-4 ${
        embedded ? "py-6" : "min-h-screen py-10"
      }`}
    >
      <div className="mx-auto max-w-4xl">
        <div className="mb-8 text-center">
          <h2 className="text-3xl font-bold text-amber-900 md:text-4xl">
            {t("donation.title")}
          </h2>
          <div className="mx-auto mt-3 h-1 w-24 rounded-full bg-amber-300" />
          <p className="mx-auto mt-4 max-w-2xl text-sm text-stone-600 md:text-base">
            {t("donation.text")}
          </p>
        </div>

        <div className="rounded-2xl border border-amber-100 bg-white p-6 shadow-lg md:p-8">
          <div className="mx-auto max-w-sm overflow-hidden rounded-xl border border-amber-200 p-4">
            <img
              src="/qrcode.jpg"
              alt="Temple donation QR code"
              className="h-auto rounded-lg object-cover"
              style={{
                width: `calc(100% + ${qrLeftTrimPx}px)`,
                marginLeft: `-${qrLeftTrimPx}px`,
                maxWidth: "none",
              }}
            />
          </div>
          <p className="mt-4 text-center text-sm text-stone-500">
            Scan the QR code and complete your payment.
          </p>
        </div>

        <div className="mt-8 rounded-xl border-l-4 border-amber-600 bg-amber-100/70 p-4 md:p-5">
          <h2 className="text-sm font-semibold uppercase tracking-wide text-amber-900">
            {t("notice.title")}
          </h2>
          <p className="mt-2 text-sm leading-relaxed text-amber-800">
            {t("notice.text")}
          </p>
        </div>
      </div>
    </div>
  );
};

export default Donation;
