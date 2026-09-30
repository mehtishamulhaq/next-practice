import { connectToMongoDB } from '@/lib/db';
import { getProductsByIds } from './products';

type Cart = {
  userId: number;
  cartIds: number[];
};

const cartsCollection = async () => {
  const { db } = await connectToMongoDB();
  return db.collection<Cart>('carts');
};

// null when the user has no cart yet
const getCartProducts = async (userId: number) => {
  const carts = await cartsCollection();
  const cart = await carts.findOne({ userId });

  return cart ? getProductsByIds(cart.cartIds) : null;
};

const addProductToCart = async (userId: number, productId: number) => {
  const carts = await cartsCollection();
  const cart = await carts.findOneAndUpdate(
    { userId },
    { $addToSet: { cartIds: productId } },
    { upsert: true, returnDocument: 'after' },
  );

  return getProductsByIds(cart?.cartIds ?? []);
};

// null when the user has no cart yet
const removeProductFromCart = async (userId: number, productId: number) => {
  const carts = await cartsCollection();
  const cart = await carts.findOneAndUpdate(
    { userId },
    { $pull: { cartIds: productId } },
    { returnDocument: 'after' },
  );

  return cart ? getProductsByIds(cart.cartIds) : null;
};

export { getCartProducts, addProductToCart, removeProductFromCart };
