'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import {
  Send,
  CreditCard,
  Wallet,
  Smartphone,
  Globe,
  Mail,
  MapPin,
  Phone,
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Separator } from '@/components/ui/separator';

const quickLinks = [
  { label: 'الرئيسية', href: '#home' },
  { label: 'الخدمات', href: '#services' },
  { label: 'الأقسام', href: '#categories' },
  { label: 'المدونة', href: '#blog' },
];

const serviceCategories = [
  { label: 'اشتراكات التطبيقات', href: '#' },
  { label: 'خدمات الذكاء الاصطناعي', href: '#' },
  { label: 'توثيق الحسابات', href: '#' },
  { label: 'خدمات تليجرام', href: '#' },
  { label: 'خدمات السوشيال ميديا', href: '#' },
  { label: 'خدمات التصميم', href: '#' },
];

const paymentMethods = [
  { label: 'فلوسك', icon: Wallet },
  { label: 'جيب', icon: Smartphone },
  { label: 'باي سيرف', icon: CreditCard },
  { label: 'فيزا', icon: CreditCard },
  { label: 'ماستركارد', icon: CreditCard },
  { label: 'PayPal', icon: Globe },
];

const socialLinks = [
  {
    label: 'تليجرام',
    href: '#',
    icon: (
      <svg className="h-5 w-5" fill="currentColor" viewBox="0 0 24 24">
        <path d="M11.944 0A12 12 0 0 0 0 12a12 12 0 0 0 12 12 12 12 0 0 0 12-12A12 12 0 0 0 12 0a12 12 0 0 0-.056 0zm4.962 7.224c.1-.002.321.023.465.14a.506.506 0 0 1 .171.325c.016.093.036.306.02.472-.18 1.898-.962 6.502-1.36 8.627-.168.9-.499 1.201-.82 1.23-.696.065-1.225-.46-1.9-.902-1.056-.693-1.653-1.124-2.678-1.8-1.185-.78-.417-1.21.258-1.91.177-.184 3.247-2.977 3.307-3.23.007-.032.014-.15-.056-.212s-.174-.041-.249-.024c-.106.024-1.793 1.14-5.061 3.345-.479.33-.913.49-1.302.48-.428-.008-1.252-.241-1.865-.44-.752-.245-1.349-.374-1.297-.789.027-.216.325-.437.893-.663 3.498-1.524 5.83-2.529 6.998-3.014 3.332-1.386 4.025-1.627 4.476-1.635z" />
      </svg>
    ),
  },
  {
    label: 'واتساب',
    href: '#',
    icon: (
      <svg className="h-5 w-5" fill="currentColor" viewBox="0 0 24 24">
        <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 0 1-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 0 1-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 0 1 2.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0 0 12.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 0 0 5.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 0 0-3.48-8.413z" />
      </svg>
    ),
  },
  {
    label: 'إنستجرام',
    href: '#',
    icon: (
      <svg className="h-5 w-5" fill="currentColor" viewBox="0 0 24 24">
        <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zM12 0C8.741 0 8.333.014 7.053.072 2.695.272.273 2.69.073 7.052.014 8.333 0 8.741 0 12c0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98C8.333 23.986 8.741 24 12 24c3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98C15.668.014 15.259 0 12 0zm0 5.838a6.162 6.162 0 1 0 0 12.324 6.162 6.162 0 0 0 0-12.324zM12 16a4 4 0 1 1 0-8 4 4 0 0 1 0 8zm6.406-11.845a1.44 1.44 0 1 0 0 2.881 1.44 1.44 0 0 0 0-2.881z" />
      </svg>
    ),
  },
  {
    label: 'تيك توك',
    href: '#',
    icon: (
      <svg className="h-5 w-5" fill="currentColor" viewBox="0 0 24 24">
        <path d="M12.525.02c1.31-.02 2.61-.01 3.91-.02.08 1.53.63 3.09 1.75 4.17 1.12 1.11 2.7 1.62 4.24 1.79v4.03c-1.44-.05-2.89-.35-4.2-.97-.57-.26-1.1-.59-1.62-.93-.01 2.92.01 5.84-.02 8.75-.08 1.4-.54 2.79-1.35 3.94-1.31 1.92-3.58 3.17-5.91 3.21-1.43.08-2.86-.31-4.08-1.03-2.02-1.19-3.44-3.37-3.65-5.71-.02-.5-.03-1-.01-1.49.18-1.9 1.12-3.72 2.58-4.96 1.66-1.44 3.98-2.13 6.15-1.72.02 1.48-.04 2.96-.04 4.44-.99-.32-2.15-.23-3.02.37-.63.41-1.11 1.04-1.36 1.75-.21.51-.15 1.07-.14 1.61.24 1.64 1.82 3.02 3.5 2.87 1.12-.01 2.19-.66 2.77-1.61.19-.33.4-.67.41-1.06.1-1.79.06-3.57.07-5.36.01-4.03-.01-8.05.02-12.07z" />
      </svg>
    ),
  },
  {
    label: 'يوتيوب',
    href: '#',
    icon: (
      <svg className="h-5 w-5" fill="currentColor" viewBox="0 0 24 24">
        <path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z" />
      </svg>
    ),
  },
];

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1,
    },
  },
};

const itemVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0 },
};

export function Footer() {
  const [email, setEmail] = useState('');
  const [subscribed, setSubscribed] = useState(false);

  const handleSubscribe = (e: React.FormEvent) => {
    e.preventDefault();
    if (email) {
      setSubscribed(true);
      setEmail('');
      setTimeout(() => setSubscribed(false), 3000);
    }
  };

  const handleNavClick = (href: string) => {
    if (href.startsWith('#')) {
      const el = document.querySelector(href);
      if (el) {
        el.scrollIntoView({ behavior: 'smooth' });
      }
    }
  };

  return (
    <footer className="relative bg-[#0A0A0F] text-gray-300 overflow-hidden">
      {/* Top gradient line */}
      <div
        className="h-[2px] w-full"
        style={{
          background: 'linear-gradient(to left, #7C3AED, #06B6D4, #10B981)',
        }}
      />

      {/* Background decorative elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute -top-40 -right-40 w-80 h-80 rounded-full bg-zynex-purple/5 blur-3xl" />
        <div className="absolute -bottom-40 -left-40 w-80 h-80 rounded-full bg-zynex-cyan/5 blur-3xl" />
      </div>

      <motion.div
        className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 pt-12 pb-8"
        variants={containerVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.1 }}
      >
        {/* Main Footer Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 lg:gap-12">
          {/* Brand & Description */}
          <motion.div variants={itemVariants} className="sm:col-span-2 lg:col-span-1">
            <div className="flex items-center gap-3 mb-4">
              <div className="h-10 w-10 overflow-hidden rounded-xl">
                <img
                  src="/logo.svg"
                  alt="Zynex Store"
                  className="h-full w-full object-contain"
                />
              </div>
              <div>
                <h3 className="text-xl font-bold gradient-text">Zynex Store</h3>
                <p className="text-xs text-gray-500">متجرك الأول للخدمات الرقمية</p>
              </div>
            </div>
            <p className="text-sm text-gray-400 leading-relaxed mb-5">
              منصة متكاملة تقدم لك أفضل الخدمات الرقمية بأسعار تنافسية.
              اشتراكات التطبيقات، خدمات الذكاء الاصطناعي، توثيق الحسابات،
              والمزيد من الخدمات المميزة.
            </p>
            <div className="flex flex-col gap-2 text-sm">
              <a
                href="mailto:support@zynexstore.com"
                className="flex items-center gap-2 text-gray-400 hover:text-zynex-purple transition-colors"
              >
                <Mail className="h-4 w-4" />
                support@zynexstore.com
              </a>
              <a
                href="tel:+967771234567"
                className="flex items-center gap-2 text-gray-400 hover:text-zynex-cyan transition-colors"
              >
                <Phone className="h-4 w-4" />
                +967 771 234 567
              </a>
              <span className="flex items-center gap-2 text-gray-400">
                <MapPin className="h-4 w-4" />
                صنعاء، اليمن
              </span>
            </div>
          </motion.div>

          {/* Quick Links */}
          <motion.div variants={itemVariants}>
            <h4 className="text-white font-semibold mb-4 text-base">
              روابط سريعة
            </h4>
            <ul className="space-y-2.5">
              {quickLinks.map((link) => (
                <li key={link.label}>
                  <button
                    onClick={() => handleNavClick(link.href)}
                    className="text-sm text-gray-400 hover:text-zynex-purple transition-colors hover:translate-x-1 inline-block duration-200"
                  >
                    {link.label}
                  </button>
                </li>
              ))}
            </ul>
          </motion.div>

          {/* Service Categories */}
          <motion.div variants={itemVariants}>
            <h4 className="text-white font-semibold mb-4 text-base">
              أقسام الخدمات
            </h4>
            <ul className="space-y-2.5">
              {serviceCategories.map((link) => (
                <li key={link.label}>
                  <a
                    href={link.href}
                    className="text-sm text-gray-400 hover:text-zynex-cyan transition-colors hover:translate-x-1 inline-block duration-200"
                  >
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>
          </motion.div>

          {/* Newsletter */}
          <motion.div variants={itemVariants}>
            <h4 className="text-white font-semibold mb-4 text-base">
              النشرة البريدية
            </h4>
            <p className="text-sm text-gray-400 mb-4">
              اشترك ليصلك كل جديد من العروض والخدمات
            </p>
            <form onSubmit={handleSubscribe} className="flex gap-2">
              <Input
                type="email"
                placeholder="بريدك الإلكتروني"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="h-10 bg-white/5 border-white/10 text-gray-300 placeholder:text-gray-500 focus-visible:border-zynex-purple focus-visible:ring-zynex-purple/30"
                required
                dir="ltr"
              />
              <Button
                type="submit"
                size="icon"
                className="h-10 w-10 shrink-0 gradient-primary border-0 hover:opacity-90"
              >
                <Send className="h-4 w-4" />
              </Button>
            </form>
            {subscribed && (
              <motion.p
                initial={{ opacity: 0, y: 5 }}
                animate={{ opacity: 1, y: 0 }}
                className="text-xs text-zynex-green mt-2"
              >
                تم الاشتراك بنجاح! شكرًا لك
              </motion.p>
            )}

            {/* Social Media */}
            <div className="mt-6">
              <h5 className="text-sm text-gray-300 font-medium mb-3">
                تابعنا على
              </h5>
              <div className="flex items-center gap-2">
                {socialLinks.map((social) => (
                  <motion.a
                    key={social.label}
                    href={social.href}
                    whileHover={{ scale: 1.15, y: -2 }}
                    whileTap={{ scale: 0.95 }}
                    className="flex h-9 w-9 items-center justify-center rounded-lg bg-white/5 text-gray-400 hover:text-white hover:bg-zynex-purple/20 transition-colors"
                    aria-label={social.label}
                  >
                    {social.icon}
                  </motion.a>
                ))}
              </div>
            </div>
          </motion.div>
        </div>

        {/* Payment Methods */}
        <motion.div variants={itemVariants} className="mt-10">
          <Separator className="bg-white/5 mb-8" />
          <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
            <div>
              <h5 className="text-sm text-gray-300 font-medium mb-3 text-center sm:text-right">
                طرق الدفع المتاحة
              </h5>
              <div className="flex flex-wrap items-center justify-center sm:justify-start gap-2">
                {paymentMethods.map((method) => (
                  <div
                    key={method.label}
                    className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-white/5 border border-white/5 text-xs text-gray-400 hover:border-zynex-purple/30 hover:text-gray-300 transition-colors"
                  >
                    <method.icon className="h-3.5 w-3.5" />
                    <span>{method.label}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </motion.div>

        {/* Copyright */}
        <motion.div variants={itemVariants} className="mt-8">
          <Separator className="bg-white/5 mb-6" />
          <div className="flex flex-col sm:flex-row items-center justify-between gap-3 text-xs text-gray-500">
            <p>
              © {new Date().getFullYear()} Zynex Store. جميع الحقوق محفوظة.
            </p>
            <div className="flex items-center gap-4">
              <a href="#" className="hover:text-gray-300 transition-colors">
                سياسة الخصوصية
              </a>
              <a href="#" className="hover:text-gray-300 transition-colors">
                شروط الاستخدام
              </a>
              <a href="#" className="hover:text-gray-300 transition-colors">
                سياسة الاسترجاع
              </a>
            </div>
          </div>
        </motion.div>
      </motion.div>
    </footer>
  );
}
