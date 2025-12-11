import { Navigate } from "react-router";

import type { JSX } from "react";

type Props = { children: JSX.Element };

export default function ProtectedRoute({ children }: Props) {
  const token = localStorage.getItem("token");

  if (!token) return <Navigate to="/" />;

  return children;
}
