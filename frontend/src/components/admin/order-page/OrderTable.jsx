export const OrderTable = ({
  loading,
  error,
  filteredOrders,
  pagedOrders,
  formatCurrency,
  getPaymentStatusBadge,
  formatDate,
  setSelectedOrder,
  setEditOrder,
  getOrderStatusBadge,
}) => {
  return (
    <div className="overflow-x-auto">
      <table className="w-full min-w-[900px]">
        <thead>
          <tr className="border-b border-background-200/70 bg-background-100/50 text-left">
            <th className="py-3 px-4 text-xs font-semibold text-foreground-400 uppercase tracking-wider">
              Order
            </th>
            <th className="py-3 px-4 text-xs font-semibold text-foreground-400 uppercase tracking-wider">
              Customer
            </th>
            <th className="py-3 px-4 text-xs font-semibold text-foreground-400 uppercase tracking-wider">
              Items
            </th>
            <th className="py-3 px-4 text-xs font-semibold text-foreground-400 uppercase tracking-wider">
              Total
            </th>
            <th className="py-3 px-4 text-xs font-semibold text-foreground-400 uppercase tracking-wider">
              Payment
            </th>
            <th className="py-3 px-4 text-xs font-semibold text-foreground-400 uppercase tracking-wider">
              Status
            </th>
            <th className="py-3 px-4 text-xs font-semibold text-foreground-400 uppercase tracking-wider">
              Placed
            </th>
            <th className="py-3 px-4 text-xs font-semibold text-foreground-400 uppercase tracking-wider text-right">
              Actions
            </th>
          </tr>
        </thead>
        <tbody>
          {loading && (
            <tr>
              <td colSpan="8" className="py-8 text-center text-sm text-foreground-500">
                Loading orders...
              </td>
            </tr>
          )}

          {error && !loading && (
            <tr>
              <td colSpan="8" className="py-8 text-center text-sm text-red-600">
                {error}
              </td>
            </tr>
          )}

          {!loading && !error && filteredOrders.length === 0 && (
            <tr>
              <td colSpan="8" className="py-8 text-center text-sm text-foreground-500">
                No orders found.
              </td>
            </tr>
          )}

          {!loading &&
            !error &&
            pagedOrders.map((order) => (
              <tr
                key={order._id}
                className="border-b border-background-100 hover:bg-background-100/50 transition-colors"
              >
                <td className="py-4 px-4 max-w-[180px]">
                  <div className="text-sm font-medium text-foreground-900 truncate">
                    {order._id}
                  </div>
                  <div className="text-xs text-foreground-500 truncate">
                    {order.paymentMethod || "COD"}
                  </div>
                </td>
                <td className="py-4 px-4">
                  <div className="text-sm font-medium text-foreground-900 truncate">
                    {order.user?.name || "Guest"}
                  </div>
                  <div className="text-xs text-foreground-500 truncate">
                    {order.user?.email || "-"}
                  </div>
                </td>
                <td className="py-4 px-4 text-sm text-foreground-900">
                  {order.items?.length ?? 0}
                </td>
                <td className="py-4 px-4 text-sm font-medium text-foreground-900">
                  {formatCurrency(order.total)}
                </td>
                <td className="py-4 px-4">
                  <span
                    className={`inline-flex px-2.5 py-1 rounded-full text-xs font-semibold ${getPaymentStatusBadge(order.paymentStatus).classes}`}
                  >
                    {getPaymentStatusBadge(order.paymentStatus).label}
                  </span>
                </td>
                <td className="py-4 px-4">
                  <span
                    className={`inline-flex px-2.5 py-1 rounded-full text-xs font-semibold ${getOrderStatusBadge(order.orderStatus).classes}`}
                  >
                    {getOrderStatusBadge(order.orderStatus).label}
                  </span>
                </td>
                <td className="py-4 px-4 text-sm text-foreground-500">
                  {formatDate(order.createdAt)}
                </td>
                <td className="py-4 px-4 text-right">
                  <div className="flex items-center justify-end gap-1.5">
                    <button
                      type="button"
                      onClick={() => setSelectedOrder(order)}
                      className="inline-flex items-center justify-center rounded-lg border border-background-200/70 px-3 py-2 text-xs font-semibold text-foreground-700 hover:bg-background-100 transition-colors"
                    >
                      View
                    </button>
                    <button
                      type="button"
                      onClick={() => setEditOrder(order)}
                      className="inline-flex items-center justify-center rounded-lg border border-background-200/70 px-3 py-2 text-xs font-semibold text-foreground-700 hover:bg-background-100 transition-colors"
                    >
                      Edit
                    </button>
                  </div>
                </td>
              </tr>
            ))}
        </tbody>
      </table>
    </div>
  );
};