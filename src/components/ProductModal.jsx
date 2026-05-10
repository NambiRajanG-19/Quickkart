import { useState } from 'react';
import { useCart } from '../context/CartContext';
import '../styles/ProductModal.css';

function ProductModal({ product, isOpen, onClose }) {
  const [quantity, setQuantity] = useState(1);
  const [isAdded, setIsAdded] = useState(false);
  const { addToCart, addToWishlist, isWishlisted } = useCart();

  const handleAddToCart = () => {
    for (let i = 0; i < quantity; i++) {
      addToCart(product);
    }
    setIsAdded(true);
    setTimeout(() => setIsAdded(false), 2000);
  };

  const handleWishlist = () => {
    addToWishlist(product);
  };

  const wishlisted = isWishlisted(product.id);

  if (!isOpen || !product) return null;

  return (
    <>
      <div className="product-modal-overlay" onClick={onClose}>
        <div className="product-modal" onClick={(e) => e.stopPropagation()}>
          <div className="modal-header">
            <h2 className="modal-title">{product.name}</h2>
            <button className="modal-close" onClick={onClose}>✕</button>
          </div>
          <div className="modal-content">
            <div className="modal-image-section">
              <img src={product.image} alt={product.name} className="modal-image" />
            </div>
            <div className="modal-details">
              <p className="modal-description">{product.description}</p>
              <div className="modal-price-section">
                <span className="modal-price">${product.price.toFixed(2)}</span>
                <span className="modal-category">{product.category}</span>
              </div>
              <div className="modal-actions">
                <div className="quantity-selector">
                  <label htmlFor="quantity">Quantity:</label>
                  <div className="quantity-controls">
                    <button
                      type="button"
                      className="qty-btn"
                      aria-label="Decrease quantity"
                      onClick={() => setQuantity(Math.max(1, quantity - 1))}
                    >
                      −
                    </button>
                    <input
                      id="quantity"
                      type="number"
                      min="1"
                      value={quantity}
                      onChange={(e) => setQuantity(Math.max(1, parseInt(e.target.value) || 1))}
                      className="quantity-input"
                    />
                    <button
                      type="button"
                      className="qty-btn"
                      aria-label="Increase quantity"
                      onClick={() => setQuantity(quantity + 1)}
                    >
                      +
                    </button>
                  </div>
                </div>
                <div className="modal-buttons">
                  <button
                    className={`add-to-cart-btn ${isAdded ? 'added' : ''}`}
                    onClick={handleAddToCart}
                  >
                    {isAdded ? '✓ Added to Cart' : `Add ${quantity} to Cart`}
                  </button>
                  <button
                    className={`wishlist-btn ${wishlisted ? 'wishlisted' : ''}`}
                    onClick={handleWishlist}
                  >
                    {wishlisted ? '❤️ Remove from Wishlist' : '🤍 Add to Wishlist'}
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default ProductModal;