export const OrderPreview = ({ order, onClose,formatDate, formatCurrency, formatAddress, getCustomerName,getOrderStatusBadge, getPaymentStatusBadge }) => (
  <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
    <div className="absolute inset-0 bg-black/30 backdrop-blur-sm" onClick={onClose} />
    <div className="relative bg-white border border-background-200/70 rounded-3xl w-full max-w-3xl p-6 overflow-y-auto max-h-[90vh] shadow-2xl">
      <div className="flex items-start justify-between gap-4 mb-6">
        <div>
          <h2 className="text-2xl font-bold text-foreground-950">Order Details</h2>
          <p className="text-sm text-foreground-500 mt-1">Order ID: {order._id}</p>
        </div>
        <button
          type="button"
          onClick={onClose}
          className="w-10 h-10 rounded-2xl border border-background-200/70 text-foreground-400 hover:text-foreground-700 hover:bg-background-100 transition-colors"
        >
          <i className="ri-close-line text-xl"></i>
        </button>
      </div>

      <div className="grid gap-6 lg:grid-cols-2 mb-6">
        <div className="space-y-3 p-4 rounded-3xl bg-background-100 border border-background-200/70">
          <h3 className="text-sm font-semibold uppercase tracking-[0.2em] text-foreground-500">Customer</h3>
          <div>
            <p className="text-base font-semibold text-foreground-900">{getCustomerName(order)}</p>
            <p className="text-sm text-foreground-500">{order.user?.email || order.shippingAddress?.email || "-"}</p>
          </div>
          <div className="pt-3 border-t border-background-200/70">
            <p className="text-sm text-foreground-500">Shipping Address</p>
            <p className="text-sm font-medium text-foreground-900">{formatAddress(order.shippingAddress)}</p>
            <p className="text-sm text-foreground-500">{order.shippingAddress?.phone || "-"}</p>
          </div>
        </div>

        <div className="space-y-3 p-4 rounded-3xl bg-background-100 border border-background-200/70">
          <h3 className="text-sm font-semibold uppercase tracking-[0.2em] text-foreground-500">Order Summary</h3>
          <div className="flex items-center justify-between text-sm text-foreground-500">
            <span>Payment</span>
            <span>{order.paymentMethod || "COD"}</span>
          </div>
          <div className="flex items-center justify-between text-sm text-foreground-500">
            <span>Payment Status</span>
            <span className={`inline-flex px-2.5 py-1 rounded-full text-xs font-semibold ${getPaymentStatusBadge(order.paymentStatus).classes}`}>
              {getPaymentStatusBadge(order.paymentStatus).label}
            </span>
          </div>
          <div className="flex items-center justify-between text-sm text-foreground-500">
            <span>Order Status</span>
            <span className={`inline-flex px-2.5 py-1 rounded-full text-xs font-semibold ${getOrderStatusBadge(order.orderStatus).classes}`}>
              {getOrderStatusBadge(order.orderStatus).label}
            </span>
          </div>
          <div className="flex items-center justify-between text-sm text-foreground-500">
            <span>Placed</span>
            <span>{formatDate(order.createdAt)}</span>
          </div>
        </div>
      </div>

      <div className="space-y-6">
        <div className="rounded-3xl border border-background-200/70 overflow-hidden">
          <div className="bg-background-100 px-4 py-3 text-xs font-semibold uppercase tracking-[0.2em] text-foreground-500">
            Items
          </div>
          <div className="divide-y divide-background-200/70">
            {order.items?.map((item) => (
              <div key={item._id || `${item.product?._id}-${item.quantity}`} className="flex flex-col gap-2 p-4 sm:flex-row sm:items-center sm:justify-between">
                <div className="min-w-0">
                  <p className="text-sm font-medium text-foreground-900 truncate">
                    {item.product?.title || item.product?.name || (typeof item.product === "string" ? item.product : "Item")}
                  </p>
                  <p className="text-xs text-foreground-500">Qty: {item.quantity} · {formatCurrency(item.price)} each</p>
                </div>
                <p className="text-sm font-semibold text-foreground-900">{formatCurrency(item.price * item.quantity)}</p>
              </div>
            ))}
          </div>
        </div>

        <div className="rounded-3xl border border-background-200/70 overflow-hidden bg-background-100 p-4">
          <div className="grid gap-3 sm:grid-cols-2">
            <div className="flex items-center justify-between text-sm text-foreground-500">
              <span>Subtotal</span>
              <span className="font-medium text-foreground-900">{formatCurrency(order.subtotal)}</span>
            </div>
            <div className="flex items-center justify-between text-sm text-foreground-500">
              <span>Shipping</span>
              <span className="font-medium text-foreground-900">{formatCurrency(order.shippingCharge)}</span>
            </div>
            <div className="flex items-center justify-between text-sm text-foreground-500">
              <span>Tax</span>
              <span className="font-medium text-foreground-900">{formatCurrency(order.tax)}</span>
            </div>
            <div className="flex items-center justify-between text-sm text-foreground-900 font-semibold">
              <span>Total</span>
              <span>{formatCurrency(order.total)}</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
);