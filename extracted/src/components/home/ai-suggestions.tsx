'use client';

import { motion } from 'framer-motion';
import { Sparkles, Star, Zap } from 'lucide-react';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { FEATURED_SERVICES, BADGE_STYLES } from '@/lib/constants';
import type { AISuggestion } from '@/types';

const AI_SUGGESTIONS: (AISuggestion & { serviceName: string; servicePrice: number; serviceRating: number; serviceBadge: string | null; serviceDelivery: string })[] = [
  {
    serviceId: 'chatgpt-plus',
    reason: 'الأكثر طلباً من عملاء اليمن والسعودية — ضروري للعمل والإنتاجية',
    confidence: 95,
    serviceName: 'ChatGPT Plus',
    servicePrice: 23.99,
    serviceRating: 4.9,
    serviceBadge: 'popular',
    serviceDelivery: '15 دقيقة - 2 ساعة',
  },
  {
    serviceId: 'claude-pro',
    reason: 'عملاء ChatGPT Plus يفضلون Claude Pro أيضاً لكتابة المحتوى والتحليل',
    confidence: 88,
    serviceName: 'Claude Pro',
    servicePrice: 23.99,
    serviceRating: 4.9,
    serviceBadge: 'new',
    serviceDelivery: '15 دقيقة - 2 ساعة',
  },
  {
    serviceId: 'spotify-premium',
    reason: 'خدمة مطلوبة بكثرة — الاستماع بدون إعلانات ميزة يومية أساسية',
    confidence: 82,
    serviceName: 'Spotify Premium',
    servicePrice: 12.99,
    serviceRating: 4.8,
    serviceBadge: 'new',
    serviceDelivery: '15 - 60 دقيقة',
  },
  {
    serviceId: 'youtube-premium',
    reason: 'من يطلب Spotify غالباً يحتاج YouTube Premium أيضاً لمشاهدة بدون إعلانات',
    confidence: 76,
    serviceName: 'YouTube Premium',
    servicePrice: 15.99,
    serviceRating: 4.8,
    serviceBadge: 'new',
    serviceDelivery: '15 - 60 دقيقة',
  },
];

const BADGE_CLASSES: Record<string, string> = {
  popular: 'bg-purple-500/20 text-purple-400 border-purple-500/30',
  new: 'bg-cyan-500/20 text-cyan-400 border-cyan-500/30',
  bestseller: 'bg-amber-500/20 text-amber-400 border-amber-500/30',
  premium: 'bg-emerald-500/20 text-emerald-400 border-emerald-500/30',
  limited: 'bg-red-500/20 text-red-400 border-red-500/30',
};

function getConfidenceColor(confidence: number): string {
  if (confidence >= 90) return 'text-emerald-400';
  if (confidence >= 80) return 'text-cyan-400';
  if (confidence >= 70) return 'text-amber-400';
  return 'text-muted-foreground';
}

function getConfidenceBarColor(confidence: number): string {
  if (confidence >= 90) return 'bg-emerald-500';
  if (confidence >= 80) return 'bg-cyan-500';
  if (confidence >= 70) return 'bg-amber-500';
  return 'bg-muted-foreground';
}

interface AISuggestionsProps {
  onServiceClick?: (serviceId: string) => void;
}

export function AISuggestions({ onServiceClick }: AISuggestionsProps) {
  const handleClick = (serviceId: string) => {
    if (onServiceClick) {
      onServiceClick(serviceId);
    } else {
      window.dispatchEvent(
        new CustomEvent('zynex-order', { detail: { serviceId } })
      );
    }
  };

  return (
    <section className="py-16 px-4">
      <div className="max-w-6xl mx-auto">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="text-center mb-10"
        >
          <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-primary/10 border border-primary/20 mb-4">
            <Sparkles className="size-4 text-primary animate-pulse" />
            <span className="text-xs font-medium text-primary">ذكاء اصطناعي</span>
          </div>
          <h2 className="text-2xl sm:text-3xl font-bold mb-2">
            خدمات موصى بها لك
          </h2>
          <p className="text-muted-foreground text-sm sm:text-base max-w-lg mx-auto">
            بناءً على اهتمامات العملاء في المنطقة، نقترح عليك هذه الخدمات
          </p>
        </motion.div>

        {/* Suggestion Cards */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.1 }}
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4"
        >
          {AI_SUGGESTIONS.map((suggestion, index) => (
            <motion.div
              key={suggestion.serviceId}
              initial={{ opacity: 0, y: 15 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.1 + index * 0.08 }}
              whileHover={{ y: -3, scale: 1.01 }}
              className="group relative rounded-xl border border-border bg-card p-4 cursor-pointer hover:border-purple-500/30 hover:shadow-lg hover:shadow-purple-500/5 transition-all duration-300"
              onClick={() => handleClick(suggestion.serviceId)}
            >
              {/* AI Indicator */}
              <div className="absolute -top-2 -right-2">
                <div className="w-6 h-6 rounded-full gradient-primary flex items-center justify-center shadow-lg">
                  <Sparkles className="size-3 text-white" />
                </div>
              </div>

              {/* Service Name & Badge */}
              <div className="mb-2">
                <div className="flex items-center gap-2 mb-1">
                  <h3 className="font-bold text-sm group-hover:text-primary transition-colors truncate">
                    {suggestion.serviceName}
                  </h3>
                  {suggestion.serviceBadge && (
                    <Badge
                      className={`text-[9px] px-1.5 py-0 shrink-0 ${BADGE_CLASSES[suggestion.serviceBadge] || ''}`}
                    >
                      {BADGE_STYLES[suggestion.serviceBadge]?.label || ''}
                    </Badge>
                  )}
                </div>
              </div>

              {/* AI Reason */}
              <p className="text-xs text-muted-foreground mb-3 leading-relaxed line-clamp-2">
                {suggestion.reason}
              </p>

              {/* Confidence Score */}
              <div className="mb-3">
                <div className="flex items-center justify-between mb-1">
                  <span className="text-[10px] text-muted-foreground">مستوى التوصية</span>
                  <span className={`text-xs font-bold ${getConfidenceColor(suggestion.confidence)}`}>
                    {suggestion.confidence}%
                  </span>
                </div>
                <div className="h-1 rounded-full bg-muted overflow-hidden">
                  <motion.div
                    initial={{ width: 0 }}
                    whileInView={{ width: `${suggestion.confidence}%` }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.8, delay: 0.3 + index * 0.1, ease: 'easeOut' }}
                    className={`h-full rounded-full ${getConfidenceBarColor(suggestion.confidence)}`}
                  />
                </div>
              </div>

              {/* Price, Rating & Delivery */}
              <div className="flex items-center justify-between pt-2 border-t border-border/50">
                <div className="flex flex-col">
                  <span className="font-bold text-sm text-primary">${suggestion.servicePrice}</span>
                  <span className="text-[10px] text-muted-foreground flex items-center gap-1">
                    <Zap className="size-2.5" />
                    {suggestion.serviceDelivery}
                  </span>
                </div>
                <div className="flex items-center gap-1">
                  <Star className="size-3 text-amber-400 fill-amber-400" />
                  <span className="text-xs text-muted-foreground">{suggestion.serviceRating}</span>
                </div>
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
