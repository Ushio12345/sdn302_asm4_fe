import React, { useState } from "react";
import { Modal, Button, Form, InputGroup } from "react-bootstrap";
import { useForm, useFieldArray } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import type { QuestionType } from "../../../types/quiz.type";
import {
  questionSchema,
  type QuestionFormInputs,
} from "../../../schema/question.schema";

type Props = {
  onAddQuestion: (data: QuestionType) => void;
};

// Default value khi mở form
const defaultValues: QuestionFormInputs = {
  text: "",
  keywords: "",
  options: [{ value: "" }, { value: "" }, { value: "" }, { value: "" }],
  correctAnswerIndex: 0,
};

export default function AddQuestionModal({ onAddQuestion }: Props) {
  const [show, setShow] = useState(false);

  const {
    register,
    handleSubmit,
    control,
    reset,
    formState: { errors },
    watch,
  } = useForm<QuestionFormInputs>({
    resolver: zodResolver(questionSchema),
    defaultValues: defaultValues,
  });

  const { fields, append, remove } = useFieldArray({
    control,
    name: "options",
  });

  const onSubmit = (data: QuestionFormInputs) => {
    // 3. Chuyển đổi định dạng data từ FieldArray sang QuestionType
    const newQuestion: any = {
      text: data.text,
      keywords: data.keywords
        ? data.keywords.split(",").map((k) => k.trim())
        : [],
      options: data.options.map((opt) => opt.value),
      correctAnswerIndex: data.correctAnswerIndex,
    };

    onAddQuestion(newQuestion); // Gọi callback
    reset(defaultValues); // Reset form về trạng thái ban đầu
    setShow(false);
  };

  const handleClose = () => {
    reset(defaultValues);
    setShow(false);
  };

  return (
    <>
      <Button onClick={() => setShow(true)} variant="success">
        + Thêm Câu hỏi Mới
      </Button>

      <Modal show={show} onHide={handleClose} size="lg">
        <Modal.Header closeButton>
          <Modal.Title>Thêm Câu hỏi</Modal.Title>
        </Modal.Header>

        <Form onSubmit={handleSubmit(onSubmit)}>
          <Modal.Body>
            {/* 1. Nội dung Câu hỏi (Text) */}
            <Form.Group className="mb-3">
              <Form.Label>Nội dung Câu hỏi</Form.Label>
              <Form.Control
                as="textarea"
                rows={3}
                {...register("text")}
                isInvalid={!!errors.text}
              />
              <Form.Control.Feedback type="invalid">
                {errors.text?.message}
              </Form.Control.Feedback>
            </Form.Group>

            {/* 2. Keywords (Từ khóa) */}
            <Form.Group className="mb-3">
              <Form.Label>Keywords (Phân cách bằng dấu phẩy)</Form.Label>
              <Form.Control type="text" {...register("keywords")} />
            </Form.Group>

            {/* 3. Danh sách Lựa chọn (Options) */}
            <h5 className="mt-4 mb-3 text-lg font-semibold border-b pb-1">
              Các Lựa chọn
            </h5>

            {fields.map((field, index) => (
              <InputGroup key={field.id} className="mb-3">
                {/* Radio Button cho Đáp án Đúng */}
                <InputGroup.Radio
                  {...register("correctAnswerIndex", { valueAsNumber: true })}
                  value={index}
                  checked={index === watch("correctAnswerIndex")} // Watch để cập nhật trạng thái
                  aria-label={`Chọn đáp án ${index + 1}`}
                />

                {/* Input nhập nội dung Option */}
                <Form.Control
                  placeholder={`Lựa chọn ${index + 1}`}
                  {...register(`options.${index}.value` as const)}
                  isInvalid={!!errors.options?.[index]?.value}
                />

                {/* Nút Xóa Option */}
                {fields.length > 2 && ( // Chỉ cho phép xóa khi có > 2 lựa chọn
                  <Button
                    variant="outline-danger"
                    onClick={() => remove(index)}
                  >
                    Xóa
                  </Button>
                )}
              </InputGroup>
            ))}

            {/* Hiển thị lỗi chung của mảng Options */}
            {errors.options?.root && (
              <p className="text-danger text-sm">
                {errors.options?.root.message}
              </p>
            )}

            {/* Nút Thêm Option */}
            <Button
              variant="outline-primary"
              onClick={() => append({ value: "" })}
              className="mt-2"
              disabled={fields.length >= 6}
            >
              + Thêm Lựa chọn
            </Button>
          </Modal.Body>

          <Modal.Footer>
            <Button variant="secondary" onClick={handleClose}>
              Đóng
            </Button>
            <Button variant="primary" type="submit">
              Lưu Câu hỏi
            </Button>
          </Modal.Footer>
        </Form>
      </Modal>
    </>
  );
}
