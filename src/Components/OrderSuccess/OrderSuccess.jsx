import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

export default function OrderSuccess() {
  const navigate = useNavigate();
  const [order, setOrder] = useState(null);

  useEffect(() => {
    // Read latest order (saved by Checkout)
    const latest = localStorage.getItem("latestOrder");
    if (latest) {
      setOrder(JSON.parse(latest));
      // keep orders history intact (do not remove orders)
    } else {
      // fallback to most recent from orders array
      const orders = JSON.parse(localStorage.getItem("orders") || "[]");
      if (orders.length > 0) setOrder(orders[0]);
    }

    // remove transient processing flag so user can place new orders later
    sessionStorage.removeItem("orderProcessing");
  }, []);

  if (!order) {
    return (
      <div style={{ padding: 24, textAlign: "center" }}>
        <h2>No recent order found</h2>
        <p>Visit My Orders to view previous orders.</p>
        <div style={{ marginTop: 20 }}>
          <button onClick={() => navigate("/my-orders")}>My Orders</button>
          <button onClick={() => navigate("/menu")} style={{ marginLeft: 12 }}>
            Continue Shopping
          </button>
        </div>
      </div>
    );
  }

  const date = new Date(order.date);
  const formattedDate = date.toLocaleString();

  return (
    <div style={{
      display: "flex",
      justifyContent: "center",
      padding: "32px 16px"
    }}>
      <div style={{
        maxWidth: 780,
        width: "100%",
        background: "#fff",
        borderRadius: 12,
        padding: 28,
        boxShadow: "0 6px 24px rgba(0,0,0,0.08)"
      }}>
        <div style={{ display: "flex", alignItems: "center", gap: 18 }}>
          <div style={{
            width: 72, height: 72, borderRadius: 40, background: "#E6F9EA",
            display: "flex", alignItems: "center", justifyContent: "center",
            boxShadow: "inset 0 2px 6px rgba(0,0,0,0.04)"
          }}>
            <svg width="40" height="40" viewBox="0 0 24 24" fill="none" aria-hidden>
              <path d="M20 6L9 17l-5-5" stroke="#2E9A4A" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          </div>

          <div>
            <h1 style={{ margin: 0, fontSize: 22 }}>Your order has been placed successfully!</h1>
            <p style={{ margin: "6px 0 0", color: "#666" }}>Thank you. We are preparing your order.</p>
          </div>
        </div>

        <div style={{
          display: "grid",
          gridTemplateColumns: "1fr 1fr",
          gap: 16,
          marginTop: 22
        }}>
          <div style={{ padding: 14, borderRadius: 8, background: "#FBFBFB" }}>
            <p style={{ margin: 0, color: "#888", fontSize: 13 }}>Order ID</p>
            <h3 style={{ margin: "6px 0 0" }}>{order.id}</h3>
          </div>
          <div style={{ padding: 14, borderRadius: 8, background: "#FBFBFB" }}>
            <p style={{ margin: 0, color: "#888", fontSize: 13 }}>Order Date & Time</p>
            <h3 style={{ margin: "6px 0 0" }}>{formattedDate}</h3>
          </div>

          <div style={{ padding: 14, borderRadius: 8, background: "#FBFBFB" }}>
            <p style={{ margin: 0, color: "#888", fontSize: 13 }}>Estimated Delivery</p>
            <h3 style={{ margin: "6px 0 0" }}>{order.estimatedDelivery || "30-45 Minutes"}</h3>
          </div>
          <div style={{ padding: 14, borderRadius: 8, background: "#FBFBFB" }}>
            <p style={{ margin: 0, color: "#888", fontSize: 13 }}>Total Amount</p>
            <h3 style={{ margin: "6px 0 0" }}>₹{Number(order.summary?.grandTotal || 0).toFixed(2)}</h3>
            <p style={{ margin: "6px 0 0", color: "#888", fontSize: 13 }}>{order.paymentMethod}</p>
          </div>
        </div>

        <div style={{ marginTop: 22, display: "flex", gap: 12 }}>
          <button
            onClick={() => navigate("/my-orders")}
            style={{
              background: "#2E9A4A",
              color: "#fff",
              padding: "10px 14px",
              borderRadius: 8,
              border: "none",
              cursor: "pointer"
            }}
          >
            Track Order / View My Orders
          </button>

          <button
            onClick={() => navigate("/menu")}
            style={{
              background: "#fff",
              color: "#333",
              padding: "10px 14px",
              borderRadius: 8,
              border: "1px solid #E6E6E6",
              cursor: "pointer"
            }}
          >
            Continue Shopping
          </button>
        </div>

        <div style={{ marginTop: 18, color: "#777", fontSize: 13 }}>
          <p style={{ margin: 0 }}>You can view full order details on the My Orders page.</p>
        </div>
      </div>
    </div>
  );
}