// src/utils/axiosInstance.js
import axios from "axios";

const axiosInstance = axios.create({
  baseURL: "http://localhost:5000", // Backend URL
  withCredentials: true, // send cookies/token automatically
  headers: {
    "Content-Type": "application/json",
  },
});

// Optional: Request interceptor (for debugging or adding token)
axiosInstance.interceptors.request.use(
  (config) => {
    console.log("Request URL:", config.url);
    return config;
  },
  (error) => Promise.reject(error),
);

// Response interceptor for better error handling
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
