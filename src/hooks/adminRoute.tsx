import type { JSX } from "react";
import { Navigate } from "react-router";

type Props = { children: JSX.Element };

export const AdminRoute = ({ children }: Props) => {
  const token = localStorage.getItem("token");
  const user = localStorage.getItem("user")
    ? JSON.parse(localStorage.getItem("user")!)
    : null;

  if (!token || !user) return <Navigate to="/" />;

  if (!user.isAdmin) return <Navigate to="/dashboard" />;

  return children;
};
