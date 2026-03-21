import axios from "axios";

const apiBaseURL =
  import.meta.env.VITE_API_BASE_URL ||
  "https://pathaikkaramana.onrender.com/api";

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
  (error) => Promise.reject(error)
);

export default axiosInstance;
