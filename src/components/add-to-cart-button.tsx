'use client';

import { MouseEvent, useTransition } from 'react';
import { addToCart } from '@/actions/cart';
import { useUserId } from '@/hooks';

const AddToCart = ({
  productId,
  label = 'Add to Cart',
  className = '',
}: {
  productId: number;
  label?: string;
  className?: string;
}) => {
  const userId = useUserId();
  const [isPending, startTransition] = useTransition();

  const handleAddToCart = (event: MouseEvent<HTMLButtonElement>) => {
    // the button can sit inside a <Link>, so don't let the click navigate
    event.preventDefault();
    event.stopPropagation();

    startTransition(async () => {
      const response = await addToCart(userId, productId);
      if (response.status === 'error') {
        console.error(response.message);
      }
    });
  };

  return (
    <button
      type="button"
      onClick={handleAddToCart}
      disabled={isPending}
      className={`text-lg text-blue-500 disabled:opacity-50 ${className}`}
    >
      {isPending ? 'Adding…' : label}
    </button>
  );
};

export default AddToCart;
