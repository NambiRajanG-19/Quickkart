import '../styles/Footer.css';

function Footer() {
  return (
    <footer className="footer">
      <div className="footer-container">
        <div className="footer-content">
          <div className="footer-section">
            <h3 className="footer-title">QuickKart</h3>
            <p className="footer-description">
              Your one-stop shop for everything. Quality products at great prices.
            </p>
          </div>
          <div className="footer-section">
            <h4 className="footer-subtitle">Quick Links</h4>
            <ul className="footer-links">
              <li><a href="#" onClick={(e) => e.preventDefault()}>Home</a></li>
              <li><a href="#" onClick={(e) => e.preventDefault()}>Products</a></li>
              <li><a href="#" onClick={(e) => e.preventDefault()}>Categories</a></li>
              <li><a href="#" onClick={(e) => e.preventDefault()}>About</a></li>
            </ul>
          </div>
          <div className="footer-section">
            <h4 className="footer-subtitle">Support</h4>
            <ul className="footer-links">
              <li><a href="#" onClick={(e) => e.preventDefault()}>Contact Us</a></li>
              <li><a href="#" onClick={(e) => e.preventDefault()}>FAQ</a></li>
              <li><a href="#" onClick={(e) => e.preventDefault()}>Shipping</a></li>
              <li><a href="#" onClick={(e) => e.preventDefault()}>Returns</a></li>
            </ul>
          </div>
          <div className="footer-section">
            <h4 className="footer-subtitle">Follow Us</h4>
            <div className="social-links">
              <a href="#" onClick={(e) => e.preventDefault()} aria-label="Facebook">📘</a>
              <a href="#" onClick={(e) => e.preventDefault()} aria-label="Twitter">🐦</a>
              <a href="#" onClick={(e) => e.preventDefault()} aria-label="Instagram">📷</a>
              <a href="#" onClick={(e) => e.preventDefault()} aria-label="LinkedIn">💼</a>
            </div>
          </div>
        </div>
        <div className="footer-bottom">
          <p className="copyright">
            © 2026 QuickKart. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
}

export default Footer;