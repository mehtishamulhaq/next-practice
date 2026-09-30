import { NextRequest } from 'next/server';
import {
  getCartProducts,
  addProductToCart,
  removeProductFromCart,
} from '@/lib/data/cart';

type CartBody = {
  productId: number;
};

export async function GET(
  request: NextRequest,
  ctx: RouteContext<'/api/users/[id]/cart'>,
) {
  const { id } = await ctx.params;
  const cartProducts = await getCartProducts(Number(id));

  if (!cartProducts) {
    return new Response('User has no items in their Cart!', { status: 404 });
  }

  return Response.json(cartProducts);
}

export async function POST(
  request: NextRequest,
  ctx: RouteContext<'/api/users/[id]/cart'>,
) {
  const { id } = await ctx.params;
  const body: CartBody = await request.json();

  const cartProducts = await addProductToCart(
    Number(id),
    Number(body.productId),
  );

  return Response.json(cartProducts, { status: 201 });
}

// DELETE
export async function DELETE(
  request: NextRequest,
  ctx: RouteContext<'/api/users/[id]/cart'>,
) {
  const { id } = await ctx.params;
  const body: CartBody = await request.json();

  const cartProducts = await removeProductFromCart(
    Number(id),
    Number(body.productId),
  );

  if (!cartProducts) {
    return new Response('Cart not found', { status: 404 });
  }

  return Response.json(cartProducts);
}
