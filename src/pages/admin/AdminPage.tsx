import { useEffect } from "react";
import type { AppDispatch, RootState } from "../../store/store";
import { useDispatch, useSelector } from "react-redux";
import { fetchAllQuizzes } from "../../store/slices/quizSlice";
import Loading from "../../components/ui/loading/Loading";
import QuizItem from "../article/patials/QuizItem";

const AdminPage = () => {
  const dispatch = useDispatch<AppDispatch>();
  const { quizzes, loading, error } = useSelector(
    (state: RootState) => state.quiz
  );

  useEffect(() => {
    dispatch(fetchAllQuizzes());
  }, [dispatch]);

  if (loading)
    return (
      <div className="w-full flex justify-center py-10">
        <Loading />
      </div>
    );

  if (error) return <p className="text-red-500 text-center py-5">{error}</p>;

  return (
    <>
      <h2 className="text-xl font-semibold mb-4 text-center">List Quizzes</h2>
      <section className="grid grid-cols-1 md:grid-cols-3  lg:grid-cols-3 gap-4 container ">
        {quizzes.length > 0 ? (
          quizzes.map((quiz) => <QuizItem key={quiz._id} data={quiz} />)
        ) : (
          <p className="text-gray-500 col-span-full text-center">
            No quiz is created
          </p>
        )}
      </section>
    </>
  );
};

export default AdminPage;
