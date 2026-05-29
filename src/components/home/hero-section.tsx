'use client';

import { motion } from 'framer-motion';
import { ArrowLeft, Sparkles, ShoppingBag, Users, Package, Shield, Zap } from 'lucide-react';
import { Button } from '@/components/ui/button';

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.12,
      delayChildren: 0.15,
    },
  },
};

const itemVariants = {
  hidden: { opacity: 0, y: 30 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.5, ease: 'easeOut' },
  },
};

const stats = [
  { value: '2,840+', label: 'طلب مكتمل', icon: ShoppingBag },
  { value: '1,560+', label: 'عميل', icon: Users },
  { value: '130+', label: 'خدمة', icon: Package },
];

const trustBadges = [
  { icon: Shield, text: 'ضمان الاسترداد' },
  { icon: Zap, text: 'تسليم سريع' },
  { icon: Users, text: 'دعم 24/7' },
];

export function HeroSection() {
  const scrollToServices = () => {
    const el = document.getElementById('popular');
    if (el) {
      el.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  };

  const scrollToFeatures = () => {
    const el = document.getElementById('features');
    if (el) {
      el.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  };

  return (
    <section id="home" className="relative min-h-[85vh] flex items-center justify-center overflow-hidden">
      {/* Animated gradient orbs */}
      <div className="absolute inset-0 overflow-hidden">
        <motion.div
          className="absolute -top-40 -right-40 w-[500px] h-[500px] rounded-full opacity-15 blur-[100px]"
          style={{ background: 'radial-gradient(circle, #7C3AED 0%, transparent 70%)' }}
          animate={{
            scale: [1, 1.2, 1],
            x: [0, 30, 0],
            y: [0, -20, 0],
          }}
          transition={{ duration: 8, repeat: Infinity, ease: 'easeInOut' }}
        />
        <motion.div
          className="absolute -bottom-40 -left-40 w-[500px] h-[500px] rounded-full opacity-15 blur-[100px]"
          style={{ background: 'radial-gradient(circle, #06B6D4 0%, transparent 70%)' }}
          animate={{
            scale: [1.2, 1, 1.2],
            x: [0, -30, 0],
            y: [0, 20, 0],
          }}
          transition={{ duration: 10, repeat: Infinity, ease: 'easeInOut' }}
        />
        <motion.div
          className="absolute top-1/3 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[400px] h-[400px] rounded-full opacity-8 blur-[80px]"
          style={{ background: 'radial-gradient(circle, #10B981 0%, transparent 70%)' }}
          animate={{ scale: [1, 1.15, 1] }}
          transition={{ duration: 12, repeat: Infinity, ease: 'easeInOut' }}
        />
      </div>

      {/* Subtle grid pattern */}
      <div
        className="absolute inset-0 opacity-[0.02]"
        style={{
          backgroundImage:
            'linear-gradient(rgba(124,58,237,0.3) 1px, transparent 1px), linear-gradient(90deg, rgba(124,58,237,0.3) 1px, transparent 1px)',
          backgroundSize: '60px 60px',
        }}
      />

      {/* Content */}
      <motion.div
        className="relative z-10 container mx-auto px-4 text-center"
        variants={containerVariants}
        initial="hidden"
        animate="visible"
      >
        {/* Badge */}
        <motion.div variants={itemVariants} className="mb-6">
          <span className="inline-flex items-center gap-2 px-4 py-2 rounded-full glass-card text-sm font-medium text-purple-400">
            <Sparkles className="size-4 animate-pulse" />
            المنصة الأولى للخدمات الرقمية في اليمن
          </span>
        </motion.div>

        {/* Headline */}
        <motion.h1
          variants={itemVariants}
          className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold leading-tight mb-6"
        >
          <span className="gradient-text">متجرك الأول</span>
          <br />
          <span className="text-foreground">للخدمات الرقمية</span>
        </motion.h1>

        {/* Subheadline */}
        <motion.p
          variants={itemVariants}
          className="text-lg sm:text-xl text-muted-foreground max-w-2xl mx-auto mb-8 leading-relaxed"
        >
          اشتراكات التطبيقات والذكاء الاصطناعي — خدمات تليجرام والسوشيال ميديا — كل هذا في مكان واحد
        </motion.p>

        {/* Trust Badges */}
        <motion.div
          variants={itemVariants}
          className="flex flex-wrap items-center justify-center gap-4 mb-8"
        >
          {trustBadges.map((badge) => (
            <div key={badge.text} className="flex items-center gap-2 text-sm text-muted-foreground">
              <badge.icon className="size-4 text-emerald-400" />
              <span>{badge.text}</span>
            </div>
          ))}
        </motion.div>

        {/* CTA Buttons */}
        <motion.div
          variants={itemVariants}
          className="flex flex-col sm:flex-row items-center justify-center gap-3 mb-14"
        >
          <Button
            size="lg"
            onClick={scrollToServices}
            className="gradient-primary text-white font-semibold px-8 py-6 text-base rounded-xl glow-purple hover:opacity-90 transition-opacity"
          >
            <ShoppingBag className="size-5 ml-2" />
            تصفح الخدمات
          </Button>
          <Button
            variant="outline"
            size="lg"
            onClick={scrollToFeatures}
            className="px-8 py-6 text-base rounded-xl border-purple-500/30 hover:bg-purple-500/10 hover:text-purple-400 transition-all"
          >
            لماذا Zynex؟
            <ArrowLeft className="size-5 mr-2" />
          </Button>
        </motion.div>

        {/* Stats Counter */}
        <motion.div
          variants={itemVariants}
          className="flex flex-col sm:flex-row items-center justify-center gap-6 sm:gap-12"
        >
          {stats.map((stat, index) => (
            <motion.div
              key={stat.label}
              className="flex items-center gap-3"
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.6 + index * 0.12, duration: 0.4 }}
            >
              <div className="p-2 rounded-lg glass-card">
                <stat.icon className="size-4 text-purple-400" />
              </div>
              <div className="text-right">
                <div className="text-xl sm:text-2xl font-bold text-foreground">{stat.value}</div>
                <div className="text-xs text-muted-foreground">{stat.label}</div>
              </div>
              {index < stats.length - 1 && (
                <div className="hidden sm:block w-px h-8 bg-border/50 mr-8" />
              )}
            </motion.div>
          ))}
        </motion.div>
      </motion.div>
    </section>
  );
}
