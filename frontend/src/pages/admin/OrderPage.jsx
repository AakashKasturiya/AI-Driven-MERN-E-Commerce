import { useState, useEffect, useMemo } from "react";
import { getAllOrders } from "../../api/orders";
import { Pagination } from "../../components/admin/user-table/Pagination";
import { OrderPreview } from "../../components/admin/order-page/OrderPreview";
import { OrderTable } from "../../components/admin/order-page/OrderTable";
import { OrderToolbar } from "../../components/admin/order-page/OrderToolbar";
import { EditOrderStatusModal } from "../../components/admin/order-page/EditOrderStatusModal";

const formatDate = (isoString) => {
  if (!isoString) return "-";
  const date = new Date(isoString);
  if (Number.isNaN(date.getTime())) return "-";
  return date.toLocaleDateString(undefined, {
    year: "numeric",
    month: "short",
    day: "numeric",
  });
};

const formatCurrency = (value) => {
  if (value == null || Number.isNaN(Number(value))) return "-";
  return new Intl.NumberFormat(undefined, {
    style: "currency",
    currency: "USD",
    minimumFractionDigits: 2,
  }).format(value);
};

const getOrderStatusBadge = (status) => {
  const normalized = (status || "").toLowerCase();
  if (normalized === "delivered")
    return { label: "Delivered", classes: "bg-emerald-100 text-emerald-700" };
  if (normalized === "shipped")
    return { label: "Shipped", classes: "bg-sky-100 text-sky-700" };
  if (normalized === "cancelled")
    return { label: "Cancelled", classes: "bg-red-100 text-red-700" };
  if (normalized === "processing")
    return { label: "Processing", classes: "bg-amber-100 text-amber-700" };
  if (normalized === "confirmed")
    return { label: "Confirmed", classes: "bg-blue-100 text-blue-700" };
  if (normalized === "pending")
    return { label: "Pending", classes: "bg-yellow-100 text-yellow-700" };
  return {
    label: status || "Processing",
    classes: "bg-amber-100 text-amber-700",
  };
};

const getPaymentStatusBadge = (status) => {
  const normalized = (status || "").toLowerCase();
  if (normalized === "paid")
    return { label: "Paid", classes: "bg-emerald-100 text-emerald-700" };
  if (normalized === "failed")
    return { label: "Failed", classes: "bg-red-100 text-red-700" };
  return { label: status || "Pending", classes: "bg-amber-100 text-amber-700" };
};

const formatAddress = (address) => {
  if (!address) return "-";
  const parts = [
    address.address,
    address.apartment,
    address.city,
    address.state,
    address.zipCode,
  ].filter(Boolean);
  return parts.join(", ");
};

const getCustomerName = (order) => {
  if (!order) return "-";
  if (order.user?.name) return order.user.name;
  const first = order.shippingAddress?.firstName || "";
  const last = order.shippingAddress?.lastName || "";
  return `${first} ${last}`.trim() || "Guest";
};

export const OrdersPage = () => {
  const [orders, setOrders] = useState([]);
  const [selectedOrder, setSelectedOrder] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [search, setSearch] = useState("");
  const [statusFilter, setStatusFilter] = useState("all");
  const [currentPage, setCurrentPage] = useState(1);
  const PAGE_SIZE = 8;

  const [editOrder, setEditOrder] = useState(null);

  useEffect(() => {
    const fetchOrders = async () => {
      try {
        setLoading(true);
        const res = await getAllOrders();
        setOrders(res.data.orders || []);
      } catch (err) {
        setError(
          err?.response?.data?.message ||
            err.message ||
            "Failed to fetch orders",
        );
      } finally {
        setLoading(false);
      }
    };

    fetchOrders();
  }, []);

  const filteredOrders = useMemo(() => {
    return orders
      .filter((order) => {
        if (!search.trim()) return true;
        const query = search.toLowerCase();
        return (
          order._id?.toLowerCase().includes(query) ||
          order.user?.name?.toLowerCase().includes(query) ||
          order.user?.email?.toLowerCase().includes(query) ||
          order.items?.some((item) =>
            item.product?.name?.toLowerCase().includes(query),
          )
        );
      })
      .filter((order) => {
        if (statusFilter === "all") return true;
        return order.orderStatus?.toLowerCase() === statusFilter;
      });
  }, [orders, search, statusFilter]);

  const totalPages = Math.max(1, Math.ceil(filteredOrders.length / PAGE_SIZE));
  const activePage = Math.min(currentPage, totalPages);

  const pagedOrders = useMemo(() => {
    const start = (activePage - 1) * PAGE_SIZE;
    return filteredOrders.slice(start, start + PAGE_SIZE);
  }, [filteredOrders, activePage]);

  console.warn(pagedOrders);

  return (
    <main className="flex-1 overflow-y-auto">
      <div className="space-y-6">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div>
            <h1 className="text-2xl font-bold text-foreground-950 font-heading">
              Orders
            </h1>
            <p className="text-sm text-foreground-500 mt-1">
              Showing {filteredOrders.length} of {orders.length} orders
            </p>
          </div>
        </div>

        <div className="bg-background-50 border border-background-200/70 rounded-xl overflow-hidden">
          <OrderToolbar
            search={search}
            setSearch={setSearch}
            setCurrentPage={setCurrentPage}
            statusFilter={statusFilter}
            setStatusFilter={setStatusFilter}
          />

          <OrderTable
            loading={loading}
            error={error}
            filteredOrders={filteredOrders}
            pagedOrders={pagedOrders}
            formatCurrency={formatCurrency}
            getPaymentStatusBadge={getPaymentStatusBadge}
            formatDate={formatDate}
            setSelectedOrder={setSelectedOrder}
            getOrderStatusBadge={getOrderStatusBadge}
            setEditOrder={setEditOrder}
          />

          <Pagination
            currentPage={activePage}
            totalPages={totalPages}
            setCurrentPage={setCurrentPage}
            pageSize={PAGE_SIZE}
            totalItems={filteredOrders.length}
          />
        </div>
      </div>

      {selectedOrder && (
        <OrderPreview
          order={selectedOrder}
          onClose={() => setSelectedOrder(null)}
          formatDate={formatDate}
          formatCurrency={formatCurrency}
          formatAddress={formatAddress}
          getCustomerName={getCustomerName}
          getOrderStatusBadge={getOrderStatusBadge}
          getPaymentStatusBadge={getPaymentStatusBadge}
        />
      )}

      {editOrder && (
        <EditOrderStatusModal
          order={editOrder}
          onClose={() => setEditOrder(null)}
          onUpdated={(updatedOrder) => {
            setOrders((prev) =>
              prev.map((o) =>
                o._id === updatedOrder._id ? { ...o, ...updatedOrder } : o,
              ),
            );
          }}
        />
      )}
    </main>
  );
};
