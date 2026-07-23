import { http } from "../http";

export const getUsers = () => {
  return http.get("/api/users");
};

export const createUser = (userData) => {
  return http.post("/api/users", userData);
};

export const getUserById = (id) => {
  return http.get(`/api/users/${id}`);
};

export const updateUser = (id, userData) => {
  return http.put(`/api/users/${id}`, userData);
};

export const deleteUser = (id) => {
  return http.delete(`/api/users/${id}`);
};