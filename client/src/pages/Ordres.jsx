import React, { useEffect, useState } from "react";
import { getOrders, updateOrderStatus } from "../api/orderApi";
import { toast } from "react-toastify";

const STATUS_OPTIONS = ["pending", "processing", "completed", "cancelled"];

function Orders() {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const [editingOrder, setEditingOrder] = useState(null);
  const [selectedStatus, setSelectedStatus] = useState("");
  const [updating, setUpdating] = useState(false);

  useEffect(() => {
    loadOrders();
  }, []);

  const loadOrders = async () => {
    try {
      setLoading(true);

      const data = await getOrders();

      setOrders(data);
    } catch (err) {
      setError("Failed to load orders. Please try again.");

      toast.error("Failed to load orders. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  const getStatusStyle = (status) => {
    switch (status) {
      case "pending":
        return "bg-yellow-100 text-yellow-700";

      case "processing":
        return "bg-blue-100 text-blue-700";

      case "completed":
        return "bg-green-100 text-green-700";

      case "cancelled":
        return "bg-red-100 text-red-700";

      default:
        return "bg-gray-100 text-gray-700";
    }
  };

  const openUpdateModal = (order) => {
    setEditingOrder(order);
    setSelectedStatus(order.status);
  };

  const closeUpdateModal = () => {
    setEditingOrder(null);
    setSelectedStatus("");
  };

  const handleUpdate = async () => {
    if (!editingOrder) return;

    try {
      setUpdating(true);

      const updatedOrder = await updateOrderStatus(
        editingOrder._id,
        selectedStatus,
      );

      // Update local state
      setOrders((prev) =>
        prev.map((o) => (o._id === updatedOrder._id ? updatedOrder : o)),
      );

      toast.success("Order status updated successfully!");

      closeUpdateModal();
    } catch (err) {
      toast.error("Failed to update order status. Please try again.");
    } finally {
      setUpdating(false);
    }
  };

  if (loading) {
    return <div className="p-4 sm:p-6">Loading orders...</div>;
  }

  if (error) {
    return <div className="p-4 text-red-600 sm:p-6">{error}</div>;
  }

  return (
    <div className="w-full p-4 sm:p-5 md:p-6">
      <div className="mb-5 sm:mb-6">
        <h1 className="text-2xl font-bold text-gray-800 sm:text-3xl">Orders</h1>

        <p className="mt-1 text-sm text-gray-500 sm:text-base">
          Manage and track customer orders
        </p>
      </div>

      <div className="overflow-hidden rounded-xl border border-gray-200 bg-white shadow-sm">
        {/* Horizontal scroll on mobile */}
        <div className="w-full overflow-x-auto">
          <table className="w-full min-w-212.5">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-4 py-3 text-left text-sm font-semibold text-gray-600 sm:px-6 sm:py-4">
                  Customer
                </th>

                <th className="px-4 py-3 text-left text-sm font-semibold text-gray-600 sm:px-6 sm:py-4">
                  Items
                </th>

                <th className="px-4 py-3 text-left text-sm font-semibold text-gray-600 sm:px-6 sm:py-4">
                  Total Amount
                </th>

                <th className="px-4 py-3 text-left text-sm font-semibold text-gray-600 sm:px-6 sm:py-4">
                  Status
                </th>

                <th className="px-4 py-3 text-left text-sm font-semibold text-gray-600 sm:px-6 sm:py-4">
                  Order Date
                </th>

                <th className="px-4 py-3 text-left text-sm font-semibold text-gray-600 sm:px-6 sm:py-4">
                  Actions
                </th>
              </tr>
            </thead>

            <tbody className="divide-y divide-gray-200">
              {orders.length === 0 ? (
                <tr>
                  <td
                    colSpan={6}
                    className="px-4 py-8 text-center text-gray-500 sm:px-6"
                  >
                    No orders found.
                  </td>
                </tr>
              ) : (
                orders.map((order) => (
                  <tr key={order._id} className="hover:bg-gray-50">
                    <td className="px-4 py-4 sm:px-6">
                      <p className="font-medium text-gray-800">
                        {order.customerName}
                      </p>
                    </td>

                    <td className="px-4 py-4 sm:px-6">
                      <div className="space-y-1">
                        {order.items.map((item, index) => (
                          <div key={index} className="text-sm">
                            <span className="font-medium text-gray-700">
                              {item.productName}
                            </span>

                            <span className="ml-2 text-gray-500">
                              × {item.quantity}
                            </span>
                          </div>
                        ))}
                      </div>
                    </td>

                    <td className="px-4 py-4 font-semibold text-gray-800 sm:px-6">
                      ₹{order.totalAmount.toLocaleString("en-IN")}
                    </td>

                    <td className="px-4 py-4 sm:px-6">
                      <span
                        className={`rounded-full px-2.5 py-1 text-xs font-semibold capitalize sm:px-3 ${getStatusStyle(
                          order.status,
                        )}`}
                      >
                        {order.status}
                      </span>
                    </td>

                    <td className="px-4 py-4 text-sm text-gray-600 sm:px-6">
                      {new Date(order.orderDate).toLocaleDateString("en-IN")}
                    </td>

                    <td className="px-4 py-4 sm:px-6">
                      <button
                        onClick={() => openUpdateModal(order)}
                        className="whitespace-nowrap rounded-lg bg-gray-100 px-3 py-2 text-sm font-medium text-gray-700 hover:bg-gray-200"
                      >
                        Update
                      </button>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>

      {/* Update Status Popup */}
      {editingOrder && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 p-3 sm:p-4">
          <div className="w-full max-w-sm rounded-xl bg-white p-4 shadow-lg sm:p-6">
            <h2 className="text-lg font-semibold text-gray-800">
              Update Order Status
            </h2>

            <p className="mt-1 text-sm text-gray-500">
              Order for{" "}
              <span className="font-medium">{editingOrder.customerName}</span>
            </p>

            <div className="mt-4">
              <label className="mb-1 block text-sm font-medium text-gray-700">
                Status
              </label>

              <select
                value={selectedStatus}
                onChange={(e) => setSelectedStatus(e.target.value)}
                className="w-full rounded-lg border border-gray-300 px-3 py-2 text-sm focus:border-blue-500 focus:outline-none"
              >
                {STATUS_OPTIONS.map((status) => (
                  <option key={status} value={status}>
                    {status.charAt(0).toUpperCase() + status.slice(1)}
                  </option>
                ))}
              </select>
            </div>

            <div className="mt-6 flex flex-col-reverse gap-2 sm:flex-row sm:justify-end sm:gap-3">
              <button
                onClick={closeUpdateModal}
                disabled={updating}
                className="w-full rounded-lg px-4 py-2 text-sm font-medium text-gray-600 hover:bg-gray-100 sm:w-auto"
              >
                Cancel
              </button>

              <button
                onClick={handleUpdate}
                disabled={updating}
                className="w-full rounded-lg bg-blue-600 px-4 py-2 text-sm font-medium text-white hover:bg-blue-700 disabled:opacity-50 sm:w-auto"
              >
                {updating ? "Updating..." : "Save Changes"}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default Orders;
