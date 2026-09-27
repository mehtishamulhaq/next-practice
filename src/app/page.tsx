import Link from 'next/link';

export default function Home() {
  return (
    <main className="flex flex-1 flex-col items-center justify-center gap-6 px-8 text-center">
      <h1 className="text-4xl font-bold text-teal-700">Welcome to the store</h1>
      <p className="text-lg text-gray-600">
        Browse the catalogue and add a few things to your cart.
      </p>
      <Link
        href="/products"
        className="rounded-lg bg-teal-600 px-6 py-3 font-bold text-white hover:bg-teal-700"
      >
        Shop products
      </Link>
    </main>
  );
}
