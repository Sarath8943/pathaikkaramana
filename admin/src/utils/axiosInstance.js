import axios from "axios";

const isLocalhost =
  typeof window !== "undefined" &&
  (window.location.hostname === "localhost" ||
    window.location.hostname === "127.0.0.1");

const apiBaseURL =
  import.meta.env.VITE_API_BASE_URL || (isLocalhost ? "http://localhost:5000/api" : "/api");

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
