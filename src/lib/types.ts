
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
