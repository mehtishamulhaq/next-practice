import ShoppingCartList from './shopping-cart-list';
import { getUserCart } from '@/actions/cart';
import { APP_CONSTANTS } from '@/constants';
import { Product } from '@/types';
import ShoppingCartHeader from './shopping-cart-header';
import StatusMessage from './status-message';

const CART_COLUMN = 'mx-4 sm:ml-auto sm:mr-10 sm:w-140';

const ShoppingCart = async () => {
  const response = await getUserCart(APP_CONSTANTS.CURRRENT_USER_ID);

  if (response?.status == 'error') {
    return (
      <StatusMessage
        title="Unable to load your cart!"
        description="Something went wrong while fetching your cart. Please try again later."
      />
    );
  }
  const cartProducts = response.data;
  const totalItems = cartProducts.length;
  const totalCost = cartProducts.reduce(
    (sum: number, product: Product) => sum + product.price,
    0,
  );

  if (!cartProducts.length) {
    return (
      <StatusMessage
        variant="info"
        title="Your cart is empty"
        description="Add some products from the products page to see them here."
        action={{ label: 'Go to Products', href: '/products' }}
      />
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
