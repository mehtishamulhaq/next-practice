import { products } from '@/constants';
import { NextRequest } from 'next/server';

type ShoppingCart = Record<number, number[]>;

const carts: ShoppingCart = {
  1: [1, 3, 5],
  2: [2, 4, 6],
  3: [7, 8, 9],
};

type CartBody = {
  productId: number;
};

export async function GET(
  request: NextRequest,
  ctx: RouteContext<'/api/users/[id]/cart'>,
) {
  const { id: userId } = await ctx.params;

  const num_userId = Number(userId);
  const shoppingCart = carts[num_userId];

  if (!shoppingCart) {
    return new Response('User has no items in their Cart!', { status: 404 });
  }

  const mappedProducts = shoppingCart
    .map((productId) => products.find((p) => p.id === productId))
    .filter((p) => p !== undefined);

  return new Response(JSON.stringify(mappedProducts), {
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
  const { id: userId } = await ctx.params;
  const num_userId = Number(userId);

  const body: CartBody = await request.json();
  const { productId } = body;

  if (!carts[num_userId]) {
    carts[num_userId] = [productId];
  } else if (carts[num_userId] && !carts[num_userId].includes(productId)) {
    carts[num_userId].push(productId);
  }

  const mappedProducts = carts[num_userId]
    .map((productId) => products.find((p) => p.id === productId))
    .filter((p) => p !== undefined);

  return new Response(JSON.stringify(mappedProducts), {
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
  const { id: userId } = await ctx.params;
  const num_userId = Number(userId);

  const body: CartBody = await request.json();
  const { productId } = body;

  const userCart = carts[num_userId];

  if (!userCart) {
    return new Response('Users cart not foud', {
      status: 404,
      headers: {
        'Content-Type': 'application/json',
      },
    });
  } else {
    const filterdProductIds = userCart.filter((id) => id !== productId);

    carts[num_userId] = filterdProductIds;

    const mappedProducts = filterdProductIds
      .map((productId) => products.find((p) => p.id === productId))
      .filter((p) => p !== undefined);

    return new Response(JSON.stringify(mappedProducts), {
      status: 202,
      headers: {
        'Content-Type': 'application/json',
      },
    });
  }
}
