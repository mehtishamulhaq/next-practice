import ProdectDetail from '@/components/product-details';

const ProductDetails = async ({
  params,
}: {
  params: Promise<{ id: string }>;
}) => {
  const { id } = await params;

  return <ProdectDetail id={Number(id)} />;
};

export default ProductDetails;
