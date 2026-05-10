import '../styles/Hero.css';

function Hero() {
  return (
    <section className="hero">
      <div className="hero-container">
        <div className="hero-content">
          <h1 className="hero-title">
            Welcome to QuickKart
          </h1>
          <p className="hero-subtitle">
            Discover amazing products at unbeatable prices. Shop with confidence and enjoy fast, free shipping on all orders.
          </p>
          <div className="hero-features">
            <div className="feature">
              <span className="feature-icon">🚚</span>
              <span>Free Shipping</span>
            </div>
            <div className="feature">
              <span className="feature-icon">🔒</span>
              <span>Secure Payment</span>
            </div>
            <div className="feature">
              <span className="feature-icon">↩️</span>
              <span>Easy Returns</span>
            </div>
          </div>
          <button
            className="hero-cta"
            onClick={() => {
              document.querySelector('.product-list')?.scrollIntoView({ behavior: 'smooth' });
            }}
          >
            Shop Now
          </button>
        </div>
        <div className="hero-image">
          <img
            src="https://images.unsplash.com/photo-1441986300917-64674bd600d8?w=600&h=400&fit=crop"
            alt="Shopping experience"
            className="hero-img"
          />
        </div>
      </div>
    </section>
  );
}

export default Hero;