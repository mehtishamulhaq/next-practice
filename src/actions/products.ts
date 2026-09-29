import { APP_URLs } from '@/constants';

const getAllProducts = async () => {
  try {
    const response = await fetch(APP_URLs.getAllProducts());
    const products = await response.json();

    return {
      status: 'success',
      data: products,
    };
  } catch (error) {
    return {
      status: 'error',
      message: `${error}` || 'Something went wrong!',
    };
  }
};

const getProductById = async (productId: number) => {
  try {
    const response = await fetch(APP_URLs.getProductById(productId));
    const product = await response.json();

    return {
      status: 'success',
      data: product,
    };
  } catch (error) {
    return {
      status: 'error',
      message: `${error}` || 'Something went wrong!',
    };
  }
};

export { getAllProducts, getProductById };
