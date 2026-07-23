import { useEffect, useMemo, useState } from "react";
import { getProducts } from "../api/products";

export const useProducts = (query = {}) => {
  const stableQuery = useMemo(() => query, [JSON.stringify(query)]);

  const [products, setProducts] = useState([]);
  const [meta, setMeta] = useState({ total: 0, skip: 0, limit: 0 });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const refetch = async () => {
    try {
      setLoading(true);
      setError(null);
      const res = await getProducts(stableQuery);
      setProducts(res.data?.products || []);
      setMeta({
        total: res.data?.total ?? 0,
        skip: res.data?.skip ?? 0,
        limit: res.data?.limit ?? 0,
      });
    } catch (e) {
      setError(e);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    refetch();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [stableQuery]);

  return { products, meta, loading, error, refetch };
};
