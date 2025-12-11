import { axiosInstance } from "../axios/axiosInstance";
import type { AuthType } from "../types/auth.type";

export const authServices = {
  login: async (formData: AuthType | undefined) => {
    try {
      const data = await axiosInstance.post("/auth/login", formData);

      return data;
    } catch (error) {
      throw error;
    }
  },

  register: async (formData: AuthType | undefined) => {
    try {
      const res = await axiosInstance.post("/auth/register", formData);
      return res;
    } catch (error) {
      throw error;
    }
  },

  checkLogin: async () => {
    try {
      const user = await axiosInstance.get("/auth/me"); // token cookie tự gửi kèm
      return user; // { _id, userName, isAdmin }
    } catch (err) {
      return null; // chưa login hoặc token hết hạn
    }
  },
};
