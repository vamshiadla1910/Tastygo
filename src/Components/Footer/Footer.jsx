import React from 'react';
import "./Footer.css"
function Footer() {
  return (
    <footer className="footer" id="footer">
      <div className="container footer-top footer-social-only">
        <div>
          <h3>Follow Us</h3>
          <div className="socials">
            <a href="#" aria-label="Facebook">f</a>
            <a href="#" aria-label="Instagram">⌾</a>
            <a href="#" aria-label="Twitter">𝕏</a>
            <a href="#" aria-label="YouTube">▶</a>
          </div>
        </div>
        <div className="footer-nav">
          <div className="logo small-logo">Tasty<span>go</span></div>
          <div className="footer-links">
            <a href="#hero">Home</a>
            <a href="#specials">Our Specials</a>
            <a href="#hot-deals">Hot &amp; Happy Deals</a>
            <a href="#menu">Menu</a>
            <a href="#delivery">Delivery</a>
          </div>
        </div>
      </div>
      <div className="container footer-bottom">
        <p>© 2026 Tastygo. All rights reserved.</p>
      </div>
    </footer>
  );
}

export default Footer;
