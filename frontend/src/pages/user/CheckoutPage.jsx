import { useCheckout } from "../../context/CheckoutContext";
import { StepsHeader } from "./checkout/StepsHeader";
import { Form } from "./checkout/Form";
import { Summary } from "./checkout/Summary";
import { PaymentMethod } from "../../components/pages/checkout/PaymentMethod";
import { ReviewOrder } from "../../components/pages/checkout/ReviewOrder";
import { SuccessOrder } from "../../components/pages/checkout/SuccessOrder";

export const CheckoutPage = () => {
  const { step } = useCheckout();

  return (
    <>
      <main className="pt-24 md:pt-28 pb-20 px-6 md:px-12 lg:px-16 max-w-7xl mx-auto">
        <div className="mb-8" style={{ opacity: 1, transform: "none" }}>
          <h1 className="font-serif text-2xl md:text-3xl font-semibold text-charcoal">
            Checkout
          </h1>
        </div>

        {step < 4 ? (
          <>
            <StepsHeader currentStep={step} />
            <div className="grid grid-cols-1 lg:grid-cols-5 gap-10 lg:gap-16">
              <div className="lg:col-span-3">
                {step === 1 && <Form />}
                {step === 2 && <PaymentMethod />}
                {step === 3 && <ReviewOrder />}
              </div>
              <div className="lg:col-span-2">
                <Summary />
              </div>
            </div>
          </>
        ) : (
          <SuccessOrder />
        )}
      </main>
    </>
  );
};
