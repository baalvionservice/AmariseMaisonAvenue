
export type CountryCode = 'us' | 'uk' | 'ae' | 'in' | 'sg';

export interface Office {
  city: string;
  address: string;
  phone: string;
  email: string;
  mapUrl: string;
  image: string;
}

export interface City {
  id: string;
  name: string;
  countryCode: CountryCode;
  description: string;
  heroImage: string;
  featuredCollections: string[];
  featuredProducts: string[];
  office: Office;
  trends: {
    title: string;
    description: string;
  }[];
}

export interface Country {
  code: CountryCode;
  name: string;
  currency: string;
  symbol: string;
  locale: string;
  office?: Office;
}

export interface Category {
  id: string;
  name: string;
  description?: string;
  imageUrl?: string;
  subcategories: string[];
  departmentId: string;
}

export interface Department {
  id: string;
  name: string;
  description: string;
  imageUrl: string;
  categories: string[]; // Category IDs
}

export interface Product {
  id: string;
  name: string;
  departmentId: string;
  categoryId: string;
  subcategoryId: string;
  collectionId: string;
  basePrice: number;
  imageUrl: string;
  isVip: boolean;
  rating: number;
  reviewsCount: number;
  colors?: string[];
  sizes?: string[];
  stock: number;
  vendorId?: string;
}

export interface CartItem extends Product {
  quantity: number;
}

export interface Collection {
  id: string;
  name: string;
  description: string;
  imageUrl: string;
  departmentId?: string;
  isPrivate?: boolean;
}

export interface Editorial {
  id: string;
  title: string;
  excerpt: string;
  content: string;
  imageUrl: string;
  category: 'Seasonal' | 'City Edit' | 'VIP Exclusive' | 'Artisanal';
  country: string;
  author: string;
  date: string;
  isVip: boolean;
  featuredProducts: string[];
}

export interface BuyingGuide {
  id: string;
  title: string;
  excerpt: string;
  content: string;
  tips: string[];
  featuredProducts: string[];
  featuredCollections: string[];
  imageUrl: string;
  category: string;
  country: string;
  date: string;
  author: string;
}

export interface SocialMetrics {
  likes: number;
  shares: number;
  engagementRate: number;
}

export interface MaisonStory {
  title: string;
  subtitle: string;
  history: {
    year: string;
    milestone: string;
    description: string;
  }[];
  philosophy: string;
  craftsmanship: {
    title: string;
    description: string;
    imageUrl: string;
  }[];
  sustainability: string;
}

export interface CustomerServiceInfo {
  shipping: string;
  returns: string;
  faqs: { question: string; answer: string }[];
}

// --- ADMIN & MARKETING EXTENSIONS ---

export interface AdminAccount {
  id: string;
  name: string;
  email: string;
  role: 'CEO' | 'Manager' | 'Ops' | 'Marketing' | 'Support';
  permissions: string[];
  status: 'active' | 'suspended';
  lastActive: string;
  avatar?: string;
}

export interface Vendor {
  id: string;
  name: string;
  category: string;
  performance: number; // 0-100
  productCount: number;
  salesTotal: number;
  status: 'active' | 'pending' | 'rejected';
  payoutSchedule: 'weekly' | 'monthly';
  joinedDate: string;
}

export interface Campaign {
  id: string;
  title: string;
  type: 'Flash Sale' | 'VIP Loyalty' | 'Seasonal' | 'Launch' | 'Email' | 'Social';
  status: 'scheduled' | 'active' | 'completed' | 'draft';
  discountValue: number;
  startDate: string;
  endDate: string;
  market: CountryCode | 'global';
  roi?: number;
  reach?: number;
  conversions?: number;
}

export interface CustomerSegment {
  id: string;
  name: string;
  description: string;
  userCount: number;
  avgOrderValue: number;
  tags: string[];
}

export interface AuditLog {
  id: string;
  adminId: string;
  adminName: string;
  action: string;
  module: string;
  timestamp: string;
  ipAddress: string;
  severity: 'low' | 'medium' | 'high';
}

export interface GlobalSettings {
  theme: {
    primary: string;
    accent: string;
    fontFamily: string;
  };
  seo: {
    defaultTitle: string;
    defaultDesc: string;
    sitemapUrl: string;
  };
  payments: {
    cards: boolean;
    wallets: boolean;
    crypto: boolean;
  };
}

export interface VipClient {
  id: string;
  name: string;
  email: string;
  tier: 'Silver' | 'Gold' | 'Diamond';
  loyaltyPoints: number;
  totalSpend: number;
  lastPurchase?: string;
}

// --- SUPPORT HUB EXTENSIONS ---

export interface SupportTicket {
  id: string;
  customerId: string;
  customerName: string;
  customerTier: 'Silver' | 'Gold' | 'Diamond' | 'Guest';
  subject: string;
  status: 'open' | 'pending' | 'resolved' | 'escalated';
  priority: 'low' | 'medium' | 'high' | 'urgent';
  category: 'Order Issue' | 'Product Query' | 'Return/Exchange' | 'VIP Request' | 'Technical';
  assignedTo?: string; // Admin ID
  lastMessage: string;
  updatedAt: string;
  createdAt: string;
  messages: {
    id: string;
    sender: 'agent' | 'customer';
    text: string;
    timestamp: string;
  }[];
}

export interface SupportStats {
  openTickets: number;
  resolvedToday: number;
  avgResponseTime: string;
  csatScore: number;
  activeChats: number;
}
