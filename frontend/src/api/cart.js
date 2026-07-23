import { http } from "./http";

export const getCart = () => {
  return http.get("/api/cart");
};

export const addToCart = (productId, quantity = 1) => {
  return http.post("/api/cart", {
    productId,
    quantity,
  });
};

export const updateCart = (cartId, quantity) => {
  return http.put(`/api/cart/${cartId}`, {
    quantity,
  });
};

export const removeFromCart = (cartId) => {
  return http.delete(`/api/cart/${cartId}`);
};