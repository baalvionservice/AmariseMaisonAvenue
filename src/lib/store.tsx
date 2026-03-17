
'use client';

import React, { createContext, useContext, useState, useEffect, useMemo } from 'react';
import { 
  CartItem, 
  Product, 
  Collection, 
  Category, 
  Department,
  City, 
  BuyingGuide, 
  Editorial,
  SocialMetrics,
  SocialInteraction
} from './types';
import { 
  PRODUCTS as INITIAL_PRODUCTS, 
  COLLECTIONS as INITIAL_COLLECTIONS, 
  CATEGORIES as INITIAL_CATEGORIES,
  DEPARTMENTS as INITIAL_DEPARTMENTS,
  CITIES as INITIAL_CITIES,
  BUYING_GUIDES as INITIAL_GUIDES,
  EDITOR_INITIAL
} from './mock-data';

interface AppContextType {
  cart: CartItem[];
  wishlist: Product[];
  products: Product[];
  collections: Collection[];
  categories: Category[];
  departments: Department[];
  cities: City[];
  buyingGuides: BuyingGuide[];
  editorials: Editorial[];
  socialMetrics: Record<string, SocialMetrics>;
  socialInteractions: SocialInteraction[];
  addToCart: (product: Product) => void;
  removeFromCart: (productId: string) => void;
  updateQuantity: (productId: string, delta: number) => void;
  toggleWishlist: (product: Product) => void;
  clearCart: () => void;
  addEditorial: (editorial: Editorial) => void;
  toggleLike: (contentId: string, country: string) => void;
  trackShare: (contentId: string, country: string) => void;
}

const AppContext = createContext<AppContextType | undefined>(undefined);

export function AppProvider({ children }: { children: React.ReactNode }) {
  const [cart, setCart] = useState<CartItem[]>([]);
  const [wishlist, setWishlist] = useState<Product[]>([]);
  const [products, setProducts] = useState<Product[]>(INITIAL_PRODUCTS);
  const [collections, setCollections] = useState<Collection[]>(INITIAL_COLLECTIONS);
  const [categories, setCategories] = useState<Category[]>(INITIAL_CATEGORIES);
  const [departments, setDepartments] = useState<Department[]>(INITIAL_DEPARTMENTS);
  const [cities, setCities] = useState<City[]>(INITIAL_CITIES);
  const [buyingGuides, setBuyingGuides] = useState<BuyingGuide[]>(INITIAL_GUIDES);
  const [editorials, setEditorials] = useState<Editorial[]>(EDITOR_INITIAL);
  const [socialMetrics, setSocialMetrics] = useState<Record<string, SocialMetrics>>({});
  const [socialInteractions, setSocialInteractions] = useState<SocialInteraction[]>([]);

  useEffect(() => {
    const initialMetrics: Record<string, SocialMetrics> = {};
    INITIAL_PRODUCTS.forEach(p => {
      initialMetrics[p.id] = {
        likes: Math.floor(Math.random() * 1000) + 100,
        shares: Math.floor(Math.random() * 200) + 50,
        engagementRate: Math.random() * 5 + 2
      };
    });
    setSocialMetrics(initialMetrics);
  }, []);

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

  const toggleLike = (contentId: string, country: string) => {
    setSocialMetrics(prev => {
      const current = prev[contentId] || { likes: 0, shares: 0, engagementRate: 0 };
      return { ...prev, [contentId]: { ...current, likes: current.likes + 1 } };
    });
  };

  const trackShare = (contentId: string, country: string) => {
    setSocialMetrics(prev => {
      const current = prev[contentId] || { likes: 0, shares: 0, engagementRate: 0 };
      return { ...prev, [contentId]: { ...current, shares: current.shares + 1 } };
    });
  };

  const clearCart = () => setCart([]);
  const addEditorial = (editorial: Editorial) => setEditorials(prev => [editorial, ...prev]);

  const value = useMemo(() => ({
    cart,
    wishlist,
    products,
    collections,
    categories,
    departments,
    cities,
    buyingGuides,
    editorials,
    socialMetrics,
    socialInteractions,
    addToCart,
    removeFromCart,
    updateQuantity,
    toggleWishlist,
    clearCart,
    addEditorial,
    toggleLike,
    trackShare,
  }), [cart, wishlist, products, collections, categories, departments, cities, buyingGuides, editorials, socialMetrics, socialInteractions]);

  return <AppContext.Provider value={value}>{children}</AppContext.Provider>;
}

export function useAppStore() {
  const context = useContext(AppContext);
  if (!context) throw new Error('useAppStore must be used within AppProvider');
  return context;
}
