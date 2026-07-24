import axios from "axios";

export const http = axios.create({
  baseURL: import.meta.env.VITE_API_BASE_URL || "http://localhost:5000",
  withCredentials: true,
});

http.interceptors.request.use((config) => {
  const token = localStorage.getItem("token");

  if (!config.headers) {
    config.headers = {};
  }

  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  } else if (config.url?.startsWith("/api/")) {
    console.warn("No auth token found for API request:", config.url);
  }

  return config;
});

http.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error?.response?.status === 401) {
      console.warn(
        "Unauthorized API response:",
        error.config?.url,
        error.response?.data
      );
    }
    return Promise.reject(error);
  }
);