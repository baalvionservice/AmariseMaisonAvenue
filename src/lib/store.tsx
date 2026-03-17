
'use client';

import React, { createContext, useContext, useState, useEffect, useMemo } from 'react';
import { 
  CartItem, 
  Product, 
  Collection, 
  Category, 
  Campaign, 
  Affiliate, 
  Notification, 
  VipClient, 
  Editorial,
  BuyingGuide,
  SocialMetrics,
  SocialInteraction
} from './types';
import { 
  PRODUCTS as INITIAL_PRODUCTS, 
  COLLECTIONS as INITIAL_COLLECTIONS, 
  CATEGORIES as INITIAL_CATEGORIES,
  CAMPAIGNS as INITIAL_CAMPAIGNS,
  AFFILIATES as INITIAL_AFFILIATES,
  NOTIFICATIONS as INITIAL_NOTIFICATIONS,
  VIP_CLIENTS as INITIAL_VIP_CLIENTS,
  EDITOR_INITIAL,
  BUYING_GUIDES as INITIAL_GUIDES
} from './mock-data';

interface AppContextType {
  cart: CartItem[];
  wishlist: Product[];
  products: Product[];
  collections: Collection[];
  categories: Category[];
  campaigns: Campaign[];
  affiliates: Affiliate[];
  notifications: Notification[];
  vipClients: VipClient[];
  editorials: Editorial[];
  buyingGuides: BuyingGuide[];
  activeVip: VipClient | null;
  isShowcaseMode: boolean;
  socialMetrics: Record<string, SocialMetrics>;
  socialInteractions: SocialInteraction[];
  setShowcaseMode: (val: boolean) => void;
  addToCart: (product: Product) => void;
  removeFromCart: (productId: string) => void;
  updateQuantity: (productId: string, delta: number) => void;
  toggleWishlist: (product: Product) => void;
  clearCart: () => void;
  updateProductDescription: (productId: string, description: string) => void;
  updateCollectionNarrative: (collectionId: string, narrative: string) => void;
  addCampaign: (campaign: Campaign) => void;
  addNotification: (notification: Notification) => void;
  addEditorial: (editorial: Editorial) => void;
  addBuyingGuide: (guide: BuyingGuide) => void;
  setActiveVip: (client: VipClient | null) => void;
  toggleLike: (contentId: string, country: string) => void;
  trackShare: (contentId: string, country: string) => void;
  simulateGlobalEngagement: (contentId: string) => void;
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
  const [campaigns, setCampaigns] = useState<Campaign[]>(INITIAL_CAMPAIGNS);
  const [affiliates, setAffiliates] = useState<Affiliate[]>(INITIAL_AFFILIATES);
  const [notifications, setNotifications] = useState<Notification[]>(INITIAL_NOTIFICATIONS);
  const [vipClients, setVipClients] = useState<VipClient[]>(INITIAL_VIP_CLIENTS);
  const [editorials, setEditorials] = useState<Editorial[]>(EDITOR_INITIAL);
  const [buyingGuides, setBuyingGuides] = useState<BuyingGuide[]>(INITIAL_GUIDES);
  const [activeVip, setActiveVip] = useState<VipClient | null>(null);
  const [isShowcaseMode, setShowcaseMode] = useState<boolean>(true);
  
  const [socialMetrics, setSocialMetrics] = useState<Record<string, SocialMetrics>>({});
  const [socialInteractions, setSocialInteractions] = useState<SocialInteraction[]>([]);

  const [user, setUser] = useState<any | null>(null);

  useEffect(() => {
    const savedCart = localStorage.getItem('amarise_cart');
    const savedWishlist = localStorage.getItem('amarise_wishlist');
    const savedVipId = localStorage.getItem('amarise_active_vip');
    const savedEditorials = localStorage.getItem('amarise_editorials');
    const savedGuides = localStorage.getItem('amarise_buying_guides');
    const savedSocial = localStorage.getItem('amarise_social_metrics');
    
    if (savedCart) try { setCart(JSON.parse(savedCart)); } catch (e) {}
    if (savedWishlist) try { setWishlist(JSON.parse(savedWishlist)); } catch (e) {}
    if (savedVipId) {
      const vip = INITIAL_VIP_CLIENTS.find(v => v.id === savedVipId);
      if (vip) setActiveVip(vip);
    }
    if (savedEditorials) try { setEditorials(JSON.parse(savedEditorials)); } catch (e) {}
    if (savedGuides) try { setBuyingGuides(JSON.parse(savedGuides)); } catch (e) {}
    if (savedSocial) try { setSocialMetrics(JSON.parse(savedSocial)); } catch (e) {}

    if (!savedSocial) {
      const initialMetrics: Record<string, SocialMetrics> = {};
      INITIAL_PRODUCTS.forEach(p => {
        initialMetrics[p.id] = {
          likes: Math.floor(Math.random() * 1000) + 100,
          shares: Math.floor(Math.random() * 200) + 50,
          engagementRate: Math.random() * 5 + 2
        };
      });
      setSocialMetrics(initialMetrics);
    }
  }, []);

  useEffect(() => localStorage.setItem('amarise_cart', JSON.stringify(cart)), [cart]);
  useEffect(() => localStorage.setItem('amarise_wishlist', JSON.stringify(wishlist)), [wishlist]);
  useEffect(() => localStorage.setItem('amarise_editorials', JSON.stringify(editorials)), [editorials]);
  useEffect(() => localStorage.setItem('amarise_buying_guides', JSON.stringify(buyingGuides)), [buyingGuides]);
  useEffect(() => localStorage.setItem('amarise_social_metrics', JSON.stringify(socialMetrics)), [socialMetrics]);

  useEffect(() => {
    if (activeVip) localStorage.setItem('amarise_active_vip', activeVip.id);
    else localStorage.removeItem('amarise_active_vip');
  }, [activeVip]);

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
      const isLiked = wishlist.some(w => w.id === contentId);
      return {
        ...prev,
        [contentId]: {
          ...current,
          likes: isLiked ? Math.max(0, current.likes - 1) : current.likes + 1
        }
      };
    });
    
    setSocialInteractions(prev => [
      {
        id: 'int-' + Date.now(),
        contentId,
        type: 'like',
        country,
        timestamp: new Date().toISOString()
      },
      ...prev
    ]);
  };

  const trackShare = (contentId: string, country: string) => {
    setSocialMetrics(prev => {
      const current = prev[contentId] || { likes: 0, shares: 0, engagementRate: 0 };
      return {
        ...prev,
        [contentId]: {
          ...current,
          shares: current.shares + 1
        }
      };
    });
    setSocialInteractions(prev => [
      {
        id: 'sh-' + Date.now(),
        contentId,
        type: 'share',
        country,
        timestamp: new Date().toISOString()
      },
      ...prev
    ]);
  };

  const simulateGlobalEngagement = (contentId: string) => {
    setSocialMetrics(prev => {
      const current = prev[contentId] || { likes: 0, shares: 0, engagementRate: 0 };
      return {
        ...prev,
        [contentId]: {
          ...current,
          likes: current.likes + Math.floor(Math.random() * 50),
          shares: current.shares + Math.floor(Math.random() * 10),
          engagementRate: current.engagementRate + 0.5
        }
      };
    });
  };

  const clearCart = () => setCart([]);
  const updateProductDescription = (productId: string, description: string) => {
    setProducts(prev => prev.map(p => p.id === productId ? { ...p, subcategory: description } : p));
  };
  const updateCollectionNarrative = (collectionId: string, narrative: string) => {
    setCollections(prev => prev.map(c => c.id === collectionId ? { ...c, description: narrative } : c));
  };
  const addCampaign = (campaign: Campaign) => setCampaigns(prev => [campaign, ...prev]);
  const addNotification = (notification: Notification) => setNotifications(prev => [notification, ...prev]);
  const addEditorial = (editorial: Editorial) => setEditorials(prev => [editorial, ...prev]);
  const addBuyingGuide = (guide: BuyingGuide) => setBuyingGuides(prev => [guide, ...prev]);

  const value = useMemo(() => ({
    cart,
    wishlist,
    products,
    collections,
    categories,
    campaigns,
    affiliates,
    notifications,
    vipClients,
    editorials,
    buyingGuides,
    activeVip,
    isShowcaseMode,
    socialMetrics,
    socialInteractions,
    setShowcaseMode,
    addToCart,
    removeFromCart,
    updateQuantity,
    toggleWishlist,
    clearCart,
    updateProductDescription,
    updateCollectionNarrative,
    addCampaign,
    addNotification,
    addEditorial,
    addBuyingGuide,
    setActiveVip,
    toggleLike,
    trackShare,
    simulateGlobalEngagement,
    user,
    isAuthenticated: !!user,
  }), [cart, wishlist, products, collections, categories, campaigns, affiliates, notifications, vipClients, editorials, buyingGuides, activeVip, isShowcaseMode, socialMetrics, socialInteractions, user]);

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
