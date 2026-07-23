import { useNavigate } from "react-router-dom";
import { useCheckout } from "../../../context/CheckoutContext";
import { useEffect } from "react";

export const SuccessOrder = () => {
  const navigate = useNavigate();
  const { resetCheckout, shipping } = useCheckout();

  const orderId = useCheckout ? `ORD-${Math.floor(100000 + Math.random() * 900000)}` : "";

  // Reset checkout on unmount
  useEffect(() => {
    return () => {
      resetCheckout();
    };
  }, [resetCheckout]);

  const handleContinueShopping = () => {
    resetCheckout();
    navigate("/shop");
  };

  return (
    <div className="max-w-xl mx-auto text-center bg-white rounded-3xl border border-gray-100 p-8 md:p-12 shadow-sm my-8">
      {/* Dynamic Success Mark */}
      <div className="w-20 h-20 bg-green-50 rounded-full flex items-center justify-center mx-auto mb-6">
        <i className="ri-checkbox-circle-fill text-5xl text-green-500" />
      </div>

      <h2 className="font-serif text-2xl md:text-3xl font-semibold text-charcoal mb-3">
        Thank You for Your Order!
      </h2>
      <p className="text-sm text-medium-gray mb-8 leading-relaxed">
        Your payment has been successfully processed, and your order has been placed.
      </p>

      <div className="bg-gray-50 rounded-2xl p-6 text-left space-y-4 mb-8">
        <div className="flex justify-between items-center text-sm border-b border-gray-200 pb-3">
          <span className="text-medium-gray font-medium">Order Number</span>
          <span className="font-semibold text-charcoal">{orderId}</span>
        </div>

        {shipping && (
          <div className="text-sm">
            <span className="text-medium-gray font-medium block mb-1">Delivering to</span>
            <span className="font-semibold text-charcoal block">
              {shipping.firstName} {shipping.lastName}
            </span>
            <span className="text-xs text-medium-gray block mt-0.5">
              {shipping.address}, {shipping.city}, {shipping.state} - {shipping.zipCode}
            </span>
          </div>
        )}

        <div className="flex justify-between items-center text-sm border-t border-gray-200 pt-3">
          <span className="text-medium-gray font-medium font-serif">Estimated Delivery</span>
          <span className="font-semibold text-charcoal">
            {shipping?.shippingMethod === "express" ? "2-3 Business Days" : "5-7 Business Days"}
          </span>
        </div>
      </div>

      <p className="text-xs text-medium-gray mb-8">
        We have details sent to <span className="font-semibold text-charcoal">{shipping?.email || "your email"}</span>.
      </p>

      <button
        onClick={handleContinueShopping}
        className="w-full py-4 bg-charcoal text-white rounded-xl text-sm font-semibold hover:bg-opacity-90 transition-all duration-300 shadow-lg cursor-pointer"
      >
        Continue Shopping
      </button>
    </div>
  );
};