import { useState } from 'react';
import { useCart } from '../context/CartContext';
import ProductModal from './ProductModal';
import '../styles/ProductCard.css';

function ProductCard({ product }) {
  const [isAdded, setIsAdded] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const { addToCart, addToWishlist, isWishlisted } = useCart();

  const handleAddToCart = () => {
    addToCart(product);
    setIsAdded(true);
    setTimeout(() => setIsAdded(false), 2000);
  };

  const handleWishlist = () => {
    addToWishlist(product);
  };

  const wishlisted = isWishlisted(product.id);
  const priceLabel = product.price.toFixed(2);

  return (
    <div className="product-card" onClick={() => setIsModalOpen(true)}>
      <div className="product-image-container">
        <img
          src={product.image}
          alt={product.name}
          className="product-image"
        />
        <button
          className={`wishlist-icon-btn ${wishlisted ? 'wishlisted' : ''}`}
          onClick={(e) => {
            e.stopPropagation();
            handleWishlist();
          }}
          title={wishlisted ? 'Remove from wishlist' : 'Add to wishlist'}
        >
          {wishlisted ? '❤️' : '🤍'}
        </button>
      </div>
      <div className="product-info">
        <h3 className="product-name">{product.name}</h3>
        <p className="product-description">{product.description}</p>
        <div className="product-footer">
          <div className="price-category">
            <span className="product-price">${priceLabel}</span>
            <span className="product-category">{product.category}</span>
          </div>
          <button
            className={`add-button ${isAdded ? 'added' : ''}`}
            onClick={(e) => {
              e.stopPropagation();
              handleAddToCart();
            }}
          >
            {isAdded ? '✓ Added to Cart' : 'Add to Cart'}
          </button>
        </div>
      </div>
      <ProductModal
        product={product}
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
      />
    </div>
  );
}

export default ProductCard;