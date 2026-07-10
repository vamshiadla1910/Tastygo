import React, { useEffect, useState, useRef } from "react";
import { useNavigate } from "react-router-dom";
import { useCart } from "../../context/useCart";
import "./Checkout.css";

// ...existing code...
function Checkout() {
  const { cartItems, getTotalPrice, clearCart } = useCart();
  const navigate = useNavigate();

  const initialForm = {
    fullName: "",
    mobileNumber: "",
    email: "",
    houseNumber: "",
    street: "",
    city: "",
    state: "",
    pincode: "",
    paymentMethod: "Cash on Delivery",
  };

  const [form, setForm] = useState(initialForm);
  const [errors, setErrors] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitError, setSubmitError] = useState("");

  // modal state & order shown
  const [showModal, setShowModal] = useState(false);
  const [modalOrder, setModalOrder] = useState(null);
  const modalRef = useRef(null);

  useEffect(() => {
    if (cartItems.length === 0) {
      navigate("/menu", { replace: true });
    }
  }, [cartItems, navigate]);

  const subtotal = getTotalPrice();
  const deliveryCharge = subtotal > 0 ? 50 : 0;
  const gst = +(subtotal * 0.05).toFixed(2);
  const grandTotal = +(subtotal + deliveryCharge + gst).toFixed(2);

  const parsePrice = (value) => {
    if (typeof value === "number") return value;
    return Number(String(value).replace(/[^\d.]/g, "")) || 0;
  };

  const formatPrice = (value) => {
    const rounded = Number(value.toFixed(2));
    return `₹${rounded.toLocaleString("en-IN", {
      minimumFractionDigits: rounded % 1 === 0 ? 0 : 2,
      maximumFractionDigits: 2,
    })}`;
  };

  const handleChange = (event) => {
    const { name, value } = event.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  const validateForm = () => {
    const newErrors = {};
    if (!form.fullName.trim()) newErrors.fullName = "Full Name is required.";
    if (!/^\d{10}$/.test(form.mobileNumber)) newErrors.mobileNumber = "Mobile Number must be 10 digits.";
    if (!form.email.trim()) newErrors.email = "Email is required.";
    if (!form.houseNumber.trim()) newErrors.houseNumber = "House Number is required.";
    if (!form.street.trim()) newErrors.street = "Street is required.";
    if (!form.city.trim()) newErrors.city = "City is required.";
    if (!form.state.trim()) newErrors.state = "State is required.";
    if (!/^\d{6}$/.test(form.pincode)) newErrors.pincode = "Pincode must be 6 digits.";
    if (!form.paymentMethod) newErrors.paymentMethod = "Please select a payment method.";

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  // close modal on Escape
  useEffect(() => {
    function onKey(e) {
      if (e.key === "Escape") setShowModal(false);
    }
    if (showModal) document.addEventListener("keydown", onKey);
    return () => document.removeEventListener("keydown", onKey);
  }, [showModal]);

  const handleOverlayClick = (e) => {
    if (modalRef.current && !modalRef.current.contains(e.target)) {
      setShowModal(false);
    }
  };

  const handlePlaceOrder = async (event) => {
    if (event && typeof event.preventDefault === "function") event.preventDefault();

    // Prevent duplicate submissions
    if (isSubmitting || sessionStorage.getItem("orderProcessing") === "true") return;

    const now = new Date();
    const randomOrderNumber = Math.floor(100000 + Math.random() * 900000);
    const order = {
      id: `SV-${randomOrderNumber}`,
      date: now.toISOString(),
      customerName: form.fullName.trim(),
      paymentMethod: form.paymentMethod,
      contact: {
        mobileNumber: form.mobileNumber,
        email: form.email.trim(),
      },
      address: {
        houseNumber: form.houseNumber.trim(),
        street: form.street.trim(),
        city: form.city.trim(),
        state: form.state.trim(),
        pincode: form.pincode,
      },
      items: cartItems,
      summary: {
        subtotal,
        deliveryCharge,
        gst,
        grandTotal,
      },
      estimatedDelivery: "30-45 Minutes",
      status: "Preparing Food",
      statusTimeline: [
        { status: "Order Placed", completed: true, timestamp: now.toISOString() },
        { status: "Preparing Food", completed: false, timestamp: null },
        { status: "Out for Delivery", completed: false, timestamp: null },
        { status: "Delivered", completed: false, timestamp: null },
      ],
    };

    // Save order to "orders" array in localStorage for order history
    const existingOrders = JSON.parse(localStorage.getItem("orders") || "[]");
    existingOrders.unshift(order); // Add to beginning
    localStorage.setItem("orders", JSON.stringify(existingOrders));

    // Save order to localStorage FIRST
    localStorage.setItem("latestOrder", JSON.stringify(order));

    // Navigate to success page SECOND
    navigate("/order-success");

    // Clear cart LAST to avoid useEffect redirect race condition
    clearCart();
  };

  return (
    <section className="checkout-page">
      <div className="checkout-heading">
        <p>Checkout</p>
        <h1>Confirm Your Order</h1>
      </div>

      <div className="checkout-layout">
        <main className="checkout-form-panel">
          <div className="checkout-card">
            <h2>Customer Details</h2>
            <form onSubmit={handlePlaceOrder} noValidate>
              <div className="field-group">
                <label htmlFor="fullName">Full Name</label>
                <input id="fullName" name="fullName" type="text" value={form.fullName} onChange={handleChange} />
                {errors.fullName && <p className="field-error">{errors.fullName}</p>}
              </div>

              <div className="field-group">
                <label htmlFor="mobileNumber">Mobile Number</label>
                <input id="mobileNumber" name="mobileNumber" type="tel" value={form.mobileNumber} onChange={handleChange} />
                {errors.mobileNumber && <p className="field-error">{errors.mobileNumber}</p>}
              </div>

              <div className="field-group">
                <label htmlFor="email">Email</label>
                <input id="email" name="email" type="email" value={form.email} onChange={handleChange} />
                {errors.email && <p className="field-error">{errors.email}</p>}
              </div>

              <div className="field-group">
                <label htmlFor="houseNumber">House Number</label>
                <input id="houseNumber" name="houseNumber" type="text" value={form.houseNumber} onChange={handleChange} />
                {errors.houseNumber && <p className="field-error">{errors.houseNumber}</p>}
              </div>

              <div className="field-group">
                <label htmlFor="street">Street</label>
                <input id="street" name="street" type="text" value={form.street} onChange={handleChange} />
                {errors.street && <p className="field-error">{errors.street}</p>}
              </div>

              <div className="field-group half">
                <label htmlFor="city">City</label>
                <input id="city" name="city" type="text" value={form.city} onChange={handleChange} />
                {errors.city && <p className="field-error">{errors.city}</p>}
              </div>
              <div className="field-group half">
                <label htmlFor="state">State</label>
                <input id="state" name="state" type="text" value={form.state} onChange={handleChange} />
                {errors.state && <p className="field-error">{errors.state}</p>}
              </div>

              <div className="field-group">
                <label htmlFor="pincode">Pincode</label>
                <input id="pincode" name="pincode" type="text" value={form.pincode} onChange={handleChange} />
                {errors.pincode && <p className="field-error">{errors.pincode}</p>}
              </div>
            </form>
          </div>
        </main>

        <aside className="checkout-summary-panel">
          <div className="checkout-card summary-card">
            <h2>Order Summary</h2>
            <div className="summary-item-list">
              {cartItems.map((item) => {
                const price = parsePrice(item.price);
                const total = price * item.quantity;
                return (
                  <div className="summary-item" key={item.key}>
                    <div>
                      <p>{item.name}</p>
                      <span>{item.quantity} x {formatPrice(price)}</span>
                    </div>
                    <strong>{formatPrice(total)}</strong>
                  </div>
                );
              })}
            </div>

            <div className="checkout-totals">
              <div className="checkout-total-row">
                <span>Subtotal</span>
                <strong>{formatPrice(subtotal)}</strong>
              </div>
              <div className="checkout-total-row">
                <span>Delivery Charge</span>
                <strong>{formatPrice(deliveryCharge)}</strong>
              </div>
              <div className="checkout-total-row">
                <span>GST (5%)</span>
                <strong>{formatPrice(gst)}</strong>
              </div>
              <div className="checkout-total-row grand">
                <span>Grand Total</span>
                <strong>{formatPrice(grandTotal)}</strong>
              </div>
              
            </div>
            
          </div>
          <div className="field-group payment-group">
                <h2>Payment Method</h2>
                <div className="payment-options">
                  {["Cash on Delivery", "UPI Payment", "Credit/Debit Card"].map((method) => (
                    <label key={method} className="payment-option">
                      <input type="radio" name="paymentMethod" value={method} checked={form.paymentMethod === method} onChange={handleChange} />
                      {method}
                    </label>
                  ))}
                </div>
                {errors.paymentMethod && <p className="field-error">{errors.paymentMethod}</p>}
              </div>

              {submitError && <p className="field-error">{submitError}</p>}

              <button type="button" className="place-order-btn" onClick={handlePlaceOrder} disabled={isSubmitting}>
                {isSubmitting ? (
                  <span style={{ display: "inline-flex", alignItems: "center", gap: 8 }}>
                    <svg width="18" height="18" viewBox="0 0 50 50" style={{ animation: "spin 1s linear infinite" }} xmlns="http://www.w3.org/2000/svg">
                      <circle cx="25" cy="25" r="20" stroke="#fff" strokeWidth="5" fill="none" strokeLinecap="round" strokeDasharray="31.4 31.4" />
                    </svg>
                    Placing...
                  </span>
                ) : (
                  "Place Order"
                )}
              </button>
              </div>

              
        </aside>
      </div>

      {/* Success Modal */}
      {showModal && modalOrder && (
        <div className="order-modal-overlay" onMouseDown={handleOverlayClick}>
          <div className="order-modal" ref={modalRef} onMouseDown={(e) => e.stopPropagation()}>
            <button className="modal-close" aria-label="Close" onClick={() => setShowModal(false)}>×</button>

            <div className="modal-content" style={{ textAlign: "center" }}>
              <div style={{ display: "flex", justifyContent: "center", marginBottom: 10 }}>
                <svg width="72" height="72" viewBox="0 0 52 52" aria-hidden>
                  <circle cx="26" cy="26" r="25" fill="#E6F9EA" />
                  <path d="M14 27l7 7 16-16" stroke="#2E9A4A" strokeWidth="4" strokeLinecap="round" strokeLinejoin="round" fill="none" strokeDasharray="48" strokeDashoffset="48" style={{ animation: "draw 420ms ease forwards 120ms" }} />
                </svg>
              </div>

              <h2 style={{ margin: "6px 0" }}>Order Placed Successfully!</h2>
              <p style={{ margin: "8px 0 16px", color: "#666" }}>Thank you! Your order has been placed successfully.</p>

              <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 12, textAlign: "left" }}>
                <div>
                  <p className="label">Order ID</p>
                  <p className="value">{modalOrder.id}</p>
                </div>
                <div>
                  <p className="label">Total Amount</p>
                  <p className="value">{formatPrice(modalOrder.summary?.grandTotal ?? grandTotal)}</p>
                </div>
                <div>
                  <p className="label">Order Date & Time</p>
                  <p className="value">{new Date(modalOrder.date).toLocaleString()}</p>
                </div>
                <div>
                  <p className="label">Estimated Delivery</p>
                  <p className="value">30–45 minutes</p>
                </div>
                <div style={{ gridColumn: "1 / -1" }}>
                  <p className="label">Payment Method</p>
                  <p className="value">{modalOrder.paymentMethod}</p>
                </div>
              </div>

              <div style={{ display: "flex", gap: 10, justifyContent: "center", marginTop: 18, flexWrap: "wrap" }}>
                <button className="primary" onClick={() => { setShowModal(false); navigate("/my-orders"); }} style={{ background: "#2E9A4A", color: "#fff", padding: "10px 14px", borderRadius: 8, border: "none" }}>
                  View My Orders
                </button>
                <button onClick={() => { setShowModal(false); navigate("/menu"); }} style={{ background: "#fff", color: "#333", padding: "10px 14px", borderRadius: 8, border: "1px solid #E6E6E6" }}>
                  Continue Shopping
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      <style>{`
        @keyframes spin { to { transform: rotate(360deg); } }
        @keyframes draw { to { stroke-dashoffset: 0; } }
        .order-modal-overlay {
          position: fixed; inset: 0; background: rgba(0,0,0,0.45);
          display: flex; align-items: center; justify-content: center; z-index: 1200;
          animation: fadeIn 160ms ease;
        }
        @keyframes fadeIn { from { opacity: 0 } to { opacity: 1 } }
        .order-modal {
          width: 94%; max-width: 720px; background: #fff; border-radius: 12px; padding: 20px;
          box-shadow: 0 12px 40px rgba(0,0,0,0.18); transform: scale(0.98); animation: popIn 200ms cubic-bezier(.2,.9,.2,1) forwards;
        }
        @keyframes popIn { to { transform: scale(1) } }
        .modal-close { position: absolute; right: 12px; top: 8px; background: transparent; border: none; font-size: 24px; cursor: pointer; color: #666; }
        .label { font-size: 12px; color: #888; margin: 0 0 4px; }
        .value { font-weight: 600; color: #222; margin: 0; }
        @media (max-width: 520px) {
          .order-modal { padding: 16px; }
        }
      `}</style>
    </section>
  );
}

export default Checkout;
// ...existing code...