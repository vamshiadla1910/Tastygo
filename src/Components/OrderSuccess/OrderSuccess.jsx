import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  FaCheckCircle,
  FaBoxOpen,
  FaUtensils,
  FaMotorcycle,
  FaHome,
} from "react-icons/fa";

export default function OrderSuccess() {
  const navigate = useNavigate();

  const [order, setOrder] = useState(null);
  const [step, setStep] = useState(1);

  useEffect(() => {
    const latest = JSON.parse(localStorage.getItem("latestOrder"));

    if (latest) {
      setOrder(latest);
    }

    // Progress Animation
    const timer1 = setTimeout(() => setStep(2), 3000);
    const timer2 = setTimeout(() => setStep(3), 6000);
    const timer3 = setTimeout(() => setStep(4), 9000);

    return () => {
      clearTimeout(timer1);
      clearTimeout(timer2);
      clearTimeout(timer3);
    };
  }, []);

  if (!order) {
    return (
      <div
        style={{
          minHeight: "100vh",
          background: "#111",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          color: "#fff",
          fontSize: 22,
        }}
      >
        No Order Found
      </div>
    );
  }

  return (
    <div
      style={{
        minHeight: "100vh",
        background: "#111",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        padding: 25,
      }}
    >
      <div
        style={{
          width: "100%",
          maxWidth: 900,
          background: "#1a1a1a",
          borderRadius: 20,
          overflow: "hidden",
          boxShadow: "0 20px 60px rgba(0,0,0,.5)",
        }}
      >
        {/* Top */}
        <div
          style={{
            background: "#28c76f",
            padding: "45px 20px",
            textAlign: "center",
          }}
        >
          <FaCheckCircle
            size={95}
            color="white"
            style={{
              marginBottom: 15,
            }}
          />

          <h3
            style={{
              color: "white",
              marginBottom: 10,
              letterSpacing: 1,
            }}
          >
            THANK YOU
          </h3>

          <h1
            style={{
              color: "#fff",
              margin: 0,
              fontSize: 36,
            }}
          >
            YOUR ORDER IS CONFIRMED
          </h1>

          <p
            style={{
              color: "#ecfdf5",
              marginTop: 12,
            }}
          >
            Your delicious food is being prepared 🍕🍔
          </p>
        </div>

        {/* Order Details */}

        <div
          style={{
            padding: 35,
          }}
        >
          <h2
            style={{
              color: "#ff6b35",
            }}
          >
            Order #{order.id}
          </h2>

          <p style={{ color: "#ddd" }}>
            Estimated Delivery :
            <strong> 30 - 45 Minutes</strong>
          </p>

          <p style={{ color: "#ddd" }}>
            Total Amount :
            <strong style={{ color: "#ffcc00" }}>
              ₹{order.summary?.grandTotal}
            </strong>
          </p>

          {/* Timeline */}

          <div
            style={{
              display: "flex",
              justifyContent: "space-between",
              marginTop: 45,
              flexWrap: "wrap",
              gap: 20,
            }}
          >
            <Status
              icon={<FaCheckCircle />}
              title="Order Confirmed"
              active={step >= 1}
            />

            <Status
              icon={<FaUtensils />}
              title="Preparing"
              active={step >= 2}
            />

            <Status
              icon={<FaMotorcycle />}
              title="Out for Delivery"
              active={step >= 3}
            />

            <Status
              icon={<FaBoxOpen />}
              title="Delivered"
              active={step >= 4}
            />
          </div>

          <div
            style={{
              display: "flex",
              justifyContent: "center",
              gap: 20,
              marginTop: 50,
              flexWrap: "wrap",
            }}
          >
            <button
              onClick={() => navigate("/order-success")}
              style={{
                padding: "14px 30px",
                background: "#ff6b35",
                color: "#fff",
                border: "none",
                borderRadius: 10,
                cursor: "pointer",
                fontWeight: "bold",
                fontSize: 16,
              }}
            >
              Track Order
            </button>

            <button
              onClick={() => navigate("/menu")}
              style={{
                padding: "14px 30px",
                background: "transparent",
                color: "#fff",
                border: "2px solid #ff6b35",
                borderRadius: 10,
                cursor: "pointer",
                fontWeight: "bold",
                fontSize: 16,
              }}
            >
              Continue Shopping
            </button>

            <button
              onClick={() => navigate("/")}
              style={{
                padding: "14px 30px",
                background: "#222",
                color: "#fff",
                border: "none",
                borderRadius: 10,
                cursor: "pointer",
                fontWeight: "bold",
                fontSize: 16,
              }}
            >
              <FaHome /> Home
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

function Status({ icon, title, active }) {
  return (
    <div
      style={{
        flex: 1,
        minWidth: 140,
        textAlign: "center",
      }}
    >
      <div
        style={{
          width: 70,
          height: 70,
          margin: "auto",
          borderRadius: "50%",
          background: active ? "#28c76f" : "#333",
          color: "#fff",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          fontSize: 28,
          transition: ".4s",
        }}
      >
        {icon}
      </div>

      <h4
        style={{
          marginTop: 15,
          color: active ? "#28c76f" : "#888",
        }}
      >
        {title}
      </h4>
    </div>
  );
}