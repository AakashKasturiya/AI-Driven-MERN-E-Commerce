import { Navigate } from "react-router-dom";

export const ProtectedRoute = ({ children }) => {

  const token = localStorage.getItem("token");
  const user = JSON.parse(localStorage.getItem("user") || "null");

  if (!token || !user) {
    return <Navigate to="/auth" replace />;
  }

  return children;
};

