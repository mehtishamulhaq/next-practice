import ProductList from '@/components/product-list';

const Products = async () => {
  const response = await fetch(`${process.env.API_URL}/api/products`);
  const products = await response.json();
  return <ProductList products={products} />;
};

export default Products;
