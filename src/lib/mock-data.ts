
import { Country, Product, Category, Collection, Review, Campaign, Affiliate, Notification, VipClient } from './types';

export const COUNTRIES: Record<string, Country> = {
  us: { code: 'us', name: 'United States', currency: 'USD', symbol: '$', locale: 'en-US' },
  uk: { code: 'uk', name: 'United Kingdom', currency: 'GBP', symbol: '£', locale: 'en-GB' },
  ae: { code: 'ae', name: 'United Arab Emirates', currency: 'AED', symbol: 'د.إ', locale: 'ar-AE' },
  in: { code: 'in', name: 'India', currency: 'INR', symbol: '₹', locale: 'en-IN' },
  sg: { code: 'sg', name: 'Singapore', currency: 'SGD', symbol: 'S$', locale: 'en-SG' },
};

export const CATEGORIES: Category[] = [
  { id: 'apparel', name: 'Apparel', subcategories: ['Haute Couture', 'Ready-to-Wear', 'Outerwear'] },
  { id: 'accessories', name: 'Accessories', subcategories: ['Handbags', 'Belts', 'Sunglasses'] },
  { id: 'timepieces', name: 'Timepieces', subcategories: ['Automatic', 'Chronographs', 'Heritage'] },
  { id: 'jewelry', name: 'Fine Jewelry', subcategories: ['Necklaces', 'Earrings', 'Bracelets'] },
];

export const COLLECTIONS: Collection[] = [
  { id: 'spring-24', name: 'Spring/Summer 2024', description: 'Lightweight elegance for the modern aristocrat. Inspired by the soft hues of a Mediterranean dawn.', imageUrl: 'https://picsum.photos/seed/spring24-luxe/1920/1080' },
  { id: 'heritage', name: 'The Heritage Line', description: 'Timeless pieces that define generations. A tribute to the founding year of 1924.', imageUrl: 'https://picsum.photos/seed/heritage-luxe/1920/1080' },
  { id: 'nocturnal', name: 'Nocturnal Allure', description: 'Sophisticated evening wear and accessories for those who own the night.', imageUrl: 'https://picsum.photos/seed/nocturnal-luxe/1920/1080' },
  { id: 'privé-watches', name: 'Watchmakers Secret', description: 'Unreleased prototypes from the Swiss high-plateau. Strictly for Bespoke tier collectors.', imageUrl: 'https://picsum.photos/seed/prive-watches/1920/1080', isPrivate: true },
];

export const CAMPAIGNS: Campaign[] = [
  { id: 'c1', title: 'Ramadan 2024 - Exclusive Edit', type: 'email', status: 'active', reach: 450000, engagement: 12.4, country: 'ae', performance: 88 },
  { id: 'c2', title: 'Spring Equinox Preview', type: 'social', status: 'scheduled', reach: 1200000, engagement: 0, country: 'us', performance: 0 },
  { id: 'c3', title: 'Heritage Watch Collectors Push', type: 'push', status: 'completed', reach: 85000, engagement: 22.1, country: 'uk', performance: 94 },
  { id: 'c4', title: 'Singapore Anniversary Gala', type: 'email', status: 'draft', reach: 0, engagement: 0, country: 'sg', performance: 0 },
];

export const AFFILIATES: Affiliate[] = [
  { id: 'a1', name: 'Vogue Global', tier: 'diamond', salesGenerated: 4500000, commissionPaid: 450000, status: 'active' },
  { id: 'a2', name: 'The London Gent', tier: 'gold', salesGenerated: 1200000, commissionPaid: 120000, status: 'active' },
  { id: 'a3', name: 'Dubai Luxe Life', tier: 'diamond', salesGenerated: 8900000, commissionPaid: 890000, status: 'active' },
  { id: 'a4', name: 'Modern Maharaja', tier: 'silver', salesGenerated: 450000, commissionPaid: 45000, status: 'pending' },
];

export const NOTIFICATIONS: Notification[] = [
  { id: 'n1', type: 'Email', subject: 'Your Private Invitation: Nocturnal Allure', recipients: '150,000 VIPs', scheduledAt: '2024-03-10 09:00', status: 'Queued' },
  { id: 'n2', type: 'Push', subject: 'The Emerald Collection has arrived.', recipients: '84,000 Watch Collectors', scheduledAt: '2024-03-12 14:00', status: 'Queued' },
];

export const VIP_CLIENTS: VipClient[] = [
  { id: 'vip-1', name: 'Julian Vandervilt', email: 'j.vandervilt@lux.net', tier: 'Bespoke', country: 'us', totalSpend: 1250000, lastActive: '2024-03-01', assignedCollections: ['privé-watches', 'heritage'] },
  { id: 'vip-2', name: 'Sophia Laurent', email: 'sophia@laurent-group.fr', tier: 'Platinum', country: 'ae', totalSpend: 840000, lastActive: '2024-02-28', assignedCollections: ['nocturnal'] },
  { id: 'vip-3', name: 'Marcus Sterling', email: 'm.sterling@sterling.co.uk', tier: 'Gold', country: 'uk', totalSpend: 250000, lastActive: '2024-03-05', assignedCollections: ['spring-24'] },
];

const generateProducts = (): Product[] => {
  const products: Product[] = [];
  const categories = ['Apparel', 'Accessories', 'Timepieces', 'Fine Jewelry'];
  const collectionIds = ['spring-24', 'heritage', 'nocturnal', 'privé-watches'];

  for (let i = 1; i <= 500; i++) {
    const catIndex = i % categories.length;
    const cat = categories[catIndex];
    const collIndex = i % collectionIds.length;
    
    const basePrice = 1200 + ((i * 19) % 25000);
    const rating = 4.0 + ((i * 3) % 11) / 10;
    const reviewsCount = 10 + ((i * 7) % 300);

    products.push({
      id: `prod-${i}`,
      name: `Amarisé ${cat} Piece No. ${i.toString().padStart(3, '0')}`,
      category: cat,
      subcategory: i % 2 === 0 ? 'Heritage Collection' : 'Limited Release',
      collectionId: collectionIds[collIndex],
      basePrice,
      imageUrl: `https://picsum.photos/seed/amarise-enterprise-${i}/1200/1600`,
      isVip: i % 15 === 0 || collectionIds[collIndex] === 'privé-watches',
      rating: rating > 5 ? 5 : rating,
      reviewsCount,
    });
  }
  return products;
};

export const PRODUCTS = generateProducts();

export const REVIEWS: Review[] = [
  { id: 'r1', userName: 'Julian Vandervilt', rating: 5, comment: 'Absolutely divine craftsmanship. A masterpiece for any serious collector.', date: '2024-01-15' },
  { id: 'r2', userName: 'Sophia Laurent', rating: 4, comment: 'Elegant and sophisticated. Shipping was exceptionally white-glove.', date: '2024-02-02' },
  { id: 'r3', userName: 'Aamir Al-Farsi', rating: 5, comment: 'The pinnacle of luxury. The attention to detail is breath-taking.', date: '2024-02-18' },
];

/**
 * Enhanced mock localization utility for simulating regional translation and formatting.
 */
export const getLocalizedMockText = (text: string, countryCode: string) => {
  if (countryCode === 'ae') return `[Localized UAE] ${text}`;
  if (countryCode === 'sg') return `[Localized SG] ${text}`;
  if (countryCode === 'in') return `[Localized IN] ${text}`;
  if (countryCode === 'uk') return `[Localized UK] ${text}`;
  return text;
};

export const formatPrice = (price: number, countryCode: string = 'us') => {
  const country = COUNTRIES[countryCode] || COUNTRIES.us;
  const rates: Record<string, number> = { us: 1, uk: 0.79, ae: 3.67, in: 83.2, sg: 1.34 };
  const converted = price * (rates[countryCode] || 1);
  return new Intl.NumberFormat(country.locale, {
    style: 'currency',
    currency: country.currency,
    minimumFractionDigits: 0,
    maximumFractionDigits: 0,
  }).format(converted);
};
