import { getProducts, getProduct } from '@/lib/data/products';

const getAllProducts = async () => {
  try {
    const products = await getProducts();

    return {
      status: 'success' as const,
      data: products,
    };
  } catch (error) {
    return {
      status: 'error' as const,
      message: `${error}` || 'Something went wrong!',
    };
  }
};

const getProductById = async (productId: number) => {
  try {
    const product = await getProduct(productId);

    return {
      status: 'success' as const,
      data: product,
    };
  } catch (error) {
    return {
      status: 'error' as const,
      message: `${error}` || 'Something went wrong!',
    };
  }
};

export { getAllProducts, getProductById };
