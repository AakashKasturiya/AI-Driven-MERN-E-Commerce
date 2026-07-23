import { clearAuth } from "../services/authStorage";
import { useNavigate } from "react-router-dom";

export const useAuth = () => {
  const navigate = useNavigate();

  const logout = () => {
    clearAuth();
    navigate("/auth");
  };

  return { clearAuth, logout };
};
