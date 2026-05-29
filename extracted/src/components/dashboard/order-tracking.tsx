'use client';

import { motion } from 'framer-motion';
import {
  Package,
  CheckCircle2,
  Loader2,
  Clock,
  XCircle,
  RotateCcw,
  Ban,
  Calendar,
  CreditCard,
  Tag,
} from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Separator } from '@/components/ui/separator';
import { ORDER_STATUS_LABELS } from '@/lib/constants';

// Map icon string from constants to actual icon component
const iconMap: Record<string, React.ComponentType<{ className?: string }>> = {
  Clock,
  Loader2,
  CheckCircle2,
  XCircle,
  RotateCcw,
  Ban,
};

export interface Order {
  id: string;
  orderNumber: string;
  date: string;
  service: string;
  amount: number;
  status: 'pending' | 'processing' | 'completed' | 'failed' | 'refunded' | 'cancelled';
  category?: string;
  quantity?: number;
  events?: OrderEvent[];
}

export interface OrderEvent {
  id: string;
  status: string;
  description: string;
  timestamp: string;
}

interface OrderTrackingProps {
  order: Order;
}

// Order stages for progress bar
const ORDER_STAGES = [
  { key: 'pending', label: 'تم الاستلام', icon: Clock },
  { key: 'processing', label: 'قيد التنفيذ', icon: Loader2 },
  { key: 'completed', label: 'مكتمل', icon: CheckCircle2 },
];

function getStageIndex(status: string): number {
  if (status === 'pending') return 0;
  if (status === 'processing') return 1;
  if (status === 'completed') return 2;
  // For failed/refunded/cancelled, show as stopped at processing stage
  return 1;
}

function formatDate(dateString: string): string {
  const date = new Date(dateString);
  return date.toLocaleDateString('ar-YE', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
    hour: '2-digit',
    minute: '2-digit',
  });
}

export function OrderTracking({ order }: OrderTrackingProps) {
  const currentStageIndex = getStageIndex(order.status);
  const statusInfo = ORDER_STATUS_LABELS[order.status];
  const StatusIcon = statusInfo ? iconMap[statusInfo.icon] || Clock : Clock;
  const isNegativeStatus = ['failed', 'refunded', 'cancelled'].includes(order.status);

  // Default events if none provided
  const orderEvents: OrderEvent[] = order.events || [
    {
      id: '1',
      status: 'pending',
      description: 'تم استلام الطلب بنجاح',
      timestamp: order.date,
    },
    ...(order.status !== 'pending'
      ? [
          {
            id: '2',
            status: 'processing',
            description: 'جاري تنفيذ الطلب',
            timestamp: new Date(
              new Date(order.date).getTime() + 3600000
            ).toISOString(),
          },
        ]
      : []),
    ...(order.status === 'completed'
      ? [
          {
            id: '3',
            status: 'completed',
            description: 'تم تنفيذ الطلب بنجاح وتسليمه',
            timestamp: new Date(
              new Date(order.date).getTime() + 7200000
            ).toISOString(),
          },
        ]
      : []),
    ...(order.status === 'failed'
      ? [
          {
            id: '3',
            status: 'failed',
            description: 'فشل تنفيذ الطلب - سيتم استرداد المبلغ',
            timestamp: new Date(
              new Date(order.date).getTime() + 7200000
            ).toISOString(),
          },
        ]
      : []),
  ];

  return (
    <div className="space-y-6">
      {/* Order Details Card */}
      <Card className="bg-card/50 border-border/50 overflow-hidden">
        <CardHeader className="pb-4">
          <div className="flex items-center justify-between flex-wrap gap-3">
            <CardTitle className="text-lg font-bold flex items-center gap-2">
              <Package className="h-5 w-5 text-zynex-purple" />
              تفاصيل الطلب
            </CardTitle>
            <Badge
              className={`${statusInfo?.color} bg-opacity-10 border text-sm px-3 py-1`}
              variant="outline"
            >
              <StatusIcon className="h-3.5 w-3.5 ml-1.5" />
              {statusInfo?.label || order.status}
            </Badge>
          </div>
        </CardHeader>

        <CardContent className="space-y-4">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div className="flex items-center gap-3 text-sm">
              <div className="h-9 w-9 rounded-lg bg-zynex-purple/10 flex items-center justify-center shrink-0">
                <Tag className="h-4 w-4 text-zynex-purple" />
              </div>
              <div>
                <p className="text-muted-foreground text-xs">رقم الطلب</p>
                <p className="font-medium font-mono" dir="ltr">#{order.orderNumber}</p>
              </div>
            </div>

            <div className="flex items-center gap-3 text-sm">
              <div className="h-9 w-9 rounded-lg bg-zynex-cyan/10 flex items-center justify-center shrink-0">
                <Calendar className="h-4 w-4 text-zynex-cyan" />
              </div>
              <div>
                <p className="text-muted-foreground text-xs">تاريخ الطلب</p>
                <p className="font-medium">{formatDate(order.date)}</p>
              </div>
            </div>

            <div className="flex items-center gap-3 text-sm">
              <div className="h-9 w-9 rounded-lg bg-zynex-green/10 flex items-center justify-center shrink-0">
                <Package className="h-4 w-4 text-zynex-green" />
              </div>
              <div>
                <p className="text-muted-foreground text-xs">الخدمة</p>
                <p className="font-medium">{order.service}</p>
              </div>
            </div>

            <div className="flex items-center gap-3 text-sm">
              <div className="h-9 w-9 rounded-lg bg-amber-500/10 flex items-center justify-center shrink-0">
                <CreditCard className="h-4 w-4 text-amber-500" />
              </div>
              <div>
                <p className="text-muted-foreground text-xs">المبلغ</p>
                <p className="font-bold">${order.amount.toFixed(2)}</p>
              </div>
            </div>
          </div>

          {order.quantity && order.quantity > 1 && (
            <p className="text-sm text-muted-foreground">
              الكمية: <span className="font-medium text-foreground">{order.quantity}</span>
            </p>
          )}
        </CardContent>
      </Card>

      {/* Progress Bar */}
      <Card className="bg-card/50 border-border/50">
        <CardContent className="p-6">
          <h3 className="text-base font-bold mb-6">تتبع الطلب</h3>

          <div className="relative">
            {/* Progress Background Line */}
            <div className="absolute top-5 right-5 left-5 h-1 bg-muted rounded-full" />

            {/* Active Progress Line */}
            {!isNegativeStatus && (
              <motion.div
                className="absolute top-5 right-5 h-1 rounded-full gradient-primary"
                initial={{ width: '0%' }}
                animate={{
                  width: `${(currentStageIndex / (ORDER_STAGES.length - 1)) * 100}%`,
                }}
                transition={{ duration: 1, ease: 'easeOut' }}
                style={{ maxWidth: 'calc(100% - 40px)' }}
              />
            )}

            {/* Stage Points */}
            <div className="relative flex justify-between">
              {ORDER_STAGES.map((stage, index) => {
                const isCompleted = !isNegativeStatus && index <= currentStageIndex;
                const isCurrent = !isNegativeStatus && index === currentStageIndex;
                const StageIcon = stage.icon;

                return (
                  <div key={stage.key} className="flex flex-col items-center gap-2 z-10">
                    <motion.div
                      initial={{ scale: 0 }}
                      animate={{ scale: 1 }}
                      transition={{ delay: index * 0.2, type: 'spring' }}
                      className={`relative h-10 w-10 rounded-full flex items-center justify-center transition-all ${
                        isCompleted
                          ? 'gradient-primary text-white shadow-lg shadow-zynex-purple/25'
                          : isNegativeStatus && index === 1
                          ? 'bg-red-500/20 text-red-500 border-2 border-red-500/50'
                          : 'bg-muted text-muted-foreground border-2 border-border'
                      } ${isCurrent ? 'ring-4 ring-zynex-purple/20' : ''}`}
                    >
                      {isCurrent && !isNegativeStatus ? (
                        <motion.div
                          animate={{ rotate: 360 }}
                          transition={{ duration: 2, repeat: Infinity, ease: 'linear' }}
                        >
                          <StageIcon className="h-5 w-5" />
                        </motion.div>
                      ) : (
                        <StageIcon className="h-5 w-5" />
                      )}
                    </motion.div>
                    <span
                      className={`text-xs font-medium ${
                        isCompleted ? 'text-foreground' : 'text-muted-foreground'
                      }`}
                    >
                      {stage.label}
                    </span>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Negative Status Notice */}
          {isNegativeStatus && (
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              className="mt-4 p-3 rounded-lg bg-red-500/10 border border-red-500/20 text-center"
            >
              <p className="text-sm text-red-500 font-medium">
                {order.status === 'failed' && 'فشل تنفيذ الطلب - سيتم استرداد المبلغ تلقائياً'}
                {order.status === 'refunded' && 'تم استرداد مبلغ الطلب بنجاح'}
                {order.status === 'cancelled' && 'تم إلغاء الطلب'}
              </p>
            </motion.div>
          )}
        </CardContent>
      </Card>

      {/* Timeline */}
      <Card className="bg-card/50 border-border/50">
        <CardContent className="p-6">
          <h3 className="text-base font-bold mb-4">سجل الأحداث</h3>

          <div className="relative space-y-0">
            {orderEvents.map((event, index) => {
              const eventStatus = ORDER_STATUS_LABELS[event.status];
              const EventIcon = eventStatus ? iconMap[eventStatus.icon] || Clock : Clock;
              const isLast = index === orderEvents.length - 1;

              return (
                <motion.div
                  key={event.id}
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: index * 0.15 }}
                  className="flex gap-4 pb-6"
                >
                  {/* Timeline Line & Dot */}
                  <div className="flex flex-col items-center shrink-0">
                    <div
                      className={`h-8 w-8 rounded-full flex items-center justify-center ${
                        event.status === 'completed'
                          ? 'bg-green-500/20 text-green-500'
                          : event.status === 'processing'
                          ? 'bg-blue-500/20 text-blue-500'
                          : event.status === 'pending'
                          ? 'bg-yellow-500/20 text-yellow-500'
                          : event.status === 'failed'
                          ? 'bg-red-500/20 text-red-500'
                          : event.status === 'refunded'
                          ? 'bg-purple-500/20 text-purple-500'
                          : 'bg-muted text-muted-foreground'
                      }`}
                    >
                      <EventIcon className="h-4 w-4" />
                    </div>
                    {!isLast && (
                      <div className="w-px flex-1 bg-border mt-1" />
                    )}
                  </div>

                  {/* Event Content */}
                  <div className="flex-1 pb-2">
                    <p className="text-sm font-medium">{event.description}</p>
                    <p className="text-xs text-muted-foreground mt-1">
                      {formatDate(event.timestamp)}
                    </p>
                  </div>
                </motion.div>
              );
            })}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
