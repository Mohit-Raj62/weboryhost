import axios from "axios";

// API Configuration
const getApiUrl = () => {
  // Check if we're in development
  if (import.meta.env.DEV) {
    console.log("Development mode - using localhost");
    return "http://localhost:5002";
  }

  // Check for custom API URL from environment
  if (import.meta.env.VITE_API_URL) {
    console.log(
      "Using VITE_API_URL from environment:",
      import.meta.env.VITE_API_URL
    );
    return import.meta.env.VITE_API_URL;
  }

  // Default production API URL (Render backend)
  console.log("Using default production URL");
  return "https://webory.onrender.com";
};

export const API_BASE_URL = getApiUrl();

export const API_ENDPOINTS = {
  // Auth endpoints
  LOGIN: `${API_BASE_URL}/api/auth/login`,
  REGISTER: `${API_BASE_URL}/api/auth/register`,
  LOGOUT: `${API_BASE_URL}/api/auth/logout`,

  // Admin endpoints
  ADMIN_LOGIN: `${API_BASE_URL}/api/admin/login`,
  ADMIN_DASHBOARD: `${API_BASE_URL}/api/admin/dashboard`,

  // Contact endpoints
  CONTACT: `${API_BASE_URL}/api/contact`,

  // Health check
  HEALTH: `${API_BASE_URL}/api/health`,
};

console.log("=== API Configuration Debug ===");
console.log("Environment:", import.meta.env.DEV ? "development" : "production");
console.log("VITE_API_URL:", import.meta.env.VITE_API_URL);
console.log("Final API_BASE_URL:", API_BASE_URL);
console.log("===============================");

// Create axios instance with default config
const axiosInstance = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    "Content-Type": "application/json",
    Accept: "application/json",
  },
  timeout: 60000, // 60 seconds for production
  withCredentials: false, // Changed to false for cross-origin requests
});

// Add request interceptor
axiosInstance.interceptors.request.use(
  (config) => {
    console.log("Making API request:", {
      url: config.url,
      method: config.method,
      baseURL: config.baseURL,
      fullURL: `${config.baseURL}${config.url}`,
      timeout: config.timeout,
    });

    // Add auth token if available
    const token = localStorage.getItem("adminToken");
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    console.error("Request interceptor error:", error);
    return Promise.reject(error);
  }
);

// Add response interceptor
axiosInstance.interceptors.response.use(
  (response) => response,
  (error) => {
    console.error("Response interceptor error:", error);
    return Promise.reject(error);
  }
);

export const apiConfig = {
  baseURL: API_BASE_URL,
  headers: {
    "Content-Type": "application/json",
    Accept: "application/json",
  },
  timeout: 15000, // 15 seconds
  withCredentials: true,
};

// Get auth header with token
export const getAuthHeader = () => {
  const token = localStorage.getItem("adminToken");
  return token ? { Authorization: `Bearer ${token}` } : {};
};

// Handle API errors
export const handleApiError = (error) => {
  // Log detailed error information
  console.error("API Error Details:", {
    message: error.message,
    code: error.code,
    status: error.response?.status,
    statusText: error.response?.statusText,
    data: error.response?.data,
    config: {
      url: error.config?.url,
      method: error.config?.method,
      baseURL: error.config?.baseURL,
      timeout: error.config?.timeout,
    },
  });

  if (error.code === "ERR_NETWORK") {
    return "Unable to connect to the server. Please check your internet connection and try again.";
  }

  if (error.code === "ECONNABORTED") {
    return "Request timed out. The server is taking too long to respond. Please try again.";
  }

  if (error.response) {
    // Server responded with error
    const status = error.response.status;
    const message =
      error.response.data?.error ||
      error.response.data?.message ||
      "An error occurred";

    switch (status) {
      case 401:
        localStorage.removeItem("adminToken"); // Clear invalid token
        return "Please log in to continue";
      case 403:
        return "You do not have permission to perform this action";
      case 404:
        return "The requested resource was not found";
      case 500:
        return "Server error. Please try again later";
      default:
        return message;
    }
  } else if (error.request) {
    // Request made but no response
    return "No response from server. Please check if the server is running and try again.";
  } else {
    // Request setup error
    return "Failed to make request. Please check your connection and try again.";
  }
};

// Check server connection
export const checkServerConnection = async () => {
  try {
    const healthCheckUrl = `${API_BASE_URL}/api/health`;
    console.log("Checking server connection to:", healthCheckUrl);

    const response = await fetch(healthCheckUrl, {
      method: "GET",
      headers: {
        Accept: "application/json",
      },
      mode: "cors",
      credentials: "omit", // Changed to omit
      timeout: 10000, // 10 seconds timeout
    });

    if (!response.ok) {
      throw new Error(
        `Server health check failed: ${response.status} ${response.statusText}`
      );
    }

    const data = await response.json();
    console.log("Server health check response:", data);
    return true;
  } catch (error) {
    console.error("Server connection check failed:", {
      message: error.message,
      code: error.code,
      stack: error.stack,
    });
    return false;
  }
};

export default axiosInstance;
