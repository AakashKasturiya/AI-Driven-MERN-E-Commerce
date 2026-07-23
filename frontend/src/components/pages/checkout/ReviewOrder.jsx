import { useCheckout } from "../../../context/CheckoutContext";
import { useCart } from "../../../hooks/useCart";
import { placeOrder } from "../../../api/orders";
import Swal from "sweetalert2";

export const ReviewOrder = () => {
    const { shipping, paymentMethod, setStep } = useCheckout();
    const { items, refresh } = useCart();

    const handlePlaceOrder = async () => {
        try {
            if (!shipping) {
                Swal.fire({
                    icon: "error",
                    title: "Error",
                    text: "Address details are missing. Please step back and enter shipping address.",
                    confirmButtonColor: "#111111",
                });
                return;
            }

            const orderPayload = {
                shippingAddress: {
                    firstName: shipping.firstName,
                    lastName: shipping.lastName,
                    email: shipping.email,
                    address: shipping.address,
                    apartment: shipping.apartment,
                    city: shipping.city,
                    state: shipping.state,
                    zipCode: shipping.zipCode,
                    phone: shipping.phone,
                },
                paymentMethod: paymentMethod || "cod",
            };

            const res = await placeOrder(orderPayload);

            if (res.data?.success) {
                // Refresh cart in context to clear local state
                await refresh();

                Swal.fire({
                    icon: "success",
                    title: "Order Placed Successfully!",
                    text: "Your order has been confirmed. You will receive an email shortly.",
                    confirmButtonColor: "#111111",
                }).then(() => {
                    setStep(4);
                });
            } else {
                Swal.fire({
                    icon: "error",
                    title: "Order Failed",
                    text: res.data?.message || "Verify your cart or details and try again.",
                    confirmButtonColor: "#111111",
                });
            }
        } catch (error) {
            console.error("Order error:", error);
            Swal.fire({
                icon: "error",
                title: "Order Error",
                text: error.response?.data?.message || error.message || "Failed to place order.",
                confirmButtonColor: "#111111",
            });
        }
    };

    return (
        <div className="bg-white rounded-2xl shadow-sm border border-gray-150 p-6 md:p-8">
            <h2 className="font-serif text-xl font-semibold text-charcoal mb-6">
                Review Your Order
            </h2>

            {/* Shipping details */}
            <div className="border border-gray-200 rounded-xl p-5 mb-6">
                <div className="flex justify-between items-center mb-4 pb-2 border-b border-gray-100">
                    <h3 className="font-semibold text-charcoal text-sm uppercase tracking-wider">
                        Shipping Information
                    </h3>
                    <button
                        onClick={() => setStep(1)}
                        className="text-xs font-semibold text-coral hover:underline"
                    >
                        Edit
                    </button>
                </div>

                {shipping ? (
                    <div className="space-y-2 text-sm text-charcoal">
                        <p className="font-medium">
                            {shipping.firstName} {shipping.lastName}
                        </p>
                        <p className="text-medium-gray">
                            {shipping.address}
                            {shipping.apartment && `, ${shipping.apartment}`}
                        </p>
                        <p className="text-medium-gray">
                            {shipping.city}, {shipping.state} - {shipping.zipCode}
                        </p>
                        <p className="text-medium-gray">Phone: {shipping.phone}</p>
                        <p className="text-medium-gray">Email: {shipping.email}</p>
                        <div className="mt-4 pt-3 border-t border-gray-100 flex items-center gap-2">
                            <span className="text-xs uppercase bg-gray-100 font-semibold px-2.5 py-1 rounded text-charcoal">
                                Method: {shipping.shippingMethod === "express" ? "Express" : "Standard"}
                            </span>
                        </div>
                    </div>
                ) : (
                    <p className="text-sm text-red-500">No shipping information available. Please go back.</p>
                )}
            </div>

            {/* Cart items preview */}
            <div className="border border-gray-200 rounded-xl p-5 mb-6">
                <h3 className="font-semibold text-charcoal text-sm uppercase tracking-wider mb-4 pb-2 border-b border-gray-100">
                    Cart Selection
                </h3>
                <div className="space-y-4 max-h-60 overflow-y-auto">
                    {items.map((item) => (
                        <div key={item._id} className="flex gap-4 items-center">
                            <img
                                src={item.product?.thumbnail}
                                alt={item.product?.title}
                                className="w-12 h-16 rounded object-cover border border-gray-100"
                            />
                            <div className="flex-1 min-w-0">
                                <p className="text-sm font-semibold text-charcoal truncate">
                                    {item.product?.title}
                                </p>
                                <p className="text-xs text-medium-gray">Qty: {item.quantity}</p>
                            </div>
                            <span className="text-sm font-semibold text-charcoal">
                                ${(item.product?.discountPrice * item.quantity).toFixed(2)}
                            </span>
                        </div>
                    ))}
                </div>
            </div>

            <div className="flex gap-4">
                <button
                    type="button"
                    onClick={() => setStep(2)}
                    className="flex-1 py-4 border border-gray-200 rounded-xl text-sm font-semibold text-charcoal hover:bg-gray-50 transition-all duration-300"
                >
                    Back to Payment
                </button>

                <button
                    type="button"
                    onClick={handlePlaceOrder}
                    className="flex-1 py-4 bg-coral text-white rounded-xl text-sm font-semibold hover:opacity-90 transition-all duration-300"
                >
                    Confirm & Place Order
                </button>
            </div>
        </div>
    );
};