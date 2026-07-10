import React from 'react';
import "./Footer.css"
import fb from "../../assets/fb.png"
import insta from "../../assets/insta.png"
import xicon from "../../assets/xicon.png"
import yt from "../../assets/yt.png"
function Footer() {
  return (
    <footer className="footer" id="footer">
      <div className="container footer-top footer-social-only">
        <div>
          <h3>Follow Us</h3>
          <div className="socials">
            <a href="#" ><img src={fb} alt="" /></a>
            <a href="#" ><img src={insta} alt="" /></a>
            <a href="#" ><img src={xicon} alt="" /></a>
            <a href="#" ><img src={yt} alt="" /></a>
          </div>
        </div>
        <div className="footer-nav">
          <div className="logo small-logo">Tasty<span>go</span></div>
          <div className="footer-links">
            <a href="#home">Home</a>
            <a href="#specials">Our Specials</a>
            <a href="/menu">Menu</a>
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
