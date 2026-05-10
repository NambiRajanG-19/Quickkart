import { useCart } from '../context/CartContext';
import '../styles/CartPage.css';

function CartPage() {
  const { cart, removeFromCart, updateQuantity, getTotalPrice, clearCart, toggleCart } = useCart();
  const totalPrice = getTotalPrice();

  return (
    <main className="cart-page">
      <div className="cart-page-container">
        <h1>Shopping Cart</h1>

        {cart.length === 0 ? (
          <div className="cart-page-empty">
            <p className="empty-icon">🛒</p>
            <p className="empty-message">Your cart is empty</p>
            <p className="empty-hint">Add some products to get started</p>
            <a href="/" className="back-to-shopping">Continue Shopping</a>
          </div>
        ) : (
          <div className="cart-page-content">
            <section className="cart-page-items">
              <h2>Items ({cart.length})</h2>
              <div className="cart-page-list">
                {cart.map((item) => (
                  <article key={item.id} className="cart-page-item">
                    <img src={item.image} alt={item.name} className="cart-page-image" />
                    <div className="cart-page-details">
                      <h3>{item.name}</h3>
                      <p className="item-category">{item.category}</p>
                      <p className="item-description">{item.description}</p>
                      <p className="item-price">${item.price.toFixed(2)} each</p>
                    </div>
                    <div className="cart-page-controls">
                      <div className="quantity-control">
                        <button
                          className="qty-btn"
                          onClick={() => updateQuantity(item.id, item.quantity - 1)}
                        >
                          −
                        </button>
                        <span className="qty-display">{item.quantity}</span>
                        <button
                          className="qty-btn"
                          onClick={() => updateQuantity(item.id, item.quantity + 1)}
                        >
                          +
                        </button>
                      </div>
                      <p className="item-total">${(item.price * item.quantity).toFixed(2)}</p>
                      <button
                        className="remove-btn"
                        onClick={() => removeFromCart(item.id)}
                        title="Remove item"
                      >
                        🗑️
                      </button>
                    </div>
                  </article>
                ))}
              </div>
            </section>

            <aside className="cart-page-summary">
              <h2>Order Summary</h2>
              <div className="summary-card">
                <div className="summary-row">
                  <span>Subtotal</span>
                  <span>${totalPrice}</span>
                </div>
                <div className="summary-row">
                  <span>Shipping</span>
                  <span>Free</span>
                </div>
                <div className="summary-row">
                  <span>Tax</span>
                  <span>Calculated at checkout</span>
                </div>
                <div className="summary-divider" />
                <div className="summary-row total">
                  <span>Total</span>
                  <span>${totalPrice}</span>
                </div>
              </div>
              <button className="checkout-btn-page">Proceed to Checkout</button>
              <button className="clear-btn-page" onClick={clearCart}>Clear Cart</button>
            </aside>
          </div>
        )}
      </div>
    </main>
  );
}

export default CartPage;
