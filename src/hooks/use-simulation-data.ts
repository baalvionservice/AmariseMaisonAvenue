'use client';

import { useState, useEffect, useCallback, useMemo } from 'react';

export interface RegionData {
  id: string;
  name: string;
  revenue: number;
  activeUsers: number;
  viewing: number;
  wishlist: number;
  cart: number;
  checkout: number;
  purchased: number;
  growth: number;
  lat: number;
  lng: number;
}

export function useSimulationData() {
  const [regions, setRegions] = useState<Record<string, RegionData>>({
    us: { id: 'us', name: 'USA Hub', revenue: 1245000, activeUsers: 420, viewing: 250, wishlist: 80, cart: 45, checkout: 12, purchased: 124, growth: 12.4, lat: 40.7128, lng: -74.0060 },
    uk: { id: 'uk', name: 'London Hub', revenue: 842000, activeUsers: 215, viewing: 130, wishlist: 42, cart: 22, checkout: 8, purchased: 82, growth: 8.2, lat: 51.5074, lng: -0.1278 },
    ae: { id: 'ae', name: 'Dubai Hub', revenue: 1540000, activeUsers: 580, viewing: 340, wishlist: 110, cart: 65, checkout: 24, purchased: 156, growth: 15.6, lat: 25.2048, lng: 55.2708 },
    in: { id: 'in', name: 'Mumbai Hub', revenue: 420000, activeUsers: 180, viewing: 110, wishlist: 35, cart: 18, checkout: 5, purchased: 42, growth: 22.1, lat: 19.0760, lng: 72.8777 },
    sg: { id: 'sg', name: 'Singapore Hub', revenue: 620000, activeUsers: 240, viewing: 150, wishlist: 48, cart: 28, checkout: 10, purchased: 68, growth: 5.4, lat: 1.3521, lng: 103.8198 },
  });

  const simulateUpdate = useCallback(() => {
    setRegions(prev => {
      const next = { ...prev };
      Object.keys(next).forEach(key => {
        const region = next[key];
        
        // 1. Base traffic fluctuation
        const userChange = Math.floor(Math.random() * 8);
        const userSign = Math.random() > 0.4 ? 1 : -1;
        region.activeUsers = Math.max(50, region.activeUsers + userChange * userSign);

        // 2. Maintain Funnel Ratios (approximate)
        region.viewing = Math.floor(region.activeUsers * 0.65);
        region.wishlist = Math.max(5, Math.floor(region.viewing * 0.35) + (Math.random() > 0.8 ? 2 : 0));
        region.cart = Math.max(2, Math.floor(region.wishlist * 0.45) + (Math.random() > 0.9 ? 1 : 0));
        
        // 3. Purchase Event Simulation
        if (Math.random() > 0.85 && region.cart > 0) {
          const checkoutCount = Math.ceil(Math.random() * 2);
          region.checkout = Math.min(region.cart, region.checkout + checkoutCount);
          
          if (Math.random() > 0.5) {
            const purchaseValue = 5000 + Math.floor(Math.random() * 45000);
            region.revenue += purchaseValue;
            region.purchased += 1;
            region.checkout = Math.max(0, region.checkout - 1);
          }
        } else {
          region.checkout = Math.max(0, Math.floor(region.cart * 0.2));
        }
      });
      return next;
    });
  }, []);

  useEffect(() => {
    const interval = setInterval(simulateUpdate, 2000);
    return () => clearInterval(interval);
  }, [simulateUpdate]);

  const globalMetrics = useMemo(() => {
    const vals = Object.values(regions);
    const totalUsers = vals.reduce((acc, r) => acc + r.activeUsers, 0);
    const totalPurchased = vals.reduce((acc, r) => acc + r.purchased, 0);
    const totalViewing = vals.reduce((acc, r) => acc + r.viewing, 0);

    return {
      globalTotal: vals.reduce((acc, r) => acc + r.revenue, 0),
      globalUsers: totalUsers,
      totalOrders: totalPurchased,
      globalCart: vals.reduce((acc, r) => acc + r.cart, 0),
      globalWishlist: vals.reduce((acc, r) => acc + r.wishlist, 0),
      conversionRate: ((totalPurchased / (totalViewing || 1)) * 100).toFixed(2)
    };
  }, [regions]);

  return {
    regions,
    ...globalMetrics
  };
}
