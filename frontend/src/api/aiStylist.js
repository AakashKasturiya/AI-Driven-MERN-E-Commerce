import { http } from "./http";

export const askAiStylist = (message, history = []) => {
  return http.post("/api/ai/stylist", { message, history });
};

export const searchDummyProducts = (query, params = {}) => {
  return http.get("/api/ai/stylist/search", { params: { q: query, ...params } });
};

export const getDummyProducts = (params = {}) => {
  return http.get("/api/ai/stylist/products", { params });
};