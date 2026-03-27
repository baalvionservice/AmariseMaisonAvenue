export type CountryCode = 'us' | 'uk' | 'ae' | 'in' | 'sg';
export type LanguageCode = 'en' | 'ar' | 'hi' | 'fr';

export type PaymentGateway = 'STRIPE' | 'RAZORPAY' | 'PAYU' | 'BANK_TRANSFER';
export type PaymentStatus = 'PENDING' | 'SUCCESS' | 'FAILED' | 'REFUNDED' | 'DISPUTED';
export type SubscriptionStatus = 'ACTIVE' | 'PAST_DUE' | 'CANCELED' | 'INCOMPLETE';

export type TaxType = 'GST' | 'VAT' | 'SALES_TAX';

export interface TaxRule {
  id: string;
  country: CountryCode;
  taxType: TaxType;
  category: string; // 'general', 'hermes', 'watches', 'jewelry'
  rate: number; // percentage, e.g. 18
  isInclusive: boolean;
  lastUpdated: string;
}

export interface TaxCalculationResult {
  subtotal: number;
  totalTax: number;
  totalAmount: number;
  breakdown: {
    itemId: string;
    itemName: string;
    itemPrice: number;
    taxAmount: number;
    taxRate: number;
    taxType: TaxType;
  }[];
}

export interface FXRate {
  currencyCode: string;
  baseCurrency: string; // usually USD
  rate: number;
  spread: number; // Maison markup
  lastUpdated: string;
  source: string;
}

export interface PaymentPlan {
  id: string;
  name: string;
  price: number;
  currency: string;
  interval: 'monthly' | 'yearly';
  features: string[];
  tier: 'Silver' | 'Gold' | 'Diamond';
  isPopular?: boolean;
}

export interface Payment {
  id: string;
  tenantId: string;
  subscriptionId?: string;
  userId: string;
  amount: number;
  currency: string;
  gateway: PaymentGateway;
  gatewayPaymentId: string;
  status: PaymentStatus;
  idempotencyKey: string;
  createdAt: string;
  updatedAt: string;
  metadata?: Record<string, any>;
}

export interface PaymentLog {
  id: string;
  paymentId: string;
  action: 'INIT' | 'WEBHOOK_RECEIVED' | 'SUCCESS' | 'FAILURE' | 'REFUND_INIT' | 'RECONCILIED';
  rawPayload?: any;
  metadata: Record<string, any>;
  timestamp: string;
}

export interface Subscription {
  id: string;
  tenantId: string;
  userId: string;
  planId: string;
  planName: string;
  status: SubscriptionStatus;
  currentPeriodEnd: string;
  cancelAtPeriodEnd: boolean;
  amount: number;
  currency: string;
}

export type TransactionStatus = 'Pending' | 'Paid' | 'Processing' | 'Settled' | 'Closed' | 'Refunded';

export type FulfillmentStep = 'Registry Confirmed' | 'Atelier Preparation' | 'Heritage Audit' | 'Institutional Dispatch' | 'White-Glove Delivery';

export interface Transaction {
  id: string;
  country: string;
  type: 'Sale' | 'Refund' | 'Payout' | 'Subscription';
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
  gateway?: PaymentGateway;
  lockedRate?: number; // Captured FX rate at checkout
  fulfillmentSteps?: {
    step: FulfillmentStep;
    timestamp: string;
    completed: boolean;
  }[];
  artifactName?: string;
  artifactSku?: string;
  isProvenanceCertified?: boolean;
  refundReason?: string;
  refundedAt?: string;
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
  versionHistory: any[];
  currentVersion: number;
  conflictStrategy: 'global-priority' | 'regional-priority';
  lastEditedRegion: CountryCode | 'global';
  condition?: string;
  conditionDetails?: string;
  specialNotes?: string;
  seoTitle?: string;
  seoDescription?: string;
  targetKeyword?: string;
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
  targetKeyword?: string;
  metaDescription?: string;
  contentOutline?: string[];
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
  targetKeyword?: string;
  metaDescription?: string;
  investmentOutlook?: string;
}

export interface VipClient {
  id: string;
  name: string;
  email: string;
  tier: 'Standard' | 'Silver' | 'Gold' | 'Diamond';
  loyaltyPoints: number;
  totalSpend: number;
  lastPurchase?: string;
  isSubscriber: boolean;
  subscriptionPlan?: 'Maison Privé' | 'Atelier Reserve';
  brandId: string;
  status?: 'pending' | 'verified' | 'rejected';
  walletBalance: number;
  walletHistory: WalletTransaction[];
  liveRequests: LiveRequest[];
  certificates: MaisonCertificate[];
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
  isGuideMode: boolean;
  adminViewMode: 'simple' | 'advanced';
}

export interface SupportTicket {
  id: string;
  customerId: string;
  customerName: string;
  customerTier: string;
  subject: string;
  status: 'open' | 'pending' | 'resolved' | 'escalated';
  priority: 'low' | 'medium' | 'high' | 'urgent';
  category: string;
  lastMessage: string;
  updatedAt: string;
  createdAt: string;
  messages: any[];
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
  type: string;
  provider: string;
  status: string;
  lastSync: string;
  uptime: number;
  brandId?: string;
}

export interface ApiLog {
  id: string;
  timestamp: string;
  endpoint: string;
  method: string;
  status: number;
  latency: string;
  integrationId: string;
}

export interface IndexingStatus {
  catalogItems: number;
  indexedItems: number;
  lastFullScan: string;
  searchEngineStatus: string;
  sitemapStatus: string;
  autoSyncEnabled: boolean;
}

export interface Appointment {
  id: string;
  customerId: string;
  customerName: string;
  type: string;
  date: string;
  time: string;
  city: string;
  status: string;
  brandId: string;
}

export interface Invoice {
  id: string;
  orderId: string;
  customerName: string;
  amount: number;
  currency: string;
  status: string;
  date: string;
  taxAmount: number;
  taxRate: number;
  complianceCertified: boolean;
  brandId: string;
  gateway?: PaymentGateway;
  fxRate?: number;
}

export interface PrivateInquiry {
  id: string;
  productId?: string;
  serviceId?: string;
  customerName: string;
  email: string;
  country: string;
  budgetRange: 'Tier 1' | 'Tier 2' | 'Tier 3';
  intent: string;
  message?: string;
  contactMethod: 'WhatsApp' | 'Email';
  status: 'new' | 'contacted' | 'qualifying' | 'presenting' | 'closing' | 'won' | 'lost';
  leadTier: 1 | 2 | 3;
  timestamp: string;
  brandId: string;
}

export interface LeadConversation {
  id: string;
  inquiryId: string;
  messages: any[];
  status: string;
  brandId: string;
}

export interface SalesScript {
  id: string;
  name: string;
  stage: string;
  template: string;
  brandId: string;
  triggerKeywords?: string[];
}

export interface AutomationRule {
  id: string;
  name: string;
  trigger: string;
  action: string;
  enabled: boolean;
  brandId: string;
}

export interface AIModuleStatus {
  id: string;
  name: string;
  enabled: boolean;
  level: 'manual' | 'assisted' | 'auto';
}

export interface AIActionLog {
  id: string;
  moduleId: string;
  action: string;
  status: string;
  timestamp: string;
  details: string;
  input?: any;
  output?: any;
  confidence?: number;
  traceId?: string;
}

export interface AISuggestion {
  id: string;
  moduleId: string;
  type: string;
  title: string;
  description: string;
  data: any;
  status: 'pending' | 'approved' | 'rejected';
  timestamp: string;
}

export interface AuditLogEntry {
  id: string;
  actorId: string;
  actorName: string;
  actorRole: string;
  country: string;
  action: string;
  entity: string;
  entityId?: string;
  timestamp: string;
  severity: 'low' | 'medium' | 'high';
  beforeState?: any;
  afterState?: any;
  reason?: string;
  brandId?: string;
}

export interface SystemLog {
  id: string;
  type: 'api' | 'security' | 'inventory' | 'payment' | 'system' | 'event';
  source: string;
  userId?: string;
  action: string;
  requestData?: any;
  responseData?: any;
  status: 'success' | 'failure';
  error?: string;
  timestamp: string;
  country: string;
}

export interface QATestCase {
  id: string;
  name: string;
  module: string;
  status: string;
  logs: any[];
  country: string;
  brandId: string;
  lastRun?: string;
}

export interface MaisonError {
  id: string;
  module: string;
  type: string;
  country: string;
  message: string;
  resolved: boolean;
  timestamp: string;
  severity: string;
  stackTrace?: string;
}

export interface StressTest {
  id: string;
  name: string;
  loadSize: number;
  type: string;
  status: string;
  metrics: any;
  logs: any[];
  country: string;
}

export interface SEOMetadata {
  id: string;
  path: string;
  title: string;
  description: string;
  keywords: string;
  h1: string;
}

export interface Vendor {
  id: string;
  name: string;
  category: string;
  performance: number;
  salesTotal: number;
  status: 'active' | 'pending' | 'rejected';
  brandId?: string;
  joinedDate?: string;
  payoutSchedule?: string;
  productCount?: number;
  kpis?: any;
}

export interface BrandConfig {
  id: string;
  name: string;
  domain: string;
  theme: any;
  enabled: boolean;
}

export interface CountryConfig {
  code: CountryCode;
  enabled: boolean;
  currency: string;
  symbol: string;
  locale: string;
  messagingStrategy: string;
  pricingVisibility: string;
  featuredCategories: string[];
  taxType: string;
  taxRate: number;
  name: string;
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
  status: string;
  country: string;
  lastRun?: string;
}

export interface ApprovalRequest {
  id: string;
  contentType: string;
  contentId: string;
  country: string;
  status: string;
}

export interface BrandIntegrityIssue {
  id: string;
  productName: string;
  issueType: string;
  description: string;
  country: string;
  severity: string;
  status: string;
}

export interface LiveRequest {
  id: string;
  productName: string;
  status: string;
  requestedAt: string;
  scheduledAt?: string;
  fee: number;
}

export interface MaisonCertificate {
  id: string;
  artifactName: string;
  productId: string;
  nfcSealId: string;
  provenanceScore: number;
  status: string;
  imageUrl: string;
  issueDate?: string;
  clientName?: string;
  country?: string;
}

export type AdminViewMode = 'simple' | 'advanced';

export type SyncCategory = 'products' | 'seo' | 'config';

export interface GlobalSyncSession {
  id: string;
  timestamp: string;
  categories: SyncCategory[];
  targets: CountryCode[];
  snapshotBefore: any;
  actorName: string;
  status: string;
}

export interface WalletTransaction {
  id: string;
  type: 'Deposit' | 'Service Fee' | 'Acquisition' | 'Refund';
  amount: number;
  description: string;
  timestamp: string;
  status: 'Settled' | 'Pending';
}

/** 📊 BACKGROUND WORKER TYPES */

export type JobType = 
  | 'PAYMENT_VERIFY' 
  | 'INVENTORY_TTL' 
  | 'EVENT_RETRY' 
  | 'NOTIF_DISPATCH' 
  | 'METRICS_AGG' 
  | 'FX_SYNC'
  | 'CLEANUP';

export type JobStatus = 'pending' | 'running' | 'completed' | 'failed' | 'retrying';

export interface BackgroundJob {
  id: string;
  type: JobType;
  payload: any;
  status: JobStatus;
  retryCount: number;
  maxRetries: number;
  nextRunAt: string;
  country: string;
  error?: string;
  createdAt: string;
  updatedAt: string;
}

/** 📊 OBSERVABILITY TYPES */

export interface MaisonMetric {
  id: string;
  name: string;
  value: number;
  unit: string;
  timestamp: string;
  source: string;
  country: CountryCode | 'global';
  tags?: Record<string, string>;
}

export interface MaisonAlert {
  id: string;
  type: 'system' | 'payment' | 'inventory' | 'api' | 'ai';
  severity: 'low' | 'medium' | 'high' | 'critical';
  message: string;
  triggeredAt: string;
  status: 'active' | 'resolved' | 'acknowledged';
  country: CountryCode | 'global';
  metadata?: any;
}

export interface SystemHealthScore {
  overall: number;
  subsystems: {
    payments: number;
    api: number;
    inventory: number;
    ai: number;
  };
  lastUpdated: string;
}

export interface ProductExtended {
  collectorValue: string;
  marketRange: string;
  investmentInsight: string;
  scarcityTag: string;
  priceVisible: boolean;
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
  previewImage: string;
  brandId: string;
}

export interface Country {
  code: string;
  name: string;
  currency: string;
  symbol: string;
  locale: string;
  flag: string;
  office: {
    city: string;
    address: string;
    phone: string;
    email: string;
    mapUrl: string;
    image: string;
  }
}

export interface Department {
  id: string;
  name: string;
  description: string;
  imageUrl: string;
  categories: string[];
}

export interface MaisonStory {
  title: string;
  subtitle: string;
  history: { year: string; milestone: string; description: string }[];
  philosophy: string;
  craftsmanship: { title: string; description: string; imageUrl: string }[];
  sustainability: string;
  institutionalCharter: string;
  brandId: string;
}

export interface CustomerServiceInfo {
  shipping: string;
  returns: string;
  faqs: { question: string; answer: string }[];
}

export interface IndexingLog {
  id: string;
  timestamp: string;
  action: string;
  itemsAffected: number;
  duration: string;
  status: string;
}

export interface CMSSection {
  id: string;
  name: string;
  visible: boolean;
}

export interface Inventory {
  productId: string;
  variantId: string;
  country: CountryCode;
  totalStock: number;
  reservedStock: number;
  availableStock: number;
  updatedAt: string;
}

export interface InventoryLock {
  id: string;
  productId: string;
  variantId: string;
  userId: string;
  orderId?: string;
  status: 'LOCKED' | 'RELEASED' | 'EXPIRED' | 'CONFIRMED';
  quantity: number;
  expiresAt: string;
  createdAt: string;
}
