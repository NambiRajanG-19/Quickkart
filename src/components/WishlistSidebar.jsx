import { useCart } from '../context/CartContext';
import '../styles/WishlistSidebar.css';

function WishlistSidebar() {
  const { wishlist, removeFromWishlist, addToCart, isWishlistOpen, closeWishlist } = useCart();

  return (
    <div className={`wishlist-sidebar ${isWishlistOpen ? 'open' : ''}`}>
      <div className="wishlist-header">
        <h2 className="wishlist-title">Your Wishlist</h2>
        <button className="wishlist-close" onClick={closeWishlist}>✕</button>
      </div>

      {wishlist.length === 0 ? (
        <div className="wishlist-empty">
          <p className="empty-icon">❤️</p>
          <p className="empty-message">Your wishlist is empty</p>
          <p className="empty-hint">Add items you love</p>
        </div>
      ) : (
        <div className="wishlist-items">
          {wishlist.map((item) => (
            <div key={item.id} className="wishlist-item">
              <img src={item.image} alt={item.name} className="wishlist-item-image" />
              <div className="wishlist-item-details">
                <h4 className="wishlist-item-name">{item.name}</h4>
                <p className="wishlist-item-price">${item.price.toFixed(2)}</p>
                <div className="wishlist-item-actions">
                  <button
                    className="add-to-cart-btn"
                    onClick={() => {
                      addToCart(item);
                      removeFromWishlist(item.id);
                    }}
                  >
                    Add to Cart
                  </button>
                  <button
                    className="remove-wishlist-btn"
                    onClick={() => removeFromWishlist(item.id)}
                  >
                    Remove
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}

      {isWishlistOpen && <div className="wishlist-backdrop" onClick={closeWishlist}></div>}
    </div>
  );
}

export default WishlistSidebar;