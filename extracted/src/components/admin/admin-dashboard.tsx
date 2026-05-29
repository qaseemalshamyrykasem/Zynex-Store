'use client';

import { useState, useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  LayoutDashboard,
  ShoppingCart,
  Layers,
  Users,
  CreditCard,
  Tag,
  BarChart3,
  Settings,
  LogOut,
  DollarSign,
  TrendingUp,
  UserPlus,
  Activity,
  Eye,
  RefreshCcw,
  RotateCcw,
  Plus,
  Edit3,
  Trash2,
  Grid3X3,
  List,
  Search,
  CheckCircle2,
  Mail,
  Shield,
  Wallet,
  Bell,
  Globe,
  Save,
  Zap,
  Star,
  Package,
  ArrowUpRight,
  ArrowDownRight,
  Menu,
  X,
  Copy,
  Smartphone,
  Banknote,
} from 'lucide-react';
import {
  LineChart,
  Line,
  BarChart,
  Bar,
  PieChart,
  Pie,
  Cell,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip as RechartsTooltip,
  ResponsiveContainer,
  Legend,
} from 'recharts';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Switch } from '@/components/ui/switch';

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
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog';
import { Separator } from '@/components/ui/separator';
import { ORDER_STATUS_LABELS } from '@/lib/constants';

// ============================================
// Demo Data
// ============================================

const revenueChartData = [
  { day: 'السبت', revenue: 4200, orders: 28 },
  { day: 'الأحد', revenue: 5800, orders: 35 },
  { day: 'الاثنين', revenue: 3900, orders: 22 },
  { day: 'الثلاثاء', revenue: 7100, orders: 41 },
  { day: 'الأربعاء', revenue: 6500, orders: 38 },
  { day: 'الخميس', revenue: 8200, orders: 47 },
  { day: 'الجمعة', revenue: 9550, orders: 52 },
];

const categoryChartData = [
  { name: 'تطبيقات', value: 35, fill: '#7C3AED' },
  { name: 'ذكاء اصطناعي', value: 28, fill: '#06B6D4' },
  { name: 'ترفيه', value: 15, fill: '#F59E0B' },
  { name: 'توثيق', value: 12, fill: '#10B981' },
  { name: 'تليجرام', value: 7, fill: '#3B82F6' },
  { name: 'سوشيال', value: 3, fill: '#EC4899' },
];

const paymentDistribution = [
  { name: 'جيب', value: 35, fill: '#10B981' },
  { name: 'جوالي', value: 25, fill: '#3B82F6' },
  { name: 'فلوسك', value: 15, fill: '#F59E0B' },
  { name: 'OneCash', value: 10, fill: '#7C3AED' },
  { name: 'PayPal', value: 8, fill: '#003087' },
  { name: 'Binance', value: 7, fill: '#F0B90B' },
];

const monthlyRevenue = [
  { month: 'يناير', revenue: 28500 },
  { month: 'فبراير', revenue: 32100 },
  { month: 'مارس', revenue: 35800 },
  { month: 'أبريل', revenue: 31200 },
  { month: 'مايو', revenue: 40500 },
  { month: 'يونيو', revenue: 45250 },
];

interface DemoOrder {
  id: string;
  orderNumber: string;
  customer: string;
  service: string;
  amount: number;
  status: 'pending' | 'processing' | 'completed' | 'failed' | 'refunded' | 'cancelled';
  date: string;
  paymentMethod: string;
}

const demoOrders: DemoOrder[] = [
  { id: '1', orderNumber: 'ORD-2024-001', customer: 'أحمد محمد', service: 'ChatGPT Plus', amount: 24.99, status: 'completed', date: '2024-06-15', paymentMethod: 'جيب' },
  { id: '2', orderNumber: 'ORD-2024-002', customer: 'سارة العلي', service: 'Netflix Premium', amount: 19.99, status: 'processing', date: '2024-06-15', paymentMethod: 'PayPal' },
  { id: '3', orderNumber: 'ORD-2024-003', customer: 'خالد الحربي', service: 'توثيق تليجرام', amount: 149.99, status: 'pending', date: '2024-06-14', paymentMethod: 'جوالي' },
  { id: '4', orderNumber: 'ORD-2024-004', customer: 'مريم أحمد', service: 'Spotify Premium', amount: 11.99, status: 'completed', date: '2024-06-14', paymentMethod: 'فلوسك' },
  { id: '5', orderNumber: 'ORD-2024-005', customer: 'يوسف السقاف', service: 'نجوم تليجرام', amount: 4.99, status: 'failed', date: '2024-06-13', paymentMethod: 'OneCash' },
  { id: '6', orderNumber: 'ORD-2024-006', customer: 'نورة الشمري', service: 'Claude Pro', amount: 24.99, status: 'completed', date: '2024-06-13', paymentMethod: 'Binance Pay' },
  { id: '7', orderNumber: 'ORD-2024-007', customer: 'عبدالله الحداد', service: 'بطاقة بلايستيشن', amount: 14.99, status: 'refunded', date: '2024-06-12', paymentMethod: 'جيب' },
  { id: '8', orderNumber: 'ORD-2024-008', customer: 'فاطمة الزهراء', service: 'متابعين إنستغرام', amount: 7.99, status: 'processing', date: '2024-06-12', paymentMethod: 'محفظتي' },
  { id: '9', orderNumber: 'ORD-2024-009', customer: 'محمد العلوي', service: 'ChatGPT Plus', amount: 24.99, status: 'cancelled', date: '2024-06-11', paymentMethod: 'PayPal' },
  { id: '10', orderNumber: 'ORD-2024-010', customer: 'ريم السالم', service: 'Netflix Premium', amount: 19.99, status: 'completed', date: '2024-06-11', paymentMethod: 'جوالي' },
];

interface DemoService {
  id: string;
  name: string;
  category: string;
  price: number;
  salesCount: number;
  rating: number;
  isAvailable: boolean;
  badge: string | null;
}

const demoServices: DemoService[] = [
  { id: '1', name: 'ChatGPT Plus', category: 'ذكاء اصطناعي', price: 24.99, salesCount: 1250, rating: 4.9, isAvailable: true, badge: 'popular' },
  { id: '2', name: 'نجوم تليجرام', category: 'تليجرام', price: 4.99, salesCount: 3400, rating: 4.8, isAvailable: true, badge: 'bestseller' },
  { id: '3', name: 'Netflix Premium', category: 'تطبيقات', price: 19.99, salesCount: 890, rating: 4.7, isAvailable: true, badge: 'popular' },
  { id: '4', name: 'توثيق تليجرام', category: 'توثيق', price: 149.99, salesCount: 234, rating: 4.6, isAvailable: true, badge: 'premium' },
  { id: '5', name: 'Spotify Premium', category: 'تطبيقات', price: 11.99, salesCount: 2100, rating: 4.8, isAvailable: true, badge: 'new' },
  { id: '6', name: 'متابعين إنستغرام', category: 'سوشيال', price: 7.99, salesCount: 1560, rating: 4.5, isAvailable: false, badge: null },
  { id: '7', name: 'Claude Pro', category: 'ذكاء اصطناعي', price: 24.99, salesCount: 670, rating: 4.9, isAvailable: true, badge: 'new' },
  { id: '8', name: 'بطاقة بلايستيشن', category: 'ترفيه', price: 14.99, salesCount: 980, rating: 4.7, isAvailable: true, badge: null },
];

interface DemoUser {
  id: string;
  name: string;
  email: string;
  role: 'customer' | 'admin';
  balance: number;
  orders: number;
  joinDate: string;
  isActive: boolean;
}

const demoUsers: DemoUser[] = [
  { id: '1', name: 'أحمد محمد', email: 'ahmed@email.com', role: 'customer', balance: 125.50, orders: 15, joinDate: '2024-01-10', isActive: true },
  { id: '2', name: 'سارة العلي', email: 'sara@email.com', role: 'customer', balance: 89.99, orders: 8, joinDate: '2024-02-15', isActive: true },
  { id: '3', name: 'خالد الحربي', email: 'khaled@email.com', role: 'customer', balance: 250.00, orders: 23, joinDate: '2024-01-22', isActive: true },
  { id: '4', name: 'مريم أحمد', email: 'maryam@email.com', role: 'admin', balance: 0, orders: 0, joinDate: '2023-12-01', isActive: true },
  { id: '5', name: 'يوسف السقاف', email: 'yousef@email.com', role: 'customer', balance: 45.75, orders: 5, joinDate: '2024-03-05', isActive: false },
  { id: '6', name: 'نورة الشمري', email: 'noura@email.com', role: 'customer', balance: 175.00, orders: 12, joinDate: '2024-02-28', isActive: true },
  { id: '7', name: 'عبدالله الحداد', email: 'abdullah@email.com', role: 'customer', balance: 30.00, orders: 3, joinDate: '2024-04-12', isActive: true },
  { id: '8', name: 'فاطمة الزهراء', email: 'fatima@email.com', role: 'admin', balance: 0, orders: 0, joinDate: '2023-11-15', isActive: true },
];

interface DemoTransaction {
  id: string;
  user: string;
  type: 'deposit' | 'payment' | 'refund' | 'withdrawal';
  amount: number;
  method: string;
  status: 'pending' | 'paid' | 'failed' | 'refunded';
  date: string;
  reference: string;
}

const demoTransactions: DemoTransaction[] = [
  { id: '1', user: 'أحمد محمد', type: 'payment', amount: 24.99, method: 'جيب', status: 'paid', date: '2024-06-15', reference: 'TXN-001' },
  { id: '2', user: 'سارة العلي', type: 'payment', amount: 19.99, method: 'PayPal', status: 'paid', date: '2024-06-15', reference: 'TXN-002' },
  { id: '3', user: 'خالد الحربي', type: 'deposit', amount: 150.00, method: 'جوالي', status: 'paid', date: '2024-06-14', reference: 'TXN-003' },
  { id: '4', user: 'عبدالله الحداد', type: 'refund', amount: 14.99, method: 'جيب', status: 'refunded', date: '2024-06-12', reference: 'TXN-004' },
  { id: '5', user: 'نورة الشمري', type: 'payment', amount: 24.99, method: 'Binance Pay', status: 'paid', date: '2024-06-13', reference: 'TXN-005' },
  { id: '6', user: 'يوسف السقاف', type: 'payment', amount: 4.99, method: 'OneCash', status: 'failed', date: '2024-06-13', reference: 'TXN-006' },
  { id: '7', user: 'محمد العلوي', type: 'withdrawal', amount: 50.00, method: 'جيب', status: 'pending', date: '2024-06-11', reference: 'TXN-007' },
  { id: '8', user: 'ريم السالم', type: 'payment', amount: 19.99, method: 'جوالي', status: 'paid', date: '2024-06-11', reference: 'TXN-008' },
];

interface DemoCoupon {
  id: string;
  code: string;
  discountType: 'percentage' | 'fixed';
  discountValue: number;
  minOrder: number | null;
  maxUses: number | null;
  usedCount: number;
  validFrom: string;
  validUntil: string;
  isActive: boolean;
}

const demoCoupons: DemoCoupon[] = [
  { id: '1', code: 'ZYNEX10', discountType: 'percentage', discountValue: 10, minOrder: 10, maxUses: 100, usedCount: 45, validFrom: '2024-01-01', validUntil: '2024-12-31', isActive: true },
  { id: '2', code: 'WELCOME5', discountType: 'fixed', discountValue: 5, minOrder: null, maxUses: 200, usedCount: 89, validFrom: '2024-01-01', validUntil: '2024-06-30', isActive: true },
  { id: '3', code: 'VIP20', discountType: 'percentage', discountValue: 20, minOrder: 50, maxUses: 50, usedCount: 12, validFrom: '2024-03-01', validUntil: '2024-09-30', isActive: true },
  { id: '4', code: 'SUMMER15', discountType: 'percentage', discountValue: 15, minOrder: 20, maxUses: 150, usedCount: 150, validFrom: '2024-06-01', validUntil: '2024-08-31', isActive: false },
  { id: '5', code: 'NEWUSER', discountType: 'fixed', discountValue: 3, minOrder: null, maxUses: 500, usedCount: 234, validFrom: '2024-01-01', validUntil: '2024-12-31', isActive: true },
];

// ============================================
// Helper Components
// ============================================

function StatusBadge({ status }: { status: string }) {
  const statusInfo = ORDER_STATUS_LABELS[status];
  if (!statusInfo) return <Badge variant="outline">{status}</Badge>;

  const colorMap: Record<string, string> = {
    'text-yellow-500': 'bg-yellow-500/20 text-yellow-400 border-yellow-500/30',
    'text-blue-500': 'bg-blue-500/20 text-blue-400 border-blue-500/30',
    'text-green-500': 'bg-green-500/20 text-green-400 border-green-500/30',
    'text-red-500': 'bg-red-500/20 text-red-400 border-red-500/30',
    'text-purple-500': 'bg-purple-500/20 text-purple-400 border-purple-500/30',
    'text-gray-500': 'bg-gray-500/20 text-gray-400 border-gray-500/30',
  };

  return (
    <Badge variant="outline" className={colorMap[statusInfo.color] || ''}>
      {statusInfo.label}
    </Badge>
  );
}

function PaymentStatusBadge({ status }: { status: string }) {
  const map: Record<string, { label: string; className: string }> = {
    paid: { label: 'مدفوع', className: 'bg-green-500/20 text-green-400 border-green-500/30' },
    pending: { label: 'قيد الانتظار', className: 'bg-yellow-500/20 text-yellow-400 border-yellow-500/30' },
    failed: { label: 'فشل', className: 'bg-red-500/20 text-red-400 border-red-500/30' },
    refunded: { label: 'مسترد', className: 'bg-purple-500/20 text-purple-400 border-purple-500/30' },
  };
  const info = map[status] || { label: status, className: '' };
  return <Badge variant="outline" className={info.className}>{info.label}</Badge>;
}

function TransactionTypeBadge({ type }: { type: string }) {
  const map: Record<string, { label: string; className: string }> = {
    deposit: { label: 'إيداع', className: 'bg-green-500/20 text-green-400 border-green-500/30' },
    payment: { label: 'دفع', className: 'bg-blue-500/20 text-blue-400 border-blue-500/30' },
    refund: { label: 'استرداد', className: 'bg-purple-500/20 text-purple-400 border-purple-500/30' },
    withdrawal: { label: 'سحب', className: 'bg-amber-500/20 text-amber-400 border-amber-500/30' },
  };
  const info = map[type] || { label: type, className: '' };
  return <Badge variant="outline" className={info.className}>{info.label}</Badge>;
}

function StatCard({
  title,
  value,
  icon: Icon,
  change,
  changeType,
  color,
}: {
  title: string;
  value: string;
  icon: React.ElementType;
  change: string;
  changeType: 'up' | 'down';
  color: string;
}) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
    >
      <Card className="bg-card/50 border-border/50 hover:border-border transition-colors">
        <CardContent className="p-6">
          <div className="flex items-center justify-between">
            <div className="space-y-2">
              <p className="text-sm text-muted-foreground">{title}</p>
              <p className="text-2xl font-bold">{value}</p>
              <div className="flex items-center gap-1 text-xs">
                {changeType === 'up' ? (
                  <ArrowUpRight className="size-3 text-green-500" />
                ) : (
                  <ArrowDownRight className="size-3 text-red-500" />
                )}
                <span className={changeType === 'up' ? 'text-green-500' : 'text-red-500'}>
                  {change}
                </span>
                <span className="text-muted-foreground">من الأسبوع الماضي</span>
              </div>
            </div>
            <div
              className="size-12 rounded-xl flex items-center justify-center"
              style={{ backgroundColor: `${color}20` }}
            >
              <Icon className="size-6" style={{ color }} />
            </div>
          </div>
        </CardContent>
      </Card>
    </motion.div>
  );
}

// ============================================
// Section Components
// ============================================

function OverviewSection() {
  const topServices = useMemo(() => [
    { name: 'نجوم تليجرام', sales: 3400, revenue: 16966 },
    { name: 'Spotify Premium', sales: 2100, revenue: 25179 },
    { name: 'متابعين إنستغرام', sales: 1560, revenue: 12464 },
    { name: 'ChatGPT Plus', sales: 1250, revenue: 31238 },
    { name: 'بطاقة بلايستيشن', sales: 980, revenue: 14690 },
  ], []);

  return (
    <div className="space-y-6">
      {/* Stat Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <StatCard
          title="إجمالي الإيرادات"
          value="$45,250"
          icon={DollarSign}
          change="+12.5%"
          changeType="up"
          color="#7C3AED"
        />
        <StatCard
          title="الطلبات اليوم"
          value="47"
          icon={ShoppingCart}
          change="+8.2%"
          changeType="up"
          color="#06B6D4"
        />
        <StatCard
          title="المستخدمين الجدد"
          value="12"
          icon={UserPlus}
          change="+3.1%"
          changeType="up"
          color="#10B981"
        />
        <StatCard
          title="الطلبات النشطة"
          value="23"
          icon={Activity}
          change="-2.4%"
          changeType="down"
          color="#F59E0B"
        />
      </div>

      {/* Charts Row */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
        {/* Revenue Chart */}
        <Card className="bg-card/50 border-border/50">
          <CardHeader>
            <CardTitle className="text-base">الإيرادات - آخر 7 أيام</CardTitle>
            <CardDescription>إجمالي الإيرادات اليومية</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="h-[280px]">
              <ResponsiveContainer width="100%" height="100%">
                <LineChart data={revenueChartData}>
                  <CartesianGrid strokeDasharray="3 3" stroke="#ffffff10" />
                  <XAxis dataKey="day" stroke="#888" fontSize={12} tickLine={false} />
                  <YAxis stroke="#888" fontSize={12} tickLine={false} />
                  <RechartsTooltip
                    contentStyle={{
                      backgroundColor: '#1a1a2e',
                      border: '1px solid #7C3AED30',
                      borderRadius: '8px',
                      direction: 'rtl',
                    }}
                  />
                  <Line
                    type="monotone"
                    dataKey="revenue"
                    stroke="#7C3AED"
                    strokeWidth={2}
                    dot={{ fill: '#7C3AED', r: 4 }}
                    activeDot={{ r: 6, fill: '#7C3AED' }}
                    name="الإيرادات ($)"
                  />
                </LineChart>
              </ResponsiveContainer>
            </div>
          </CardContent>
        </Card>

        {/* Orders by Category Chart */}
        <Card className="bg-card/50 border-border/50">
          <CardHeader>
            <CardTitle className="text-base">الطلبات حسب القسم</CardTitle>
            <CardDescription>توزيع الطلبات على الأقسام</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="h-[280px]">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={categoryChartData} layout="vertical">
                  <CartesianGrid strokeDasharray="3 3" stroke="#ffffff10" />
                  <XAxis type="number" stroke="#888" fontSize={12} tickLine={false} />
                  <YAxis dataKey="name" type="category" stroke="#888" fontSize={12} tickLine={false} width={80} />
                  <RechartsTooltip
                    contentStyle={{
                      backgroundColor: '#1a1a2e',
                      border: '1px solid #06B6D430',
                      borderRadius: '8px',
                    }}
                  />
                  <Bar dataKey="value" radius={[0, 6, 6, 0]} name="نسبة %" />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Recent Orders + Top Services */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
        {/* Recent Orders */}
        <Card className="lg:col-span-2 bg-card/50 border-border/50">
          <CardHeader>
            <CardTitle className="text-base">أحدث الطلبات</CardTitle>
          </CardHeader>
          <CardContent>
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead className="text-right">رقم الطلب</TableHead>
                  <TableHead className="text-right">العميل</TableHead>
                  <TableHead className="text-right">الخدمة</TableHead>
                  <TableHead className="text-right">المبلغ</TableHead>
                  <TableHead className="text-right">الحالة</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {demoOrders.slice(0, 5).map((order) => (
                  <TableRow key={order.id}>
                    <TableCell className="font-mono text-xs">{order.orderNumber}</TableCell>
                    <TableCell>{order.customer}</TableCell>
                    <TableCell>{order.service}</TableCell>
                    <TableCell>${order.amount.toFixed(2)}</TableCell>
                    <TableCell><StatusBadge status={order.status} /></TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </CardContent>
        </Card>

        {/* Top Services */}
        <Card className="bg-card/50 border-border/50">
          <CardHeader>
            <CardTitle className="text-base">أفضل الخدمات</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            {topServices.map((service, i) => (
              <div key={service.name} className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className="size-8 rounded-lg flex items-center justify-center text-sm font-bold" style={{ backgroundColor: `${i === 0 ? '#7C3AED' : i === 1 ? '#06B6D4' : i === 2 ? '#10B981' : '#F59E0B'}20` }}>
                    <span style={{ color: i === 0 ? '#7C3AED' : i === 1 ? '#06B6D4' : i === 2 ? '#10B981' : '#F59E0B' }}>{i + 1}</span>
                  </div>
                  <div>
                    <p className="text-sm font-medium">{service.name}</p>
                    <p className="text-xs text-muted-foreground">{service.sales} مبيعة</p>
                  </div>
                </div>
                <p className="text-sm font-semibold">${service.revenue.toLocaleString()}</p>
              </div>
            ))}
          </CardContent>
        </Card>
      </div>
    </div>
  );
}

function OrdersSection() {
  const [statusFilter, setStatusFilter] = useState('all');
  const [searchQuery, setSearchQuery] = useState('');

  const filteredOrders = useMemo(() => {
    return demoOrders.filter((order) => {
      const matchesStatus = statusFilter === 'all' || order.status === statusFilter;
      const matchesSearch =
        searchQuery === '' ||
        order.customer.includes(searchQuery) ||
        order.orderNumber.toLowerCase().includes(searchQuery.toLowerCase()) ||
        order.service.includes(searchQuery);
      return matchesStatus && matchesSearch;
    });
  }, [statusFilter, searchQuery]);

  return (
    <div className="space-y-4">
      {/* Filters */}
      <Card className="bg-card/50 border-border/50">
        <CardContent className="p-4">
          <div className="flex flex-col sm:flex-row gap-3 items-start sm:items-center">
            <div className="relative flex-1 w-full sm:w-auto">
              <Search className="absolute right-3 top-1/2 -translate-y-1/2 size-4 text-muted-foreground" />
              <Input
                placeholder="بحث بالاسم أو رقم الطلب..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pr-9"
              />
            </div>
            <Select value={statusFilter} onValueChange={setStatusFilter}>
              <SelectTrigger className="w-full sm:w-[180px]">
                <SelectValue placeholder="جميع الحالات" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">جميع الحالات</SelectItem>
                <SelectItem value="pending">قيد الانتظار</SelectItem>
                <SelectItem value="processing">قيد التنفيذ</SelectItem>
                <SelectItem value="completed">مكتمل</SelectItem>
                <SelectItem value="failed">فشل</SelectItem>
                <SelectItem value="refunded">مسترد</SelectItem>
                <SelectItem value="cancelled">ملغي</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </CardContent>
      </Card>

      {/* Orders Table */}
      <Card className="bg-card/50 border-border/50">
        <CardContent className="p-0">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead className="text-right">رقم الطلب</TableHead>
                <TableHead className="text-right">العميل</TableHead>
                <TableHead className="text-right">الخدمة</TableHead>
                <TableHead className="text-right">المبلغ</TableHead>
                <TableHead className="text-right">الحالة</TableHead>
                <TableHead className="text-right">التاريخ</TableHead>
                <TableHead className="text-right">إجراءات</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredOrders.map((order) => (
                <TableRow key={order.id}>
                  <TableCell className="font-mono text-xs">{order.orderNumber}</TableCell>
                  <TableCell>{order.customer}</TableCell>
                  <TableCell>{order.service}</TableCell>
                  <TableCell>${order.amount.toFixed(2)}</TableCell>
                  <TableCell><StatusBadge status={order.status} /></TableCell>
                  <TableCell className="text-muted-foreground text-xs">{order.date}</TableCell>
                  <TableCell>
                    <div className="flex items-center gap-1">
                      <Button variant="ghost" size="icon" className="size-7" title="عرض">
                        <Eye className="size-3.5" />
                      </Button>
                      <Button variant="ghost" size="icon" className="size-7" title="تحديث الحالة">
                        <RefreshCcw className="size-3.5" />
                      </Button>
                      <Button variant="ghost" size="icon" className="size-7 text-red-400" title="استرداد">
                        <RotateCcw className="size-3.5" />
                      </Button>
                    </div>
                  </TableCell>
                </TableRow>
              ))}
              {filteredOrders.length === 0 && (
                <TableRow>
                  <TableCell colSpan={7} className="text-center py-8 text-muted-foreground">
                    لا توجد طلبات مطابقة
                  </TableCell>
                </TableRow>
              )}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </div>
  );
}

function ServicesSection() {
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid');
  const [services, setServices] = useState(demoServices);
  const [showAddDialog, setShowAddDialog] = useState(false);

  const toggleAvailability = (id: string) => {
    setServices((prev) =>
      prev.map((s) => (s.id === id ? { ...s, isAvailable: !s.isAvailable } : s))
    );
  };

  return (
    <div className="space-y-4">
      {/* Header */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3">
        <div>
          <h3 className="text-lg font-semibold">إدارة الخدمات</h3>
          <p className="text-sm text-muted-foreground">{services.length} خدمة متوفرة</p>
        </div>
        <div className="flex items-center gap-2">
          <div className="flex items-center border rounded-lg p-0.5">
            <Button
              variant={viewMode === 'grid' ? 'default' : 'ghost'}
              size="sm"
              className="h-7 px-2"
              onClick={() => setViewMode('grid')}
            >
              <Grid3X3 className="size-3.5" />
            </Button>
            <Button
              variant={viewMode === 'list' ? 'default' : 'ghost'}
              size="sm"
              className="h-7 px-2"
              onClick={() => setViewMode('list')}
            >
              <List className="size-3.5" />
            </Button>
          </div>
          <Dialog open={showAddDialog} onOpenChange={setShowAddDialog}>
            <DialogTrigger asChild>
              <Button className="bg-[#7C3AED] hover:bg-[#7C3AED]/90">
                <Plus className="size-4" />
                إضافة خدمة
              </Button>
            </DialogTrigger>
            <DialogContent>
              <DialogHeader>
                <DialogTitle>إضافة خدمة جديدة</DialogTitle>
                <DialogDescription>أدخل بيانات الخدمة الجديدة</DialogDescription>
              </DialogHeader>
              <div className="space-y-4 py-2">
                <div className="space-y-2">
                  <Label>اسم الخدمة</Label>
                  <Input placeholder="مثال: ChatGPT Plus" />
                </div>
                <div className="space-y-2">
                  <Label>القسم</Label>
                  <Select>
                    <SelectTrigger className="w-full">
                      <SelectValue placeholder="اختر القسم" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="apps">اشتراكات التطبيقات</SelectItem>
                      <SelectItem value="ai">الذكاء الاصطناعي</SelectItem>
                      <SelectItem value="entertainment">الترفيه</SelectItem>
                      <SelectItem value="verification">التوثيق</SelectItem>
                      <SelectItem value="telegram">تليجرام</SelectItem>
                      <SelectItem value="social">سوشيال ميديا</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div className="grid grid-cols-2 gap-3">
                  <div className="space-y-2">
                    <Label>السعر ($)</Label>
                    <Input type="number" placeholder="0.00" />
                  </div>
                  <div className="space-y-2">
                    <Label>وقت التسليم</Label>
                    <Input placeholder="0-2 ساعة" />
                  </div>
                </div>
                <div className="space-y-2">
                  <Label>الوصف</Label>
                  <Input placeholder="وصف مختصر للخدمة" />
                </div>
              </div>
              <DialogFooter>
                <Button variant="outline" onClick={() => setShowAddDialog(false)}>إلغاء</Button>
                <Button className="bg-[#7C3AED] hover:bg-[#7C3AED]/90" onClick={() => setShowAddDialog(false)}>
                  إضافة الخدمة
                </Button>
              </DialogFooter>
            </DialogContent>
          </Dialog>
        </div>
      </div>

      {/* Services Grid/List */}
      {viewMode === 'grid' ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
          {services.map((service, i) => (
            <motion.div
              key={service.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.05 }}
            >
              <Card className={`bg-card/50 border-border/50 ${!service.isAvailable ? 'opacity-60' : ''}`}>
                <CardContent className="p-4 space-y-3">
                  <div className="flex items-center justify-between">
                    <Badge variant="outline" className="text-xs">{service.category}</Badge>
                    {service.badge && (
                      <Badge className="bg-[#7C3AED]/20 text-[#7C3AED] border-[#7C3AED]/30 text-[10px]">
                        {service.badge === 'popular' ? 'شائع' : service.badge === 'new' ? 'جديد' : service.badge === 'bestseller' ? 'الأكثر مبيعاً' : 'بريميوم'}
                      </Badge>
                    )}
                  </div>
                  <h4 className="font-semibold">{service.name}</h4>
                  <p className="text-lg font-bold text-[#7C3AED]">${service.price.toFixed(2)}</p>
                  <div className="flex items-center gap-2 text-xs text-muted-foreground">
                    <Star className="size-3 fill-yellow-500 text-yellow-500" />
                    <span>{service.rating}</span>
                    <span>•</span>
                    <span>{service.salesCount} مبيعة</span>
                  </div>
                  <div className="flex items-center justify-between pt-2">
                    <div className="flex items-center gap-2">
                      <Switch
                        checked={service.isAvailable}
                        onCheckedChange={() => toggleAvailability(service.id)}
                      />
                      <span className="text-xs text-muted-foreground">
                        {service.isAvailable ? 'متوفر' : 'غير متوفر'}
                      </span>
                    </div>
                    <div className="flex items-center gap-1">
                      <Button variant="ghost" size="icon" className="size-7">
                        <Edit3 className="size-3.5" />
                      </Button>
                      <Button variant="ghost" size="icon" className="size-7 text-red-400">
                        <Trash2 className="size-3.5" />
                      </Button>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </div>
      ) : (
        <Card className="bg-card/50 border-border/50">
          <CardContent className="p-0">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead className="text-right">الخدمة</TableHead>
                  <TableHead className="text-right">القسم</TableHead>
                  <TableHead className="text-right">السعر</TableHead>
                  <TableHead className="text-right">المبيعات</TableHead>
                  <TableHead className="text-right">التقييم</TableHead>
                  <TableHead className="text-right">الحالة</TableHead>
                  <TableHead className="text-right">إجراءات</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {services.map((service) => (
                  <TableRow key={service.id}>
                    <TableCell className="font-medium">{service.name}</TableCell>
                    <TableCell><Badge variant="outline">{service.category}</Badge></TableCell>
                    <TableCell>${service.price.toFixed(2)}</TableCell>
                    <TableCell>{service.salesCount}</TableCell>
                    <TableCell>
                      <div className="flex items-center gap-1">
                        <Star className="size-3 fill-yellow-500 text-yellow-500" />
                        <span>{service.rating}</span>
                      </div>
                    </TableCell>
                    <TableCell>
                      <Switch
                        checked={service.isAvailable}
                        onCheckedChange={() => toggleAvailability(service.id)}
                      />
                    </TableCell>
                    <TableCell>
                      <div className="flex items-center gap-1">
                        <Button variant="ghost" size="icon" className="size-7">
                          <Edit3 className="size-3.5" />
                        </Button>
                        <Button variant="ghost" size="icon" className="size-7 text-red-400">
                          <Trash2 className="size-3.5" />
                        </Button>
                      </div>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </CardContent>
        </Card>
      )}
    </div>
  );
}

function UsersSection() {
  const [users, setUsers] = useState(demoUsers);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedUser, setSelectedUser] = useState<DemoUser | null>(null);

  const filteredUsers = useMemo(() => {
    return users.filter((user) =>
      searchQuery === '' ||
      user.name.includes(searchQuery) ||
      user.email.toLowerCase().includes(searchQuery.toLowerCase())
    );
  }, [users, searchQuery]);

  const toggleUserStatus = (id: string) => {
    setUsers((prev) =>
      prev.map((u) => (u.id === id ? { ...u, isActive: !u.isActive } : u))
    );
  };

  return (
    <div className="space-y-4">
      {/* Header */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3">
        <div>
          <h3 className="text-lg font-semibold">إدارة المستخدمين</h3>
          <p className="text-sm text-muted-foreground">{users.length} مستخدم مسجل</p>
        </div>
        <div className="relative w-full sm:w-auto">
          <Search className="absolute right-3 top-1/2 -translate-y-1/2 size-4 text-muted-foreground" />
          <Input
            placeholder="بحث بالاسم أو البريد..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="pr-9 w-full sm:w-[250px]"
          />
        </div>
      </div>

      {/* Users Table */}
      <Card className="bg-card/50 border-border/50">
        <CardContent className="p-0">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead className="text-right">الاسم</TableHead>
                <TableHead className="text-right">البريد</TableHead>
                <TableHead className="text-right">الدور</TableHead>
                <TableHead className="text-right">الرصيد</TableHead>
                <TableHead className="text-right">الطلبات</TableHead>
                <TableHead className="text-right">تاريخ الانضمام</TableHead>
                <TableHead className="text-right">الحالة</TableHead>
                <TableHead className="text-right">إجراءات</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredUsers.map((user) => (
                <TableRow key={user.id}>
                  <TableCell className="font-medium">{user.name}</TableCell>
                  <TableCell className="text-muted-foreground">{user.email}</TableCell>
                  <TableCell>
                    <Badge variant="outline" className={user.role === 'admin' ? 'bg-[#7C3AED]/20 text-[#7C3AED] border-[#7C3AED]/30' : ''}>
                      {user.role === 'admin' ? (
                        <><Shield className="size-3 ml-1" />مدير</>
                      ) : (
                        'عميل'
                      )}
                    </Badge>
                  </TableCell>
                  <TableCell>${user.balance.toFixed(2)}</TableCell>
                  <TableCell>{user.orders}</TableCell>
                  <TableCell className="text-muted-foreground text-xs">{user.joinDate}</TableCell>
                  <TableCell>
                    <Switch
                      checked={user.isActive}
                      onCheckedChange={() => toggleUserStatus(user.id)}
                    />
                  </TableCell>
                  <TableCell>
                    <Button
                      variant="ghost"
                      size="icon"
                      className="size-7"
                      onClick={() => setSelectedUser(user)}
                    >
                      <Eye className="size-3.5" />
                    </Button>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>

      {/* User Detail Dialog */}
      <Dialog open={!!selectedUser} onOpenChange={(open) => !open && setSelectedUser(null)}>
        <DialogContent>
          {selectedUser && (
            <>
              <DialogHeader>
                <DialogTitle>تفاصيل المستخدم</DialogTitle>
                <DialogDescription>معلومات حساب {selectedUser.name}</DialogDescription>
              </DialogHeader>
              <div className="space-y-4">
                <div className="flex items-center gap-4">
                  <div className="size-14 rounded-full bg-[#7C3AED]/20 flex items-center justify-center text-[#7C3AED] font-bold text-xl">
                    {selectedUser.name.charAt(0)}
                  </div>
                  <div>
                    <h4 className="font-semibold text-lg">{selectedUser.name}</h4>
                    <p className="text-sm text-muted-foreground">{selectedUser.email}</p>
                  </div>
                </div>
                <Separator />
                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-1">
                    <p className="text-xs text-muted-foreground">الدور</p>
                    <p className="font-medium">{selectedUser.role === 'admin' ? 'مدير' : 'عميل'}</p>
                  </div>
                  <div className="space-y-1">
                    <p className="text-xs text-muted-foreground">الرصيد</p>
                    <p className="font-medium">${selectedUser.balance.toFixed(2)}</p>
                  </div>
                  <div className="space-y-1">
                    <p className="text-xs text-muted-foreground">الطلبات</p>
                    <p className="font-medium">{selectedUser.orders}</p>
                  </div>
                  <div className="space-y-1">
                    <p className="text-xs text-muted-foreground">تاريخ الانضمام</p>
                    <p className="font-medium">{selectedUser.joinDate}</p>
                  </div>
                  <div className="space-y-1">
                    <p className="text-xs text-muted-foreground">الحالة</p>
                    <Badge variant="outline" className={selectedUser.isActive ? 'bg-green-500/20 text-green-400 border-green-500/30' : 'bg-red-500/20 text-red-400 border-red-500/30'}>
                      {selectedUser.isActive ? 'نشط' : 'معطل'}
                    </Badge>
                  </div>
                </div>
              </div>
              <DialogFooter>
                <Button variant="outline" onClick={() => setSelectedUser(null)}>إغلاق</Button>
              </DialogFooter>
            </>
          )}
        </DialogContent>
      </Dialog>
    </div>
  );
}

function PaymentsSection() {
  const [methodFilter, setMethodFilter] = useState('all');

  const filteredTransactions = useMemo(() => {
    return demoTransactions.filter((t) =>
      methodFilter === 'all' || t.method === methodFilter
    );
  }, [methodFilter]);

  const paymentMethods = useMemo(() => [
    { name: 'جيب', icon: Wallet, color: '#10B981', balance: 12500, transactions: 234 },
    { name: 'جوالي', icon: Smartphone, color: '#3B82F6', balance: 8900, transactions: 156 },
    { name: 'فلوسك', icon: Banknote, color: '#F59E0B', balance: 5200, transactions: 89 },
    { name: 'OneCash', icon: CreditCard, color: '#7C3AED', balance: 3100, transactions: 45 },
    { name: 'PayPal', icon: Globe, color: '#003087', balance: 6700, transactions: 67 },
    { name: 'Binance', icon: Zap, color: '#F0B90B', balance: 4300, transactions: 34 },
  ], []);

  return (
    <div className="space-y-4">
      {/* Payment Methods Overview */}
      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-3">
        {paymentMethods.map((method, i) => (
          <motion.div
            key={method.name}
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: i * 0.05 }}
          >
            <Card className="bg-card/50 border-border/50 hover:border-border cursor-pointer transition-colors">
              <CardContent className="p-4 text-center space-y-2">
                <div
                  className="size-10 rounded-xl mx-auto flex items-center justify-center"
                  style={{ backgroundColor: `${method.color}20` }}
                >
                  <method.icon className="size-5" style={{ color: method.color }} />
                </div>
                <p className="text-sm font-medium">{method.name}</p>
                <p className="text-xs text-muted-foreground">${method.balance.toLocaleString()}</p>
              </CardContent>
            </Card>
          </motion.div>
        ))}
      </div>

      {/* Transaction History */}
      <Card className="bg-card/50 border-border/50">
        <CardHeader>
          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3">
            <div>
              <CardTitle className="text-base">سجل المعاملات</CardTitle>
              <CardDescription>جميع المعاملات المالية</CardDescription>
            </div>
            <Select value={methodFilter} onValueChange={setMethodFilter}>
              <SelectTrigger className="w-full sm:w-[180px]">
                <SelectValue placeholder="جميع الطرق" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">جميع الطرق</SelectItem>
                <SelectItem value="جيب">جيب</SelectItem>
                <SelectItem value="جوالي">جوالي</SelectItem>
                <SelectItem value="فلوسك">فلوسك</SelectItem>
                <SelectItem value="OneCash">OneCash</SelectItem>
                <SelectItem value="PayPal">PayPal</SelectItem>
                <SelectItem value="Binance Pay">Binance Pay</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </CardHeader>
        <CardContent className="p-0">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead className="text-right">المرجع</TableHead>
                <TableHead className="text-right">المستخدم</TableHead>
                <TableHead className="text-right">النوع</TableHead>
                <TableHead className="text-right">المبلغ</TableHead>
                <TableHead className="text-right">الطريقة</TableHead>
                <TableHead className="text-right">الحالة</TableHead>
                <TableHead className="text-right">التاريخ</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredTransactions.map((txn) => (
                <TableRow key={txn.id}>
                  <TableCell className="font-mono text-xs">{txn.reference}</TableCell>
                  <TableCell>{txn.user}</TableCell>
                  <TableCell><TransactionTypeBadge type={txn.type} /></TableCell>
                  <TableCell className={txn.type === 'refund' || txn.type === 'withdrawal' ? 'text-red-400' : 'text-green-400'}>
                    {txn.type === 'refund' || txn.type === 'withdrawal' ? '-' : '+'}${txn.amount.toFixed(2)}
                  </TableCell>
                  <TableCell>{txn.method}</TableCell>
                  <TableCell><PaymentStatusBadge status={txn.status} /></TableCell>
                  <TableCell className="text-muted-foreground text-xs">{txn.date}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </div>
  );
}

function CouponsSection() {
  const [coupons, setCoupons] = useState(demoCoupons);
  const [showCreateDialog, setShowCreateDialog] = useState(false);
  const [newCoupon, setNewCoupon] = useState({
    code: '',
    discountType: 'percentage' as 'percentage' | 'fixed',
    discountValue: '',
    minOrder: '',
    maxUses: '',
    validFrom: '',
    validUntil: '',
  });

  const toggleCoupon = (id: string) => {
    setCoupons((prev) =>
      prev.map((c) => (c.id === id ? { ...c, isActive: !c.isActive } : c))
    );
  };

  const copyCode = (code: string) => {
    navigator.clipboard.writeText(code);
  };

  return (
    <div className="space-y-4">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h3 className="text-lg font-semibold">إدارة الكوبونات</h3>
          <p className="text-sm text-muted-foreground">{coupons.filter(c => c.isActive).length} كوبون نشط</p>
        </div>
        <Dialog open={showCreateDialog} onOpenChange={setShowCreateDialog}>
          <DialogTrigger asChild>
            <Button className="bg-[#7C3AED] hover:bg-[#7C3AED]/90">
              <Plus className="size-4" />
              إنشاء كوبون
            </Button>
          </DialogTrigger>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>إنشاء كوبون جديد</DialogTitle>
              <DialogDescription>أدخل بيانات الكوبون</DialogDescription>
            </DialogHeader>
            <div className="space-y-4 py-2">
              <div className="space-y-2">
                <Label>كود الكوبون</Label>
                <Input
                  placeholder="مثال: SAVE20"
                  value={newCoupon.code}
                  onChange={(e) => setNewCoupon({ ...newCoupon, code: e.target.value.toUpperCase() })}
                />
              </div>
              <div className="grid grid-cols-2 gap-3">
                <div className="space-y-2">
                  <Label>نوع الخصم</Label>
                  <Select
                    value={newCoupon.discountType}
                    onValueChange={(v) => setNewCoupon({ ...newCoupon, discountType: v as 'percentage' | 'fixed' })}
                  >
                    <SelectTrigger className="w-full">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="percentage">نسبة مئوية %</SelectItem>
                      <SelectItem value="fixed">مبلغ ثابت $</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div className="space-y-2">
                  <Label>قيمة الخصم</Label>
                  <Input
                    type="number"
                    placeholder="0"
                    value={newCoupon.discountValue}
                    onChange={(e) => setNewCoupon({ ...newCoupon, discountValue: e.target.value })}
                  />
                </div>
              </div>
              <div className="grid grid-cols-2 gap-3">
                <div className="space-y-2">
                  <Label>الحد الأدنى للطلب ($)</Label>
                  <Input
                    type="number"
                    placeholder="بدون حد"
                    value={newCoupon.minOrder}
                    onChange={(e) => setNewCoupon({ ...newCoupon, minOrder: e.target.value })}
                  />
                </div>
                <div className="space-y-2">
                  <Label>الحد الأقصى للاستخدام</Label>
                  <Input
                    type="number"
                    placeholder="بدون حد"
                    value={newCoupon.maxUses}
                    onChange={(e) => setNewCoupon({ ...newCoupon, maxUses: e.target.value })}
                  />
                </div>
              </div>
              <div className="grid grid-cols-2 gap-3">
                <div className="space-y-2">
                  <Label>صالح من</Label>
                  <Input
                    type="date"
                    value={newCoupon.validFrom}
                    onChange={(e) => setNewCoupon({ ...newCoupon, validFrom: e.target.value })}
                  />
                </div>
                <div className="space-y-2">
                  <Label>صالح حتى</Label>
                  <Input
                    type="date"
                    value={newCoupon.validUntil}
                    onChange={(e) => setNewCoupon({ ...newCoupon, validUntil: e.target.value })}
                  />
                </div>
              </div>
            </div>
            <DialogFooter>
              <Button variant="outline" onClick={() => setShowCreateDialog(false)}>إلغاء</Button>
              <Button className="bg-[#7C3AED] hover:bg-[#7C3AED]/90" onClick={() => setShowCreateDialog(false)}>
                إنشاء الكوبون
              </Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      </div>

      {/* Coupons List */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {coupons.map((coupon, i) => (
          <motion.div
            key={coupon.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: i * 0.05 }}
          >
            <Card className={`bg-card/50 border-border/50 ${!coupon.isActive ? 'opacity-60' : ''}`}>
              <CardContent className="p-4 space-y-3">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <Tag className="size-4 text-[#7C3AED]" />
                    <span className="font-mono font-bold text-lg">{coupon.code}</span>
                  </div>
                  <Button
                    variant="ghost"
                    size="icon"
                    className="size-7"
                    onClick={() => copyCode(coupon.code)}
                  >
                    <Copy className="size-3.5" />
                  </Button>
                </div>
                <div className="text-2xl font-bold text-[#7C3AED]">
                  {coupon.discountType === 'percentage'
                    ? `${coupon.discountValue}%`
                    : `$${coupon.discountValue}`}
                  <span className="text-sm font-normal text-muted-foreground mr-1">خصم</span>
                </div>
                <div className="space-y-1.5 text-xs text-muted-foreground">
                  {coupon.minOrder && <p>الحد الأدنى: ${coupon.minOrder}</p>}
                  <p>الاستخدام: {coupon.usedCount} / {coupon.maxUses || '∞'}</p>
                  <p>صالح: {coupon.validFrom} → {coupon.validUntil}</p>
                </div>
                {coupon.maxUses && (
                  <div className="w-full bg-muted rounded-full h-1.5">
                    <div
                      className="bg-[#7C3AED] h-1.5 rounded-full transition-all"
                      style={{ width: `${Math.min((coupon.usedCount / coupon.maxUses) * 100, 100)}%` }}
                    />
                  </div>
                )}
                <div className="flex items-center justify-between pt-1">
                  <Switch
                    checked={coupon.isActive}
                    onCheckedChange={() => toggleCoupon(coupon.id)}
                  />
                  <Badge variant="outline" className={coupon.isActive ? 'bg-green-500/20 text-green-400 border-green-500/30' : 'bg-red-500/20 text-red-400 border-red-500/30'}>
                    {coupon.isActive ? 'نشط' : 'معطل'}
                  </Badge>
                </div>
              </CardContent>
            </Card>
          </motion.div>
        ))}
      </div>
    </div>
  );
}

function AnalyticsSection() {
  return (
    <div className="space-y-4">
      {/* Key Metrics */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
        {[
          { label: 'متوسط قيمة الطلب', value: '$18.50', icon: DollarSign, color: '#7C3AED' },
          { label: 'معدل التحويل', value: '4.2%', icon: TrendingUp, color: '#06B6D4' },
          { label: 'معدل الإكمال', value: '92%', icon: CheckCircle2, color: '#10B981' },
          { label: 'رضا العملاء', value: '4.7/5', icon: Star, color: '#F59E0B' },
        ].map((metric, i) => (
          <motion.div
            key={metric.label}
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: i * 0.05 }}
          >
            <Card className="bg-card/50 border-border/50">
              <CardContent className="p-4 text-center space-y-2">
                <div
                  className="size-10 rounded-xl mx-auto flex items-center justify-center"
                  style={{ backgroundColor: `${metric.color}20` }}
                >
                  <metric.icon className="size-5" style={{ color: metric.color }} />
                </div>
                <p className="text-xl font-bold">{metric.value}</p>
                <p className="text-xs text-muted-foreground">{metric.label}</p>
              </CardContent>
            </Card>
          </motion.div>
        ))}
      </div>

      {/* Charts */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
        {/* Revenue Over Time */}
        <Card className="bg-card/50 border-border/50">
          <CardHeader>
            <CardTitle className="text-base">الإيرادات الشهرية</CardTitle>
            <CardDescription>آخر 6 أشهر</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="h-[280px]">
              <ResponsiveContainer width="100%" height="100%">
                <LineChart data={monthlyRevenue}>
                  <CartesianGrid strokeDasharray="3 3" stroke="#ffffff10" />
                  <XAxis dataKey="month" stroke="#888" fontSize={12} tickLine={false} />
                  <YAxis stroke="#888" fontSize={12} tickLine={false} />
                  <RechartsTooltip
                    contentStyle={{
                      backgroundColor: '#1a1a2e',
                      border: '1px solid #7C3AED30',
                      borderRadius: '8px',
                    }}
                  />
                  <Line
                    type="monotone"
                    dataKey="revenue"
                    stroke="#7C3AED"
                    strokeWidth={2}
                    dot={{ fill: '#7C3AED', r: 4 }}
                    activeDot={{ r: 6, fill: '#7C3AED' }}
                    name="الإيرادات ($)"
                  />
                </LineChart>
              </ResponsiveContainer>
            </div>
          </CardContent>
        </Card>

        {/* Orders by Category */}
        <Card className="bg-card/50 border-border/50">
          <CardHeader>
            <CardTitle className="text-base">الطلبات حسب القسم</CardTitle>
            <CardDescription>توزيع الطلبات على الأقسام المختلفة</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="h-[280px]">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={categoryChartData}>
                  <CartesianGrid strokeDasharray="3 3" stroke="#ffffff10" />
                  <XAxis dataKey="name" stroke="#888" fontSize={12} tickLine={false} />
                  <YAxis stroke="#888" fontSize={12} tickLine={false} />
                  <RechartsTooltip
                    contentStyle={{
                      backgroundColor: '#1a1a2e',
                      border: '1px solid #06B6D430',
                      borderRadius: '8px',
                    }}
                  />
                  <Bar dataKey="value" radius={[6, 6, 0, 0]} name="نسبة %">
                    {categoryChartData.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={entry.fill} />
                    ))}
                  </Bar>
                </BarChart>
              </ResponsiveContainer>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Payment Methods Distribution */}
      <Card className="bg-card/50 border-border/50">
        <CardHeader>
          <CardTitle className="text-base">توزيع طرق الدفع</CardTitle>
          <CardDescription>نسبة استخدام كل طريقة دفع</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="h-[300px]">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie
                  data={paymentDistribution}
                  cx="50%"
                  cy="50%"
                  outerRadius={100}
                  innerRadius={50}
                  dataKey="value"
                  nameKey="name"
                  label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
                  labelLine={{ stroke: '#888' }}
                >
                  {paymentDistribution.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.fill} />
                  ))}
                </Pie>
                <RechartsTooltip
                  contentStyle={{
                    backgroundColor: '#1a1a2e',
                    border: '1px solid #7C3AED30',
                    borderRadius: '8px',
                  }}
                />
                <Legend />
              </PieChart>
            </ResponsiveContainer>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}

function SettingsSection() {
  const [settings, setSettings] = useState({
    siteName: 'Zynex Store',
    siteDescription: 'متجرك الأول للخدمات الرقمية',
    enableJeib: true,
    enableJawali: true,
    enableFloosk: true,
    enableOnecash: true,
    enableMahfazati: false,
    enablePaypal: true,
    enableBinance: true,
    enableCrypto: false,
    emailNotifications: true,
    orderNotifications: true,
    paymentNotifications: true,
    promoNotifications: false,
  });

  const handleToggle = (key: keyof typeof settings) => {
    setSettings((prev) => ({ ...prev, [key]: !prev[key] }));
  };

  return (
    <div className="space-y-6">
      {/* Site Settings */}
      <Card className="bg-card/50 border-border/50">
        <CardHeader>
          <CardTitle className="text-base">إعدادات الموقع</CardTitle>
          <CardDescription>المعلومات الأساسية للمتجر</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="space-y-2">
            <Label>اسم الموقع</Label>
            <Input
              value={settings.siteName}
              onChange={(e) => setSettings({ ...settings, siteName: e.target.value })}
            />
          </div>
          <div className="space-y-2">
            <Label>وصف الموقع</Label>
            <Input
              value={settings.siteDescription}
              onChange={(e) => setSettings({ ...settings, siteDescription: e.target.value })}
            />
          </div>
          <Button className="bg-[#7C3AED] hover:bg-[#7C3AED]/90">
            <Save className="size-4" />
            حفظ التغييرات
          </Button>
        </CardContent>
      </Card>

      {/* Payment Methods */}
      <Card className="bg-card/50 border-border/50">
        <CardHeader>
          <CardTitle className="text-base">طرق الدفع</CardTitle>
          <CardDescription>تفعيل أو تعطيل طرق الدفع</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {[
              { key: 'enableJeib' as const, name: 'جيب', icon: Wallet, color: '#10B981' },
              { key: 'enableJawali' as const, name: 'جوالي', icon: Smartphone, color: '#3B82F6' },
              { key: 'enableFloosk' as const, name: 'فلوسك', icon: Banknote, color: '#F59E0B' },
              { key: 'enableOnecash' as const, name: 'OneCash', icon: CreditCard, color: '#7C3AED' },
              { key: 'enableMahfazati' as const, name: 'محفظتي', icon: Wallet, color: '#EF4444' },
              { key: 'enablePaypal' as const, name: 'PayPal', icon: Globe, color: '#003087' },
              { key: 'enableBinance' as const, name: 'Binance Pay', icon: Zap, color: '#F0B90B' },
              { key: 'enableCrypto' as const, name: 'Crypto', icon: Package, color: '#F7931A' },
            ].map((method) => (
              <div key={method.key} className="flex items-center justify-between p-3 rounded-lg border border-border/50">
                <div className="flex items-center gap-3">
                  <div
                    className="size-8 rounded-lg flex items-center justify-center"
                    style={{ backgroundColor: `${method.color}20` }}
                  >
                    <method.icon className="size-4" style={{ color: method.color }} />
                  </div>
                  <span className="text-sm font-medium">{method.name}</span>
                </div>
                <Switch
                  checked={settings[method.key] as boolean}
                  onCheckedChange={() => handleToggle(method.key)}
                />
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Notification Settings */}
      <Card className="bg-card/50 border-border/50">
        <CardHeader>
          <CardTitle className="text-base">إعدادات الإشعارات</CardTitle>
          <CardDescription>إدارة إشعارات النظام</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {[
              { key: 'emailNotifications' as const, label: 'إشعارات البريد الإلكتروني', desc: 'تلقي إشعارات عبر البريد', icon: Mail },
              { key: 'orderNotifications' as const, label: 'إشعارات الطلبات', desc: 'تنبيهات عند الطلبات الجديدة', icon: ShoppingCart },
              { key: 'paymentNotifications' as const, label: 'إشعارات المدفوعات', desc: 'تنبيهات عند استلام المدفوعات', icon: CreditCard },
              { key: 'promoNotifications' as const, label: 'إشعارات العروض', desc: 'تنبيهات العروض الترويجية', icon: Bell },
            ].map((notif) => (
              <div key={notif.key} className="flex items-center justify-between p-3 rounded-lg border border-border/50">
                <div className="flex items-center gap-3">
                  <notif.icon className="size-5 text-muted-foreground" />
                  <div>
                    <p className="text-sm font-medium">{notif.label}</p>
                    <p className="text-xs text-muted-foreground">{notif.desc}</p>
                  </div>
                </div>
                <Switch
                  checked={settings[notif.key] as boolean}
                  onCheckedChange={() => handleToggle(notif.key)}
                />
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}

// ============================================
// Sidebar Menu Items
// ============================================

const menuItems = [
  { id: 'overview', label: 'نظرة عامة', icon: LayoutDashboard },
  { id: 'orders', label: 'الطلبات', icon: ShoppingCart },
  { id: 'services', label: 'الخدمات', icon: Layers },
  { id: 'users', label: 'المستخدمين', icon: Users },
  { id: 'payments', label: 'المدفوعات', icon: CreditCard },
  { id: 'coupons', label: 'الكوبونات', icon: Tag },
  { id: 'analytics', label: 'الإحصائيات', icon: BarChart3 },
  { id: 'settings', label: 'الإعدادات', icon: Settings },
];

// ============================================
// Main Dashboard Component
// ============================================

export function AdminDashboard() {
  const [activeTab, setActiveTab] = useState('overview');
  const [sidebarOpen, setSidebarOpen] = useState(false);

  const renderSection = () => {
    switch (activeTab) {
      case 'overview':
        return <OverviewSection />;
      case 'orders':
        return <OrdersSection />;
      case 'services':
        return <ServicesSection />;
      case 'users':
        return <UsersSection />;
      case 'payments':
        return <PaymentsSection />;
      case 'coupons':
        return <CouponsSection />;
      case 'analytics':
        return <AnalyticsSection />;
      case 'settings':
        return <SettingsSection />;
      default:
        return <OverviewSection />;
    }
  };

  const sidebarContent = (
    <div className="flex flex-col h-full">
      {/* Logo */}
      <div className="p-4 border-b border-border/50">
        <div className="flex items-center gap-3">
          <div className="size-10 rounded-xl bg-gradient-to-br from-[#7C3AED] to-[#06B6D4] flex items-center justify-center">
            <Zap className="size-5 text-white" />
          </div>
          <div>
            <h2 className="font-bold text-lg">Zynex Admin</h2>
            <p className="text-xs text-muted-foreground">لوحة التحكم</p>
          </div>
        </div>
      </div>

      {/* Navigation */}
      <nav className="flex-1 p-3 space-y-1 overflow-y-auto">
        {menuItems.map((item) => {
          const isActive = activeTab === item.id;
          return (
            <motion.button
              key={item.id}
              onClick={() => {
                setActiveTab(item.id);
                setSidebarOpen(false);
              }}
              className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium transition-all ${
                isActive
                  ? 'bg-[#7C3AED]/20 text-[#7C3AED]'
                  : 'text-muted-foreground hover:bg-muted hover:text-foreground'
              }`}
              whileHover={{ x: -4 }}
              whileTap={{ scale: 0.98 }}
            >
              <item.icon className="size-4" />
              <span>{item.label}</span>
              {isActive && (
                <motion.div
                  layoutId="activeIndicator"
                  className="mr-auto size-1.5 rounded-full bg-[#7C3AED]"
                />
              )}
            </motion.button>
          );
        })}
      </nav>

      {/* Logout */}
      <div className="p-3 border-t border-border/50">
        <button className="w-full flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium text-red-400 hover:bg-red-500/10 transition-colors">
          <LogOut className="size-4" />
          <span>تسجيل الخروج</span>
        </button>
      </div>
    </div>
  );

  return (
    <div className="min-h-screen bg-[#0A0A0F] flex" dir="rtl">
      {/* Desktop Sidebar */}
      <aside className="hidden lg:flex w-64 border-l border-border/50 bg-card/30 flex-col">
        {sidebarContent}
      </aside>

      {/* Mobile Sidebar Overlay */}
      <AnimatePresence>
        {sidebarOpen && (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 bg-black/60 z-40 lg:hidden"
              onClick={() => setSidebarOpen(false)}
            />
            <motion.aside
              initial={{ x: 300 }}
              animate={{ x: 0 }}
              exit={{ x: 300 }}
              transition={{ type: 'spring', damping: 25, stiffness: 200 }}
              className="fixed right-0 top-0 h-full w-64 bg-[#0A0A0F] border-l border-border/50 z-50 lg:hidden"
            >
              {sidebarContent}
            </motion.aside>
          </>
        )}
      </AnimatePresence>

      {/* Main Content */}
      <main className="flex-1 overflow-auto">
        {/* Top Bar */}
        <header className="sticky top-0 z-30 border-b border-border/50 bg-[#0A0A0F]/80 backdrop-blur-xl">
          <div className="flex items-center justify-between px-4 lg:px-6 h-14">
            <div className="flex items-center gap-3">
              <Button
                variant="ghost"
                size="icon"
                className="lg:hidden"
                onClick={() => setSidebarOpen(true)}
              >
                <Menu className="size-5" />
              </Button>
              <div>
                <h1 className="text-lg font-semibold">
                  {menuItems.find((m) => m.id === activeTab)?.label || 'نظرة عامة'}
                </h1>
              </div>
            </div>
            <div className="flex items-center gap-2">
              <Button variant="ghost" size="icon" className="relative">
                <Bell className="size-4" />
                <span className="absolute top-1.5 right-1.5 size-2 bg-red-500 rounded-full" />
              </Button>
              <div className="size-8 rounded-full bg-gradient-to-br from-[#7C3AED] to-[#06B6D4] flex items-center justify-center text-white text-xs font-bold">
                م
              </div>
            </div>
          </div>
        </header>

        {/* Page Content */}
        <div className="p-4 lg:p-6">
          <AnimatePresence mode="wait">
            <motion.div
              key={activeTab}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              transition={{ duration: 0.2 }}
            >
              {renderSection()}
            </motion.div>
          </AnimatePresence>
        </div>
      </main>
    </div>
  );
}
