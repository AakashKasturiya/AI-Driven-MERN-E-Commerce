import { http } from "./http";

export const getCategory = () => http.get("/api/products/category-list");
// export const getProductById = (id) => http.get(`/api/products/${id}`);
// export const getProductsByCategory = (category) => http.get(`/api/products/category/${category}`);

