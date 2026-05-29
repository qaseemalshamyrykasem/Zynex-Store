'use client';

import { useEffect, useRef, useState } from 'react';
import { motion, useInView } from 'framer-motion';
import { ShoppingBag, Users, Package, ThumbsUp } from 'lucide-react';
import { SITE_STATS } from '@/lib/constants';

interface StatItem {
  value: number;
  suffix: string;
  label: string;
  icon: typeof ShoppingBag;
}

const stats: StatItem[] = [
  {
    value: SITE_STATS.totalOrders,
    suffix: '+',
    label: 'طلب مكتمل',
    icon: ShoppingBag,
  },
  {
    value: SITE_STATS.totalCustomers,
    suffix: '+',
    label: 'عميل سعيد',
    icon: Users,
  },
  {
    value: SITE_STATS.totalServices,
    suffix: '+',
    label: 'خدمة متوفرة',
    icon: Package,
  },
  {
    value: SITE_STATS.satisfactionRate,
    suffix: '%',
    label: 'نسبة الرضا',
    icon: ThumbsUp,
  },
];

function AnimatedCounter({
  value,
  suffix,
  duration = 2,
}: {
  value: number;
  suffix: string;
  duration?: number;
}) {
  const [count, setCount] = useState(0);
  const ref = useRef<HTMLSpanElement>(null);
  const isInView = useInView(ref, { once: true, margin: '-50px' });

  useEffect(() => {
    if (!isInView) return;

    let start = 0;
    const end = value;
    const incrementTime = (duration * 1000) / end;
    const step = Math.max(1, Math.floor(end / 100));

    const timer = setInterval(() => {
      start += step;
      if (start >= end) {
        setCount(end);
        clearInterval(timer);
      } else {
        setCount(start);
      }
    }, incrementTime * step);

    return () => clearInterval(timer);
  }, [isInView, value, duration]);

  const formatNumber = (num: number) => {
    return num.toLocaleString('en-US');
  };

  return (
    <span ref={ref} className="tabular-nums">
      {formatNumber(count)}
      {suffix}
    </span>
  );
}

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.15,
      delayChildren: 0.2,
    },
  },
};

const itemVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.5, ease: 'easeOut' },
  },
};

export function StatsSection() {
  return (
    <section className="py-20 relative overflow-hidden">
      {/* Gradient background */}
      <div className="absolute inset-0 gradient-primary opacity-[0.06] animate-gradient" />
      <div
        className="absolute inset-0 opacity-[0.03]"
        style={{
          backgroundImage:
            'radial-gradient(circle at 1px 1px, rgba(124,58,237,0.4) 1px, transparent 0)',
          backgroundSize: '40px 40px',
        }}
      />

      <div className="container mx-auto px-4 relative z-10">
        <motion.div
          className="grid grid-cols-2 lg:grid-cols-4 gap-6"
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: '-50px' }}
        >
          {stats.map((stat) => (
            <motion.div
              key={stat.label}
              variants={itemVariants}
              className="glass-card rounded-2xl p-6 sm:p-8 text-center group hover:glow-purple transition-all duration-300"
            >
              <div className="inline-flex items-center justify-center p-3 rounded-xl bg-purple-500/10 mb-4 group-hover:scale-110 transition-transform duration-300">
                <stat.icon className="size-6 text-purple-400" />
              </div>
              <div className="text-3xl sm:text-4xl font-bold text-foreground mb-2">
                <AnimatedCounter value={stat.value} suffix={stat.suffix} />
              </div>
              <p className="text-muted-foreground text-sm font-medium">
                {stat.label}
              </p>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
