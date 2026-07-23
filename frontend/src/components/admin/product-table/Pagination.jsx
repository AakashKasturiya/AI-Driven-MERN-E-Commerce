export const Pagination = ({ filtered, page, PAGE_SIZE, setPage, totalPages }) => {
  return (
    <div className="flex flex-col sm:flex-row items-center justify-between gap-3 p-4 border-t border-background-200/70">
      <p className="text-sm text-foreground-500">
        Showing{" "}
        <span className="text-foreground-900 font-medium">
          {filtered.length === 0
            ? 0
            : `${(page - 1) * PAGE_SIZE + 1}–${Math.min(page * PAGE_SIZE, filtered.length)}`}
        </span>{" "}
        of {filtered.length} products
      </p>

      <div className="flex items-center gap-1">
        <button
          disabled={page === 1}
          onClick={() => setPage((p) => Math.max(1, p - 1))}
          className="w-8 h-8 flex items-center justify-center rounded-lg border border-background-200/70 text-foreground-400 hover:text-foreground-600 hover:bg-background-100 transition-colors cursor-pointer disabled:opacity-40 disabled:cursor-not-allowed"
        >
          <span className="w-4 h-4 flex items-center justify-center">
            <i className="ri-arrow-left-s-line"></i>
          </span>
        </button>

        {Array.from({ length: totalPages }, (_, i) => i + 1).map((n) => (
          <button
            key={n}
            onClick={() => setPage(n)}
            className={`w-8 h-8 flex items-center justify-center rounded-lg text-sm font-medium transition-colors cursor-pointer ${
              n === page
                ? "bg-primary-500 text-background-50"
                : "border border-background-200/70 text-foreground-600 hover:bg-background-100 hover:text-foreground-900"
            }`}
          >
            {n}
          </button>
        ))}

        <button
          disabled={page === totalPages}
          onClick={() => setPage((p) => Math.min(totalPages, p + 1))}
          className="w-8 h-8 flex items-center justify-center rounded-lg border border-background-200/70 text-foreground-400 hover:text-foreground-600 hover:bg-background-100 transition-colors cursor-pointer disabled:opacity-40 disabled:cursor-not-allowed"
        >
          <span className="w-4 h-4 flex items-center justify-center">
            <i className="ri-arrow-right-s-line"></i>
          </span>
        </button>
      </div>
    </div>
  );
};