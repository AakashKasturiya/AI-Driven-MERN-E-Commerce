import { useState, useEffect } from "react";
import { getProducts } from "../../../api/products";
import { Link } from "react-router-dom";

const formatCurrency = (value) => {
  if (value == null || Number.isNaN(Number(value))) return "-";
  return new Intl.NumberFormat(undefined, {
    style: "currency",
    currency: "USD",
    minimumFractionDigits: 2,
  }).format(value);
};

export const TopProducts = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchTopProducts = async () => {
      try {
        setLoading(true);
        setError(null);
        // If your backend supports sorting/limiting via query params,
        // pass them here e.g. { sort: "-sold", limit: 5 }
        const res = await getProducts({ limit: 5 });
        const list = res.data.products || res.data || [];

        // If backend doesn't sort/limit for you, do it client-side.
        // Adjust "sold" to whatever field indicates popularity (e.g. salesCount).
        const sorted = [...list]
          .sort((a, b) => (b.sold || 0) - (a.sold || 0))
          .slice(0, 5);

        setProducts(sorted.length ? sorted : list.slice(0, 5));
      } catch (err) {
        setError(
          err?.response?.data?.message ||
            err.message ||
            "Failed to fetch top products",
        );
      } finally {
        setLoading(false);
      }
    };

    fetchTopProducts();
  }, []);

  return (
    <div className="bg-card rounded-xl border border-border p-6">
    <div className="flex justify-between w-full "> 
      <h3 className="font-semibold text-foreground mb-4">Top Products</h3>
      <Link
        to="/admin/products"
        className="w-8 h-8 flex items-center justify-center rounded-lg text-foreground-400 hover:text-primary-500 hover:bg-primary-50 transition-all duration-200 cursor-pointer"
        title="Product Page"
      >
        <span className="w-4 h-4 flex items-center justify-center">
          <i className="ri-arrow-right-line"></i>
        </span>
      </Link>
      </div>
      <div className="space-y-3">
        {loading && (
          <p className="text-sm text-muted-foreground py-2">Loading...</p>
        )}

        {error && !loading && (
          <p className="text-sm text-red-600 py-2">{error}</p>
        )}

        {!loading && !error && products.length === 0 && (
          <p className="text-sm text-muted-foreground py-2">
            No products found.
          </p>
        )}

        {!loading &&
          !error &&
          products.map((product) => (
            <div
              key={product._id}
              className="flex items-center justify-between py-2 border-b border-border last:border-0"
            >
              <div>
                <p className="text-sm text-foreground font-bold">
                  {product.title}
                </p>
                <p className="text-xs text-muted-foreground">
                  {product.category}
                </p>
              </div>
              <span className="text-sm font-semibold">
                {formatCurrency(product.price)}
              </span>
            </div>
          ))}
      </div>
    </div>
  );
};
