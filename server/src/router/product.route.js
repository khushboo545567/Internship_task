import express from "express";
import {
  addProduct,
  deleteProduct,
  filterByCategory,
  filterByStatus,
  getProducts,
  sortByPrice,
  sortByStock,
  updateProduct,
} from "../controllers/product.controller.js";

const productrouter = express.Router();

productrouter.post("/add", addProduct);

productrouter.put("/update/:id", updateProduct);

productrouter.delete("/delete/:id", deleteProduct);

productrouter.get("/get-products", getProducts);

// filters and sort routes
productrouter.get("/sort-by-price", sortByPrice);
productrouter.get("/sort-by-stock", sortByStock);
productrouter.get("/filter-by-category", filterByCategory);
productrouter.get("/filter-by-status", filterByStatus);

export default productrouter;
