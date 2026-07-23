const states = [
  "Andhra Pradesh",
  "Arunachal Pradesh",
  "Assam",
  "Bihar",
  "Chhattisgarh",
  "Delhi",
  "Goa",
  "Gujarat",
  "Haryana",
  "Himachal Pradesh",
  "Jharkhand",
  "Karnataka",
  "Kerala",
  "Madhya Pradesh",
  "Maharashtra",
  "Odisha",
  "Punjab",
  "Rajasthan",
  "Tamil Nadu",
  "Telangana",
  "Uttar Pradesh",
  "Uttarakhand",
  "West Bengal",
];

export const ShippingAddress = ({
  register,
  errors,
}) => {
  return (
    <div className="mb-8">

      <h2 className="font-serif text-lg font-semibold text-charcoal mb-4">
        Shipping Address
      </h2>

      <div className="grid grid-cols-2 gap-3 mb-3">

        <div>
          <input
            type="text"
            placeholder="First Name"
            {...register("firstName")}
            className={`w-full rounded-xl px-4 py-3 border outline-none transition-all ${
              errors.firstName
                ? "border-red-500"
                : "border-gray-200 focus:border-charcoal"
            }`}
          />

          {errors.firstName && (
            <p className="text-xs text-red-500 mt-1">
              {errors.firstName.message}
            </p>
          )}
        </div>

        <div>
          <input
            type="text"
            placeholder="Last Name"
            {...register("lastName")}
            className={`w-full rounded-xl px-4 py-3 border outline-none transition-all ${
              errors.lastName
                ? "border-red-500"
                : "border-gray-200 focus:border-charcoal"
            }`}
          />

          {errors.lastName && (
            <p className="text-xs text-red-500 mt-1">
              {errors.lastName.message}
            </p>
          )}
        </div>

      </div>

      <div className="mb-3">

        <input
          type="text"
          placeholder="Address"
          {...register("address")}
          className={`w-full rounded-xl px-4 py-3 border outline-none transition-all ${
            errors.address
              ? "border-red-500"
              : "border-gray-200 focus:border-charcoal"
          }`}
        />

        {errors.address && (
          <p className="text-xs text-red-500 mt-1">
            {errors.address.message}
          </p>
        )}

      </div>

      <div className="mb-3">

        <input
          type="text"
          placeholder="Apartment, Suite (Optional)"
          {...register("apartment")}
          className="w-full rounded-xl px-4 py-3 border border-gray-200 outline-none focus:border-charcoal transition-all"
        />

      </div>

      <div className="grid grid-cols-3 gap-3 mb-3">

        <div>
          <input
            type="text"
            placeholder="City"
            {...register("city")}
            className={`w-full rounded-xl px-4 py-3 border outline-none transition-all ${
              errors.city
                ? "border-red-500"
                : "border-gray-200 focus:border-charcoal"
            }`}
          />

          {errors.city && (
            <p className="text-xs text-red-500 mt-1">
              {errors.city.message}
            </p>
          )}
        </div>

        <div>

          <select
            {...register("state")}
            className={`w-full rounded-xl px-4 py-3 border outline-none transition-all ${
              errors.state
                ? "border-red-500"
                : "border-gray-200 focus:border-charcoal"
            }`}
          >
            <option value="">Select State</option>

            {states.map((state) => (
              <option
                key={state}
                value={state}
              >
                {state}
              </option>
            ))}

          </select>

          {errors.state && (
            <p className="text-xs text-red-500 mt-1">
              {errors.state.message}
            </p>
          )}

        </div>

        <div>

          <input
            type="text"
            maxLength={6}
            placeholder="Pincode"
            {...register("zipCode")}
            className={`w-full rounded-xl px-4 py-3 border outline-none transition-all ${
              errors.zipCode
                ? "border-red-500"
                : "border-gray-200 focus:border-charcoal"
            }`}
          />

          {errors.zipCode && (
            <p className="text-xs text-red-500 mt-1">
              {errors.zipCode.message}
            </p>
          )}

        </div>

      </div>

      <div>

        <input
          type="tel"
          maxLength={10}
          placeholder="Mobile Number"
          {...register("phone")}
          className={`w-full rounded-xl px-4 py-3 border outline-none transition-all ${
            errors.phone
              ? "border-red-500"
              : "border-gray-200 focus:border-charcoal"
          }`}
        />

        {errors.phone && (
          <p className="text-xs text-red-500 mt-1">
            {errors.phone.message}
          </p>
        )}

      </div>

    </div>
  );
};