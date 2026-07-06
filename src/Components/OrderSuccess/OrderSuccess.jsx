import { useEffect, useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { updateOrderStatusInLocalStorage } from "../../services/orderService";
import "./OrderSuccess.css";

function OrderSuccess() {
  const [order, setOrder] = useState(null);
  const [statusTimeline, setStatusTimeline] = useState([]);
  const [currentStatus, setCurrentStatus] = useState("Preparing Food");
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    // Try navigation state first (best method)
    if (location.state) {
      setOrder(location.state);
      setStatusTimeline(location.state.statusTimeline || []);
      setCurrentStatus(location.state.status || "Preparing Food");
      startStatusSimulation(location.state.statusTimeline || []);
      return;
    }

    // Fallback to localStorage
    const stored = localStorage.getItem("latestOrder");
    if (stored) {
      try {
        const orderData = JSON.parse(stored);
        setOrder(orderData);
        setStatusTimeline(orderData.statusTimeline || []);
        setCurrentStatus(orderData.status || "Preparing Food");
        startStatusSimulation(orderData.statusTimeline || []);
      } catch (err) {
        console.error("Invalid order data");
      }
    }
  }, [location.state]);

  // Simulate status updates for demo
  const startStatusSimulation = (timeline) => {
    const timers = [];

    // After 5 seconds → Preparing Food (already default)
    timers.push(
      setTimeout(() => {
        updateTimeline(timeline, "Preparing Food");
      }, 5000)
    );

    // After 10 seconds → Out for Delivery
    timers.push(
      setTimeout(() => {
        updateTimeline(timeline, "Out for Delivery");
      }, 10000)
    );

    // After 15 seconds → Delivered
    timers.push(
      setTimeout(() => {
        updateTimeline(timeline, "Delivered");
      }, 15000)
    );

    return () => timers.forEach((timer) => clearTimeout(timer));
  };

  const updateTimeline = (currentTimeline, newStatus) => {
    const now = new Date().toISOString();
    const updatedTimeline = currentTimeline.map((item) =>
      item.status === newStatus
        ? { ...item, completed: true, timestamp: now }
        : item
    );
    setStatusTimeline(updatedTimeline);
    setCurrentStatus(newStatus);

    if (order) {
      updateOrderStatusInLocalStorage(order.id, newStatus, updatedTimeline);
    }
  };

  if (!order) {
    return (
      <div style={{ textAlign: "center", padding: "50px" }}>
        <h2>No Order Found</h2>
        <button onClick={() => navigate("/menu")}>Go to Menu</button>
      </div>
    );
  }

  const orderDate = new Date(order.date);
  const formattedDate = orderDate.toLocaleDateString("en-IN", {
    day: "2-digit",
    month: "short",
    year: "numeric",
  });

  const details = [
    {
      label: "Order ID",
      value: order.id || `SV-${Math.floor(100000 + Math.random() * 900000)}`,
    },
    { label: "Order Date", value: formattedDate },
    {
      label: "Estimated Delivery",
      value: order.estimatedDelivery || "30-45 Minutes",
    },
    {
      label: "Payment Method",
      value: order.paymentMethod || "Cash on Delivery",
    },
    { label: "Order Status", value: currentStatus },
  ];

  return (
    <section className="order-success-page">
      <div className="order-success-panel">
        <div className="success-hero">
          <svg className="checkmark-svg" viewBox="0 0 52 52">
            <circle className="checkmark-circle" cx="26" cy="26" r="25" fill="none" />
            <path className="checkmark-check" fill="none" d="M14 27l7 7 16-16" />
          </svg>

          <h1>Order Placed Successfully 🎉</h1>
          <p className="lead">Your food will be delivered soon</p>
        </div>

        <div className="order-tracking">
          <h3>Order Tracking</h3>
          <div className="tracking-timeline">
            {statusTimeline.map((item, index) => (
              <div
                key={index}
                className={`timeline-step ${item.completed ? "completed" : ""} ${
                  item.status === currentStatus ? "active" : ""
                }`}
              >
                <div className="timeline-dot">
                  {item.completed ? (
                    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor">
                      <polyline points="20 6 9 17 4 12"></polyline>
                    </svg>
                  ) : (
                    <div className="dot-inner"></div>
                  )}
                </div>
                <div className="timeline-content">
                  <p className="status-label">{item.status}</p>
                  {item.timestamp && (
                    <p className="status-time">
                      {new Date(item.timestamp).toLocaleTimeString("en-IN", {
                        hour: "2-digit",
                        minute: "2-digit",
                      })}
                    </p>
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="order-card">
          {details.map((item) => (
            <div className="order-card-row" key={item.label}>
              <span>{item.label}</span>
              <strong>{item.value}</strong>
            </div>
          ))}
        </div>

        <div className="order-action-row">
          <button className="primary-button" onClick={() => navigate("/")}>
            Continue Shopping
          </button>
          <button
            className="secondary-button"
            onClick={() => navigate("/my-orders")}
          >
            View All Orders
          </button>
        </div>
      </div>
    </section>
  );
}

export default OrderSuccess;