import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import cookieParser from "cookie-parser";
import connectDB from "./config/db.js";
import productRouter from "./router/product.route.js";
import OrderRouter from "./router/order.route.js";
import DashboardRouter from "./router/dashboard.route.js";

dotenv.config();

const app = express();

const PORT = process.env.PORT || 5000;

// middlewares
app.use(
  cors({
    origin: "http://localhost:5173",
    credentials: true,
  }),
);
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());

//  route
app.get("/", (req, res) => {
  res.status(200).json({
    message: "Server is running successfully",
  });
});

app.use("/api/v1/products", productRouter);
app.use("/api/v1/orders", OrderRouter);
app.use("/api/v1/dashboard", DashboardRouter);

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
  connectDB();
});
