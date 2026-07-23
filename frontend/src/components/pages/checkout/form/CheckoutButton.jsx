import { useState } from "react";

export const CheckoutButton = ({
  handleSubmit,
  isValid,
  onSubmit,
}) => {
  const [loading, setLoading] = useState(false);

  const submitHandler = async (data) => {
    setLoading(true);

    try {
      await onSubmit(data);
    } finally {
      setLoading(false);
    }
  };

  return (
    <button
      type="button"
      onClick={handleSubmit(submitHandler)}
      disabled={loading}
      className="w-full py-4 rounded-xl text-sm font-semibold flex items-center justify-center gap-2 bg-coral text-white hover:opacity-90 transition-all duration-300 cursor-pointer"
    >
      {loading ? (
        <>
          <i className="ri-loader-4-line animate-spin" />
          Saving...
        </>
      ) : (
        <>
          Continue to Payment
          <i className="ri-arrow-right-line" />
        </>
      )}
    </button>
  );
};