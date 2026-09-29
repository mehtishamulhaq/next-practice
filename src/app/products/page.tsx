import ProductList from '@/components/product-list';
import { getAllProducts } from '@/actions/products';

const Products = async () => {
  const response = await getAllProducts();

  if (response?.status == 'error') {
    return <h1>Uable to load products!</h1>;
  }
  const products = response.data;
  return <ProductList products={products} />;
};

export default Products;
