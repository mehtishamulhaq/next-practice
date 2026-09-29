'use client';

import { createContext, ReactNode, use, useState } from 'react';
import { addToCart, removeFromCart } from '@/actions/cart';
import { useUserId } from '@/hooks';

type CartContextValue = {
  count: number;
  isInCart: (productId: number) => boolean;
  add: (productId: number) => Promise<void>;
  remove: (productId: number) => Promise<void>;
};

const CartContext = createContext<CartContextValue | null>(null);

const withId = (ids: Set<number>, productId: number) =>
  new Set(ids).add(productId);

const withoutId = (ids: Set<number>, productId: number) => {
  const next = new Set(ids);
  next.delete(productId);
  return next;
};

const CartProvider = ({
  initialIds,
  children,
}: {
  initialIds: number[];
  children: ReactNode;
}) => {
  const userId = useUserId();
  const [ids, setIds] = useState(() => new Set(initialIds));

  // update the UI first, roll back if the server call fails
  const add = async (productId: number) => {
    setIds((current) => withId(current, productId));
    const response = await addToCart(userId, productId);
    if (response.status === 'error') {
      console.error(response.message);
      setIds((current) => withoutId(current, productId));
    }
  };

  const remove = async (productId: number) => {
    setIds((current) => withoutId(current, productId));
    const response = await removeFromCart(userId, productId);
    if (response.status === 'error') {
      console.error(response.message);
      setIds((current) => withId(current, productId));
    }
  };

  return (
    <CartContext
      value={{
        count: ids.size,
        isInCart: (productId) => ids.has(productId),
        add,
        remove,
      }}
    >
      {children}
    </CartContext>
  );
};

const useCart = () => {
  const context = use(CartContext);
  if (!context) {
    throw new Error('useCart must be used inside <CartProvider>');
  }
  return context;
};

export { CartProvider, useCart };
