'use client';

import { useState } from 'react';
import { Product } from '@/types';
import ShopingCartItem from './shopping-cart-item';

const ShoppingCartList = ({ products }: { products: Product[] }) => {
  const [cartProducts] = useState(products);

  return (
    <div>
      {cartProducts.map((product) => (
        <ShopingCartItem key={product.id} product={product} />
      ))}
    </div>
  );
};

export default ShoppingCartList;
