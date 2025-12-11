import { axiosInstance } from "../axios/axiosInstance";
import type { QuestionType } from "../types/quiz.type";

export type QuizPayload = {
  title: string;
  description?: string;
};

export const quizService = {
  getAll: async () => {
    return await axiosInstance.get("/quizzes");
  },
  getById: async (id: string) => {
    return await axiosInstance.get(`/quizzes/${id}`);
  },
  create: async (data: QuizPayload) => {
    return await axiosInstance.post("/quizzes", data);
  },
  update: async (id: string, data: Partial<QuizPayload>) => {
    return await axiosInstance.put(`/quizzes/${id}`, data);
  },
  remove: async (id: string) => {
    return await axiosInstance.delete(`/quizzes/${id}`);
  },
  addQuestion: async (quizId: string, qsPayload: QuestionType) => {
    const res = await axiosInstance.post(
      `/quizzes/${quizId}/question`,
      qsPayload
    );
    return res.data;
  },
};
