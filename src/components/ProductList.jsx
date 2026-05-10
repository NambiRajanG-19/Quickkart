import { useState, useMemo } from 'react';
import ProductCard from './ProductCard';
import '../styles/ProductList.css';

function ProductList({ products, searchQuery = '', selectedCategory }) {
  const [sortBy, setSortBy] = useState('name');

  // Get unique categories
  const categories = useMemo(() => {
    const cats = products.reduce((acc, product) => {
      if (!acc.includes(product.category)) {
        acc.push(product.category);
      }
      return acc;
    }, []);
    return ['All', ...cats.sort()];
  }, [products]);

  // Filter and sort products
  const filteredAndSortedProducts = useMemo(() => {
    let filtered = selectedCategory === 'All'
      ? products
      : products.filter(p => p.category === selectedCategory);

    // Apply search filter
    if (searchQuery.trim()) {
      const query = searchQuery.toLowerCase().trim();
      filtered = filtered.filter(product =>
        product.name.toLowerCase().includes(query) ||
        product.description.toLowerCase().includes(query) ||
        product.category.toLowerCase().includes(query)
      );
    }

    const sorted = [...filtered].sort((a, b) => {
      switch(sortBy) {
        case 'price-low':
          return a.price - b.price;
        case 'price-high':
          return b.price - a.price;
        case 'name':
          return a.name.localeCompare(b.name);
        default:
          return 0;
      }
    });

    return sorted;
  }, [products, selectedCategory, sortBy, searchQuery]);

  return (
    <section className="product-list">
      <div className="product-list-header">
        <h2 className="section-title">Our Products</h2>
        <div className="filter-controls">
          <div className="filter-group">
            <label htmlFor="sort-filter">Sort By:</label>
            <select
              id="sort-filter"
              className="filter-select"
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value)}
            >
              <option value="name">Name (A-Z)</option>
              <option value="price-low">Price (Low to High)</option>
              <option value="price-high">Price (High to Low)</option>
            </select>
          </div>
        </div>
      </div>

      {filteredAndSortedProducts.length > 0 ? (
        <>
          <p className="product-count">
            {searchQuery.trim()
              ? `Found ${filteredAndSortedProducts.length} product${filteredAndSortedProducts.length !== 1 ? 's' : ''} matching "${searchQuery}"`
              : `Showing ${filteredAndSortedProducts.length} product${filteredAndSortedProducts.length !== 1 ? 's' : ''}`
            }
          </p>
          <div className="product-grid">
            {filteredAndSortedProducts.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        </>
      ) : (
        <div className="no-products">
          <p>No products found. Try adjusting your filters.</p>
        </div>
      )}
    </section>
  );
}

export default ProductList;