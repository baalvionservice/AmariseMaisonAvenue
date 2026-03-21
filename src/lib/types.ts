
// Existing types... (Keeping relevant parts for brevity)
export type CountryCode = 'us' | 'uk' | 'ae' | 'in' | 'sg';

export type PaymentGateway = 'STRIPE' | 'RAZORPAY' | 'PAYU' | 'BANK_TRANSFER';
export type PaymentStatus = 'PENDING' | 'SUCCESS' | 'FAILED' | 'REFUNDED' | 'DISPUTED';

export interface Payment {
  id: string;
  tenantId: string;
  subscriptionId: string;
  userId: string;
  amount: number;
  currency: string;
  gateway: PaymentGateway;
  gatewayPaymentId: string;
  status: PaymentStatus;
  idempotencyKey: string;
  createdAt: string;
  updatedAt: string;
}

export interface PaymentLog {
  id: string;
  paymentId: string;
  action: 'INIT' | 'WEBHOOK_RECEIVED' | 'SUCCESS' | 'FAILURE' | 'REFUND_INIT' | 'RECONCILED';
  rawPayload?: any;
  metadata: Record<string, any>;
  timestamp: string;
}

// ... rest of existing types
export type TransactionStatus = 'Pending' | 'Paid' | 'Processing' | 'Settled' | 'Closed';

export type FulfillmentStep = 'Registry Confirmed' | 'Atelier Preparation' | 'Heritage Audit' | 'Institutional Dispatch' | 'White-Glove Delivery';

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
  // Detail View Extensions
  fulfillmentSteps?: {
    step: FulfillmentStep;
    timestamp: string;
    completed: boolean;
  }[];
  artifactName?: string;
  artifactSku?: string;
  isProvenanceCertified?: boolean;
}

// Ensure all other existing types (Product, Collection, etc.) are preserved below
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
  walletHistory: any[];
  liveRequests: any[];
  certificates: any[];
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
}

export interface PrivateInquiry {
  id: string;
  productId?: string;
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
  timestamp: string;
  severity: 'low' | 'medium' | 'high';
  brandId?: string;
}

export interface QATestCase {
  id: string;
  name: string;
  module: string;
  status: string;
  logs: any[];
  country: string;
  brandId: string;
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
}

export interface MaisonCertificate {
  id: string;
  artifactName: string;
  productId: string;
  nfcSealId: string;
  provenanceScore: number;
  status: string;
  imageUrl: string;
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
