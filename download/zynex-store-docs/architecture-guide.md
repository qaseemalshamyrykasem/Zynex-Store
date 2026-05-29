# Zynex Store - دليل البنية البرمجية (Architecture Guide)

## 🏛️ فلسفة البنية

يعتمد مشروع Zynex Store على مبدأ **Clean Architecture** مع فصل واضح للمسؤوليات:

```
Presentation Layer (UI Components)
         ↕
Application Layer (Stores, Hooks)
         ↕
Domain Layer (Types, Constants)
         ↕
Infrastructure Layer (API Routes, Database)
```

---

## 📂 هيكل المشروع التفصيلي

### `/src/app/` - طبقة العرض (Presentation)

#### `layout.tsx`
التخطيط الجذري للتطبيق. يوفر:
- اتجاه RTL للعربية
- ThemeProvider (Dark/Light Mode عبر next-themes)
- QueryProvider (TanStack Query لإدارة حالة السيرفر)
- خطوط Geist Sans و Geist Mono
- Toaster للإشعارات

#### `page.tsx`
الصفحة الرئيسية - نقطة الدخول الوحيدة. يدير:
- التنقل بين العروض (home, dashboard, admin)
- نافذة الطلب (OrderModal)
- نافذة المصادقة (AuthModal)
- البحث العام (SearchModal)
- أحداث التنقل المخصصة (zynex-navigate, zynex-order)

#### `globals.css`
أنماط Tailwind المخصصة تشمل:
- نظام ألوان Zynex (بنفسجي، سماوي، أخضر)
- Dark mode مع متغيرات oklch
- أدوات CSS مخصصة: gradient-primary, gradient-text, glass-card, glow-*, shimmer, animate-*
- شريط تمرير مخصص
- دعم RTL

### `/src/components/` - المكونات

#### `layout/` - المكونات الهيكلية
| الملف | الوصف |
|-------|-------|
| `header.tsx` | شريط علوي ثابت مع تأثير الزجاج، بحث، تبديل الثيم، إشعارات، قائمة جوال |
| `footer.tsx` | تذييل شامل مع المحافظ اليمنية، النشرة البريدية، الروابط |

#### `home/` - أقسام الصفحة الرئيسية
| الملف | الوصف |
|-------|-------|
| `hero-section.tsx` | البانر الرئيسي مع تدرجات وكرات متحركة وإحصائيات |
| `services-section.tsx` | شبكة أقسام الخدمات السبعة |
| `popular-services.tsx` | الخدمات الأكثر طلباً مع بطاقات تفاعلية |
| `ai-suggestions.tsx` | اقتراحات AI مع درجات الثقة |
| `stats-section.tsx` | عدادات متحركة |
| `features-section.tsx` | 6 مميزات المتجر |
| `reviews-section.tsx` | تقييمات العملاء |
| `cta-section.tsx` | دعوة للعمل |

#### `services/` - مكونات الخدمات
| الملف | الوصف |
|-------|-------|
| `service-card.tsx` | بطاقة خدمة تفاعلية مع badge وتقييم وسعر |
| `order-modal.tsx` | نافذة الطلب الكاملة مع الدفع والكوبونات |

#### `auth/` - مكونات المصادقة
| الملف | الوصف |
|-------|-------|
| `auth-modal.tsx` | نافذة تسجيل/دخول مع تحقق وإشعارات |

#### `dashboard/` - لوحة تحكم المستخدم
| الملف | الوصف |
|-------|-------|
| `user-dashboard.tsx` | 6 تبويبات: نظرة عامة، طلبات، محفظة، تذاكر، إشعارات، إعدادات |
| `order-tracking.tsx` | تتبع الطلب مع شريط تقدم مرئي |

#### `admin/` - لوحة تحكم الأدمن
| الملف | الوصف |
|-------|-------|
| `admin-dashboard.tsx` | 8 أقسام: نظرة عامة، طلبات، خدمات، مستخدمين، مدفوعات، كوبونات، إحصائيات، إعدادات |

#### `shared/` - مكونات مشتركة
| الملف | الوصف |
|-------|-------|
| `theme-provider.tsx` | مزود الثيم (next-themes wrapper) |
| `query-provider.tsx` | مزود TanStack Query |
| `search-modal.tsx` | بحث عالمي مع Ctrl+K |
| `dark-mode-toggle.tsx` | تبديل الوضع الداكن/الفاتح |

#### `ui/` - مكونات shadcn/ui
مجموعة كاملة من المكونات الجاهزة: Button, Card, Dialog, Input, Table, Badge, Tabs, etc.

### `/src/lib/` - المكتبات والثوابت

#### `constants.ts`
الثوابت الأساسية للمشروع:
- `APP_NAME`, `APP_DESCRIPTION` - معلومات التطبيق
- `COLORS` - ألوان العلامة التجارية
- `SERVICE_CATEGORIES` - 7 أقسام الخدمات
- `FEATURED_SERVICES` - 8 خدمات مميزة مع أسعار
- `YEMENI_PAYMENT_METHODS` - 5 محافظ يمنية
- `INTERNATIONAL_PAYMENT_METHODS` - 4 طرق دولية
- `TESTIMONIALS` - 6 تقييمات عملاء
- `SITE_STATS` - إحصائيات الموقع
- `ORDER_STATUS_LABELS` - تسميات حالات الطلب
- `BADGE_STYLES` - أنماط الشارات
- `CURRENCY_RATES` - أسعار الصرف

#### `db.ts`
اتصال Prisma Client مع قاعدة بيانات SQLite.

#### `utils.ts`
دالة `cn()` لدمج أسماء CSS classes.

### `/src/store/` - إدارة الحالة (Zustand)

#### `useAppStore`
حالة التطبيق العامة:
- التنقل، البحث، القائمة الجوالة، نافذة الطلب

#### `useAuthStore`
حالة المصادقة:
- المستخدم، تسجيل الدخول/الخروج، تحديث الرصيد
- محفوظ في localStorage

#### `useNotificationStore`
حالة الإشعارات:
- إضافة إشعار، تحديد كمقروء، مسح الكل

### `/src/types/` - أنواع TypeScript

تعريفات شاملة لكل كيان في النظام:
- User, Category, Service, Order, OrderItem
- Transaction, Review, Ticket, Notification
- Coupon, Wallet, YemeniPaymentMethod
- ORDER_STATUS, PAYMENT_METHOD, etc.

---

## 🔄 تدفق البيانات (Data Flow)

### تدفق الطلب (Order Flow)
```
المستخدم يضغط "اطلب الآن"
       ↓
OrderModal تفتح (اختيار الكمية + طريقة الدفع + الكوبون)
       ↓
POST /api/orders (التحقق + إنشاء الطلب)
       ↓
Prisma ينشئ Order + OrderItem
       ↓
استجابة JSON مع رقم الطلب
       ↓
Toast إشعار نجاح + إغلاق النافذة
```

### تدفق المصادقة (Auth Flow)
```
المستخدم يضغط تسجيل الدخول
       ↓
AuthModal تفتح (تسجيل/إنشاء حساب)
       ↓
POST /api/auth/login أو /register
       ↓
التحقق من البيانات + إنشاء/البحث عن المستخدم
       ↓
useAuthStore.login(user) ← حفظ في Zustand + localStorage
       ↓
إغلاق النافذة + تحديث UI
```

### تدفق الدفع (Payment Flow)
```
اختيار طريقة الدفع (يمني/دولي)
       ↓
إدخال بيانات الدفع (رقم المحفظة/الحساب)
       ↓
تأكيد الطلب ← POST /api/orders
       ↓
[للإنتاج]: توجيه لبوابة الدفع
       ↓
[حالياً]: تسجيل الطلب كـ pending
       ↓
الأدمن يحدث حالة الدفع ← PATCH /api/admin/orders
```

---

## 🎨 نظام التصميم (Design System)

### الألوان
| اللون | الاستخدام |
|-------|-----------|
| `#7C3AED` بنفسجي | اللون الأساسي - الأزرار، الروابط |
| `#06B6D4` سماوي | اللون الثانوي - التدرجات |
| `#10B981` أخضر | النجاح - التأكيدات |
| `#0A0A0F` داكن | الخلفية الأساسية |
| `#FAFAFA` فاتح | خلفية الوضع الفاتح |

### أنماط CSS المخصصة
```css
.gradient-primary    /* تدرج بنفسجي→سماوي */
.gradient-text       /* نص متدرج */
.glass-card          /* بطاقة زجاجية شفافة */
.glow-purple         /* توهج بنفسجي */
.shimmer             /* تأثير لمعان التحميل */
.animate-float       /* حركة طفو */
```

### المكونات الأساسية
- **الأزرار**: primary (متدرج), secondary (حدود), ghost, success, destructive
- **البطاقات**: زجاجية مع backdrop-blur وحدود شفافة
- **الحقول**: حدود رمادية، focus بنفسجي مع ظل

---

## 🔐 الأمن والحماية

### التحقق من المدخلات
- Zod schemas في API routes
- التحقق من البريد الإلكتروني مع unique
- التحقق من كلمة المرور (الحد الأدنى 6 أحرف)
- تنظيف المدخلات من HTML/JS

### حماية قاعدة البيانات
- Prisma ORM يمنع SQL Injection تلقائياً
- Parameterized queries
- Connection pooling

### مقترحات للإنتاج
- Rate Limiting (express-rate-limit)
- Helmet.js للأمان
- CSRF Tokens
- JWT مع انتهاء صلاحية
- HTTPS إجباري
- Content Security Policy

---

## 📈 خطة التوسع (Scaling Plan)

### المرحلة 1: الإطلاق (0-3 أشهر)
- نشر على Vercel
- 7 أقسام خدمات أساسية
- المحافظ اليمنية فقط
- تسويق عبر المؤثرين

### المرحلة 2: النمو (3-6 أشهر)
- إضافة PayPal/Stripe فعلي
- تطبيق جوال (React Native)
- نظام ولاء ومكافآت
- API للمطورين

### المرحلة 3: التوسع (6-12 شهر)
- التوسع لأسواق عربية أخرى
- نظام تسويق بالعمولة
- شراكات مع مزودي خدمات
- إشعارات Push

### المرحلة 4: النضج (12-24 شهر)
- منصة B2B للشركات
- نظام مزاد للخدمات
- Smart contracts (Web3)
- AI Chatbot متقدم
