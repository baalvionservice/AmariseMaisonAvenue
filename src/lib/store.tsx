
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
  AdminAccount,
  Vendor,
  Campaign,
  AuditLog,
  VipClient,
  GlobalSettings
} from './types';
import { 
  PRODUCTS as INITIAL_PRODUCTS, 
  COLLECTIONS as INITIAL_COLLECTIONS, 
  CATEGORIES as INITIAL_CATEGORIES,
  DEPARTMENTS as INITIAL_DEPARTMENTS,
  CITIES as INITIAL_CITIES,
  BUYING_GUIDES as INITIAL_GUIDES,
  EDITOR_INITIAL,
  ADMIN_ACCOUNTS,
  VENDORS,
  CAMPAIGNS,
  AUDIT_LOGS,
  VIP_CLIENTS
} from './mock-data';

interface AppContextType {
  // Data State
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
  
  // High-Level Admin State
  admins: AdminAccount[];
  vendors: Vendor[];
  activeCampaigns: Campaign[];
  auditLogs: AuditLog[];
  vipClients: VipClient[];
  globalSettings: GlobalSettings;
  
  // Showcase State
  isShowcaseMode: boolean;
  activeVip: VipClient | null;
  activeVendor: Vendor | null;
  
  // Actions
  addToCart: (product: Product) => void;
  removeFromCart: (productId: string) => void;
  updateQuantity: (productId: string, delta: number) => void;
  toggleWishlist: (product: Product) => void;
  clearCart: () => void;
  
  // Admin Actions
  upsertProduct: (product: Product) => void;
  deleteProduct: (id: string) => void;
  upsertCollection: (collection: Collection) => void;
  upsertEditorial: (editorial: Editorial) => void;
  upsertAdmin: (admin: AdminAccount) => void;
  upsertVendor: (vendor: Vendor) => void;
  upsertCampaign: (campaign: Campaign) => void;
  updateGlobalSettings: (settings: GlobalSettings) => void;
  
  // Social Actions
  toggleLike: (contentId: string, country: string) => void;
  trackShare: (contentId: string, country: string) => void;
  
  // System Controls
  setShowcaseMode: (val: boolean) => void;
  setActiveVip: (vip: VipClient | null) => void;
  setActiveVendor: (vendor: Vendor | null) => void;
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
  
  // Admin Extensions
  const [admins, setAdmins] = useState<AdminAccount[]>(ADMIN_ACCOUNTS);
  const [vendors, setVendors] = useState<Vendor[]>(VENDORS);
  const [activeCampaigns, setActiveCampaigns] = useState<Campaign[]>(CAMPAIGNS);
  const [auditLogs, setAuditLogs] = useState<AuditLog[]>(AUDIT_LOGS);
  const [vipClients, setVipClients] = useState<VipClient[]>(VIP_CLIENTS);
  const [globalSettings, setGlobalSettings] = useState<GlobalSettings>({
    theme: { primary: '#7E3F98', accent: '#D4AF37', fontFamily: 'Inter' },
    seo: { defaultTitle: 'Amarisé Luxe', defaultDesc: 'Global Luxury Flagship', sitemapUrl: '/sitemap.xml' },
    payments: { cards: true, wallets: true, crypto: false }
  });
  
  const [isShowcaseMode, setShowcaseMode] = useState(false);
  const [activeVip, setActiveVip] = useState<VipClient | null>(null);
  const [activeVendor, setActiveVendor] = useState<Vendor | null>(VENDORS[0]);

  useEffect(() => {
    const initialMetrics: Record<string, SocialMetrics> = {};
    products.forEach(p => {
      initialMetrics[p.id] = {
        likes: Math.floor(Math.random() * 1000) + 100,
        shares: Math.floor(Math.random() * 200) + 50,
        engagementRate: Math.random() * 5 + 2
      };
    });
    setSocialMetrics(initialMetrics);
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

  const upsertProduct = (p: Product) => {
    setProducts(prev => {
      const idx = prev.findIndex(item => item.id === p.id);
      if (idx > -1) {
        const next = [...prev];
        next[idx] = p;
        return next;
      }
      return [p, ...prev];
    });
  };

  const deleteProduct = (id: string) => {
    setProducts(prev => prev.filter(p => p.id !== id));
  };

  const upsertCollection = (c: Collection) => {
    setCollections(prev => {
      const idx = prev.findIndex(item => item.id === c.id);
      if (idx > -1) {
        const next = [...prev];
        next[idx] = c;
        return next;
      }
      return [c, ...prev];
    });
  };

  const upsertEditorial = (ed: Editorial) => {
    setEditorials(prev => {
      const idx = prev.findIndex(item => item.id === ed.id);
      if (idx > -1) {
        const next = [...prev];
        next[idx] = ed;
        return next;
      }
      return [ed, ...prev];
    });
  };

  const upsertAdmin = (admin: AdminAccount) => {
    setAdmins(prev => {
      const idx = prev.findIndex(a => a.id === admin.id);
      if (idx > -1) {
        const next = [...prev];
        next[idx] = admin;
        return next;
      }
      return [admin, ...prev];
    });
  };

  const upsertVendor = (vendor: Vendor) => {
    setVendors(prev => {
      const idx = prev.findIndex(v => v.id === vendor.id);
      if (idx > -1) {
        const next = [...prev];
        next[idx] = vendor;
        return next;
      }
      return [vendor, ...prev];
    });
  };

  const upsertCampaign = (campaign: Campaign) => {
    setActiveCampaigns(prev => {
      const idx = prev.findIndex(c => c.id === campaign.id);
      if (idx > -1) {
        const next = [...prev];
        next[idx] = campaign;
        return next;
      }
      return [campaign, ...prev];
    });
  };

  const updateGlobalSettings = (settings: GlobalSettings) => setGlobalSettings(settings);

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
    admins,
    vendors,
    activeCampaigns,
    auditLogs,
    vipClients,
    globalSettings,
    isShowcaseMode,
    activeVip,
    activeVendor,
    addToCart,
    removeFromCart,
    updateQuantity,
    toggleWishlist,
    clearCart,
    upsertProduct,
    deleteProduct,
    upsertCollection,
    upsertEditorial,
    upsertAdmin,
    upsertVendor,
    upsertCampaign,
    updateGlobalSettings,
    toggleLike,
    trackShare,
    setShowcaseMode,
    setActiveVip,
    setActiveVendor,
  }), [cart, wishlist, products, collections, categories, departments, cities, buyingGuides, editorials, socialMetrics, admins, vendors, activeCampaigns, auditLogs, vipClients, globalSettings, isShowcaseMode, activeVip, activeVendor]);

  return <AppContext.Provider value={value}>{children}</AppContext.Provider>;
}

export function useAppStore() {
  const context = useContext(AppContext);
  if (!context) throw new Error('useAppStore must be used within AppProvider');
  return context;
}
