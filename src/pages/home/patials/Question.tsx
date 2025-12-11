import { useSelector } from "react-redux";
import { useState, useEffect } from "react";
import type { RootState } from "../../../store/store";

const QuizPage = () => {
  const quiz = useSelector((state: RootState) => state.quiz.current);
  const [answers, setAnswers] = useState<number[]>([]);
  const [score, setScore] = useState<number | null>(null);
  const [submitted, setSubmitted] = useState(false);

  // Initialize answers when quiz changes
  useEffect(() => {
    if (quiz && quiz.questions && quiz.questions.length > 0) {
      setAnswers(new Array(quiz.questions.length).fill(-1));
      setScore(null);
      setSubmitted(false);
    }
  }, [quiz]);

  if (!quiz) return <p className="text-center py-10">Chọn quiz trước</p>;

  if (!quiz.questions || quiz.questions.length === 0)
    return (
      <p className="text-center py-10 text-red-500 font-semibold">
        Quiz này chưa có câu hỏi
      </p>
    );

  const handleAnswerChange = (qIndex: number, optionIndex: number) => {
    const newAnswers = [...answers];
    newAnswers[qIndex] = optionIndex;
    setAnswers(newAnswers);
  };

  const handleSubmit = () => {
    let count = 0;
    quiz.questions.forEach((q, idx) => {
      if (answers[idx] === q.correctAnswerIndex) count++;
    });
    setScore(count);
    setSubmitted(true);
  };

  return (
    <div className="container mx-auto py-10">
      <h2 className="text-3xl font-bold mb-6 text-center">{quiz.title}</h2>
      <div className="space-y-6">
        {quiz.questions.map((q, qIdx) => (
          <div key={q._id} className="p-4 border rounded-lg bg-white shadow">
            <p className="font-semibold mb-2">
              {qIdx + 1}. {q.text}
            </p>
            <div className="space-y-1">
              {q.options.map((opt, idx) => {
                const isCorrect = submitted && idx === q.correctAnswerIndex;
                const isWrong =
                  submitted &&
                  answers[qIdx] === idx &&
                  idx !== q.correctAnswerIndex;
                return (
                  <label
                    key={idx}
                    className={`flex items-center gap-2 p-2 rounded cursor-pointer 
                      ${isCorrect ? "bg-green-200" : ""} 
                      ${isWrong ? "bg-red-200" : ""}`}
                  >
                    <input
                      type="radio"
                      name={`q-${qIdx}`}
                      checked={answers[qIdx] === idx}
                      onChange={() => handleAnswerChange(qIdx, idx)}
                      disabled={submitted}
                    />
                    {opt}
                  </label>
                );
              })}
            </div>
          </div>
        ))}
      </div>

      {!submitted && quiz.questions.length > 0 && (
        <button
          className="mt-6 px-6 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 transition"
          onClick={handleSubmit}
        >
          Nộp bài
        </button>
      )}

      {submitted && (
        <h2 className="text-2xl font-bold mt-6 text-center">
          Kết quả: {score}/{quiz.questions.length}
        </h2>
      )}
    </div>
  );
};

export default QuizPage;
