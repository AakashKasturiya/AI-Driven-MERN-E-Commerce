import { http } from "./http";

export const getProducts = (params) => http.get("/api/products", { params });
export const getProductById = (id) => http.get(`/api/products/${id}`);
export const getProductsByCategory = (category) => http.get(`/api/products/category/${category}`);
export const deleteProduct = (id) => http.delete(`/api/products/${id}`);
export const updateProduct = (id, payload) => http.put(`/api/products/${id}`, payload);
