'use client';

import { useState, useEffect } from 'react';
import { Header } from '@/components/layout/header';
import { Footer } from '@/components/layout/footer';
import { HeroSection } from '@/components/home/hero-section';
import { ServicesSection } from '@/components/home/services-section';
import { PopularServices } from '@/components/home/popular-services';
import { ReviewsSection } from '@/components/home/reviews-section';
import { StatsSection } from '@/components/home/stats-section';
import { FeaturesSection } from '@/components/home/features-section';
import { CtaSection } from '@/components/home/cta-section';
import { AISuggestions } from '@/components/home/ai-suggestions';
import { SearchModal } from '@/components/shared/search-modal';
import { AuthModal } from '@/components/auth/auth-modal';
import { UserDashboard } from '@/components/dashboard/user-dashboard';
import { AdminDashboard } from '@/components/admin/admin-dashboard';
import { OrderModal } from '@/components/services/order-modal';
import { useAppStore } from '@/store';
import { useAuthStore } from '@/store';
import { FEATURED_SERVICES } from '@/lib/constants';
import { AnimatePresence, motion } from 'framer-motion';

type PageView = 'home' | 'dashboard' | 'admin';

export default function Home() {
  const [currentView, setCurrentView] = useState<PageView>('home');
  const [selectedServiceId, setSelectedServiceId] = useState<string | null>(null);
  const [isOrderModalOpen, setIsOrderModalOpen] = useState(false);
  const { isAuthModalOpen, setAuthModalOpen } = useAppStore();
  const { isAuthenticated, user } = useAuthStore();

  const selectedService = selectedServiceId
    ? FEATURED_SERVICES.find((s) => s.id === selectedServiceId)
    : null;

  // Listen for custom navigation events
  useEffect(() => {
    const handleNavigate = (e: CustomEvent) => {
      const { view } = e.detail;
      setCurrentView(view as PageView);
      window.scrollTo({ top: 0, behavior: 'smooth' });
    };
    window.addEventListener('zynex-navigate', handleNavigate as EventListener);
    return () => window.removeEventListener('zynex-navigate', handleNavigate as EventListener);
  }, []);

  // Listen for order events from components
  useEffect(() => {
    const handleOrder = (e: CustomEvent) => {
      const { serviceId } = e.detail;
      setSelectedServiceId(serviceId);
      setIsOrderModalOpen(true);
    };
    window.addEventListener('zynex-order', handleOrder as EventListener);
    return () => window.removeEventListener('zynex-order', handleOrder as EventListener);
  }, []);

  const handleOrderService = (serviceId: string) => {
    setSelectedServiceId(serviceId);
    setIsOrderModalOpen(true);
  };

  return (
    <div className="min-h-screen flex flex-col bg-background">
      <Header />
      <main className="flex-1 pt-16">
        <AnimatePresence mode="wait">
          {currentView === 'home' && (
            <motion.div
              key="home"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.2 }}
            >
              <HeroSection />
              <ServicesSection />
              <PopularServices onOrder={handleOrderService} />
              <AISuggestions onServiceClick={handleOrderService} />
              <StatsSection />
              <FeaturesSection />
              <ReviewsSection />
              <CtaSection />
            </motion.div>
          )}
          {currentView === 'dashboard' && (
            <motion.div
              key="dashboard"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              transition={{ duration: 0.2 }}
            >
              <UserDashboard />
            </motion.div>
          )}
          {currentView === 'admin' && (
            <motion.div
              key="admin"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              transition={{ duration: 0.2 }}
            >
              <AdminDashboard />
            </motion.div>
          )}
        </AnimatePresence>
      </main>
      <Footer />
      <SearchModal />
      <AuthModal isOpen={isAuthModalOpen} onClose={() => setAuthModalOpen(false)} />
      <OrderModal
        isOpen={isOrderModalOpen}
        onClose={() => setIsOrderModalOpen(false)}
        service={selectedService || null}
      />
    </div>
  );
}
