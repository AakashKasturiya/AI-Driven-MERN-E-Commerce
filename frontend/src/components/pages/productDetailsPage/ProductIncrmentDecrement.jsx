import { useState } from "react";
import { useCart } from "../../../hooks/useCart";

export const ProductIncrmentDecrement = ({ product }) => {
  const [quantity, setQuantity] = useState(1);

  const totalValue = (
    Number(product?.price || 0) * quantity
  ).toFixed(2);

  const { add } = useCart();

  const addCartHandler = async () => {
    try {
      await add(product._id, quantity);
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <div className="flex items-center gap-4 mb-6">
      <div className="flex items-center border border-gray-200 rounded-xl overflow-hidden">
        <button
          onClick={() =>
            setQuantity((prev) => (prev > 1 ? prev - 1 : 1))
          }
          className="w-11 h-11 flex items-center justify-center"
        >
          <i className="ri-subtract-line" />
        </button>

        <span className="w-12 h-11 flex items-center justify-center border-x">
          {quantity}
        </span>

        <button
          onClick={() => setQuantity((prev) => prev + 1)}
          className="w-11 h-11 flex items-center justify-center"
        >
          <i className="ri-add-line" />
        </button>
      </div>

      <button
        onClick={addCartHandler}
        className="flex-1 h-11 rounded-xl bg-coral text-white font-semibold flex items-center justify-center gap-2"
      >
        <i className="ri-shopping-bag-line" />
        Add to Bag — ${totalValue}
      </button>
    </div>
  );
};