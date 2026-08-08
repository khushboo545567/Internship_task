import Order from "../models/orders.model.js";

export const getOrders = async (req, res) => {
  try {
    const orders = await Order.find().sort({ orderDate: -1 });

    return res.status(200).json({
      message: "Orders fetched successfully",
      count: orders.length,
      orders,
    });
  } catch (error) {
    console.error(error);
    return res
      .status(500)
      .json({ message: "Something went wrong while fetching orders" });
  }
};

export const createOrder = async (req, res) => {
  try {
    const { customerName, items, totalAmount, status } = req.body;

    if (!customerName) {
      return res.status(400).json({
        message: "Customer name is required",
      });
    }

    // Validate items
    if (!items || !Array.isArray(items) || items.length === 0) {
      return res.status(400).json({
        message: "Order must contain at least one item",
      });
    }

    // Validate each item
    for (const item of items) {
      if (!item.product) {
        return res.status(400).json({
          message: "Product ID is required for every item",
        });
      }

      if (!item.productName) {
        return res.status(400).json({
          message: "Product name is required for every item",
        });
      }

      if (!item.quantity || item.quantity < 1) {
        return res.status(400).json({
          message: "Quantity must be at least 1",
        });
      }

      if (item.price === undefined || item.price < 0) {
        return res.status(400).json({
          message: "Price must be a valid positive number",
        });
      }
    }

    if (totalAmount === undefined || totalAmount < 0) {
      return res.status(400).json({
        message: "Total amount must be a valid positive number",
      });
    }

    // Create order
    const order = await Order.create({
      customerName,
      items,
      totalAmount,
      status,
    });

    return res.status(201).json({
      message: "Order created successfully",
      order,
    });
  } catch (error) {
    console.error("Create order error:", error);

    return res.status(500).json({
      message: "Something went wrong while creating order",
    });
  }
};

export const updateOrderStatus = async (req, res) => {
  try {
    const { id } = req.params;
    const { status } = req.body;

    const allowedStatuses = ["pending", "processing", "completed", "cancelled"];

    if (!status || !allowedStatuses.includes(status)) {
      return res.status(400).json({
        message: `Status must be one of: ${allowedStatuses.join(", ")}`,
      });
    }

    const updatedOrder = await Order.findByIdAndUpdate(
      id,
      { status },
      { new: true },
    );

    if (!updatedOrder) {
      return res.status(404).json({ message: "Order not found" });
    }

    return res.status(200).json({
      message: "Order status updated successfully",
      order: updatedOrder,
    });
  } catch (error) {
    console.error(error);
    return res
      .status(500)
      .json({ message: "Something went wrong while updating order status" });
  }
};

// recent orders
export const getRecentOrders = async (req, res) => {
  try {
    const recentOrders = await Order.find()
      .sort({ createdAt: -1 })
      .limit(5)
      .populate("items.product", "name category price");

    res.status(200).json({
      success: true,
      count: recentOrders.length,
      orders: recentOrders,
    });
  } catch (error) {
    console.error("Error fetching recent orders:", error);

    res.status(500).json({
      success: false,
      message: "Failed to fetch recent orders",
      error: error.message,
    });
  }
};
