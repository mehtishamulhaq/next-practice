import NotFoundPage from '@/app/not-found';
import Image from 'next/image';
import { getProductById } from '@/actions/products';
import CartButton from './CartButton';
import StatusMessage from './status-message';

const prodectDetail = async ({ id }: { id: number }) => {
  const response = await getProductById(Number(id));
  if (response?.status == 'error') {
    return (
      <StatusMessage
        title="Unable to load product!"
        description="We couldn't fetch this product. Please try again later."
        action={{ label: 'Back to Products', href: '/products' }}
      />
    );
  }
  const product = response.data;

  if (!product) {
    return <NotFoundPage />;
  }

  return (
    <div className="p-8 flex flex-row gap-4">
      <Image
        className="rounded-lg"
        src={`/product-images/${product.image_url}`}
        alt={`${product.name} image`}
        width={300}
        height={300}
      />
      <div className="flex flex-col gap-3 pb-4">
        <h2 className="text-4xl">{product.name}</h2>
        <p className="text-gray-600 leading-snug flex-1 ">
          {product.description}
        </p>
        <p className="text-3xl font-semibold">{`$ ${product.price}`}</p>
        <CartButton productId={product.id} variant="full" className="self-start" />
      </div>
    </div>
  );
};

export default prodectDetail;
