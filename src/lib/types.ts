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
  flag: string;
  office?: Office;
}

export interface Category {
  id: string;
  name: string;
  description?: string;
  imageUrl?: string;
  subcategories: string[];
  departmentId: string;
  brandId?: string;
}

export interface Department {
  id: string;
  name: string;
  description: string;
  imageUrl: string;
  categories: string[]; // Category IDs
  brandId?: string;
}

export interface RegionalStock {
  warehouseId: string;
  warehouseName: string;
  stockCount: number;
  region: CountryCode | 'global';
}

export interface ProductMedia {
  type: 'image' | 'video' | '360';
  url: string;
  alt: string;
}

export interface ArtifactVersion {
  id: string;
  version: number;
  data: any;
  editedBy: string;
  timestamp: string;
  changeSummary: string;
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
  brandId: string;
  countryCode?: CountryCode;
  isGlobal: boolean;
  scope: 'global' | 'regional';
  regions: CountryCode[];
  status: 'draft' | 'review' | 'verified' | 'published';
  // Enterprise Extensions
  regionalStock?: RegionalStock[];
  mediaGallery?: ProductMedia[];
  listingType?: 'fixed' | 'auction';
  currentBid?: number;
  auctionEndsAt?: string;
  isSubscriptionOnly?: boolean;
  // Versioning & Conflict Control
  versionHistory: ArtifactVersion[];
  currentVersion: number;
  conflictStrategy: 'global-priority' | 'regional-priority';
  lastSyncedAt?: string;
  lastEditedRegion: CountryCode | 'global';
  editingLock?: {
    userId: string;
    userName: string;
    expiresAt: string;
  };
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
  brandId: string;
  isGlobal: boolean;
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
  brandId: string;
  isGlobal: boolean;
  // SEO Authority Fields
  targetKeyword?: string;
  metaDescription?: string;
  contentOutline?: string[];
  relatedArticles?: string[];
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
  brandId: string;
  isGlobal: boolean;
  // SEO Authority Fields
  targetKeyword?: string;
  metaDescription?: string;
  investmentOutlook?: string;
  provenanceChecklist?: string[];
}

export interface ProductExtended extends Product {
  collectorValue: string;
  marketRange: string;
  investmentInsight: string;
  scarcityTag: string;
  priceVisible: boolean;
  institutionalVerification?: boolean;
}

export interface MaisonService {
  id: string;
  name: string;
  tagline: string;
  description: string;
  priceRange: string;
  features: string[];
  imageUrl: string;
  brandId: string;
  isGlobal: boolean;
}

export interface MaisonReport {
  id: string;
  title: string;
  summary: string;
  date: string;
  author: string;
  isPremium: boolean;
  fullContent?: string;
  previewImage: string;
  brandId: string;
}

export interface PrivateInquiry {
  id: string;
  productId?: string;
  serviceId?: string;
  customerName: string;
  email: string;
  country: string;
  budgetRange: 'Tier 1' | 'Tier 2' | 'Tier 3'; 
  intent: 'Collector' | 'Personal' | 'Investment';
  message?: string;
  contactMethod: 'WhatsApp' | 'Email';
  status: 'new' | 'contacted' | 'qualifying' | 'presenting' | 'closing' | 'won' | 'lost';
  leadTier: 1 | 2 | 3;
  timestamp: string;
  adminNotes?: string;
  brandId: string;
}

export interface CuratorMessage {
  id: string;
  sender: 'curator' | 'client';
  text: string;
  timestamp: string;
}

export interface LeadConversation {
  id: string;
  inquiryId: string;
  messages: CuratorMessage[];
  status: 'active' | 'archived';
  brandId: string;
}

export interface SalesScript {
  id: string;
  name: string;
  stage: PrivateInquiry['status'];
  triggerKeywords?: string[];
  template: string;
  brandId: string;
  countryCode?: CountryCode; 
}

export interface AutomationRule {
  id: string;
  name: string;
  trigger: 'inquiry_submitted' | 'keyword_match' | 'tier_assigned';
  action: 'send_script' | 'notify_admin' | 'change_status';
  params?: any;
  enabled: boolean;
  brandId: string;
}

export interface SEOMetadata {
  id: string;
  path: string;
  title: string;
  description: string;
  keywords: string;
  h1: string;
  structuredData?: any;
  brandId: string;
  isGlobal: boolean;
}

export interface CMSSection {
  id: string;
  title: string;
  subtitle?: string;
  description?: string;
  visible: boolean;
  featured: boolean;
  contentId?: string; 
  brandId: string;
  countryCode?: CountryCode;
}

export interface CountryConfig {
  code: CountryCode;
  enabled: boolean;
  currency: string;
  symbol: string;
  locale: string;
  messagingStrategy: 'WhatsApp' | 'Email' | 'Concierge';
  pricingVisibility: 'public' | 'gated' | 'mixed';
  featuredCategories: string[];
  taxType: 'Sales Tax' | 'VAT' | 'GST';
  taxRate: number;
}

export interface BrandConfig {
  id: string;
  name: string;
  domain: string;
  theme: {
    primary: string;
    secondary: string;
    accent: string;
  };
  enabled: boolean;
}

export type AIAutomationLevel = 'manual' | 'assisted' | 'auto';

export interface AIModuleStatus {
  id: string;
  name: string;
  enabled: boolean;
  level: AIAutomationLevel;
  lastActionAt?: string;
}

export interface AIActionLog {
  id: string;
  moduleId: string;
  action: string;
  status: 'executed' | 'suggested' | 'failed';
  timestamp: string;
  details: string;
  outcome?: string;
}

export interface AISuggestion {
  id: string;
  moduleId: string;
  type: 'content' | 'sales' | 'seo' | 'strategy';
  title: string;
  description: string;
  data: any;
  status: 'pending' | 'approved' | 'rejected';
  timestamp: string;
}

export interface MaisonNotification {
  id: string;
  toRole: string;
  country: string;
  message: string;
  timestamp: string;
  read: boolean;
  type: 'info' | 'alert' | 'success';
}

export interface WorkflowTask {
  id: string;
  taskName: string;
  frequency: 'hourly' | 'daily' | 'weekly';
  country: string;
  status: 'pending' | 'running' | 'complete' | 'failed';
  lastRun?: string;
  nextRun?: string;
  dependencyId?: string;
}

export interface ApprovalRequest {
  id: string;
  userId: string;
  userName: string;
  contentType: 'listing' | 'editorial' | 'campaign';
  contentId: string;
  country: string;
  status: 'pending' | 'approved' | 'rejected';
  timestamp: string;
  comments?: string;
  approvedBy?: string;
}

export interface AnalyticsMetric {
  date: string;
  revenue: number;
  leads: number;
  conversionRate: number;
  aiScore: number;
}

export interface AuditLogEntry {
  id: string;
  actorId: string;
  actorName: string;
  actorRole: string;
  country: string;
  action: string;
  entity: string;
  timestamp: string;
  severity: 'low' | 'medium' | 'high';
  brandId?: string;
}

export interface QALogEntry {
  id: string;
  message: string;
  timestamp: string;
}

export interface QATestCase {
  id: string;
  name: string;
  module: 'AI' | 'Finance' | 'Onboarding' | 'Audit' | 'Security';
  status: 'pending' | 'running' | 'passed' | 'failed';
  lastRun?: string;
  logs: QALogEntry[];
  country: string;
  brandId: string;
}

export interface MaisonError {
  id: string;
  module: 'AI Autopilot' | 'Finance' | 'Onboarding' | 'Content' | 'System' | 'CMS' | 'Sales';
  type: string;
  country: string;
  message: string;
  stackTrace?: string;
  resolved: boolean;
  timestamp: string;
  severity: 'low' | 'medium' | 'high';
  brandId?: string;
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
  institutionalCharter?: string;
  brandId: string;
}

export interface CustomerServiceInfo {
  shipping: string;
  returns: string;
  faqs: { question: string; answer: string }[];
}

export interface AdminAccount {
  id: string;
  name: string;
  email: string;
  role: 'CEO' | 'Manager' | 'Ops' | 'Marketing' | 'Support' | 'Finance' | 'IT' | 'SUPER_ADMIN';
  permissions: string[];
  status: 'active' | 'suspended';
  lastActive: string;
  avatar?: string;
  twoFactorEnabled: boolean;
  brandId?: string; 
}

export interface Vendor {
  id: string;
  name: string;
  category: string;
  performance: number;
  productCount: number;
  salesTotal: number;
  status: 'active' | 'pending' | 'rejected';
  payoutSchedule: 'weekly' | 'monthly';
  joinedDate: string;
  kpis: {
    returnRate: number;
    fulfillmentSpeed: string;
    rating: number;
  };
  brandId: string;
}

export interface Affiliate {
  id: string;
  name: string;
  tier: 'Silver' | 'Gold' | 'Diamond';
  referralCode: string;
  salesGenerated: number;
  commissionEarned: number;
  status: 'active' | 'pending';
  brandId: string;
}

export interface Appointment {
  id: string;
  customerId: string;
  customerName: string;
  type: 'Private Viewing' | 'Virtual Try-on' | 'Atelier Tour';
  date: string;
  time: string;
  city: string;
  status: 'pending' | 'confirmed' | 'cancelled' | 'completed';
  brandId: string;
}

export interface ReturnRequest {
  id: string;
  orderId: string;
  productId: string;
  reason: string;
  status: 'pending' | 'received' | 'inspecting' | 'refunded' | 'rejected';
  warehouseId: string;
  requestedAt: string;
  brandId: string;
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
  brandId?: string;
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
  compliance: {
    gdprEnabled: boolean;
    ccpaEnabled: boolean;
    pciStatus: 'Optimal' | 'Review Required';
  };
  performance: {
    cdnEnabled: boolean;
    cachingEnabled: boolean;
    autoScalingStatus: string;
  };
  emergencyMode: boolean;
}

export interface VipClient {
  id: string;
  name: string;
  email: string;
  tier: 'Silver' | 'Gold' | 'Diamond';
  loyaltyPoints: number;
  totalSpend: number;
  lastPurchase?: string;
  isSubscriber: boolean;
  subscriptionPlan?: 'Maison Privé' | 'Atelier Reserve';
  brandId: string;
  status?: 'pending' | 'verified' | 'rejected';
}

export interface SupportTicket {
  id: string;
  customerId: string;
  customerName: string;
  customerTier: 'Silver' | 'Gold' | 'Diamond' | 'Guest';
  subject: string;
  status: 'open' | 'pending' | 'resolved' | 'escalated';
  priority: 'low' | 'medium' | 'high' | 'urgent';
  category: 'Order Issue' | 'Product Query' | 'Return/Exchange' | 'VIP Request' | 'Technical';
  assignedTo?: string; 
  lastMessage: string;
  updatedAt: string;
  createdAt: string;
  messages: {
    id: string;
    sender: 'agent' | 'customer';
    text: string;
    timestamp: string;
  }[];
  brandId: string;
}

export interface SupportStats {
  openTickets: number;
  resolvedToday: number;
  avgResponseTime: string;
  csatScore: number;
  activeChats: number;
}

export interface MaisonIntegration {
  id: string;
  name: string;
  type: 'Payment' | 'Logistics' | 'CRM' | 'ERP' | 'Analytics';
  provider: string;
  status: 'Connected' | 'Disconnected' | 'Error' | 'Degraded';
  lastSync: string;
  latency?: string;
  uptime: number; 
  logo?: string;
  brandId?: string;
}

export interface ApiLog {
  id: string;
  timestamp: string;
  endpoint: string;
  method: 'GET' | 'POST' | 'PUT' | 'DELETE';
  status: number;
  latency: string;
  integrationId: string;
}

export interface IndexingStatus {
  catalogItems: number;
  indexedItems: number;
  lastFullScan: string;
  searchEngineStatus: 'Optimal' | 'Syncing' | 'Offline';
  sitemapStatus: 'Up to date' | 'Regenerating';
  autoSyncEnabled: boolean;
}

export interface IndexingLog {
  id: string;
  timestamp: string;
  action: string;
  itemsAffected: number;
  duration: string;
  status: 'Success' | 'Partial' | 'Failed';
}

export interface Invoice {
  id: string;
  orderId: string;
  customerName: string;
  amount: number;
  currency: string;
  status: 'issued' | 'paid' | 'processing' | 'settled' | 'closed';
  date: string;
  taxAmount: number;
  taxRate: number;
  complianceCertified: boolean;
  brandId: string;
}

export type TransactionStatus = 'Pending' | 'Paid' | 'Processing' | 'Settled' | 'Closed';

export interface Transaction {
  id: string;
  country: string;
  type: 'Sale' | 'Refund' | 'Payout';
  clientName: string;
  vendorId?: string;
  amount: number;
  currency: string;
  status: TransactionStatus;
  timestamp: string;
  invoiceId?: string;
  brandId: string;
  taxAmount?: number;
  netAmount?: number;
}

export type SyncCategory = 'products' | 'seo' | 'roles' | 'config';

export interface GlobalSyncSession {
  id: string;
  timestamp: string;
  categories: SyncCategory[];
  targets: CountryCode[];
  snapshotBefore: {
    products: Product[];
    seo: SEOMetadata[];
    config: CountryConfig[];
  };
  actorName: string;
  status: 'applied' | 'rolled_back';
}
