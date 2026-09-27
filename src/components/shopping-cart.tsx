'use client';

import products from '@/constants/product-data';
import { useState } from 'react';
import ShoppingCartList from './shopping-cart-list';
import Link from 'next/link';

const ShoppingCart = () => {
  const [cartIds] = useState([1, 5]);

  const cartProducts = cartIds
    .map((id) => products.find((p) => p.id === id))
    .filter((p) => p !== undefined);

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
