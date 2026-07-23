import { useState } from "react";
import Swal from "sweetalert2";

import { updateOrderStatus } from "../../../api/orders";

const STATUS_OPTIONS = [
  "Pending",
  "Confirmed",
  "Processing",
  "Shipped",
  "Delivered",
  "Cancelled",
];

export const EditOrderStatusModal = ({ order, onClose, onUpdated }) => {
  const [status, setStatus] = useState(order?.orderStatus || "Pending");
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState("");

  async function handleSubmit(e) {
    e.preventDefault();
    if (saving) return;

    const id = order?._id || order?.id;
    if (!id) {
      setError("Missing order id.");
      return;
    }

    try {
      setSaving(true);
      setError("");

      const { data } = await updateOrderStatus(id, status);

      if (data?.success === false) {
        setError(data?.message || "Failed to update order status.");
        return;
      }

      onUpdated(data.order || { ...order, orderStatus: status });

      await Swal.fire({
        title: "Updated",
        text: "Order status updated successfully.",
        icon: "success",
        timer: 1400,
        showConfirmButton: false,
      });

      onClose();
    } catch (err) {
      const msg =
        err?.response?.data?.message || err?.message || "Failed to update order status.";
      setError(msg);

      await Swal.fire({
        title: "Update failed",
        text: msg,
        icon: "error",
      });
    } finally {
      setSaving(false);
    }
  }

  if (!order) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      <div className="absolute inset-0 bg-black/30 backdrop-blur-sm" onClick={onClose} />
      <div className="relative bg-white border border-background-200/70 rounded-2xl w-full max-w-md p-6 animate-in">
        <div className="flex items-center justify-between mb-6">
          <div>
            <h2 className="text-lg font-bold text-foreground-950 font-heading">
              Update Order Status
            </h2>
            <p className="text-xs text-foreground-500 mt-1">Order ID: {order._id}</p>
          </div>
          <button
            onClick={onClose}
            type="button"
            className="w-8 h-8 flex items-center justify-center rounded-lg text-foreground-400 hover:bg-background-100 hover:text-foreground-600 transition-colors cursor-pointer"
          >
            <span className="w-4 h-4 flex items-center justify-center">
              <i className="ri-close-line text-lg"></i>
            </span>
          </button>
        </div>

        <form onSubmit={handleSubmit} className="space-y-5">
          <div>
            <label className="block text-sm font-medium text-foreground-700 mb-1.5">
              Order Status
            </label>
            <select
              value={status}
              onChange={(e) => setStatus(e.target.value)}
              className="w-full px-4 py-2.5 bg-background-100 border border-background-200/70 rounded-lg text-sm text-foreground-900 outline-none focus:border-primary-300 transition-colors cursor-pointer"
            >
              {STATUS_OPTIONS.map((s) => (
                <option key={s} value={s}>
                  {s}
                </option>
              ))}
            </select>
          </div>

          {error && <p className="text-xs text-red-600">{error}</p>}

          <div className="flex items-center gap-3 pt-2">
            <button
              type="button"
              onClick={onClose}
              className="flex-1 px-4 py-2.5 border border-background-200/70 rounded-lg text-sm font-medium text-foreground-600 hover:bg-background-100 transition-colors cursor-pointer whitespace-nowrap"
            >
              Cancel
            </button>
            <button
              type="submit"
              disabled={saving}
              className="flex-1 px-4 py-2.5 bg-primary-500 text-background-50 rounded-lg text-sm font-medium hover:bg-primary-600 transition-colors cursor-pointer whitespace-nowrap disabled:opacity-60"
            >
              {saving ? "Saving…" : "Update Status"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};