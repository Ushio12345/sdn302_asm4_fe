import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import type { AppDispatch, RootState } from "../../store/store";
import {
  createQuiz,
  deleteQuiz,
  fetchAllQuizzes,
  setCurrent,
  updateQuiz,
} from "../../store/slices/quizSlice";
import Loading from "../../components/ui/loading/Loading";
import ArticlesTable from "./patials/ArticlesTable";

import type { QuizPayload } from "../../services/quizServices";
import { toast } from "react-toastify";

import AddQuizModal from "./patials/AddQuizModal";
import EditQuizModal from "./patials/EditQuizModal";
import type { QuizType } from "../../types/quiz.type";
import ConfirmDelete from "../../components/ui/ComfirmDelete";

const ArticlePage = () => {
  const dispatch = useDispatch<AppDispatch>();
  const { quizzes, loading, error, current } = useSelector(
    (state: RootState) => state.quiz
  );

  const [show, setShow] = useState(false);
  const [showConfirm, setShowConfirm] = useState(false);
  const [quizIdToDelete, setQuizIdToDelete] = useState<string | null>(null);
  useEffect(() => {
    dispatch(fetchAllQuizzes());
  }, [dispatch]);
  console.log(quizzes);

  if (loading || quizzes.length === 0)
    return (
      <div className="w-full flex justify-center py-10">
        <Loading />
      </div>
    );

  // add quiz
  const handleAddQuiz = async (data: QuizPayload) => {
    try {
      const res = await dispatch(createQuiz(data)).unwrap();
      toast.success("Add new quiz successfully");
      console.log("Quiz added:", res);
    } catch (error: any) {
      console.log("Cannot add new quiz", error);
    }
  };

  // edit

  const handleOpenEditModal = (quiz: QuizType) => {
    dispatch(setCurrent(quiz));
    setShow(true);
  };

  const handleUpdateQuiz = async (data: QuizPayload) => {
    try {
      console.log(data);

      if (current?._id) {
        await dispatch(
          updateQuiz({
            id: current?._id,
            data: { title: data.title, description: data.description },
          })
        ).unwrap();
        toast.success("Quiz updated successfully");
      }
    } catch (err) {
      toast.error("Cannot update quiz");
    }
  };

  //delete

  const handleDeleteClick = (id: string) => {
    setQuizIdToDelete(id);
    setShowConfirm(true);
  };

  const handleConfirmDelete = async () => {
    if (!quizIdToDelete) return;
    try {
      await dispatch(deleteQuiz(quizIdToDelete)).unwrap();
      toast.success("Quiz đã được xóa");
    } catch (err) {
      toast.error("Không thể xóa quiz");
    } finally {
      setShowConfirm(false);
      setQuizIdToDelete(null);
    }
  };
  return (
    <section className="container">
      <h2 className="text-center">MANAGER QUIZZES</h2>
      {error && <p className="text-red-500">{error}</p>}
      <div className="mb-3">
        <AddQuizModal onAddQuiz={handleAddQuiz} />
      </div>
      <ArticlesTable
        data={quizzes}
        onEdit={handleOpenEditModal}
        onDelete={handleDeleteClick}
      />
      <ConfirmDelete
        show={showConfirm}
        onConfirm={handleConfirmDelete}
        onCancel={() => setShowConfirm(false)}
        message="Bạn có chắc chắn muốn xóa quiz này không?"
      />
      {show && (
        <EditQuizModal
          onEdit={handleUpdateQuiz}
          quiz={current}
          show={show}
          setShow={setShow}
        />
      )}
    </section>
  );
};

export default ArticlePage;
