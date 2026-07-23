import { http } from "./http";

export const placeOrder = (orderData) => {
    return http.post("/api/orders", orderData);
};

export const getMyOrders = () => {
    return http.get("/api/orders/my");
};

export const getAllOrders = () => {
    return http.get("/api/orders/all");
};

export const updateOrderStatus = (orderId, orderStatus) => {
    return http.put("/api/orders/status", { orderId, orderStatus });
};
