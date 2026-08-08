import React, { useEffect, useState } from "react";
import { fetchDashboardStats, getRecentOrders } from "../api/dashboardApi";

function Dashboard() {
  const [stats, setStats] = useState({
    totalProducts: 0,
    totalOrders: 0,
    totalRevenue: 0,
    pendingOrders: 0,
  });

  const [recentOrders, setRecentOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const loadDashboardData = async () => {
      try {
        setLoading(true);

        const [statsData, ordersData] = await Promise.all([
          fetchDashboardStats(),
          getRecentOrders(),
        ]);

        setStats(statsData);
        setRecentOrders(ordersData);
      } catch (err) {
        setError("Failed to load dashboard data. Please try again.");
      } finally {
        setLoading(false);
      }
    };

    loadDashboardData();
  }, []);

  const getStatusStyle = (status) => {
    const normalized = status?.toLowerCase();

    switch (normalized) {
      case "completed":
        return "bg-green-100 text-green-700";

      case "pending":
        return "bg-yellow-100 text-yellow-700";

      case "processing":
        return "bg-blue-100 text-blue-700";

      case "cancelled":
        return "bg-red-100 text-red-700";

      default:
        return "bg-gray-100 text-gray-700";
    }
  };

  const getProductLabel = (order) => {
    if (!order.items || order.items.length === 0) return "—";

    const firstItem = order.items[0].productName;
    const extra = order.items.length - 1;

    return extra > 0 ? `${firstItem} +${extra} more` : firstItem;
  };

  if (loading) {
    return <div className="text-center py-6">Loading dashboard...</div>;
  }

  if (error) {
    return <div className="text-center py-6 text-red-600">{error}</div>;
  }

  return (
    <div className="w-full">
      <h1 className="mb-6 text-2xl font-bold sm:text-3xl">Dashboard</h1>

      {/* Statistics Cards */}
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4 lg:gap-6">
        <div className="rounded-xl bg-white p-4 shadow-sm sm:p-6">
          <p className="text-sm text-gray-500 sm:text-base">Total Products</p>

          <h3 className="mt-2 text-2xl font-bold sm:text-3xl">
            {stats.totalProducts}
          </h3>
        </div>

        <div className="rounded-xl bg-white p-4 shadow-sm sm:p-6">
          <p className="text-sm text-gray-500 sm:text-base">Total Orders</p>

          <h3 className="mt-2 text-2xl font-bold sm:text-3xl">
            {stats.totalOrders}
          </h3>
        </div>

        <div className="rounded-xl bg-white p-4 shadow-sm sm:p-6">
          <p className="text-sm text-gray-500 sm:text-base">Pending Orders</p>

          <h3 className="mt-2 text-2xl font-bold sm:text-3xl">
            {stats.pendingOrders}
          </h3>
        </div>

        <div className="rounded-xl bg-white p-4 shadow-sm sm:p-6">
          <p className="text-sm text-gray-500 sm:text-base">Revenue</p>

          <h3 className="mt-2 text-2xl font-bold sm:text-3xl">
            ₹{stats.totalRevenue.toLocaleString()}
          </h3>
        </div>
      </div>

      {/* Recent Orders */}
      <div className="mt-6 rounded-xl bg-white p-4 shadow-sm sm:mt-8 sm:p-6">
        <div className="mb-5 flex flex-col gap-3 sm:mb-6 sm:flex-row sm:items-center sm:justify-between">
          <h2 className="text-lg font-semibold sm:text-xl">Recent Orders</h2>

          <button className="self-start text-sm font-medium text-blue-600 hover:underline sm:self-auto">
            View All
          </button>
        </div>

        <div className="overflow-x-auto">
          {recentOrders.length === 0 ? (
            <p className="py-6 text-center text-gray-500">No orders yet.</p>
          ) : (
            <table className="w-full min-w-162.5">
              <thead>
                <tr className="border-b text-left text-gray-500">
                  <th className="px-3 py-3 text-sm sm:px-4">Order ID</th>

                  <th className="px-3 py-3 text-sm sm:px-4">Customer</th>

                  <th className="px-3 py-3 text-sm sm:px-4">Product</th>

                  <th className="px-3 py-3 text-sm sm:px-4">Amount</th>

                  <th className="px-3 py-3 text-sm sm:px-4">Status</th>
                </tr>
              </thead>

              <tbody>
                {recentOrders.map((order) => (
                  <tr
                    key={order._id}
                    className="border-b last:border-b-0 hover:bg-gray-50"
                  >
                    <td className="px-3 py-4 text-sm font-medium sm:px-4">
                      #{order._id.slice(-6).toUpperCase()}
                    </td>

                    <td className="px-3 py-4 text-sm text-gray-600 sm:px-4">
                      {order.customerName}
                    </td>

                    <td className="max-w-45 truncate px-3 py-4 text-sm text-gray-600 sm:px-4">
                      {getProductLabel(order)}
                    </td>

                    <td className="px-3 py-4 text-sm font-medium sm:px-4">
                      ₹{order.totalAmount.toLocaleString()}
                    </td>

                    <td className="px-3 py-4 sm:px-4">
                      <span
                        className={`rounded-full px-2 py-1 text-xs font-medium capitalize sm:px-3 ${getStatusStyle(
                          order.status,
                        )}`}
                      >
                        {order.status}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          )}
        </div>
      </div>
    </div>
  );
}

export default Dashboard;
