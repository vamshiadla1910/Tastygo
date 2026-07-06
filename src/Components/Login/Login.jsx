import { useState } from "react";
import "./Login.css"

// onClose is passed in by Navbar when this is shown inside the overlay.
// The prop is optional so Loginpage can still be rendered on its own
// (e.g. if you ever want a dedicated /login route) without crashing.
function Loginpage({ onClose }) {
    // useState keeps the form fields controlled, so their values live in
    // React state instead of only in the DOM.
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
        // Hook this up to your real authentication call when it's ready.
        console.log("Login submitted:", formData);
        onClose?.();
    };

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
                <label htmlFor="phone">Mobile Number</label><br/>
                <input
                    type="tel"
                    name="phone"
                    id="phone"
                    placeholder="89193XXXX"
                    value={formData.phone}
                    onChange={handleChange}
                /><br/>

                <label htmlFor="name">Name</label><br/>
                <input
                    type="text"
                    id="name"
                    placeholder="Enter your name"
                    value={formData.name}
                    onChange={handleChange}
                /><br/>

                <label htmlFor="password">Password</label><br/>
                <input
                    type="password"
                    name="password"
                    id="password"
                    placeholder="Enter your password"
                    value={formData.password}
                    onChange={handleChange}
                /><br/>

                <button type="submit" className="login-submit-btn">Login</button>
            </form>

            <p>Not having account! <span>SignUp</span></p>
        </div>
    )
}
export default Loginpage;