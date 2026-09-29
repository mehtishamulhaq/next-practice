'use server';

import { revalidatePath } from 'next/cache';
import { APP_URLs } from '@/constants';

const getUserCart = async (userId: number) => {
  try {
    const response = await fetch(APP_URLs.getcartUrl(userId), {
      cache: 'no-cache',
    });
    const cartProducts = await response.json();

    return {
      status: 'success',
      data: cartProducts,
    };
  } catch (error) {
    return {
      status: 'error',
      message: `${error}` || 'Something went wrong!',
    };
  }
};

const addToCart = async (userId: number, productId: number) => {
  try {
    const response = await fetch(APP_URLs.getcartUrl(userId), {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ productId }),
    });
    const cartProducts = await response.json();
    revalidatePath('/cart');

    return {
      status: 'success',
      data: cartProducts,
    };
  } catch (error) {
    return {
      status: 'error',
      message: `${error}` || 'Something went wrong!',
    };
  }
};

const removeFromCart = async (userId: number, productId: number) => {
  try {
    const response = await fetch(APP_URLs.getcartUrl(userId), {
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ productId }),
    });
    const cartProducts = await response.json();
    revalidatePath('/cart');

    return {
      status: 'success',
      data: cartProducts,
    };
  } catch (error) {
    return {
      status: 'error',
      message: `${error}` || 'Something went wrong!',
    };
  }
};

export { getUserCart, addToCart, removeFromCart };
