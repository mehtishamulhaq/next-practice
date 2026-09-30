import { Product } from '@/types';
import ShopingCartItem from './shopping-cart-item';

const ShoppingCartList = ({ products }: { products: Product[] }) => {
  return (
    <div className="flex flex-col space-y-4">
      {products.map((product) => (
        <ShopingCartItem key={product.id} product={product} />
      ))}
    </div>
  );
};

export default ShoppingCartList;
