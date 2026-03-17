
export type CountryCode = 'us' | 'uk' | 'ae' | 'in' | 'sg';

export interface Country {
  code: CountryCode;
  name: string;
  currency: string;
  symbol: string;
  locale: string;
}

export interface Category {
  id: string;
  name: string;
  subcategories: string[];
}

export interface Collection {
  id: string;
  name: string;
  description: string;
  imageUrl: string;
}

export interface Product {
  id: string;
  name: string;
  category: string;
  subcategory: string;
  collectionId: string;
  basePrice: number;
  imageUrl: string;
  isVip: boolean;
  rating: number;
  reviewsCount: number;
}

export interface CartItem extends Product {
  quantity: number;
}

export interface Review {
  id: string;
  userName: string;
  rating: number;
  comment: string;
  date: string;
}

export interface Campaign {
  id: string;
  title: string;
  type: 'email' | 'push' | 'social';
  status: 'draft' | 'scheduled' | 'active' | 'completed';
  reach: number;
  engagement: number;
  country: string;
  performance: number;
  subject?: string;
  body?: string;
  scheduledAt?: string;
}

export interface Affiliate {
  id: string;
  name: string;
  tier: 'silver' | 'gold' | 'diamond';
  salesGenerated: number;
  commissionPaid: number;
  status: 'active' | 'pending' | 'on_hold';
}

export interface Notification {
  id: string;
  type: 'Email' | 'Push';
  subject: string;
  body?: string;
  recipients: string;
  scheduledAt: string;
  status: 'Queued' | 'Sent' | 'Failed';
}
