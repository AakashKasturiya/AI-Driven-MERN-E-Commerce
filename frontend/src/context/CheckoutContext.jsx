import { createContext, useContext, useState } from "react";

export const CheckoutContext = createContext(null);

export const CheckoutProvider = ({ children }) => {
  const [shipping, setShipping] = useState(null);
  const [paymentMethod, setPaymentMethod] = useState("COD");

  const [step, setStep] = useState(1);

  const saveShipping = (data) => {
    setShipping(data);
    setStep(2);
  };

  const resetCheckout = () => {
    setShipping(null);
    setPaymentMethod("COD");
    setStep(1);
  };

  return (
    <CheckoutContext.Provider
      value={{
        shipping,
        saveShipping,
        paymentMethod,
        setPaymentMethod,
        resetCheckout,
        step,
        setStep,
      }}
    >
      {children}
    </CheckoutContext.Provider>
  );
};

export const useCheckout = () => useContext(CheckoutContext);