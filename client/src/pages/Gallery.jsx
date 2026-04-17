import React, { useState, useMemo, useEffect, useRef } from "react";
import axiosInstance from "../components/utils/axiosInstance";
import { FaPlay, FaTimes, FaDownload } from "react-icons/fa";
import { AnimatePresence } from "framer-motion";
import { useTranslation } from "react-i18next";

const GALLERY_CACHE_KEY = "gallery_media_cache_v1";
const GALLERY_CACHE_TTL_MS = 5 * 60 * 1000;

const getValidCachedMedia = () => {
  if (typeof window === "undefined") return [];
  try {
    const cached = window.localStorage.getItem(GALLERY_CACHE_KEY);
    if (!cached) return [];
    const parsed = JSON.parse(cached);
    const isCacheValid =
      Array.isArray(parsed?.items) &&
      typeof parsed?.savedAt === "number" &&
      Date.now() - parsed.savedAt < GALLERY_CACHE_TTL_MS;
    return isCacheValid ? parsed.items : [];
  } catch {
    return [];
  }
};

export const Gallery = () => {
  const { t } = useTranslation();
  const [media, setMedia] = useState(() => getValidCachedMedia());
  const [loading, setLoading] = useState(() => getValidCachedMedia().length === 0);
  const [isRefreshing, setIsRefreshing] = useState(false);
  const [preview, setPreview] = useState(null);
  const hasInitialMediaRef = useRef(media.length > 0);

  const resolveMediaUrl = (rawUrl) => {
    if (!rawUrl || typeof rawUrl !== "string") return "";

    if (rawUrl.startsWith("https://") || rawUrl.startsWith("http://")) {
      return rawUrl;
    }
    if (rawUrl.startsWith("//")) return `https:${rawUrl}`;

    const baseURL = axiosInstance.defaults.baseURL || "";
    let apiOrigin = "";

    if (baseURL.startsWith("http://") || baseURL.startsWith("https://")) {
      try {
        apiOrigin = new URL(baseURL).origin;
      } catch {
        apiOrigin = "";
      }
    } else if (typeof window !== "undefined") {
      apiOrigin = window.location.origin;
    }

    if (!apiOrigin) return rawUrl;
    return `${apiOrigin}${rawUrl.startsWith("/") ? rawUrl : `/${rawUrl}`}`;
  };

  useEffect(() => {
    const fetchMedia = async () => {
      try {
        if (!hasInitialMediaRef.current) {
          setLoading(true);
        } else {
          setIsRefreshing(true);
        }
        const res = await axiosInstance.get("/media");
        const fetchedData = Array.isArray(res.data)
          ? res.data
          : res.data?.media || res.data?.data || [];
        if (!Array.isArray(fetchedData)) {
          console.warn("Unexpected gallery API response:", res.data);
          setMedia([]);
          return;
        }
        setMedia(fetchedData);
        if (typeof window !== "undefined") {
          window.localStorage.setItem(
            GALLERY_CACHE_KEY,
            JSON.stringify({ items: fetchedData, savedAt: Date.now() }),
          );
        }
      } catch (err) {
        console.error("Gallery Fetch Error:", err);
      } finally {
        setLoading(false);
        setIsRefreshing(false);
      }
    };
    fetchMedia();
  }, []);

  const groupedMedia = useMemo(() => {
    const groups = {};
    if (!media.length) return [];
    media.forEach((item) => {
      const year = item.year || "Archive";
      if (!groups[year]) groups[year] = [];
      groups[year].push(item);
    });
    return Object.entries(groups).sort((a, b) => b[0] - a[0]);
  }, [media]);

  const getVideoPoster = (item) =>
    resolveMediaUrl(item.thumbnail || item.optimizedUrl || "");
  const getGridImage = (item) =>
    resolveMediaUrl(item.thumbnail || item.optimizedUrl || item.url);

  const handleDownload = async (url, filename) => {
    try {
      const response = await fetch(url);
      const blob = await response.blob();
      const blobUrl = window.URL.createObjectURL(blob);
      const link = document.createElement("a");
      link.href = blobUrl;
      link.download = filename || "download";
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
      window.URL.revokeObjectURL(blobUrl);
    } catch (error) {
      console.error("Download failed:", error);
    }
  };

  return (
    <div className="min-h-screen bg-amber-50/20 p-6 md:p-12 font-sans">
      <h1 className="text-4xl font-black text-amber-950 mb-12 tracking-tighter italic uppercase">
        {t("gallery")}
      </h1>
      {isRefreshing ? (
        <p className="mb-6 text-xs uppercase tracking-widest text-amber-800/70">
          Updating latest media...
        </p>
      ) : null}

      {loading && groupedMedia.length === 0 ? (
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-6">
          {Array.from({ length: 10 }).map((_, index) => (
            <div
              key={`gallery-skeleton-${index}`}
              className="aspect-square rounded-[2rem] bg-amber-100/60 animate-pulse"
            />
          ))}
        </div>
      ) : groupedMedia.length === 0 ? (
        <div className="text-center py-24 bg-white rounded-[4rem] border-4 border-dashed border-amber-50">
          <p className="text-amber-900/30 text-xl font-black italic uppercase tracking-widest">
            No Media Found
          </p>
        </div>
      ) : (
        groupedMedia.map(([year, items], groupIndex) => (
          <div key={year} className="mb-16">
            <h2 className="text-xl font-black text-amber-900 mb-8 flex items-center gap-4">
              <span className="w-8 h-1 bg-amber-600 rounded-full"></span>
              {year}
            </h2>
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-6">
              {items.map((item, itemIndex) => {
                const prioritizeImage = groupIndex === 0 && itemIndex < 6;
                return (
                <div
                  key={item._id}
                  onClick={() => setPreview(item)}
                  className="cursor-pointer bg-white rounded-[2rem] shadow-md overflow-hidden aspect-square relative border-4 border-white transition-all hover:shadow-xl"
                >
                  {item.type === "image" ? (
                    <img
                      src={getGridImage(item)}
                      className="w-full h-full object-cover"
                      alt=""
                      loading={prioritizeImage ? "eager" : "lazy"}
                      decoding="async"
                      fetchPriority={prioritizeImage ? "high" : "low"}
                    />
                  ) : (
                    <div className="w-full h-full overflow-hidden bg-amber-950 relative">
                      {getVideoPoster(item) ? (
                        <img
                          src={getVideoPoster(item)}
                          className="w-full h-full object-cover"
                          alt=""
                          loading={prioritizeImage ? "eager" : "lazy"}
                          decoding="async"
                          fetchPriority={prioritizeImage ? "high" : "low"}
                        />
                      ) : null}
                      <div className="absolute inset-0 flex items-center justify-center bg-black/20">
                        <FaPlay className="text-white/80 text-4xl z-10" />
                      </div>
                    </div>
                  )}
                </div>
              )})}
            </div>
          </div>
        ))
      )}

      <AnimatePresence>
        {preview && (
          <div
            className="fixed inset-0 bg-black/95 z-[100] flex items-center justify-center p-4 backdrop-blur-sm"
          >
            <div className="absolute top-6 right-6 flex items-center gap-6 z-[110]">
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  handleDownload(
                    resolveMediaUrl(preview.url),
                    `media-${preview.year}`,
                  );
                }}
                className="text-white/70 hover:text-white transition-colors flex items-center gap-2 bg-white/10 px-4 py-2 rounded-full backdrop-blur-md border border-white/20"
              >
                <FaDownload />{" "}
                <span className="text-xs font-bold uppercase tracking-widest">
                  Download
                </span>
              </button>

              <button
                onClick={() => setPreview(null)}
                className="text-white/50 hover:text-white text-3xl transition-colors"
              >
                <FaTimes />
              </button>
            </div>

            <div
              className="w-full h-full flex items-center justify-center"
              onClick={() => setPreview(null)}
            >
              {preview.type === "image" ? (
                <img
                  src={resolveMediaUrl(preview.url)}
                  className="max-h-[90vh] max-w-full object-contain shadow-2xl"
                  alt="Full view"
                />
              ) : (
                <video
                  src={resolveMediaUrl(preview.url)}
                  poster={getVideoPoster(preview)}
                  controls
                  autoPlay
                  className="max-h-[90vh] max-w-full shadow-2xl"
                />
              )}
            </div>
          </div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default Gallery;
