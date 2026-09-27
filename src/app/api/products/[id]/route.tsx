import { products } from '@/constants';
import { NextRequest } from 'next/server';

export async function GET(
  request: NextRequest,
  ctx: RouteContext<'/api/products/[id]'>,
) {
  const { id: productId } = await ctx.params;

  const product = products.find((p) => p.id === Number(productId));

  if (!product) {
    return new Response('Product not found', { status: 404 });
  }

  return new Response(JSON.stringify(product), {
    status: 200,
    headers: {
      'Content-Type': 'application/json',
    },
  });
}
