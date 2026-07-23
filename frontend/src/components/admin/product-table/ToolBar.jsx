import {
  Plus,
  FileJson,
  FileSpreadsheet,
  Download,
  ClipboardList,
} from "lucide-react";

export const ToolBar = ({
  CATEGORY_META,
  search,
  setSearch,
  setPage,
  category,
  setCategory,
  categories,
  handleExport,
  setShowAddMenu,
  showAddMenu,
  setModal,
}) => {
  return (
    <div className="p-4 border-b border-background-200/70 flex flex-col sm:flex-row gap-3">
      <div className="flex flex-1 flex-col gap-3 sm:flex-row sm:items-center">
        <div className="relative flex-1 sm:max-w-xs">
          <span className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 flex items-center justify-center text-foreground-400">
            <i className="ri-search-line text-sm"></i>
          </span>
          <input
            value={search}
            onChange={(e) => {
              setSearch(e.target.value);
              setPage(1);
            }}
            placeholder="Search by name, SKU, category, or ID..."
            className="w-full pl-10 pr-4 py-2.5 bg-background-100 border border-background-200/70 rounded-lg text-sm text-foreground-900 outline-none focus:border-primary-300 transition-colors"
            type="text"
          />
        </div>

        <div className="flex items-center gap-2">
          <select
            value={category}
            onChange={(e) => {
              setCategory(e.target.value);
              setPage(1);
            }}
            className="px-4 py-2.5 bg-background-100 border border-background-200/70 rounded-lg text-sm text-foreground-700 outline-none focus:border-primary-300 transition-colors cursor-pointer"
          >
            <option value="all">All Categories</option>
            {categories.map((c) => (
              <option key={c} value={c}>
                {CATEGORY_META[c]?.label || c}
              </option>
            ))}
          </select>
        </div>
      </div>

      <div className="flex items-center gap-2">
        <button
          type="button"
          onClick={handleExport}
          className="inline-flex items-center gap-1.5 rounded-lg border border-background-200/70 px-4 py-2.5 text-sm font-medium text-foreground-700 hover:bg-background-100 transition-colors cursor-pointer"
        >
          <Download size={14} /> Export
        </button>

        <div className="relative">
          <button
            type="button"
            onClick={() => setShowAddMenu((v) => !v)}
            className="inline-flex items-center gap-1.5 rounded-lg bg-primary-500 px-4 py-2.5 text-sm font-medium text-background-50 hover:bg-primary-600 transition-colors cursor-pointer"
          >
            <Plus size={15} /> Add Product
          </button>

          {showAddMenu && (
            <div className="absolute right-0 z-20 mt-2 w-48 overflow-hidden rounded-lg border border-background-200/70 bg-white shadow-lg">
              {[
                { key: "form", label: "New Entry", icon: ClipboardList },
                { key: "json", label: "Import JSON", icon: FileJson },
                { key: "excel", label: "Import Excel", icon: FileSpreadsheet },
              ].map((opt) => (
                <button
                  key={opt.key}
                  type="button"
                  onClick={() => {
                    setModal(opt.key);
                    setShowAddMenu(false);
                  }}
                  className="flex w-full items-center gap-2 px-4 py-2.5 text-left text-sm text-foreground-700 hover:bg-background-100 transition-colors cursor-pointer"
                >
                  <opt.icon size={14} className="text-primary-500" /> {opt.label}
                </button>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};