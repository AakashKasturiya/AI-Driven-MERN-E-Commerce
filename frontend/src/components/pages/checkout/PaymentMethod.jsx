import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { useCheckout } from "../../../context/CheckoutContext";
import Swal from "sweetalert2";

// Conditional validation schema using superRefine
const paymentSchema = z
  .object({
    paymentMethod: z.enum(["card", "upi", "cod"]),
    cardName: z.string().optional(),
    cardNumber: z.string().optional(),
    cardExpiry: z.string().optional(),
    cardCvv: z.string().optional(),
    upiId: z.string().optional(),
  })
  .superRefine((data, ctx) => {
    if (data.paymentMethod === "card") {
      if (!data.cardName || data.cardName.trim().length < 2) {
        ctx.addIssue({
          code: z.ZodIssueCode.custom,
          message: "Cardholder name is required",
          path: ["cardName"],
        });
      }

      const rawCardNumber = data.cardNumber ? data.cardNumber.replace(/\s/g, "") : "";
      if (!rawCardNumber || !/^\d{16}$/.test(rawCardNumber)) {
        ctx.addIssue({
          code: z.ZodIssueCode.custom,
          message: "Enter valid 16-digit card number",
          path: ["cardNumber"],
        });
      }

      if (!data.cardExpiry || !/^\d{2}\/\d{2}$/.test(data.cardExpiry)) {
        ctx.addIssue({
          code: z.ZodIssueCode.custom,
          message: "Expiration date must be MM/YY",
          path: ["cardExpiry"],
        });
      } else {
        const [monthStr, yearStr] = data.cardExpiry.split("/");
        const month = parseInt(monthStr, 10);
        const year = parseInt("20" + yearStr, 10);
        const currentDate = new Date();
        const currentMonth = currentDate.getMonth() + 1;
        const currentYear = currentDate.getFullYear();

        if (month < 1 || month > 12) {
          ctx.addIssue({
            code: z.ZodIssueCode.custom,
            message: "Month must be between 01 and 12",
            path: ["cardExpiry"],
          });
        } else if (year < currentYear || (year === currentYear && month < currentMonth)) {
          ctx.addIssue({
            code: z.ZodIssueCode.custom,
            message: "Card has expired",
            path: ["cardExpiry"],
          });
        }
      }

      if (!data.cardCvv || !/^\d{3}$/.test(data.cardCvv)) {
        ctx.addIssue({
          code: z.ZodIssueCode.custom,
          message: "CVV must be 3 digits",
          path: ["cardCvv"],
        });
      }
    } else if (data.paymentMethod === "upi") {
      if (!data.upiId || !/^[\w.-]+@[\w.-]+$/.test(data.upiId)) {
        ctx.addIssue({
          code: z.ZodIssueCode.custom,
          message: "Enter a valid UPI ID (e.g. name@upi)",
          path: ["upiId"],
        });
      }
    }
  });

export const PaymentMethod = () => {
  const { setStep, setPaymentMethod } = useCheckout();

  const {
    register,
    handleSubmit,
    watch,
    setValue,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(paymentSchema),
    defaultValues: {
      paymentMethod: "card",
      cardName: "",
      cardNumber: "",
      cardExpiry: "",
      cardCvv: "",
      upiId: "",
    },
    mode: "onChange",
  });

  const selectedMethod = watch("paymentMethod");

  const handleCardNumberChange = (e) => {
    let value = e.target.value.replace(/\D/g, "");
    if (value.length > 16) value = value.slice(0, 16);
    const formatted = value.match(/.{1,4}/g)?.join(" ") || "";
    setValue("cardNumber", formatted, { shouldValidate: true });
  };

  const handleExpiryChange = (e) => {
    let value = e.target.value.replace(/\D/g, "");
    if (value.length > 4) value = value.slice(0, 4);
    let formatted = value;
    if (value.length > 2) {
      formatted = `${value.slice(0, 2)}/${value.slice(2)}`;
    }
    setValue("cardExpiry", formatted, { shouldValidate: true });
  };

  const handleCvvChange = (e) => {
    let value = e.target.value.replace(/\D/g, "");
    if (value.length > 3) value = value.slice(0, 3);
    setValue("cardCvv", value, { shouldValidate: true });
  };

  const handleNumericKeyDown = (e) => {
    if (
      ["Backspace", "Delete", "Tab", "Escape", "Enter"].includes(e.key) ||
      (e.key === "a" && (e.ctrlKey || e.metaKey)) ||
      e.key.startsWith("Arrow")
    ) {
      return;
    }
    if (!/^\d$/.test(e.key)) {
      e.preventDefault();
    }
  };

  const onSubmit = (data) => {
    setPaymentMethod(data.paymentMethod);
    Swal.fire({
      icon: "success",
      title: "Payment Details Saved",
      text: "Proceed to Review",
      timer: 1800,
      showConfirmButton: false,
    });
    setStep(3); // Moves to step 3 (Review Order)
  };

  return (
    <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6 md:p-8">
      <h2 className="font-serif text-xl font-semibold text-charcoal mb-6">
        Payment Method
      </h2>

      <div className="space-y-4 mb-8">
        {/* Credit / Debit Card Selector */}
        <label
          className={`flex items-center justify-between p-4 rounded-xl border cursor-pointer transition-all ${selectedMethod === "card"
              ? "border-charcoal bg-gray-50/50"
              : "border-gray-200 hover:border-gray-300"
            }`}
        >
          <div className="flex items-center gap-3">
            <input
              type="radio"
              value="card"
              {...register("paymentMethod")}
              className="hidden"
            />
            <div
              className={`w-4 h-4 rounded-full border-2 flex items-center justify-center ${selectedMethod === "card" ? "border-charcoal" : "border-gray-300"
                }`}
            >
              {selectedMethod === "card" && (
                <div className="w-2 h-2 rounded-full bg-charcoal" />
              )}
            </div>
            <div>
              <p className="text-sm font-semibold text-charcoal">
                Credit / Debit Card
              </p>
              <p className="text-xs text-medium-gray mt-0.5">
                Pay securely with your credit or debit card
              </p>
            </div>
          </div>
          <div className="flex gap-1.5 text-xl text-medium-gray">
            <i className="ri-visa-line" />
            <i className="ri-mastercard-line" />
          </div>
        </label>

        {/* UPI Selector */}
        <label
          className={`flex items-center justify-between p-4 rounded-xl border cursor-pointer transition-all ${selectedMethod === "upi"
              ? "border-charcoal bg-gray-50/50"
              : "border-gray-200 hover:border-gray-300"
            }`}
        >
          <div className="flex items-center gap-3">
            <input
              type="radio"
              value="upi"
              {...register("paymentMethod")}
              className="hidden"
            />
            <div
              className={`w-4 h-4 rounded-full border-2 flex items-center justify-center ${selectedMethod === "upi" ? "border-charcoal" : "border-gray-300"
                }`}
            >
              {selectedMethod === "upi" && (
                <div className="w-2 h-2 rounded-full bg-charcoal" />
              )}
            </div>
            <div>
              <p className="text-sm font-semibold text-charcoal">UPI Payment</p>
              <p className="text-xs text-medium-gray mt-0.5">
                Pay using Google Pay, PhonePe, or BHIM UPI
              </p>
            </div>
          </div>
          <span className="text-xs font-semibold px-2 py-0.5 bg-gray-100 rounded text-charcoal">
            UPI
          </span>
        </label>

        {/* Cash on Delivery Selector */}
        <label
          className={`flex items-center justify-between p-4 rounded-xl border cursor-pointer transition-all ${selectedMethod === "cod"
              ? "border-charcoal bg-gray-50/50"
              : "border-gray-200 hover:border-gray-300"
            }`}
        >
          <div className="flex items-center gap-3">
            <input
              type="radio"
              value="cod"
              {...register("paymentMethod")}
              className="hidden"
            />
            <div
              className={`w-4 h-4 rounded-full border-2 flex items-center justify-center ${selectedMethod === "cod" ? "border-charcoal" : "border-gray-300"
                }`}
            >
              {selectedMethod === "cod" && (
                <div className="w-2 h-2 rounded-full bg-charcoal" />
              )}
            </div>
            <div>
              <p className="text-sm font-semibold text-charcoal">
                Cash on Delivery (COD)
              </p>
              <p className="text-xs text-medium-gray mt-0.5">
                Pay with cash when your order is delivered
              </p>
            </div>
          </div>
          <i className="ri-wallet-line text-lg text-medium-gray" />
        </label>
      </div>

      <form onSubmit={handleSubmit(onSubmit)}>
        {selectedMethod === "card" && (
          <div className="space-y-4 mb-6">
            <div>
              <label className="block text-xs uppercase tracking-wider text-charcoal font-semibold mb-2">
                Cardholder Name
              </label>
              <input
                type="text"
                placeholder="John Doe"
                {...register("cardName")}
                className={`w-full rounded-xl px-4 py-3 text-sm border outline-none transition-all ${errors.cardName
                    ? "border-red-500"
                    : "border-gray-200 focus:border-charcoal"
                  }`}
              />
              {errors.cardName && (
                <p className="text-red-500 text-xs mt-1">{errors.cardName.message}</p>
              )}
            </div>

            <div>
              <label className="block text-xs uppercase tracking-wider text-charcoal font-semibold mb-2">
                Card Number
              </label>
              <div className="relative">
                <input
                  type="text"
                  placeholder="4000 1234 5678 9010"
                  onKeyDown={handleNumericKeyDown}
                  {...register("cardNumber", {
                    onChange: handleCardNumberChange,
                  })}
                  className={`w-full rounded-xl pl-4 pr-11 py-3 text-sm border outline-none transition-all ${errors.cardNumber
                      ? "border-red-500"
                      : "border-gray-200 focus:border-charcoal"
                    }`}
                />
                <i className="ri-bank-card-line absolute right-4 top-1/2 -translate-y-1/2 text-medium-gray text-lg" />
              </div>
              {errors.cardNumber && (
                <p className="text-red-500 text-xs mt-1">{errors.cardNumber.message}</p>
              )}
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-xs uppercase tracking-wider text-charcoal font-semibold mb-2">
                  Expiry Date
                </label>
                <input
                  type="text"
                  placeholder="MM/YY"
                  maxLength={5}
                  {...register("cardExpiry", {
                    onChange: handleExpiryChange,
                  })}
                  className={`w-full rounded-xl px-4 py-3 text-sm border outline-none transition-all ${errors.cardExpiry
                      ? "border-red-500"
                      : "border-gray-200 focus:border-charcoal"
                    }`}
                />
                {errors.cardExpiry && (
                  <p className="text-red-500 text-xs mt-1">{errors.cardExpiry.message}</p>
                )}
              </div>
              <div>
                <label className="block text-xs uppercase tracking-wider text-charcoal font-semibold mb-2">
                  CVV
                </label>
                <input
                  type="password"
                  placeholder="•••"
                  maxLength={3}
                  onKeyDown={handleNumericKeyDown}
                  {...register("cardCvv", {
                    onChange: handleCvvChange,
                  })}
                  className={`w-full rounded-xl px-4 py-3 text-sm border outline-none transition-all ${errors.cardCvv
                      ? "border-red-500"
                      : "border-gray-200 focus:border-charcoal"
                    }`}
                />
                {errors.cardCvv && (
                  <p className="text-red-500 text-xs mt-1">{errors.cardCvv.message}</p>
                )}
              </div>
            </div>
          </div>
        )}

        {selectedMethod === "upi" && (
          <div className="p-4 bg-gray-50 rounded-xl border border-gray-150 text-sm text-charcoal mb-6">
            <p className="font-semibold mb-2">UPI Direct Checkout</p>
            <p className="text-xs text-medium-gray leading-relaxed mb-3">
              Please enter your UPI ID (e.g. name@upi) to request payment from your UPI app.
            </p>
            <input
              type="text"
              placeholder="yours@upi"
              {...register("upiId")}
              className={`w-full rounded-xl px-4 py-3 text-sm border bg-white outline-none transition-all ${errors.upiId
                  ? "border-red-500"
                  : "border-gray-200 focus:border-charcoal"
                }`}
            />
            {errors.upiId && (
              <p className="text-red-500 text-xs mt-1">{errors.upiId.message}</p>
            )}
          </div>
        )}

        {selectedMethod === "cod" && (
          <div className="p-4 bg-gray-50 rounded-xl border border-gray-150 text-sm text-charcoal mb-6">
            <p className="font-semibold mb-2">Cash on Delivery Details</p>
            <p className="text-xs text-medium-gray leading-relaxed">
              Verify your phone number and address before finalizing the order. An additional service charge of $2.00 may apply for CODs.
            </p>
          </div>
        )}

        <div className="flex gap-4 mt-8">
          <button
            type="button"
            onClick={() => setStep(1)}
            className="flex-1 py-4 border border-gray-200 rounded-xl text-sm font-semibold text-charcoal hover:bg-gray-50 transition-all duration-300"
          >
            Back to Shipping
          </button>

          <button
            type="submit"
            className="flex-1 py-4 bg-coral text-white rounded-xl text-sm font-semibold hover:opacity-90 transition-all duration-300 cursor-pointer"
          >
            {selectedMethod === "cod" ? "Place COD Order" : "Pay & Complete"}
          </button>
        </div>
      </form>
    </div>
  );
};
