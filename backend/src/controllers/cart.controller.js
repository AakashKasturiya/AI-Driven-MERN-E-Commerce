// ==========================================
// Add To Cart - START
// ==========================================

import Cart from "../models/cart.model.js";

export const addToCart = async (req, res) => {
  try {
    const { productId, quantity } = req.body;

    const userId = req.user.userId;

    const existingItem = await Cart.findOne({
      user: userId,
      product: productId,
    });

    if (existingItem) {
      existingItem.quantity += quantity || 1;
      await existingItem.save();

      return res.status(200).json({
        success: true,
        message: "Cart updated successfully",
        cart: existingItem,
      });
    }

    const cartItem = await Cart.create({
      user: userId,
      product: productId,
      quantity: quantity || 1,
    });

    return res.status(201).json({
      success: true,
      message: "Product added to cart",
      cart: cartItem,
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

// ==========================================
// Add To Cart - END
// ==========================================

// ==========================================
// Get Cart - START
// ==========================================

export const getCart = async (req, res) => {
  try {
    const userId = req.user.userId;

    const cart = await Cart.find({ user: userId }).populate("product");

    return res.status(200).json({
      success: true,
      cart,
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

// ==========================================
// Get Cart - END
// ==========================================


// ==========================================
// Update Cart Quantity - START
// ==========================================

// ==========================================
// Update Cart Quantity - START
// ==========================================

export const updateCart = async (req, res) => {
  try {
    const { cartId } = req.params;
    const { quantity } = req.body;

    if (quantity < 1) {
      return res.status(400).json({
        success: false,
        message: "Quantity must be at least 1",
      });
    }

    const cartItem = await Cart.findOne({
      _id: cartId,
      user: req.user.userId,
    });

    if (!cartItem) {
      return res.status(404).json({
        success: false,
        message: "Cart item not found",
      });
    }

    cartItem.quantity = quantity;
    await cartItem.save();

    return res.status(200).json({
      success: true,
      message: "Cart updated successfully",
      cart: cartItem,
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

// ==========================================
// Update Cart Quantity - END
// ==========================================

// ==========================================
// Remove From Cart - START
// ==========================================

// ==========================================
// Remove From Cart - START
// ==========================================

export const removeFromCart = async (req, res) => {
  try {
    const { cartId } = req.params;

    const deleted = await Cart.findOneAndDelete({
      _id: cartId,
      user: req.user.userId,
    });

    if (!deleted) {
      return res.status(404).json({
        success: false,
        message: "Cart item not found",
      });
    }

    return res.status(200).json({
      success: true,
      message: "Item removed from cart",
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

// ==========================================
// Remove From Cart - END
// ==========================================

// ==========================================
// Remove From Cart - END
// ==========================================