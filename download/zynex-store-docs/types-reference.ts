// Zynex Store - TypeScript Types

// ============================================
// User & Auth Types
// ============================================
export type UserRole = 'customer' | 'admin';

export interface User {
  id: string;
  email: string;
  name: string | null;
  phone: string | null;
  avatar: string | null;
  role: UserRole;
  isVerified: boolean;
  balance: number;
  currency: string;
  createdAt: string;
  updatedAt: string;
}

export interface AuthState {
  user: User | null;
  isAuthenticated: boolean;
  isLoading: boolean;
}

// ============================================
// Service & Category Types
// ============================================
export interface Category {
  id: string;
  name: string;
  nameEn: string;
  slug: string;
  description: string | null;
  icon: string | null;
  image: string | null;
  color: string | null;
  sortOrder: number;
  isActive: boolean;
  services?: Service[];
}

export interface Service {
  id: string;
  categoryId: string;
  category?: Category;
  name: string;
  nameEn: string;
  slug: string;
  description: string;
  features: string[] | string;
  price: number;
  priceYER: number | null;
  priceSAR: number | null;
  originalPrice: number | null;
  image: string | null;
  icon: string | null;
  badge: string | null;
  rating: number;
  reviewCount: number;
  salesCount: number;
  deliveryTime: string | null;
  isAvailable: boolean;
  isFeatured: boolean;
  sortOrder: number;
  faq: FAQItem[] | string | null;
  requirements: string[] | string | null;
}

export interface FAQItem {
  question: string;
  answer: string;
}

// ============================================
// Order Types
// ============================================
export type OrderStatus = 'pending' | 'processing' | 'completed' | 'failed' | 'refunded' | 'cancelled';
export type PaymentStatus = 'pending' | 'paid' | 'failed' | 'refunded';
export type PaymentMethod = 'jeib' | 'jawali' | 'floosk' | 'onecash' | 'mahfazati' | 'paypal' | 'stripe' | 'binance' | 'crypto';

export interface Order {
  id: string;
  orderNumber: string;
  userId: string;
  user?: User;
  status: OrderStatus;
  totalAmount: number;
  currency: string;
  paymentMethod: PaymentMethod | null;
  paymentStatus: PaymentStatus;
  paymentId: string | null;
  couponCode: string | null;
  discountAmount: number | null;
  notes: string | null;
  items: OrderItem[];
  transactions: Transaction[];
  createdAt: string;
  updatedAt: string;
}

export interface OrderItem {
  id: string;
  orderId: string;
  serviceId: string;
  service?: Service;
  quantity: number;
  unitPrice: number;
  totalPrice: number;
  details: string | null;
  status: OrderStatus;
}

// ============================================
// Transaction Types
// ============================================
export type TransactionType = 'deposit' | 'payment' | 'refund' | 'withdrawal';

export interface Transaction {
  id: string;
  userId: string;
  orderId: string | null;
  type: TransactionType;
  amount: number;
  currency: string;
  status: string;
  paymentMethod: string | null;
  paymentDetails: string | null;
  reference: string | null;
  createdAt: string;
}

// ============================================
// Review Types
// ============================================
export interface Review {
  id: string;
  serviceId: string;
  userId: string;
  rating: number;
  comment: string | null;
  isVerified: boolean;
  createdAt: string;
}

// ============================================
// Support Types
// ============================================
export type TicketStatus = 'open' | 'in_progress' | 'resolved' | 'closed';
export type TicketPriority = 'low' | 'medium' | 'high' | 'urgent';

export interface Ticket {
  id: string;
  userId: string;
  subject: string;
  description: string;
  status: TicketStatus;
  priority: TicketPriority;
  category: string | null;
  messages: TicketMessage[];
  createdAt: string;
  updatedAt: string;
}

export interface TicketMessage {
  id: string;
  ticketId: string;
  senderId: string;
  message: string;
  isAdmin: boolean;
  createdAt: string;
}

// ============================================
// Notification Types
// ============================================
export type NotificationType = 'order' | 'payment' | 'system' | 'promotion';

export interface Notification {
  id: string;
  userId: string;
  title: string;
  message: string;
  type: NotificationType;
  isRead: boolean;
  link: string | null;
  createdAt: string;
}

// ============================================
// Coupon Types
// ============================================
export interface Coupon {
  id: string;
  code: string;
  discountType: 'percentage' | 'fixed';
  discountValue: number;
  minOrderAmount: number | null;
  maxUses: number | null;
  usedCount: number;
  validFrom: string;
  validUntil: string;
  isActive: boolean;
}

// ============================================
// Wallet Types
// ============================================
export interface Wallet {
  id: string;
  userId: string;
  yemeniWallet: string | null;
  walletType: string | null;
  paypalEmail: string | null;
  stripeId: string | null;
  binanceId: string | null;
}

// ============================================
// Yemeni Payment Types
// ============================================
export interface YemeniPaymentMethod {
  id: string;
  name: string;
  nameEn: string;
  slug: PaymentMethod;
  icon: string;
  color: string;
  instructions: string;
}

// ============================================
// Stats Types
// ============================================
export interface SiteStats {
  totalOrders: number;
  totalUsers: number;
  totalRevenue: number;
  totalServices: number;
  completedOrders: number;
  pendingOrders: number;
}

// ============================================
// AI Suggestion Types
// ============================================
export interface AISuggestion {
  serviceId: string;
  reason: string;
  confidence: number;
}
