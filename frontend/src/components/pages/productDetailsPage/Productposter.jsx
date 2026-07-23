import { useWishlistToggle } from "../../../hooks/useWishlistToggle";

export const ProductPoster = ({ product }) => {
  const { isInWishlist, toggle } = useWishlistToggle(product?._id);

  return (
    <div style={{ opacity: 1, transform: "none" }}>
      <div className="relative aspect-[3/4] bg-taupe-100 rounded-2xl overflow-hidden mb-4">
        <img
          src={product?.thumbnail}
          alt={product?.title}
          className="w-full h-full object-cover object-top transition-transform duration-700 hover:scale-105"
        />

        <span className="absolute top-4 left-4 text-[10px] font-semibold uppercase tracking-wider px-3 py-1.5 rounded-full bg-charcoal text-white">
          {product?.sku}
        </span>

        <button
          type="button"
          onClick={toggle}
          className="absolute top-4 right-4 w-10 h-10 rounded-full flex items-center justify-center bg-white/90 backdrop-blur-sm shadow-sm transition"
        >
          {isInWishlist ? (
            <i className="ri-heart-fill text-red-500 text-lg" />
          ) : (
            <i className="ri-heart-line text-lg text-charcoal hover:text-red-500" />
          )}
        </button>
      </div>
    </div>
  );
};