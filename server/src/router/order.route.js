import express from "express";
import {
  createOrder,
  getOrders,
  getRecentOrders,
  updateOrderStatus,
} from "../controllers/order.controller.js";

const orderrouter = express.Router();

orderrouter.post("/create", createOrder);

orderrouter.get("/get", getOrders);

orderrouter.patch("/update/:id", updateOrderStatus);

orderrouter.get("/get-recent-order", getRecentOrders);
export default orderrouter;
