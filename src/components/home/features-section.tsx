'use client';

import { motion } from 'framer-motion';
import {
  Wallet,
  Zap,
  Shield,
  Headphones,
  TrendingUp,
  Lock,
  type LucideIcon,
} from 'lucide-react';
import { Card, CardContent } from '@/components/ui/card';

interface Feature {
  icon: LucideIcon;
  title: string;
  description: string;
  color: string;
}

const features: Feature[] = [
  {
    icon: Wallet,
    title: 'الدفع المحلي',
    description:
      'ندعم جميع المحافظ اليمنية مثل جيب وجوالي وفلوسك وOneCash — ادفع بالطريقة التي تناسبك',
    color: '#10B981',
  },
  {
    icon: Zap,
    title: 'التسليم السريع',
    description:
      'تسليم فوري أو خلال ساعات قليلة لمعظم خدماتنا — لا تنتظر طويلاً للحصول على ما تريد',
    color: '#F59E0B',
  },
  {
    icon: Shield,
    title: 'ضمان كامل',
    description:
      'جميع خدماتنا مضمونة 100% — استرداد كامل في حال عدم التسليم أو وجود أي مشكلة',
    color: '#7C3AED',
  },
  {
    icon: Headphones,
    title: 'دعم 24/7',
    description:
      'فريق دعم فني متاح على مدار الساعة — نحن هنا لمساعدتك في أي وقت تحتاجنا',
    color: '#06B6D4',
  },
  {
    icon: TrendingUp,
    title: 'أسعار تنافسية',
    description:
      'نقدم أفضل الأسعار في السوق مع عروض وخصومات مستمرة — وفر أكثر مع Zynex Store',
    color: '#EC4899',
  },
  {
    icon: Lock,
    title: 'أمان متقدم',
    description:
      'حماية كاملة لبياناتك ومعاملاتك بتشفير متقدم — خصوصيتك وأمانك أولويتنا القصوى',
    color: '#8B5CF6',
  },
];

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1,
      delayChildren: 0.15,
    },
  },
};

const cardVariants = {
  hidden: { opacity: 0, y: 25 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.5, ease: 'easeOut' },
  },
};

export function FeaturesSection() {
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
            لماذا <span className="gradient-text">Zynex Store</span>؟
          </h2>
          <p className="text-muted-foreground text-lg max-w-xl mx-auto">
            نقدم لك تجربة فريدة ومتكاملة مع ضمان الجودة والأمان في كل معاملة
          </p>
        </motion.div>

        {/* Features Grid */}
        <motion.div
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5"
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: '-50px' }}
        >
          {features.map((feature) => (
            <motion.div key={feature.title} variants={cardVariants}>
              <motion.div
                whileHover={{ y: -4 }}
                transition={{ type: 'spring', stiffness: 300, damping: 20 }}
              >
                <Card className="group glass-card border-border/30 hover:border-transparent transition-all duration-300 h-full overflow-hidden relative">
                  {/* Hover glow effect */}
                  <div
                    className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500"
                    style={{
                      boxShadow: `0 0 30px ${feature.color}15, inset 0 0 30px ${feature.color}05`,
                    }}
                  />
                  {/* Top accent line */}
                  <div
                    className="absolute top-0 right-0 left-0 h-0.5 opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                    style={{
                      background: `linear-gradient(90deg, transparent, ${feature.color}, transparent)`,
                    }}
                  />

                  <CardContent className="relative z-10 p-6 flex flex-col gap-4">
                    <div
                      className="p-3 rounded-xl w-fit transition-transform duration-300 group-hover:scale-110"
                      style={{ backgroundColor: `${feature.color}15` }}
                    >
                      <feature.icon
                        className="size-6"
                        style={{ color: feature.color }}
                      />
                    </div>
                    <h3 className="font-bold text-lg text-foreground">
                      {feature.title}
                    </h3>
                    <p className="text-sm text-muted-foreground leading-relaxed">
                      {feature.description}
                    </p>
                  </CardContent>
                </Card>
              </motion.div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
