'use client';

import { useState, useEffect, useCallback } from 'react';

export interface RegionData {
  id: string;
  name: string;
  revenue: number;
  activeUsers: number;
  orders: number;
  growth: number;
  lat: number;
  lng: number;
}

export function useSimulationData() {
  const [regions, setRegions] = useState<Record<string, RegionData>>({
    us: { id: 'us', name: 'USA Hub', revenue: 1245000, activeUsers: 420, orders: 124, growth: 12.4, lat: 40.7128, lng: -74.0060 },
    uk: { id: 'uk', name: 'London Hub', revenue: 842000, activeUsers: 215, orders: 82, growth: 8.2, lat: 51.5074, lng: -0.1278 },
    ae: { id: 'ae', name: 'Dubai Hub', revenue: 1540000, activeUsers: 580, orders: 156, growth: 15.6, lat: 25.2048, lng: 55.2708 },
    in: { id: 'in', name: 'Mumbai Hub', revenue: 420000, activeUsers: 180, orders: 42, growth: 22.1, lat: 19.0760, lng: 72.8777 },
    sg: { id: 'sg', name: 'Singapore Hub', revenue: 620000, activeUsers: 240, orders: 68, growth: 5.4, lat: 1.3521, lng: 103.8198 },
  });

  const [globalTotal, setGlobalTotal] = useState(0);
  const [globalUsers, setGlobalUsers] = useState(0);

  const simulateUpdate = useCallback(() => {
    setRegions(prev => {
      const next = { ...prev };
      Object.keys(next).forEach(key => {
        const region = next[key];
        
        // Revenue fluctuation (0.1% to 0.5% change)
        const revChange = region.revenue * (Math.random() * 0.005);
        const revSign = Math.random() > 0.4 ? 1 : -1;
        region.revenue += revChange * revSign;

        // Active users fluctuation
        const userChange = Math.floor(Math.random() * 5);
        const userSign = Math.random() > 0.5 ? 1 : -1;
        region.activeUsers = Math.max(10, region.activeUsers + userChange * userSign);

        // Orders increment (occasionally)
        if (Math.random() > 0.8) {
          region.orders += 1;
        }
      });
      return next;
    });
  }, []);

  useEffect(() => {
    const interval = setInterval(simulateUpdate, 2000);
    return () => clearInterval(interval);
  }, [simulateUpdate]);

  useEffect(() => {
    const totalRev = Object.values(regions).reduce((acc, r) => acc + r.revenue, 0);
    const totalUsers = Object.values(regions).reduce((acc, r) => acc + r.activeUsers, 0);
    setGlobalTotal(totalRev);
    setGlobalUsers(totalUsers);
  }, [regions]);

  return {
    regions,
    globalTotal,
    globalUsers,
    totalOrders: Object.values(regions).reduce((acc, r) => acc + r.orders, 0)
  };
}
