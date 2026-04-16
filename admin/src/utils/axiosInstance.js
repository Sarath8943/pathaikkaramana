import axios from "axios";

const isLocalhost =
  typeof window !== "undefined" &&
  (window.location.hostname === "localhost" ||
    window.location.hostname === "127.0.0.1");

const localApiBaseURL =
  import.meta.env.VITE_LOCAL_API_BASE_URL || "http://localhost:5000/api";
const remoteApiBaseURL =
  import.meta.env.VITE_API_BASE_URL ||
  "https://pathaikkaramana.onrender.com/api";

const apiBaseURL = isLocalhost ? localApiBaseURL : remoteApiBaseURL;

const axiosInstance = axios.create({
  baseURL: apiBaseURL,
  withCredentials: true,
});

axiosInstance.interceptors.request.use(
  (config) => {
    const token = sessionStorage.getItem("token");
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

export default axiosInstance;
