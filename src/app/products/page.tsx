import ProductList from '@/components/product-list';
import StatusMessage from '@/components/status-message';
import { getAllProducts } from '@/actions/products';

const Products = async () => {
  const response = await getAllProducts();

  if (response?.status == 'error') {
    return (
      <StatusMessage
        title="Unable to load products!"
        description="Something went wrong while fetching products. Please try again later."
      />
    );
  }
  const products = response.data;
  return <ProductList products={products} />;
};

export default Products;
