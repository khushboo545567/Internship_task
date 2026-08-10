import axios from "axios";

export const getOrders = async () => {
  try {
    const response = await axios.get(
      `${import.meta.env.VITE_SERVER_URL}/api/v1/orders/get`,
    );
    return response.data.orders;
  } catch (error) {
    console.error("Error fetching orders:", error);
    throw error;
  }
};

export const updateOrderStatus = async (id, status) => {
  try {
    const response = await axios.patch(
      `${import.meta.env.VITE_SERVER_URL}/api/v1/orders/update/${id}`,
      { status },
    );
    return response.data.order;
  } catch (error) {
    console.error("Error updating order status:", error);
    throw error;
  }
};
