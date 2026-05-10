import { useState } from 'react';
import Header from './assets/components/Header'
import Hero from './components/Hero'
import ProductList from './components/ProductList'
import CartSidebar from './components/CartSidebar'
import WishlistSidebar from './components/WishlistSidebar'
import AuthModal from './components/AuthModal'
import Footer from './components/Footer'
import { CartProvider } from './context/CartContext'
import { AuthProvider } from './context/AuthContext'
import { products } from './data/products'
import './styles/App.css'

function AppContent() {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('All');

  return (
    <div className="app">
      <Header searchQuery={searchQuery} setSearchQuery={setSearchQuery} selectedCategory={selectedCategory} setSelectedCategory={setSelectedCategory} />
      <Hero />
      <main className="main-content">
        <ProductList products={products} searchQuery={searchQuery} selectedCategory={selectedCategory} />
      </main>
      <CartSidebar />
      <WishlistSidebar />
      <AuthModal />
      <Footer />
    </div>
  )
}

function App() {
  return (
    <AuthProvider>
      <CartProvider>
        <AppContent />
      </CartProvider>
    </AuthProvider>
  )
}

function placeholderFunction() {
    console.log("This is a placeholder function.");
}

export default App