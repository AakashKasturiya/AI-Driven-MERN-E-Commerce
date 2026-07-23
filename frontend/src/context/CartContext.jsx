import { createContext, useCallback, useEffect, useMemo, useState } from "react";

import {
  addToCart,
  getCart,
  removeFromCart,
  updateCart,
} from "../api/cart";

export const CartContext = createContext(null);

export const CartProvider = ({ children }) => {
  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  // ===============================
  // Fetch Cart
  // ===============================

  const refresh = useCallback(async () => {
    try {
      setLoading(true);

      const res = await getCart();

      setItems(res.data.cart || []);

      setError(null);
    } catch (err) {
      setError(err);
    } finally {
      setLoading(false);
    }
  }, []);

  // ===============================
  // Add Product
  // ===============================

  const add = useCallback(
    async (productId, quantity = 1) => {
      await addToCart(productId, quantity);

      await refresh();
    },
    [refresh]
  );

  // ===============================
  // Update Quantity
  // ===============================

  const update = useCallback(
    async (cartId, quantity) => {
      await updateCart(cartId, quantity);

      await refresh();
    },
    [refresh]
  );

  // ===============================
  // Remove Product
  // ===============================

  const remove = useCallback(
    async (cartId) => {
      await removeFromCart(cartId);

      await refresh();
    },
    [refresh]
  );

  useEffect(() => {
    refresh();
  }, [refresh]);

  const count = useMemo(() => {
    return items.reduce((sum, item) => sum + item.quantity, 0);
  }, [items]);

  const total = useMemo(() => {
    return items.reduce((sum, item) => {
      return sum + item.product.price * item.quantity;
    }, 0);
  }, [items]);

  const value = useMemo(
    () => ({
      items,
      loading,
      error,
      count,
      total,
      refresh,
      add,
      update,
      remove,
    }),
    [items, loading, error, count, total, refresh, add, update, remove]
  );

  return (
    <CartContext.Provider value={value}>
      {children}
    </CartContext.Provider>
  );
};