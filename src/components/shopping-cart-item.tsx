import { Product } from '@/types';
import Image from 'next/image';
import Link from 'next/link';

const ShoppingCartItem = ({ product }: { product: Product }) => {
  return (
    <Link
      key={product.id}
      href={`/products/${product.id}`}
      className="m-6 p-4 max-w-200 bg-slate-100 ring-2 ring-slate-200 rounded-lg flex justify-between gap-3"
    >
      <div className="flex flex-col gap-1">
        <h2 className="text-2xl">{product.name}</h2>
        <p className="text-gray-600 leading-snug">{product.description}</p>
        <p className="text-xl font-semibold">{product.price}</p>
      </div>
      <Image
        className="rounded-lg"
        src={`/product-images/${product.image_url}`}
        alt={`${product.name} image`}
        width={100}
        height={100}
      />
    </Link>
  );
};

export default ShoppingCartItem;
