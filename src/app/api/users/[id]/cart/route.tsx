import { NextRequest } from 'next/server';
import { connectToMongoDB } from '@/app/api/db';

type CartBody = {
  productId: number;
};

type Cart = {
  userId: number;
  cartIds: number[];
};

export async function GET(
  request: NextRequest,
  ctx: RouteContext<'/api/users/[id]/cart'>,
) {
  const { db } = await connectToMongoDB();
  const { id } = await ctx.params;
  const userId = Number(id);

  const userCart = await db
    .collection<Cart>('carts')
    .findOne({ userId: userId });

  if (!userCart) {
    return new Response('User has no items in their Cart!', { status: 404 });
  }

  const cartIds = userCart.cartIds;
  const cartProducts = await db
    .collection('products')
    .find({ id: { $in: cartIds } })
    .toArray();

  return new Response(JSON.stringify(cartProducts), {
    status: 200,
    headers: {
      'Content-Type': 'application/json',
    },
  });
}

export async function POST(
  request: NextRequest,
  ctx: RouteContext<'/api/users/[id]/cart'>,
) {
  const { db } = await connectToMongoDB();
  const { id } = await ctx.params;
  const userId = Number(id);

  const body: CartBody = await request.json();
  const productId = Number(body.productId);

  const updatedCart = await db
    .collection<Cart>('carts')
    .findOneAndUpdate(
      { userId },
      { $push: { cartIds: productId } },
      { upsert: true, returnDocument: 'after' },
    );

  const cartProducts = await db
    .collection('products')
    .find({ id: { $in: updatedCart?.cartIds ?? [] } })
    .toArray();

  return new Response(JSON.stringify(cartProducts), {
    status: 201,
    headers: {
      'Content-Type': 'application/json',
    },
  });
}

// DELETE
export async function DELETE(
  request: NextRequest,
  ctx: RouteContext<'/api/users/[id]/cart'>,
) {
  const { db } = await connectToMongoDB();
  const { id } = await ctx.params;
  const userId = Number(id);

  const body: CartBody = await request.json();
  const productId = Number(body.productId);

  const updatedCart = await db
    .collection<Cart>('carts')
    .findOneAndUpdate(
      { userId },
      { $pull: { cartIds: productId } },
      { returnDocument: 'after' },
    );

  if (!updatedCart) {
    return new Response('Cart not found', { status: 404 });
  }

  const cartProducts = await db
    .collection('products')
    .find({ id: { $in: updatedCart.cartIds } })
    .toArray();

  return new Response(JSON.stringify(cartProducts), {
    status: 200,
    headers: {
      'Content-Type': 'application/json',
    },
  });
}
