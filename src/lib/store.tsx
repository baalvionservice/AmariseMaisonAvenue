
'use client';

import React, { createContext, useContext, useState, useEffect, useMemo } from 'react';
import { CartItem, Product, Collection, Category } from './types';
import { PRODUCTS as INITIAL_PRODUCTS, COLLECTIONS as INITIAL_COLLECTIONS, CATEGORIES as INITIAL_CATEGORIES } from './mock-data';

/**
 * AppState Interface
 * Extended to include live management of products and collections for the AI Engine.
 */
interface AppContextType {
  cart: CartItem[];
  wishlist: Product[];
  products: Product[];
  collections: Collection[];
  categories: Category[];
  addToCart: (product: Product) => void;
  removeFromCart: (productId: string) => void;
  updateQuantity: (productId: string, delta: number) => void;
  toggleWishlist: (product: Product) => void;
  clearCart: () => void;
  // AI Engine Updates
  updateProductDescription: (productId: string, description: string) => void;
  updateCollectionNarrative: (collectionId: string, narrative: string) => void;
  updateCategoryNarrative: (categoryId: string, narrative: string) => void;
  // Mock Security/Auth placeholders
  user: any | null; 
  isAuthenticated: boolean;
}

const AppContext = createContext<AppContextType | undefined>(undefined);

export function AppProvider({ children }: { children: React.ReactNode }) {
  const [cart, setCart] = useState<CartItem[]>([]);
  const [wishlist, setWishlist] = useState<Product[]>([]);
  const [products, setProducts] = useState<Product[]>(INITIAL_PRODUCTS);
  const [collections, setCollections] = useState<Collection[]>(INITIAL_COLLECTIONS);
  const [categories, setCategories] = useState<Category[]>(INITIAL_CATEGORIES);
  
  const [user, setUser] = useState<any | null>(null);

  useEffect(() => {
    const savedCart = localStorage.getItem('amarise_cart');
    const savedWishlist = localStorage.getItem('amarise_wishlist');
    const savedProducts = localStorage.getItem('amarise_live_products');
    
    if (savedCart) {
      try { setCart(JSON.parse(savedCart)); } catch (e) { console.warn("Cart recovery failed"); }
    }
    if (savedWishlist) {
      try { setWishlist(JSON.parse(savedWishlist)); } catch (e) { console.warn("Wishlist recovery failed"); }
    }
    if (savedProducts) {
      try { setProducts(JSON.parse(savedProducts)); } catch (e) { console.warn("Product sync failed"); }
    }
  }, []);

  useEffect(() => {
    localStorage.setItem('amarise_cart', JSON.stringify(cart));
  }, [cart]);

  useEffect(() => {
    localStorage.setItem('amarise_wishlist', JSON.stringify(wishlist));
  }, [wishlist]);

  useEffect(() => {
    localStorage.setItem('amarise_live_products', JSON.stringify(products));
  }, [products]);

  const addToCart = (product: Product) => {
    setCart((prev) => {
      const existing = prev.find((item) => item.id === product.id);
      if (existing) {
        return prev.map((item) =>
          item.id === product.id ? { ...item, quantity: item.quantity + 1 } : item
        );
      }
      return [...prev, { ...product, quantity: 1 }];
    });
  };

  const removeFromCart = (productId: string) => {
    setCart((prev) => prev.filter((item) => item.id !== productId));
  };

  const updateQuantity = (productId: string, delta: number) => {
    setCart((prev) => prev.map(item => {
      if (item.id === productId) {
        const newQty = Math.max(1, item.quantity + delta);
        return { ...item, quantity: newQty };
      }
      return item;
    }));
  };

  const toggleWishlist = (product: Product) => {
    setWishlist((prev) => {
      const exists = prev.some((item) => item.id === product.id);
      if (exists) return prev.filter((item) => item.id !== product.id);
      return [...prev, product];
    });
  };

  const clearCart = () => setCart([]);

  const updateProductDescription = (productId: string, description: string) => {
    setProducts(prev => prev.map(p => p.id === productId ? { ...p, subcategory: description } : p));
  };

  const updateCollectionNarrative = (collectionId: string, narrative: string) => {
    setCollections(prev => prev.map(c => c.id === collectionId ? { ...c, description: narrative } : c));
  };

  const updateCategoryNarrative = (categoryId: string, narrative: string) => {
    // Categories are more static in our mock-data, but we simulate updating their metadata
    console.log(`Updated category ${categoryId} with narrative: ${narrative.substring(0, 50)}...`);
  };

  const value = useMemo(() => ({
    cart,
    wishlist,
    products,
    collections,
    categories,
    addToCart,
    removeFromCart,
    updateQuantity,
    toggleWishlist,
    clearCart,
    updateProductDescription,
    updateCollectionNarrative,
    updateCategoryNarrative,
    user,
    isAuthenticated: !!user,
  }), [cart, wishlist, products, collections, categories, user]);

  return (
    <AppContext.Provider value={value}>
      {children}
    </AppContext.Provider>
  );
}

export function useAppStore() {
  const context = useContext(AppContext);
  if (!context) throw new Error('useAppStore must be used within AppProvider');
  return context;
}
