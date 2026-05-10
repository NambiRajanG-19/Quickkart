import { useState } from 'react';
import { useCart } from '../context/CartContext';
import { useAuth } from '../hooks/useAuth';
import CheckoutModal from './CheckoutModal';
import '../styles/CartSidebar.css';

function CartSidebar() {
  const { cart, removeFromCart, updateQuantity, getTotalPrice, isCartOpen, closeCart, clearCart, addOrder } = useCart();
  const { isAuthenticated, openAuthModal, user } = useAuth();
  const totalPrice = getTotalPrice();
  const [isCheckoutOpen, setIsCheckoutOpen] = useState(false);
  const [orderSuccess, setOrderSuccess] = useState(false);
  const [orderNumber, setOrderNumber] = useState('');

  const handleCheckoutClick = () => {
    if (!isAuthenticated) {
      openAuthModal('login');
      return;
    }
    setIsCheckoutOpen(true);
  };

  const handleConfirmOrder = () => {
    const orderId = `#${Date.now().toString().slice(-6)}`;
    const order = {
      id: orderId,
      createdAt: new Date().toISOString(),
      userEmail: user?.email || 'Guest',
      items: cart,
      total: totalPrice,
    };

    addOrder(order);
    clearCart();
    setOrderNumber(orderId);
    setOrderSuccess(true);
    setIsCheckoutOpen(false);
    closeCart();
  };

  const closeCheckout = () => setIsCheckoutOpen(false);

  return (
    <div className={`cart-sidebar ${isCartOpen ? 'open' : ''}`} role="dialog" aria-modal="true" aria-label="Shopping cart">
      <div className="cart-header">
        <h2 className="cart-title">Your Cart</h2>
        <button type="button" className="cart-close" onClick={closeCart} aria-label="Close cart sidebar">✕</button>
      </div>

      {cart.length === 0 ? (
        <div className="cart-empty">
          <p className="empty-icon">🛒</p>
          <p className="empty-message">Your cart is empty</p>
          <p className="empty-hint">Add products to get started</p>
        </div>
      ) : (
        <>
          <div className="cart-items">
            {cart.map((item) => (
              <div key={item.id} className="cart-item">
                <img src={item.image} alt={item.name} className="cart-item-image" />
                <div className="cart-item-details">
                  <h4 className="cart-item-name">{item.name}</h4>
                  <p className="cart-item-price">${item.price.toFixed(2)} each</p>
                  <div className="cart-item-controls">
                    <button
                      type="button"
                      className="qty-btn"
                      aria-label={`Decrease quantity of ${item.name}`}
                      onClick={() => updateQuantity(item.id, item.quantity - 1)}
                    >
                      −
                    </button>
                    <input
                      type="number"
                      className="qty-input"
                      min="1"
                      value={item.quantity}
                      onChange={(e) => {
                        const newQty = parseInt(e.target.value, 10);
                        if (!isNaN(newQty) && newQty >= 1) {
                          updateQuantity(item.id, newQty);
                        }
                      }}
                      onBlur={(e) => {
                        const newQty = parseInt(e.target.value, 10);
                        if (isNaN(newQty) || newQty < 1) {
                          updateQuantity(item.id, 1);
                        }
                      }}
                      aria-label={`Quantity of ${item.name}`}
                    />
                    <button
                      type="button"
                      className="qty-btn"
                      aria-label={`Increase quantity of ${item.name}`}
                      onClick={() => updateQuantity(item.id, item.quantity + 1)}
                    >
                      +
                    </button>
                  </div>
                  <p className="cart-item-total">
                    Total: ${(item.price * item.quantity).toFixed(2)}
                  </p>
                </div>
                <button
                  type="button"
                  className="cart-item-remove"
                  onClick={() => removeFromCart(item.id)}
                  title="Remove item"
                  aria-label={`Remove ${item.name} from cart`}
                >
                  🗑️
                </button>
              </div>
            ))}
          </div>

          <div className="cart-footer">
            {orderSuccess && (
              <div className="order-success-banner">
                <p>
                  Order <strong>{orderNumber}</strong> confirmed! We will email your receipt to <strong>{user?.email}</strong>.
                </p>
              </div>
            )}
            <div className="cart-summary">
              <div className="summary-row">
                <span>Subtotal:</span>
                <span>${totalPrice}</span>
              </div>
              <div className="summary-row">
                <span>Shipping:</span>
                <span>Free</span>
              </div>
              <div className="summary-row total">
                <span>Total:</span>
                <span>${totalPrice}</span>
              </div>
            </div>
            <button type="button" className="checkout-btn" onClick={handleCheckoutClick}>Proceed to Checkout</button>
            <button type="button" className="clear-cart-btn" onClick={clearCart}>Clear Cart</button>
          </div>
        </>
      )}

      {isCartOpen && <div className="cart-backdrop" onClick={closeCart} aria-hidden="true"></div>}
      <CheckoutModal
        isOpen={isCheckoutOpen}
        onClose={closeCheckout}
        cart={cart}
        totalPrice={totalPrice}
        user={user}
        onConfirm={handleConfirmOrder}
      />
    </div>
  );
}

export default CartSidebar;