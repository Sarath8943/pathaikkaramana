import React, { useCallback, useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import axiosInstance from "../components/utils/axiosInstance";
import OfferingFuter from "../components/Futures/OfferingFuter";
import Donation from "./Donation";

const OFFERINGS_CACHE_KEY = "offerings_cache_v1";
const OFFERINGS_CACHE_TTL = 5 * 60 * 1000;

const readOfferingsCache = () => {
  try {
    const raw = localStorage.getItem(OFFERINGS_CACHE_KEY);
    if (!raw) return [];

    const parsed = JSON.parse(raw);
    if (
      !parsed ||
      !Array.isArray(parsed.items) ||
      typeof parsed.savedAt !== "number"
    ) {
      return [];
    }

    if (Date.now() - parsed.savedAt > OFFERINGS_CACHE_TTL) {
      return [];
    }

    return parsed.items;
  } catch {
    return [];
  }
};

const writeOfferingsCache = (items) => {
  try {
    localStorage.setItem(
      OFFERINGS_CACHE_KEY,
      JSON.stringify({ items, savedAt: Date.now() }),
    );
  } catch {
    // Ignore cache write failures.
  }
};

export const Offering = () => {
  const { t, i18n } = useTranslation();
  const [offerings, setOfferings] = useState(() => readOfferingsCache());
  const [loading, setLoading] = useState(() => readOfferingsCache().length === 0);

  const normalizeOfferings = useCallback((rawOfferings) => {
    if (!Array.isArray(rawOfferings)) return [];

    return rawOfferings.map((offering, index) => {
      const rawTitle = offering?.title;
      const title =
        rawTitle && typeof rawTitle === "object"
          ? {
              ml: rawTitle.ml || rawTitle.en || "",
              en: rawTitle.en || rawTitle.ml || "",
            }
          : {
              ml: rawTitle || "",
              en: rawTitle || "",
            };

      const items = Array.isArray(offering?.items)
        ? offering.items.map((item) => ({
            name_ml: item?.name_ml || item?.name || "",
            name_en: item?.name_en || item?.name || "",
            price: item?.price ?? "",
          }))
        : [];

      return {
        _id: offering?._id || `fallback-${index}`,
        title,
        image: offering?.image || "/Bhagawathy.jpg",
        small: Boolean(offering?.small),
        items,
      };
    });
  }, []);

  const formatPrice = (price) => {
    if (price === null || price === undefined || price === "") return "";
    if (typeof price === "string" && price.toLowerCase().includes("rs")) {
      return price;
    }

    const numeric = Number(String(price).replace(/[^\d.]/g, ""));
    if (Number.isNaN(numeric)) return String(price);
    return `Rs ${numeric}`;
  };

  const fetchOfferings = useCallback(async () => {
    try {
      const res = await axiosInstance.get("/offering", { timeout: 10000 });
      const apiOfferings = normalizeOfferings(res.data);
      setOfferings(apiOfferings);
      writeOfferingsCache(apiOfferings);
    } catch (err) {
      console.error("Error fetching offerings:", err);
      setOfferings((prev) => (prev.length > 0 ? prev : []));
    } finally {
      setLoading(false);
    }
  }, [normalizeOfferings]);

  useEffect(() => {
    fetchOfferings();

    const intervalId = setInterval(fetchOfferings, 30000);
    return () => clearInterval(intervalId);
  }, [fetchOfferings]);

  if (loading) return <div className="text-center p-10">Loading...</div>;

  return (
    <div className="min-h-screen  bg-slate-50 to-white py-10 px-4 font-sans">
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-8">
          <h1 className="text-2xl font-semibold text-[#b36b00] tracking-tight">
            {t("title")}
          </h1>
          <div className="w-20 h-0.5 bg-[#d4a156] mx-auto mt-2"></div>
        </div>

        {offerings.length === 0 && (
          <p className="text-center text-stone-500 mb-6">No offering data available.</p>
        )}

        <div className="grid grid-cols-1 md:grid-cols-3 gap-5 mb-10">
          {Array.isArray(offerings) &&
            offerings.map((offering) => (
              <OfferingFuter
                key={offering._id}
                title={
                  offering.title?.[i18n.language] ||
                  offering.title?.ml ||
                  offering.title?.en ||
                  ""
                }
                image={offering.image}
                items={offering.items?.map((item) => ({
                  ...item,
                  name:
                    item[`name_${i18n.language}`] ||
                    item.name_ml ||
                    item.name_en ||
                    "",
                  price: formatPrice(item.price),
                }))}
                small={offering.small}
              />
            ))}
        </div>

        <Donation embedded />
      </div>
    </div>
  );
};

export default Offering;
