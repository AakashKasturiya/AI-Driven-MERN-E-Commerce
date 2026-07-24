import {
  createContext,
  useCallback,
  useEffect,
  useMemo,
  useState,
} from "react";

import {
  getWishlist,
  toggleWishlist,
} from "../api/wishlist";

export const WishlistContext = createContext(null);

export const WishlistProvider = ({ children }) => {
  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  // ============================
  // Fetch Wishlist
  // ============================

  const refresh = useCallback(async () => {
    try {
      setLoading(true);
      setError(null);

      const res = await getWishlist();

      setItems(res.data?.wishlist || []);
    } catch (err) {
      setError(err);
    } finally {
      setLoading(false);
    }
  }, []);

  // ============================
  // Toggle Wishlist
  // ============================

  const toggle = useCallback(
    async (productId) => {
      try {
        await toggleWishlist(productId);
        await refresh();
      } catch (err) {
        console.error(err);
        setError(
          err?.response?.data?.message ||
            err?.message ||
            "Wishlist action failed"
        );
      }
    },
    [refresh]
  );

  // ============================
  // Check Product Exists
  // ============================

  const isWishlisted = useCallback(
    (productId) => {
      return items.some(
        (item) =>
          item.product?._id === productId ||
          item.product === productId
      );
    },
    [items]
  );

  // ============================
  // Initial Load
  // ============================

  useEffect(() => {
    refresh();
  }, [refresh]);

  // ============================
  // Context Value
  // ============================

  const value = useMemo(() => {
    return {
      items,
      count: items.length,
      loading,
      error,
      refresh,
      toggle,
      isWishlisted,
    };
  }, [
    items,
    loading,
    error,
    refresh,
    toggle,
    isWishlisted,
  ]);

  return (
    <WishlistContext.Provider value={value}>
      {children}
    </WishlistContext.Provider>
  );
};