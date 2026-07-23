export const Pagination = ({ currentPage, totalPages, setCurrentPage, pageSize, totalItems }) => {
  const pageButtons = [];
  for (let i = 1; i <= totalPages; i += 1) {
    pageButtons.push(
      <button
        key={i}
        onClick={() => setCurrentPage(i)}
        className={`w-8 h-8 flex items-center justify-center rounded-lg text-sm font-medium transition-colors ${
          i === currentPage
            ? "bg-primary-500 text-background-50"
            : "border border-background-200/70 text-foreground-600 hover:bg-background-100 hover:text-foreground-900"
        }`}
      >
        {i}
      </button>
    );
  }

  return (
    <div className="flex flex-col sm:flex-row items-center justify-between gap-3 p-4 border-t border-background-200/70">
      <p className="text-sm text-foreground-500">
        Showing {Math.min(totalItems, currentPage * pageSize)} of {totalItems} users
      </p>
      <div className="flex items-center gap-1">
        <button
          onClick={() => setCurrentPage(Math.max(1, currentPage - 1))}
          className="w-8 h-8 flex items-center justify-center rounded-lg border border-background-200/70 text-foreground-400 hover:text-foreground-600 hover:bg-background-100 transition-colors cursor-pointer disabled:opacity-40 disabled:cursor-not-allowed"
          disabled={currentPage === 1}
        >
          <span className="w-4 h-4 flex items-center justify-center">
            <i className="ri-arrow-left-s-line"></i>
          </span>
        </button>

        {pageButtons}

        <button
          onClick={() => setCurrentPage(Math.min(totalPages, currentPage + 1))}
          className="w-8 h-8 flex items-center justify-center rounded-lg border border-background-200/70 text-foreground-400 hover:text-foreground-600 hover:bg-background-100 transition-colors cursor-pointer disabled:opacity-40 disabled:cursor-not-allowed"
          disabled={currentPage === totalPages}
        >
          <span className="w-4 h-4 flex items-center justify-center">
            <i className="ri-arrow-right-s-line"></i>
          </span>
        </button>
      </div>
    </div>
  );
};