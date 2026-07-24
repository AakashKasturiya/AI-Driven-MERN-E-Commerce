// ==========================================
// Product Service - START
// ==========================================

import { http } from "./http"; // use the shared, correctly-configured instance — adjust path to match your folder structure

export const addProduct = (formData) => {
  return http.post("/api/products/add", formData, {
    headers: {
      "Content-Type": "multipart/form-data",
    },
  });
};

// ==========================================
// Product Service - Add | filter
// ==========================================

export const getProducts = async (category = "") => {
  const url = category
    ? `/api/products?category=${category}`
    : "/api/products";

  const { data } = await http.get(url);

  return data;
};