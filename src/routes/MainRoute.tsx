import { createBrowserRouter, RouterProvider } from "react-router";
import HomePage from "../pages/home/HomePage";
import Login from "../pages/auth/Login";
import AdminPage from "../pages/admin/AdminPage";
import AdminLayout from "../components/layouts/AdminLayout";
import UserPage from "../pages/user/UserPage";
import ArticlePage from "../pages/article/ArticlePage";
import QuestionPage from "../pages/question/QuestionPage";

import { AdminRoute } from "../hooks/adminRoute";
import UserLayout from "../components/layouts/UserLaylout";
import ProtectedRoute from "../hooks/protectRoute";
import ArticalDetail from "../pages/article/ArticalDetail";
import QuizPage from "../pages/home/patials/Question";

const route = createBrowserRouter([
  { path: "/", Component: Login },
  {
    path: "/dashboard",
    element: (
      <ProtectedRoute>
        <UserLayout />
      </ProtectedRoute>
    ),
    children: [
      { path: "", Component: HomePage },
      { path: "quiz", Component: QuizPage },
    ],
  },
  {
    path: "/admin",
    element: (
      <AdminRoute>
        <AdminLayout />
      </AdminRoute>
    ),
    children: [
      { path: "", Component: AdminPage },
      { path: "users", Component: UserPage },
      { path: "articles", Component: ArticlePage },
      { path: "articles/:id", Component: ArticalDetail },
      { path: "questions", Component: QuestionPage },
    ],
  },
]);

export const MainRoute = () => <RouterProvider router={route} />;
