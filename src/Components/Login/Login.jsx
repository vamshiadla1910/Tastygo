import { useState } from "react";
import "./Login.css";
import SignupPage from "../Signup/Signup";

function Loginpage({ onClose }) {
  const [showSignup, setShowSignup] = useState(false);

  const [formData, setFormData] = useState({
    phone: "",
    name: "",
    password: "",
  });

  const handleChange = (event) => {
    const { id, value } = event.target;
    setFormData((prev) => ({ ...prev, [id]: value }));
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    console.log("Login submitted:", formData);
    onClose?.();
  };

  if (showSignup) {
    return (
      <SignupPage
        onClose={onClose}
        onShowLogin={() => setShowSignup(false)}
      />
    );
  }

  return (
    <div className="loginpage">
      {onClose && (
        <button
          type="button"
          className="login-close-btn"
          onClick={onClose}
          aria-label="Close login"
        >
          &times;
        </button>
      )}

      <h2 className="login-heading">Login</h2>

      <form onSubmit={handleSubmit}>
        <label htmlFor="phone" className="login-label">Mobile Number</label>
        <input
          type="tel"
          name="phone"
          id="phone"
          placeholder="89193XXXX"
          value={formData.phone}
          onChange={handleChange}
        />

        <label htmlFor="name" className="login-label">Name</label>
        <input
          type="text"
          id="name"
          placeholder="Enter your name"
          value={formData.name}
          onChange={handleChange}
        />

        <label htmlFor="password" className="login-label">Password</label>
        <input
          type="password"
          name="password"
          id="password"
          placeholder="Enter your password"
          value={formData.password}
          onChange={handleChange}
        />

        <button type="submit" className="login-submit-btn">
          Login
        </button>
      </form>

      <p className="fp">Forgotten password?</p>
      <p className="login-switch-text">
        Not having account!{" "}
        <span
          className="login-switch-link"
          onClick={() => setShowSignup(true)}
        >
          SignUp
        </span>
      </p>
    </div>
  );
}

export default Loginpage;