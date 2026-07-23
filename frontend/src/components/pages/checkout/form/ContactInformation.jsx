import { useEffect } from "react";

export const ContactInformation = ({ register, errors, watch, setValue }) => {
  const user = JSON.parse(localStorage.getItem("user") || "null");

  useEffect(() => {
    if (user?.email) {
      setValue("email", user.email);
    }
  }, [setValue, user]);

  return (
    <div className="mb-8">
      <h2 className="font-serif text-lg font-semibold text-charcoal mb-4">
        Contact Information
      </h2>

      <input
        type="email"
        placeholder="Email Address"
        autoComplete="email"
        {...register("email")}
        className={`w-full rounded-xl px-4 py-3 text-sm border transition-all outline-none ${
          errors.email
            ? "border-red-500"
            : "border-gray-200 focus:border-charcoal"
        }`}
      />

      {errors.email && (
        <p className="text-red-500 text-xs mt-1">
          {errors.email.message}
        </p>
      )}

      <label className="flex items-center gap-2 mt-4 text-sm text-medium-gray cursor-pointer">
        <input
          type="checkbox"
          {...register("newsletter")}
          className="w-4 h-4 rounded border-gray-300"
        />

        Email me with news and offers
      </label>

      {watch("newsletter") && (
        <p className="text-xs text-green-600 mt-2">
          ✓ You will receive offers and latest collections.
        </p>
      )}
    </div>
  );
};