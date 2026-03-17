
import { Country, Product, Category, Collection, Review, Campaign, Affiliate, Notification, VipClient, Editorial, MaisonStory, CustomerServiceInfo, City } from './types';

export const COUNTRIES: Record<string, Country> = {
  us: { 
    code: 'us', 
    name: 'United States', 
    currency: 'USD', 
    symbol: '$', 
    locale: 'en-US',
    office: {
      city: 'New York',
      address: '730 Fifth Avenue, New York, NY 10019',
      phone: '+1 (212) 555-0192',
      email: 'concierge.us@amarise-luxe.com',
      mapUrl: 'https://maps.google.com/?q=730+Fifth+Avenue+New+York',
      image: 'https://picsum.photos/seed/amarise-ny/1200/800',
    }
  },
  uk: { 
    code: 'uk', 
    name: 'United Kingdom', 
    currency: 'GBP', 
    symbol: '£', 
    locale: 'en-GB',
    office: {
      city: 'London',
      address: '17-18 Old Bond Street, London W1S 4PT',
      phone: '+44 20 7555 0192',
      email: 'concierge.uk@amarise-luxe.com',
      mapUrl: 'https://maps.google.com/?q=Old+Bond+Street+London',
      image: 'https://picsum.photos/seed/amarise-london/1200/800',
    }
  },
  ae: { 
    code: 'ae', 
    name: 'United Arab Emirates', 
    currency: 'AED', 
    symbol: 'د.إ', 
    locale: 'ar-AE',
    office: {
      city: 'Dubai',
      address: 'The Dubai Mall, Fashion Avenue, Downtown Dubai',
      phone: '+971 4 555 0192',
      email: 'concierge.ae@amarise-luxe.com',
      mapUrl: 'https://maps.google.com/?q=Dubai+Mall+Fashion+Avenue',
      image: 'https://picsum.photos/seed/amarise-dubai/1200/800',
    }
  },
  in: { 
    code: 'in', 
    name: 'India', 
    currency: 'INR', 
    symbol: '₹', 
    locale: 'en-IN',
    office: {
      city: 'Mumbai',
      address: 'Jio World Centre, BKC, Mumbai, Maharashtra 400051',
      phone: '+91 22 5555 0192',
      email: 'concierge.in@amarise-luxe.com',
      mapUrl: 'https://maps.google.com/?q=Jio+World+Centre+Mumbai',
      image: 'https://picsum.photos/seed/amarise-mumbai/1200/800',
    }
  },
  sg: { 
    code: 'sg', 
    name: 'Singapore', 
    currency: 'SGD', 
    symbol: 'S$', 
    locale: 'en-SG',
    office: {
      city: 'Singapore',
      address: '2 Bayfront Ave, Marina Bay Sands, Singapore 018972',
      phone: '+65 6555 0192',
      email: 'concierge.sg@amarise-luxe.com',
      mapUrl: 'https://maps.google.com/?q=Marina+Bay+Sands+Singapore',
      image: 'https://picsum.photos/seed/amarise-sg/1200/800',
    }
  },
};

export const CITIES: City[] = [
  // US Cities
  {
    id: 'new-york',
    name: 'New York',
    countryCode: 'us',
    description: 'The global pulse of contemporary luxury.',
    heroImage: 'https://picsum.photos/seed/nyc-luxe/2560/1440',
    featuredCollections: ['heritage', 'spring-24'],
    featuredProducts: ['prod-1', 'prod-2', 'prod-3'],
    office: COUNTRIES.us.office!,
    trends: [
      { title: 'Fifth Avenue Minimalism', description: 'Monochrome tailoring meets architectural jewelry.' },
      { title: 'The Gallery Edit', description: 'Bespoke leather accessories for the modern art connoisseur.' }
    ]
  },
  {
    id: 'los-angeles',
    name: 'Los Angeles',
    countryCode: 'us',
    description: 'Cinematic elegance and sun-drenched sophistication.',
    heroImage: 'https://picsum.photos/seed/la-luxe/2560/1440',
    featuredCollections: ['spring-24', 'nocturnal'],
    featuredProducts: ['prod-4', 'prod-5'],
    office: { ...COUNTRIES.us.office!, city: 'Beverly Hills', address: 'Rodeo Drive, Beverly Hills, CA 90210' },
    trends: [
      { title: 'Pacific Riviera', description: 'Lightweight silk heritage scarves and oversized eyewear.' }
    ]
  },
  { id: 'miami', name: 'Miami', countryCode: 'us', description: 'Art Deco vibrance meets high-end resort living.', heroImage: 'https://picsum.photos/seed/miami-luxe/2560/1440', featuredCollections: ['spring-24'], featuredProducts: ['prod-6'], office: { ...COUNTRIES.us.office!, city: 'Design District', address: 'NE 40th St, Miami, FL 33137' }, trends: [] },
  { id: 'chicago', name: 'Chicago', countryCode: 'us', description: 'The architectural heart of American luxury.', heroImage: 'https://picsum.photos/seed/chi-luxe/2560/1440', featuredCollections: ['heritage'], featuredProducts: ['prod-7'], office: { ...COUNTRIES.us.office!, city: 'Magnificent Mile', address: 'N Michigan Ave, Chicago, IL 60611' }, trends: [] },
  { id: 'san-francisco', name: 'San Francisco', countryCode: 'us', description: 'Innovating the future of the heritage aesthetic.', heroImage: 'https://picsum.photos/seed/sf-luxe/2560/1440', featuredCollections: ['spring-24'], featuredProducts: ['prod-8'], office: { ...COUNTRIES.us.office!, city: 'Union Square', address: 'Post St, San Francisco, CA 94108' }, trends: [] },

  // UK Cities
  { id: 'london', name: 'London', countryCode: 'uk', description: 'The intersection of royal heritage and avant-garde craft.', heroImage: 'https://picsum.photos/seed/london-luxe/2560/1440', featuredCollections: ['heritage', 'nocturnal'], featuredProducts: ['prod-10', 'prod-11'], office: COUNTRIES.uk.office!, trends: [{ title: 'Mayfair Tradition', description: 'Bespoke Savile Row-inspired outerwear.' }] },
  { id: 'manchester', name: 'Manchester', countryCode: 'uk', description: 'Industrial legacy reimagined for the modern connoisseur.', heroImage: 'https://picsum.photos/seed/mcr-luxe/2560/1440', featuredCollections: ['spring-24'], featuredProducts: ['prod-12'], office: { ...COUNTRIES.uk.office!, city: 'Spinningfields', address: 'The Avenue, Manchester M3 3FL' }, trends: [] },
  { id: 'edinburgh', name: 'Edinburgh', countryCode: 'uk', description: 'Historic grandeur and artisanal resilience.', heroImage: 'https://picsum.photos/seed/edi-luxe/2560/1440', featuredCollections: ['heritage'], featuredProducts: ['prod-13'], office: { ...COUNTRIES.uk.office!, city: 'Multrees Walk', address: 'St Andrew Sq, Edinburgh EH1 3DQ' }, trends: [] },
  { id: 'birmingham', name: 'Birmingham', countryCode: 'uk', description: 'The artisanal heart of the British Midlands.', heroImage: 'https://picsum.photos/seed/bhx-luxe/2560/1440', featuredCollections: ['spring-24'], featuredProducts: ['prod-14'], office: { ...COUNTRIES.uk.office!, city: 'Mailbox', address: 'Royal Mail St, Birmingham B1 1RD' }, trends: [] },
  { id: 'glasgow', name: 'Glasgow', countryCode: 'uk', description: 'The architectural spirit of the North.', heroImage: 'https://picsum.photos/seed/gla-luxe/2560/1440', featuredCollections: ['nocturnal'], featuredProducts: ['prod-15'], office: { ...COUNTRIES.uk.office!, city: 'Buchanan St', address: 'Glasgow G1 3HL' }, trends: [] },

  // UAE Cities
  { id: 'dubai', name: 'Dubai', countryCode: 'ae', description: 'Where gravity-defying ambition meets ancient gold.', heroImage: 'https://picsum.photos/seed/dxb-luxe/2560/1440', featuredCollections: ['privé-watches', 'heritage'], featuredProducts: ['prod-20', 'prod-21'], office: COUNTRIES.ae.office!, trends: [{ title: 'Desert Rose Gold', description: 'High-jewelry inspired by the Arabian dawn.' }] },
  { id: 'abu-dhabi', name: 'Abu Dhabi', countryCode: 'ae', description: 'Cultural preservation and palatial elegance.', heroImage: 'https://picsum.photos/seed/auh-luxe/2560/1440', featuredCollections: ['heritage'], featuredProducts: ['prod-22'], office: { ...COUNTRIES.ae.office!, city: 'Galleria', address: 'Al Maryah Island, Abu Dhabi' }, trends: [] },
  { id: 'sharjah', name: 'Sharjah', countryCode: 'ae', description: 'The intellectual soul of the Emirates.', heroImage: 'https://picsum.photos/seed/shj-luxe/2560/1440', featuredCollections: ['spring-24'], featuredProducts: ['prod-23'], office: { ...COUNTRIES.ae.office!, city: 'University City', address: 'Sharjah, UAE' }, trends: [] },
  { id: 'al-ain', name: 'Al Ain', countryCode: 'ae', description: 'The oasis of heritage and tranquility.', heroImage: 'https://picsum.photos/seed/aln-luxe/2560/1440', featuredCollections: ['heritage'], featuredProducts: ['prod-24'], office: { ...COUNTRIES.ae.office!, city: 'Al Ain Mall', address: 'Al Ain, UAE' }, trends: [] },
  { id: 'ras-al-khaimah', name: 'Ras Al Khaimah', countryCode: 'ae', description: 'The untamed luxury of the northern mountains.', heroImage: 'https://picsum.photos/seed/rak-luxe/2560/1440', featuredCollections: ['nocturnal'], featuredProducts: ['prod-25'], office: { ...COUNTRIES.ae.office!, city: 'Al Marjan', address: 'RAK, UAE' }, trends: [] },

  // India Cities
  { id: 'mumbai', name: 'Mumbai', countryCode: 'in', description: 'The high-velocity heart of Indian Haute Couture.', heroImage: 'https://picsum.photos/seed/bom-luxe/2560/1440', featuredCollections: ['heritage', 'spring-24'], featuredProducts: ['prod-30', 'prod-31'], office: COUNTRIES.in.office!, trends: [{ title: 'Colaba Heritage', description: 'Silk-woven artifacts and temple-inspired gold.' }] },
  { id: 'delhi', name: 'Delhi', countryCode: 'in', description: 'Imperial grandeur and contemporary political style.', heroImage: 'https://picsum.photos/seed/del-luxe/2560/1440', featuredCollections: ['heritage'], featuredProducts: ['prod-32'], office: { ...COUNTRIES.in.office!, city: 'Emporio', address: 'Vasant Kunj, New Delhi' }, trends: [] },
  { id: 'bangalore', name: 'Bangalore', countryCode: 'in', description: 'Innovation meets the classic Indian aesthetic.', heroImage: 'https://picsum.photos/seed/blr-luxe/2560/1440', featuredCollections: ['spring-24'], featuredProducts: ['prod-33'], office: { ...COUNTRIES.in.office!, city: 'UB City', address: 'Vittal Mallya Rd, Bangalore' }, trends: [] },
  { id: 'hyderabad', name: 'Hyderabad', countryCode: 'in', description: 'The city of Nizams and timeless pearl heritage.', heroImage: 'https://picsum.photos/seed/hyd-luxe/2560/1440', featuredCollections: ['heritage'], featuredProducts: ['prod-34'], office: { ...COUNTRIES.in.office!, city: 'Banjara Hills', address: 'Road No. 1, Hyderabad' }, trends: [] },
  { id: 'chennai', name: 'Chennai', countryCode: 'in', description: 'The artistic soul of Southern Indian craft.', heroImage: 'https://picsum.photos/seed/maa-luxe/2560/1440', featuredCollections: ['spring-24'], featuredProducts: ['prod-35'], office: { ...COUNTRIES.in.office!, city: 'Nungambakkam', address: 'Khader Nawaz Khan Rd, Chennai' }, trends: [] },

  // Singapore Cities (Areas)
  { id: 'orchard-road', name: 'Orchard Road', countryCode: 'sg', description: 'The world-renowned avenue of high-end discovery.', heroImage: 'https://picsum.photos/seed/orchard-luxe/2560/1440', featuredCollections: ['spring-24', 'heritage'], featuredProducts: ['prod-40', 'prod-41'], office: COUNTRIES.sg.office!, trends: [{ title: 'Tropical Sophisticate', description: 'Linen-silk blends and marine-grade complications.' }] },
  { id: 'marina-bay', name: 'Marina Bay', countryCode: 'sg', description: 'Futuristic architectural excellence.', heroImage: 'https://picsum.photos/seed/mbs-luxe/2560/1440', featuredCollections: ['privé-watches'], featuredProducts: ['prod-42'], office: { ...COUNTRIES.sg.office!, city: 'MBS South', address: 'Marina Bay Sands Level 1' }, trends: [] },
  { id: 'sentosa', name: 'Sentosa', countryCode: 'sg', description: 'Elite island living and private resort luxury.', heroImage: 'https://picsum.photos/seed/sentosa-luxe/2560/1440', featuredCollections: ['spring-24'], featuredProducts: ['prod-43'], office: { ...COUNTRIES.sg.office!, city: 'Sentosa Cove', address: 'Quayside Isle, Singapore' }, trends: [] },
  { id: 'bugis', name: 'Bugis', countryCode: 'sg', description: 'Heritage blocks and artisanal vibrance.', heroImage: 'https://picsum.photos/seed/bugis-luxe/2560/1440', featuredCollections: ['heritage'], featuredProducts: ['prod-44'], office: { ...COUNTRIES.sg.office!, city: 'Victoria St', address: 'Singapore 188067' }, trends: [] },
  { id: 'raffles-place', name: 'Raffles Place', countryCode: 'sg', description: 'The financial heart with a heritage pulse.', heroImage: 'https://picsum.photos/seed/raffles-luxe/2560/1440', featuredCollections: ['nocturnal'], featuredProducts: ['prod-45'], office: { ...COUNTRIES.sg.office!, city: 'Battery Rd', address: 'Singapore 049909' }, trends: [] },
];

const generateDetailedSubcategories = (prefix: string, count: number) => {
  return Array.from({ length: count }, (_, i) => `${prefix} Series ${i + 1}`);
};

export const CATEGORIES: Category[] = [
  { id: 'women', name: 'Women', description: 'Experience the pinnacle of feminine elegance.', subcategories: generateDetailedSubcategories('Haute Couture', 40).concat(generateDetailedSubcategories('Evening Wear', 40)).concat(generateDetailedSubcategories('Signature Bags', 40)) },
  { id: 'men', name: 'Men', description: 'Crafted for the modern aristocrat.', subcategories: generateDetailedSubcategories('Bespoke Tailoring', 35).concat(generateDetailedSubcategories('Heritage Shoes', 35)).concat(generateDetailedSubcategories('Luxury Outerwear', 40)) },
  { id: 'jewelry', name: 'Jewelry', description: 'Rare artifacts of light and stone.', subcategories: generateDetailedSubcategories('High Jewelry', 50).concat(generateDetailedSubcategories('Bespoke Rings', 50)) },
  { id: 'watches', name: 'Watches', description: 'Precision engineered for eternity.', subcategories: generateDetailedSubcategories('Grand Complications', 40).concat(generateDetailedSubcategories('Heritage Watches', 40)) },
  { id: 'accessories', name: 'Accessories', description: 'The details that define the Maison.', subcategories: generateDetailedSubcategories('Exotic Leather', 50) },
  { id: 'kids', name: 'Kids', description: 'Junior couture for the next generation.', subcategories: generateDetailedSubcategories('Junior Heritage', 30) },
  { id: 'beauty', name: 'Beauty', description: 'Scented artifacts and elite skincare.', subcategories: generateDetailedSubcategories('Atelier Fragrance', 40) },
  { id: 'lifestyle', name: 'Lifestyle', description: 'The spirit of the Maison in every object.', subcategories: generateDetailedSubcategories('Exclusive Gear', 40) },
  { id: 'home', name: 'Home', description: 'Sculptural decor for your sanctuary.', subcategories: generateDetailedSubcategories('Heritage Decor', 50) },
  { id: 'travel', name: 'Travel', description: 'Luxury luggage for global connoisseurs.', subcategories: generateDetailedSubcategories('Bespoke Trunks', 40) },
];

export const COLLECTIONS: Collection[] = [
  { id: 'spring-24', name: 'Spring/Summer 2024', description: 'Lightweight elegance for the modern aristocrat. Inspired by the soft hues of a Mediterranean dawn.', imageUrl: 'https://picsum.photos/seed/spring24-luxe/1920/1080' },
  { id: 'heritage', name: 'The Heritage Line', description: 'Timeless pieces that define generations. A tribute to the founding year of 1924.', imageUrl: 'https://picsum.photos/seed/heritage-luxe/1920/1080' },
  { id: 'nocturnal', name: 'Nocturnal Allure', description: 'Sophisticated evening wear and accessories for those who own the night.', imageUrl: 'https://picsum.photos/seed/nocturnal-luxe/1920/1080' },
  { id: 'privé-watches', name: 'Watchmakers Secret', description: 'Unreleased prototypes from the Swiss high-plateau. Strictly for Bespoke tier collectors.', imageUrl: 'https://picsum.photos/seed/prive-watches/1920/1080', isPrivate: true },
];

export const COLORS = ['Ivory', 'Gold', 'Plum', 'Midnight', 'Emerald', 'Sapphire', 'Onyx'];
export const SIZES = ['XS', 'S', 'M', 'L', 'XL', 'One Size', 'Bespoke'];

const generateProducts = (): Product[] => {
  const products: Product[] = [];
  const categories = CATEGORIES;
  const collectionIds = COLLECTIONS.map(c => c.id);

  for (let i = 1; i <= 600; i++) {
    const catObj = categories[i % categories.length];
    const cat = catObj.name;
    const sub = catObj.subcategories[i % catObj.subcategories.length];
    const collIndex = i % collectionIds.length;
    
    const basePrice = 1200 + ((i * 19) % 35000);
    const rating = 4.0 + ((i * 3) % 11) / 10;
    const reviewsCount = 10 + ((i * 7) % 300);

    products.push({
      id: `prod-${i}`,
      name: `Amarisé ${sub.split(' ').slice(0, 2).join(' ')} Artifact ${i}`,
      category: cat,
      subcategory: sub,
      collectionId: collectionIds[collIndex],
      basePrice,
      imageUrl: `https://picsum.photos/seed/amarise-product-${i}/1200/1600`,
      isVip: i % 12 === 0,
      rating: rating > 5 ? 5 : rating,
      reviewsCount,
      colors: [COLORS[i % COLORS.length], COLORS[(i + 1) % COLORS.length]],
      sizes: cat === 'Watches' || cat === 'Accessories' ? ['One Size'] : [SIZES[i % SIZES.length], SIZES[(i + 1) % SIZES.length]],
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

export const CAMPAIGNS: Campaign[] = [
  { id: 'camp-1', title: 'Spring Awakening', type: 'email', status: 'active', reach: 50000, engagement: 1500, country: 'us', performance: 85 },
  { id: 'camp-2', title: 'Heritage Push', type: 'push', status: 'scheduled', reach: 120000, engagement: 0, country: 'uk', performance: 0 },
];

export const AFFILIATES: Affiliate[] = [
  { id: 'aff-1', name: 'Luxe Curator', tier: 'diamond', salesGenerated: 1200000, commissionPaid: 120000, status: 'active' },
  { id: 'aff-2', name: 'Elite Style', tier: 'gold', salesGenerated: 450000, commissionPaid: 45000, status: 'active' },
];

export const NOTIFICATIONS: Notification[] = [
  { id: 'not-1', type: 'Email', subject: 'Your Private Invitation', recipients: 'VIP-1, VIP-2', scheduledAt: '2024-03-20', status: 'Queued' },
];

export const VIP_CLIENTS: VipClient[] = [
  { id: 'vip-1', name: 'Alexandra Sterling', email: 'alexandra@sterling.com', tier: 'Bespoke', country: 'us', totalSpend: 850000, lastActive: '2024-03-15', assignedCollections: ['heritage', 'privé-watches'] },
  { id: 'vip-2', name: 'Maximilian Von Haus', email: 'max@haus.de', tier: 'Platinum', country: 'uk', totalSpend: 420000, lastActive: '2024-03-12', assignedCollections: ['heritage'] },
];

export const EDITOR_INITIAL: Editorial[] = [
  {
    id: 'ed-1',
    title: 'The Architecture of Time',
    excerpt: 'Exploring the horological heritage of the Swiss high-plateau.',
    content: 'Deep in the Jura Mountains, where time seems to stand still, the masters of the Amarisé watchmaking atelier are crafting the next generation of grand complications...',
    imageUrl: 'https://picsum.photos/seed/editorial-watches/1600/900',
    category: 'Artisanal',
    country: 'us',
    author: 'Elena Vance',
    date: '2024-03-01',
    isVip: false,
    featuredProducts: ['prod-1', 'prod-2']
  },
  {
    id: 'ed-2',
    title: 'Dubai: A Golden Dawn',
    excerpt: 'How the desert metropolis is shaping the future of High Jewelry.',
    content: 'As the sun rises over the Burj Khalifa, the reflection off the Amarisé flagship in the Dubai Mall signals a new era for the world of rare stones...',
    imageUrl: 'https://picsum.photos/seed/editorial-dubai/1600/900',
    category: 'City Edit',
    country: 'ae',
    author: 'Omar Al-Sayed',
    date: '2024-03-05',
    isVip: true,
    featuredProducts: ['prod-5', 'prod-12']
  }
];

export const MAISON_STORY: MaisonStory = {
  title: 'A Legacy of Radiance',
  subtitle: 'Since 1924, we have curated the extraordinary.',
  history: [
    { year: '1924', milestone: 'The First Atelier', description: 'Founded in the heart of Paris by Henri Amarisé.' },
    { year: '1952', milestone: 'Global Expansion', description: 'Opening the flagship on 5th Avenue, New York.' },
    { year: '1988', milestone: 'The Grand Complication', description: 'Unveiling our first bespoke heritage timepiece.' },
    { year: '2024', milestone: 'Centennial Excellence', description: 'Celebrating 100 years of artisanal mastery.' },
  ],
  philosophy: 'We believe that luxury is not merely an object, but an experience of human brilliance. Every artifact is a testament to the pursuit of perfection.',
  craftsmanship: [
    { title: 'Haute Couture', description: 'Hand-sewn by master tailors with decades of experience.', imageUrl: 'https://picsum.photos/seed/craft-couture/1200/800' },
    { title: 'Fine Jewelry', description: 'Rare stones ethically sourced from the world\'s most remote mines.', imageUrl: 'https://picsum.photos/seed/craft-jewelry/1200/800' },
  ],
  sustainability: 'Our commitment is to preserve the earth that provides our materials and the cultures that provide our inspiration.'
};

export const CUSTOMER_SERVICE: Record<string, CustomerServiceInfo> = {
  us: {
    shipping: 'Complimentary white-glove shipping within the continental United States. Delivery within 2-3 business hours for local NYC residents.',
    returns: '30-day artisanal returns policy for unused and unsealed items.',
    faqs: [
      { question: 'How do I book a private viewing?', answer: 'Please contact our New York concierge at +1 (212) 555-0192.' },
    ]
  },
  uk: {
    shipping: 'Next-day courier service across the United Kingdom. International shipping to Europe within 48 hours.',
    returns: 'Complimentary returns within 30 days for all heritage artifacts.',
    faqs: [
      { question: 'Do you offer tailoring services?', answer: 'Yes, our Bond Street atelier provides full bespoke tailoring.' },
    ]
  },
  ae: {
    shipping: 'Same-day white-glove delivery in Dubai and Abu Dhabi.',
    returns: '30-day exchange or return for all luxury boutique items.',
    faqs: [
      { question: 'Where is your Dubai boutique?', answer: 'We are located on Fashion Avenue in The Dubai Mall.' },
    ]
  },
  in: {
    shipping: 'Global standard shipping with local courier partnerships across major metropolitan hubs.',
    returns: '15-day artisanal inspection and return window.',
    faqs: [
      { question: 'Are prices inclusive of taxes?', answer: 'Yes, all displayed prices include relevant local duties and taxes.' },
    ]
  },
  sg: {
    shipping: 'Complimentary white-glove delivery across Singapore.',
    returns: '30-day hassle-free return for boutique-sealed items.',
    faqs: [
      { question: 'Can I pick up in-store?', answer: 'Yes, visit our Marina Bay Sands boutique for click-and-collect.' },
    ]
  },
};

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
