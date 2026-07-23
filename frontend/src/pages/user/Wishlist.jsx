import { useNavigate } from "react-router-dom";
import { useWishlist } from "../../hooks/useWishlist";

export const Wishlist = () => {
  const { items, loading, error, toggle } = useWishlist();

  const navigate = useNavigate();

  const totalValue = items.reduce(
    (sum, item) => sum + (Number(item.product?.price) || 0),
    0
  );

  return (
    <main className="pt-28 md:pt-32 pb-20 px-6 md:px-12 lg:px-16 max-w-7xl mx-auto">

      <h1 className="font-serif text-3xl font-semibold">
        My Wishlist
      </h1>

      <p className="text-sm text-gray-500 mt-2">
        {items.length} items saved
      </p>

      <div className="mt-6 flex justify-between items-center bg-gray-50 rounded-xl p-5 shadow">

        <div className="flex gap-6">

          <div>
            <p className="text-xs text-gray-500 uppercase">
              Saved Items
            </p>

            <p className="font-semibold">
              {items.length}
            </p>
          </div>

          <div>
            <p className="text-xs text-gray-500 uppercase">
              Total Value
            </p>

            <p className="font-semibold">
              ${totalValue.toFixed(2)}
            </p>
          </div>

        </div>

      </div>

      {loading && (
        <p className="mt-10 text-center">
          Loading...
        </p>
      )}

      {error && (
        <p className="mt-10 text-center text-red-500">
          {error.message}
        </p>
      )}

      {!loading && items.length === 0 && (
        <p className="mt-10 text-center">
          Wishlist is empty.
        </p>
      )}

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mt-8">

        {items.map(({ product }) => (

          <div
            key={product._id}
            className="group"
          >

            <div className="relative aspect-[3/4] bg-gray-100 rounded-2xl overflow-hidden">

              <img
                src={product.thumbnail}
                alt={product.title}
                className="w-full h-full object-cover"
              />

              <button
                onClick={() => toggle(product._id)}
                className="absolute top-3 right-3 bg-white rounded-full w-10 h-10 flex justify-center items-center shadow"
              >
                <i className="ri-heart-fill text-red-500"></i>
              </button>

            </div>

            <div className="mt-3">

              <p className="text-xs uppercase text-gray-500">
                {product.category}
              </p>

              <h2 className="font-semibold mt-1">
                {product.title}
              </h2>

              <div className="flex justify-between mt-2">

                <span className="font-medium">
                  ${product.price}
                </span>

                <span className="text-sm">
                  ⭐ {product.rating}
                </span>

              </div>

            </div>

          </div>

        ))}

      </div>

      <div className="mt-12 flex justify-center">

        <button
          onClick={() => navigate(-1)}
          className="flex items-center gap-2"
        >
          <i className="ri-arrow-left-line"></i>

          Continue Shopping

        </button>

      </div>

    </main>
  );
};