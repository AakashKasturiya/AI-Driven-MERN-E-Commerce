import {Link } from "react-router-dom"
import { useState, useEffect } from "react";
import { getAllOrders } from "../../../api/orders";

const formatCurrency = (value) => {
  if (value == null || Number.isNaN(Number(value))) return "-";
  return new Intl.NumberFormat(undefined, {
    style: "currency",
    currency: "USD",
    minimumFractionDigits: 2,
  }).format(value);
};

const getCustomerName = (order) => {
  if (order.user?.name) return order.user.name;
  const first = order.shippingAddress?.firstName || "";
  const last = order.shippingAddress?.lastName || "";
  return `${first} ${last}`.trim() || "Guest";
};

const getStatusBadge = (status) => {
  const normalized = (status || "").toLowerCase();
  if (normalized === "delivered")
    return { label: "delivered", classes: "bg-emerald-100 text-emerald-700" };
  if (normalized === "shipped")
    return { label: "shipped", classes: "bg-purple-100 text-purple-700" };
  if (normalized === "processing")
    return { label: "processing", classes: "bg-blue-100 text-blue-700" };
  if (normalized === "cancelled")
    return { label: "cancelled", classes: "bg-red-100 text-red-700" };
  return { label: status || "pending", classes: "bg-yellow-100 text-yellow-700" };
};

export const RecentOrders = () => {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchRecentOrders = async () => {
      try {
        setLoading(true);
        setError(null);
        const res = await getAllOrders();
        const list = res.data.orders || [];

        // Sort newest first, take top 5
        const sorted = [...list].sort(
          (a, b) => new Date(b.createdAt) - new Date(a.createdAt)
        );
        setOrders(sorted.slice(0, 5));
      } catch (err) {
        setError(
          err?.response?.data?.message ||
            err.message ||
            "Failed to fetch recent orders",
        );
      } finally {
        setLoading(false);
      }
    };

    fetchRecentOrders();
  }, []);

  return (
    <div className="bg-card rounded-xl border border-border p-6">
       <div className="flex justify-between w-full "> 
            <h3 className="font-semibold text-foreground mb-4">Recent Orders</h3>
            <Link to="/admin/orders"
              className="w-8 h-8 flex items-center justify-center rounded-lg text-foreground-400 hover:text-primary-500 hover:bg-primary-50 transition-all duration-200 cursor-pointer"
              title="Order Page"
            >
              <span className="w-4 h-4 flex items-center justify-center">
                <i className="ri-arrow-right-line"></i>
              </span>
            </Link>
            </div>
      <div className="space-y-3">
        {loading && (
          <p className="text-sm text-muted-foreground py-2">Loading...</p>
        )}

        {error && !loading && (
          <p className="text-sm text-red-600 py-2">{error}</p>
        )}

        {!loading && !error && orders.length === 0 && (
          <p className="text-sm text-muted-foreground py-2">
            No recent orders.
          </p>
        )}

        {!loading &&
          !error &&
          orders.map((order) => {
            const badge = getStatusBadge(order.orderStatus);
            return (
              <div
                key={order._id}
                className="flex items-center justify-between py-2 border-b border-border last:border-0"
              >
                <div>
                  <p className="text-sm font-medium text-foreground">
                    {getCustomerName(order)}
                  </p>
                  <p className="text-xs text-muted-foreground">
                    {order.items?.length ?? 0} items
                  </p>
                </div>
                <div className="flex items-center gap-3">
                  <span className="text-sm font-semibold">
                    {formatCurrency(order.total)}
                  </span>
                  <div
                    className={`inline-flex items-center rounded-md border px-2.5 py-0.5 text-xs font-semibold transition-colors focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 border-transparent hover:bg-secondary/80 ${badge.classes}`}
                  >
                    {badge.label}
                  </div>
                </div>
              </div>
            );
          })}
      </div>
    </div>
  );
};