export const OrderToolbar = ({search, setSearch, setCurrentPage, statusFilter, setStatusFilter}) => {
  return (
    <>
      <div className="p-4 border-b border-background-200/70 flex flex-col sm:flex-row gap-3">
        <div className="relative flex-1">
          <span className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 flex items-center justify-center text-foreground-400">
            <i className="ri-search-line text-sm"></i>
          </span>
          <input
            placeholder="Search by order ID, customer, email, or product..."
            className="w-full pl-10 pr-4 py-2.5 bg-background-100 border border-background-200/70 rounded-lg text-sm text-foreground-900 outline-none focus:border-primary-300 transition-colors"
            type="text"
            value={search}
            onChange={(e) => {
              setSearch(e.target.value);
              setCurrentPage(1);
            }}
          />
        </div>

        <div className="flex items-center gap-2">
          <select
            className="px-4 py-2.5 bg-background-100 border border-background-200/70 rounded-lg text-sm text-foreground-700 outline-none focus:border-primary-300 transition-colors cursor-pointer"
            value={statusFilter}
            onChange={(e) => {
              setStatusFilter(e.target.value);
              setCurrentPage(1);
            }}
          >
            <option value="all">All Status</option>
            <option value="processing">Processing</option>
            <option value="shipped">Shipped</option>
            <option value="delivered">Delivered</option>
            <option value="cancelled">Cancelled</option>
          </select>
        </div>
      </div>
    </>
  );
};
