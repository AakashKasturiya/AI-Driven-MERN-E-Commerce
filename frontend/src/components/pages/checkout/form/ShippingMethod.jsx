export const ShippingMethod = ({
  register,
  watch,
  errors,
}) => {
  const shippingMethod = watch("shippingMethod");

  return (
    <div className="mb-8">
      <h2 className="font-serif text-lg font-semibold text-charcoal mb-4">
        Shipping Method
      </h2>

      <div className="space-y-3">

        {/* Standard Shipping */}

        <label
          className={`flex items-center justify-between p-4 rounded-xl border cursor-pointer transition-all ${
            shippingMethod === "standard"
              ? "border-charcoal bg-gray-50"
              : "border-gray-200 hover:border-gray-300"
          }`}
        >
          <div className="flex items-center gap-3">

            <input
              type="radio"
              value="standard"
              {...register("shippingMethod")}
              className="hidden"
            />

            <div
              className={`w-4 h-4 rounded-full border-2 flex items-center justify-center ${
                shippingMethod === "standard"
                  ? "border-charcoal"
                  : "border-gray-300"
              }`}
            >
              {shippingMethod === "standard" && (
                <div className="w-2 h-2 rounded-full bg-charcoal" />
              )}
            </div>

            <div>
              <p className="text-sm font-medium text-charcoal">
                Standard Shipping
              </p>

              <p className="text-xs text-medium-gray">
                Delivery in 5-7 business days
              </p>
            </div>
          </div>

          <span className="text-sm font-semibold text-green-600">
            FREE
          </span>
        </label>

        {/* Express Shipping */}

        <label
          className={`flex items-center justify-between p-4 rounded-xl border cursor-pointer transition-all ${
            shippingMethod === "express"
              ? "border-charcoal bg-gray-50"
              : "border-gray-200 hover:border-gray-300"
          }`}
        >
          <div className="flex items-center gap-3">

            <input
              type="radio"
              value="express"
              {...register("shippingMethod")}
              className="hidden"
            />

            <div
              className={`w-4 h-4 rounded-full border-2 flex items-center justify-center ${
                shippingMethod === "express"
                  ? "border-charcoal"
                  : "border-gray-300"
              }`}
            >
              {shippingMethod === "express" && (
                <div className="w-2 h-2 rounded-full bg-charcoal" />
              )}
            </div>

            <div>
              <p className="text-sm font-medium text-charcoal">
                Express Shipping
              </p>

              <p className="text-xs text-medium-gray">
                Delivery in 2-3 business days
              </p>
            </div>
          </div>

          <span className="text-sm font-semibold text-charcoal">
            + $25
          </span>
        </label>

        {errors.shippingMethod && (
          <p className="text-xs text-red-500 mt-1">
            {errors.shippingMethod.message}
          </p>
        )}

      </div>
    </div>
  );
};