import { useState, useMemo } from "react";
import { ChevronLeft, ChevronRight, AlertTriangle, Check } from "lucide-react";

import Swal from "sweetalert2";

import { useProducts } from "../../hooks/useProducts";
import { deleteProduct as deleteProductApi } from "../../api/products";
import { StatsStrip } from "../../components/admin/product-table/StatsStrip";
import { ToolBar } from "../../components/admin/product-table/ToolBar";
import { Table } from "../../components/admin/product-table/Table";
import { Pagination } from "../../components/admin/product-table/Pagination";
import { AddProductModal } from "../../components/admin/product-table/AddProductModal";
import { EditProductModal } from "../../components/admin/product-table/EditProductModal";


const CATEGORY_META = {
  "women-dresses": { label: "Dresses", dot: "#B24C3D" },
  "women-shoes": { label: "Women's Shoes", dot: "#A9823C" },
  "men-shirts": { label: "Men's Shirts", dot: "#4B2E39" },
  "men-shoes": { label: "Men's Shoes", dot: "#6F8F6B" },
  "women-bags": { label: "Bags", dot: "#7A5C3E" },
  "women-jewellery": { label: "Jewellery", dot: "#C9A227" },
  "men-watches": { label: "Watches", dot: "#2E4057" },
};

const PAGE_SIZE = 6;

function Chip({ category }) {
  const meta = CATEGORY_META[category] || { label: category, dot: "#999" };
  return (
    <span className="inline-flex items-center gap-1.5 rounded-full border border-[#E4DDCF] bg-white px-2.5 py-1 text-[11px] tracking-wide text-[#4B4740]">
      <span
        className="h-1.5 w-1.5 rounded-full"
        style={{ backgroundColor: meta.dot }}
      />
      {meta.label}
    </span>
  );
}

function StockBadge({ stock }) {
  let bg = "#EEF3EC",
    fg = "#4C6B49",
    label = `${stock} in stock`;
  if (stock === 0) {
    bg = "#F5E4E1";
    fg = "#93332A";
    label = "Out of stock";
  } else if (stock < 10) {
    bg = "#FBEDE3";
    fg = "#95502E";
    label = `${stock} left — low`;
  }
  return (
    <span
      className="inline-flex items-center gap-1 rounded-md px-2 py-1 text-[11px] font-medium"
      style={{ backgroundColor: bg, color: fg }}
    >
      {stock < 10 && <AlertTriangle size={11} />}
      {label}
    </span>
  );
}

export const AdminProductsPage = () => {
  const { products: remoteProducts = [] } = useProducts();
  const [localProducts, setLocalProducts] = useState(null);
  const [search, setSearch] = useState("");
  const [category, setCategory] = useState("all");
  const [page, setPage] = useState(1);
  const [showAddMenu, setShowAddMenu] = useState(false);
  const [modal, setModal] = useState(null); // 'form' | 'json' | 'excel' | null
  const [editingProduct, setEditingProduct] = useState(null);
  const [toast, setToast] = useState(null);

  const displayedProducts = localProducts ?? remoteProducts;

  const categories = useMemo(
    () => Array.from(new Set(displayedProducts.map((p) => p.category))),
    [displayedProducts],
  );

  const filtered = useMemo(() => {
    return displayedProducts.filter((p) => {
      const matchesSearch =
        !search ||
        p.title.toLowerCase().includes(search.toLowerCase()) ||
        p.brand.toLowerCase().includes(search.toLowerCase()) ||
        p.sku.toLowerCase().includes(search.toLowerCase());
      const matchesCategory = category === "all" || p.category === category;
      return matchesSearch && matchesCategory;
    });
  }, [displayedProducts, search, category]);

  const totalPages = Math.max(1, Math.ceil(filtered.length / PAGE_SIZE));
  const pageItems = filtered.slice((page - 1) * PAGE_SIZE, page * PAGE_SIZE);

  const lowStockCount = displayedProducts.filter((p) => p.stock < 10).length;

  function showToast(msg, kind = "ok") {
    setToast({ msg, kind });
    setTimeout(() => setToast(null), 2600);
  }

  function handleUpdatedProduct(updated) {
    const id = updated?._id;

    setLocalProducts((prev) => {
      const source = prev ?? remoteProducts;
      const next = source.map((x) => (x._id === id ? { ...x, ...updated } : x));
      return next;
    });
  }

  function addProduct(p) {
    setLocalProducts((prev) => [
      { ...p, id: Date.now() },
      ...(prev ?? remoteProducts),
    ]);
    setPage(1);
  }

  async function removeProduct(p) {
    try {
      const result = await Swal.fire({
        title: "Delete product?",
        text: "This action cannot be undone.",
        icon: "warning",
        showCancelButton: true,
        confirmButtonText: "Delete",
        cancelButtonText: "Cancel",
        confirmButtonColor: "#93332A",
      });

      if (!result.isConfirmed) return;

      const backendId = p?._id || p?.id;

      if (typeof backendId === "string") {
        await deleteProductApi(backendId);
      }

      setLocalProducts((prev) => {
        const source = prev ?? remoteProducts;
        return source.filter((x) => (x._id || x.id) !== backendId);
      });

      await Swal.fire({
        title: "Deleted",
        text: "Product deleted successfully.",
        icon: "success",
        timer: 1400,
        showConfirmButton: false,
      });
    } catch (e) {
      const msg =
        e?.response?.data?.message || e?.message || "Failed to delete product";
      await Swal.fire({
        title: "Delete failed",
        text: msg,
        icon: "error",
      });
    }
  }

  function handleExport() {
    const blob = new Blob([JSON.stringify(filtered, null, 2)], {
      type: "application/json",
    });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = "products-export.json";
    a.click();
    URL.revokeObjectURL(url);
    showToast("Exported current view as JSON");
  }

  return (
    <div className="flex-1 overflow-y-auto p-6">
      <main className="space-y-6">
        <div class="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div>
            <h1 class="text-2xl font-bold text-foreground-950 font-heading">
              Products
            </h1>
            <p class="text-sm text-foreground-500 mt-1">15 of 15 products</p>
          </div>
        </div>
        {/* Stats strip */}
        <StatsStrip
          displayedProducts={displayedProducts}
          categories={categories}
          lowStockCount={lowStockCount}
        />

        <div className="bg-background-50 border border-background-200/70 rounded-xl overflow-hidden">
          {/* Toolbar */}
          <ToolBar
            CATEGORY_META={CATEGORY_META}
            search={search}
            setSearch={setSearch}
            setPage={setPage}
            category={category}
            setCategory={setCategory}
            categories={categories}
            handleExport={handleExport}
            setShowAddMenu={setShowAddMenu}
            showAddMenu={showAddMenu}
            setModal={setModal}
          />

          {/* Table */}
          <Table
            pageItems={pageItems}
            removeProduct={removeProduct}
            onEdit={(p) => setEditingProduct(p)}
            Chip={Chip}
            StockBadge={StockBadge}
          />

          {/* Pagination */}
          <Pagination
            filtered={filtered}
            page={page}
            PAGE_SIZE={PAGE_SIZE}
            setPage={setPage}
            ChevronLeft={ChevronLeft}
            totalPages={totalPages}
            ChevronRight={ChevronRight}
          />
        </div>
      </main>

      {/* Add Product Modal */}
      {modal && (
        <AddProductModal
          mode={modal}
          CATEGORY_META={CATEGORY_META}
          onClose={() => setModal(null)}
          onAddOne={(p) => {
            addProduct(p);
            showToast("Product added");
            setModal(null);
          }}
          onAddMany={(list) => {
            setLocalProducts((prev) => [
              ...list.map((p) => ({ ...p, id: Date.now() + Math.random() })),
              ...(prev ?? remoteProducts),
            ]);
            showToast(`Imported ${list.length} products`);
            setModal(null);
          }}
        />
      )}

      {editingProduct && (
        <EditProductModal
          product={editingProduct}
          CATEGORY_META={CATEGORY_META}
          onClose={() => setEditingProduct(null)}
          onUpdated={(p) => {
            handleUpdatedProduct(p);
            setEditingProduct(null);
          }}
        />
      )}

      {/* Toast */}
      {toast && (
        <div className="fixed bottom-6 left-1/2 z-50 -translate-x-1/2 rounded-md bg-[#211E20] px-4 py-2.5 text-sm text-[#F7F3EC] shadow-lg">
          <span className="inline-flex items-center gap-2">
            <Check size={14} className="text-[#A9823C]" /> {toast.msg}
          </span>
        </div>
      )}
    </div>
  );
};
