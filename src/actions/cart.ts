'use server';

import { revalidatePath } from 'next/cache';
import {
  getCartProducts,
  addProductToCart,
  removeProductFromCart,
} from '@/lib/data/cart';

const getUserCart = async (userId: number) => {
  try {
    const cartProducts = await getCartProducts(userId);

    return {
      status: 'success' as const,
      data: cartProducts ?? [],
    };
  } catch (error) {
    console.error(error);
    return {
      status: 'error' as const,
      message: `${error}` || 'Something went wrong!',
    };
  }
};

const addToCart = async (userId: number, productId: number) => {
  try {
    const cartProducts = await addProductToCart(userId, productId);
    revalidatePath('/cart');

    return {
      status: 'success' as const,
      data: cartProducts,
    };
  } catch (error) {
    console.error(error);
    return {
      status: 'error' as const,
      message: `${error}` || 'Something went wrong!',
    };
  }
};

const removeFromCart = async (userId: number, productId: number) => {
  try {
    const cartProducts = await removeProductFromCart(userId, productId);
    revalidatePath('/cart');

    return {
      status: 'success' as const,
      data: cartProducts ?? [],
    };
  } catch (error) {
    console.error(error);
    return {
      status: 'error' as const,
      message: `${error}` || 'Something went wrong!',
    };
  }
};

export { getUserCart, addToCart, removeFromCart };
