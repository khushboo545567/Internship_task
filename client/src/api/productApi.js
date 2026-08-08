import axios from "axios";

const BASE_URL = "http://localhost:3000/api/v1/products";

export const getProducts = async () => {
  try {
    const response = await axios.get(`${BASE_URL}/get-products`);
    return response.data.products;
  } catch (error) {
    console.error("Error adding product:", error);
    throw error;
  }
};

// Add a new product
export const addProduct = async (productData) => {
  try {
    const response = await axios.post(`${BASE_URL}/add`, productData);
    return response.data.product;
  } catch (error) {
    console.error("Error adding product:", error);
    throw error;
  }
};

// Update product
export const updateProduct = async (id, productData) => {
  try {
    const response = await axios.put(`${BASE_URL}/update/${id}`, productData);
    return response.data.product;
  } catch (error) {
    console.error("Error updating product:", error);
    throw error;
  }
};

// Delete  product
export const deleteProduct = async (id) => {
  try {
    const response = await axios.delete(`${BASE_URL}/delete/${id}`);
    return response.data;
  } catch (error) {
    console.error("Error deleting product:", error);
    throw error;
  }
};

// Sort by price
export const sortByPrice = async (order = "asc") => {
  try {
    const response = await axios.get(`${BASE_URL}/sort-by-price`, {
      params: { order },
    });
    return response.data.products;
  } catch (error) {
    console.error("Error sorting by price:", error);
    throw error;
  }
};

// Sort by stock
export const sortByStock = async (order = "asc") => {
  try {
    const response = await axios.get(`${BASE_URL}/sort-by-stock`, {
      params: { order },
    });
    return response.data.products;
  } catch (error) {
    console.error("Error sorting by stock:", error);
    throw error;
  }
};

// Filter by category
export const filterByCategory = async (category) => {
  try {
    const response = await axios.get(`${BASE_URL}/filter-by-category`, {
      params: { category },
    });
    return response.data.products;
  } catch (error) {
    console.error("Error filtering by category:", error);
    throw error;
  }
};

// Filter by status
export const filterByStatus = async (status) => {
  try {
    const response = await axios.get(`${BASE_URL}/filter-by-status`, {
      params: { status },
    });
    return response.data.products;
  } catch (error) {
    console.error("Error filtering by status:", error);
    throw error;
  }
};
