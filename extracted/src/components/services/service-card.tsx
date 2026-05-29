'use client';

import { motion } from 'framer-motion';
import { Star, Clock, ShoppingCart, TrendingUp, Sparkles, Zap, Brain, Gamepad2, BadgeCheck, Send, Users, Globe, Wallet, Smartphone, Banknote, CreditCard, WalletCards } from 'lucide-react';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { BADGE_STYLES } from '@/lib/constants';

interface ServiceCardProps {
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
  onOrder?: () => void;
}

const ICON_MAP: Record<string, React.ComponentType<{ className?: string }>> = {
  Brain,
  Smartphone,
  Gamepad2,
  BadgeCheck,
  Send,
  Users,
  Globe,
  Sparkles,
  Zap,
  TrendingUp,
  Wallet,
  Banknote,
  CreditCard,
  WalletCards,
};

function getCategoryIconName(nameEn: string): string {
  for (const key of Object.keys(ICON_MAP)) {
    if (nameEn.toLowerCase().includes(key.toLowerCase())) {
      return key;
    }
  }
  return 'Sparkles';
}

function ServiceIcon({ iconName, className }: { iconName: string; className?: string }) {
  const Comp = ICON_MAP[iconName] || Sparkles;
  return <Comp className={className} />;
}

function getGradientFromColor(color?: string): string {
  if (!color) return 'from-purple-600 to-cyan-500';
  if (color.includes('7C3AED') || color.includes('8B5CF6')) return 'from-purple-600 to-violet-500';
  if (color.includes('06B6D4')) return 'from-cyan-500 to-teal-500';
  if (color.includes('F59E0B')) return 'from-amber-500 to-orange-500';
  if (color.includes('10B981')) return 'from-emerald-500 to-green-500';
  if (color.includes('3B82F6')) return 'from-blue-500 to-indigo-500';
  if (color.includes('EC4899')) return 'from-pink-500 to-rose-500';
  return 'from-purple-600 to-cyan-500';
}

export function ServiceCard({
  id,
  name,
  nameEn,
  description,
  price,
  priceYER,
  originalPrice,
  badge,
  rating,
  reviewCount,
  deliveryTime,
  categoryColor,
  onOrder,
}: ServiceCardProps) {
  const iconName = getCategoryIconName(nameEn);
  const gradientClass = getGradientFromColor(categoryColor);

  const badgeStyle = badge ? BADGE_STYLES[badge] : null;

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      whileHover={{ scale: 1.02, y: -4 }}
      transition={{ duration: 0.3, ease: 'easeOut' }}
      className="group relative overflow-hidden rounded-xl border border-border bg-card shadow-sm hover:shadow-xl hover:shadow-purple-500/5 transition-shadow duration-300"
    >
      {/* Gradient Header */}
      <div className={`relative h-28 bg-gradient-to-br ${gradientClass} p-4 overflow-hidden`}>
        {/* Background Pattern */}
        <div className="absolute inset-0 opacity-10">
          <div className="absolute top-2 right-4 w-20 h-20 rounded-full border-2 border-white/30" />
          <div className="absolute bottom-1 left-6 w-14 h-14 rounded-full border border-white/20" />
          <div className="absolute top-8 left-16 w-8 h-8 rounded-full bg-white/20" />
        </div>

        {/* Icon */}
        <div className="absolute left-4 bottom-4">
          <div className="w-12 h-12 rounded-lg bg-white/20 backdrop-blur-sm flex items-center justify-center border border-white/20">
            <ServiceIcon iconName={iconName} className="size-6 text-white" />
          </div>
        </div>

        {/* Badge */}
        {badgeStyle && (
          <Badge
            className={`absolute top-3 right-3 ${badgeStyle.className} backdrop-blur-sm`}
          >
            {badgeStyle.label}
          </Badge>
        )}

        {/* Shimmer effect on hover */}
        <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500">
          <div className="absolute inset-0 shimmer" />
        </div>
      </div>

      {/* Content */}
      <div className="p-4 space-y-3">
        {/* Name & Description */}
        <div>
          <h3 className="font-bold text-base text-card-foreground line-clamp-1 group-hover:text-primary transition-colors">
            {name}
          </h3>
          <p className="text-muted-foreground text-sm line-clamp-2 mt-1 leading-relaxed">
            {description}
          </p>
        </div>

        {/* Price */}
        <div className="flex items-center gap-2">
          <span className="text-lg font-bold text-primary">${price}</span>
          {originalPrice && (
            <span className="text-sm text-muted-foreground line-through">
              ${originalPrice}
            </span>
          )}
          {priceYER && (
            <span className="text-xs text-muted-foreground mr-1">
              ({priceYER.toLocaleString('ar-YE')} ر.ي)
            </span>
          )}
        </div>

        {/* Rating & Delivery */}
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-1.5">
            <div className="flex items-center gap-0.5">
              {Array.from({ length: 5 }).map((_, i) => (
                <Star
                  key={i}
                  className={`size-3.5 ${
                    i < Math.floor(rating)
                      ? 'text-amber-400 fill-amber-400'
                      : i < rating
                        ? 'text-amber-400 fill-amber-400/50'
                        : 'text-muted-foreground/30'
                  }`}
                />
              ))}
            </div>
            <span className="text-xs text-muted-foreground">
              {rating} ({reviewCount})
            </span>
          </div>

          {deliveryTime && (
            <div className="flex items-center gap-1 text-xs text-muted-foreground">
              <Clock className="size-3" />
              <span>{deliveryTime}</span>
            </div>
          )}
        </div>

        {/* Order Button */}
        <Button
          onClick={onOrder}
          className="w-full gradient-primary hover:opacity-90 text-white font-medium transition-all duration-300 group-hover:shadow-lg group-hover:shadow-purple-500/20"
          size="sm"
        >
          <ShoppingCart className="size-4 ml-1.5" />
          اطلب الآن
        </Button>
      </div>

      {/* Hover glow effect */}
      <div className="absolute inset-0 rounded-xl opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none glow-purple" />
    </motion.div>
  );
}
