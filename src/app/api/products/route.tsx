import { getProducts } from '@/lib/data/products';

export async function GET() {
  const products = await getProducts();

  return Response.json(products);
}
