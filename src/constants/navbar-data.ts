import { TruckIcon, CartIcon, Shop } from '@/components/icons';

const navbarData = [
  {
    id: 1,
    name: 'products',
    label: 'Products',
    link: '/products',
    icon: Shop,
  },
  {
    id: 2,
    name: 'cart',
    label: 'Cart',
    link: '/cart',
    icon: CartIcon,
  },
  {
    id: 3,
    name: 'checkout',
    label: 'Checkout',
    link: '/checkout',
    icon: TruckIcon,
  },
];

export default navbarData;
