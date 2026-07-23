import { useState, useRef, useCallback } from "react";
import { semanticSearchProducts } from "../../../api/aiSearch";

export const AiSearchBar = ({ onResults }) => {
  const [query, setQuery] = useState("");
  const [loading, setLoading] = useState(false);
  const debounceRef = useRef(null);

  const runSearch = useCallback(async (q) => {
    if (!q.trim()) {
      onResults?.([]);
      return;
    }
    try {
      setLoading(true);
      const res = await semanticSearchProducts(q);
      onResults?.(res.data.products || []);
    } catch {
      onResults?.([]);
    } finally {
      setLoading(false);
    }
  }, [onResults]);

  const handleChange = (e) => {
    const value = e.target.value;
    setQuery(value);

    if (debounceRef.current) clearTimeout(debounceRef.current);
    debounceRef.current = setTimeout(() => runSearch(value), 400); // debounce so we don't call OpenAI per keystroke
  };

  return (
    <div className="relative">
      <i className="ri-search-line absolute left-3 top-1/2 -translate-y-1/2 text-medium-gray text-sm" />
      <input
        value={query}
        onChange={handleChange}
        placeholder='Try "cozy winter outfit under $100"'
        className="w-full pl-9 pr-4 py-2.5 bg-gray-50 rounded-full text-sm outline-none focus:ring-1 focus:ring-charcoal/20"
      />
      {loading && (
        <span className="absolute right-3 top-1/2 -translate-y-1/2 text-[10px] text-medium-gray">
          Searching…
        </span>
      )}
    </div>
  );
};