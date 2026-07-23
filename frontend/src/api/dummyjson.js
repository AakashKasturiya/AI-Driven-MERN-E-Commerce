import axios from "axios";

const dummyHttp = axios.create({
  baseURL: "https://dummyjson.com",
});

export const searchDummyProducts = (q, params) =>
  dummyHttp.get("/products/search", {
    params: {
      q,
      ...(params || {}),
    },
  });

export const getDummyProducts = (params) =>
  dummyHttp.get("/products", {
    params: params || {},
  });
