import type { Metadata } from 'next';
import { NavBar } from '@/components';
import { CartProvider } from '@/providers';
import { getUserCart } from '@/actions/cart';
import { APP_CONSTANTS } from '@/constants';
import { Product } from '@/types';
import { Geist, Geist_Mono } from 'next/font/google';
import './globals.css';

const geistSans = Geist({
  variable: '--font-geist-sans',
  subsets: ['latin'],
});

const geistMono = Geist_Mono({
  variable: '--font-geist-mono',
  subsets: ['latin'],
});

export const metadata: Metadata = {
  title: 'Next Practice Store',
  description: 'A small Next.js shopping practice app',
};

export default async function RootLayout({ children }: LayoutProps<'/'>) {
  const cart = await getUserCart(APP_CONSTANTS.CURRRENT_USER_ID);
  const cartIds: number[] =
    cart.status === 'success' && Array.isArray(cart.data)
      ? cart.data.map((product: Product) => product.id)
      : [];

  return (
    <html
      lang="en"
      className={`${geistSans.variable} ${geistMono.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col">
        <CartProvider initialIds={cartIds}>
          <NavBar />
          {children}
        </CartProvider>
      </body>
    </html>
  );
}
