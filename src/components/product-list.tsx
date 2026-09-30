import { Product } from '@/types';
import ProductItem from './product-item';

const ProductList = ({ products }: { products: Product[] }) => {
  return (
    <div className="grid grid-cols-[repeat(auto-fill,15rem)] justify-center gap-12 px-6 pb-12">
      {products.map((product) => (
        <ProductItem key={product.id} product={product} />
      ))}
    </div>
  );
};

export default ProductList;
