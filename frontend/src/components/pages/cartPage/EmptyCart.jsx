import { Link } from "react-router-dom";

export const EmptyCart = () => {
  return (
    <div className="text-center py-24">

      <i className="ri-shopping-bag-line text-7xl text-gray-300" />

      <h2 className="text-2xl font-semibold mt-5">
        Your cart is empty
      </h2>

      <p className="text-medium-gray mt-2">
        Looks like you haven't added anything yet.
      </p>

      <Link
        to="/collections"
        className="inline-flex mt-8 bg-charcoal text-white px-8 py-3 rounded-xl"
      >
        Continue Shopping
      </Link>

    </div>
  );
};