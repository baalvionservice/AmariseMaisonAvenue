import { 
  Country, Product, Category, Department, Collection, City, BuyingGuide, 
  Editorial, MaisonStory, CustomerServiceInfo, VipClient, AdminAccount, 
  Vendor, Campaign, AuditLog, CustomerSegment, SupportTicket, SupportStats,
  MaisonIntegration, ApiLog, IndexingStatus, IndexingLog, Appointment, Invoice,
  Affiliate, ReturnRequest
} from './types';

export const COUNTRIES: Record<string, Country> = {
  us: { code: 'us', name: 'USA', currency: 'USD', symbol: '$', locale: 'en-US', flag: '🇺🇸', office: { city: 'New York', address: '730 Fifth Avenue, New York, NY 10019', phone: '+1 (212) 555-0192', email: 'concierge.us@amarise-luxe.com', mapUrl: 'https://maps.google.com/?q=730+Fifth+Avenue+New+York', image: '' } },
  uk: { code: 'uk', name: 'UK', currency: 'GBP', symbol: '£', locale: 'en-GB', flag: '🇬🇧', office: { city: 'London', address: '17-18 Old Bond Street, London W1S 4PT', phone: '+44 20 7555 0192', email: 'concierge.uk@amarise-luxe.com', mapUrl: 'https://maps.google.com/?q=Old+Bond+Street+London', image: '' } },
  ae: { code: 'ae', name: 'UAE', currency: 'AED', symbol: 'د.إ', locale: 'ar-AE', flag: '🇦🇪', office: { city: 'Dubai', address: 'The Dubai Mall, Fashion Avenue, Downtown Dubai', phone: '+971 4 555 0192', email: 'concierge.ae@amarise-luxe.com', mapUrl: 'https://maps.google.com/?q=Dubai+Mall+Fashion+Avenue', image: '' } },
  in: { code: 'in', name: 'India', currency: 'INR', symbol: '₹', locale: 'en-IN', flag: '🇮🇳', office: { city: 'Mumbai', address: 'Jio World Centre, BKC, Mumbai, Maharashtra 400051', phone: '+91 22 5555 0192', email: 'concierge.in@amarise-luxe.com', mapUrl: 'https://maps.google.com/?q=Jio+World+Centre+Mumbai', image: '' } },
  sg: { code: 'sg', name: 'Singapore', currency: 'SGD', symbol: 'S$', locale: 'en-SG', flag: '🇸🇬', office: { city: 'Singapore', address: '2 Bayfront Ave, Marina Bay Sands, Singapore 018972', phone: '+65 6555 0192', email: 'concierge.sg@amarise-luxe.com', mapUrl: 'https://maps.google.com/?q=Marina+Bay+Sands+Singapore', image: '' } },
};

export const DEPARTMENTS: Department[] = [
  { id: 'women', name: 'Women', description: 'The peak of feminine elegance.', imageUrl: '', categories: ['w-couture', 'w-bags', 'w-shoes', 'w-accessories'] },
  { id: 'men', name: 'Men', description: 'Crafted for the modern aristocrat.', imageUrl: '', categories: ['m-tailoring', 'm-shoes', 'm-outerwear', 'm-accessories'] },
  { id: 'kids', name: 'Kids', description: 'Junior couture heritage.', imageUrl: '', categories: ['k-junior', 'k-gifts'] },
  { id: 'jewelry', name: 'Jewelry', description: 'Artifacts of light and stone.', imageUrl: '', categories: ['j-high', 'j-gold', 'j-diamonds'] },
  { id: 'watches', name: 'Watches', description: 'Precision for eternity.', imageUrl: '', categories: ['wa-complications', 'wa-heritage'] },
  { id: 'beauty', name: 'Beauty', description: 'Elite skincare rituals.', imageUrl: '', categories: ['b-fragrance', 'b-skincare'] },
  { id: 'lifestyle', name: 'Lifestyle', description: 'The spirit of the Maison.', imageUrl: '', categories: ['l-objects', 'l-wellness'] },
  { id: 'home', name: 'Home', description: 'Sculptural sanctuary decor.', imageUrl: '', categories: ['h-decor', 'h-textiles'] },
  { id: 'travel', name: 'Travel', description: 'Bespoke global discovery.', imageUrl: '', categories: ['t-luggage', 't-acc'] },
  { id: 'accessories', name: 'Accessories', description: 'Defining the Maison.', imageUrl: '', categories: ['a-leather', 'a-silk'] },
];

export const CATEGORIES: Category[] = [
  { id: 'w-couture', departmentId: 'women', name: 'Haute Couture', subcategories: ['Evening Gowns', 'Cocktail Dresses', 'Silk Separates'] },
  { id: 'w-bags', departmentId: 'women', name: 'Signature Bags', subcategories: ['Top Handle', 'Clutches', 'Exotic Series'] },
  { id: 'm-tailoring', departmentId: 'men', name: 'Bespoke Tailoring', subcategories: ['Heritage Suits', 'Luxury Blazers', 'Trousers'] },
  { id: 'j-high', departmentId: 'jewelry', name: 'High Jewelry', subcategories: ['Rare Gems', 'Atelier Necklaces', 'Earrings'] },
  { id: 'wa-complications', departmentId: 'watches', name: 'Grand Complications', subcategories: ['Tourbillons', 'Perpetual Calendars'] },
];

export const COLLECTIONS: Collection[] = [
  { id: 'heritage', name: 'The Heritage Line', description: 'Founding Year 1924.', imageUrl: '' },
  { id: 'spring-24', name: 'Spring Summer 2024', description: 'Mediterranean Dawn.', imageUrl: '' },
];

export const COLORS = ['Ivory', 'Gold', 'Plum', 'Midnight', 'Emerald', 'Sapphire', 'Onyx'];
export const SIZES = ['XS', 'S', 'M', 'L', 'XL', 'One Size', 'Bespoke'];

const generateProducts = (): Product[] => {
  const products: Product[] = [];
  for (let i = 1; i <= 1000; i++) {
    const cat = CATEGORIES[i % CATEGORIES.length];
    const sub = cat.subcategories[i % cat.subcategories.length];
    products.push({
      id: `prod-${i}`,
      name: `Amarisé ${sub} Piece ${i}`,
      departmentId: cat.departmentId,
      categoryId: cat.id,
      subcategoryId: sub.toLowerCase().replace(/ /g, '-'),
      collectionId: COLLECTIONS[i % COLLECTIONS.length].id,
      basePrice: 1500 + (i * 123) % 45000,
      imageUrl: ``,
      isVip: i % 10 === 0,
      rating: 4.5 + (i % 5) / 10,
      reviewsCount: 12 + (i % 200),
      colors: [COLORS[i % COLORS.length], COLORS[(i + 1) % COLORS.length]],
      sizes: [SIZES[i % SIZES.length], SIZES[(i + 1) % SIZES.length]],
      stock: 1 + (i % 10),
      vendorId: `vend-${(i % 5) + 1}`,
      regionalStock: [
        { warehouseId: 'wh-ny', warehouseName: 'NY Atelier', stockCount: 10, region: 'us' },
        { warehouseId: 'wh-ldn', warehouseName: 'London Hub', stockCount: 5, region: 'uk' }
      ],
      mediaGallery: [
        { type: 'image', url: ``, alt: 'Main View' },
        { type: 'video', url: '', alt: 'Artisanal Craft' },
        { type: '360', url: ``, alt: '360 Degree View' }
      ],
      listingType: i % 50 === 0 ? 'auction' : 'fixed',
      currentBid: i % 50 === 0 ? 5000 + (i * 100) : undefined,
      auctionEndsAt: i % 50 === 0 ? new Date(Date.now() + 86400000).toISOString() : undefined
    });
  }
  return products;
};

export const PRODUCTS = generateProducts();

export const CITIES: City[] = [
  { id: 'new-york', name: 'New York', countryCode: 'us', description: 'The global pulse.', heroImage: '', featuredCollections: ['heritage'], featuredProducts: ['prod-1', 'prod-2'], office: COUNTRIES.us.office!, trends: [{ title: 'Fifth Ave Minimalism', description: 'Monochrome tailoring.' }] },
];

export const EDITOR_INITIAL: Editorial[] = [
  { id: 'ed-1', title: 'The Architecture of Time', excerpt: 'Swiss heritage.', content: 'Long form content...', imageUrl: '', category: 'Artisanal', country: 'us', author: 'Elena Vance', date: '2024-03-01', isVip: false, featuredProducts: ['prod-1'] },
];

export const BUYING_GUIDES: BuyingGuide[] = [
  { id: 'bg-1', title: 'Horological Investment', excerpt: 'Mastering selection.', content: 'Guide content...', tips: ['Check movement', 'Check provenance'], featuredProducts: ['prod-1'], featuredCollections: ['heritage'], imageUrl: '', category: 'Watches', country: 'us', date: '2024-03-10', author: 'Elena Vance' },
];

export const MAISON_STORY: MaisonStory = {
  title: 'A Legacy of Radiance',
  subtitle: 'Since 1924.',
  history: [{ year: '1924', milestone: 'The First Atelier', description: 'Founded in Paris.' }],
  philosophy: 'Luxury is human brilliance.',
  craftsmanship: [{ title: 'Haute Couture', description: 'Hand-sewn.', imageUrl: '' }],
  sustainability: 'Preserving the earth.'
};

export const CUSTOMER_SERVICE: Record<string, CustomerServiceInfo> = {
  us: { shipping: 'White-glove delivery.', returns: '30-day policy.', faqs: [{ question: 'Book a viewing?', answer: 'Contact concierge.' }] }
};

export const VIP_CLIENTS: VipClient[] = [
  { id: 'vip-1', name: 'Julian Vandervilt', email: 'julian@vandervilt.com', tier: 'Diamond', loyaltyPoints: 12500, totalSpend: 250000, lastPurchase: '2024-03-10', isSubscriber: true, subscriptionPlan: 'Maison Privé' },
  { id: 'vip-2', name: 'Sophia Chen', email: 'sophia@lux.net', tier: 'Gold', loyaltyPoints: 4200, totalSpend: 85000, lastPurchase: '2024-02-28', isSubscriber: false },
  { id: 'vip-3', name: 'Alexander Cross', email: 'a.cross@heritage.com', tier: 'Diamond', loyaltyPoints: 18000, totalSpend: 420000, lastPurchase: '2024-03-14', isSubscriber: true, subscriptionPlan: 'Atelier Reserve' }
];

export const AFFILIATES: Affiliate[] = [
  { id: 'aff-1', name: 'Elena Vance', tier: 'Diamond', referralCode: 'ELENA1924', salesGenerated: 125000, commissionEarned: 12500, status: 'active' },
  { id: 'aff-2', name: 'Marcus Aurelius', tier: 'Gold', referralCode: 'MARCUS', salesGenerated: 45000, commissionEarned: 4500, status: 'active' }
];

export const RETURNS: ReturnRequest[] = [
  { id: 'ret-1', orderId: 'AM-1001', productId: 'prod-1', reason: 'Size mismatch', status: 'pending', warehouseId: 'wh-ny', requestedAt: '2024-03-15T10:00:00Z' }
];

export const ADMIN_ACCOUNTS: AdminAccount[] = [
  { id: 'adm-1', name: 'Maison CEO', email: 'ceo@amarise-luxe.com', role: 'CEO', permissions: ['all'], status: 'active', lastActive: '2024-03-15T10:00:00Z', avatar: '', twoFactorEnabled: true },
  { id: 'adm-2', name: 'Operations Lead', email: 'ops@amarise-luxe.com', role: 'Ops', permissions: ['ops', 'marketing'], status: 'active', lastActive: '2024-03-15T09:30:00Z', twoFactorEnabled: true },
  { id: 'adm-3', name: 'Head Concierge', email: 'concierge@amarise-luxe.com', role: 'Support', permissions: ['support'], status: 'active', lastActive: '2024-03-15T11:00:00Z', twoFactorEnabled: true }
];

export const VENDORS: Vendor[] = [
  { id: 'vend-1', name: 'Lumière Silks', category: 'Accessories', performance: 98, productCount: 45, salesTotal: 125000, status: 'active', payoutSchedule: 'weekly', joinedDate: '2023-01-10', kpis: { returnRate: 1.2, fulfillmentSpeed: '1.2 days', rating: 4.9 } },
  { id: 'vend-2', name: 'Geneva Horology', category: 'Watches', performance: 95, productCount: 12, salesTotal: 850000, status: 'active', payoutSchedule: 'monthly', joinedDate: '2023-05-15', kpis: { returnRate: 0.5, fulfillmentSpeed: '2.4 days', rating: 4.8 } },
  { id: 'vend-3', name: 'Artisanal Gold', category: 'Jewelry', performance: 92, productCount: 28, salesTotal: 340000, status: 'active', payoutSchedule: 'weekly', joinedDate: '2023-08-20', kpis: { returnRate: 2.1, fulfillmentSpeed: '1.8 days', rating: 4.7 } }
];

export const CAMPAIGNS: Campaign[] = [
  { id: 'camp-1', title: 'Midnight Soirée Flash Sale', type: 'Flash Sale', status: 'scheduled', discountValue: 15, startDate: '2024-04-01', endDate: '2024-04-03', market: 'global', reach: 45000, conversions: 1200, roi: 4.5, predictedRoi: 5.2, abTestActive: true },
  { id: 'camp-2', title: 'Heritage Collection Launch', type: 'Launch', status: 'active', discountValue: 0, startDate: '2024-03-10', endDate: '2024-03-25', market: 'us', reach: 120000, conversions: 800, roi: 8.2, predictedRoi: 9.0, abTestActive: false },
  { id: 'camp-3', title: 'Spring Equinox Newsletter', type: 'Email', status: 'completed', discountValue: 10, startDate: '2024-03-01', endDate: '2024-03-05', market: 'global', reach: 250000, conversions: 4500, roi: 12.4, predictedRoi: 11.5, abTestActive: true }
];

export const CUSTOMER_SEGMENTS: CustomerSegment[] = [
  { id: 'seg-1', name: 'Ultra-High Net Worth', description: 'Clients with >$100k lifetime spend.', userCount: 450, avgOrderValue: 12500, tags: ['Diamond', 'Bespoke'], predictedChurn: 0.05 },
  { id: 'seg-2', name: 'Seasonal Enthusiasts', description: 'Purchased in last 3 months.', userCount: 2800, avgOrderValue: 3200, tags: ['Active', 'Fashion'], predictedChurn: 0.15 },
  { id: 'seg-3', name: 'Dormant Connoisseurs', description: 'No purchase in 12 months.', userCount: 1200, avgOrderValue: 4500, tags: ['Inactive', 'Luxury'], predictedChurn: 0.45 }
];

export const APPOINTMENTS: Appointment[] = [
  { id: 'apt-1', customerId: 'vip-1', customerName: 'Julian Vandervilt', type: 'Private Viewing', date: '2024-03-20', time: '14:00', city: 'London', status: 'confirmed' },
  { id: 'apt-2', customerId: 'vip-2', customerName: 'Sophia Chen', type: 'Virtual Try-on', date: '2024-03-22', time: '10:30', city: 'Dubai', status: 'pending' }
];

export const INVOICES: Invoice[] = [
  { id: 'inv-1001', orderId: 'AM-1001', customerName: 'Julian Vandervilt', amount: 45000, currency: 'USD', status: 'paid', date: '2024-03-10', taxAmount: 3600, taxRate: 8, complianceCertified: true },
  { id: 'inv-1002', orderId: 'AM-1002', customerName: 'Sophia Chen', amount: 12500, currency: 'GBP', status: 'issued', date: '2024-03-14', taxAmount: 2500, taxRate: 20, complianceCertified: true }
];

export const AUDIT_LOGS: AuditLog[] = [
  { id: 'log-1', adminId: 'adm-1', adminName: 'Maison CEO', action: 'Approved Vendor Geneva Horology', module: 'Vendor Management', timestamp: '2024-03-15T08:00:00Z', ipAddress: '192.168.1.1', severity: 'low' },
  { id: 'log-2', adminId: 'adm-2', adminName: 'Operations Lead', action: 'Updated Global Tax Rules (UAE)', module: 'Website Settings', timestamp: '2024-03-15T07:45:00Z', ipAddress: '192.168.1.5', severity: 'medium' }
];

export const SUPPORT_TICKETS: SupportTicket[] = [
  {
    id: 'tix-1',
    customerId: 'vip-1',
    customerName: 'Julian Vandervilt',
    customerTier: 'Diamond',
    subject: 'Private Viewing Request - London',
    status: 'open',
    priority: 'urgent',
    category: 'VIP Request',
    assignedTo: 'adm-3',
    lastMessage: 'How may I secure a private slot for the upcoming Bond St exhibition?',
    createdAt: '2024-03-15T09:00:00Z',
    updatedAt: '2024-03-15T10:30:00Z',
    messages: [
      { id: 'm1', sender: 'customer', text: 'I am planning a visit to London next week.', timestamp: '2024-03-15T09:00:00Z' },
      { id: 'm2', sender: 'customer', text: 'How may I secure a private slot for the upcoming Bond St exhibition?', timestamp: '2024-03-15T09:05:00Z' }
    ]
  },
  {
    id: 'tix-2',
    customerId: 'vip-2',
    customerName: 'Sophia Chen',
    customerTier: 'Gold',
    subject: 'Exchange for Artisanal Silk Scarf',
    status: 'pending',
    priority: 'medium',
    category: 'Return/Exchange',
    assignedTo: 'adm-3',
    lastMessage: 'The color palette is slightly different than expected.',
    createdAt: '2024-03-14T14:00:00Z',
    updatedAt: '2024-03-15T08:45:00Z',
    messages: [
      { id: 'm3', sender: 'customer', text: 'Received my order #AM-1002 today.', timestamp: '2024-03-14T14:00:00Z' }
    ]
  }
];

export const SUPPORT_STATS: SupportStats = {
  openTickets: 12,
  resolvedToday: 45,
  avgResponseTime: '14m 22s',
  csatScore: 4.9,
  activeChats: 3
};

export const INTEGRATIONS: MaisonIntegration[] = [
  { id: 'int-1', name: 'Stripe Master', type: 'Payment', provider: 'Stripe', status: 'Connected', lastSync: '2024-03-15T12:00:00Z', latency: '45ms', uptime: 99.99 },
  { id: 'int-2', name: 'FedEx Global', type: 'Logistics', provider: 'FedEx', status: 'Connected', lastSync: '2024-03-15T11:55:00Z', latency: '120ms', uptime: 98.5 },
  { id: 'int-3', name: 'DHL Express', type: 'Logistics', provider: 'DHL', status: 'Degraded', lastSync: '2024-03-15T11:45:00Z', latency: '850ms', uptime: 94.2 },
  { id: 'int-4', name: 'Salesforce CRM', type: 'CRM', provider: 'Salesforce', status: 'Connected', lastSync: '2024-03-15T10:00:00Z', latency: '310ms', uptime: 99.9 },
  { id: 'int-5', name: 'SAP S/4HANA', type: 'ERP', provider: 'SAP', status: 'Connected', lastSync: '2024-03-15T09:00:00Z', latency: '150ms', uptime: 99.95 },
  { id: 'int-6', name: 'Google Analytics 4', type: 'Analytics', provider: 'Google', status: 'Connected', lastSync: '2024-03-15T12:05:00Z', latency: '25ms', uptime: 100 },
];

export const API_LOGS: ApiLog[] = [
  { id: 'log-101', timestamp: '2024-03-15T12:05:00Z', endpoint: '/v1/charges', method: 'POST', status: 200, latency: '42ms', integrationId: 'int-1' },
  { id: 'log-102', timestamp: '2024-03-15T12:04:30Z', endpoint: '/shipments/track', method: 'GET', status: 200, latency: '115ms', integrationId: 'int-2' },
  { id: 'log-103', timestamp: '2024-03-15T12:04:00Z', endpoint: '/v2/inventory', method: 'PUT', status: 503, latency: '850ms', integrationId: 'int-3' },
];

export const INDEXING_STATUS: IndexingStatus = {
  catalogItems: 2026875,
  indexedItems: 2026875,
  lastFullScan: '2024-03-15T04:00:00Z',
  searchEngineStatus: 'Optimal',
  sitemapStatus: 'Up to date',
  autoSyncEnabled: true
};

export const INDEXING_LOGS: IndexingLog[] = [
  { id: 'idx-1', timestamp: '2024-03-15T12:00:00Z', action: 'Bulk Category Update', itemsAffected: 125, duration: '4.2s', status: 'Success' },
  { id: 'idx-2', timestamp: '2024-03-15T11:30:00Z', action: 'New Product Auto-Index', itemsAffected: 1, duration: '0.8s', status: 'Success' },
  { id: 'idx-3', timestamp: '2024-03-15T10:00:00Z', action: 'Hourly Sitemap Refresh', itemsAffected: 450000, duration: '125s', status: 'Success' },
];

export const formatPrice = (price: number, countryCode: string = 'us') => {
  const country = COUNTRIES[countryCode] || COUNTRIES.us;
  const rates: Record<string, number> = { us: 1, uk: 0.79, ae: 3.67, in: 83.2, sg: 1.34 };
  const converted = price * (rates[countryCode] || 1);
  return new Intl.NumberFormat(country.locale, { style: 'currency', currency: country.currency, maximumFractionDigits: 0 }).format(converted);
};

export const getLocalizedMockText = (text: string, countryCode: string) => text;
