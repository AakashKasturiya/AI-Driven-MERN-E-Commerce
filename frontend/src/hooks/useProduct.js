import { useEffect, useState } from "react";
import { getProductById } from "../api/products";

export const useProduct = (id) => {
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const refetch = async () => {
    if (!id) {
      setProduct(null);
      return;
    }

    try {
      setLoading(true);
      setError(null);
      const res = await getProductById(id);
      setProduct(res.data?.product ?? null);
    } catch (e) {
      setError(e);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    refetch();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [id]);

  return { product, loading, error, refetch };
};
