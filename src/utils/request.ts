import axios from "axios";

const BASE_URL = "http://localhost:5000/api/v1";

export const request = axios.create({
  baseURL: BASE_URL,
});

request.interceptors.request.use(
  (config) => {
    try {
      const token = JSON.parse(
        localStorage.getItem("user") as string
      )?.accessToken; // Example: Fetch token from localStorage
      if (token) {
        config.headers.Authorization = `Bearer ${token}`;
      }
    } catch (error) {

    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// Response interceptor to handle errors globally
request.interceptors.response.use(
  (response) => {
    return response;
  },
  (error) => {
    if (error.response && error.response.status === 401) {
      // Handle unauthorized error (e.g., redirect to login)
      console.log("Unauthorized, redirecting to login...");
      window.location.href = "/login"; // Example: redirect to login
    }
    return Promise.reject(error);
  }
);
