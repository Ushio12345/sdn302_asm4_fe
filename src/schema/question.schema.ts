import { z } from "zod";

export const questionSchema = z.object({
  text: z.string().min(10, "Nội dung câu hỏi phải có ít nhất 10 ký tự."),
  keywords: z.string().optional(),

  options: z
    .array(
      z.object({
        value: z.string().min(1, "Lựa chọn không được để trống"),
      })
    )
    .min(3, "Phải có ít nhất 4 lựa chọn."),

  correctAnswerIndex: z.number().min(0, "Vui lòng chọn đáp án đúng."),
});

export type QuestionFormInputs = z.infer<typeof questionSchema>;
