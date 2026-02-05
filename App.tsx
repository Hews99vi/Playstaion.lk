
import React, { useState, useEffect } from 'react';
import { HashRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { HelmetProvider } from 'react-helmet-async';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import Assistant from './components/Assistant';
import ScrollToTop from './components/ScrollToTop';
import ErrorBoundary from './components/ErrorBoundary';
import Home from './pages/Home';
import Shop from './pages/Shop';
import ProductDetail from './pages/ProductDetail';
import RepairBooking from './pages/RepairBooking';
import Cart from './pages/Cart';
import Manifesto from './pages/Manifesto';
import Connect from './pages/Connect';
import Login from './pages/Login';
import Admin from './pages/Admin';
import { CartItem, Product, User } from './types';
import { MOCK_PRODUCTS } from './constants';
import { supabaseService } from './services/supabaseService';

const App: React.FC = () => {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const [cart, setCart] = useState<CartItem[]>([]);
  const [user, setUser] = useState<User | null>(() => {
    const saved = localStorage.getItem('psl_session');
    return saved ? JSON.parse(saved) : null;
  });

  // Load products from Supabase on mount and subscribe to real-time changes
  useEffect(() => {
    const loadProducts = async () => {
      setLoading(true);
      const supabaseProducts = await supabaseService.getProducts();
      
      // If no products in Supabase, seed with mock data
      if (supabaseProducts.length === 0) {
        const isEmpty = await supabaseService.isTableEmpty();
        if (isEmpty) {
          await supabaseService.seedProducts(MOCK_PRODUCTS);
          setProducts(MOCK_PRODUCTS);
        }
      } else {
        setProducts(supabaseProducts);
      }
      
      setLoading(false);
    };
    
    loadProducts();

    // Subscribe to real-time changes across all browsers
    const subscription = supabaseService.subscribeToProducts((payload) => {
      if (payload.eventType === 'INSERT') {
        setProducts(prev => [payload.new, ...prev]);
      } else if (payload.eventType === 'UPDATE') {
        setProducts(prev => prev.map(p => p.id === payload.new.id ? payload.new : p));
      } else if (payload.eventType === 'DELETE') {
        setProducts(prev => prev.filter(p => p.id !== payload.old.id));
      }
    });

    // Cleanup subscription on unmount
    return () => {
      subscription.unsubscribe();
    };
  }, []);

  const addToCart = (product: Product) => {
    setCart(prev => {
      const existing = prev.find(item => item.id === product.id);
      if (existing) {
        return prev.map(item => 
          item.id === product.id ? { ...item, quantity: item.quantity + 1 } : item
        );
      }
      return [...prev, { ...product, quantity: 1 }];
    });
  };

  const removeFromCart = (productId: string) => {
    setCart(prev => prev.filter(item => item.id !== productId));
  };

  const updateQuantity = (productId: string, delta: number) => {
    setCart(prev => prev.map(item => {
      if (item.id === productId) {
        const newQty = Math.max(1, item.quantity + delta);
        return { ...item, quantity: newQty };
      }
      return item;
    }));
  };

  const clearCart = () => setCart([]);

  const handleLogin = (u: User) => {
    setUser(u);
    localStorage.setItem('psl_session', JSON.stringify(u));
  };

  const handleLogout = () => {
    setUser(null);
    localStorage.removeItem('psl_session');
  };

  const updateProduct = async (updated: Product) => {
    const success = await supabaseService.updateProduct(updated);
    if (success) {
      setProducts(prev => prev.map(p => p.id === updated.id ? updated : p));
    }
  };

  const addProduct = async (newProduct: Product) => {
    const success = await supabaseService.addProduct(newProduct);
    if (success) {
      setProducts(prev => [newProduct, ...prev]);
    }
  };

  const deleteProduct = async (id: string) => {
    const success = await supabaseService.deleteProduct(id);
    if (success) {
      setProducts(prev => prev.filter(p => p.id !== id));
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-black flex items-center justify-center">
        <div className="text-center space-y-4">
          <div className="w-16 h-16 border-4 border-white/20 border-t-white rounded-full animate-spin mx-auto"></div>
          <p className="text-white/40 text-xs font-black uppercase tracking-widest">Loading Inventory...</p>
        </div>
      </div>
    );
  }

  return (
    <HelmetProvider>
      <ErrorBoundary>
        <Router>
          <ScrollToTop />
          <div className="flex flex-col min-h-screen bg-[#050505] text-white">
            <Navbar cartCount={cart.reduce((acc, item) => acc + item.quantity, 0)} user={user} logout={handleLogout} />
            <main className="flex-1">
              <Routes>
                <Route path="/" element={<Home addToCart={addToCart} products={products} />} />
                <Route path="/shop" element={<Shop addToCart={addToCart} products={products} />} />
                <Route path="/product/:id" element={<ProductDetail addToCart={addToCart} products={products} />} />
                <Route path="/repairs" element={<RepairBooking />} />
                <Route path="/cart" element={<Cart cart={cart} removeFromCart={removeFromCart} updateQuantity={updateQuantity} clearCart={clearCart} />} />
                <Route path="/about" element={<Manifesto />} />
                <Route path="/contact" element={<Connect />} />
                <Route path="/admin/login" element={<Login onLogin={handleLogin} />} />
                <Route 
                  path="/admin" 
                  element={user?.role === 'admin' ? <Admin products={products} onUpdate={updateProduct} onAdd={addProduct} onDelete={deleteProduct} /> : <Navigate to="/admin/login" />} 
                />
                <Route path="/account" element={<Navigate to="/admin/login" />} />
              </Routes>
            </main>
            <Assistant />
            <Footer />
          </div>
        </Router>
      </ErrorBoundary>
    </HelmetProvider>
  );
};

export default App;
