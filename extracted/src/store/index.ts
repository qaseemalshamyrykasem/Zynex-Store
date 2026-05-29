// Zynex Store - Zustand Store
import { create } from 'zustand';
import { persist } from 'zustand/middleware';

// ============================================
// App Store - Global application state
// ============================================

interface AppState {
  // Navigation
  currentPage: string;
  setCurrentPage: (page: string) => void;

  // Search
  searchQuery: string;
  setSearchQuery: (query: string) => void;
  isSearchOpen: boolean;
  setSearchOpen: (open: boolean) => void;

  // Cart / Order
  selectedService: string | null;
  setSelectedService: (serviceId: string | null) => void;

  // UI State
  isMobileMenuOpen: boolean;
  setMobileMenuOpen: (open: boolean) => void;
  isOrderModalOpen: boolean;
  setOrderModalOpen: (open: boolean) => void;
  isAuthModalOpen: boolean;
  setAuthModalOpen: (open: boolean) => void;
}

export const useAppStore = create<AppState>()(
  persist(
    (set) => ({
      currentPage: 'home',
      setCurrentPage: (page) => set({ currentPage: page }),
      searchQuery: '',
      setSearchQuery: (query) => set({ searchQuery: query }),
      isSearchOpen: false,
      setSearchOpen: (open) => set({ isSearchOpen: open }),
      selectedService: null,
      setSelectedService: (serviceId) => set({ selectedService: serviceId }),
      isMobileMenuOpen: false,
      setMobileMenuOpen: (open) => set({ isMobileMenuOpen: open }),
      isOrderModalOpen: false,
      setOrderModalOpen: (open) => set({ isOrderModalOpen: open }),
      isAuthModalOpen: false,
      setAuthModalOpen: (open) => set({ isAuthModalOpen: open }),
    }),
    {
      name: 'zynex-app-store',
      partialize: (state) => ({
        currentPage: state.currentPage,
      }),
    }
  )
);

// ============================================
// Auth Store - Authentication state
// ============================================

interface AuthStoreState {
  user: {
    id: string;
    email: string;
    name: string | null;
    role: string;
    balance: number;
  } | null;
  isAuthenticated: boolean;
  isLoading: boolean;
  setUser: (user: AuthStoreState['user']) => void;
  login: (user: AuthStoreState['user']) => void;
  logout: () => void;
  updateBalance: (balance: number) => void;
}

export const useAuthStore = create<AuthStoreState>()(
  persist(
    (set) => ({
      user: null,
      isAuthenticated: false,
      isLoading: false,
      setUser: (user) => set({ user, isAuthenticated: !!user }),
      login: (user) => set({ user, isAuthenticated: true }),
      logout: () => set({ user: null, isAuthenticated: false }),
      updateBalance: (balance) =>
        set((state) => ({
          user: state.user ? { ...state.user, balance } : null,
        })),
    }),
    {
      name: 'zynex-auth-store',
      partialize: (state) => ({
        user: state.user,
        isAuthenticated: state.isAuthenticated,
      }),
    }
  )
);

// ============================================
// Notification Store
// ============================================

interface NotificationItem {
  id: string;
  title: string;
  message: string;
  type: string;
  isRead: boolean;
  createdAt: string;
}

interface NotificationStoreState {
  notifications: NotificationItem[];
  unreadCount: number;
  addNotification: (notification: Omit<NotificationItem, 'id' | 'createdAt' | 'isRead'>) => void;
  markAsRead: (id: string) => void;
  markAllAsRead: () => void;
  clearAll: () => void;
}

export const useNotificationStore = create<NotificationStoreState>()((set) => ({
  notifications: [
    {
      id: '1',
      title: 'مرحباً بك في Zynex Store!',
      message: 'استمتع بتجربة تسوق فريدة للخدمات الرقمية',
      type: 'system',
      isRead: false,
      createdAt: new Date().toISOString(),
    },
  ],
  unreadCount: 1,
  addNotification: (notification) =>
    set((state) => {
      const newNotification: NotificationItem = {
        ...notification,
        id: Date.now().toString(),
        isRead: false,
        createdAt: new Date().toISOString(),
      };
      const notifications = [newNotification, ...state.notifications];
      return {
        notifications,
        unreadCount: notifications.filter((n) => !n.isRead).length,
      };
    }),
  markAsRead: (id) =>
    set((state) => {
      const notifications = state.notifications.map((n) =>
        n.id === id ? { ...n, isRead: true } : n
      );
      return {
        notifications,
        unreadCount: notifications.filter((n) => !n.isRead).length,
      };
    }),
  markAllAsRead: () =>
    set((state) => ({
      notifications: state.notifications.map((n) => ({ ...n, isRead: true })),
      unreadCount: 0,
    })),
  clearAll: () => set({ notifications: [], unreadCount: 0 }),
}));
