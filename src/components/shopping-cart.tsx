import Link from 'next/link';
import ShoppingCartList from './shopping-cart-list';
import { getUserCart } from '@/actions/cart';
import { APP_CONSTANTS } from '@/constants';
import { Product } from '@/types';
import ShoppingCartHeader from './shopping-cart-header';

const CART_COLUMN = 'mx-4 sm:ml-auto sm:mr-10 sm:w-140';

const ShoppingCart = async () => {
  const response = await getUserCart(APP_CONSTANTS.CURRRENT_USER_ID);

  if (response?.status == 'error') {
    return <h1>Uable to load products!</h1>;
  }
  const cartProducts = response.data;
  const totalItems = cartProducts.length;
  const totalCost = cartProducts.reduce(
    (sum: number, product: Product) => sum + product.price,
    0,
  );

  if (!cartProducts.length) {
    return (
      <>
        <h1>
          The cart is empty please add the products from the products page
        </h1>
        <Link href="/products">Go to Products Page</Link>
      </>
    );
  }

  return (
    <div className="overflow-y-auto h-[calc(100dvh-var(--navbar-height)-2rem)]">
      <div className={`${CART_COLUMN} px-1 pb-4`}>
        <div className="sticky top-0 z-10 flow-root bg-white pt-1">
          <ShoppingCartHeader totalItems={totalItems} totalCost={totalCost} />
        </div>
        <ShoppingCartList products={cartProducts} />
      </div>
    </div>
  );
};

export default ShoppingCart;
