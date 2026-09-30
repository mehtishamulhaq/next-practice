import { connectToMongoDB } from '@/lib/db';
import { Product } from '@/types';

// leave out Mongo's _id so results are plain objects (safe to pass to client components)
const WITHOUT_ID = { projection: { _id: 0 } };

const getProducts = async () => {
  const { db } = await connectToMongoDB();
  return db.collection<Product>('products').find({}, WITHOUT_ID).toArray();
};

const getProduct = async (productId: number) => {
  const { db } = await connectToMongoDB();
  return db
    .collection<Product>('products')
    .findOne({ id: productId }, WITHOUT_ID);
};

const getProductsByIds = async (productIds: number[]) => {
  const { db } = await connectToMongoDB();
  return db
    .collection<Product>('products')
    .find({ id: { $in: productIds } }, WITHOUT_ID)
    .toArray();
};

export { getProducts, getProduct, getProductsByIds };
