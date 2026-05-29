'use client';

import { motion } from 'framer-motion';
import {
  Smartphone,
  Brain,
  Gamepad2,
  BadgeCheck,
  Send,
  Users,
  Globe,
  type LucideIcon,
} from 'lucide-react';
import { Card, CardContent } from '@/components/ui/card';
import { SERVICE_CATEGORIES } from '@/lib/constants';

const iconMap: Record<string, LucideIcon> = {
  Smartphone,
  Brain,
  Gamepad2,
  BadgeCheck,
  Send,
  Users,
  Globe,
};

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1,
      delayChildren: 0.2,
    },
  },
};

const cardVariants = {
  hidden: { opacity: 0, y: 30 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.5, ease: 'easeOut' },
  },
};

export function ServicesSection() {
  return (
    <section className="py-20 relative">
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
            <span className="gradient-text">خدماتنا المتميزة</span>
          </h2>
          <p className="text-muted-foreground text-lg max-w-xl mx-auto">
            نقدم لك مجموعة واسعة من الخدمات الرقمية المتميزة بأعلى جودة وأفضل الأسعار
          </p>
        </motion.div>

        {/* Categories Grid */}
        <motion.div
          className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-7 gap-4"
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: '-50px' }}
        >
          {SERVICE_CATEGORIES.map((category) => {
            const IconComponent = iconMap[category.icon];
            return (
              <motion.div key={category.id} variants={cardVariants}>
                <motion.div
                  whileHover={{ scale: 1.05, y: -4 }}
                  transition={{ type: 'spring', stiffness: 300, damping: 20 }}
                >
                  <Card className="group relative overflow-hidden cursor-pointer border-border/50 bg-card/50 hover:border-transparent transition-all duration-300 h-full">
                    {/* Hover gradient overlay */}
                    <div
                      className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300 rounded-xl"
                      style={{
                        background: `linear-gradient(135deg, ${category.color}15 0%, ${category.color}05 100%)`,
                      }}
                    />
                    {/* Hover glow border */}
                    <div
                      className="absolute inset-0 rounded-xl opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                      style={{
                        boxShadow: `0 0 20px ${category.color}20, inset 0 0 20px ${category.color}05`,
                      }}
                    />

                    <CardContent className="relative z-10 p-5 flex flex-col items-center text-center gap-3">
                      <div
                        className="p-3 rounded-xl transition-all duration-300 group-hover:scale-110"
                        style={{
                          backgroundColor: `${category.color}15`,
                        }}
                      >
                        {IconComponent && (
                          <IconComponent
                            className="size-7 transition-colors duration-300"
                            style={{ color: category.color }}
                          />
                        )}
                      </div>
                      <h3 className="font-semibold text-sm leading-tight text-foreground">
                        {category.name}
                      </h3>
                      <p className="text-xs text-muted-foreground leading-relaxed line-clamp-2">
                        {category.description}
                      </p>
                      <span
                        className="text-[11px] font-medium px-2.5 py-1 rounded-full"
                        style={{
                          backgroundColor: `${category.color}15`,
                          color: category.color,
                        }}
                      >
                        {/* Service count is not in the constant, show a dynamic label */}
                        اكتشف المزيد
                      </span>
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
