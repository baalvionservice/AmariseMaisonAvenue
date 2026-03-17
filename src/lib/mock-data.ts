
import { Country, Product, Category, Collection, Review } from './types';

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
  { id: 'spring-24', name: 'Spring/Summer 2024', description: 'Lightweight elegance for the modern aristocrat.', imageUrl: 'https://picsum.photos/seed/spring24/1200/600' },
  { id: 'heritage', name: 'The Heritage Line', description: 'Timeless pieces that define generations.', imageUrl: 'https://picsum.photos/seed/heritage/1200/600' },
  { id: 'nocturnal', name: 'Nocturnal Allure', description: 'Sophisticated evening wear and accessories.', imageUrl: 'https://picsum.photos/seed/nocturnal/1200/600' },
];

const generateProducts = (): Product[] => {
  const products: Product[] = [];
  const categories = ['Apparel', 'Accessories', 'Timepieces', 'Fine Jewelry'];
  const collectionIds = ['spring-24', 'heritage', 'nocturnal'];

  for (let i = 1; i <= 24; i++) {
    const cat = categories[i % categories.length];
    products.push({
      id: `prod-${i}`,
      name: `Amarisé ${cat} Item ${i}`,
      category: cat,
      subcategory: 'Exclusive',
      collectionId: collectionIds[i % collectionIds.length],
      basePrice: Math.floor(Math.random() * 5000) + 500,
      imageUrl: `https://picsum.photos/seed/amarise-p-${i}/800/800`,
      isVip: i % 5 === 0,
      rating: 4 + Math.random(),
      reviewsCount: Math.floor(Math.random() * 50) + 5,
    });
  }
  return products;
};

export const PRODUCTS = generateProducts();

export const REVIEWS: Review[] = [
  { id: 'r1', userName: 'Julian V.', rating: 5, comment: 'Absolutely divine craftsmanship. A centerpiece for any collection.', date: '2024-01-15' },
  { id: 'r2', userName: 'Sophia L.', rating: 4, comment: 'Elegant and sophisticated. Shipping to London was exceptionally fast.', date: '2024-02-02' },
];

export const formatPrice = (price: number, countryCode: string = 'us') => {
  const country = COUNTRIES[countryCode] || COUNTRIES.us;
  const rates: Record<string, number> = { us: 1, uk: 0.79, ae: 3.67, in: 83.2, sg: 1.34 };
  const converted = price * rates[countryCode];
  return new Intl.NumberFormat(country.locale, {
    style: 'currency',
    currency: country.currency,
  }).format(converted);
};
