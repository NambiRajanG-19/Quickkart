import { useState, useEffect, useRef } from 'react';
import { useCart } from '../../context/CartContext';
import { useAuth } from '../../hooks/useAuth';
import OrderHistoryModal from '../../components/OrderHistoryModal';
import '../../styles/Header.css';

function Header({ searchQuery, setSearchQuery, selectedCategory, setSelectedCategory }) {
  const [userMenuOpen, setUserMenuOpen] = useState(false);
  const [isOrderHistoryOpen, setIsOrderHistoryOpen] = useState(false);
  const userMenuRef = useRef(null);
  const { getTotalItems, getWishlistCount, toggleCart, toggleWishlist, orders } = useCart();
  const { user, isAuthenticated, logout, openAuthModal } = useAuth();

  useEffect(() => {
    if (!userMenuOpen) return;

    const handleOutsideClick = (event) => {
      if (userMenuRef.current && !userMenuRef.current.contains(event.target)) {
        setUserMenuOpen(false);
      }
    };

    const handleKeyDown = (event) => {
      if (event.key === 'Escape') {
        setUserMenuOpen(false);
      }
    };

    document.addEventListener('mousedown', handleOutsideClick);
    document.addEventListener('keydown', handleKeyDown);

    return () => {
      document.removeEventListener('mousedown', handleOutsideClick);
      document.removeEventListener('keydown', handleKeyDown);
    };
  }, [userMenuOpen]);

  const navItems = [
    { id: 1, label: 'Home', href: '#' },
    { id: 2, label: 'Products', href: '#' },
    { id: 3, label: 'Categories', href: '#' },
    { id: 4, label: 'About', href: '#' },
    { id: 5, label: 'Contact', href: '#' }
  ];

  const categories = ['All', 'Electronics', 'Accessories', 'Appliances', 'Sports & Fitness', 'Home & Office'];

  const handleSearch = (e) => {
    e.preventDefault();
    // Search is handled in real-time, but we can add additional logic here if needed
    console.log('Searching for:', searchQuery);
  };

  const cartCount = getTotalItems();
  const wishlistCount = getWishlistCount();

  return (
    <header className="header">
      <div className="header-container">
        <div className="header-top">
          <div className="header-branding">
            <h1 className="header-title">QuickKart</h1>
            <p className="header-subtitle">Your one-stop shop for everything</p>
          </div>
          <div className="header-actions">
            <button className="wishlist-button" type="button" aria-label="View wishlist" onClick={toggleWishlist}>
              <span className="wishlist-icon">❤️</span>
              <span>Wishlist</span>
              {wishlistCount > 0 && <span className="action-badge">{wishlistCount}</span>}
            </button>
            <button className="cart-button" type="button" onClick={toggleCart} aria-label="Open cart">
              <span className="cart-icon">🛒</span>
              <span>Cart</span>
              {cartCount > 0 && <span className="cart-badge">{cartCount}</span>}
            </button>
            <div className="user-menu-container" ref={userMenuRef}>
              {isAuthenticated ? (
                <>
                  <button
                    className="user-button authenticated"
                    type="button"
                    aria-haspopup="menu"
                    aria-expanded={userMenuOpen}
                    onClick={() => setUserMenuOpen(!userMenuOpen)}
                  >
                    <span className="user-icon">👤</span>
                    <span className="user-name">{user.name}</span>
                  </button>
                  {userMenuOpen && (
                    <div className="user-dropdown" role="menu" aria-label="User menu">
                      <div className="user-info">
                        <p className="user-email">{user.email}</p>
                        {user.isAdmin && <span className="admin-badge">Admin</span>}
                      </div>
                      <hr className="dropdown-divider" />
                      <a href="#" className="dropdown-item" role="menuitem" onClick={(e) => e.preventDefault()}>My Profile</a>
                      <button
                        type="button"
                        className="dropdown-item"
                        role="menuitem"
                        onClick={() => {
                          setIsOrderHistoryOpen(true);
                          setUserMenuOpen(false);
                        }}
                      >
                        Orders
                        {orders.length > 0 && <span className="order-badge">{orders.length}</span>}
                      </button>
                      <a href="#" className="dropdown-item" role="menuitem" onClick={(e) => e.preventDefault()}>Settings</a>
                      <hr className="dropdown-divider" />
                      <button
                        type="button"
                        className="dropdown-item logout"
                        role="menuitem"
                        onClick={() => {
                          logout();
                          setUserMenuOpen(false);
                        }}
                      >
                        Logout
                      </button>
                    </div>
                  )}
                </>
              ) : (
                <>
                  <button
                    type="button"
                    className="auth-button"
                    onClick={() => openAuthModal('login')}
                  >
                    Sign In
                  </button>
                  <button
                    type="button"
                    className="auth-button signup"
                    onClick={() => openAuthModal('signup')}
                  >
                    Sign Up
                  </button>
                </>
              )}
            </div>
          </div>
        </div>

        <nav className="header-nav">
          <ul className="nav-menu">
            {navItems.map((item) => (
              <li key={item.id}>
                <a href={item.href} className="nav-link">{item.label}</a>
              </li>
            ))}
          </ul>
        </nav>

        <form className="search-form" onSubmit={handleSearch}>
          <input
            type="text"
            className="search-input"
            placeholder="Search products..."
            aria-label="Search products"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
          {searchQuery && (
            <button
              type="button"
              className="clear-search-button"
              onClick={() => setSearchQuery('')}
              title="Clear search"
              aria-label="Clear search"
            >
              ✕
            </button>
          )}
          <button type="submit" className="search-button">
            🔍
          </button>
        </form>

        <div className="category-filter">
          <label htmlFor="category-select" className="category-label">Category:</label>
          <select
            id="category-select"
            className="category-select"
            value={selectedCategory}
            onChange={(e) => setSelectedCategory(e.target.value)}
          >
            {categories.map((category) => (
              <option key={category} value={category}>
                {category}
              </option>
            ))}
          </select>
          {(searchQuery || selectedCategory !== 'All') && (
            <button
              type="button"
              className="clear-filters-button"
              onClick={() => {
                setSearchQuery('');
                setSelectedCategory('All');
              }}
              title="Clear all filters"
              aria-label="Clear search and category filters"
            >
              Clear
            </button>
          )}
        </div>
      </div>
      <OrderHistoryModal
        isOpen={isOrderHistoryOpen}
        onClose={() => setIsOrderHistoryOpen(false)}
        orders={orders}
      />
    </header>
  );
}

export default Header;