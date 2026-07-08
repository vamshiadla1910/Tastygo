import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useCart } from "../../context/useCart";
import "./Checkout.css";

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
    if (!/^\d{10}$/.test(form.mobileNumber)) {
      newErrors.mobileNumber = "Mobile Number must be 10 digits.";
    }
    if (!form.email.trim()) {
      newErrors.email = "Email is required.";
    }
    if (!form.houseNumber.trim()) newErrors.houseNumber = "House Number is required.";
    if (!form.street.trim()) newErrors.street = "Street is required.";
    if (!form.city.trim()) newErrors.city = "City is required.";
    if (!form.state.trim()) newErrors.state = "State is required.";
    if (!/^\d{6}$/.test(form.pincode)) {
      newErrors.pincode = "Pincode must be 6 digits.";
    }
    if (!form.paymentMethod) {
      newErrors.paymentMethod = "Please select a payment method.";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handlePlaceOrder = (event) => {
    event.preventDefault();

    if (!validateForm()) {
      return;
    }

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
                <input
                  id="fullName"
                  name="fullName"
                  type="text"
                  value={form.fullName}
                  onChange={handleChange}
                />
                {errors.fullName && <p className="field-error">{errors.fullName}</p>}
              </div>

              <div className="field-group">
                <label htmlFor="mobileNumber">Mobile Number</label>
                <input
                  id="mobileNumber"
                  name="mobileNumber"
                  type="tel"
                  value={form.mobileNumber}
                  onChange={handleChange}
                />
                {errors.mobileNumber && <p className="field-error">{errors.mobileNumber}</p>}
              </div>

              <div className="field-group">
                <label htmlFor="email">Email</label>
                <input
                  id="email"
                  name="email"
                  type="email"
                  value={form.email}
                  onChange={handleChange}
                />
                {errors.email && <p className="field-error">{errors.email}</p>}
              </div>

              <div className="field-group">
                <label htmlFor="houseNumber">House Number</label>
                <input
                  id="houseNumber"
                  name="houseNumber"
                  type="text"
                  value={form.houseNumber}
                  onChange={handleChange}
                />
                {errors.houseNumber && <p className="field-error">{errors.houseNumber}</p>}
              </div>

              <div className="field-group">
                <label htmlFor="street">Street</label>
                <input
                  id="street"
                  name="street"
                  type="text"
                  value={form.street}
                  onChange={handleChange}
                />
                {errors.street && <p className="field-error">{errors.street}</p>}
              </div>

              
                <div className="field-group half">
                  <label htmlFor="city">City</label>
                  <input
                    id="city"
                    name="city"
                    type="text"
                    value={form.city}
                    onChange={handleChange}
                  />
                  {errors.city && <p className="field-error">{errors.city}</p>}
                </div>
                <div className="field-group half">
                  <label htmlFor="state">State</label>
                  <input
                    id="state"
                    name="state"
                    type="text"
                    value={form.state}
                    onChange={handleChange}
                  />
                  {errors.state && <p className="field-error">{errors.state}</p>}
                </div>
              

              <div className="field-group">
                <label htmlFor="pincode">Pincode</label>
                <input
                  id="pincode"
                  name="pincode"
                  type="text"
                  value={form.pincode}
                  onChange={handleChange}
                />
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
              <div className="field-group payment-group">
                <label>Payment Method</label>
                <div className="payment-options">
                  {["Cash on Delivery", "UPI Payment", "Credit/Debit Card"].map((method) => (
                    <label key={method} className="payment-option">
                      <input
                        type="radio"
                        name="paymentMethod"
                        value={method}
                        checked={form.paymentMethod === method}
                        onChange={handleChange}
                      />
                      {method}
                    </label>
                  ))}
                </div>
                {errors.paymentMethod && (
                  <p className="field-error">{errors.paymentMethod}</p>
                )}
              </div>

              <button type="submit" className="place-order-btn">
                Place Order
              </button>
            </div>
          </div>
        </aside>
      </div>
    </section>
  );
}

export default Checkout;
