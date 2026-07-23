import Order from "../models/order.model.js";
import Cart from "../models/cart.model.js";

export const placeOrder = async (req, res) => {
  try {

    const userId = req.user.userId;

    const {
      shippingAddress,
      paymentMethod
    } = req.body;

    const cart = await Cart.find({ user: userId }).populate("product");

    if (!cart.length) {
      return res.status(400).json({
        success: false,
        message: "Cart is empty"
      });
    }

    const items = cart.map(item => ({
      product: item.product._id,
      quantity: item.quantity,
      price: item.product.price
    }));

    const subtotal = cart.reduce((sum, item) => {
      return sum + item.product.price * item.quantity;
    }, 0);

    const shippingCharge = subtotal > 200 ? 0 : 20;

    const tax = subtotal * 0.18;

    const total = subtotal + shippingCharge + tax;

    const order = await Order.create({

      user: userId,

      items,

      shippingAddress,

      paymentMethod,

      subtotal,

      shippingCharge,

      tax,

      total

    });

    await Cart.deleteMany({ user: userId });

    res.status(201).json({
      success: true,
      order
    });

  } catch (error) {

    res.status(500).json({
      success: false,
      message: error.message
    });

  }
};

export const getMyOrders = async (req, res) => {
  try {
    const userId = req.user.userId;

    const orders = await Order.find({ user: userId })
      .populate("items.product")
      .sort({ createdAt: -1 });

    return res.status(200).json({
      success: true,
      orders,
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

export const getAllOrders = async (req, res) => {
  try {
    const orders = await Order.find()
      .populate("user", "name email")
      .populate("items.product")
      .sort({ createdAt: -1 });

    return res.status(200).json({
      success: true,
      orders,
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

export const updateOrderStatus = async (req, res) => {
  try {
    const { orderId, orderStatus } = req.body;

    const order = await Order.findById(orderId);

    if (!order) {
      return res.status(404).json({
        success: false,
        message: "Order not found",
      });
    }

    order.orderStatus = orderStatus;
    await order.save();

    return res.status(200).json({
      success: true,
      message: "Order status updated",
      order,
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};