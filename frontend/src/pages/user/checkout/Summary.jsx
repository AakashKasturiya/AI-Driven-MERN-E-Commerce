import { useMemo } from "react";
import { useCart } from "../../../hooks/useCart";
import { useCheckout } from "../../../context/CheckoutContext";

export const Summary = () => {
    const { items, total } = useCart();
    const { shipping } = useCheckout();

    const shippingCost = shipping?.shippingMethod === "express" ? 25 : 0;
    const tax = total * 0.18;

    const savings = useMemo(() => {
        return items.reduce((sum, item) => {
            const price = Number(item.product?.price || 0);
            const discount = Number(item.product?.discountPrice || price);

            return sum + (price - discount) * item.quantity;
        }, 0);
    }, [items]);

    const grandTotal = total + shippingCost + tax;

    return (
        <div className="bg-gray-50 rounded-2xl p-6 md:p-8 sticky top-28">

            <h2 className="font-serif text-xl font-semibold text-charcoal mb-6">
                Order Summary
            </h2>

            {/* Products */}

            <div className="space-y-4 max-h-80 overflow-y-auto mb-6">

                {items.map((item) => (
                    <div
                        key={item._id}
                        className="flex gap-3 border-b border-gray-200 pb-3"
                    >
                        <img
                            src={item.product.thumbnail}
                            alt={item.product.title}
                            className="w-16 h-20 rounded-lg object-cover"
                        />

                        <div className="flex-1">

                            <h4 className="text-sm font-semibold text-charcoal">
                                {item.product.title}
                            </h4>

                            <p className="text-xs text-medium-gray mt-1">
                                Qty : {item.quantity}
                            </p>

                            <p className="text-xs text-medium-gray">
                                ${item.product.discountPrice} × {item.quantity}
                            </p>

                        </div>

                        <span className="font-semibold text-charcoal">
                            $
                            {(
                                item.product.discountPrice * item.quantity
                            ).toFixed(2)}
                        </span>

                    </div>
                ))}

            </div>

            {/* Promo */}

            <div className="mb-6">

                <label className="block text-sm font-medium mb-2">
                    Promo Code
                </label>

                <div className="flex gap-2">

                    <input
                        placeholder="Enter code"
                        className="flex-1 border border-gray-200 rounded-lg px-4 py-2 text-sm"
                    />

                    <button className="bg-charcoal text-white px-5 rounded-lg">
                        Apply
                    </button>

                </div>

            </div>

            {/* Calculation */}

            <div className="space-y-3">

                <div className="flex justify-between">

                    <span>Subtotal</span>

                    <span>${total.toFixed(2)}</span>

                </div>

                <div className="flex justify-between text-green-600">

                    <span>Savings</span>

                    <span>-${savings.toFixed(2)}</span>

                </div>

                <div className="flex justify-between">

                    <span>Shipping</span>

                    <span>
                        {shippingCost === 0 ? "Free" : `$${shippingCost}`}
                    </span>

                </div>

                <div className="flex justify-between">

                    <span>GST (18%)</span>

                    <span>${tax.toFixed(2)}</span>

                </div>

            </div>

            <div className="border-t border-gray-300 mt-5 pt-5 flex justify-between">

                <span className="font-serif text-lg font-semibold">
                    Total
                </span>

                <span className="font-serif text-2xl font-semibold text-coral">
                    ${grandTotal.toFixed(2)}
                </span>

            </div>

            <div className="flex justify-center gap-4 mt-6 text-2xl text-medium-gray">

                <i className="ri-visa-line" />
                <i className="ri-mastercard-line" />
                <i className="ri-paypal-line" />
                <i className="ri-apple-fill" />

            </div>

            <p className="text-center text-xs mt-4 text-medium-gray">
                Secure SSL encrypted payment
            </p>

        </div>
    );
};