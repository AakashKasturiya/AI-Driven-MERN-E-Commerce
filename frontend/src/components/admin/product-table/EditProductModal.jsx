import { useMemo, useState } from "react";
import Swal from "sweetalert2";

import { updateProduct as updateProductApi } from "../../../api/products";

export const EditProductModal = ({ product, onClose, onUpdated, CATEGORY_META }) => {
  const initial = useMemo(() => {
    const images = Array.isArray(product?.images) ? product.images : [];
    return {
      title: product?.title || "",
      description: product?.description || "",
      shortDescription: product?.shortDescription || "",
      category: product?.category || "women-dresses",
      subCategory: product?.subCategory || "",
      brand: product?.brand || "",
      sku: product?.sku || "",
      price: product?.price ?? 0,
      discountPrice: product?.discountPrice ?? 0,
      discountPercentage: product?.discountPercentage ?? 0,
      stock: product?.stock ?? 0,
      thumbnail: product?.thumbnail || images[0] || "",
      imagesText: images.join(", "),
    };
  }, [product]);

  const [form, setForm] = useState(initial);
  const [error, setError] = useState("");
  const [saving, setSaving] = useState(false);

  async function handleSubmit(e) {
    e.preventDefault();
    if (saving) return;

    const id = product?._id || product?.id;
    if (!id || typeof id !== "string") {
      setError("Missing product id.");
      return;
    }

    if (!form.title || !form.sku || !form.description) {
      setError("Title, SKU, and Description are required.");
      return;
    }

    const images = String(form.imagesText || "")
      .split(",")
      .map((s) => s.trim())
      .filter(Boolean);

    const payload = {
      title: form.title,
      description: form.description,
      shortDescription: form.shortDescription || "",
      category: form.category,
      subCategory: form.subCategory || "",
      brand: form.brand || "—",
      sku: form.sku,
      price: Number(form.price) || 0,
      discountPrice: Number(form.discountPrice) || 0,
      discountPercentage: Number(form.discountPercentage) || 0,
      stock: Number(form.stock) || 0,
      thumbnail: form.thumbnail || images[0] || "",
      images,
    };

    try {
      setSaving(true);
      setError("");

      const { data } = await updateProductApi(id, payload);

      if (!data?.success) {
        setError(data?.message || "Failed to update product.");
        return;
      }

      onUpdated(data.product);

      await Swal.fire({
        title: "Updated",
        text: "Product updated successfully.",
        icon: "success",
        timer: 1400,
        showConfirmButton: false,
      });

      onClose();
    } catch (err) {
      const msg = err?.response?.data?.message || err?.message || "Failed to update product.";
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

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      <div className="absolute inset-0 bg-black/30 backdrop-blur-sm" onClick={onClose} />
      <div className="relative bg-white border border-background-200/70 rounded-2xl w-full max-w-lg p-6 animate-in max-h-[90vh] overflow-y-auto">
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-lg font-bold text-foreground-950 font-heading">Edit Product</h2>
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
          <div className="flex items-center gap-4 pb-5 border-b border-background-200/70">
            <div className="w-16 h-16 rounded-xl bg-background-100 flex items-center justify-center border border-background-200/70 overflow-hidden flex-shrink-0">
              {form.thumbnail ? (
                <img src={form.thumbnail} alt={form.title} className="w-full h-full object-cover" />
              ) : (
                <span className="text-lg font-bold text-primary-600">?</span>
              )}
            </div>
            <div className="flex-1 min-w-0">
              <p className="text-sm font-medium text-foreground-900">Product Image</p>
              <p className="text-xs text-foreground-400 mt-0.5 truncate">
                {product?.sku || "No SKU"}
              </p>
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-foreground-700 mb-1.5">
              Product Name *
            </label>
            <input
              required
              value={form.title}
              onChange={(e) => setForm({ ...form, title: e.target.value })}
              placeholder="Enter product name"
              type="text"
              className="w-full px-4 py-2.5 bg-background-100 border border-background-200/70 rounded-lg text-sm text-foreground-900 outline-none focus:border-primary-300 transition-colors"
            />
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-foreground-700 mb-1.5">
                Category
              </label>
              <select
                value={form.category}
                onChange={(e) => setForm({ ...form, category: e.target.value })}
                className="w-full px-4 py-2.5 bg-background-100 border border-background-200/70 rounded-lg text-sm text-foreground-900 outline-none focus:border-primary-300 transition-colors cursor-pointer"
              >
                {Object.entries(CATEGORY_META).map(([k, v]) => (
                  <option key={k} value={k}>
                    {v.label}
                  </option>
                ))}
              </select>
            </div>
            <div>
              <label className="block text-sm font-medium text-foreground-700 mb-1.5">
                Sub Category
              </label>
              <input
                value={form.subCategory}
                onChange={(e) => setForm({ ...form, subCategory: e.target.value })}
                placeholder="Optional"
                type="text"
                className="w-full px-4 py-2.5 bg-background-100 border border-background-200/70 rounded-lg text-sm text-foreground-900 outline-none focus:border-primary-300 transition-colors"
              />
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-foreground-700 mb-1.5">
                Price ($) *
              </label>
              <input
                type="number"
                step="0.01"
                min="0"
                value={form.price}
                onChange={(e) => setForm({ ...form, price: e.target.value })}
                placeholder="0.00"
                className="w-full px-4 py-2.5 bg-background-100 border border-background-200/70 rounded-lg text-sm text-foreground-900 outline-none focus:border-primary-300 transition-colors"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-foreground-700 mb-1.5">
                Stock *
              </label>
              <input
                type="number"
                min="0"
                value={form.stock}
                onChange={(e) => setForm({ ...form, stock: e.target.value })}
                placeholder="0"
                className="w-full px-4 py-2.5 bg-background-100 border border-background-200/70 rounded-lg text-sm text-foreground-900 outline-none focus:border-primary-300 transition-colors"
              />
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-foreground-700 mb-1.5">
                Discount Price
              </label>
              <input
                type="number"
                step="0.01"
                min="0"
                value={form.discountPrice}
                onChange={(e) => setForm({ ...form, discountPrice: e.target.value })}
                placeholder="0.00"
                className="w-full px-4 py-2.5 bg-background-100 border border-background-200/70 rounded-lg text-sm text-foreground-900 outline-none focus:border-primary-300 transition-colors"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-foreground-700 mb-1.5">
                Discount %
              </label>
              <input
                type="number"
                step="0.01"
                min="0"
                value={form.discountPercentage}
                onChange={(e) => setForm({ ...form, discountPercentage: e.target.value })}
                placeholder="0"
                className="w-full px-4 py-2.5 bg-background-100 border border-background-200/70 rounded-lg text-sm text-foreground-900 outline-none focus:border-primary-300 transition-colors"
              />
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-foreground-700 mb-1.5">Brand</label>
            <input
              value={form.brand}
              onChange={(e) => setForm({ ...form, brand: e.target.value })}
              placeholder="Brand name"
              type="text"
              className="w-full px-4 py-2.5 bg-background-100 border border-background-200/70 rounded-lg text-sm text-foreground-900 outline-none focus:border-primary-300 transition-colors"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-foreground-700 mb-1.5">SKU *</label>
            <input
              required
              value={form.sku}
              onChange={(e) => setForm({ ...form, sku: e.target.value })}
              placeholder="SKU"
              type="text"
              className="w-full px-4 py-2.5 bg-background-100 border border-background-200/70 rounded-lg text-sm text-foreground-900 outline-none focus:border-primary-300 transition-colors font-mono"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-foreground-700 mb-1.5">
              Description *
            </label>
            <textarea
              required
              value={form.description}
              onChange={(e) => setForm({ ...form, description: e.target.value })}
              placeholder="Full product description"
              rows={3}
              className="w-full px-4 py-2.5 bg-background-100 border border-background-200/70 rounded-lg text-sm text-foreground-900 outline-none focus:border-primary-300 transition-colors resize-none"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-foreground-700 mb-1.5">
              Short Description
            </label>
            <input
              value={form.shortDescription}
              onChange={(e) => setForm({ ...form, shortDescription: e.target.value })}
              placeholder="One-line summary"
              type="text"
              className="w-full px-4 py-2.5 bg-background-100 border border-background-200/70 rounded-lg text-sm text-foreground-900 outline-none focus:border-primary-300 transition-colors"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-foreground-700 mb-1.5">
              Thumbnail URL
            </label>
            <input
              value={form.thumbnail}
              onChange={(e) => setForm({ ...form, thumbnail: e.target.value })}
              placeholder="https://…"
              type="text"
              className="w-full px-4 py-2.5 bg-background-100 border border-background-200/70 rounded-lg text-sm text-foreground-900 outline-none focus:border-primary-300 transition-colors"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-foreground-700 mb-1.5">
              Images (comma-separated URLs)
            </label>
            <textarea
              value={form.imagesText}
              onChange={(e) => setForm({ ...form, imagesText: e.target.value })}
              rows={3}
              className="w-full px-4 py-2.5 bg-background-100 border border-background-200/70 rounded-lg text-xs text-foreground-900 outline-none focus:border-primary-300 transition-colors resize-none font-mono"
            />
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
              {saving ? "Saving…" : "Save Changes"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};