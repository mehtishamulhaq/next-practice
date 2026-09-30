'use client';

import { MouseEvent, useTransition } from 'react';
import { useCart } from '@/providers';
import { CartIcon, TrashIcon } from './icons';

type CartAction = 'add' | 'remove';
type CartButtonVariant = 'icon' | 'text' | 'full';

const ACTIONS = {
  add: { label: 'Add to cart', shortLabel: 'Add', Icon: CartIcon },
  remove: { label: 'Remove from cart', shortLabel: 'Remove', Icon: TrashIcon },
} satisfies Record<
  CartAction,
  { label: string; shortLabel: string; Icon: () => React.JSX.Element }
>;

const BASE_STYLES =
  'inline-flex items-center gap-2 transition-colors cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed';

const VARIANT_STYLES: Record<CartButtonVariant, Record<CartAction, string>> = {
  icon: {
    add: 'rounded-full p-2 text-blue-500 hover:bg-slate-200 hover:text-blue-700',
    remove:
      'rounded-full p-2 text-red-500 hover:bg-slate-200 hover:text-red-700',
  },
  text: {
    add: 'rounded-md px-2 py-1 text-sm font-medium text-blue-600 hover:bg-blue-50 hover:text-blue-700',
    remove:
      'rounded-md px-2 py-1 text-sm font-medium text-red-600 hover:bg-red-50 hover:text-red-700',
  },
  full: {
    add: 'rounded-lg px-4 py-2 font-semibold text-white bg-blue-600 hover:bg-blue-700',
    remove:
      'rounded-lg px-4 py-2 font-semibold text-red-600 ring-2 ring-red-500 hover:bg-red-50',
  },
};

const CartButton = ({
  productId,
  variant = 'icon',
  className = '',
}: {
  productId: number;
  variant?: CartButtonVariant;
  className?: string;
}) => {
  const { isInCart, add, remove } = useCart();
  const [isPending, startTransition] = useTransition();
  const action: CartAction = isInCart(productId) ? 'remove' : 'add';
  const { label, shortLabel, Icon } = ACTIONS[action];
  // what each variant shows as visible text (none for icon-only)
  const visibleText = { icon: null, text: shortLabel, full: label }[variant];

  const handleClick = (event: MouseEvent<HTMLButtonElement>) => {
    // the button can sit inside a <Link>, so don't let the click navigate
    event.preventDefault();
    event.stopPropagation();

    startTransition(() =>
      action === 'remove' ? remove(productId) : add(productId),
    );
  };

  return (
    <button
      type="button"
      onClick={handleClick}
      disabled={isPending}
      // icon-only buttons need an accessible name; visible text provides it otherwise
      aria-label={visibleText === label ? undefined : label}
      title={visibleText ? undefined : label}
      className={`${BASE_STYLES} ${VARIANT_STYLES[variant][action]} ${className}`}
    >
      {visibleText && <span className="leading-none">{visibleText}</span>}
      <Icon />
    </button>
  );
};

export default CartButton;
