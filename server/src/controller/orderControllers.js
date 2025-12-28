const Order = require("../models/orderModel");

const createOrder = async (req, res) => {
  try {
    const { items, totalAmount } = req.body;

    // Validation
    if (!items || items.length === 0) {
      return res.status(400).json({ 
        success: false,
        message: "No order items provided" 
      });
    }

    if (!totalAmount || typeof totalAmount !== 'number' || totalAmount <= 0) {
      return res.status(400).json({ 
        success: false,
        message: "Invalid total amount" 
      });
    }

    // Validate each item has required fields
    for (const item of items) {
      if (!item.productId || !item.name || !item.price || !item.quantity) {
        return res.status(400).json({ 
          success: false,
          message: "Invalid item data. All items must have productId, name, price, and quantity" 
        });
      }
    }

    const order = await Order.create({
      user: req.user.id,
      items,
      totalAmount,
    });

    // Populate product details if needed
    await order.populate('items.productId', 'name image');

    return res.status(201).json({
      success: true,
      message: "Order created successfully",
      data: order,
    });
  } catch (error) {
    console.error("Create order error:", error);
    return res.status(500).json({
      success: false,
      message: "Failed to create order",
      error: error.message,
    });
  }
};

const getUserOrders = async (req, res) => {
  try {
    const orders = await Order.find({ user: req.user.id })
      .populate('items.productId', 'name image price')
      .sort({ createdAt: -1 });

    return res.status(200).json({
      success: true,
      message: "Orders fetched successfully",
      data: orders,
    });
  } catch (error) {
    console.error("Get user orders error:", error);
    return res.status(500).json({
      success: false,
      message: "Failed to fetch orders",
      error: error.message,
    });
  }
};

module.exports = { createOrder, getUserOrders };