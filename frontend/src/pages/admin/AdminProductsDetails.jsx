import { useParams } from "react-router-dom";
import { useProduct } from "../../hooks/useProduct";

export const AdminProductsDetails = () => {
    const { id } = useParams();
  const { product, loading, error } = useProduct(id);

    return(
    <>
      {loading && (
        <div className="w-full px-4 md:px-6 lg:px-8 py-6 md:py-8 text-center">
          Loading...
        </div>
      )}
      {error && (
        <div className="w-full px-4 md:px-6 lg:px-8 py-6 md:py-8 text-center">
          Error: {error.message}
        </div>
      )}

      {!loading && !error && !product && (
        <div className="w-full px-4 md:px-6 lg:px-8 py-6 md:py-8 text-center">
          Product not found.
        </div>
      )}

      {product && (
      <div className="min-h-screen bg-white">
        <main>
          <div className="min-h-screen bg-gray-50/50">
            <div className="bg-white border-b border-gray-100">
              <div className="w-full px-4 md:px-6 lg:px-8 py-6 md:py-8">
                <div className="flex flex-col sm:flex-row sm:items-start gap-5">
                  <img
                    alt={product?.title || "Product"}
                    className="w-20 h-20 rounded-xl object-cover border border-gray-100 shrink-0" 
                    src={product?.thumbnail || product?.images?.[0]}
                  />
                  <div className="flex-1 min-w-0">
                    <div className="flex flex-wrap items-center gap-2 mb-2">
                      <h1
                        className="text-2xl md:text-3xl font-bold text-gray-900 tracking-tight"
                      >
                        {product?.title}
                      </h1>
                      <span
                        className="inline-flex items-center px-2.5 py-1 rounded-full text-xs font-medium border bg-amber-50 text-amber-700 border-amber-100"
                        >{product?.availabilityStatus || "-"}</span>
                    </div>
                    <p className="text-sm text-gray-500">{product?.category}</p>
                  </div>
                </div>
              </div>
            </div>
            <div className="w-full px-4 md:px-6 lg:px-8 py-6 md:py-8">
              <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 md:gap-8">
                <div className="lg:col-span-2 space-y-6">
                  <div
                    className="bg-white border border-gray-100 rounded-lg p-5 md:p-6"
                  >
                    <h2 className="text-base font-semibold text-gray-900 mb-3">
                      About
                    </h2>
                    <p className="text-sm text-gray-600 leading-relaxed">
                       {product?.description}
                    </p>
                  </div>
                  <div
                    className="bg-white border border-gray-100 rounded-lg p-5 md:p-6"
                  >
                    <h2 className="text-base font-semibold text-gray-900 mb-4">
                      Product Details
                    </h2>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      <div className="flex items-start gap-3">
                        <div
                          className="w-9 h-9 rounded-lg bg-gray-50 flex items-center justify-center shrink-0"
                        >
                          <i className="ri-map-pin-line text-gray-500"></i>
                        </div>
                        <div className="min-w-0">
                          <p
                            className="text-xs text-gray-400 font-medium uppercase tracking-wider"
                          >
                            Brand
                          </p>
                          <p className="text-sm text-gray-900 font-medium truncate">
                            {product?.brand || "-"}
                          </p>
                        </div>
                      </div>
                      <div className="flex items-start gap-3">
                        <div
                          className="w-9 h-9 rounded-lg bg-gray-50 flex items-center justify-center shrink-0"
                        >
                          <i className="ri-global-line text-gray-500"></i>
                        </div>
                        <div className="min-w-0">
                          <p
                            className="text-xs text-gray-400 font-medium uppercase tracking-wider"
                          >
                            SKU
                          </p>
                          <p className="text-sm text-gray-900 font-medium truncate">
                            {product?.sku || "-"}
                          </p>
                        </div>
                      </div>
                      <div className="flex items-start gap-3">
                        <div
                          className="w-9 h-9 rounded-lg bg-gray-50 flex items-center justify-center shrink-0"
                        >
                          <i className="ri-mail-line text-gray-500"></i>
                        </div>
                        <div className="min-w-0">
                          <p className="text-xs text-gray-400 font-medium uppercase tracking-wider">
                            Rating
                          </p>
                          <p className="text-sm text-gray-900 font-medium truncate">
                            {product?.rating ?? "-"}
                          </p>
                        </div>
                      </div>
                      <div className="flex items-start gap-3">
                        <div className="w-9 h-9 rounded-lg bg-gray-50 flex items-center justify-center shrink-0">
                          <i className="ri-money-dollar-circle-line text-gray-500"></i>
                        </div>
                        <div className="min-w-0">
                          <p className="text-xs text-gray-400 font-medium uppercase tracking-wider">
                            Price
                          </p>
                          <p className="text-sm text-gray-900 font-medium truncate">
                            {product?.price != null ? `$${product.price}` : "-"}
                          </p>
                        </div>
                      </div>
                      <div className="flex items-start gap-3">
                        <div className="w-9 h-9 rounded-lg bg-gray-50 flex items-center justify-center shrink-0">
                          <i className="ri-team-line text-gray-500"></i>
                        </div>
                        <div className="min-w-0">
                          <p className="text-xs text-gray-400 font-medium uppercase tracking-wider">
                            Discount
                          </p>
                          <p className="text-sm text-gray-900 font-medium truncate">
                            {product?.discountPercentage != null
                              ? `${product.discountPercentage}%`
                              : "-"}
                          </p>
                        </div>
                      </div>
                      <div className="flex items-start gap-3">
                        <div className="w-9 h-9 rounded-lg bg-gray-50 flex items-center justify-center shrink-0">
                          <i className="ri-box-3-line text-gray-500"></i>
                        </div>
                        <div className="min-w-0">
                          <p className="text-xs text-gray-400 font-medium uppercase tracking-wider">
                            Stock
                          </p>
                          <p className="text-sm text-gray-900 font-medium truncate">
                            {product?.stock ?? "-"}
                          </p>
                        </div>
                      </div>
                      <div className="flex items-start gap-3">
                        <div className="w-9 h-9 rounded-lg bg-gray-50 flex items-center justify-center shrink-0">
                          <i className="ri-coins-line text-gray-500"></i>
                        </div>
                        <div className="min-w-0">
                          <p className="text-xs text-gray-400 font-medium uppercase tracking-wider">
                            Shipping
                          </p>
                          <p className="text-sm text-gray-900 font-medium truncate">
                            {product?.shippingInformation || "-"}
                          </p>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="space-y-6">
                  <div
                    className="bg-white border border-gray-100 rounded-lg p-5 md:p-6"
                  >
                    <h2 className="text-base font-semibold text-gray-900 mb-4">
                      Process Name
                    </h2>
                    <div className="space-y-4">
                      <div className="flex items-center justify-between" data-process-row data-process="Assign Credits" data-status="Success">
                        <span className="text-sm text-gray-500">Assign Credits</span>
                        <div className="flex items-center gap-2">
                          <span data-status-badge className="text-xs px-2.5 py-1 rounded-full font-medium border">Success</span>
                          <button type="button" data-action="logs" className="w-8 h-8 flex items-center justify-center rounded-md hover:bg-gray-100 text-gray-500 hover:text-gray-700 transition-colors cursor-pointer" title="View Logs">
                            <i data-logs-icon className="ri-file-list-3-line"></i>
                          </button>
                          <button type="button" data-action="retry" className="w-8 h-8 flex items-center justify-center rounded-md hover:bg-gray-100 text-gray-500 hover:text-gray-700 transition-colors cursor-pointer" title="Retry">
                            <i data-retry-icon className="ri-refresh-line"></i>
                          </button>
                        </div>
                      </div>
                      <div className="flex items-center justify-between" data-process-row data-process="GMB Sync Last 365 Days" data-status="Failed">
                        <span className="text-sm text-gray-500">GMB Sync Last 365 Days</span>
                        <div className="flex items-center gap-2">
                          <span data-status-badge className="text-xs px-2.5 py-1 rounded-full font-medium border">Failed</span>
                          <button type="button" data-action="logs" className="w-8 h-8 flex items-center justify-center rounded-md hover:bg-gray-100 text-gray-500 hover:text-gray-700 transition-colors cursor-pointer" title="View Logs">
                            <i data-logs-icon className="ri-file-list-3-line"></i>
                          </button>
                          <button type="button" data-action="retry" className="w-8 h-8 flex items-center justify-center rounded-md hover:bg-gray-100 text-gray-500 hover:text-gray-700 transition-colors cursor-pointer" title="Retry">
                            <i data-retry-icon className="ri-refresh-line"></i>
                          </button>
                        </div>
                      </div>
                      <div className="flex items-center justify-between" data-process-row data-process="Create Users" data-status="In Progress">
                        <span className="text-sm text-gray-500">Create Users</span>
                        <div className="flex items-center gap-2">
                          <span data-status-badge className="text-xs px-2.5 py-1 rounded-full font-medium border">In Progress</span>
                          <button type="button" data-action="logs" className="w-8 h-8 flex items-center justify-center rounded-md hover:bg-gray-100 text-gray-500 hover:text-gray-700 transition-colors cursor-pointer" title="View Logs">
                            <i data-logs-icon className="ri-file-list-3-line"></i>
                          </button>
                          <button type="button" data-action="retry" className="w-8 h-8 flex items-center justify-center rounded-md hover:bg-gray-100 text-gray-500 hover:text-gray-700 transition-colors cursor-pointer" title="Retry">
                            <i data-retry-icon className="ri-refresh-line"></i>
                          </button>
                        </div>
                      </div>
                      <div className="flex items-center justify-between" data-process-row data-process="User Migration" data-status="Success">
                        <span className="text-sm text-gray-500">User Migration</span>
                        <div className="flex items-center gap-2">
                          <span data-status-badge className="text-xs px-2.5 py-1 rounded-full font-medium border">Success</span>
                          <button type="button" data-action="logs" className="w-8 h-8 flex items-center justify-center rounded-md hover:bg-gray-100 text-gray-500 hover:text-gray-700 transition-colors cursor-pointer" title="View Logs">
                            <i data-logs-icon className="ri-file-list-3-line"></i>
                          </button>
                          <button type="button" data-action="retry" className="w-8 h-8 flex items-center justify-center rounded-md hover:bg-gray-100 text-gray-500 hover:text-gray-700 transition-colors cursor-pointer" title="Retry">
                            <i data-retry-icon className="ri-refresh-line"></i>
                          </button>
                        </div>
                      </div>

                    </div>
                  </div>
                  <div
                    className="bg-white border border-gray-100 rounded-lg p-5 md:p-6"
                  >
                    <h2 className="text-base font-semibold text-gray-900 mb-4">
                      Actions
                    </h2>
                    <div className="space-y-2">
                      <a
                        className="flex items-center gap-3 px-4 py-3 rounded-lg bg-gray-900 text-white text-sm font-medium hover:bg-gray-800 transition-colors cursor-pointer"
                        href="/admin/products"
                        data-discover="true"
                        ><i className="ri-rocket-line"></i>Start Onboarding</a
                      >
                      <div className="flex items-center gap-3 px-4 py-3 rounded-lg hover:bg-gray-50 text-sm text-gray-700 font-medium transition-colors cursor-pointer">
                        <i className="ri-hashtag"></i>
                        Product ID: {product?.id}
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </main>
      </div>
      )}
        </>
    )
}