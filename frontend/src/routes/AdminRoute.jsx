import { Navigate } from "react-router-dom";

export const AdminRoute = ({ children }) => {

  const user = JSON.parse(
    localStorage.getItem("user") || "null"
  );

  if (!user) {
    return <Navigate to="/auth" />;
  }

  if (user.role !== "admin") {
    return <Navigate to="/" />;
  }

  return children;
};

