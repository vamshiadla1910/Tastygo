import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { fetchOrdersFromLocalStorage, formatOrderDate } from "../../services/orderService";
import "./MyOrders.css";

function MyOrders() {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    const loadOrders = () => {
      try {
        const allOrders = fetchOrdersFromLocalStorage();
        setOrders(allOrders);
      } catch (error) {
        console.error("Error loading orders:", error);
      } finally {
        setLoading(false);
      }
    };

    loadOrders();
  }, []);

  const formatPrice = (value) => {
    if (typeof value === "number") {
      return `₹${value.toLocaleString("en-IN", {
        minimumFractionDigits: value % 1 === 0 ? 0 : 2,
        maximumFractionDigits: 2,
      })}`;
    }
    return value;
  };

  if (loading) {
    return (
      <section className="my-orders-page">
        <div className="page-heading">
          <h1 className="heading">My Orders</h1>
        </div>
        <div className="loading">Loading your orders...</div>
      </section>
    );
  }

  return (
    <section className="my-orders-page">
      <div className="page-heading">
        <h1>My Orders</h1>
        <p>You have placed {orders.length} order{orders.length !== 1 ? "s" : ""}</p>
      </div>

      {orders.length === 0 ? (
        <div className="empty-state">
          <div className="empty-icon">📦</div>
          <h2>No Orders Placed Yet</h2>
          <p>Start exploring our menu and place your first order!</p>
          <button className="btn-menu" onClick={() => navigate("/menu")}>
            Browse Menu
          </button>
        </div>
      ) : (
        <div className="orders-container">
          {orders.map((order) => (
            <div key={order.id} className="order-card-container">
              <div className="order-header">
                <div className="order-id-section">
                  <h3 className="order-id">{order.id}</h3>
                  <span className="order-status">{order.status}</span>
                </div>
                <p className="order-date">{formatOrderDate(order.date)}</p>
              </div>

              <div className="order-details-grid">
                <div className="detail-item">
                  <p className="detail-label">Items</p>
                  <p className="detail-value">{order.items.length} items</p>
                </div>
                <div className="detail-item">
                  <p className="detail-label">Total</p>
                  <p className="detail-value">{formatPrice(order.summary.grandTotal)}</p>
                </div>
                <div className="detail-item">
                  <p className="detail-label">Payment</p>
                  <p className="detail-value">{order.paymentMethod}</p>
                </div>
              </div>
              <div className="order-details-grid">
                <div className="order-items-list">
                <p className="list-title">Items Ordered:</p>
                {order.items.map((item, idx) => (
                  <div key={idx} className="item-row">
                    <span className="item-name">{item.name}</span>
                    <span className="item-qty">x{item.quantity}</span>
                  </div>
                ))}
              </div>

              <div className="order-address">
                <p className="address-title">Delivery Address:</p>
                <p className="address-text">
                  {order.address.houseNumber}, {order.address.street}, {order.address.city},{" "}
                  {order.address.state} - {order.address.pincode}
                </p>
              </div>

              <div className="order-contact">
                <p className="contact-title">Contact:</p>
                <p className="contact-text">{order.contact.mobileNumber}</p>
                <p className="contact-text">{order.contact.email}</p>
              </div>
            </div>
              <div className="order-footer">
                <button
                  className="btn-primary"
                  onClick={() => navigate("/home", { state: { order } })}
                >
                  Continue Shopping
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </section>
  );
}

export default MyOrders;
