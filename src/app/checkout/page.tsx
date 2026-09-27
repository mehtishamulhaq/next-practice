import Link from 'next/link';

const Checkout = () => {
  return (
    <main className="flex flex-1 flex-col items-center justify-center gap-6 px-8 text-center">
      <h1 className="text-4xl font-bold text-teal-700">Checkout</h1>
      <p className="text-2xl text-teal-600">This page is under costruction!</p>
      <Link
        href="/products"
        className="rounded-lg bg-teal-600 px-6 py-3 font-bold text-white hover:bg-teal-700"
      >
        Shop products
      </Link>
    </main>
  );
};

export default Checkout;
