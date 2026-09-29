export const BASE_URL = process.env.API_URL;

const ENDPOINTS = {
  getAllProducts: () => `${BASE_URL}/api/products`,
  getProductById: (productId: number) =>
    `${BASE_URL}/api/products/${productId}`,
  getUserCart: (userId: number) => `${BASE_URL}/api/users/${userId}/cart`,
  addToCart: (userId: number) => `${BASE_URL}/api/users/${userId}/cart`,
};

export default ENDPOINTS;
