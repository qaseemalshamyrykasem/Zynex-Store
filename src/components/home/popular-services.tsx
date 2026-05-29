'use client';

import { motion } from 'framer-motion';
import { Star, Clock, ShoppingCart, Zap } from 'lucide-react';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { FEATURED_SERVICES, BADGE_STYLES } from '@/lib/constants';

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.06,
      delayChildren: 0.1,
    },
  },
};

const cardVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.4, ease: 'easeOut' },
  },
};

interface PopularServicesProps {
  onOrder?: (serviceId: string) => void;
}

export function PopularServices({ onOrder }: PopularServicesProps) {
  const handleOrder = (serviceId: string) => {
    if (onOrder) {
      onOrder(serviceId);
    } else {
      // Dispatch custom event for order
      window.dispatchEvent(
        new CustomEvent('zynex-order', { detail: { serviceId } })
      );
    }
  };

  return (
    <section id="popular" className="py-20 relative">
      <div className="container mx-auto px-4">
        {/* Section Title */}
        <motion.div
          className="text-center mb-14"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-100px' }}
          transition={{ duration: 0.5 }}
        >
          <h2 className="text-3xl sm:text-4xl font-bold mb-4">
            <span className="gradient-text">الأكثر طلباً</span>
          </h2>
          <p className="text-muted-foreground text-lg max-w-xl mx-auto">
            اكتشف أكثر الخدمات طلباً من عملائنا — تسليم سريع وأسعار تنافسية
          </p>
        </motion.div>

        {/* Services Grid */}
        <motion.div
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5"
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: '-50px' }}
        >
          {FEATURED_SERVICES.map((service) => {
            const badgeStyle = service.badge ? BADGE_STYLES[service.badge] : null;
            const savings = service.originalPrice
              ? Math.round(((service.originalPrice - service.price) / service.originalPrice) * 100)
              : null;
            // If our price is higher than original, show markup info instead
            const isMarkup = service.originalPrice && service.price > service.originalPrice;

            return (
              <motion.div key={service.id} variants={cardVariants}>
                <motion.div
                  whileHover={{ y: -4 }}
                  transition={{ type: 'spring', stiffness: 300, damping: 25 }}
                >
                  <Card className="group relative overflow-hidden border-border/50 bg-card/50 hover:border-purple-500/30 transition-all duration-300 h-full">
                    {/* Top gradient line */}
                    <div className="absolute top-0 right-0 left-0 h-[2px] gradient-primary opacity-0 group-hover:opacity-100 transition-opacity duration-300" />

                    <CardContent className="p-5 flex flex-col gap-3">
                      {/* Header: Badge + Rating */}
                      <div className="flex items-center justify-between">
                        {badgeStyle ? (
                          <Badge
                            variant="outline"
                            className={`text-[11px] px-2 py-0.5 ${badgeStyle.className}`}
                          >
                            {badgeStyle.label}
                          </Badge>
                        ) : (
                          <div />
                        )}
                        <div className="flex items-center gap-1">
                          <Star className="size-3.5 fill-amber-400 text-amber-400" />
                          <span className="text-sm font-semibold text-foreground">
                            {service.rating}
                          </span>
                          <span className="text-xs text-muted-foreground">
                            ({service.reviewCount})
                          </span>
                        </div>
                      </div>

                      {/* Service Name */}
                      <h3 className="font-bold text-base text-foreground leading-tight">
                        {service.name}
                      </h3>

                      {/* Description */}
                      <p className="text-sm text-muted-foreground leading-relaxed line-clamp-2">
                        {service.description}
                      </p>

                      {/* Delivery Time */}
                      <div className="flex items-center gap-2 text-xs text-muted-foreground">
                        <Clock className="size-3.5 text-cyan-400" />
                        <span>التسليم: {service.deliveryTime}</span>
                      </div>

                      {/* Price */}
                      <div className="flex items-center justify-between mt-auto pt-2 border-t border-border/50">
                        <div className="flex items-center gap-2">
                          <span className="text-xl font-bold text-foreground">
                            ${service.price}
                          </span>
                          {service.originalPrice && (
                            <span className="text-xs text-muted-foreground line-through">
                              ${service.originalPrice}
                            </span>
                          )}
                        </div>
                        {service.priceYER && (
                          <span className="text-[11px] text-muted-foreground">
                            {service.priceYER.toLocaleString('ar-YE')} ر.ي
                          </span>
                        )}
                      </div>

                      {/* CTA Button */}
                      <Button
                        onClick={() => handleOrder(service.id)}
                        className="w-full gradient-primary text-white font-semibold rounded-lg hover:opacity-90 transition-opacity gap-2 h-10"
                        size="default"
                      >
                        <ShoppingCart className="size-4" />
                        اطلب الآن
                      </Button>
                    </CardContent>
                  </Card>
                </motion.div>
              </motion.div>
            );
          })}
        </motion.div>
      </div>
    </section>
  );
}
