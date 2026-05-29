'use client';

import { motion } from 'framer-motion';
import { ArrowLeft, MessageCircle, Rocket } from 'lucide-react';
import { Button } from '@/components/ui/button';

export function CtaSection() {
  return (
    <section className="py-20 relative overflow-hidden">
      <div className="container mx-auto px-4">
        <motion.div
          className="relative rounded-3xl overflow-hidden"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-50px' }}
          transition={{ duration: 0.6 }}
        >
          {/* Animated gradient background */}
          <div className="absolute inset-0 gradient-primary animate-gradient" />

          {/* Decorative orbs */}
          <div className="absolute -top-20 -right-20 w-64 h-64 rounded-full opacity-20 blur-2xl bg-white/10" />
          <div className="absolute -bottom-20 -left-20 w-64 h-64 rounded-full opacity-20 blur-2xl bg-white/10" />
          <motion.div
            className="absolute top-1/2 left-1/4 w-32 h-32 rounded-full opacity-10 blur-xl bg-white"
            animate={{
              scale: [1, 1.3, 1],
              x: [0, 20, 0],
              y: [0, -10, 0],
            }}
            transition={{ duration: 6, repeat: Infinity, ease: 'easeInOut' }}
          />

          {/* Grid pattern */}
          <div
            className="absolute inset-0 opacity-[0.05]"
            style={{
              backgroundImage:
                'linear-gradient(rgba(255,255,255,0.3) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.3) 1px, transparent 1px)',
              backgroundSize: '40px 40px',
            }}
          />

          {/* Content */}
          <div className="relative z-10 px-6 py-16 sm:px-12 sm:py-20 text-center">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.2, duration: 0.5 }}
              className="mb-4"
            >
              <span className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/10 text-white/90 text-sm font-medium backdrop-blur-sm">
                <Rocket className="size-4" />
                ابدأ رحلتك الآن
              </span>
            </motion.div>

            <motion.h2
              className="text-3xl sm:text-4xl lg:text-5xl font-bold text-white mb-6 leading-tight"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.3, duration: 0.5 }}
            >
              جاهز لبدء رحلتك الرقمية؟
            </motion.h2>

            <motion.p
              className="text-lg sm:text-xl text-white/80 max-w-xl mx-auto mb-10 leading-relaxed"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.4, duration: 0.5 }}
            >
              انضم لأكثر من 8,500 عميل يثقون بنا
            </motion.p>

            <motion.div
              className="flex flex-col sm:flex-row items-center justify-center gap-4"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.5, duration: 0.5 }}
            >
              <Button
                size="lg"
                className="bg-white text-purple-700 font-semibold px-8 py-6 text-base rounded-xl hover:bg-white/90 shadow-lg shadow-black/20 gap-2"
              >
                ابدأ الآن
                <ArrowLeft className="size-5" />
              </Button>
              <Button
                size="lg"
                variant="outline"
                className="px-8 py-6 text-base rounded-xl border-white/30 text-white hover:bg-white/10 hover:text-white transition-all gap-2"
              >
                <MessageCircle className="size-5" />
                تواصل معنا
              </Button>
            </motion.div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
