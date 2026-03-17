
import { Country, Product, Category, Department, Collection, City, BuyingGuide, Editorial, MaisonStory, CustomerServiceInfo, VipClient } from './types';

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
  // For the demo, we generate 1000 representative products
  // In production, this would be fetched from a massive database
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

export const formatPrice = (price: number, countryCode: string = 'us') => {
  const country = COUNTRIES[countryCode] || COUNTRIES.us;
  const rates: Record<string, number> = { us: 1, uk: 0.79, ae: 3.67, in: 83.2, sg: 1.34 };
  const converted = price * (rates[countryCode] || 1);
  return new Intl.NumberFormat(country.locale, { style: 'currency', currency: country.currency, maximumFractionDigits: 0 }).format(converted);
};

export const getLocalizedMockText = (text: string, countryCode: string) => text;

export const VIP_CLIENTS: VipClient[] = [];
export const AFFILIATES: any[] = [];
export const CAMPAIGNS: any[] = [];
export const NOTIFICATIONS: any[] = [];
