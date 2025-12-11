import axios from "axios";
import { toast } from "react-toastify";

export const axiosInstance = axios.create({
  baseURL: import.meta.env.VITE_BASE_URL,
  headers: {
    "Content-Type": "application/json",
  },
  withCredentials: true,
  timeout: 10000,
});

axiosInstance.interceptors.request.use((config) => {
  const token = localStorage.getItem("token");
  if (token) {
    config.headers = {
      ...config.headers,
      Authorization: `Bearer ${token}`,
    };
  }
  return config;
});

axiosInstance.interceptors.response.use(
  (response) => {
    return response.data;
  },
  (error) => {
    const status = error.response?.status;
    const message =
      error.response?.data?.message || "Đã xảy ra lỗi không xác định.";

    switch (status) {
      case 400:
        toast.error(`400 Bad Request: ${message}`);
        break;
      case 401:
        toast.warn("Phiên làm việc hết hạn. Vui lòng đăng nhập lại.");
        window.location.href = "/";
        break;
      case 403:
        toast.error(`403 Forbidden: ${message}`);
        break;
      case 404:
        toast.error(`404 Not Found: ${message}`);
        break;
      case 500:
        toast.error(`500 Server Error: ${message}`);
        break;
      default:
        toast.error(`Lỗi kết nối hoặc lỗi không xử lý: ${message}`);
        break;
    }

    return Promise.reject(error);
  }
);
