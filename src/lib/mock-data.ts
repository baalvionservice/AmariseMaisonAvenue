
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
  { id: 'spring-24', name: 'Spring/Summer 2024', description: 'Lightweight elegance for the modern aristocrat. Inspired by the soft hues of a Mediterranean dawn.', imageUrl: 'https://picsum.photos/seed/spring24-luxe/1920/1080' },
  { id: 'heritage', name: 'The Heritage Line', description: 'Timeless pieces that define generations. A tribute to the founding year of 1924.', imageUrl: 'https://picsum.photos/seed/heritage-luxe/1920/1080' },
  { id: 'nocturnal', name: 'Nocturnal Allure', description: 'Sophisticated evening wear and accessories for those who own the night.', imageUrl: 'https://picsum.photos/seed/nocturnal-luxe/1920/1080' },
];

const generateProducts = (): Product[] => {
  const products: Product[] = [];
  const categories = ['Apparel', 'Accessories', 'Timepieces', 'Fine Jewelry'];
  const collectionIds = ['spring-24', 'heritage', 'nocturnal'];

  for (let i = 1; i <= 24; i++) {
    const cat = categories[i % categories.length];
    
    // Deterministic values for consistent hydration
    const basePrice = 500 + ((i * 123) % 9500);
    const rating = 4.2 + ((i * 3) % 9) / 10;
    const reviewsCount = 5 + ((i * 13) % 40);

    products.push({
      id: `prod-${i}`,
      name: `Amarisé ${cat} Selection ${i}`,
      category: cat,
      subcategory: 'Exclusive Heritage',
      collectionId: collectionIds[i % collectionIds.length],
      basePrice,
      imageUrl: `https://picsum.photos/seed/amarise-lux-item-${i}/1200/1600`,
      isVip: i % 4 === 0,
      rating,
      reviewsCount,
    });
  }
  return products;
};

export const PRODUCTS = generateProducts();

export const REVIEWS: Review[] = [
  { id: 'r1', userName: 'Julian Vandervilt', rating: 5, comment: 'Absolutely divine craftsmanship. A centerpiece for any collection. The weight of the silk is unparalleled.', date: '2024-01-15' },
  { id: 'r2', userName: 'Sophia Laurent', rating: 4, comment: 'Elegant and sophisticated. Shipping to London was exceptionally fast and the white-glove service was impeccable.', date: '2024-02-02' },
  { id: 'r3', userName: 'Aamir Al-Farsi', rating: 5, comment: 'The pinnacle of luxury. The attention to detail in the gold hardware is simply breath-taking.', date: '2024-02-18' },
];

export const formatPrice = (price: number, countryCode: string = 'us') => {
  const country = COUNTRIES[countryCode] || COUNTRIES.us;
  const rates: Record<string, number> = { us: 1, uk: 0.79, ae: 3.67, in: 83.2, sg: 1.34 };
  const converted = price * (rates[countryCode] || 1);
  return new Intl.NumberFormat(country.locale, {
    style: 'currency',
    currency: country.currency,
  }).format(converted);
};
