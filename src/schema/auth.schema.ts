import { z } from "zod";

export const loginSchema = z.object({
  userName: z.string().min(1, "User Name is required"),
  password: z.string().min(1, "Password is required"),
});

export const registerSchema = z.object({
  userName: z.string().min(1, "User Name is required"),
  password: z.string().min(6, "Password must be at least 6 characters"),
});
