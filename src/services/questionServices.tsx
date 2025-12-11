import { axiosInstance } from "../axios/axiosInstance";
import type { QuestionType } from "../types/quiz.type";

export const questionServices = {
  getAllQuestions: async (): Promise<QuestionType[]> => {
    const res = await axiosInstance.get("/questions");
    return res.data;
  },

  getQuestionById: async (id: string): Promise<QuestionType> => {
    const res = await axiosInstance.get(`/questions/${id}`);
    return res.data;
  },

  createQuestion: async (data: QuestionType): Promise<QuestionType> => {
    const res = await axiosInstance.post("/questions", data);
    return res.data;
  },

  updateQuestion: async (
    id: string,
    data: Partial<QuestionType>
  ): Promise<QuestionType> => {
    const res = await axiosInstance.put(`/questions/${id}`, data);
    return res.data;
  },

  deleteQuestion: async (id: string): Promise<{ success: boolean }> => {
    const res = await axiosInstance.delete(`/questions/${id}`);
    return res.data;
  },
};
