import { useNavigate } from "react-router-dom";
import { useCart } from "../../context/useCart";
import "./Cart.css";

function Cart() {
  const {
    cartItems,
    increaseQuantity,
    decreaseQuantity,
    removeFromCart,
    getTotalPrice,
  } = useCart();
  const navigate = useNavigate();

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

  const handleContinueShopping = () => navigate("/menu");
  const handleCheckout = () => navigate("/checkout");

  return (
    <section className="cart-page">
      <div className="cart-header">
        <div>
          <p className="cart-eyebrow">Shopping Cart</p>
          <h1>Your Cart</h1>
        </div>
      </div>

      {cartItems.length === 0 ? (
        <div className="cart-empty-card">
          <h2>Your Cart is Empty</h2>
          <p>Pick your favourites from the menu and start enjoying delicious food.</p>
          <button className="primary-btn" onClick={handleContinueShopping}>
            Continue Shopping
          </button>
        </div>
      ) : (
        <div className="cart-content">
          <div className="cart-items">
            {cartItems.map((item) => {
              const price = parsePrice(item.price);
              const itemTotal = price * item.quantity;

              return (
                <article className="cart-item" key={item.key}>
                  <img src={item.image} alt={item.name} className="cart-item-image" />

                  <div className="cart-item-details">
                    <div className="cart-item-top">
                      <h2>{item.name}</h2>
                      <button
                        className="cart-remove"
                        onClick={() => removeFromCart(item.key)}
                      >
                        Remove
                      </button>
                    </div>

                    <p className="cart-item-price">
                      Price: <span>{formatPrice(price)}</span>
                    </p>

                    <div className="cart-quantity-row">
                      <div className="quantity-controls">
                        <button
                          className="quantity-btn"
                          aria-label={`Decrease quantity of ${item.name}`}
                          onClick={() => decreaseQuantity(item.key)}
                        >
                          -
                        </button>
                        <span>{item.quantity}</span>
                        <button
                          className="quantity-btn"
                          aria-label={`Increase quantity of ${item.name}`}
                          onClick={() => increaseQuantity(item.key)}
                        >
                          +
                        </button>
                      </div>

                      <p className="cart-item-total">
                        Item Total: <strong>{formatPrice(itemTotal)}</strong>
                      </p>
                    </div>
                  </div>
                </article>
              );
            })}
          </div>

          <aside className="cart-summary">
            <div className="summary-box">
              <h2>Order Summary</h2>
              <div className="summary-row">
                <span>Subtotal</span>
                <strong>{formatPrice(subtotal)}</strong>
              </div>
              <div className="summary-row">
                <span>Delivery Charge</span>
                <strong>{formatPrice(deliveryCharge)}</strong>
              </div>
              <div className="summary-row">
                <span>GST (5%)</span>
                <strong>{formatPrice(gst)}</strong>
              </div>
              <div className="summary-row total-row">
                <span>Grand Total</span>
                <strong>{formatPrice(grandTotal)}</strong>
              </div>
              <button className="checkout-btn" onClick={handleCheckout}>
                Proceed to Checkout
              </button>
            </div>
          </aside>
        </div>
      )}
    </section>
  );
}

export default Cart;
