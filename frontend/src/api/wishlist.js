import { http } from "./http";

// Get Wishlist
export const getWishlist = () => {
  return http.get("/api/wishlist");
};

// Toggle Wishlist
export const toggleWishlist = (productId) => {
  return http.post("/api/wishlist/toggle", {
    productId,
  });
};

// Wishlist Count
export const getWishlistCount = () => {
  return http.get("/api/wishlist/count");
};