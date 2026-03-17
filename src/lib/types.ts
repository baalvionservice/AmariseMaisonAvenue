
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

export interface Subcategory {
  id: string;
  name: string;
  description?: string;
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

export interface SocialInteraction {
  id: string;
  contentId: string;
  type: 'like' | 'share' | 'comment';
  country: string;
  timestamp: string;
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
