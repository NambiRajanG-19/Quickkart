import { useState, useEffect, useRef } from 'react';
import { useAuth } from '../hooks/useAuth';
import '../styles/AuthModal.css';

function AuthModal() {
  const { isAuthModalOpen, authMode, setAuthMode, login, signup, closeAuthModal } = useAuth();
  const modalRef = useRef(null);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    confirmPassword: ''
  });
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const handleInputChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
    setError(''); // Clear error when user starts typing
  };

  useEffect(() => {
    const handleKeyDown = (event) => {
      if (event.key === 'Escape') {
        closeAuthModal();
      }
    };

    if (isAuthModalOpen) {
      document.addEventListener('keydown', handleKeyDown);
      document.body.style.overflow = 'hidden';
      const firstInput = modalRef.current?.querySelector('input');
      firstInput?.focus();
    }

    return () => {
      document.removeEventListener('keydown', handleKeyDown);
      document.body.style.overflow = '';
    };
  }, [isAuthModalOpen, closeAuthModal]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    setError('');

    try {
      if (authMode === 'login') {
        const result = login(formData.email, formData.password);
        if (!result.success) {
          setError(result.error);
        }
      } else {
        // Signup validation
        if (formData.password !== formData.confirmPassword) {
          setError('Passwords do not match');
          setIsLoading(false);
          return;
        }
        if (formData.password.length < 6) {
          setError('Password must be at least 6 characters');
          setIsLoading(false);
          return;
        }

        const result = signup(formData.name, formData.email, formData.password);
        if (!result.success) {
          setError(result.error);
        }
      }
    } catch (err) {
      setError('An unexpected error occurred');
      console.error('Auth error:', err);
    } finally {
      setIsLoading(false);
    }
  };

  const switchMode = () => {
    setAuthMode(authMode === 'login' ? 'signup' : 'login');
    setFormData({
      name: '',
      email: '',
      password: '',
      confirmPassword: ''
    });
    setError('');
  };

  if (!isAuthModalOpen) return null;

  return (
    <div className="auth-modal-overlay" onClick={closeAuthModal}>
      <div
        className="auth-modal"
        onClick={(e) => e.stopPropagation()}
        ref={modalRef}
        role="dialog"
        aria-modal="true"
        aria-labelledby="auth-title"
      >
        <div className="auth-header">
          <h2 id="auth-title" className="auth-title">
            {authMode === 'login' ? 'Welcome Back' : 'Create Account'}
          </h2>
          <button type="button" className="auth-close" onClick={closeAuthModal} aria-label="Close authentication modal">✕</button>
        </div>

        <form className="auth-form" onSubmit={handleSubmit}>
          {authMode === 'signup' && (
            <div className="form-group">
              <label htmlFor="name" className="form-label">Full Name</label>
              <input
                type="text"
                id="name"
                name="name"
                className="form-input"
                value={formData.name}
                onChange={handleInputChange}
                required
                placeholder="Enter your full name"
              />
            </div>
          )}

          <div className="form-group">
            <label htmlFor="email" className="form-label">Email</label>
            <input
              type="email"
              id="email"
              name="email"
              className="form-input"
              value={formData.email}
              onChange={handleInputChange}
              required
              placeholder="Enter your email"
            />
          </div>

          <div className="form-group">
            <label htmlFor="password" className="form-label">Password</label>
            <input
              type="password"
              id="password"
              name="password"
              className="form-input"
              value={formData.password}
              onChange={handleInputChange}
              required
              placeholder="Enter your password"
              minLength="6"
            />
          </div>

          {authMode === 'signup' && (
            <div className="form-group">
              <label htmlFor="confirmPassword" className="form-label">Confirm Password</label>
              <input
                type="password"
                id="confirmPassword"
                name="confirmPassword"
                className="form-input"
                value={formData.confirmPassword}
                onChange={handleInputChange}
                required
                placeholder="Confirm your password"
                minLength="6"
              />
            </div>
          )}

          {error && <div className="error-message">{error}</div>}

          <button
            type="submit"
            className="auth-submit-btn"
            disabled={isLoading}
          >
            {isLoading
              ? (authMode === 'login' ? 'Signing In...' : 'Creating Account...')
              : (authMode === 'login' ? 'Sign In' : 'Create Account')
            }
          </button>
        </form>

        <div className="auth-footer">
          <p className="auth-switch-text">
            {authMode === 'login' ? "Don't have an account?" : 'Already have an account?'}
            <button type="button" className="auth-switch-btn" onClick={switchMode}>
              {authMode === 'login' ? 'Sign Up' : 'Sign In'}
            </button>
          </p>
        </div>

        {authMode === 'login' && (
          <div className="demo-accounts">
            <p className="demo-title">Demo Accounts:</p>
            <div className="demo-account">
              <small>User: user@example.com / password123</small>
            </div>
            <div className="demo-account">
              <small>Admin: admin@example.com / admin123</small>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

export default AuthModal;