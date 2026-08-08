import express from "express";
import { getDashboardStats } from "../controllers/dashboard.controller.js";

const dashboardrouter = express.Router();

dashboardrouter.get("/stats", getDashboardStats);

export default dashboardrouter;
