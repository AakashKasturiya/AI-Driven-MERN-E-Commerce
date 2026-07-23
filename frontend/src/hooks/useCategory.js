import { useEffect, useState } from "react";
import { getProductsByCategory } from "../api/products";

export const useCategory = (category) => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const refetch = async () => {
    if (!category) {
      setProducts([]);
      return;
    }

    try {
      setLoading(true);
      setError(null);
      const res = await getProductsByCategory(category);
      setProducts(res.data?.products || []);
    } catch (e) {
      setError(e);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    refetch();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [category]);

  return { products, loading, error, refetch };
};
