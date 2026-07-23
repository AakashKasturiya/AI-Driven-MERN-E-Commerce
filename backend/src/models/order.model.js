import mongoose from "mongoose";

const orderSchema = new mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },

    items: [
      {
        product: {
          type: mongoose.Schema.Types.ObjectId,
          ref: "Product",
        },
        quantity: Number,
        price: Number,
      },
    ],

    shippingAddress: {
      firstName: String,
      lastName: String,
      email: String,
      address: String,
      apartment: String,
      city: String,
      state: String,
      zipCode: String,
      phone: String,
    },

    paymentMethod: {
      type: String,
      default: "COD",
    },

    paymentStatus: {
      type: String,
      default: "Pending",
    },

    orderStatus: {
      type: String,
      default: "Processing",
    },

    subtotal: Number,
    shippingCharge: Number,
    tax: Number,
    total: Number,
  },
  {
    timestamps: true,
  }
);

export default mongoose.model("Order", orderSchema);