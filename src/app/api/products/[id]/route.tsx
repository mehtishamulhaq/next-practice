import { NextRequest } from 'next/server';
import { connectToMongoDB } from '../../db';

export async function GET(
  request: NextRequest,
  ctx: RouteContext<'/api/products/[id]'>,
) {
  const { db } = await connectToMongoDB();
  const { id } = await ctx.params;
  const productId = Number(id);

  const product = await db.collection('products').findOne({ id: productId });

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
