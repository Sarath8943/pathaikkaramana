import axios from "axios";

const axiosInstance = axios.create({
  baseURL: "https://pathaikkaramana.onrender.com",
  withCredentials: true,
  headers: {
    "Content-Type": "application/json",
  },
});

axiosInstance.interceptors.request.use(
  (config) => {
    console.log("Request URL:", config.url);
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
