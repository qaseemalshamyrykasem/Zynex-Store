'use client';

import { useState, useEffect, useCallback, useMemo } from 'react';
import { motion } from 'framer-motion';
import {
  Search,
  Clock,
  Sparkles,
  X,
  Star,
  Command,
} from 'lucide-react';
import {
  CommandDialog,
  CommandInput,
  CommandList,
  CommandEmpty,
  CommandGroup,
  CommandItem,
  CommandSeparator,
} from '@/components/ui/command';
import { Badge } from '@/components/ui/badge';
import { FEATURED_SERVICES } from '@/lib/constants';

interface SearchModalProps {
  isOpen: boolean;
  onOpenChange: (open: boolean) => void;
}

// Recent searches stored in localStorage
const RECENT_SEARCHES_KEY = 'zynex-recent-searches';

function getRecentSearches(): string[] {
  if (typeof window === 'undefined') return [];
  try {
    const stored = localStorage.getItem(RECENT_SEARCHES_KEY);
    return stored ? JSON.parse(stored) : [];
  } catch {
    return [];
  }
}

function addRecentSearch(query: string) {
  if (typeof window === 'undefined') return;
  try {
    const recent = getRecentSearches().filter((s) => s !== query);
    recent.unshift(query);
    const updated = recent.slice(0, 5);
    localStorage.setItem(RECENT_SEARCHES_KEY, JSON.stringify(updated));
  } catch {
    // ignore
  }
}

function removeRecentSearch(query: string) {
  if (typeof window === 'undefined') return;
  try {
    const recent = getRecentSearches().filter((s) => s !== query);
    localStorage.setItem(RECENT_SEARCHES_KEY, JSON.stringify(recent));
  } catch {
    // ignore
  }
}

export function SearchModal({ isOpen, onOpenChange }: SearchModalProps) {
  const [query, setQuery] = useState('');
  const [refreshKey, setRefreshKey] = useState(0);

  // Compute recent searches from localStorage
  // isOpen in deps ensures we re-read when modal opens
  // refreshKey ensures we re-read after add/remove operations
  const recentSearches = useMemo(() => {
    void refreshKey;
    if (!isOpen) return [];
    return getRecentSearches();
  }, [refreshKey, isOpen]);

  // Keyboard shortcut: Ctrl+K / Cmd+K
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key === 'k') {
        e.preventDefault();
        onOpenChange(!isOpen);
      }
    };

    document.addEventListener('keydown', handleKeyDown);
    return () => document.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, onOpenChange]);

  // Filter services based on query
  const filteredServices = query.trim()
    ? FEATURED_SERVICES.filter(
        (service) =>
          service.name.toLowerCase().includes(query.toLowerCase()) ||
          service.nameEn.toLowerCase().includes(query.toLowerCase()) ||
          service.description.toLowerCase().includes(query.toLowerCase()) ||
          service.categorySlug.toLowerCase().includes(query.toLowerCase())
      )
    : [];

  // Popular services (top rated)
  const popularServices = [...FEATURED_SERVICES]
    .sort((a, b) => b.rating - a.rating)
    .slice(0, 4);

  const handleSelect = useCallback(
    (serviceId: string) => {
      const service = FEATURED_SERVICES.find((s) => s.id === serviceId);
      if (service) {
        addRecentSearch(service.name);
        setRefreshKey((k) => k + 1);
        onOpenChange(false);
        setQuery('');
      }
    },
    [onOpenChange]
  );

  const handleRecentSearchClick = useCallback(
    (searchQuery: string) => {
      setQuery(searchQuery);
    },
    []
  );

  const handleRemoveRecent = useCallback(
    (searchQuery: string, e: React.MouseEvent) => {
      e.stopPropagation();
      removeRecentSearch(searchQuery);
      setRefreshKey((k) => k + 1);
    },
    []
  );

  return (
    <CommandDialog
      open={isOpen}
      onOpenChange={(open) => {
        onOpenChange(open);
        if (!open) setQuery('');
      }}
      title="البحث في الخدمات"
      description="ابحث عن الخدمات والاشتراكات المتوفرة"
    >
      <CommandInput
        placeholder="ابحث عن خدمة..."
        value={query}
        onValueChange={setQuery}
      />
      <CommandList>
        <CommandEmpty>
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            className="flex flex-col items-center justify-center py-8 text-center"
          >
            <Search className="size-10 text-muted-foreground/30 mb-3" />
            <p className="text-muted-foreground text-sm font-medium">
              لا توجد نتائج لـ &quot;{query}&quot;
            </p>
            <p className="text-muted-foreground/60 text-xs mt-1">
              جرب البحث بكلمات مختلفة
            </p>
          </motion.div>
        </CommandEmpty>

        {/* Search Results */}
        {query.trim() && filteredServices.length > 0 && (
          <CommandGroup heading="نتائج البحث">
            {filteredServices.map((service) => (
              <CommandItem
                key={service.id}
                value={service.id}
                onSelect={() => handleSelect(service.id)}
                className="flex items-center gap-3 py-3 cursor-pointer"
              >
                <div className="w-8 h-8 rounded-lg gradient-primary flex items-center justify-center shrink-0">
                  <Sparkles className="size-4 text-white" />
                </div>
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2">
                    <span className="font-medium text-sm truncate">{service.name}</span>
                    {service.badge && (
                      <Badge variant="outline" className="text-[10px] px-1.5 py-0 shrink-0">
                        {service.badge === 'popular'
                          ? 'الأكثر طلباً'
                          : service.badge === 'new'
                            ? 'جديد'
                            : service.badge === 'bestseller'
                              ? 'الأكثر مبيعاً'
                              : service.badge === 'premium'
                                ? 'بريميوم'
                                : service.badge}
                      </Badge>
                    )}
                  </div>
                  <p className="text-xs text-muted-foreground line-clamp-1 mt-0.5">
                    {service.description}
                  </p>
                </div>
                <div className="text-left shrink-0">
                  <span className="text-sm font-bold text-primary">${service.price}</span>
                  <div className="flex items-center gap-0.5 justify-end">
                    <Star className="size-2.5 text-amber-400 fill-amber-400" />
                    <span className="text-[10px] text-muted-foreground">{service.rating}</span>
                  </div>
                </div>
              </CommandItem>
            ))}
          </CommandGroup>
        )}

        {/* Recent Searches */}
        {!query.trim() && recentSearches.length > 0 && (
          <>
            <CommandGroup heading="عمليات البحث الأخيرة">
              {recentSearches.map((search) => (
                <CommandItem
                  key={search}
                  value={`recent-${search}`}
                  onSelect={() => handleRecentSearchClick(search)}
                  className="flex items-center gap-2 py-2 cursor-pointer"
                >
                  <Clock className="size-3.5 text-muted-foreground" />
                  <span className="flex-1 text-sm">{search}</span>
                  <button
                    onClick={(e) => handleRemoveRecent(search, e)}
                    className="p-1 rounded-sm hover:bg-muted transition-colors"
                  >
                    <X className="size-3 text-muted-foreground hover:text-foreground" />
                  </button>
                </CommandItem>
              ))}
            </CommandGroup>
            <CommandSeparator />
          </>
        )}

        {/* Popular Services */}
        {!query.trim() && (
          <CommandGroup heading="خدمات مقترحة">
            {popularServices.map((service) => (
              <CommandItem
                key={service.id}
                value={service.id}
                onSelect={() => handleSelect(service.id)}
                className="flex items-center gap-3 py-3 cursor-pointer"
              >
                <div className="w-8 h-8 rounded-lg gradient-primary flex items-center justify-center shrink-0">
                  <Sparkles className="size-4 text-white" />
                </div>
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2">
                    <span className="font-medium text-sm truncate">{service.name}</span>
                    {service.badge && (
                      <Badge variant="outline" className="text-[10px] px-1.5 py-0 shrink-0">
                        {service.badge === 'popular'
                          ? 'الأكثر طلباً'
                          : service.badge === 'new'
                            ? 'جديد'
                            : service.badge === 'bestseller'
                              ? 'الأكثر مبيعاً'
                              : service.badge === 'premium'
                                ? 'بريميوم'
                                : service.badge}
                      </Badge>
                    )}
                  </div>
                  <p className="text-xs text-muted-foreground line-clamp-1 mt-0.5">
                    {service.description}
                  </p>
                </div>
                <div className="text-left shrink-0">
                  <span className="text-sm font-bold text-primary">${service.price}</span>
                  <div className="flex items-center gap-0.5 justify-end">
                    <Star className="size-2.5 text-amber-400 fill-amber-400" />
                    <span className="text-[10px] text-muted-foreground">{service.rating}</span>
                  </div>
                </div>
              </CommandItem>
            ))}
          </CommandGroup>
        )}
      </CommandList>

      {/* Footer hint */}
      <div className="flex items-center justify-between px-4 py-2 border-t border-border text-xs text-muted-foreground">
        <div className="flex items-center gap-1.5">
          <kbd className="pointer-events-none inline-flex h-5 select-none items-center gap-1 rounded border bg-muted px-1.5 font-mono text-[10px] font-medium text-muted-foreground">
            <Command className="size-2.5" />K
          </kbd>
          <span>للفتح والإغلاق</span>
        </div>
        <div className="flex items-center gap-1.5">
          <kbd className="pointer-events-none inline-flex h-5 select-none items-center gap-1 rounded border bg-muted px-1.5 font-mono text-[10px] font-medium text-muted-foreground">
            ↑↓
          </kbd>
          <span>للتصفح</span>
          <kbd className="pointer-events-none inline-flex h-5 select-none items-center gap-1 rounded border bg-muted px-1.5 font-mono text-[10px] font-medium text-muted-foreground">
            ↵
          </kbd>
          <span>للاختيار</span>
        </div>
      </div>
    </CommandDialog>
  );
}
