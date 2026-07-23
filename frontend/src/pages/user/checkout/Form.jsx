import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import Swal from "sweetalert2";

import { checkoutSchema } from "../../../validation/checkoutSchema";
import { useCheckout } from "../../../context/CheckoutContext"

import { ContactInformation } from "../../../components/pages/checkout/form/ContactInformation";
import { ShippingAddress } from "../../../components/pages/checkout/form/ShippingAddress";
import { ShippingMethod } from "../../../components/pages/checkout/form/ShippingMethod";
import { CheckoutButton } from "../../../components/pages/checkout/form/CheckoutButton";

export const Form = () => {
    const { saveShipping } = useCheckout();

    const {
        register,
        watch,
        setValue,
        reset,
        handleSubmit,
        formState: { errors, isValid },
    } = useForm({
        resolver: zodResolver(checkoutSchema),
        mode: "onChange",
        defaultValues: {
            shippingMethod: "standard",
            newsletter: false,
        },
    });

    const onSubmit = (data) => {
        saveShipping(data);

        Swal.fire({
            icon: "success",
            title: "Shipping Address Saved",
            text: "Continue to Payment",
            timer: 1800,
            showConfirmButton: false,
        });

        reset();
    };

    return (
        <div>

            <ContactInformation
                register={register}
                errors={errors}
                watch={watch}
                setValue={setValue}
            />

            <ShippingAddress
                register={register}
                errors={errors}
            />

            <ShippingMethod
                register={register}
                errors={errors}
                watch={watch}
            />

            <CheckoutButton
                handleSubmit={handleSubmit}
                isValid={isValid}
                onSubmit={onSubmit}
            />

        </div>
    );
};