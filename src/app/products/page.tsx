import ProductList from '@/components/product-list';
import products from '@/constants/product-data';

const Products = () => {
  return <ProductList products={products} />;
};

export default Products;
