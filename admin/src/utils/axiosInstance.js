import axios from "axios";

const isLocalhost =
  typeof window !== "undefined" &&
  (window.location.hostname === "localhost" ||
    window.location.hostname === "127.0.0.1");

// Vercel-ൽ വർക്ക് ആകാൻ Render URL ഇവിടെ നൽകുന്നു
const apiBaseURL = isLocalhost 
  ? "http://localhost:5000/api" 
  : "https://pathaikkaramana.onrender.com/api"; 

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