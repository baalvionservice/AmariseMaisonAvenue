import { CountryConfig, BrandConfig } from './types';

export const COUNTRIES_CONFIG: CountryConfig[] = [
  {
    code: 'us',
    enabled: true,
    currency: 'USD',
    symbol: '$',
    locale: 'en-US',
    messagingStrategy: 'Email',
    pricingVisibility: 'mixed',
    featuredCategories: ['w-bags', 'wa-complications']
  },
  {
    code: 'uk',
    enabled: true,
    currency: 'GBP',
    symbol: '£',
    locale: 'en-GB',
    messagingStrategy: 'Concierge',
    pricingVisibility: 'gated',
    featuredCategories: ['m-tailoring', 'wa-complications']
  },
  {
    code: 'ae',
    enabled: true,
    currency: 'AED',
    symbol: 'د.إ',
    locale: 'ar-AE',
    messagingStrategy: 'WhatsApp',
    pricingVisibility: 'gated',
    featuredCategories: ['j-high', 'w-bags']
  },
  {
    code: 'in',
    enabled: true,
    currency: 'INR',
    symbol: '₹',
    locale: 'en-IN',
    messagingStrategy: 'WhatsApp',
    pricingVisibility: 'public',
    featuredCategories: ['j-high', 'm-tailoring']
  },
  {
    code: 'sg',
    enabled: true,
    currency: 'SGD',
    symbol: 'S$',
    locale: 'en-SG',
    messagingStrategy: 'Concierge',
    pricingVisibility: 'mixed',
    featuredCategories: ['wa-complications', 'w-bags']
  }
];

export const BRANDS_CONFIG: BrandConfig[] = [
  {
    id: 'amarise-luxe',
    name: 'AMARISÉ MAISON AVENUE',
    domain: 'amarise-maison-avenue.com',
    theme: {
      primary: '#000000',
      secondary: '#FAF9F6',
      accent: '#D4AF37'
    },
    enabled: true
  },
  {
    id: 'future-maison-1',
    name: 'L’ATELIER D’OR',
    domain: 'latelier-dor.com',
    theme: {
      primary: '#1A1A1A',
      secondary: '#FFFFFF',
      accent: '#C5A059'
    },
    enabled: false
  }
];
