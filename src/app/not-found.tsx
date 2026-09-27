import Link from 'next/link';

const NotFoundPage = () => (
  <div className="w-screen h-screen flex  justify-center items-center ">
    <div className="flex flex-col gap-4">
      <h1 className="text-3xl text-teal-600">Page not Foud!</h1>
      <Link
        className="px-4 py-2 bg-teal-500 text-white rounded-xl text-center text-lg font-semibold"
        href="/products"
      >
        Go to Products
      </Link>
    </div>
  </div>
);

export default NotFoundPage;
