import React, { useState, useEffect } from 'react';
import { Product, ProductSize, CartItem, Order } from './types';
import { PRODUCTS } from './data/products';
import { checkAdminAuth } from './data/storage';
import { Header } from './components/Header';
import { Hero } from './components/Hero';
import { Values } from './components/Values';
import { Catalog } from './components/Catalog';
import { BudgetBuilder } from './components/BudgetBuilder';
import { DeliverySection } from './components/DeliverySection';
import { ProductDrawer } from './components/ProductDrawer';
import { CartDrawer } from './components/CartDrawer';
import { OrderConfirmationModal } from './components/OrderConfirmationModal';
import { Footer } from './components/Footer';
import { AdminPanel } from './components/AdminPanel';
import { AdminLogin } from './components/AdminLogin';

const STORAGE_CART_KEY = 'botanika_cart_v1';

export const App: React.FC = () => {
  // Navigation / View State
  const [isAdminView, setIsAdminView] = useState<boolean>(() => {
    return window.location.pathname.endsWith('/admin') || window.location.pathname.includes('/admin') || window.location.hash === '#admin';
  });
  const [isAdminAuthenticated, setIsAdminAuthenticated] = useState<boolean>(() => checkAdminAuth());

  // Listen to browser popstate / hash
  useEffect(() => {
    const handlePopState = () => {
      const isPathAdmin = window.location.pathname.endsWith('/admin') || window.location.pathname.includes('/admin') || window.location.hash === '#admin';
      setIsAdminView(isPathAdmin);
      setIsAdminAuthenticated(checkAdminAuth());
    };

    window.addEventListener('popstate', handlePopState);
    window.addEventListener('hashchange', handlePopState);
    return () => {
      window.removeEventListener('popstate', handlePopState);
      window.removeEventListener('hashchange', handlePopState);
    };
  }, []);

  const navigateToAdmin = () => {
    window.history.pushState(null, '', '#admin');
    setIsAdminView(true);
    setIsAdminAuthenticated(checkAdminAuth());
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const navigateToStore = () => {
    window.history.pushState(null, '', '#');
    setIsAdminView(false);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  // Cart State with LocalStorage persistence
  const [cartItems, setCartItems] = useState<CartItem[]>(() => {
    try {
      const raw = localStorage.getItem(STORAGE_CART_KEY);
      return raw ? JSON.parse(raw) : [];
    } catch {
      return [];
    }
  });

  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_CART_KEY, JSON.stringify(cartItems));
    } catch (e) {
      console.error('Failed to sync cart to localStorage', e);
    }
  }, [cartItems]);

  // Drawer & Modal States
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);
  const [selectedInitialSize, setSelectedInitialSize] = useState<ProductSize>('M');
  const [confirmedOrder, setConfirmedOrder] = useState<Order | null>(null);

  // Cart Operations
  const handleAddToCart = (product: Product, size: ProductSize, customPrice?: number, customNote?: string) => {
    const sizeDetail = product.sizes[size];
    const price = customPrice !== undefined ? customPrice : sizeDetail.price;
    const itemKey = `${product.id}-${size}`;

    setCartItems((prev) => {
      const existing = prev.find((i) => i.id === itemKey);
      if (existing) {
        return prev.map((i) =>
          i.id === itemKey ? { ...i, quantity: i.quantity + 1 } : i
        );
      } else {
        return [
          ...prev,
          {
            id: itemKey,
            productId: product.id,
            title: customNote ? `${product.title} (${customNote})` : product.title,
            image: product.image,
            size,
            sizeLabel: sizeDetail.label,
            diameter: sizeDetail.diameter,
            price,
            quantity: 1
          }
        ];
      }
    });
  };

  const handleUpdateQuantity = (id: string, quantity: number) => {
    if (quantity <= 0) {
      handleRemoveItem(id);
    } else {
      setCartItems((prev) => prev.map((item) => (item.id === id ? { ...item, quantity } : item)));
    }
  };

  const handleRemoveItem = (id: string) => {
    setCartItems((prev) => prev.filter((item) => item.id !== id));
  };

  const handleClearCart = () => {
    setCartItems([]);
  };

  const handleOrderSuccess = (order: Order) => {
    setConfirmedOrder(order);
  };

  const handleProductSelect = (product: Product, defaultSize: ProductSize = 'M') => {
    setSelectedInitialSize(defaultSize);
    setSelectedProduct(product);
  };

  const totalCartCount = cartItems.reduce((acc, i) => acc + i.quantity, 0);

  // Render Admin View if requested
  if (isAdminView) {
    if (isAdminAuthenticated) {
      return <AdminPanel onBackToStore={navigateToStore} />;
    } else {
      return (
        <AdminLogin
          onSuccess={() => setIsAdminAuthenticated(true)}
          onBackToStore={navigateToStore}
        />
      );
    }
  }

  // Render Public Boutique Storefront
  return (
    <div className="min-h-screen flex flex-col bg-botanika-bg text-botanika-text selection:bg-botanika-olive selection:text-white">
      {/* Header */}
      <Header
        cartCount={totalCartCount}
        onOpenCart={() => setIsCartOpen(true)}
        onNavigateAdmin={navigateToAdmin}
      />

      {/* Main Content */}
      <main className="flex-1">
        {/* 1. Hero Section */}
        <Hero
          onExploreCatalog={() => {
            const el = document.getElementById('catalog');
            if (el) el.scrollIntoView({ behavior: 'smooth' });
          }}
          onOpenBudget={() => {
            const el = document.getElementById('budget');
            if (el) el.scrollIntoView({ behavior: 'smooth' });
          }}
        />

        {/* 2. Studio Values & Rules */}
        <Values />

        {/* 3. Catalog Section */}
        <Catalog
          products={PRODUCTS}
          onSelectProduct={handleProductSelect}
          onQuickAddToCart={(product, size) => handleAddToCart(product, size)}
        />

        {/* 4. Budget Builder Section */}
        <BudgetBuilder
          onAddCustomBouquet={(product, size, budget, note) => {
            handleAddToCart(product, size, budget, note);
            setIsCartOpen(true);
          }}
        />

        {/* 5. Delivery & Care Section */}
        <DeliverySection />
      </main>

      {/* Footer */}
      <Footer onNavigateAdmin={navigateToAdmin} />

      {/* Modals & Drawers */}
      <ProductDrawer
        product={selectedProduct}
        initialSize={selectedInitialSize}
        onClose={() => setSelectedProduct(null)}
        onAddToCart={(product, size) => handleAddToCart(product, size)}
      />

      <CartDrawer
        isOpen={isCartOpen}
        onClose={() => setIsCartOpen(false)}
        items={cartItems}
        onUpdateQuantity={handleUpdateQuantity}
        onRemoveItem={handleRemoveItem}
        onClearCart={handleClearCart}
        onOrderSuccess={handleOrderSuccess}
      />

      <OrderConfirmationModal
        order={confirmedOrder}
        onClose={() => setConfirmedOrder(null)}
        onGoToAdmin={navigateToAdmin}
      />
    </div>
  );
};
