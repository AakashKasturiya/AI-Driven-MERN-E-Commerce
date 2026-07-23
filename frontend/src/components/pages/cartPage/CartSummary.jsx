import { Link } from "react-router-dom";
import { useCart } from "../../../hooks/useCart";

export const CartSummary = () => {
  const { items, total } = useCart();

  const subtotal = items.reduce((sum, item) => {
    return sum + item.product.price * item.quantity;
  }, 0);

  const discount = items.reduce((sum, item) => {
    const original = Number(item.product.price || 0);
    const sale = Number(item.product.discountPrice || original);

    return sum + (original - sale) * item.quantity;
  }, 0);

  const finalTotal = subtotal - discount;

  return (
    <div className="bg-gray-50 rounded-2xl p-6 md:p-8 sticky top-28">
      <h2 className="font-serif text-lg font-semibold text-charcoal mb-6">
        Order Summary
      </h2>

      <div className="mb-6">
        <label className="text-sm font-medium text-charcoal mb-2 block">
          Promo Code
        </label>

        <div className="flex gap-2">
          <input
            type="text"
            placeholder="Enter code"
            className="flex-1 bg-white border border-gray-200 rounded-lg px-4 py-2.5 text-sm"
          />

          <button className="bg-charcoal text-white px-5 rounded-lg text-sm">
            Apply
          </button>
        </div>
      </div>

      <div className="space-y-3 text-sm">

        <div className="flex justify-between">
          <span>Items</span>
          <span>{items.length}</span>
        </div>

        <div className="flex justify-between">
          <span>Subtotal</span>
          <span>${subtotal.toFixed(2)}</span>
        </div>

        <div className="flex justify-between text-green-600">
          <span>Savings</span>
          <span>
            -${discount.toFixed(2)}
          </span>
        </div>

        <div className="flex justify-between">
          <span>Shipping</span>
          <span>
            {finalTotal >= 200 ? "Free" : "$20"}
          </span>
        </div>

        <div className="flex justify-between">
          <span>Estimated Tax</span>
          <span>$0.00</span>
        </div>

      </div>

      <div className="border-t border-gray-200 mt-4 pt-4 flex justify-between">
        <span className="font-serif font-semibold">
          Total
        </span>

        <span className="font-serif text-xl font-semibold">
          $
          {(finalTotal >= 200
            ? finalTotal
            : finalTotal + 20
          ).toFixed(2)}
        </span>
      </div>

      <Link to="/checkout"
        className="mt-6 w-full bg-coral text-white py-4 rounded-xl font-semibold flex items-center justify-center gap-2"
      >
        <i className="ri-secure-payment-line" />
        Proceed to Checkout
      </Link>

      <div className="mt-4 flex justify-center gap-4 text-xl text-medium-gray">
        <i className="ri-visa-line" />
        <i className="ri-mastercard-line" />
        <i className="ri-paypal-line" />
        <i className="ri-apple-fill" />
      </div>

      <p className="text-center text-xs text-medium-gray mt-3">
        {finalTotal >= 200
          ? "🎉 You have unlocked Free Shipping"
          : `Add $${(200 - finalTotal).toFixed(
              2
            )} more to get Free Shipping`}
      </p>
    </div>
  );
};