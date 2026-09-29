import Link from 'next/link';
import ShoppingCartList from './shopping-cart-list';
import { getUserCart } from '@/actions/cart';
import { APP_CONSTANTS } from '@/constants';

const ShoppingCart = async () => {
  const response = await getUserCart(APP_CONSTANTS.CURRRENT_USER_ID);

  if (response?.status == 'error') {
    return <h1>Uable to load products!</h1>;
  }
  const cartProducts = response.data;

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

  return <ShoppingCartList products={cartProducts} />;
};

export default ShoppingCart;
