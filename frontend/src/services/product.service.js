// ==========================================
// Product Service - START
// ==========================================

import api from "../api/api";

export const addProduct = (formData) => {
  return api.post("/products/add", formData, {
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
    ? `/products?category=${category}`
    : "/products";

  const { data } = await api.get(url);

  return data;
};