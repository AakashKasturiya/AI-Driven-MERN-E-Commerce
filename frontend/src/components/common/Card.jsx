import { Link } from "react-router-dom";
import { useWishlistToggle } from "../../hooks/useWishlistToggle";

export const Card = ({ item }) => {
  const {
    isInWishlist,
    toggle,
    submitting,
  } = useWishlistToggle(item?._id);

  return (
    <div
      className="group shadow-lg overflow-hidden rounded-2xl relative"
      style={{
        opacity: 1,
        transform: "translateY(30px)",
      }}
    >
      {/* Product Image */}
      <div className="relative aspect-[2/2] bg-red-50 overflow-hidden">
        <img
          src={item.thumbnail}
          alt={item.title}
          loading="lazy"
          className="w-full h-full object-cover object-top transition-transform duration-700 group-hover:scale-105"
        />

        {/* Brand */}
        <span className="absolute top-3 left-3 text-[10px] font-semibold uppercase tracking-wider px-3 py-1.5 rounded-full bg-charcoal text-white">
          {item.brand || "Velora"}
        </span>

        {/* Wishlist */}
        <button
          type="button"
          disabled={submitting}
          onClick={toggle}
          className="absolute top-3 right-3 w-10 h-10 rounded-full bg-white/90 backdrop-blur-sm shadow-md flex items-center justify-center hover:scale-110 transition-all duration-300"
        >
          <i
            className={
              isInWishlist
                ? "ri-heart-fill text-red-500 text-xl transition-all duration-300"
                : "ri-heart-line text-xl text-gray-700 transition-all duration-300 hover:text-red-500"
            }
          />
        </button>

        {/* View Product */}
        <div className="absolute inset-x-0 bottom-0 p-4 transition-all duration-300 opacity-0 translate-y-4 group-hover:opacity-100 group-hover:translate-y-0">
          <Link
            to={`/product/${item._id}`}
            className="w-full bg-charcoal text-white text-sm font-medium py-3 rounded-xl hover:bg-black transition-colors flex items-center justify-center gap-2"
          >
            <i className="ri-eye-line" />
            View Product
          </Link>
        </div>
      </div>

      {/* Product Details */}
      <div className="p-6">
        <span className="text-[10px] uppercase tracking-widest text-medium-gray font-medium">
          {item.category}
        </span>

        <h3 className="font-serif text-base md:text-lg font-semibold text-charcoal mt-1 group-hover:text-coral transition-colors">
          {item.title}
        </h3>

        <div className="flex items-center justify-between mt-3">
          <span className="text-charcoal font-semibold text-lg">
            ${item.price}
          </span>

          <div className="flex items-center gap-1">
            <i className="ri-star-fill text-coral text-xs" />
            <span className="text-xs text-medium-gray">{item.rating}</span>
          </div>
        </div>
      </div>
    </div>
  );
};