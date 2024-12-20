import axios from "axios";
import Cookies from "js-cookie";
import { toast } from "react-toastify";

// Create Axios instance
const axiosInstance = axios.create({
  baseURL: "https://perfect-bride.shop", // Replace with your API base URL

  // baseURL: "http://localhost:7000", // Replace with your API base URL
  withCredentials: true, // Ensures cookies are sent with requests
});

// Request Interceptor: Attach Access Token from Cookies to Requests
axiosInstance.interceptors.request.use(
  (config) => {
    // Read the access token from cookies
    const token = Cookies.get("access_token");

    if (token) {
      config.headers.Authorization = `Bearer ${token}`; // Attach token to the Authorization header
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// Response Interceptor: Handle Token Expiry and Refresh Token Logic
axiosInstance.interceptors.response.use(
  (response) => response,
  async (error) => {
    const originalRequest = error.config;

    // If the error is due to unauthorized access (401) and it hasn't been retried yet
    if (error.response?.status === 401 && !originalRequest._retry) {
      originalRequest._retry = true;

      try {
        // Call refresh-token endpoint to get a new access token
        const refreshResponse = await axiosInstance.post("/refresh-token");
        const newAccessToken = refreshResponse.data.accessToken;

        // Update the token in cookies
        Cookies.set("access_token", newAccessToken, { expires: 0.5 }); // Token expires in 12 hours (0.5 days)

        // Update Authorization header and retry the failed request
        originalRequest.headers.Authorization = `Bearer ${newAccessToken}`;
        return axiosInstance(originalRequest);
      } catch (err) {
        // If the refresh token request fails, log the user out
        toast.error("Session expired. Please log in again.");
        Cookies.remove("access_token");
        Cookies.remove("refresh_token");
        window.location.href = "/superadmin/login"; // Redirect to login page
        return Promise.reject(err);
      }
    }

    return Promise.reject(error);
  }
);

export default axiosInstance;
