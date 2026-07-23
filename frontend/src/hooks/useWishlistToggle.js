import { useCallback, useState } from "react";
import { useWishlist } from "./useWishlist";

export const useWishlistToggle = (productId) => {
  const {
    toggle: toggleWishlist,
    isWishlisted,
  } = useWishlist();

  const [submitting, setSubmitting] = useState(false);

  const toggle = useCallback(async () => {
    if (!productId) return;

    try {
      setSubmitting(true);
      await toggleWishlist(productId);
    } finally {
      setSubmitting(false);
    }
  }, [productId, toggleWishlist]);

  return {
    isInWishlist: isWishlisted(productId),
    toggle,
    submitting,
  };
};