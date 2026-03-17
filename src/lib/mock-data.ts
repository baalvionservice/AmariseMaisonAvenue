
import { Country, Product, Category, Collection, Review, Campaign, Affiliate, Notification, VipClient, Editorial, MaisonStory, CustomerServiceInfo } from './types';

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

export const CATEGORIES: Category[] = [
  { id: 'women', name: 'Women', subcategories: ['Haute Couture', 'Evening Wear', 'Signature Bags', 'Silk Scarves', 'Resort Collection'] },
  { id: 'men', name: 'Men', subcategories: ['Bespoke Tailoring', 'Luxury Outerwear', 'Heritage Shoes', 'Fine Knits', 'Business Heritage'] },
  { id: 'kids', name: 'Kids', subcategories: ['Junior Couture', 'Nursery Heritage', 'Artisanal Toys', 'Miniature Timepieces', 'Ceremony Wear'] },
  { id: 'accessories', name: 'Accessories', subcategories: ['Exotic Leather', 'Heritage Belts', 'Luxury Eyewear', 'Bespoke Hats', 'Fragrance Charms'] },
  { id: 'jewelry', name: 'Jewelry', subcategories: ['High Jewelry', 'Fine Gold', 'Bespoke Rings', 'Artisanal Silver', 'Heritage Gemstones'] },
  { id: 'watches', name: 'Watches', subcategories: ['Grand Complications', 'Heritage Collection', 'Limited Editions', 'Metiers d’Art', 'Dive Heritage'] },
  { id: 'beauty', name: 'Beauty', subcategories: ['Maison Fragrance', 'Elite Skincare', 'Atelier Cosmetics', 'Hair Couture', 'Scented Artifacts'] },
  { id: 'lifestyle', name: 'Lifestyle', subcategories: ['Digital Heritage', 'Fine Stationery', 'Exclusive Gifts', 'Private Member Gear', 'Tech Couture'] },
  { id: 'home', name: 'Home', subcategories: ['Artisanal Decor', 'Heritage Linens', 'Sculptural Furniture', 'Fragrance Diffusion', 'Crystal Heritage'] },
  { id: 'travel', name: 'Travel', subcategories: ['Luxury Luggage', 'Atelier Trunks', 'Bespoke Travel Kits', 'Global Concierge Gear', 'Exotic Weekenders'] },
];

export const COLLECTIONS: Collection[] = [
  { id: 'spring-24', name: 'Spring/Summer 2024', description: 'Lightweight elegance for the modern aristocrat. Inspired by the soft hues of a Mediterranean dawn.', imageUrl: 'https://picsum.photos/seed/spring24-luxe/1920/1080' },
  { id: 'heritage', name: 'The Heritage Line', description: 'Timeless pieces that define generations. A tribute to the founding year of 1924.', imageUrl: 'https://picsum.photos/seed/heritage-luxe/1920/1080' },
  { id: 'nocturnal', name: 'Nocturnal Allure', description: 'Sophisticated evening wear and accessories for those who own the night.', imageUrl: 'https://picsum.photos/seed/nocturnal-luxe/1920/1080' },
  { id: 'privé-watches', name: 'Watchmakers Secret', description: 'Unreleased prototypes from the Swiss high-plateau. Strictly for Bespoke tier collectors.', imageUrl: 'https://picsum.photos/seed/prive-watches/1920/1080', isPrivate: true },
];

export const EDITOR_INITIAL: Editorial[] = [
  {
    id: 'ed-1',
    title: 'The Alchemy of Silk',
    excerpt: 'Deep in the heart of our Lyon atelier, master weavers breathe life into the finest threads.',
    content: 'Luxury is not merely an object; it is a resonance between the hand of the artisan and the spirit of the material. At Amarisé, we believe that every yard of silk carries the weight of a century of tradition.\n\nOur current seasonal feature explores the metamorphosis of raw cocoon into the shimmering drapery that graces the shoulders of the world\'s most discerning individuals. It is a process of patience, precision, and unwavering dedication to the pursuit of perfection.',
    imageUrl: 'https://picsum.photos/seed/silk-alchemy/1600/900',
    category: 'Artisanal',
    country: 'us',
    author: 'Clara Montesque',
    date: '2024-03-01',
    isVip: false,
    featuredProducts: ['prod-001', 'prod-002']
  },
  {
    id: 'ed-2',
    title: 'Dubai: The Gilded Oasis',
    excerpt: 'An exploration of contemporary luxury in the city of future-heritage.',
    content: 'In the vast expanse where the desert meets the sky, Dubai stands as a testament to human ambition. For the Maison Amarisé, this city represents the intersection of ancient trading heritage and the pinnacle of modern luxury.\n\nOur city-specific edit focuses on the "Golden Hour" — that ephemeral moment when the sun dips below the Burj Khalifa and the city transforms into a canvas of light and shadow. Here, we present pieces that mirror this transition: from high-jewelry that catches the dying rays to accessories designed for the city\'s vibrant nocturnal life.',
    imageUrl: 'https://picsum.photos/seed/dubai-story/1600/900',
    category: 'City Edit',
    country: 'ae',
    author: 'Omar Al-Sayed',
    date: '2024-02-20',
    isVip: false,
    featuredProducts: ['prod-015', 'prod-030']
  }
];

export const MAISON_STORY: MaisonStory = {
  title: "The Heritage of Amarisé",
  subtitle: "Curating excellence since 1924, from the heart of Paris to the corners of the globe.",
  history: [
    { year: "1924", milestone: "The First Atelier", description: "Amarisé opens its flagship atelier on Avenue Montaigne, Paris, specializing in bespoke silk drapery." },
    { year: "1948", milestone: "Horological Expansion", description: "The Maison partners with Swiss master watchmakers to introduce the first Heritage Timepiece collection." },
    { year: "1972", milestone: "Fine Jewelry Debut", description: "Amarisé reveals its first high-jewelry collection, featuring rare emeralds sourced from the Zambian plateaus." },
    { year: "2024", milestone: "Global Maison Avenue", description: "Launch of the digital global flagship, bridging artisanal tradition with futuristic intelligence." }
  ],
  philosophy: "At Amarisé, we believe that luxury is a living archive. Every stitch, every gear, and every gemstone is a chapter in a story of human brilliance. We do not just create objects; we preserve the resonance between material and mastery.",
  craftsmanship: [
    { title: "The Silk Weaver", description: "Using 18th-century looms, our master weavers in Lyon create fabrics that flow like water and endure like heritage.", imageUrl: "https://picsum.photos/seed/craft-silk/800/1000" },
    { title: "The Gem Carver", description: "Our lapidaries spend hundreds of hours on a single stone, revealing the inner light hidden by nature.", imageUrl: "https://picsum.photos/seed/craft-gem/800/1000" }
  ],
  sustainability: "Our Heritage of Responsibility ensures that 100% of our raw materials are ethically sourced, supporting the communities that provide us with nature's rarest gifts."
};

export const CUSTOMER_SERVICE: Record<string, CustomerServiceInfo> = {
  us: {
    shipping: "Complimentary white-glove delivery across the United States. Estimated arrival: 3-5 business days. Overnight delivery available for selection at the final salon view.",
    returns: "30-day complimentary returns for all unworn artisanal pieces. Items must be in original architectural packaging with the authenticity seal intact. Bespoke commissions are final sale.",
    faqs: [
      { question: "How do I track my global shipment?", answer: "Once your piece leaves our New York atelier, you will receive a digital tracking portal via email and SMS." },
      { question: "Is the packaging sustainable?", answer: "Our signature boxes are crafted from FSC-certified heritage paper and vegetable-based inks, designed for archival reuse." },
      { question: "Are the shipments insured?", answer: "Every Amarisé artifact is fully insured for its replacement value until it is physically delivered to your care." }
    ]
  },
  uk: {
    shipping: "Bespoke courier service throughout the United Kingdom. Standard delivery: 2-3 business days. Same-day delivery available within Greater London.",
    returns: "Complimentary returns within 30 days. Pieces must be returned in their original condition to our Old Bond Street atelier or via our private collection service.",
    faqs: [
      { question: "Can I visit the London atelier for a return?", answer: "Yes, our Old Bond Street salon accepts returns by private appointment between 10 AM and 6 PM." },
      { question: "Do you offer international shipping from the UK?", answer: "We provide global white-glove delivery from our London hub to over 150 countries." }
    ]
  },
  ae: {
    shipping: "Exclusive delivery via the Amarisé Private Fleet across the Emirates. Same-day delivery for Dubai and Abu Dhabi for orders placed before 2 PM.",
    returns: "21-day private collection service. Our concierge will visit your residence to inspect and collect the return items.",
    faqs: [
      { question: "Is same-day delivery available in Dubai?", answer: "Yes, for our local connoisseurs, we provide expedited fleet delivery within 6 hours of purchase." },
      { question: "Can I pay in multiple currencies?", answer: "While we default to AED, our digital terminal accepts major global currencies and select private banking transfers." }
    ]
  },
  in: {
    shipping: "Secure artisanal transport across India. Estimated delivery to major metros: 4-6 business days. Fully insured transit for all high-jewelry pieces.",
    returns: "15-day complimentary return policy. Collections can be arranged through our Mumbai HQ for verified return inspection.",
    faqs: [
      { question: "How are high-jewelry pieces shipped in India?", answer: "Jewelry artifacts are transported in specialized armored vehicles with dual-custodian security protocols." },
      { question: "Is gift wrapping available?", answer: "All Indian orders include our signature Silk-wrapped festive packaging, perfect for high-society events." }
    ]
  },
  sg: {
    shipping: "Next-day concierge delivery across Singapore. Marina Bay Sands flagship pickup available within 2 hours of digital confirmation.",
    returns: "30-day effortless returns. Visit our Marina Bay Sands salon for instant boutique credit or bank transfer processing.",
    faqs: [
      { question: "Can I pick up my order in person?", answer: "Absolutely. Select 'Atelier Collection' during checkout to meet our curators at the Marina Bay Sands flagship." },
      { question: "Are duties included for Singapore deliveries?", answer: "All local GST and import duties are pre-settled by the Maison for your convenience." }
    ]
  }
};

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
  { id: 'a4', name: 'Modern Maharaja', tier: 'silver', salesGenerated: 45000, commissionPaid: 4500, status: 'pending' },
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
  const categories = CATEGORIES;
  const collectionIds = COLLECTIONS.map(c => c.id);

  for (let i = 1; i <= 500; i++) {
    const catObj = categories[i % categories.length];
    const cat = catObj.name;
    const sub = catObj.subcategories[i % catObj.subcategories.length];
    const collIndex = i % collectionIds.length;
    
    const basePrice = 1200 + ((i * 19) % 25000);
    const rating = 4.0 + ((i * 3) % 11) / 10;
    const reviewsCount = 10 + ((i * 7) % 300);

    products.push({
      id: `prod-${i}`,
      name: `Amarisé ${sub} No. ${i.toString().padStart(3, '0')}`,
      category: cat,
      subcategory: sub,
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
