import ProductList from '../components/ProductList';

function HomePage({ products, searchQuery, setSearchQuery }) {
  return (
    <main className="main-content">
      <ProductList products={products} searchQuery={searchQuery} setSearchQuery={setSearchQuery} />
    </main>
  );
}

export default HomePage;
