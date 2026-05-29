'use client';

import { useState, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  ShoppingCart,
  Minus,
  Plus,
  User,
  MessageSquare,
  Tag,
  Wallet,
  Smartphone,
  Banknote,
  CreditCard,
  WalletCards,
  Coins,
  Check,
  AlertCircle,
  Loader2,
  X,
} from 'lucide-react';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import { Separator } from '@/components/ui/separator';
import { Badge } from '@/components/ui/badge';
import { YEMENI_PAYMENT_METHODS, INTERNATIONAL_PAYMENT_METHODS, BADGE_STYLES } from '@/lib/constants';
import { toast } from 'sonner';

interface ServiceData {
  id: string;
  name: string;
  nameEn: string;
  description: string;
  price: number;
  priceYER?: number;
  originalPrice?: number;
  badge?: string | null;
  rating: number;
  reviewCount: number;
  deliveryTime?: string;
  categoryColor?: string;
}

interface OrderModalProps {
  isOpen: boolean;
  onClose: () => void;
  service: ServiceData | null;
}

const ICON_MAP: Record<string, React.ComponentType<{ className?: string }>> = {
  Wallet,
  Smartphone,
  Banknote,
  CreditCard,
  WalletCards,
  Coins,
};

function getPaymentIcon(iconName: string) {
  return ICON_MAP[iconName] || Wallet;
}

export function OrderModal({ isOpen, onClose, service }: OrderModalProps) {
  const [quantity, setQuantity] = useState(1);
  const [account, setAccount] = useState('');
  const [notes, setNotes] = useState('');
  const [couponCode, setCouponCode] = useState('');
  const [couponApplied, setCouponApplied] = useState(false);
  const [couponDiscount, setCouponDiscount] = useState(0);
  const [couponError, setCouponError] = useState('');
  const [selectedPayment, setSelectedPayment] = useState<string>('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [errors, setErrors] = useState<Record<string, string>>({});

  const resetForm = useCallback(() => {
    setQuantity(1);
    setAccount('');
    setNotes('');
    setCouponCode('');
    setCouponApplied(false);
    setCouponDiscount(0);
    setCouponError('');
    setSelectedPayment('');
    setIsSubmitting(false);
    setErrors({});
  }, []);

  const handleClose = () => {
    resetForm();
    onClose();
  };

  if (!service) return null;

  const subtotal = service.price * quantity;
  const discountAmount = couponApplied ? subtotal * (couponDiscount / 100) : 0;
  const total = subtotal - discountAmount;
  const totalYER = service.priceYER ? service.priceYER * quantity - (couponApplied ? service.priceYER * quantity * (couponDiscount / 100) : 0) : 0;

  const validate = (): boolean => {
    const newErrors: Record<string, string> = {};
    if (!account.trim()) {
      newErrors.account = 'يرجى إدخال الحساب أو اسم المستخدم';
    }
    if (!selectedPayment) {
      newErrors.payment = 'يرجى اختيار طريقة الدفع';
    }
    if (quantity < 1 || quantity > 10) {
      newErrors.quantity = 'الكمية يجب أن تكون بين 1 و 10';
    }
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleApplyCoupon = () => {
    setCouponError('');
    if (!couponCode.trim()) {
      setCouponError('يرجى إدخال كوبون الخصم');
      return;
    }
    // Simulate coupon validation
    const upperCode = couponCode.toUpperCase();
    if (upperCode === 'ZYNEX10') {
      setCouponApplied(true);
      setCouponDiscount(10);
      toast.success('تم تطبيق كوبون الخصم بنجاح! خصم 10%');
    } else if (upperCode === 'ZYNEX20') {
      setCouponApplied(true);
      setCouponDiscount(20);
      toast.success('تم تطبيق كوبون الخصم بنجاح! خصم 20%');
    } else {
      setCouponError('كوبون الخصم غير صالح');
    }
  };

  const handleSubmit = async () => {
    if (!validate()) return;

    setIsSubmitting(true);
    try {
      // Simulate API call
      await new Promise((resolve) => setTimeout(resolve, 2000));
      toast.success('تم تأكيد طلبك بنجاح! سيتم التواصل معك قريباً', {
        description: `طلب #${Math.floor(Math.random() * 90000 + 10000)}`,
      });
      handleClose();
    } catch {
      toast.error('حدث خطأ أثناء تأكيد الطلب. يرجى المحاولة مرة أخرى.');
    } finally {
      setIsSubmitting(false);
    }
  };

  const badgeStyle = service.badge ? BADGE_STYLES[service.badge] : null;

  return (
    <Dialog open={isOpen} onOpenChange={(open) => !open && handleClose()}>
      <DialogContent className="sm:max-w-xl max-h-[90vh] overflow-y-auto p-0" showCloseButton={true}>
        <DialogHeader className="p-6 pb-0">
          <DialogTitle className="text-lg font-bold flex items-center gap-2">
            <ShoppingCart className="size-5 text-primary" />
            تأكيد الطلب
          </DialogTitle>
          <DialogDescription className="text-muted-foreground text-sm">
            أكمل بياناتك لتأكيد طلب الخدمة
          </DialogDescription>
        </DialogHeader>

        <div className="p-6 space-y-5">
          {/* Service Info */}
          <div className="flex items-center gap-3 p-3 rounded-lg bg-muted/50 border border-border">
            <div className="flex-1 min-w-0">
              <div className="flex items-center gap-2">
                <h4 className="font-semibold text-sm truncate">{service.name}</h4>
                {badgeStyle && (
                  <Badge className={`text-[10px] px-1.5 py-0 ${badgeStyle.className}`}>
                    {badgeStyle.label}
                  </Badge>
                )}
              </div>
              <p className="text-xs text-muted-foreground mt-0.5 line-clamp-1">{service.description}</p>
            </div>
            <div className="text-left shrink-0">
              <span className="font-bold text-primary">${service.price}</span>
              {service.priceYER && (
                <span className="block text-xs text-muted-foreground">
                  {service.priceYER.toLocaleString('ar-YE')} ر.ي
                </span>
              )}
            </div>
          </div>

          {/* Quantity */}
          <div className="space-y-2">
            <Label>الكمية</Label>
            <div className="flex items-center gap-3">
              <Button
                variant="outline"
                size="icon"
                className="size-9"
                onClick={() => setQuantity(Math.max(1, quantity - 1))}
                disabled={quantity <= 1}
              >
                <Minus className="size-4" />
              </Button>
              <span className="w-10 text-center font-semibold text-lg">{quantity}</span>
              <Button
                variant="outline"
                size="icon"
                className="size-9"
                onClick={() => setQuantity(Math.min(10, quantity + 1))}
                disabled={quantity >= 10}
              >
                <Plus className="size-4" />
              </Button>
              {errors.quantity && (
                <span className="text-xs text-destructive flex items-center gap-1">
                  <AlertCircle className="size-3" />
                  {errors.quantity}
                </span>
              )}
            </div>
          </div>

          {/* Account Input */}
          <div className="space-y-2">
            <Label htmlFor="order-account" className="flex items-center gap-1.5">
              <User className="size-3.5" />
              الحساب / اسم المستخدم
            </Label>
            <Input
              id="order-account"
              placeholder="أدخل الحساب أو اسم المستخدم الخاص بك"
              value={account}
              onChange={(e) => {
                setAccount(e.target.value);
                if (errors.account) setErrors((prev) => ({ ...prev, account: '' }));
              }}
              className={errors.account ? 'border-destructive' : ''}
              dir="ltr"
            />
            {errors.account && (
              <span className="text-xs text-destructive flex items-center gap-1">
                <AlertCircle className="size-3" />
                {errors.account}
              </span>
            )}
          </div>

          {/* Notes */}
          <div className="space-y-2">
            <Label htmlFor="order-notes" className="flex items-center gap-1.5">
              <MessageSquare className="size-3.5" />
              ملاحظات (اختياري)
            </Label>
            <Textarea
              id="order-notes"
              placeholder="أضف أي ملاحظات أو تعليمات خاصة بطلبك"
              value={notes}
              onChange={(e) => setNotes(e.target.value)}
              rows={3}
            />
          </div>

          {/* Coupon Code */}
          <div className="space-y-2">
            <Label className="flex items-center gap-1.5">
              <Tag className="size-3.5" />
              كوبون الخصم
            </Label>
            <div className="flex gap-2">
              <Input
                placeholder="أدخل كوبون الخصم"
                value={couponCode}
                onChange={(e) => {
                  setCouponCode(e.target.value);
                  setCouponError('');
                }}
                disabled={couponApplied}
                className={couponError ? 'border-destructive' : ''}
                dir="ltr"
              />
              <Button
                variant={couponApplied ? 'secondary' : 'outline'}
                size="sm"
                onClick={handleApplyCoupon}
                disabled={couponApplied}
                className="shrink-0"
              >
                {couponApplied ? (
                  <>
                    <Check className="size-4 ml-1" />
                    مطبق
                  </>
                ) : (
                  'تطبيق'
                )}
              </Button>
            </div>
            {couponError && (
              <span className="text-xs text-destructive flex items-center gap-1">
                <AlertCircle className="size-3" />
                {couponError}
              </span>
            )}
            {couponApplied && (
              <div className="flex items-center gap-1.5 text-xs text-emerald-500">
                <Check className="size-3" />
                خصم {couponDiscount}% مطبق على الطلب
              </div>
            )}
          </div>

          <Separator />

          {/* Payment Method */}
          <div className="space-y-3">
            <Label className="flex items-center gap-1.5">
              <Wallet className="size-3.5" />
              طريقة الدفع
            </Label>
            {errors.payment && (
              <span className="text-xs text-destructive flex items-center gap-1">
                <AlertCircle className="size-3" />
                {errors.payment}
              </span>
            )}

            {/* Yemeni Wallets */}
            <div className="space-y-2">
              <p className="text-xs text-muted-foreground font-medium">المحافظ اليمنية</p>
              <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
                {YEMENI_PAYMENT_METHODS.map((method) => {
                  const Icon = getPaymentIcon(method.icon);
                  const isSelected = selectedPayment === method.id;
                  return (
                    <motion.button
                      key={method.id}
                      whileHover={{ scale: 1.03 }}
                      whileTap={{ scale: 0.97 }}
                      onClick={() => {
                        setSelectedPayment(method.id);
                        if (errors.payment) setErrors((prev) => ({ ...prev, payment: '' }));
                      }}
                      className={`relative flex flex-col items-center gap-1.5 p-3 rounded-lg border transition-all duration-200 ${
                        isSelected
                          ? 'border-primary bg-primary/10 shadow-sm'
                          : 'border-border hover:border-primary/50 hover:bg-muted/50'
                      }`}
                    >
                      {isSelected && (
                        <div className="absolute top-1.5 left-1.5">
                          <Check className="size-3.5 text-primary" />
                        </div>
                      )}
                      <div
                        className="w-8 h-8 rounded-full flex items-center justify-center"
                        style={{ backgroundColor: `${method.color}20` }}
                      >
                        <Icon className="size-4" style={{ color: method.color }} />
                      </div>
                      <span className="text-xs font-medium text-center">{method.name}</span>
                    </motion.button>
                  );
                })}
              </div>
            </div>

            {/* International Payment */}
            <div className="space-y-2">
              <p className="text-xs text-muted-foreground font-medium">طرق الدفع الدولية</p>
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
                {INTERNATIONAL_PAYMENT_METHODS.map((method) => {
                  const Icon = getPaymentIcon(method.icon);
                  const isSelected = selectedPayment === method.id;
                  return (
                    <motion.button
                      key={method.id}
                      whileHover={{ scale: 1.03 }}
                      whileTap={{ scale: 0.97 }}
                      onClick={() => {
                        setSelectedPayment(method.id);
                        if (errors.payment) setErrors((prev) => ({ ...prev, payment: '' }));
                      }}
                      className={`relative flex flex-col items-center gap-1.5 p-3 rounded-lg border transition-all duration-200 ${
                        isSelected
                          ? 'border-primary bg-primary/10 shadow-sm'
                          : 'border-border hover:border-primary/50 hover:bg-muted/50'
                      }`}
                    >
                      {isSelected && (
                        <div className="absolute top-1.5 left-1.5">
                          <Check className="size-3.5 text-primary" />
                        </div>
                      )}
                      <div
                        className="w-8 h-8 rounded-full flex items-center justify-center"
                        style={{ backgroundColor: `${method.color}20` }}
                      >
                        <Icon className="size-4" style={{ color: method.color }} />
                      </div>
                      <span className="text-xs font-medium text-center">{method.name}</span>
                    </motion.button>
                  );
                })}
              </div>
            </div>
          </div>

          <Separator />

          {/* Order Summary */}
          <div className="space-y-2.5">
            <h4 className="font-semibold text-sm">ملخص الطلب</h4>
            <div className="space-y-2 text-sm">
              <div className="flex justify-between">
                <span className="text-muted-foreground">{service.name} × {quantity}</span>
                <span>${subtotal.toFixed(2)}</span>
              </div>
              {couponApplied && couponDiscount > 0 && (
                <div className="flex justify-between text-emerald-500">
                  <span>خصم الكوبون ({couponDiscount}%)</span>
                  <span>-${discountAmount.toFixed(2)}</span>
                </div>
              )}
              {service.priceYER && (
                <div className="flex justify-between text-muted-foreground text-xs">
                  <span>المبلغ بالريال اليمني</span>
                  <span>{totalYER.toLocaleString('ar-YE')} ر.ي</span>
                </div>
              )}
              <Separator />
              <div className="flex justify-between font-bold text-base">
                <span>الإجمالي</span>
                <span className="text-primary">${total.toFixed(2)}</span>
              </div>
            </div>
          </div>

          {/* Submit Button */}
          <Button
            onClick={handleSubmit}
            disabled={isSubmitting}
            className="w-full gradient-primary hover:opacity-90 text-white font-semibold h-11 text-base"
            size="lg"
          >
            {isSubmitting ? (
              <AnimatePresence mode="wait">
                <motion.div
                  key="loading"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  className="flex items-center gap-2"
                >
                  <Loader2 className="size-5 animate-spin" />
                  جاري التأكيد...
                </motion.div>
              </AnimatePresence>
            ) : (
              <motion.div
                key="submit"
                className="flex items-center gap-2"
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
              >
                <Check className="size-5" />
                تأكيد الطلب
              </motion.div>
            )}
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
}
