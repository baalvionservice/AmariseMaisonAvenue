
import { 
  Country, Product, Category, Department, Collection, City, BuyingGuide, 
  Editorial, MaisonStory, CustomerServiceInfo, VipClient, AdminAccount, 
  Vendor, Campaign, AuditLog, CustomerSegment 
} from './types';

export const COUNTRIES: Record<string, Country> = {
  us: { code: 'us', name: 'United States', currency: 'USD', symbol: '$', locale: 'en-US', office: { city: 'New York', address: '730 Fifth Avenue, New York, NY 10019', phone: '+1 (212) 555-0192', email: 'concierge.us@amarise-luxe.com', mapUrl: 'https://maps.google.com/?q=730+Fifth+Avenue+New+York', image: 'https://picsum.photos/seed/amarise-ny/1200/800' } },
  uk: { code: 'uk', name: 'United Kingdom', currency: 'GBP', symbol: '£', locale: 'en-GB', office: { city: 'London', address: '17-18 Old Bond Street, London W1S 4PT', phone: '+44 20 7555 0192', email: 'concierge.uk@amarise-luxe.com', mapUrl: 'https://maps.google.com/?q=Old+Bond+Street+London', image: 'https://picsum.photos/seed/amarise-london/1200/800' } },
  ae: { code: 'ae', name: 'United Arab Emirates', currency: 'AED', symbol: 'د.إ', locale: 'ar-AE', office: { city: 'Dubai', address: 'The Dubai Mall, Fashion Avenue, Downtown Dubai', phone: '+971 4 555 0192', email: 'concierge.ae@amarise-luxe.com', mapUrl: 'https://maps.google.com/?q=Dubai+Mall+Fashion+Avenue', image: 'https://picsum.photos/seed/amarise-dubai/1200/800' } },
  in: { code: 'in', name: 'India', currency: 'INR', symbol: '₹', locale: 'en-IN', office: { city: 'Mumbai', address: 'Jio World Centre, BKC, Mumbai, Maharashtra 400051', phone: '+91 22 5555 0192', email: 'concierge.in@amarise-luxe.com', mapUrl: 'https://maps.google.com/?q=Jio+World+Centre+Mumbai', image: 'https://picsum.photos/seed/amarise-mumbai/1200/800' } },
  sg: { code: 'sg', name: 'Singapore', currency: 'SGD', symbol: 'S$', locale: 'en-SG', office: { city: 'Singapore', address: '2 Bayfront Ave, Marina Bay Sands, Singapore 018972', phone: '+65 6555 0192', email: 'concierge.sg@amarise-luxe.com', mapUrl: 'https://maps.google.com/?q=Marina+Bay+Sands+Singapore', image: 'https://picsum.photos/seed/amarise-sg/1200/800' } },
};

export const DEPARTMENTS: Department[] = [
  { id: 'women', name: 'Women', description: 'The peak of feminine elegance.', imageUrl: 'https://picsum.photos/seed/amarise-women/1920/1080', categories: ['w-couture', 'w-bags', 'w-shoes', 'w-accessories'] },
  { id: 'men', name: 'Men', description: 'Crafted for the modern aristocrat.', imageUrl: 'https://picsum.photos/seed/amarise-men/1920/1080', categories: ['m-tailoring', 'm-shoes', 'm-outerwear', 'm-accessories'] },
  { id: 'kids', name: 'Kids', description: 'Junior couture heritage.', imageUrl: 'https://picsum.photos/seed/amarise-kids/1920/1080', categories: ['k-junior', 'k-gifts'] },
  { id: 'jewelry', name: 'Jewelry', description: 'Artifacts of light and stone.', imageUrl: 'https://picsum.photos/seed/amarise-jewelry/1920/1080', categories: ['j-high', 'j-gold', 'j-diamonds'] },
  { id: 'watches', name: 'Watches', description: 'Precision for eternity.', imageUrl: 'https://picsum.photos/seed/amarise-watches/1920/1080', categories: ['wa-complications', 'wa-heritage'] },
  { id: 'beauty', name: 'Beauty', description: 'Elite skincare rituals.', imageUrl: 'https://picsum.photos/seed/amarise-beauty/1920/1080', categories: ['b-fragrance', 'b-skincare'] },
  { id: 'lifestyle', name: 'Lifestyle', description: 'The spirit of the Maison.', imageUrl: 'https://picsum.photos/seed/amarise-life/1920/1080', categories: ['l-objects', 'l-wellness'] },
  { id: 'home', name: 'Home', description: 'Sculptural sanctuary decor.', imageUrl: 'https://picsum.photos/seed/amarise-home/1920/1080', categories: ['h-decor', 'h-textiles'] },
  { id: 'travel', name: 'Travel', description: 'Bespoke global discovery.', imageUrl: 'https://picsum.photos/seed/amarise-travel/1920/1080', categories: ['t-luggage', 't-acc'] },
  { id: 'accessories', name: 'Accessories', description: 'Defining the Maison.', imageUrl: 'https://picsum.photos/seed/amarise-acc/1920/1080', categories: ['a-leather', 'a-silk'] },
];

export const CATEGORIES: Category[] = [
  { id: 'w-couture', departmentId: 'women', name: 'Haute Couture', subcategories: ['Evening Gowns', 'Cocktail Dresses', 'Silk Separates'] },
  { id: 'w-bags', departmentId: 'women', name: 'Signature Bags', subcategories: ['Top Handle', 'Clutches', 'Exotic Series'] },
  { id: 'm-tailoring', departmentId: 'men', name: 'Bespoke Tailoring', subcategories: ['Heritage Suits', 'Luxury Blazers', 'Trousers'] },
  { id: 'j-high', departmentId: 'jewelry', name: 'High Jewelry', subcategories: ['Rare Gems', 'Atelier Necklaces', 'Earrings'] },
  { id: 'wa-complications', departmentId: 'watches', name: 'Grand Complications', subcategories: ['Tourbillons', 'Perpetual Calendars'] },
];

export const COLLECTIONS: Collection[] = [
  { id: 'heritage', name: 'The Heritage Line', description: 'Founding Year 1924.', imageUrl: 'https://picsum.photos/seed/heritage/1920/1080' },
  { id: 'spring-24', name: 'Spring Summer 2024', description: 'Mediterranean Dawn.', imageUrl: 'https://picsum.photos/seed/ss24/1920/1080' },
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
      imageUrl: `https://picsum.photos/seed/amarise-p-${i}/1200/1600`,
      isVip: i % 10 === 0,
      rating: 4.5 + (i % 5) / 10,
      reviewsCount: 12 + (i % 200),
      colors: [COLORS[i % COLORS.length], COLORS[(i + 1) % COLORS.length]],
      sizes: [SIZES[i % SIZES.length], SIZES[(i + 1) % SIZES.length]],
      stock: 1 + (i % 10),
      vendorId: `vend-${(i % 5) + 1}`,
    });
  }
  return products;
};

export const PRODUCTS = generateProducts();

export const CITIES: City[] = [
  { id: 'new-york', name: 'New York', countryCode: 'us', description: 'The global pulse.', heroImage: 'https://picsum.photos/seed/nyc/2560/1440', featuredCollections: ['heritage'], featuredProducts: ['prod-1', 'prod-2'], office: COUNTRIES.us.office!, trends: [{ title: 'Fifth Ave Minimalism', description: 'Monochrome tailoring.' }] },
];

export const EDITOR_INITIAL: Editorial[] = [
  { id: 'ed-1', title: 'The Architecture of Time', excerpt: 'Swiss heritage.', content: 'Long form content...', imageUrl: 'https://picsum.photos/seed/ed1/1600/900', category: 'Artisanal', country: 'us', author: 'Elena Vance', date: '2024-03-01', isVip: false, featuredProducts: ['prod-1'] },
];

export const BUYING_GUIDES: BuyingGuide[] = [
  { id: 'bg-1', title: 'Horological Investment', excerpt: 'Mastering selection.', content: 'Guide content...', tips: ['Check movement', 'Check provenance'], featuredProducts: ['prod-1'], featuredCollections: ['heritage'], imageUrl: 'https://picsum.photos/seed/bg1/1600/900', category: 'Watches', country: 'us', date: '2024-03-10', author: 'Elena Vance' },
];

export const MAISON_STORY: MaisonStory = {
  title: 'A Legacy of Radiance',
  subtitle: 'Since 1924.',
  history: [{ year: '1924', milestone: 'The First Atelier', description: 'Founded in Paris.' }],
  philosophy: 'Luxury is human brilliance.',
  craftsmanship: [{ title: 'Haute Couture', description: 'Hand-sewn.', imageUrl: 'https://picsum.photos/seed/craft1/1200/800' }],
  sustainability: 'Preserving the earth.'
};

export const CUSTOMER_SERVICE: Record<string, CustomerServiceInfo> = {
  us: { shipping: 'White-glove delivery.', returns: '30-day policy.', faqs: [{ question: 'Book a viewing?', answer: 'Contact concierge.' }] }
};

export const VIP_CLIENTS: VipClient[] = [
  { id: 'vip-1', name: 'Julian Vandervilt', email: 'julian@vandervilt.com', tier: 'Diamond', loyaltyPoints: 12500, totalSpend: 250000, lastPurchase: '2024-03-10' },
  { id: 'vip-2', name: 'Sophia Chen', email: 'sophia@lux.net', tier: 'Gold', loyaltyPoints: 4200, totalSpend: 85000, lastPurchase: '2024-02-28' },
  { id: 'vip-3', name: 'Alexander Cross', email: 'a.cross@heritage.com', tier: 'Diamond', loyaltyPoints: 18000, totalSpend: 420000, lastPurchase: '2024-03-14' }
];

export const ADMIN_ACCOUNTS: AdminAccount[] = [
  { id: 'adm-1', name: 'Maison Owner', email: 'ceo@amarise-luxe.com', role: 'CEO', permissions: ['all'], status: 'active', lastActive: '2024-03-15T10:00:00Z', avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=owner' },
  { id: 'adm-2', name: 'Market Manager', email: 'ops@amarise-luxe.com', role: 'Manager', permissions: ['ops', 'marketing'], status: 'active', lastActive: '2024-03-15T09:30:00Z' }
];

export const VENDORS: Vendor[] = [
  { id: 'vend-1', name: 'Lumière Silks', category: 'Accessories', performance: 98, productCount: 45, salesTotal: 125000, status: 'active', payoutSchedule: 'weekly', joinedDate: '2023-01-10' },
  { id: 'vend-2', name: 'Geneva Horology', category: 'Watches', performance: 95, productCount: 12, salesTotal: 850000, status: 'active', payoutSchedule: 'monthly', joinedDate: '2023-05-15' },
  { id: 'vend-3', name: 'Artisanal Gold', category: 'Jewelry', performance: 92, productCount: 28, salesTotal: 340000, status: 'active', payoutSchedule: 'weekly', joinedDate: '2023-08-20' }
];

export const CAMPAIGNS: Campaign[] = [
  { id: 'camp-1', title: 'Midnight Soirée Flash Sale', type: 'Flash Sale', status: 'scheduled', discountValue: 15, startDate: '2024-04-01', endDate: '2024-04-03', market: 'global', reach: 45000, conversions: 1200, roi: 4.5 },
  { id: 'camp-2', title: 'Heritage Collection Launch', type: 'Launch', status: 'active', discountValue: 0, startDate: '2024-03-10', endDate: '2024-03-25', market: 'us', reach: 120000, conversions: 800, roi: 8.2 },
  { id: 'camp-3', title: 'Spring Equinox Newsletter', type: 'Email', status: 'completed', discountValue: 10, startDate: '2024-03-01', endDate: '2024-03-05', market: 'global', reach: 250000, conversions: 4500, roi: 12.4 }
];

export const CUSTOMER_SEGMENTS: CustomerSegment[] = [
  { id: 'seg-1', name: 'Ultra-High Net Worth', description: 'Clients with >$100k lifetime spend.', userCount: 450, avgOrderValue: 12500, tags: ['Diamond', 'Bespoke'] },
  { id: 'seg-2', name: 'Seasonal Enthusiasts', description: 'Purchased in last 3 months.', userCount: 2800, avgOrderValue: 3200, tags: ['Active', 'Fashion'] },
  { id: 'seg-3', name: 'Dormant Connoisseurs', description: 'No purchase in 12 months.', userCount: 1200, avgOrderValue: 4500, tags: ['Inactive', 'Luxury'] }
];

export const AUDIT_LOGS: AuditLog[] = [
  { id: 'log-1', adminId: 'adm-1', adminName: 'Maison Owner', action: 'Approved Vendor Geneva Horology', module: 'Vendor Management', timestamp: '2024-03-15T08:00:00Z', ipAddress: '192.168.1.1', severity: 'low' },
  { id: 'log-2', adminId: 'adm-2', adminName: 'Market Manager', action: 'Updated Global Tax Rules (UAE)', module: 'Website Settings', timestamp: '2024-03-15T07:45:00Z', ipAddress: '192.168.1.5', severity: 'medium' }
];

export const formatPrice = (price: number, countryCode: string = 'us') => {
  const country = COUNTRIES[countryCode] || COUNTRIES.us;
  const rates: Record<string, number> = { us: 1, uk: 0.79, ae: 3.67, in: 83.2, sg: 1.34 };
  const converted = price * (rates[countryCode] || 1);
  return new Intl.NumberFormat(country.locale, { style: 'currency', currency: country.currency, maximumFractionDigits: 0 }).format(converted);
};

export const getLocalizedMockText = (text: string, countryCode: string) => text;
