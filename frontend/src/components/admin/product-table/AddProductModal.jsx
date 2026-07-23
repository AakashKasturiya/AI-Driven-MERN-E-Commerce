import { useState, useRef } from "react";
import * as XLSX from "xlsx";
import Swal from "sweetalert2";

import api from "../../../api/api";

export const AddProductModal = ({ mode, onClose, onAddOne, onAddMany, CATEGORY_META }) => {
  const [tab, setTab] = useState(mode);
  const [form, setForm] = useState({
    title: "",
    description: "",
    shortDescription: "",
    brand: "",
    sku: "",
    category: "women-dresses",
    price: "",
    discountPrice: "",
    stock: "",
    rating: "4.5",
    thumbnail: "",
  });
  const [images, setImages] = useState([]);
  const [formError, setFormError] = useState("");
  const [submitting, setSubmitting] = useState(false);
  const [jsonText, setJsonText] = useState("");
  const [jsonError, setJsonError] = useState("");
  const [fileName, setFileName] = useState("");
  const [excelError, setExcelError] = useState("");
  const fileInputRef = useRef(null);

  async function handleFormSubmit(e) {
    e.preventDefault();
    if (submitting) return;

    if (!form.title || !form.sku || !form.description) {
      setFormError("Title, SKU, and Description are required.");
      return;
    }

    if (!images || images.length === 0) {
      setFormError("At least one product image is required.");
      return;
    }

    try {
      setSubmitting(true);
      setFormError("");

      const fd = new FormData();
      fd.append("title", form.title);
      fd.append("description", form.description);
      fd.append("shortDescription", form.shortDescription || "");
      fd.append("brand", form.brand || "—");
      fd.append("sku", form.sku);
      fd.append("category", form.category);
      fd.append("price", String(parseFloat(form.price) || 0));
      fd.append(
        "discountPrice",
        String(parseFloat(form.discountPrice) || parseFloat(form.price) || 0)
      );
      fd.append("stock", String(parseInt(form.stock) || 0));
      fd.append("rating", String(parseFloat(form.rating) || 0));

      for (const file of images) {
        fd.append("images", file);
      }

      const { data } = await api.post("/products/add", fd, {
        headers: { "Content-Type": "multipart/form-data" },
      });

      if (!data?.success) {
        setFormError(data?.message || "Failed to add product.");
        return;
      }

      onAddOne(data.product);

      await Swal.fire({
        title: "Added",
        text: "Product added successfully.",
        icon: "success",
        timer: 1400,
        showConfirmButton: false,
      });
    } catch (err) {
      const msg =
        err?.response?.data?.message ||
        err?.message ||
        "Failed to add product.";
      setFormError(msg);

      await Swal.fire({
        title: "Add failed",
        text: msg,
        icon: "error",
      });
    } finally {
      setSubmitting(false);
    }
  }

  function handleJsonImport() {
    try {
      const parsed = JSON.parse(jsonText);
      const list = Array.isArray(parsed) ? parsed : [parsed];
      const normalized = list.map((p) => ({
        title: p.title || "Untitled",
        description: p.description || "",
        shortDescription: p.shortDescription || "",
        brand: p.brand || "—",
        sku: p.sku || "N/A",
        category: p.category || "women-dresses",
        price: parseFloat(p.price) || 0,
        discountPrice: parseFloat(p.discountPrice ?? p.price) || 0,
        stock: parseInt(p.stock) || 0,
        rating: parseFloat(p.rating) || 0,
        thumbnail:
          p.thumbnail ||
          (Array.isArray(p.images) ? p.images[0] : "") ||
          "https://cdn.dummyjson.com/product-images/womens-dresses/black-women's-gown/thumbnail.webp",
        images: Array.isArray(p.images) ? p.images : [],
      }));
      setJsonError("");
      api
        .post("/products/add-json", normalized)
        .then(({ data }) => {
          if (!data?.success) {
            setJsonError(data?.message || "Failed to import JSON.");
            Swal.fire({
              title: "Import failed",
              text: data?.message || "Failed to import JSON.",
              icon: "error",
            });
            return;
          }

          const created = data?.created || [];
          const skipped = data?.skipped || [];

          if (created.length > 0) onAddMany(created);

          if (skipped.length > 0) {
            const sample = skipped.slice(0, 3).map((s) => s.sku || "(no sku)").join(", ");
            setJsonError(`Imported ${created.length}. Skipped ${skipped.length} (e.g. ${sample}).`);
          }

          Swal.fire({
            title: "Imported",
            text: `Imported ${created.length} product(s).`,
            icon: "success",
            timer: 1400,
            showConfirmButton: false,
          });
        })
        .catch((err) => {
          setJsonError(
            err?.response?.data?.message || err?.message || "Failed to import JSON."
          );

          Swal.fire({
            title: "Import failed",
            text: err?.response?.data?.message || err?.message || "Failed to import JSON.",
            icon: "error",
          });
        });
    } catch {
      setJsonError("Couldn't parse that JSON — check for a trailing comma or missing bracket.");
    }
  }

  function handleExcelFile(e) {
    const file = e.target.files?.[0];
    if (!file) return;
    setFileName(file.name);
    setExcelError("");
    const reader = new FileReader();
    reader.onload = (evt) => {
      try {
        const wb = XLSX.read(evt.target.result, { type: "binary" });
        const sheet = wb.Sheets[wb.SheetNames[0]];
        const rows = XLSX.utils.sheet_to_json(sheet);
        const normalized = rows.map((r) => {
          const imagesRaw = r.images || r.Images || "";
          const images = Array.isArray(imagesRaw)
            ? imagesRaw
            : String(imagesRaw)
                .split(",")
                .map((s) => s.trim())
                .filter(Boolean);

          const thumbnail =
            r.thumbnail ||
            r.Thumbnail ||
            images[0] ||
            "https://cdn.dummyjson.com/product-images/womens-dresses/black-women's-gown/thumbnail.webp";

          return {
            title: r.title || r.Title || "Untitled",
            description: r.description || r.Description || "",
            shortDescription: r.shortDescription || r.ShortDescription || "",
            brand: r.brand || r.Brand || "—",
            sku: r.sku || r.SKU || "",
            category: r.category || r.Category || "women-dresses",
            subCategory: r.subCategory || r.SubCategory || "",
            price: parseFloat(r.price || r.Price) || 0,
            discountPrice: parseFloat(r.discountPrice || r.DiscountPrice || r.price) || 0,
            discountPercentage: parseFloat(r.discountPercentage || r.DiscountPercentage) || 0,
            stock: parseInt(r.stock || r.Stock) || 0,
            thumbnail,
            images,
          };
        });
        if (normalized.length === 0) throw new Error("empty");

        api
          .post("/products/add-json", normalized)
          .then(({ data }) => {
            if (!data?.success) {
              setExcelError(data?.message || "Failed to import Excel.");
              Swal.fire({
                title: "Import failed",
                text: data?.message || "Failed to import Excel.",
                icon: "error",
              });
              return;
            }

            const created = data?.created || [];
            const skipped = data?.skipped || [];

            if (created.length > 0) onAddMany(created);

            if (skipped.length > 0) {
              const sample = skipped.slice(0, 3).map((s) => s.sku || "(no sku)").join(", ");
              setExcelError(`Imported ${created.length}. Skipped ${skipped.length} (e.g. ${sample}).`);
            }

            Swal.fire({
              title: "Imported",
              text: `Imported ${created.length} product(s).`,
              icon: "success",
              timer: 1400,
              showConfirmButton: false,
            });
          })
          .catch((err) => {
            setExcelError(
              err?.response?.data?.message || err?.message || "Failed to import Excel."
            );

            Swal.fire({
              title: "Import failed",
              text: err?.response?.data?.message || err?.message || "Failed to import Excel.",
              icon: "error",
            });
          });
      } catch {
        setExcelError("Couldn't read that file. Make sure it's a .xlsx or .csv with a header row.");
      }
    };
    reader.readAsBinaryString(file);
  }

  const tabs = [
    { key: "form", label: "New Entry", icon: "ri-clipboard-line" },
    { key: "json", label: "Paste JSON", icon: "ri-braces-line" },
    { key: "excel", label: "Upload Excel", icon: "ri-file-excel-2-line" },
  ];

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      <div className="absolute inset-0 bg-black/30 backdrop-blur-sm" onClick={onClose} />
      <div className="relative bg-white border border-background-200/70 rounded-2xl w-full max-w-lg max-h-[90vh] overflow-y-auto animate-in">
        <div className="flex items-center justify-between px-6 pt-6 pb-4">
          <h2 className="text-lg font-bold text-foreground-950 font-heading">Add Product</h2>
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

        <div className="flex gap-1 border-b border-background-200/70 px-6">
          {tabs.map((t) => (
            <button
              key={t.key}
              type="button"
              onClick={() => setTab(t.key)}
              className={`flex items-center gap-1.5 rounded-t-lg px-3 py-2.5 text-sm font-medium transition-colors cursor-pointer ${
                tab === t.key
                  ? "border-b-2 border-primary-500 text-primary-600"
                  : "text-foreground-400 hover:text-foreground-600"
              }`}
            >
              <i className={`${t.icon} text-sm`}></i> {t.label}
            </button>
          ))}
        </div>

        <div className="p-6">
          {tab === "form" && (
            <form onSubmit={handleFormSubmit} className="space-y-5">
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
                    Brand
                  </label>
                  <input
                    value={form.brand}
                    onChange={(e) => setForm({ ...form, brand: e.target.value })}
                    placeholder="Brand name"
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
                    Rating
                  </label>
                  <input
                    type="number"
                    step="0.01"
                    min="0"
                    max="5"
                    value={form.rating}
                    onChange={(e) => setForm({ ...form, rating: e.target.value })}
                    placeholder="4.5"
                    className="w-full px-4 py-2.5 bg-background-100 border border-background-200/70 rounded-lg text-sm text-foreground-900 outline-none focus:border-primary-300 transition-colors"
                  />
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-foreground-700 mb-1.5">
                  SKU *
                </label>
                <input
                  required
                  value={form.sku}
                  onChange={(e) => setForm({ ...form, sku: e.target.value })}
                  placeholder="Product SKU"
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
                  placeholder="Brief product description"
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
                  Images *
                </label>
                <label className="flex w-full flex-col items-center gap-2 rounded-lg border-2 border-dashed border-background-200/70 bg-background-100 py-6 text-center hover:border-primary-300 transition-colors cursor-pointer">
                  <i className="ri-upload-cloud-2-line text-2xl text-primary-500"></i>
                  <span className="text-sm text-foreground-700">
                    {images.length > 0
                      ? `${images.length} file(s) selected`
                      : "Click to choose product images"}
                  </span>
                  <input
                    type="file"
                    accept="image/*"
                    multiple
                    onChange={(e) => setImages(Array.from(e.target.files || []))}
                    className="hidden"
                  />
                </label>
              </div>

              {formError && <p className="text-xs text-red-600">{formError}</p>}

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
                  disabled={submitting}
                  className="flex-1 px-4 py-2.5 bg-primary-500 text-background-50 rounded-lg text-sm font-medium hover:bg-primary-600 transition-colors cursor-pointer whitespace-nowrap disabled:opacity-60"
                >
                  {submitting ? "Adding…" : "Add Product"}
                </button>
              </div>
            </form>
          )}

          {tab === "json" && (
            <div>
              <p className="mb-2 text-sm text-foreground-500">
                Paste a single product object or an array of products.
              </p>
              <textarea
                value={jsonText}
                onChange={(e) => setJsonText(e.target.value)}
                placeholder='[{ "title": "…", "sku": "…", "category": "women-dresses", "price": 49.99, "stock": 10 }]'
                rows={8}
                className="w-full px-4 py-2.5 bg-background-100 border border-background-200/70 rounded-lg text-xs text-foreground-900 outline-none focus:border-primary-300 transition-colors font-mono resize-none"
              />
              {jsonError && <p className="mt-2 text-xs text-red-600">{jsonError}</p>}
              <div className="flex items-center gap-3 pt-4">
                <button
                  type="button"
                  onClick={onClose}
                  className="flex-1 px-4 py-2.5 border border-background-200/70 rounded-lg text-sm font-medium text-foreground-600 hover:bg-background-100 transition-colors cursor-pointer whitespace-nowrap"
                >
                  Cancel
                </button>
                <button
                  type="button"
                  onClick={handleJsonImport}
                  className="flex-1 px-4 py-2.5 bg-primary-500 text-background-50 rounded-lg text-sm font-medium hover:bg-primary-600 transition-colors cursor-pointer whitespace-nowrap"
                >
                  Parse &amp; Import
                </button>
              </div>
            </div>
          )}

          {tab === "excel" && (
            <div className="">
              <button
                type="button"
                onClick={() => fileInputRef.current?.click()}
                className="flex w-full flex-col items-center gap-2 rounded-lg border-2 border-dashed border-background-200/70 bg-background-100 py-10 text-center hover:border-primary-300 transition-colors cursor-pointer"
              >
                <i className="ri-upload-cloud-2-line text-2xl text-primary-500 pt-5"></i>
                <span className="text-sm text-foreground-700">
                  {fileName || "Click to choose a .xlsx or .csv file"}
                </span>
                <span className="text-xs text-foreground-400 pb-5">
                  Expects columns: title, sku, category, price, stock…
                </span>
              </button>
              <input
                ref={fileInputRef}
                type="file"
                accept=".xlsx,.xls,.csv"
                onChange={handleExcelFile}
                className="hidden"
              />
              {excelError && <p className="mt-2 text-xs text-red-600">{excelError}</p>}

              <div className="flex items-center gap-3 pt-4">
                <button
                  type="button"
                  onClick={onClose}
                  className="flex-1 px-4 py-2.5 border border-background-200/70 rounded-lg text-sm font-medium text-foreground-600 hover:bg-background-100 transition-colors cursor-pointer whitespace-nowrap"
                >
                  Cancel
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};