'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  LayoutDashboard,
  ShoppingBag,
  Wallet,
  TicketCheck,
  Bell,
  Settings,
  LogOut,
  ChevronLeft,
  Plus,
  Eye,
  Package,
  Clock,
  CheckCircle2,
  TrendingUp,
  DollarSign,
  Send,
  CreditCard,
  ArrowUpRight,
  ArrowDownRight,
  User,
  Lock,
  Globe,
  Search,
  Filter,
  MessageSquare,
  AlertCircle,
  RotateCcw,
} from 'lucide-react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Badge } from '@/components/ui/badge';
import { Separator } from '@/components/ui/separator';
import { ScrollArea } from '@/components/ui/scroll-area';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { useAuthStore, useNotificationStore } from '@/store';
import { ORDER_STATUS_LABELS, APP_NAME } from '@/lib/constants';
import { OrderTracking, type Order } from '@/components/dashboard/order-tracking';
import { toast } from 'sonner';

// ============================================
// Demo Data
// ============================================

const DEMO_ORDERS: Order[] = [
  {
    id: '1',
    orderNumber: 'ZNX-2025-001',
    date: '2025-01-20T10:30:00Z',
    service: 'ChatGPT Plus',
    amount: 24.99,
    status: 'completed',
    category: 'ai',
    quantity: 1,
  },
  {
    id: '2',
    orderNumber: 'ZNX-2025-002',
    date: '2025-01-22T14:15:00Z',
    service: 'نجوم تليجرام - 500 نجمة',
    amount: 4.99,
    status: 'processing',
    category: 'telegram',
    quantity: 1,
  },
  {
    id: '3',
    orderNumber: 'ZNX-2025-003',
    date: '2025-01-23T09:00:00Z',
    service: 'Netflix Premium',
    amount: 19.99,
    status: 'pending',
    category: 'entertainment',
    quantity: 1,
  },
  {
    id: '4',
    orderNumber: 'ZNX-2025-004',
    date: '2025-01-18T16:45:00Z',
    service: 'Spotify Premium',
    amount: 11.99,
    status: 'completed',
    category: 'apps',
    quantity: 1,
  },
  {
    id: '5',
    orderNumber: 'ZNX-2025-005',
    date: '2025-01-15T08:20:00Z',
    service: 'متابعين إنستغرام - 1000',
    amount: 7.99,
    status: 'failed',
    category: 'social',
    quantity: 1,
  },
  {
    id: '6',
    orderNumber: 'ZNX-2025-006',
    date: '2025-01-10T12:00:00Z',
    service: 'Claude Pro',
    amount: 24.99,
    status: 'refunded',
    category: 'ai',
    quantity: 1,
  },
];

const DEMO_TRANSACTIONS = [
  { id: '1', type: 'deposit' as const, amount: 100, description: 'إيداع عبر جيب', date: '2025-01-22T10:00:00Z', status: 'completed' },
  { id: '2', type: 'withdrawal' as const, amount: 24.99, description: 'طلب ChatGPT Plus - #ZNX-2025-001', date: '2025-01-20T10:30:00Z', status: 'completed' },
  { id: '3', type: 'deposit' as const, amount: 50, description: 'إيداع عبر جوالي', date: '2025-01-18T14:00:00Z', status: 'completed' },
  { id: '4', type: 'withdrawal' as const, amount: 11.99, description: 'طلب Spotify Premium - #ZNX-2025-004', date: '2025-01-18T16:45:00Z', status: 'completed' },
  { id: '5', type: 'deposit' as const, amount: 200, description: 'إيداع عبر OneCash', date: '2025-01-15T09:00:00Z', status: 'completed' },
  { id: '6', type: 'refund' as const, amount: 24.99, description: 'استرداد طلب Claude Pro - #ZNX-2025-006', date: '2025-01-10T12:00:00Z', status: 'completed' },
];

const DEMO_TICKETS = [
  { id: '1', subject: 'مشكلة في تسليم الطلب', status: 'open' as const, priority: 'high' as const, date: '2025-01-22T10:00:00Z', lastReply: '2025-01-22T11:30:00Z' },
  { id: '2', subject: 'استفسار عن طريقة الدفع', status: 'resolved' as const, priority: 'low' as const, date: '2025-01-18T14:00:00Z', lastReply: '2025-01-19T09:00:00Z' },
  { id: '3', subject: 'طلب استرداد مبلغ', status: 'in_progress' as const, priority: 'medium' as const, date: '2025-01-20T08:00:00Z', lastReply: '2025-01-21T10:00:00Z' },
];

// ============================================
// Sidebar Navigation Items
// ============================================

const SIDEBAR_ITEMS = [
  { id: 'overview', label: 'نظرة عامة', icon: LayoutDashboard },
  { id: 'orders', label: 'طلباتي', icon: ShoppingBag },
  { id: 'wallet', label: 'المحفظة', icon: Wallet },
  { id: 'tickets', label: 'التذاكر', icon: TicketCheck },
  { id: 'notifications', label: 'الإشعارات', icon: Bell },
  { id: 'settings', label: 'الإعدادات', icon: Settings },
];

// ============================================
// Helper Functions
// ============================================

function formatDate(dateString: string): string {
  return new Date(dateString).toLocaleDateString('ar-YE', {
    year: 'numeric',
    month: 'short',
    day: 'numeric',
  });
}

function formatDateTime(dateString: string): string {
  return new Date(dateString).toLocaleDateString('ar-YE', {
    year: 'numeric',
    month: 'short',
    day: 'numeric',
    hour: '2-digit',
    minute: '2-digit',
  });
}

// ============================================
// Main Component
// ============================================

export function UserDashboard() {
  const { user, isAuthenticated, logout } = useAuthStore();
  const { notifications, unreadCount, markAsRead, markAllAsRead } = useNotificationStore();
  const [activeTab, setActiveTab] = useState('overview');
  const [orderFilter, setOrderFilter] = useState('all');
  const [expandedOrder, setExpandedOrder] = useState<string | null>(null);
  const [depositAmount, setDepositAmount] = useState('');
  const [showDepositForm, setShowDepositForm] = useState(false);
  const [settingsName, setSettingsName] = useState(user?.name || '');
  const [settingsEmail, setSettingsEmail] = useState(user?.email || '');
  const [settingsPhone, setSettingsPhone] = useState('');
  const [currentPassword, setCurrentPassword] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [confirmNewPassword, setConfirmNewPassword] = useState('');

  // If not authenticated, show login prompt
  if (!isAuthenticated || !user) {
    return (
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="flex flex-col items-center justify-center min-h-[60vh] text-center px-4"
      >
        <div className="h-20 w-20 rounded-full gradient-primary flex items-center justify-center mb-6 shadow-lg shadow-zynex-purple/25">
          <User className="h-10 w-10 text-white" />
        </div>
        <h2 className="text-2xl font-bold mb-2">يرجى تسجيل الدخول</h2>
        <p className="text-muted-foreground mb-6 max-w-md">
          سجّل دخولك للوصول إلى لوحة التحكم وإدارة طلباتك ومحفظتك
        </p>
        <p className="text-sm text-muted-foreground">
          استخدم زر تسجيل الدخول في شريط التنقل أعلاه
        </p>
      </motion.div>
    );
  }

  const filteredOrders =
    orderFilter === 'all'
      ? DEMO_ORDERS
      : DEMO_ORDERS.filter((o) => o.status === orderFilter);

  const activeOrders = DEMO_ORDERS.filter(
    (o) => o.status === 'pending' || o.status === 'processing'
  ).length;
  const completedOrders = DEMO_ORDERS.filter((o) => o.status === 'completed').length;
  const totalSpent = DEMO_ORDERS.filter(
    (o) => o.status === 'completed'
  ).reduce((sum, o) => sum + o.amount, 0);

  return (
    <div className="min-h-screen">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-8">
        {/* Page Header */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-8"
        >
          <h1 className="text-2xl sm:text-3xl font-bold gradient-text">لوحة التحكم</h1>
          <p className="text-muted-foreground mt-1">
            مرحباً بك يا {user.name} في {APP_NAME}
          </p>
        </motion.div>

        {/* Dashboard Tabs */}
        <Tabs value={activeTab} onValueChange={setActiveTab} dir="rtl">
          {/* Mobile Navigation */}
          <div className="mb-6 overflow-x-auto">
            <TabsList className="w-full flex bg-muted/50 p-1 rounded-xl h-auto flex-wrap gap-1">
              {SIDEBAR_ITEMS.map((item) => {
                const Icon = item.icon;
                return (
                  <TabsTrigger
                    key={item.id}
                    value={item.id}
                    className="flex items-center gap-2 px-4 py-2.5 text-sm rounded-lg data-[state=active]:gradient-primary data-[state=active]:text-white"
                  >
                    <Icon className="h-4 w-4" />
                    <span className="hidden sm:inline">{item.label}</span>
                    {item.id === 'notifications' && unreadCount > 0 && (
                      <Badge className="h-5 min-w-[20px] rounded-full p-0 flex items-center justify-center text-[10px] gradient-primary border-0 text-white mr-1">
                        {unreadCount}
                      </Badge>
                    )}
                  </TabsTrigger>
                );
              })}
            </TabsList>
          </div>

          {/* ===================== OVERVIEW TAB ===================== */}
          <TabsContent value="overview">
            <div className="space-y-6">
              {/* Welcome Card */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
              >
                <Card className="bg-card/50 border-border/50 overflow-hidden">
                  <div className="absolute inset-0 gradient-primary opacity-5" />
                  <CardContent className="p-6 relative">
                    <div className="flex items-center gap-4 flex-wrap">
                      <div className="h-14 w-14 rounded-full gradient-primary flex items-center justify-center text-white text-xl font-bold shrink-0 shadow-lg shadow-zynex-purple/25">
                        {user.name?.charAt(0)?.toUpperCase() || 'U'}
                      </div>
                      <div>
                        <h2 className="text-xl font-bold">
                          مرحباً، {user.name}! 👋
                        </h2>
                        <p className="text-muted-foreground text-sm">
                          إليك ملخص حسابك اليوم
                        </p>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </motion.div>

              {/* Stats Grid */}
              <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
                {[
                  {
                    title: 'الطلبات النشطة',
                    value: activeOrders.toString(),
                    icon: Clock,
                    color: 'text-blue-500',
                    bgColor: 'bg-blue-500/10',
                  },
                  {
                    title: 'الطلبات المكتملة',
                    value: completedOrders.toString(),
                    icon: CheckCircle2,
                    color: 'text-green-500',
                    bgColor: 'bg-green-500/10',
                  },
                  {
                    title: 'رصيد المحفظة',
                    value: `$${user.balance.toFixed(2)}`,
                    icon: Wallet,
                    color: 'text-zynex-purple',
                    bgColor: 'bg-zynex-purple/10',
                  },
                  {
                    title: 'إجمالي الإنفاق',
                    value: `$${totalSpent.toFixed(2)}`,
                    icon: TrendingUp,
                    color: 'text-amber-500',
                    bgColor: 'bg-amber-500/10',
                  },
                ].map((stat, index) => {
                  const Icon = stat.icon;
                  return (
                    <motion.div
                      key={stat.title}
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: index * 0.1 }}
                    >
                      <Card className="bg-card/50 border-border/50 hover:border-border transition-colors">
                        <CardContent className="p-4">
                          <div className="flex items-center justify-between mb-3">
                            <div className={`h-10 w-10 rounded-lg ${stat.bgColor} flex items-center justify-center`}>
                              <Icon className={`h-5 w-5 ${stat.color}`} />
                            </div>
                          </div>
                          <p className="text-2xl font-bold">{stat.value}</p>
                          <p className="text-xs text-muted-foreground mt-1">{stat.title}</p>
                        </CardContent>
                      </Card>
                    </motion.div>
                  );
                })}
              </div>

              {/* Recent Orders */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.4 }}
              >
                <Card className="bg-card/50 border-border/50">
                  <CardHeader>
                    <div className="flex items-center justify-between">
                      <CardTitle className="text-base font-bold">آخر الطلبات</CardTitle>
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => setActiveTab('orders')}
                        className="text-zynex-purple hover:text-zynex-purple/80"
                      >
                        عرض الكل
                        <ChevronLeft className="h-4 w-4 mr-1" />
                      </Button>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <Table>
                      <TableHeader>
                        <TableRow>
                          <TableHead className="text-right">رقم الطلب</TableHead>
                          <TableHead className="text-right">الخدمة</TableHead>
                          <TableHead className="text-right">المبلغ</TableHead>
                          <TableHead className="text-right">الحالة</TableHead>
                          <TableHead className="text-right">التاريخ</TableHead>
                        </TableRow>
                      </TableHeader>
                      <TableBody>
                        {DEMO_ORDERS.slice(0, 5).map((order) => {
                          const statusInfo = ORDER_STATUS_LABELS[order.status];
                          return (
                            <TableRow key={order.id}>
                              <TableCell className="font-mono text-sm" dir="ltr">
                                #{order.orderNumber}
                              </TableCell>
                              <TableCell>{order.service}</TableCell>
                              <TableCell className="font-medium">${order.amount.toFixed(2)}</TableCell>
                              <TableCell>
                                <Badge variant="outline" className={`${statusInfo.color} text-xs`}>
                                  {statusInfo.label}
                                </Badge>
                              </TableCell>
                              <TableCell className="text-muted-foreground text-sm">
                                {formatDate(order.date)}
                              </TableCell>
                            </TableRow>
                          );
                        })}
                      </TableBody>
                    </Table>
                  </CardContent>
                </Card>
              </motion.div>
            </div>
          </TabsContent>

          {/* ===================== ORDERS TAB ===================== */}
          <TabsContent value="orders">
            <div className="space-y-6">
              {/* Filter Bar */}
              <div className="flex items-center justify-between flex-wrap gap-3">
                <h2 className="text-lg font-bold flex items-center gap-2">
                  <ShoppingBag className="h-5 w-5 text-zynex-purple" />
                  طلباتي
                </h2>
                <div className="flex items-center gap-2">
                  <Filter className="h-4 w-4 text-muted-foreground" />
                  <Select value={orderFilter} onValueChange={setOrderFilter}>
                    <SelectTrigger className="w-[160px] h-9">
                      <SelectValue placeholder="تصفية حسب" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="all">جميع الطلبات</SelectItem>
                      <SelectItem value="pending">قيد الانتظار</SelectItem>
                      <SelectItem value="processing">قيد التنفيذ</SelectItem>
                      <SelectItem value="completed">مكتمل</SelectItem>
                      <SelectItem value="failed">فشل</SelectItem>
                      <SelectItem value="refunded">مسترد</SelectItem>
                      <SelectItem value="cancelled">ملغي</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>

              {/* Orders List */}
              <div className="space-y-4">
                {filteredOrders.length === 0 ? (
                  <Card className="bg-card/50 border-border/50">
                    <CardContent className="py-12 text-center">
                      <Package className="h-12 w-12 text-muted-foreground mx-auto mb-3" />
                      <p className="text-muted-foreground">لا توجد طلبات بهذه الحالة</p>
                    </CardContent>
                  </Card>
                ) : (
                  filteredOrders.map((order, index) => {
                    const statusInfo = ORDER_STATUS_LABELS[order.status];
                    const isExpanded = expandedOrder === order.id;

                    return (
                      <motion.div
                        key={order.id}
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: index * 0.05 }}
                      >
                        <Card className="bg-card/50 border-border/50 overflow-hidden">
                          <CardContent className="p-4">
                            {/* Order Header */}
                            <button
                              onClick={() => setExpandedOrder(isExpanded ? null : order.id)}
                              className="w-full text-right"
                            >
                              <div className="flex items-center justify-between flex-wrap gap-3">
                                <div className="flex items-center gap-3">
                                  <div className="h-10 w-10 rounded-lg bg-zynex-purple/10 flex items-center justify-center shrink-0">
                                    <Package className="h-5 w-5 text-zynex-purple" />
                                  </div>
                                  <div>
                                    <p className="font-medium text-sm">{order.service}</p>
                                    <p className="text-xs text-muted-foreground font-mono" dir="ltr">
                                      #{order.orderNumber}
                                    </p>
                                  </div>
                                </div>
                                <div className="flex items-center gap-3">
                                  <span className="font-bold text-sm">${order.amount.toFixed(2)}</span>
                                  <Badge variant="outline" className={`${statusInfo.color} text-xs`}>
                                    {statusInfo.label}
                                  </Badge>
                                  <motion.div
                                    animate={{ rotate: isExpanded ? 90 : 0 }}
                                    transition={{ duration: 0.2 }}
                                  >
                                    <ChevronLeft className="h-4 w-4 text-muted-foreground" />
                                  </motion.div>
                                </div>
                              </div>
                            </button>

                            {/* Expanded Content */}
                            <AnimatePresence>
                              {isExpanded && (
                                <motion.div
                                  initial={{ height: 0, opacity: 0 }}
                                  animate={{ height: 'auto', opacity: 1 }}
                                  exit={{ height: 0, opacity: 0 }}
                                  transition={{ duration: 0.3 }}
                                  className="overflow-hidden"
                                >
                                  <Separator className="my-4" />
                                  <OrderTracking order={order} />
                                </motion.div>
                              )}
                            </AnimatePresence>
                          </CardContent>
                        </Card>
                      </motion.div>
                    );
                  })
                )}
              </div>
            </div>
          </TabsContent>

          {/* ===================== WALLET TAB ===================== */}
          <TabsContent value="wallet">
            <div className="space-y-6">
              {/* Balance Card */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
              >
                <Card className="bg-card/50 border-border/50 overflow-hidden">
                  <div className="absolute inset-0 gradient-primary opacity-5" />
                  <CardContent className="p-6 relative">
                    <div className="text-center">
                      <p className="text-muted-foreground text-sm mb-2">رصيد المحفظة</p>
                      <h2 className="text-4xl font-bold gradient-text mb-4">
                        ${user.balance.toFixed(2)}
                      </h2>
                      <Button
                        onClick={() => setShowDepositForm(!showDepositForm)}
                        className="gradient-primary text-white border-0 hover:opacity-90"
                      >
                        <Plus className="h-4 w-4 ml-2" />
                        إيداع رصيد
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              </motion.div>

              {/* Deposit Form */}
              <AnimatePresence>
                {showDepositForm && (
                  <motion.div
                    initial={{ opacity: 0, height: 0 }}
                    animate={{ opacity: 1, height: 'auto' }}
                    exit={{ opacity: 0, height: 0 }}
                  >
                    <Card className="bg-card/50 border-border/50">
                      <CardHeader>
                        <CardTitle className="text-base font-bold">إيداع رصيد جديد</CardTitle>
                        <CardDescription>اختر المبلغ وطريقة الدفع</CardDescription>
                      </CardHeader>
                      <CardContent className="space-y-4">
                        {/* Quick Amounts */}
                        <div className="flex flex-wrap gap-2">
                          {[10, 25, 50, 100, 200].map((amount) => (
                            <Button
                              key={amount}
                              variant="outline"
                              size="sm"
                              className="border-border/50 hover:bg-zynex-purple/10 hover:border-zynex-purple/50 hover:text-zynex-purple"
                              onClick={() => setDepositAmount(amount.toString())}
                            >
                              ${amount}
                            </Button>
                          ))}
                        </div>

                        <div className="space-y-2">
                          <Label htmlFor="deposit-amount">المبلغ (USD)</Label>
                          <Input
                            id="deposit-amount"
                            type="number"
                            placeholder="أدخل المبلغ"
                            value={depositAmount}
                            onChange={(e) => setDepositAmount(e.target.value)}
                            dir="ltr"
                          />
                        </div>

                        <div className="flex gap-2">
                          <Button
                            onClick={() => {
                              const amount = parseFloat(depositAmount);
                              if (amount > 0) {
                                toast.success('تم إرسال طلب الإيداع', {
                                  description: `سيتم إضافة $${amount.toFixed(2)} إلى محفظتك بعد تأكيد الدفع`,
                                });
                                setShowDepositForm(false);
                                setDepositAmount('');
                              } else {
                                toast.error('يرجى إدخال مبلغ صالح');
                              }
                            }}
                            className="gradient-primary text-white border-0 hover:opacity-90 flex-1"
                          >
                            <CreditCard className="h-4 w-4 ml-2" />
                            تأكيد الإيداع
                          </Button>
                          <Button
                            variant="outline"
                            onClick={() => {
                              setShowDepositForm(false);
                              setDepositAmount('');
                            }}
                          >
                            إلغاء
                          </Button>
                        </div>
                      </CardContent>
                    </Card>
                  </motion.div>
                )}
              </AnimatePresence>

              {/* Transaction History */}
              <Card className="bg-card/50 border-border/50">
                <CardHeader>
                  <CardTitle className="text-base font-bold">سجل المعاملات</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-3">
                    {DEMO_TRANSACTIONS.map((tx, index) => (
                      <motion.div
                        key={tx.id}
                        initial={{ opacity: 0, x: 20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: index * 0.05 }}
                        className="flex items-center justify-between p-3 rounded-xl bg-accent/30 hover:bg-accent/50 transition-colors"
                      >
                        <div className="flex items-center gap-3">
                          <div
                            className={`h-10 w-10 rounded-lg flex items-center justify-center ${
                              tx.type === 'deposit'
                                ? 'bg-green-500/10'
                                : tx.type === 'refund'
                                ? 'bg-purple-500/10'
                                : 'bg-red-500/10'
                            }`}
                          >
                            {tx.type === 'deposit' ? (
                              <ArrowDownRight className="h-5 w-5 text-green-500" />
                            ) : tx.type === 'refund' ? (
                              <RotateCcw className="h-5 w-5 text-purple-500" />
                            ) : (
                              <ArrowUpRight className="h-5 w-5 text-red-500" />
                            )}
                          </div>
                          <div>
                            <p className="text-sm font-medium">{tx.description}</p>
                            <p className="text-xs text-muted-foreground">{formatDate(tx.date)}</p>
                          </div>
                        </div>
                        <span
                          className={`font-bold text-sm ${
                            tx.type === 'deposit' || tx.type === 'refund'
                              ? 'text-green-500'
                              : 'text-red-500'
                          }`}
                        >
                          {tx.type === 'deposit' || tx.type === 'refund' ? '+' : '-'}$
                          {tx.amount.toFixed(2)}
                        </span>
                      </motion.div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          {/* ===================== TICKETS TAB ===================== */}
          <TabsContent value="tickets">
            <div className="space-y-6">
              <div className="flex items-center justify-between">
                <h2 className="text-lg font-bold flex items-center gap-2">
                  <TicketCheck className="h-5 w-5 text-zynex-purple" />
                  تذاكر الدعم
                </h2>
                <Button
                  onClick={() =>
                    toast.info('قريباً!', { description: 'سيكون إنشاء التذاكر متاحاً قريباً' })
                  }
                  className="gradient-primary text-white border-0 hover:opacity-90"
                >
                  <Plus className="h-4 w-4 ml-2" />
                  تذكرة جديدة
                </Button>
              </div>

              <div className="space-y-3">
                {DEMO_TICKETS.map((ticket, index) => (
                  <motion.div
                    key={ticket.id}
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: index * 0.1 }}
                  >
                    <Card className="bg-card/50 border-border/50 hover:border-border transition-colors cursor-pointer">
                      <CardContent className="p-4">
                        <div className="flex items-center justify-between flex-wrap gap-3">
                          <div className="flex items-center gap-3">
                            <div
                              className={`h-10 w-10 rounded-lg flex items-center justify-center ${
                                ticket.status === 'open'
                                  ? 'bg-red-500/10'
                                  : ticket.status === 'in_progress'
                                  ? 'bg-amber-500/10'
                                  : 'bg-green-500/10'
                              }`}
                            >
                              <MessageSquare
                                className={`h-5 w-5 ${
                                  ticket.status === 'open'
                                    ? 'text-red-500'
                                    : ticket.status === 'in_progress'
                                    ? 'text-amber-500'
                                    : 'text-green-500'
                                }`}
                              />
                            </div>
                            <div>
                              <p className="font-medium text-sm">{ticket.subject}</p>
                              <p className="text-xs text-muted-foreground">
                                آخر رد: {formatDateTime(ticket.lastReply)}
                              </p>
                            </div>
                          </div>
                          <div className="flex items-center gap-2">
                            <Badge
                              variant="outline"
                              className={`text-xs ${
                                ticket.priority === 'high'
                                  ? 'text-red-500 border-red-500/30'
                                  : ticket.priority === 'medium'
                                  ? 'text-amber-500 border-amber-500/30'
                                  : 'text-green-500 border-green-500/30'
                              }`}
                            >
                              {ticket.priority === 'high'
                                ? 'عالية'
                                : ticket.priority === 'medium'
                                ? 'متوسطة'
                                : 'منخفضة'}
                            </Badge>
                            <Badge
                              variant="outline"
                              className={`text-xs ${
                                ticket.status === 'open'
                                  ? 'text-red-500 border-red-500/30'
                                  : ticket.status === 'in_progress'
                                  ? 'text-amber-500 border-amber-500/30'
                                  : 'text-green-500 border-green-500/30'
                              }`}
                            >
                              {ticket.status === 'open'
                                ? 'مفتوحة'
                                : ticket.status === 'in_progress'
                                ? 'قيد المتابعة'
                                : 'تم الحل'}
                            </Badge>
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  </motion.div>
                ))}
              </div>
            </div>
          </TabsContent>

          {/* ===================== NOTIFICATIONS TAB ===================== */}
          <TabsContent value="notifications">
            <div className="space-y-6">
              <div className="flex items-center justify-between">
                <h2 className="text-lg font-bold flex items-center gap-2">
                  <Bell className="h-5 w-5 text-zynex-purple" />
                  الإشعارات
                </h2>
                {unreadCount > 0 && (
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => {
                      markAllAsRead();
                      toast.success('تم تعيين جميع الإشعارات كمقروءة');
                    }}
                    className="text-zynex-purple hover:text-zynex-purple/80"
                  >
                    تعيين الكل كمقروء
                  </Button>
                )}
              </div>

              <div className="space-y-3">
                {notifications.length === 0 ? (
                  <Card className="bg-card/50 border-border/50">
                    <CardContent className="py-12 text-center">
                      <Bell className="h-12 w-12 text-muted-foreground mx-auto mb-3" />
                      <p className="text-muted-foreground">لا توجد إشعارات</p>
                    </CardContent>
                  </Card>
                ) : (
                  notifications.map((notification, index) => (
                    <motion.div
                      key={notification.id}
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: index * 0.05 }}
                    >
                      <Card
                        className={`bg-card/50 border-border/50 cursor-pointer transition-all hover:border-border ${
                          !notification.isRead ? 'border-r-4 border-r-zynex-purple' : ''
                        }`}
                        onClick={() => markAsRead(notification.id)}
                      >
                        <CardContent className="p-4">
                          <div className="flex items-start gap-3">
                            <div
                              className={`h-9 w-9 rounded-lg flex items-center justify-center shrink-0 mt-0.5 ${
                                notification.type === 'system'
                                  ? 'bg-zynex-purple/10'
                                  : notification.type === 'order'
                                  ? 'bg-zynex-cyan/10'
                                  : 'bg-zynex-green/10'
                              }`}
                            >
                              {notification.type === 'system' ? (
                                <AlertCircle className="h-4 w-4 text-zynex-purple" />
                              ) : notification.type === 'order' ? (
                                <Package className="h-4 w-4 text-zynex-cyan" />
                              ) : (
                                <CheckCircle2 className="h-4 w-4 text-zynex-green" />
                              )}
                            </div>
                            <div className="flex-1 min-w-0">
                              <div className="flex items-center gap-2">
                                <p className={`text-sm ${!notification.isRead ? 'font-bold' : 'font-medium'}`}>
                                  {notification.title}
                                </p>
                                {!notification.isRead && (
                                  <div className="h-2 w-2 rounded-full bg-zynex-purple shrink-0" />
                                )}
                              </div>
                              <p className="text-xs text-muted-foreground mt-1">
                                {notification.message}
                              </p>
                              <p className="text-xs text-muted-foreground/60 mt-2">
                                {formatDateTime(notification.createdAt)}
                              </p>
                            </div>
                          </div>
                        </CardContent>
                      </Card>
                    </motion.div>
                  ))
                )}
              </div>
            </div>
          </TabsContent>

          {/* ===================== SETTINGS TAB ===================== */}
          <TabsContent value="settings">
            <div className="space-y-6">
              {/* Profile Settings */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
              >
                <Card className="bg-card/50 border-border/50">
                  <CardHeader>
                    <CardTitle className="text-base font-bold flex items-center gap-2">
                      <User className="h-5 w-5 text-zynex-purple" />
                      معلومات الحساب
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="flex items-center gap-4 mb-4">
                      <div className="h-16 w-16 rounded-full gradient-primary flex items-center justify-center text-white text-2xl font-bold shrink-0 shadow-lg shadow-zynex-purple/25">
                        {user.name?.charAt(0)?.toUpperCase() || 'U'}
                      </div>
                      <div>
                        <p className="font-bold">{user.name}</p>
                        <p className="text-sm text-muted-foreground">{user.email}</p>
                      </div>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      <div className="space-y-2">
                        <Label htmlFor="settings-name">الاسم الكامل</Label>
                        <Input
                          id="settings-name"
                          value={settingsName}
                          onChange={(e) => setSettingsName(e.target.value)}
                        />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="settings-email">البريد الإلكتروني</Label>
                        <Input
                          id="settings-email"
                          type="email"
                          value={settingsEmail}
                          onChange={(e) => setSettingsEmail(e.target.value)}
                          dir="ltr"
                        />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="settings-phone">رقم الهاتف</Label>
                        <Input
                          id="settings-phone"
                          type="tel"
                          placeholder="+967 7XX XXX XXX"
                          value={settingsPhone}
                          onChange={(e) => setSettingsPhone(e.target.value)}
                          dir="ltr"
                        />
                      </div>
                    </div>

                    <Button
                      onClick={() =>
                        toast.success('تم تحديث المعلومات بنجاح', {
                          description: 'تم حفظ تغييراتك',
                        })
                      }
                      className="gradient-primary text-white border-0 hover:opacity-90"
                    >
                      حفظ التغييرات
                    </Button>
                  </CardContent>
                </Card>
              </motion.div>

              {/* Change Password */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.1 }}
              >
                <Card className="bg-card/50 border-border/50">
                  <CardHeader>
                    <CardTitle className="text-base font-bold flex items-center gap-2">
                      <Lock className="h-5 w-5 text-zynex-cyan" />
                      تغيير كلمة المرور
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="space-y-2">
                      <Label htmlFor="current-password">كلمة المرور الحالية</Label>
                      <Input
                        id="current-password"
                        type="password"
                        placeholder="••••••••"
                        value={currentPassword}
                        onChange={(e) => setCurrentPassword(e.target.value)}
                        dir="ltr"
                      />
                    </div>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      <div className="space-y-2">
                        <Label htmlFor="new-password">كلمة المرور الجديدة</Label>
                        <Input
                          id="new-password"
                          type="password"
                          placeholder="••••••••"
                          value={newPassword}
                          onChange={(e) => setNewPassword(e.target.value)}
                          dir="ltr"
                        />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="confirm-new-password">تأكيد كلمة المرور</Label>
                        <Input
                          id="confirm-new-password"
                          type="password"
                          placeholder="••••••••"
                          value={confirmNewPassword}
                          onChange={(e) => setConfirmNewPassword(e.target.value)}
                          dir="ltr"
                        />
                      </div>
                    </div>

                    <Button
                      onClick={() => {
                        if (!currentPassword || !newPassword || !confirmNewPassword) {
                          toast.error('يرجى ملء جميع الحقول');
                          return;
                        }
                        if (newPassword !== confirmNewPassword) {
                          toast.error('كلمتا المرور غير متطابقتين');
                          return;
                        }
                        if (newPassword.length < 6) {
                          toast.error('كلمة المرور يجب أن تكون 6 أحرف على الأقل');
                          return;
                        }
                        toast.success('تم تغيير كلمة المرور بنجاح');
                        setCurrentPassword('');
                        setNewPassword('');
                        setConfirmNewPassword('');
                      }}
                      variant="outline"
                      className="border-zynex-cyan/50 text-zynex-cyan hover:bg-zynex-cyan/10"
                    >
                      <Lock className="h-4 w-4 ml-2" />
                      تغيير كلمة المرور
                    </Button>
                  </CardContent>
                </Card>
              </motion.div>

              {/* Language Preference */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2 }}
              >
                <Card className="bg-card/50 border-border/50">
                  <CardHeader>
                    <CardTitle className="text-base font-bold flex items-center gap-2">
                      <Globe className="h-5 w-5 text-zynex-green" />
                      اللغة والمنطقة
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="space-y-2">
                      <Label>اللغة المفضلة</Label>
                      <Select defaultValue="ar">
                        <SelectTrigger className="w-full sm:w-[240px]">
                          <SelectValue />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="ar">العربية</SelectItem>
                          <SelectItem value="en">English</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>

                    <div className="space-y-2">
                      <Label>العملة</Label>
                      <Select defaultValue="usd">
                        <SelectTrigger className="w-full sm:w-[240px]">
                          <SelectValue />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="usd">الدولار الأمريكي (USD)</SelectItem>
                          <SelectItem value="yer">الريال اليمني (YER)</SelectItem>
                          <SelectItem value="sar">الريال السعودي (SAR)</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                  </CardContent>
                </Card>
              </motion.div>

              {/* Logout */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.3 }}
              >
                <Card className="bg-card/50 border-border/50 border-red-500/20">
                  <CardContent className="p-6">
                    <div className="flex items-center justify-between flex-wrap gap-4">
                      <div>
                        <h3 className="font-bold text-red-500">تسجيل الخروج</h3>
                        <p className="text-sm text-muted-foreground">
                          تسجيل الخروج من حسابك
                        </p>
                      </div>
                      <Button
                        variant="outline"
                        className="border-red-500/30 text-red-500 hover:bg-red-500/10 hover:text-red-500"
                        onClick={() => {
                          logout();
                          toast.success('تم تسجيل الخروج بنجاح');
                        }}
                      >
                        <LogOut className="h-4 w-4 ml-2" />
                        تسجيل الخروج
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              </motion.div>
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
}
