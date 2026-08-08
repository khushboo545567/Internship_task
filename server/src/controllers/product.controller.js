import Product from "../models/product.model.js";

export const addProduct = async (req, res) => {
  try {
    const { name, category, price, stock, description, imageUrl, status } =
      req.body;

    if (!name || !category) {
      return res
        .status(400)
        .json({ message: "Name and category are required" });
    }

    if (price === undefined || price <= 0) {
      return res.status(400).json({ message: "Price must be greater than 0" });
    }

    if (stock === undefined || stock < 0) {
      return res.status(400).json({ message: "Stock cannot be negative" });
    }

    const product = await Product.create({
      name,
      category,
      price,
      stock,
      description,
      imageUrl,
      status,
    });

    return res.status(201).json({
      message: "Product created successfully",
      product,
    });
  } catch (error) {
    console.error(error);

    return res
      .status(500)
      .json({ message: "Something went wrong while creating product" });
  }
};

export const updateProduct = async (req, res) => {
  try {
    const { id } = req.params;
    const { name, category, price, stock, description, imageUrl, status } =
      req.body;

    const existingProduct = await Product.findById(id);
    if (!existingProduct) {
      return res.status(404).json({ message: "Product not found" });
    }

    if (name !== undefined && name.trim() === "") {
      return res.status(400).json({ message: "Product name cannot be empty" });
    }

    if (category !== undefined && category.trim() === "") {
      return res.status(400).json({ message: "Category cannot be empty" });
    }

    if (price !== undefined && price <= 0) {
      return res.status(400).json({ message: "Price must be greater than 0" });
    }

    if (stock !== undefined && stock < 0) {
      return res.status(400).json({ message: "Stock cannot be negative" });
    }

    const updatedProduct = await Product.findByIdAndUpdate(
      id,
      { name, category, price, stock, description, imageUrl, status },
      { new: true, runValidators: true },
    );

    return res.status(200).json({
      message: "Product updated successfully",
      product: updatedProduct,
    });
  } catch (error) {
    console.error(error);

    return res
      .status(500)
      .json({ message: "Something went wrong while updating product" });
  }
};

export const deleteProduct = async (req, res) => {
  try {
    const { id } = req.params;

    const deletedProduct = await Product.findByIdAndDelete(id);

    if (!deletedProduct) {
      return res.status(404).json({ message: "Product not found" });
    }

    return res.status(200).json({
      message: "Product deleted successfully",
      product: deletedProduct,
    });
  } catch (error) {
    console.error(error);

    return res
      .status(500)
      .json({ message: "Something went wrong while deleting product" });
  }
};

export const getProducts = async (req, res) => {
  try {
    const products = await Product.find();

    return res.status(200).json({
      message: "Products fetched successfully",
      count: products.length,
      products,
    });
  } catch (error) {
    console.error(error);
    return res
      .status(500)
      .json({ message: "Something went wrong while fetching products" });
  }
};

// sorting  by price and stock

// price low to high and hight to low

export const sortByPrice = async (req, res) => {
  try {
    const { order } = req.query;
    const sortOrder = order === "desc" ? -1 : 1; // default ascending

    const products = await Product.find().sort({ price: sortOrder });

    return res.status(200).json({
      message: "Products sorted by price successfully",
      count: products.length,
      products,
    });
  } catch (error) {
    console.error(error);
    return res
      .status(500)
      .json({ message: "Something went wrong while sorting by price" });
  }
};

// low to high and high to low
export const sortByStock = async (req, res) => {
  try {
    const { order } = req.query;
    const sortOrder = order === "desc" ? -1 : 1; // default ascending

    const products = await Product.find().sort({ stock: sortOrder });

    return res.status(200).json({
      message: "Products sorted by stock successfully",
      count: products.length,
      products,
    });
  } catch (error) {
    console.error(error);
    return res
      .status(500)
      .json({ message: "Something went wrong while sorting by stock" });
  }
};

// filter by catogery and status

export const filterByCategory = async (req, res) => {
  try {
    const { category } = req.query;

    if (!category) {
      return res.status(400).json({ message: "Category is required" });
    }

    // Case-insensitive exact match, so "electronics" and "Electronics" both work
    const products = await Product.find({
      category: { $regex: `^${category}$`, $options: "i" },
    });

    return res.status(200).json({
      message: "Products filtered by category successfully",
      count: products.length,
      products,
    });
  } catch (error) {
    console.error(error);
    return res
      .status(500)
      .json({ message: "Something went wrong while filtering by category" });
  }
};

export const filterByStatus = async (req, res) => {
  try {
    const { status } = req.query;

    const allowedStatuses = ["active", "inactive", "out_of_stock"];

    if (!status) {
      return res.status(400).json({ message: "Status is required" });
    }

    if (!allowedStatuses.includes(status)) {
      return res.status(400).json({
        message: `Status must be one of: ${allowedStatuses.join(", ")}`,
      });
    }

    const products = await Product.find({ status });

    return res.status(200).json({
      message: "Products filtered by status successfully",
      count: products.length,
      products,
    });
  } catch (error) {
    console.error(error);
    return res
      .status(500)
      .json({ message: "Something went wrong while filtering by status" });
  }
};
