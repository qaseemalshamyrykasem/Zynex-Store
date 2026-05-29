'use client';

import { useState, useEffect, useSyncExternalStore } from 'react';
import { useTheme } from 'next-themes';
import { motion, AnimatePresence } from 'framer-motion';
import {
  Search,
  Bell,
  Sun,
  Moon,
  Menu,
  User,
  ShoppingCart,
  LogOut,
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from '@/components/ui/sheet';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import { useAppStore, useAuthStore } from '@/store';

const navLinks = [
  { label: 'الرئيسية', href: '#home' },
  { label: 'الخدمات', href: '#services' },
  { label: 'الأقسام', href: '#categories' },
  { label: 'تواصل معنا', href: '#contact' },
];

export function Header() {
  const [scrolled, setScrolled] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const mounted = useSyncExternalStore(
    () => () => {},
    () => true,
    () => false
  );
  const { theme, setTheme } = useTheme();
  const { setAuthModalOpen } = useAppStore();
  const { isAuthenticated, user, logout } = useAuthStore();

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 10);
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleNavClick = (href: string) => {
    setMobileMenuOpen(false);
    const el = document.querySelector(href);
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <>
      <motion.header
        initial={{ y: -100 }}
        animate={{ y: 0 }}
        transition={{ type: 'spring', stiffness: 100, damping: 20 }}
        className={`fixed top-0 right-0 left-0 z-50 transition-all duration-300 ${
          scrolled
            ? 'bg-background/70 backdrop-blur-xl border-b border-border/50 shadow-lg shadow-black/5'
            : 'bg-transparent'
        }`}
      >
        {/* Gradient border on scroll */}
        <div
          className={`absolute bottom-0 right-0 left-0 h-[2px] transition-opacity duration-500 ${
            scrolled ? 'opacity-100' : 'opacity-0'
          }`}
          style={{
            background:
              'linear-gradient(to left, #7C3AED, #06B6D4, #10B981)',
          }}
        />

        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="flex h-16 items-center justify-between gap-4">
            {/* Logo */}
            <motion.a
              href="#home"
              onClick={(e) => {
                e.preventDefault();
                handleNavClick('#home');
              }}
              className="flex items-center gap-3 shrink-0"
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
            >
              <div className="relative h-9 w-9 overflow-hidden rounded-lg">
                <img
                  src="/logo.svg"
                  alt="Zynex Store"
                  className="h-full w-full object-contain"
                />
              </div>
              <div className="flex flex-col">
                <span className="text-lg font-bold gradient-text leading-tight">
                  Zynex Store
                </span>
                <span className="text-[10px] text-muted-foreground leading-tight hidden sm:block">
                  متجرك الأول للخدمات الرقمية
                </span>
              </div>
            </motion.a>

            {/* Desktop Navigation */}
            <nav className="hidden md:flex items-center gap-1">
              {navLinks.map((link) => (
                <motion.button
                  key={link.href}
                  onClick={() => handleNavClick(link.href)}
                  className="relative px-4 py-2 text-sm font-medium text-muted-foreground hover:text-foreground transition-colors rounded-lg hover:bg-accent/50"
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                >
                  {link.label}
                </motion.button>
              ))}
            </nav>

            {/* Actions */}
            <div className="flex items-center gap-1 sm:gap-2">
              {/* Search Button */}
              <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                <Button
                  variant="ghost"
                  size="icon"
                  onClick={() => setSearchOpen(true)}
                  className="relative text-muted-foreground hover:text-foreground"
                  aria-label="بحث"
                >
                  <Search className="h-[18px] w-[18px]" />
                </Button>
              </motion.div>

              {/* Theme Toggle */}
              <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                <Button
                  variant="ghost"
                  size="icon"
                  onClick={() => setTheme(theme === 'dark' ? 'light' : 'dark')}
                  className="text-muted-foreground hover:text-foreground"
                  aria-label="تبديل الوضع"
                >
                  <AnimatePresence mode="wait" initial={false}>
                    {mounted && theme === 'dark' ? (
                      <motion.div
                        key="sun"
                        initial={{ rotate: -90, scale: 0 }}
                        animate={{ rotate: 0, scale: 1 }}
                        exit={{ rotate: 90, scale: 0 }}
                        transition={{ duration: 0.2 }}
                      >
                        <Sun className="h-[18px] w-[18px]" />
                      </motion.div>
                    ) : (
                      <motion.div
                        key="moon"
                        initial={{ rotate: 90, scale: 0 }}
                        animate={{ rotate: 0, scale: 1 }}
                        exit={{ rotate: -90, scale: 0 }}
                        transition={{ duration: 0.2 }}
                      >
                        <Moon className="h-[18px] w-[18px]" />
                      </motion.div>
                    )}
                  </AnimatePresence>
                </Button>
              </motion.div>

              {/* Notification Bell */}
              <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                <Button
                  variant="ghost"
                  size="icon"
                  className="relative text-muted-foreground hover:text-foreground"
                  aria-label="الإشعارات"
                >
                  <Bell className="h-[18px] w-[18px]" />
                  <Badge className="absolute -top-1 -left-1 h-5 w-5 rounded-full p-0 flex items-center justify-center text-[10px] font-bold gradient-primary border-0">
                    3
                  </Badge>
                </Button>
              </motion.div>

              {/* Cart */}
              <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                <Button
                  variant="ghost"
                  size="icon"
                  className="relative text-muted-foreground hover:text-foreground hidden sm:flex"
                  aria-label="السلة"
                >
                  <ShoppingCart className="h-[18px] w-[18px]" />
                  <Badge className="absolute -top-1 -left-1 h-5 w-5 rounded-full p-0 flex items-center justify-center text-[10px] font-bold bg-zynex-green text-white border-0">
                    2
                  </Badge>
                </Button>
              </motion.div>

              {/* User Avatar / Login */}
              <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                <Button
                  variant="ghost"
                  size="icon"
                  className="hidden sm:flex text-muted-foreground hover:text-foreground"
                  aria-label={isAuthenticated ? 'حسابي' : 'تسجيل الدخول'}
                  onClick={() => {
                    if (!isAuthenticated) {
                      setAuthModalOpen(true);
                    }
                  }}
                >
                  {isAuthenticated && user ? (
                    <div className="h-8 w-8 rounded-full gradient-primary flex items-center justify-center text-white text-sm font-bold">
                      {user.name?.charAt(0)?.toUpperCase() || 'U'}
                    </div>
                  ) : (
                    <div className="h-8 w-8 rounded-full gradient-primary flex items-center justify-center">
                      <User className="h-4 w-4 text-white" />
                    </div>
                  )}
                </Button>
              </motion.div>

              {/* Mobile Menu */}
              <div className="md:hidden">
                <Sheet open={mobileMenuOpen} onOpenChange={setMobileMenuOpen}>
                  <SheetTrigger asChild>
                    <Button
                      variant="ghost"
                      size="icon"
                      className="text-muted-foreground hover:text-foreground"
                      aria-label="القائمة"
                    >
                      <Menu className="h-5 w-5" />
                    </Button>
                  </SheetTrigger>
                  <SheetContent side="right" className="w-[300px] bg-background border-border/50">
                    <SheetHeader>
                      <SheetTitle className="flex items-center gap-3">
                        <div className="h-8 w-8 overflow-hidden rounded-lg">
                          <img
                            src="/logo.svg"
                            alt="Zynex Store"
                            className="h-full w-full object-contain"
                          />
                        </div>
                        <span className="gradient-text font-bold text-lg">
                          Zynex Store
                        </span>
                      </SheetTitle>
                    </SheetHeader>

                    <nav className="flex flex-col gap-1 px-4 mt-4">
                      {navLinks.map((link, index) => (
                        <motion.button
                          key={link.href}
                          initial={{ opacity: 0, x: 20 }}
                          animate={{ opacity: 1, x: 0 }}
                          transition={{ delay: index * 0.1 }}
                          onClick={() => handleNavClick(link.href)}
                          className="flex items-center gap-3 px-4 py-3 text-base font-medium text-muted-foreground hover:text-foreground rounded-xl hover:bg-accent/50 transition-colors text-right w-full"
                        >
                          {link.label}
                        </motion.button>
                      ))}
                    </nav>

                    <div className="mt-6 px-4 flex flex-col gap-2">
                      {isAuthenticated ? (
                        <>
                          <div className="flex items-center gap-3 px-4 py-2 mb-2">
                            <div className="h-10 w-10 rounded-full gradient-primary flex items-center justify-center text-white text-sm font-bold shrink-0">
                              {user?.name?.charAt(0)?.toUpperCase() || 'U'}
                            </div>
                            <div className="min-w-0">
                              <p className="font-medium text-sm truncate">{user?.name}</p>
                              <p className="text-xs text-muted-foreground truncate">{user?.email}</p>
                            </div>
                          </div>
                          <Button variant="outline" className="w-full" onClick={() => { logout(); setMobileMenuOpen(false); }}>
                            <LogOut className="h-4 w-4 ml-2" />
                            تسجيل الخروج
                          </Button>
                        </>
                      ) : (
                        <Button className="w-full gradient-primary text-white border-0 hover:opacity-90" onClick={() => { setAuthModalOpen(true); setMobileMenuOpen(false); }}>
                          <User className="h-4 w-4 ml-2" />
                          تسجيل الدخول
                        </Button>
                      )}
                      <Button variant="outline" className="w-full">
                        <ShoppingCart className="h-4 w-4 ml-2" />
                        السلة (2)
                      </Button>
                    </div>

                    <div className="mt-auto px-4 pb-4">
                      <div className="flex items-center justify-center gap-4 pt-6 border-t border-border/50">
                        <Button
                          variant="ghost"
                          size="icon"
                          onClick={() => setTheme(theme === 'dark' ? 'light' : 'dark')}
                          className="text-muted-foreground"
                          aria-label="تبديل الوضع"
                        >
                          {mounted && theme === 'dark' ? (
                            <Sun className="h-5 w-5" />
                          ) : (
                            <Moon className="h-5 w-5" />
                          )}
                        </Button>
                        <Button
                          variant="ghost"
                          size="icon"
                          className="relative text-muted-foreground"
                          aria-label="الإشعارات"
                        >
                          <Bell className="h-5 w-5" />
                          <Badge className="absolute -top-1 -left-1 h-4 w-4 rounded-full p-0 flex items-center justify-center text-[9px] gradient-primary border-0">
                            3
                          </Badge>
                        </Button>
                      </div>
                    </div>
                  </SheetContent>
                </Sheet>
              </div>
            </div>
          </div>
        </div>
      </motion.header>

      {/* Search Dialog */}
      <Dialog open={searchOpen} onOpenChange={setSearchOpen}>
        <DialogContent className="sm:max-w-lg bg-background/95 backdrop-blur-xl border-border/50">
          <DialogHeader>
            <DialogTitle className="gradient-text text-right">
              ابحث في المتجر
            </DialogTitle>
          </DialogHeader>
          <div className="relative">
            <Search className="absolute right-3 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground" />
            <Input
              placeholder="ابحث عن خدمات، منتجات، أقسام..."
              className="pr-10 h-12 text-base rounded-xl bg-accent/30 border-border/50 focus-visible:border-zynex-purple"
              autoFocus
            />
          </div>
          <div className="mt-2">
            <p className="text-xs text-muted-foreground mb-3">عمليات بحث شائعة</p>
            <div className="flex flex-wrap gap-2">
              {['اشتراكات', 'ذكاء اصطناعي', 'توثيق', 'تليجرام', 'تصميم'].map(
                (tag) => (
                  <button
                    key={tag}
                    className="px-3 py-1.5 text-xs rounded-full bg-accent/50 text-muted-foreground hover:text-foreground hover:bg-accent transition-colors"
                    onClick={() => setSearchOpen(false)}
                  >
                    {tag}
                  </button>
                )
              )}
            </div>
          </div>
        </DialogContent>
      </Dialog>
    </>
  );
}
