import { z } from "zod";

export const checkoutSchema = z.object({
  email: z.string().email("Enter a valid email"),

  newsletter: z.boolean().optional(),

  firstName: z.string().min(2, "First name is required"),

  lastName: z.string().min(2, "Last name is required"),

  address: z.string().min(5, "Address is required"),

  apartment: z.string().optional(),

  city: z.string().min(2, "City is required"),

  state: z.string().min(1, "Select your state"),

  zipCode: z
    .string()
    .regex(/^\d{6}$/, "Enter valid 6 digit pincode"),

  phone: z
    .string()
    .regex(/^[6-9]\d{9}$/, "Enter valid mobile number"),

  shippingMethod: z.enum(["standard", "express"]),
});