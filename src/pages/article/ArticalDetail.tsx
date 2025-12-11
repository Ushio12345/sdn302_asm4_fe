import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import type { AppDispatch, RootState } from "../../store/store";
import { addQuestion, getQuizById } from "../../store/slices/quizSlice";

import QuestionItem from "../question/patials/QuestionItem";
import { Button } from "react-bootstrap";
import Loading from "../../components/ui/loading/Loading";
import { useNavigate, useParams } from "react-router";
import AddQuestionModal from "./patials/AddQuestionQuizModal";
import type { QuestionType } from "../../types/quiz.type";

const ArticalDetail = () => {
  const dispatch = useDispatch<AppDispatch>();
  const navigate = useNavigate();

  const { current, loading, error } = useSelector(
    (state: RootState) => state.quiz
  );

  const { id } = useParams<{ id: string }>();

  useEffect(() => {
    if (id) {
      dispatch(getQuizById(id));
    }
  }, [dispatch, id]);

  if (loading && !current) {
    return (
      <div className="w-full flex justify-center py-20">
        <Loading />
      </div>
    );
  }

  if (error) {
    return (
      <p className="text-red-600 text-center py-10 text-xl">
        Lỗi tải Quiz: {error}
      </p>
    );
  }

  if (!current) {
    return (
      <p className="text-gray-500 text-center py-10 text-xl">
        Không tìm thấy Quiz này.
      </p>
    );
  }

  const questionsList = current.questions || [];

  const handleAddOneQuestion = async (data: QuestionType) => {
    try {
      console.log(data);

      const res = await dispatch(
        addQuestion({
          quizId: current._id,
          questionData: data,
        })
      ).unwrap();

      console.log("Add question success:", res);
    } catch (error) {
      console.log("Add question failed:", error);
    }
  };

  return (
    <div className="max-w-4xl mx-auto py-8 px-4 sm:px-6 lg:px-8 bg-white shadow-xl rounded-lg">
      <header className="border-b pb-4 mb-6">
        <h1 className="text-4xl font-extrabold text-blue-600 mb-2">
          {current.title || "Untitled Quiz"}
        </h1>
        <p className="text-lg text-gray-600">
          {current.description || "Chưa có mô tả chi tiết."}
        </p>
        <div className="text-sm text-gray-500 mt-2">
          Tổng số câu hỏi:{" "}
          <span className="font-semibold">{questionsList.length}</span>
        </div>
      </header>

      <section className="mt-8">
        <h2 className="text-2xl font-bold mb-4 text-gray-800 border-l-4 border-indigo-500 pl-3">
          Danh sách Câu hỏi
        </h2>

        {questionsList.length > 0 ? (
          <div className="space-y-6">
            {questionsList.map((qs: any) => (
              <QuestionItem key={qs._id} data={qs} showActions={false} />
            ))}
          </div>
        ) : (
          <div className="text-center py-10 border border-dashed border-gray-300 rounded-lg bg-gray-50">
            <p className="text-gray-500">
              Quiz này chưa có câu hỏi nào được thêm.
            </p>
          </div>
        )}
      </section>

      <footer className="mt-8 pt-4 border-t flex justify-end space-x-3">
        <AddQuestionModal onAddQuestion={handleAddOneQuestion} />
        <Button
          variant="secondary"
          className="bg-gray-300 hover:bg-gray-400 text-gray-800"
          onClick={() => navigate(-1)}
        >
          &larr; Quay lại
        </Button>
      </footer>
    </div>
  );
};

export default ArticalDetail;
