'use client';

import { MouseEvent, useTransition } from 'react';
import { removeFromCart } from '@/actions/cart';
import { useUserId } from '@/hooks';

const RemoveFromCart = ({
  productId,
  label = 'Remove from Cart',
  className = '',
}: {
  productId: number;
  label?: string;
  className?: string;
}) => {
  const userId = useUserId();
  const [isPending, startTransition] = useTransition();

  const handleRemoveFromCart = (event: MouseEvent<HTMLButtonElement>) => {
    // the button can sit inside a <Link>, so don't let the click navigate
    event.preventDefault();
    event.stopPropagation();

    startTransition(async () => {
      const response = await removeFromCart(userId, productId);
      if (response.status === 'error') {
        console.error(response.message);
      }
    });
  };

  return (
    <button
      type="button"
      onClick={handleRemoveFromCart}
      disabled={isPending}
      className={`text-lg text-blue-500 disabled:opacity-50 ${className}`}
    >
      {isPending ? '...' : label}
    </button>
  );
};

export default RemoveFromCart;
