import NotFoundPage from '@/app/not-found';
import Image from 'next/image';

const prodectDetail = async ({ id }: { id: number }) => {
  const response = await fetch(`${process.env.API_URL}/api/products/${id}`);
  const product = await response.json();

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
      </div>
    </div>
  );
};

export default prodectDetail;
