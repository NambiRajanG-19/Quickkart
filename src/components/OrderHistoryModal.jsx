import '../styles/OrderHistoryModal.css';

function OrderHistoryModal({ isOpen, onClose, orders }) {
  if (!isOpen) return null;

  return (
    <>
      <div className="order-history-backdrop" onClick={onClose} />
      <div className="order-history-modal">
        <div className="order-history-header">
          <div>
            <h2>Order History</h2>
            <p className="order-history-subtitle">Review your completed purchases anytime.</p>
          </div>
          <button className="order-history-close" onClick={onClose}>✕</button>
        </div>

        {orders.length === 0 ? (
          <div className="order-history-empty">
            <p>No orders yet.</p>
            <p>Add items to your cart and complete checkout to see them here.</p>
          </div>
        ) : (
          <div className="order-history-list">
            {orders.map((order) => (
              <article key={order.id} className="order-card">
                <div className="order-card-top">
                  <div>
                    <h3>Order {order.id}</h3>
                    <p className="order-meta">{new Date(order.createdAt).toLocaleString()}</p>
                  </div>
                  <div className="order-total-tag">
                    <span>${Number(order.total).toFixed(2)}</span>
                  </div>
                </div>
                <p className="order-items-count">{order.items.length} item{order.items.length !== 1 ? 's' : ''}</p>
                <div className="order-item-list">
                  {order.items.map((item) => (
                    <div key={item.id} className="order-item-row">
                      <span>{item.quantity}× {item.name}</span>
                      <span>${(item.price * item.quantity).toFixed(2)}</span>
                    </div>
                  ))}
                </div>
              </article>
            ))}
          </div>
        )}
      </div>
    </>
  );
}

export default OrderHistoryModal;
