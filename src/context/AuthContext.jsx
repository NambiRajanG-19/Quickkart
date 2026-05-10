import { createContext, useState, useEffect } from 'react';

const AuthContext = createContext();

export { AuthContext };

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(() => {
    const savedUser = localStorage.getItem('quickkart_user');
    if (savedUser) {
      try {
        return JSON.parse(savedUser);
      } catch (error) {
        console.error('Error parsing saved user:', error);
        localStorage.removeItem('quickkart_user');
        return null;
      }
    }
    return null;
  });
  const [isAuthModalOpen, setIsAuthModalOpen] = useState(false);
  const [authMode, setAuthMode] = useState('login'); // 'login' or 'signup'

  // Save user to localStorage whenever user changes
  useEffect(() => {
    if (user) {
      localStorage.setItem('quickkart_user', JSON.stringify(user));
    } else {
      localStorage.removeItem('quickkart_user');
    }
  }, [user]);

  const login = (email, password) => {
    // Mock authentication - in a real app, this would call an API
    const mockUsers = [
      { id: 1, email: 'user@example.com', password: 'password123', name: 'John Doe' },
      { id: 2, email: 'admin@example.com', password: 'admin123', name: 'Admin User', isAdmin: true }
    ];

    const foundUser = mockUsers.find(u => u.email === email && u.password === password);

    if (foundUser) {
      const { password: _, ...userWithoutPassword } = foundUser;
      setUser(userWithoutPassword);
      setIsAuthModalOpen(false);
      return { success: true };
    }

    return { success: false, error: 'Invalid email or password' };
  };

  const signup = (name, email, password) => {
    // Mock signup - in a real app, this would call an API
    const mockUsers = JSON.parse(localStorage.getItem('quickkart_users') || '[]');

    // Check if user already exists
    if (mockUsers.find(u => u.email === email)) {
      return { success: false, error: 'User already exists with this email' };
    }

    const newUser = {
      id: Date.now(),
      name,
      email,
      password, // In real app, this would be hashed
      createdAt: new Date().toISOString()
    };

    mockUsers.push(newUser);
    localStorage.setItem('quickkart_users', JSON.stringify(mockUsers));

    const { password: _, ...userWithoutPassword } = newUser;
    setUser(userWithoutPassword);
    setIsAuthModalOpen(false);
    return { success: true };
  };

  const logout = () => {
    setUser(null);
  };

  const openAuthModal = (mode = 'login') => {
    setAuthMode(mode);
    setIsAuthModalOpen(true);
  };

  const closeAuthModal = () => {
    setIsAuthModalOpen(false);
  };

  const value = {
    user,
    isAuthenticated: !!user,
    isAuthModalOpen,
    authMode,
    login,
    signup,
    logout,
    openAuthModal,
    closeAuthModal,
    setAuthMode
  };

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
};