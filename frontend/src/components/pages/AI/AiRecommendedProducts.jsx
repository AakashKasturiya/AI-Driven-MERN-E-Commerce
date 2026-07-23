import { useState, useEffect } from "react";
import { getAiRecommendations } from "../../../api/aiRecommendations";

export const AiRecommendedProducts = () => {
  const [products, setProducts] = useState([]);
  const [reasonSummary, setReasonSummary] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const fetchRecommendations = async (forceRefresh = false) => {
    try {
      setLoading(true);
      setError(null);
      const res = await getAiRecommendations(forceRefresh);
      setProducts(res.data.products || []);
      setReasonSummary(res.data.reasonSummary || "");
    } catch (err) {
      setError(
        err?.response?.data?.message || err.message || "Failed to load recommendations"
      );
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchRecommendations();
  }, []);

  if (error) return null; // fail silently on the storefront — not worth blocking the page

  return (
    <section className="px-6 md:px-10 py-10">
      <div className="flex items-center justify-between mb-6">
        <div>
          <h2 className="font-serif text-xl font-semibold text-charcoal">
            Recommended For You
          </h2>
          {reasonSummary && (
            <p className="text-xs text-medium-gray mt-1">{reasonSummary}</p>
          )}
        </div>
        <button
          type="button"
          onClick={() => fetchRecommendations(true)}
          disabled={loading}
          className="text-xs text-medium-gray hover:text-charcoal transition-colors flex items-center gap-1.5 disabled:opacity-50"
        >
          <i className="ri-refresh-line"></i> Refresh
        </button>
      </div>

      {loading && products.length === 0 ? (
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {[...Array(4)].map((_, i) => (
            <div key={i} className="h-64 rounded-xl bg-gray-50 animate-pulse" />
          ))}
        </div>
      ) : (
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {products.map((p) => (
            <div key={p._id} className="group cursor-pointer">
              <div className="aspect-[3/4] rounded-xl overflow-hidden bg-gray-50 mb-3">
                <img
                  src={p.thumbnail}
                  alt={p.title}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  loading="lazy"
                />
              </div>
              <p className="text-[10px] uppercase tracking-wider text-medium-gray font-medium">
                {p.category}
              </p>
              <h3 className="font-serif text-sm font-semibold text-charcoal mt-0.5 group-hover:text-coral transition-colors truncate">
                {p.title}
              </h3>
              <p className="text-sm font-medium text-charcoal mt-1">${p.price}</p>
            </div>
          ))}
        </div>
      )}
    </section>
  );
};