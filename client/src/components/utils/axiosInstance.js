import axios from "axios";

const isLocalhost =
  typeof window !== "undefined" &&
  (window.location.hostname === "localhost" ||
    window.location.hostname === "127.0.0.1");

const localApiBaseURL =
  import.meta.env.VITE_LOCAL_API_BASE_URL || "http://localhost:5000/api";

const ensureApiSuffix = (baseURL) => {
  if (!baseURL) return "/api";
  if (baseURL === "/api" || baseURL.endsWith("/api")) return baseURL;
  if (baseURL.endsWith("/api/")) return baseURL.slice(0, -1);
  return `${baseURL.replace(/\/+$/, "")}/api`;
};

const remoteApiBaseURL = ensureApiSuffix(import.meta.env.VITE_API_BASE_URL);
const apiBaseURL = isLocalhost ? localApiBaseURL : remoteApiBaseURL;

const axiosInstance = axios.create({
  baseURL: apiBaseURL,
  withCredentials: true,
  headers: {
    "Content-Type": "application/json",
  },
});

axiosInstance.interceptors.request.use(
  (config) => {
    console.log("Request URL:", `${config.baseURL || ""}${config.url || ""}`);
    return config;
  },
  (error) => Promise.reject(error),
);

axiosInstance.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response?.status === 403) {
      console.error("CORS Error: Check server CORS configuration");
    }
    return Promise.reject(error);
  },
);

export default axiosInstance;
