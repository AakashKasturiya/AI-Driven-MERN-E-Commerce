import { useCallback, useMemo, useState } from "react";
import { useCart } from "./useCart";

export const useCartToggle = (productId) => {
  const { items, add } = useCart();

  const [submitting, setSubmitting] = useState(false);

  const cartItem = useMemo(() => {
    return items.find(
      (item) => String(item.product?._id) === String(productId)
    );
  }, [items, productId]);

  const isInCart = !!cartItem;

  const quantity = cartItem?.quantity || 0;

  const toggle = useCallback(async () => {
    if (!productId) return;

    try {
      setSubmitting(true);

      // Backend automatically increases quantity
      await add(productId);
    } finally {
      setSubmitting(false);
    }
  }, [add, productId]);

  return {
    isInCart,
    quantity,
    toggle,
    submitting,
  };
};