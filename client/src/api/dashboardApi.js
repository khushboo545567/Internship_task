import axios from "axios";

export const fetchDashboardStats = async () => {
  try {
    const response = await axios.get(
      `${import.meta.env.VITE_SERVER_URL}/api/v1/dashboard/stats`,
    );
    return response.data.stats;
  } catch (error) {
    console.error("Error fetching dashboard stats:", error);
    throw error;
  }
};

export const getRecentOrders = async () => {
  try {
    const response = await axios.get(
      `${import.meta.env.VITE_SERVER_URL}/api/v1/orders/get-recent-order`,
    );
    return response.data.orders;
  } catch (error) {
    console.error("Error fetching recent orders:", error);
    throw error;
  }
};
