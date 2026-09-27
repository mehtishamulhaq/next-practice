import { Product } from '@/types';
import ProductItem from './product-item';

const ProductList = ({ products }: { products: Product[] }) => {
  return (
    <div className="flex flex-col mx-auto sm:flex-row sm:flex-wrap">
      {products.map((product) => (
        <ProductItem key={product.id} product={product} />
      ))}
    </div>
  );
};

export default ProductList;
