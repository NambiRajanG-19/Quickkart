/* eslint-disable react-refresh/only-export-components */
import { createContext, useContext, useState, useEffect, useCallback } from 'react';

const CartContext = createContext();

const loadFromStorage = (key, fallback) => {
  try {
    const stored = localStorage.getItem(key);
    return stored ? JSON.parse(stored) : fallback;
  } catch (error) {
    console.error(`Error loading ${key} from localStorage:`, error);
    return fallback;
  }
};

export const CartProvider = ({ children }) => {
  const [cart, setCart] = useState(() => loadFromStorage('quickkart_cart', []));
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [wishlist, setWishlist] = useState(() => loadFromStorage('quickkart_wishlist', []));
  const [isWishlistOpen, setIsWishlistOpen] = useState(false);
  const [orders, setOrders] = useState(() => loadFromStorage('quickkart_orders', []));

  useEffect(() => {
    localStorage.setItem('quickkart_cart', JSON.stringify(cart));
  }, [cart]);

  useEffect(() => {
    localStorage.setItem('quickkart_wishlist', JSON.stringify(wishlist));
  }, [wishlist]);

  useEffect(() => {
    localStorage.setItem('quickkart_orders', JSON.stringify(orders));
  }, [orders]);

  // Add item to cart
  const addToCart = useCallback((product) => {
    setCart((prevCart) => {
      const existingItem = prevCart.find((item) => item.id === product.id);
      if (existingItem) {
        return prevCart.map((item) =>
          item.id === product.id
            ? { ...item, quantity: item.quantity + 1 }
            : item
        );
      }
      return [...prevCart, { ...product, quantity: 1 }];
    });
  }, []);

  // Remove item from cart
  const removeFromCart = useCallback((productId) => {
    setCart((prevCart) => prevCart.filter((item) => item.id !== productId));
  }, []);

  // Update item quantity
  const updateQuantity = useCallback((productId, newQuantity) => {
    if (newQuantity <= 0) {
      removeFromCart(productId);
      return;
    }
    setCart((prevCart) =>
      prevCart.map((item) =>
        item.id === productId ? { ...item, quantity: newQuantity } : item
      )
    );
  }, [removeFromCart]);

  // Clear entire cart
  const clearCart = useCallback(() => {
    setCart([]);
  }, []);

  // Toggle cart sidebar
  const toggleCart = useCallback(() => {
    setIsCartOpen((prevState) => !prevState);
  }, []);

  // Open cart
  const openCart = useCallback(() => {
    setIsCartOpen(true);
  }, []);

  // Close cart
  const closeCart = useCallback(() => {
    setIsCartOpen(false);
  }, []);

  // Toggle wishlist sidebar
  const toggleWishlist = useCallback(() => {
    setIsWishlistOpen((prevState) => !prevState);
  }, []);

  // Open wishlist
  const openWishlist = useCallback(() => {
    setIsWishlistOpen(true);
  }, []);

  // Close wishlist
  const closeWishlist = useCallback(() => {
    setIsWishlistOpen(false);
  }, []);

  // Get total items count
  const getTotalItems = useCallback(() => {
    return cart.reduce((total, item) => total + item.quantity, 0);
  }, [cart]);

  // Get total price
  const getTotalPrice = useCallback(() => {
    return cart.reduce((total, item) => total + item.price * item.quantity, 0).toFixed(2);
  }, [cart]);

  // Add item to wishlist
  const addToWishlist = useCallback((product) => {
    setWishlist((prevWishlist) => {
      const exists = prevWishlist.find((item) => item.id === product.id);
      if (exists) {
        return prevWishlist.filter((item) => item.id !== product.id);
      }
      return [...prevWishlist, product];
    });
  }, []);

  // Remove item from wishlist
  const removeFromWishlist = useCallback((productId) => {
    setWishlist((prevWishlist) =>
      prevWishlist.filter((item) => item.id !== productId)
    );
  }, []);

  // Check if item is wishlisted
  const isWishlisted = useCallback((productId) => {
    return wishlist.some((item) => item.id === productId);
  }, [wishlist]);

  // Get wishlist count
  const getWishlistCount = useCallback(() => {
    return wishlist.length;
  }, [wishlist]);

  const addOrder = useCallback((order) => {
    setOrders((prevOrders) => [order, ...prevOrders]);
  }, []);

  const value = {
    // Cart
    cart,
    addToCart,
    removeFromCart,
    updateQuantity,
    clearCart,
    getTotalItems,
    getTotalPrice,
    isCartOpen,
    toggleCart,
    openCart,
    closeCart,
    // Wishlist
    wishlist,
    addToWishlist,
    removeFromWishlist,
    isWishlisted,
    getWishlistCount,
    isWishlistOpen,
    toggleWishlist,
    openWishlist,
    closeWishlist,
    // Orders
    orders,
    addOrder,
  };

  return (
    <CartContext.Provider value={value}>
      {children}
    </CartContext.Provider>
  );
};

export const useCart = () => {
  const context = useContext(CartContext);
  if (!context) {
    throw new Error('useCart must be used within a CartProvider');
  }
  return context;
};