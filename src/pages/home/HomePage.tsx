import { useSelector, useDispatch } from "react-redux";
import { useNavigate } from "react-router";
import { useEffect } from "react";
import { fetchAllQuizzes, setCurrent } from "../../store/slices/quizSlice";
import type { RootState } from "../../store/store";
import type { QuizType } from "../../types/quiz.type";

const HomePage = () => {
  const { quizzes, loading } = useSelector((state: RootState) => state.quiz);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  useEffect(() => {
    dispatch(fetchAllQuizzes());
  }, [dispatch]);

  const handleSelectQuiz = (quiz: QuizType) => {
    dispatch(setCurrent(quiz));
    navigate(`/dashboard/quiz`);
  };

  if (loading) return <p className="text-center py-10">Loading...</p>;

  return (
    <div className="container mx-auto py-10">
      <h2 className="text-3xl font-bold mb-6 text-center">Danh sách Quiz</h2>
      {quizzes.length === 0 ? (
        <p className="text-center">Hiện chưa có quiz nào.</p>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
          {quizzes.map((q) => (
            <div
              key={q._id}
              className="border rounded-lg p-4 shadow hover:shadow-lg transition cursor-pointer bg-white"
              onClick={() => handleSelectQuiz(q)}
            >
              <h3 className="text-xl font-semibold mb-2">{q.title}</h3>
              <p className="text-gray-600 mb-4">
                {q.description ? q.description : "Không có mô tả"}
              </p>
              <button
                className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 transition"
                onClick={() => handleSelectQuiz(q)}
              >
                Chọn Quiz
              </button>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default HomePage;
