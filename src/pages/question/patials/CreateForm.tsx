import { useEffect } from "react";
import { Button, Form, InputGroup } from "react-bootstrap";
import {
  questionSchema,
  type QuestionFormInputs,
} from "../../../schema/question.schema";
import { useFieldArray, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import type { QuestionType } from "../../../types/quiz.type";

type Props = {
  editData: QuestionType | null;
  onAdd: (data: any) => void;
  onEdit: (data: any) => void;
  onClearEdit: () => void;
};

const CreateForm = ({ editData, onAdd, onEdit, onClearEdit }: Props) => {
  const defaultValues: QuestionFormInputs = {
    text: "",
    keywords: "",
    options: [{ value: "" }, { value: "" }, { value: "" }, { value: "" }],
    correctAnswerIndex: 0,
  };

  const {
    register,
    handleSubmit,
    control,
    reset,
    formState: { errors },
    setValue,
    watch,
  } = useForm<QuestionFormInputs>({
    resolver: zodResolver(questionSchema),
    defaultValues,
  });

  const { fields, append, remove, replace } = useFieldArray({
    control,
    name: "options",
  });

  useEffect(() => {
    if (editData) {
      console.log(editData);

      reset({
        text: editData.text,
        keywords: editData.keywords?.join(",") || "",
        correctAnswerIndex: editData.correctAnswerIndex ?? 0,
      });

      replace(editData.options.map((op) => ({ value: op })));
    }
  }, [editData, reset, replace]);

  const onSubmit = (data: QuestionFormInputs) => {
    const payload = {
      ...data,
      keywords: data.keywords.split(",").map((k) => k.trim()),
      options: data.options.map((o) => o.value),
      correctAnswerIndex: Number(data.correctAnswerIndex),
    };
    console.log("pa", payload);

    if (editData) {
      onEdit({ ...payload, _id: editData._id });
      onClearEdit();
    } else {
      onAdd(payload);
    }

    reset(defaultValues);
    replace(defaultValues.options);
  };

  const handleClear = () => {
    reset(defaultValues);
    replace(defaultValues.options);
    onClearEdit();
  };

  return (
    <Form onSubmit={handleSubmit(onSubmit)} className="mb-4 p-4 border rounded">
      <h4 className="mb-3">{editData ? "Edit Question" : "Add Question"}</h4>

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

      <Form.Group className="mb-3">
        <Form.Label>Keywords (Phân cách bằng dấu phẩy)</Form.Label>
        <Form.Control type="text" {...register("keywords")} />
      </Form.Group>

      <h5 className="mt-4 mb-2">Options</h5>

      {fields.map((field, index) => (
        <InputGroup key={field.id} className="mb-2">
          <InputGroup.Radio
            value={index}
            checked={index === Number(watch("correctAnswerIndex"))}
            onChange={() => setValue("correctAnswerIndex", index)}
          />

          <Form.Control
            placeholder={`Option ${index + 1}`}
            {...register(`options.${index}.value`)}
            isInvalid={!!errors.options?.[index]?.value}
          />

          {fields.length > 2 && (
            <Button variant="outline-danger" onClick={() => remove(index)}>
              Delete
            </Button>
          )}
        </InputGroup>
      ))}

      <Button
        variant="outline-primary"
        className="my-2"
        onClick={() => append({ value: "" })}
        disabled={fields.length >= 6}
      >
        + Add more
      </Button>

      <div className="mt-3">
        <Button variant="dark" type="submit">
          Save
        </Button>
        <Button className="ms-2" variant="secondary" onClick={handleClear}>
          Clear
        </Button>
      </div>
    </Form>
  );
};

export default CreateForm;
