import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import Loading from "../../components/ui/loading/Loading";
import type { AppDispatch, RootState } from "../../store/store";
import QuestionItem from "./patials/QuestionItem";
import {
  createQuestion,
  deleteQuestion,
  fetchAllQuestions,
  setCurrent,
  updateQuestion,
} from "../../store/slices/questionSlice";
import CreateForm from "./patials/CreateForm";
import type { QuestionType } from "../../types/quiz.type";

import ConfirmDelete from "../../components/ui/ComfirmDelete";
import { toast } from "react-toastify";

const QuestionPage = () => {
  const { loading, error, questions, current } = useSelector(
    (state: RootState) => state.question
  );
  const author = JSON.parse(localStorage.getItem("user") || "{}")?.userId;

  const [showConfirm, setShowConfirm] = useState(false);
  const dispatch = useDispatch<AppDispatch>();
  const [quizIdToDelete, setQuizIdToDelete] = useState<string | null>(null);

  useEffect(() => {
    dispatch(fetchAllQuestions());
  }, [dispatch]);

  const handleGetQuestion = (data: QuestionType) => {
    dispatch(setCurrent(data));
  };

  const handleAddQuestion = async (data: QuestionType) => {
    try {
      await dispatch(createQuestion(data)).unwrap();
      toast.success("Question added successfully");
    } catch (err: any) {
      toast.error(err?.message || "Cannot add question");
    }
  };

  const handleUpdateQuestion = async (data: QuestionType) => {
    if (!current?._id) return;
    try {
      await dispatch(updateQuestion({ id: current._id, data })).unwrap();
      toast.success("Question updated successfully");
    } catch (err: any) {
      toast.error(err?.message || "Cannot update question");
    }
  };

  const handleClearEdit = () => {
    dispatch(setCurrent(null));
  };

  const handleDeleteClick = (id: string) => {
    setQuizIdToDelete(id);
    setShowConfirm(true);
  };

  const handleConfirmDelete = async () => {
    if (!quizIdToDelete) return;
    try {
      await dispatch(deleteQuestion(quizIdToDelete)).unwrap();
      toast.success("Question deleted");
    } catch (err: any) {
      toast.error(err?.message || "Cannot delete question");
    } finally {
      setShowConfirm(false);
      setQuizIdToDelete(null);
    }
  };

  return (
    <div className="container py-5">
      <h2 className="text-3xl font-bold mb-6">Manage Questions</h2>

      <CreateForm
        editData={current ?? null}
        onAdd={handleAddQuestion}
        onEdit={handleUpdateQuestion}
        onClearEdit={handleClearEdit}
        author={author}
      />

      {loading && (
        <div className="w-full flex justify-center py-10">
          <Loading />
        </div>
      )}

      {error && <p className="text-red-500 text-center py-10">{error}</p>}

      {questions.map((qs) => (
        <QuestionItem
          key={qs._id}
          data={qs}
          getCrr={handleGetQuestion}
          onDelete={handleDeleteClick}
          showActions={true}
        />
      ))}

      <ConfirmDelete
        show={showConfirm}
        onConfirm={handleConfirmDelete}
        onCancel={() => setShowConfirm(false)}
        message="Bạn có chắc chắn muốn xóa quiz này không?"
      />
    </div>
  );
};

export default QuestionPage;
