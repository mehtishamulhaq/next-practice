import { Product } from '@/types';
import Image from 'next/image';
import Link from 'next/link';

const ProductItem = ({ product }: { product: Product }) => {
  return (
    <Link
      key={product.id}
      href={`/products/${product.id}`}
      className="m-6  w-60 bg-slate-100 ring-2 ring-slate-200 rounded-lg flex flex-col gap-3 shadow-xl shadow-slate-200"
    >
      <Image
        className="rounded-lg w-full flex-3"
        src={`/product-images/${product.image_url}`}
        alt={`${product.name} image`}
        width={150}
        height={150}
      />
      <div className="p-3 flex flex-col gap-2 flex-2">
        <h2 className="text-2xl">{product.name}</h2>
        <p className="text-gray-600 leading-snug flex-1">
          {product.description}
        </p>
        <p className="text-xl font-semibold">{`$ ${product.price}`}</p>
      </div>
    </Link>
  );
};

export default ProductItem;
