import Order from "../models/orders.model.js";
import Product from "../models/product.model.js";

export const getDashboardStats = async (req, res) => {
  try {
    const [totalProducts, totalOrders, pendingOrders, revenueResult] =
      await Promise.all([
        Product.countDocuments(),
        Order.countDocuments(),
        Order.countDocuments({ status: "pending" }),
        Order.aggregate([
          { $group: { _id: null, total: { $sum: "$totalAmount" } } },
        ]),
      ]);

    const totalRevenue = revenueResult.length > 0 ? revenueResult[0].total : 0;

    return res.status(200).json({
      message: "Dashboard stats fetched successfully",
      stats: {
        totalProducts,
        totalOrders,
        totalRevenue,
        pendingOrders,
      },
    });
  } catch (error) {
    console.error(error);
    return res
      .status(500)
      .json({ message: "Something went wrong while fetching dashboard stats" });
  }
};
