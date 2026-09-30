import { NextRequest } from 'next/server';
import { getProduct } from '@/lib/data/products';

export async function GET(
  request: NextRequest,
  ctx: RouteContext<'/api/products/[id]'>,
) {
  const { id } = await ctx.params;
  const product = await getProduct(Number(id));

  if (!product) {
    return new Response('Product not found', { status: 404 });
  }

  return Response.json(product);
}
