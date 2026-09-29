export const BASE_URL = process.env.API_URL;

const ENDPOINTS = {
  getAllProducts: () => `${BASE_URL}/api/products`,
  getProductById: (productId: number) =>
    `${BASE_URL}/api/products/${productId}`,
  getcartUrl: (userId: number) => `${BASE_URL}/api/users/${userId}/cart`,
};

export default ENDPOINTS;
