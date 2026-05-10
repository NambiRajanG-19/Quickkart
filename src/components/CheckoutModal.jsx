import { useEffect, useRef, useState } from 'react';
import '../styles/CheckoutModal.css';

function CheckoutModal({ isOpen, onClose, cart, totalPrice, user, onConfirm }) {
  const modalRef = useRef(null);

  useEffect(() => {
    const handleKeyDown = (event) => {
      if (event.key === 'Escape') {
        onClose();
      }
    };

    if (isOpen) {
      document.addEventListener('keydown', handleKeyDown);
      document.body.style.overflow = 'hidden';
      const firstInput = modalRef.current?.querySelector('input');
      firstInput?.focus();
    }

    return () => {
      document.removeEventListener('keydown', handleKeyDown);
      document.body.style.overflow = '';
    };
  }, [isOpen, onClose]);
  const [shippingInfo, setShippingInfo] = useState({
    address: '',
    city: '',
    postalCode: '',
    country: ''
  });
  const [paymentMethod, setPaymentMethod] = useState('card');
  const [error, setError] = useState('');

  const handleChange = (event) => {
    const { name, value } = event.target;
    setShippingInfo((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (event) => {
    event.preventDefault();

    if (!shippingInfo.address || !shippingInfo.city || !shippingInfo.postalCode || !shippingInfo.country) {
      setError('Please complete all shipping fields before placing your order.');
      return;
    }

    onConfirm({ shippingInfo, paymentMethod });
  };

  if (!isOpen) {
    return null;
  }

  return (
    <>
      <div className="checkout-backdrop" onClick={onClose} aria-hidden="true" />
      <div className="checkout-modal" ref={modalRef} role="dialog" aria-modal="true" aria-labelledby="checkout-title">
        <div className="checkout-header">
          <div>
            <h2 id="checkout-title">Checkout</h2>
            <p className="checkout-subtitle">Complete your order and get it ready for delivery.</p>
          </div>
          <button type="button" className="checkout-close" onClick={onClose} aria-label="Close checkout modal">✕</button>
        </div>

        <div className="checkout-grid">
          <section className="checkout-form-section">
            <div className="checkout-section-title">Shipping Details</div>
            <p className="checkout-info">Logged in as <strong>{user?.name}</strong> ({user?.email})</p>
            <form className="checkout-form" onSubmit={handleSubmit}>
              <label htmlFor="checkout-address" className="checkout-label">
                Address
              </label>
              <input
                id="checkout-address"
                type="text"
                name="address"
                value={shippingInfo.address}
                onChange={handleChange}
                className="checkout-input"
                placeholder="123 Main Street"
              />
              <div className="checkout-row">
                <label htmlFor="checkout-city" className="checkout-label">
                  City
                </label>
                <input
                  id="checkout-city"
                  type="text"
                  name="city"
                  value={shippingInfo.city}
                  onChange={handleChange}
                  className="checkout-input"
                  placeholder="City"
                />
                <label htmlFor="checkout-postal" className="checkout-label">
                  Postal Code
                </label>
                <input
                  id="checkout-postal"
                  type="text"
                  name="postalCode"
                  value={shippingInfo.postalCode}
                  onChange={handleChange}
                  className="checkout-input"
                  placeholder="ZIP / Postal"
                />
              </div>
              <label htmlFor="checkout-country" className="checkout-label">
                Country
              </label>
              <input
                id="checkout-country"
                type="text"
                name="country"
                value={shippingInfo.country}
                onChange={handleChange}
                className="checkout-input"
                placeholder="Country"
              />

              <div className="checkout-section-title">Payment Method</div>
              <div className="checkout-radio-group" role="radiogroup" aria-label="Payment method">
                <label className="checkout-radio">
                  <input
                    type="radio"
                    name="paymentMethod"
                    value="card"
                    checked={paymentMethod === 'card'}
                    onChange={() => setPaymentMethod('card')}
                  />
                  Credit / Debit Card
                </label>
                <label className="checkout-radio">
                  <input
                    type="radio"
                    name="paymentMethod"
                    value="paypal"
                    checked={paymentMethod === 'paypal'}
                    onChange={() => setPaymentMethod('paypal')}
                  />
                  PayPal
                </label>
              </div>

              {error && <div className="checkout-error">{error}</div>}

              <button type="submit" className="checkout-submit">
                Place Order • ${totalPrice}
              </button>
            </form>
          </section>

          <aside className="checkout-summary-section">
            <div className="checkout-section-title">Order Summary</div>
            <div className="order-summary-card">
              <p className="summary-label">Items</p>
              <div className="order-items">
                {cart.map((item) => (
                  <div key={item.id} className="order-item-row">
                    <span>{item.quantity}× {item.name}</span>
                    <span>${(item.price * item.quantity).toFixed(2)}</span>
                  </div>
                ))}
              </div>
              <div className="summary-divider" />
              <div className="summary-row">
                <span>Subtotal</span>
                <span>${totalPrice}</span>
              </div>
              <div className="summary-row">
                <span>Shipping</span>
                <span>Free</span>
              </div>
              <div className="summary-row total">
                <span>Total</span>
                <span>${totalPrice}</span>
              </div>
            </div>
          </aside>
        </div>
      </div>
    </>
  );
}

export default CheckoutModal;
