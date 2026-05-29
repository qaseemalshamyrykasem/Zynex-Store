# 📖 التوثيق الشامل لمشروع Zynex Store

> التوثيق الكامل لمشروع متجر Zynex للخدمات الرقمية
> آخر تحديث: 2025

---

## 📑 جدول المحتويات

1. [شرح المجلدات](#1-شرح-المجلدات)
2. [شرح الـ APIs](#2-شرح-الـ-apis)
3. [شرح الـ Components](#3-شرح-الـ-components)
4. [شرح الـ Database Schema](#4-شرح-الـ-database-schema)
5. [شرح نظام Authentication](#5-شرح-نظام-authentication)
6. [شرح الأمن والحماية](#6-شرح-الأمن-والحماية)

---

## 1. شرح المجلدات

### 📁 `src/app/`

المجلد الرئيسي لتطبيق Next.js باستخدام App Router. يحتوي على:

| الملف/المجلد | الوصف |
|---|---|
| `layout.tsx` | التخطيط الجذري للتطبيق — يحدد اتجاه الصفحة (RTL)، خطوط Geist، ThemeProvider، QueryProvider، وToaster للإشعارات |
| `page.tsx` | الصفحة الرئيسية والوحيدة — تطبيق صفحة واحدة (SPA) يتنقل بين العروض (home, dashboard, admin) باستخدام state |
| `globals.css` | أنماط CSS العامة — متغيرات Tailwind، أنماط Gradient، تأثيرات Glass-morphism، Shimmer |
| `api/` | مجلد مسارات API الخلفية — يحتوي على 10 مسارات API RESTful |

**نمط التصميم**: يستخدم التطبيق نمط SPA حيث أن `page.tsx` هو نقطة الدخول الوحيدة ويتم التنقل بين العروض المختلفة باستخدام حالة `currentView` وحدث `zynex-navigate`.

---

### 📁 `src/components/`

مجلد المكونات مقسم إلى أقسام منطقية:

#### `components/ui/` (45+ مكوّن)
مكوّنات shadcn/ui الأساسية — Button, Card, Dialog, Input, Table, Badge, Tabs, Select, Switch, Separator, وغيرها. هذه المكوّنات مبنية على Radix UI primitives مع تنسيقات Tailwind CSS.

#### `components/layout/`
| المكوّن | الوصف |
|---|---|
| `header.tsx` | شريط التنقل العلوي — ثابت (sticky) مع تأثير Glass-morphism عند التمرير، حد Gradient متحرك، قائمة جوال (Sheet)، حوار البحث، زر تبديل السمة، إشعارات، سلة، أيقونة المستخدم |
| `footer.tsx` | التذييل — خلفية داكنة مع معلومات العلامة التجارية، روابط سريعة، أقسام الخدمات، اشتراك النشرة البريدية، أيقونات التواصل الاجتماعي (SVG مخصص)، طرق الدفع |

#### `components/home/`
| المكوّن | الوصف |
|---|---|
| `hero-section.tsx` | القسم البطولي — خلفية متحركة مع كرات Gradient، نمط شبكي، إحصائيات متحركة (15,750+ طلب، 8,500+ عميل، 120+ خدمة) |
| `services-section.tsx` | قسم الأقسام — شبكة 7 أقسام رئيسية (اشتراكات، ذكاء اصطناعي، ترفيه، توثيق، تليجرام، سوشيال، رقمية) |
| `popular-services.tsx` | الخدمات المميزة — شبكة بطاقات الخدمات مع Badge، تقييمات، أوقات التسليم |
| `ai-suggestions.tsx` | اقتراحات الذكاء الاصطناعي — 4 بطاقات اقتراح مع نسب ثقة متحركة |
| `stats-section.tsx` | قسم الإحصائيات — عدادات متحركة مع تأثير Gradient |
| `features-section.tsx` | قسم المميزات — 6 مميزات (دفع محلي، تسليم سريع، ضمان، دعم 24/7، أسعار، أمان) |
| `reviews-section.tsx` | قسم التقييمات — تمرير أفقي لآراء العملاء مع نجوم التقييم |
| `cta-section.tsx` | قسم الدعوة للعمل — خلفية Gradient مع أزرار إجراء |

#### `components/services/`
| المكوّن | الوصف |
|---|---|
| `service-card.tsx` | بطاقة الخدمة — رأس Gradient، أيقونة القسم، Badge، تقييم نجوم، سعر بعملات متعددة، زر الطلب |
| `order-modal.tsx` | نافذة الطلب — اختيار الكمية (1-10)، إدخال الحساب، ملاحظات، كوبون خصم، طرق الدفع (5 يمنية + 4 دولية)، ملخص الطلب |

#### `components/auth/`
| المكوّن | الوصف |
|---|---|
| `auth-modal.tsx` | نافذة المصادقة — تبديل تسجيل دخول/إنشاء حساب مع حركة Spring، تحقق من النماذج، تسجيل دخول كضيف، أزرار تسجيل دخول اجتماعي (Google, Telegram) |

#### `components/dashboard/`
| المكوّن | الوصف |
|---|---|
| `user-dashboard.tsx` | لوحة تحكم المستخدم — 6 علامات تبويب: نظرة عامة، طلباتي، المحفظة، التذاكر، الإشعارات، الإعدادات |
| `order-tracking.tsx` | تتبع الطلب — شريط تقدم مرئي بـ 3 مراحل (تم الاستلام ← قيد التنفيذ ← مكتمل) |

#### `components/admin/`
| المكوّن | الوصف |
|---|---|
| `admin-dashboard.tsx` | لوحة تحكم الإدارة — 8 أقسام: نظرة عامة (رسوم بيانية)، الطلبات، الخدمات، المستخدمين، المدفوعات، الكوبونات، الإحصائيات، الإعدادات |

#### `components/shared/`
| المكوّن | الوصف |
|---|---|
| `theme-provider.tsx` | مزود السمة — يغلف next-themes لدعم الوضع الداكن/الفاتح |
| `query-provider.tsx` | مزود الاستعلام — يغلف TanStack Query لإدارة حالة الخادم |
| `search-modal.tsx` | نافذة البحث — بحث شامل مع Ctrl+K، عمليات بحث حديثة، اقتراحات شائعة |
| `dark-mode-toggle.tsx` | زر تبديل السمة — أيقونات شمس/قمر مع حركة دوران |

---

### 📁 `src/lib/`

مجلد الأدوات والثوابت:

| الملف | الوصف |
|---|---|
| `constants.ts` | ثوابت التطبيق — اسم التطبيق، ألوان العلامة التجارية، 7 أقسام الخدمات، 8 خدمات مميزة، 5 طرق دفع يمنية، 4 طرق دولية، 6 تقييمات، إحصائيات الموقع، حالات الطلب، أنماط Badge، أسعار الصرف |
| `db.ts` | عميل Prisma — Singleton pattern لمنع إنشاء اتصالات متعددة أثناء التطوير |
| `utils.ts` | دوال مساعدة — `cn()` لدمج أسماء CSS مع tailwind-merge |

---

### 📁 `src/store/`

مجلد إدارة الحالة باستخدام Zustand:

| المخزن | الوصف |
|---|---|
| `useAppStore` | حالة التطبيق العامة — الصفحة الحالية، البحث، الخدمة المحددة، حالة القائمة الجوالة، نافذة الطلب، نافذة المصادقة. يستخدم `persist` لحفظ الصفحة الحالية |
| `useAuthStore` | حالة المصادقة — المستخدم، حالة تسجيل الدخول، حالة التحميل. يستخدم `persist` لحفظ بيانات المستخدم |
| `useNotificationStore` | حالة الإشعارات — قائمة الإشعارات، عدد غير المقروءة، إضافة/قراءة/مسح الإشعارات |

---

### 📁 `src/types/`

تعريفات TypeScript لجميع أنواع البيانات:

| النوع | الوصف |
|---|---|
| `User`, `UserRole` | بيانات المستخدم والدور (customer, admin) |
| `AuthState` | حالة المصادقة |
| `Category`, `Service` | بيانات الأقسام والخدمات |
| `Order`, `OrderItem`, `OrderStatus`, `PaymentStatus`, `PaymentMethod` | بيانات الطلبات |
| `Transaction`, `TransactionType` | بيانات المعاملات المالية |
| `Review` | بيانات التقييمات |
| `Ticket`, `TicketMessage`, `TicketStatus`, `TicketPriority` | بيانات تذاكر الدعم |
| `Notification`, `NotificationType` | بيانات الإشعارات |
| `Coupon` | بيانات كوبونات الخصم |
| `Wallet` | بيانات المحفظة |
| `YemeniPaymentMethod` | طرق الدفع اليمنية |
| `SiteStats` | إحصائيات الموقع |
| `AISuggestion` | اقتراحات الذكاء الاصطناعي |

---

### 📁 `prisma/`

| الملف | الوصف |
|---|---|
| `schema.prisma` | مخطط قاعدة البيانات — 15 نموذج (User, Wallet, Account, Session, VerificationToken, Category, Service, Order, OrderItem, Transaction, Review, Ticket, TicketMessage, Notification, Coupon, SiteSetting, AnalyticsEvent) |
| `seed.ts` | بيانات البذر — مستخدم إداري، عميل تجريبي، 7 أقسام، 8 خدمات، 3 طلبات، 3 تقييمات، 2 كوبونات، 5 إعدادات |

---

### 📁 `public/`

| الملف | الوصف |
|---|---|
| `favicon.svg` | أيقونة الموقع |
| `logo.svg` | شعار Zynex Store |
| `robots.txt` | تعليمات محركات البحث |

---

## 2. شرح الـ APIs

### 2.1 POST `/api/auth/register` — تسجيل حساب جديد

**الوصف**: إنشاء حساب عميل جديد في النظام

**الطلب**:
```json
{
  "email": "user@example.com",
  "password": "mypassword123",
  "name": "أحمد محمد",
  "phone": "+967771234567"
}
```

**الاستجابة (نجاح - 201)**:
```json
{
  "success": true,
  "data": {
    "id": "clx1abc123",
    "email": "user@example.com",
    "name": "أحمد محمد",
    "phone": "+967771234567",
    "role": "customer",
    "isVerified": false,
    "balance": 0,
    "currency": "USD",
    "createdAt": "2025-01-22T10:00:00.000Z",
    "updatedAt": "2025-01-22T10:00:00.000Z"
  },
  "message": "Registration successful"
}
```

**الاستجابة (خطأ - 400)**:
```json
{
  "success": false,
  "error": "Email and password are required"
}
```

**التحققات**:
- البريد الإلكتروني مطلوب وصيغته صحيحة
- كلمة المرور 6 أحرف على الأقل
- البريد الإلكتروني غير مسجل مسبقاً

---

### 2.2 POST `/api/auth/login` — تسجيل الدخول

**الوصف**: تسجيل الدخول باستخدام البريد الإلكتروني وكلمة المرور

**الطلب**:
```json
{
  "email": "admin@zynex.store",
  "password": "admin123"
}
```

**الاستجابة (نجاح - 200)**:
```json
{
  "success": true,
  "data": {
    "id": "clx1abc123",
    "email": "admin@zynex.store",
    "name": "Zynex Admin",
    "phone": null,
    "avatar": null,
    "role": "admin",
    "isVerified": true,
    "balance": 0,
    "currency": "USD",
    "createdAt": "2025-01-22T10:00:00.000Z",
    "updatedAt": "2025-01-22T10:00:00.000Z"
  },
  "message": "Login successful"
}
```

**الاستجابة (خطأ - 401)**:
```json
{
  "success": false,
  "error": "Invalid email or password"
}
```

---

### 2.3 GET `/api/services` — قائمة الخدمات

**الوصف**: جلب قائمة الخدمات المتاحة مع إمكانية التصفية والبحث

**معاملات الاستعلام**:
| المعامل | النوع | الوصف |
|---|---|---|
| `category` | string | تصفية حسب قسم (slug) مثل `ai-subscriptions` |
| `search` | string | بحث في الاسم والوصف |
| `featured` | string | `true` للخدمات المميزة فقط |
| `sort` | string | `sortOrder` (افتراضي)، `price_asc`، `price_desc`، `rating`، `popular`، `newest` |

**مثال**: `GET /api/services?category=ai-subscriptions&sort=rating`

**الاستجابة**:
```json
{
  "success": true,
  "data": [
    {
      "id": "clx1svc1",
      "categoryId": "clx1cat1",
      "name": "ChatGPT Plus",
      "nameEn": "ChatGPT Plus",
      "slug": "chatgpt-plus",
      "description": "اشتراك ChatGPT Plus لمدة شهر كامل...",
      "features": "[\"وصول كامل إلى GPT-4\",\"إنشاء صور DALL-E\"]",
      "price": 24.99,
      "priceYER": 6250,
      "priceSAR": 93.74,
      "badge": "popular",
      "rating": 4.9,
      "reviewCount": 342,
      "salesCount": 1250,
      "deliveryTime": "0-2 ساعة",
      "isAvailable": true,
      "isFeatured": true,
      "category": {
        "id": "clx1cat1",
        "name": "اشتراكات الذكاء الاصطناعي",
        "nameEn": "AI Subscriptions",
        "slug": "ai-subscriptions",
        "icon": "Brain",
        "color": "#06B6D4"
      }
    }
  ],
  "count": 8
}
```

---

### 2.4 GET `/api/services/[id]` — تفاصيل الخدمة

**الوصف**: جلب تفاصيل خدمة واحدة مع التقييمات

**الاستجابة**:
```json
{
  "success": true,
  "data": {
    "id": "clx1svc1",
    "name": "ChatGPT Plus",
    "price": 24.99,
    "reviews": [
      {
        "id": "clx1rev1",
        "userId": "clx1user1",
        "rating": 5,
        "comment": "خدمة ممتازة وسريعة جداً!",
        "isVerified": true,
        "createdAt": "2025-01-22T10:00:00.000Z"
      }
    ],
    "category": { "..." }
  }
}
```

---

### 2.5 GET `/api/orders?userId=xxx` — قائمة طلبات المستخدم

**الوصف**: جلب جميع طلبات مستخدم معين

**معاملات الاستعلام**:
| المعامل | النوع | مطلوب | الوصف |
|---|---|---|---|
| `userId` | string | نعم | معرف المستخدم |

**الاستجابة**:
```json
{
  "success": true,
  "data": [
    {
      "id": "clx1ord1",
      "orderNumber": "ZYN-000001",
      "status": "completed",
      "totalAmount": 24.99,
      "currency": "USD",
      "paymentMethod": "jeib",
      "paymentStatus": "paid",
      "items": [
        {
          "id": "clx1item1",
          "serviceId": "clx1svc1",
          "quantity": 1,
          "unitPrice": 24.99,
          "totalPrice": 24.99,
          "service": {
            "name": "ChatGPT Plus",
            "deliveryTime": "0-2 ساعة"
          }
        }
      ]
    }
  ],
  "count": 3
}
```

---

### 2.6 POST `/api/orders` — إنشاء طلب جديد

**الوصف**: إنشاء طلب جديد مع دعم الكوبونات

**الطلب**:
```json
{
  "userId": "clx1user1",
  "serviceId": "clx1svc1",
  "quantity": 1,
  "details": "{\"username\": \"ahmed@example.com\"}",
  "paymentMethod": "jeib",
  "couponCode": "ZYNEX10"
}
```

**الاستجابة (نجاح - 201)**:
```json
{
  "success": true,
  "data": {
    "id": "clx1ord4",
    "orderNumber": "ZYN-000004",
    "status": "pending",
    "totalAmount": 22.49,
    "couponCode": "ZYNEX10",
    "discountAmount": 2.50,
    "items": [ "..." ]
  },
  "message": "Order created successfully"
}
```

**التحققات**:
- `userId` و `serviceId` و `paymentMethod` مطلوبة
- المستخدم موجود
- الخدمة موجودة ومتاحة
- الكوبون صالح ولم يتجاوز الحد الأقصى للاستخدام

---

### 2.7 GET `/api/orders/[id]` — تفاصيل الطلب

**الوصف**: جلب تفاصيل طلب معين مع بيانات المستخدم والعناصر والمعاملات

**الاستجابة**: تتضمن بيانات المستخدم (الاسم، البريد، الهاتف)، عناصر الطلب مع بيانات الخدمة، والمعاملات المالية.

---

### 2.8 PATCH `/api/orders/[id]` — تحديث حالة الطلب

**الوصف**: تحديث حالة الطلب أو حالة الدفع

**الطلب**:
```json
{
  "status": "completed",
  "paymentStatus": "paid"
}
```

**الحالات المسموحة**:
- `status`: pending, processing, completed, failed, refunded, cancelled
- `paymentStatus`: pending, paid, failed, refunded

---

### 2.9 POST `/api/coupons/validate` — التحقق من كوبون

**الوصف**: التحقق من صلاحية كوبون الخصم وحساب مبلغ الخصم

**الطلب**:
```json
{
  "code": "ZYNEX10",
  "orderAmount": 24.99
}
```

**الاستجابة (كوبون صالح)**:
```json
{
  "success": true,
  "data": {
    "valid": true,
    "code": "ZYNEX10",
    "discountType": "percentage",
    "discountValue": 10,
    "minOrderAmount": 5,
    "discountAmount": 2.50,
    "message": "10% discount applied"
  }
}
```

**الاستجابة (كوبون غير صالح)**:
```json
{
  "success": true,
  "data": {
    "valid": false,
    "reason": "Coupon has expired"
  }
}
```

**أسباب الرفض المحتملة**: Coupon not found, not active, expired, not yet valid, reached maximum uses, minimum order amount not met

---

### 2.10 GET `/api/stats` — إحصائيات الموقع

**الوصف**: جلب إحصائيات عامة للموقع

**الاستجابة**:
```json
{
  "success": true,
  "data": {
    "totalOrders": 3,
    "totalUsers": 2,
    "totalRevenue": 24.99,
    "totalServices": 8,
    "recentOrdersCount": 3,
    "pendingOrdersCount": 1,
    "completedOrders": 1,
    "popularServices": [ "..." ]
  }
}
```

---

### 2.11 GET `/api/admin/orders` — طلبات الإدارة

**الوصف**: جلب جميع الطلبات مع بيانات المستخدم (للإدارة)

**معاملات الاستعلام**:
| المعامل | النوع | الوصف |
|---|---|---|
| `status` | string | تصفية حسب الحالة |
| `page` | number | رقم الصفحة (افتراضي: 1) |
| `limit` | number | عدد العناصر في الصفحة (افتراضي: 20) |

**الاستجابة**: تتضمن `pagination` مع `page`, `limit`, `total`, `totalPages`

---

### 2.12 PATCH `/api/admin/orders` — تحديث طلب (إدارة)

**الوصف**: تحديث حالة طلب من لوحة الإدارة مع تحديث تلقائي لعدد مبيعات الخدمة عند الإكمال

**الطلب**:
```json
{
  "orderId": "clx1ord1",
  "status": "completed",
  "paymentStatus": "paid"
}
```

---

### 2.13 GET `/api/admin/services` — خدمات الإدارة

**الوصف**: جلب جميع الخدمات بما فيها غير المتاحة

**معاملات الاستعلام**: `category` (slug), `status` (active/inactive)

---

### 2.14 POST `/api/admin/services` — إنشاء خدمة جديدة

**الوصف**: إنشاء خدمة جديدة من لوحة الإدارة

**الطلب**:
```json
{
  "categoryId": "clx1cat1",
  "name": "YouTube Premium",
  "nameEn": "YouTube Premium",
  "slug": "youtube-premium",
  "description": "اشتراك YouTube Premium بدون إعلانات",
  "features": ["بدون إعلانات", "تشغيل في الخلفية", "YouTube Music"],
  "price": 13.99,
  "priceYER": 3500,
  "priceSAR": 52.46,
  "deliveryTime": "0-1 ساعة",
  "isAvailable": true,
  "isFeatured": false
}
```

---

## 3. شرح الـ Components

### 3.1 Header (`src/components/layout/header.tsx`)

**الغرض**: شريط التنقل الرئيسي العلوي

**المميزات**:
- شريط ثابت (sticky) مع تأثير Glass-morphism عند التمرير
- حد Gradient متحرك (بنفسجي ← سماوي ← أخضر)
- شعار مع اسم المتجر ووصفه
- روابط التنقل: الرئيسية، الخدمات، الأقسام، تواصل معنا
- زر البحث (يفتح Search Dialog)
- زر تبديل السمة (داكن/فاتح) مع حركة دوران
- جرس الإشعارات مع Badge عداد
- سلة التسوق مع Badge
- أيقونة المستخدم (حرف أول من الاسم عند تسجيل الدخول)
- قائمة جوال (Sheet) مع روابط وحالة المصادقة

**الاعتماديات**: `useAppStore`, `useAuthStore`, `next-themes`, `framer-motion`

---

### 3.2 Footer (`src/components/layout/footer.tsx`)

**الغرض**: تذييل الموقع

**المميزات**:
- خط Gradient علوي
- خلفية داكنة (`#0A0A0F`)
- 4 أعمدة: العلامة التجارية والوصف، روابط سريعة، أقسام الخدمات، النشرة البريدية
- معلومات الاتصال (بريد، هاتف، موقع)
- اشتراك النشرة البريدية
- أيقونات التواصل الاجتماعي (تليجرام، واتساب، إنستجرام، تيك توك، يوتيوب) بـ SVG مخصص
- قسم طرق الدفع (6 طرق)
- حقوق النشر وروابط قانونية

---

### 3.3 HeroSection (`src/components/home/hero-section.tsx`)

**الغرض**: القسم البطولي للصفحة الرئيسية

**المميزات**:
- 3 كرات Gradient متحركة (بنفسجية، سماوية، خضراء) مع تأثير التنفس
- نمط شبكي خفيف
- Badge: "المنصة الأولى للخدمات الرقمية في اليمن"
- عنوان متدرج: "متجرك الأول للخدمات الرقمية"
- عنوان فرعي وصفي
- أزرار CTA: "تصفح الخدمات" (Gradient) و"تعرف علينا" (Outline)
- 3 إحصائيات مع أيقونات

---

### 3.4 ServiceCard (`src/components/services/service-card.tsx`)

**الغرض**: بطاقة عرض خدمة فردية

**الخصائص (Props)**:
| الخاصية | النوع | الوصف |
|---|---|---|
| `id` | string | معرف الخدمة |
| `name` | string | اسم الخدمة بالعربي |
| `nameEn` | string | اسم الخدمة بالإنجليزي |
| `description` | string | وصف الخدمة |
| `price` | number | السعر بالدولار |
| `priceYER` | number? | السعر بالريال اليمني |
| `originalPrice` | number? | السعر الأصلي (للخصم) |
| `badge` | string? | الشارة (popular, new, bestseller, premium, limited) |
| `rating` | number | التقييم (1-5) |
| `reviewCount` | number | عدد التقييمات |
| `deliveryTime` | string? | وقت التسليم |
| `categoryColor` | string? | لون القسم |
| `onOrder` | function? | دالة استدعاء زر الطلب |

**المميزات**: رأس Gradient ملون حسب القسم، أيقونة القسم، Badge شارة، تقييم نجوم، أسعار بعملات متعددة، تأثير Shimmer عند التحويم

---

### 3.5 OrderModal (`src/components/services/order-modal.tsx`)

**الغرض**: نافذة تأكيد الطلب

**الخصائص (Props)**:
| الخاصية | النوع | الوصف |
|---|---|---|
| `isOpen` | boolean | حالة فتح النافذة |
| `onClose` | function | دالة الإغلاق |
| `service` | ServiceData? | بيانات الخدمة المطلوبة |

**المميزات**:
- عرض معلومات الخدمة مع Badge
- اختيار الكمية (1-10) بأزرار +/-
- إدخال الحساب/اسم المستخدم (مطلوب)
- ملاحظات (اختياري)
- كوبون خصم مع تحقق (ZYNEX10: 10%, ZYNEX20: 20%)
- طرق الدفع: 5 يمنية (جيب، جوالي، فلوسك، ون كاش، محفظتي) + 4 دولية (PayPal, Stripe, Binance, Crypto)
- ملخص الطلب مع الإجمالي
- تحقق من النماذج ورسائل خطأ عربية

---

### 3.6 AuthModal (`src/components/auth/auth-modal.tsx`)

**الغرض**: نافذة تسجيل الدخول وإنشاء الحساب

**الخصائص (Props)**:
| الخاصية | النوع | الوصف |
|---|---|---|
| `isOpen` | boolean | حالة فتح النافذة |
| `onClose` | function | دالة الإغلاق |

**المميزات**:
- تبديل بين تسجيل الدخول وإنشاء حساب بحركة Spring
- نموذج تسجيل الدخول: بريد إلكتروني، كلمة مرور مع إظهار/إخفاء
- نموذج إنشاء حساب: اسم، بريد، هاتف (اختياري)، كلمة مرور، تأكيد كلمة المرور
- تحقق كامل من النماذج مع رسائل خطأ عربية
- تسجيل دخول كضيف
- أزرار تسجيل دخول اجتماعي (Google, Telegram)
- رابط "نسيت كلمة المرور؟"

---

### 3.7 UserDashboard (`src/components/dashboard/user-dashboard.tsx`)

**الغرض**: لوحة تحكم المستخدم الشاملة

**علامات التبويب (6)**:

| التبويب | الأيقونة | المحتوى |
|---|---|---|
| نظرة عامة | LayoutDashboard | بطاقة ترحيب، 4 بطاقات إحصائيات، جدول آخر الطلبات |
| طلباتي | ShoppingBag | قائمة الطلبات مع تصفية حسب الحالة، تتبع الطلب الموسع |
| المحفظة | Wallet | رصيد المحفظة، نموذج إيداع مع مبالغ سريعة، سجل المعاملات |
| التذاكر | TicketCheck | تذاكر الدعم مع حالة وأولوية، زر إنشاء تذكرة جديدة |
| الإشعارات | Bell | إشعارات مقروءة/غير مقروءة، تعيين الكل كمقروء |
| الإعدادات | Settings | تعديل الملف الشخصي، تغيير كلمة المرور، التفضيلات |

---

### 3.8 AdminDashboard (`src/components/admin/admin-dashboard.tsx`)

**الغرض**: لوحة تحكم الإدارة الشاملة

**الأقسام (8)**:

| القسم | المحتوى |
|---|---|
| نظرة عامة | 4 بطاقات إحصائيات، رسم الإيرادات (LineChart)، رسم الطلبات حسب القسم (BarChart)، أحدث الطلبات، أفضل الخدمات |
| الطلبات | تصفية وبحث، جدول طلبات مع إجراءات (عرض، تحديث، استرداد) |
| الخدمات | عرض شبكة/قائمة، إضافة خدمة (Dialog)، تبديل التوفر، تعديل/حذف |
| المستخدمين | جدول مستخدمين مع بحث، تبديل الحالة، عرض التفاصيل (Dialog) |
| المدفوعات | بطاقات طرق الدفع، سجل المعاملات مع تصفية |
| الكوبونات | 5 كوبونات تجريبية، إنشاء كوبون، نسخ الكود، شريط تقدم الاستخدام |
| الإحصائيات | مقاييس رئيسية، إيرادات شهرية، توزيع الدفع (PieChart) |
| الإعدادات | اسم الموقع، وصف، طرق الدفع (8 تبديلات)، الإشعارات |

---

### 3.9 SearchModal (`src/components/shared/search-modal.tsx`)

**الغرض**: نافذة البحث الشاملة

**المميزات**:
- اختصار لوحة المفاتيح Ctrl+K / Cmd+K
- بحث فوري في الخدمات بالاسم والوصف والقسم
- عمليات بحث حديثة (محفوظة في localStorage)
- اقتراحات بحث شائعة
- تنقل بلوحة المفاتيح
- حالة فارغة

---

### 3.10 OrderTracking (`src/components/dashboard/order-tracking.tsx`)

**الغرض**: عرض مرئي لتتبع حالة الطلب

**الخصائص (Props)**:
| الخاصية | النوع | الوصف |
|---|---|---|
| `order` | Order | بيانات الطلب |

**المميزات**: شريط تقدم بـ 3 مراحل، معالجة الحالات السلبية (فشل، مسترد، ملغي)، تفاصيل الطلب، جدول زمني للأحداث

---

## 4. شرح الـ Database Schema

### 4.1 نموذج User (المستخدم)

```
User
├── id            String    @id @default(cuid())     # معرف فريد
├── email         String    @unique                   # البريد الإلكتروني (فريد)
├── name          String?                             # الاسم
├── password      String                              # كلمة المرور (مشفرة)
├── phone         String?                             # رقم الهاتف
├── avatar        String?                             # رابط الصورة الشخصية
├── role          String    @default("customer")      # الدور: customer أو admin
├── isVerified    Boolean   @default(false)           # حالة التحقق
├── balance       Float     @default(0)               # رصيد المحفظة
├── currency      String    @default("USD")           # العملة الافتراضية
├── createdAt     DateTime  @default(now())
├── updatedAt     DateTime  @updatedAt
├── orders        Order[]                             # الطلبات
├── transactions  Transaction[]                       # المعاملات
├── tickets       Ticket[]                            # تذاكر الدعم
├── notifications Notification[]                      # الإشعارات
└── wallet        Wallet?                             # المحفظة
```

---

### 4.2 نموذج Wallet (المحفظة)

```
Wallet
├── id            String    @id @default(cuid())
├── userId        String    @unique                   # معرف المستخدم (فريد)
├── user          User      @relation                  # العلاقة مع المستخدم
├── yemeniWallet  String?                             # رقم المحفظة اليمنية
├── walletType    String?                             # نوع المحفظة: jeib, jawali, floosk, onecash, mahfazati
├── paypalEmail   String?                             # بريد PayPal
├── stripeId      String?                             # معرف Stripe
├── binanceId     String?                             # معرف Binance
├── createdAt     DateTime
└── updatedAt     DateTime
```

---

### 4.3 نموذج Category (القسم)

```
Category
├── id          String    @id @default(cuid())
├── name        String                              # الاسم بالعربي
├── nameEn      String                              # الاسم بالإنجليزي
├── slug        String    @unique                    # الرابط (فريد)
├── description String?                             # الوصف
├── icon        String?                             # اسم الأيقونة (Lucide)
├── image       String?                             # رابط الصورة
├── color       String?                             # اللون (Hex)
├── sortOrder   Int       @default(0)               # ترتيب العرض
├── isActive    Boolean   @default(true)            # حالة التفعيل
├── services    Service[]                           # الخدمات
├── createdAt   DateTime
└── updatedAt   DateTime
```

---

### 4.4 نموذج Service (الخدمة)

```
Service
├── id            String    @id @default(cuid())
├── categoryId    String                              # معرف القسم
├── category      Category  @relation                  # القسم
├── name          String                              # الاسم بالعربي
├── nameEn        String                              # الاسم بالإنجليزي
├── slug          String    @unique                    # الرابط (فريد)
├── description   String                              # الوصف
├── features      String                              # المميزات (JSON string)
├── price         Float                               # السعر بالدولار
├── priceYER      Float?                              # السعر بالريال اليمني
├── priceSAR      Float?                              # السعر بالريال السعودي
├── originalPrice Float?                              # السعر الأصلي (قبل الخصم)
├── image         String?                             # رابط الصورة
├── icon          String?                             # اسم الأيقونة
├── badge         String?                             # الشارة: popular, new, bestseller, limited
├── rating        Float     @default(0)               # التقييم
├── reviewCount   Int       @default(0)               # عدد التقييمات
├── salesCount    Int       @default(0)               # عدد المبيعات
├── deliveryTime  String?                             # وقت التسليم
├── isAvailable   Boolean   @default(true)            # متاح للطلب
├── isFeatured    Boolean   @default(false)           # خدمة مميزة
├── sortOrder     Int       @default(0)               # ترتيب العرض
├── faq           String?                             # الأسئلة الشائعة (JSON string)
├── requirements  String?                             # المتطلبات (JSON string)
├── orders        OrderItem[]                         # عناصر الطلب
├── reviews       Review[]                            # التقييمات
├── createdAt     DateTime
└── updatedAt     DateTime
```

---

### 4.5 نموذج Order (الطلب)

```
Order
├── id             String    @id @default(cuid())
├── orderNumber    String    @unique                   # رقم الطلب (ZYN-XXXXXX)
├── userId         String                              # معرف المستخدم
├── user           User      @relation                  # المستخدم
├── status         String    @default("pending")       # الحالة
├── totalAmount    Float                               # المبلغ الإجمالي
├── currency       String    @default("USD")           # العملة
├── paymentMethod  String?                             # طريقة الدفع
├── paymentStatus  String    @default("pending")       # حالة الدفع
├── paymentId      String?                             # مرجع الدفع الخارجي
├── couponCode     String?                             # كود الكوبون
├── discountAmount Float?                              # مبلغ الخصم
├── notes          String?                             # ملاحظات
├── items          OrderItem[]                         # عناصر الطلب
├── transactions   Transaction[]                       # المعاملات
├── createdAt      DateTime
└── updatedAt      DateTime
```

**حالات الطلب**: `pending` (قيد الانتظار) → `processing` (قيد التنفيذ) → `completed` (مكتمل) | `failed` (فشل) | `refunded` (مسترد) | `cancelled` (ملغي)

**حالات الدفع**: `pending` (قيد الانتظار) → `paid` (مدفوع) | `failed` (فشل) | `refunded` (مسترد)

---

### 4.6 نموذج OrderItem (عنصر الطلب)

```
OrderItem
├── id          String    @id @default(cuid())
├── orderId     String                              # معرف الطلب
├── order       Order     @relation                  # الطلب
├── serviceId   String                              # معرف الخدمة
├── service     Service   @relation                  # الخدمة
├── quantity    Int       @default(1)               # الكمية
├── unitPrice   Float                               # سعر الوحدة
├── totalPrice  Float                               # السعر الإجمالي
├── details     String?                             # تفاصيل إضافية (JSON string)
├── status      String    @default("pending")       # الحالة
├── createdAt   DateTime
└── updatedAt   DateTime
```

---

### 4.7 نموذج Transaction (المعاملة)

```
Transaction
├── id             String    @id @default(cuid())
├── userId         String                              # معرف المستخدم
├── user           User      @relation                  # المستخدم
├── orderId        String?                             # معرف الطلب (اختياري)
├── order          Order?    @relation                  # الطلب
├── type           String                              # النوع: deposit, payment, refund, withdrawal
├── amount         Float                               # المبلغ
├── currency       String    @default("USD")           # العملة
├── status         String    @default("pending")       # الحالة
├── paymentMethod  String?                             # طريقة الدفع
├── paymentDetails String?                             # تفاصيل الدفع (JSON string)
├── reference      String?                             # المرجع
├── createdAt      DateTime
└── updatedAt      DateTime
```

---

### 4.8 نموذج Review (التقييم)

```
Review
├── id         String    @id @default(cuid())
├── serviceId  String                              # معرف الخدمة
├── service    Service   @relation                  # الخدمة
├── userId     String                              # معرف المستخدم
├── rating     Int                                 # التقييم (1-5)
├── comment    String?                             # التعليق
├── isVerified Boolean   @default(false)           # تقييم موثق
├── createdAt  DateTime
├── updatedAt  DateTime
└── @@unique([serviceId, userId])                  # تقييم واحد لكل مستخدم لكل خدمة
```

---

### 4.9 نموذج Ticket (تذكرة الدعم)

```
Ticket
├── id          String    @id @default(cuid())
├── userId      String                              # معرف المستخدم
├── user        User      @relation                  # المستخدم
├── subject     String                              # الموضوع
├── description String                              # الوصف
├── status      String    @default("open")          # الحالة: open, in_progress, resolved, closed
├── priority    String    @default("medium")        # الأولوية: low, medium, high, urgent
├── category    String?                             # التصنيف: order, payment, service, general
├── messages    TicketMessage[]                     # الرسائل
├── createdAt   DateTime
└── updatedAt   DateTime
```

---

### 4.10 نموذج Notification (الإشعار)

```
Notification
├── id        String    @id @default(cuid())
├── userId    String                              # معرف المستخدم
├── user      User      @relation                  # المستخدم
├── title     String                              # العنوان
├── message   String                              # الرسالة
├── type      String                              # النوع: order, payment, system, promotion
├── isRead    Boolean   @default(false)           # مقروء
├── link      String?                             # رابط
├── createdAt DateTime
└── updatedAt DateTime
```

---

### 4.11 نموذج Coupon (كوبون الخصم)

```
Coupon
├── id                   String    @id @default(cuid())
├── code                 String    @unique           # كود الكوبون (فريد)
├── discountType         String                      # النوع: percentage أو fixed
├── discountValue        Float                       # قيمة الخصم
├── minOrderAmount       Float?                      # الحد الأدنى للطلب
├── maxUses              Int?                        # الحد الأقصى للاستخدام
├── usedCount            Int       @default(0)       # عدد مرات الاستخدام
├── validFrom            DateTime                    # تاريخ البداية
├── validUntil           DateTime                    # تاريخ الانتهاء
├── isActive             Boolean   @default(true)    # مفعّل
├── applicableCategories String?                     # الأقسام المطبقة (JSON string)
├── createdAt            DateTime
└── updatedAt            DateTime
```

---

### 4.12 نماذج المصادقة (Account, Session, VerificationToken)

نماذج متوافقة مع NextAuth.js v4:

- **Account**: تخزين بيانات مزودي المصادقة الخارجية (Google, Telegram, إلخ)
- **Session**: إدارة جلسات المستخدمين
- **VerificationToken**: رموز التحقق من البريد الإلكتروني وإعادة تعيين كلمة المرور

---

### 4.13 نماذج الإعدادات والتحليلات

- **SiteSetting**: إعدادات الموقع (مفتاح-قيمة) مع نوع القيمة (text, json, number, boolean)
- **AnalyticsEvent**: أحداث التحليلات (مشاهدات الصفحات، النقرات، المشتريات، التسجيلات)

---

### مخطط العلاقات

```
User 1──→ N Order
User 1──→ 1 Wallet
User 1──→ N Transaction
User 1──→ N Ticket 1──→ N TicketMessage
User 1──→ N Notification

Category 1──→ N Service
Service 1──→ N OrderItem ←── N Order
Service 1──→ N Review

Order 1──→ N Transaction
```

---

## 5. شرح نظام Authentication

### 5.1 عملية التسجيل

1. **إدخال البيانات**: المستخدم يملأ نموذج التسجيل (الاسم، البريد، الهاتف اختياري، كلمة المرور، تأكيد كلمة المرور)
2. **التحقق من النموذج**:
   - الاسم: 3 أحرف على الأقل
   - البريد الإلكتروني: صيغة صحيحة
   - رقم الهاتف: صيغة صحيحة (7-15 رقم)
   - كلمة المرور: 6 أحرف على الأقل
   - تأكيد كلمة المرور: مطابقة
3. **إرسال الطلب**: `POST /api/auth/register`
4. **التحقق من الخادم**:
   - التحقق من صحة البريد الإلكتروني
   - التحقق من عدم تسجيل البريد مسبقاً
   - تشفير كلمة المرور باستخدام `simpleHash()`
5. **إنشاء الحساب**: دور `customer` افتراضياً، `isVerified: false`
6. **تسجيل الدخول تلقائياً**: تحديث Zustand store بالبيانات

### 5.2 عملية تسجيل الدخول

1. **إدخال البيانات**: البريد الإلكتروني وكلمة المرور
2. **التحقق من النموذج**: صيغة البريد، طول كلمة المرور
3. **إرسال الطلب**: `POST /api/auth/login`
4. **التحقق من الخادم**:
   - البحث عن المستخدم بالبريد الإلكتروني
   - تشفير كلمة المرور المدخلة ومقارنتها بالمخزنة
   - إرجاع بيانات المستخدم بدون كلمة المرور
5. **تحديث الحالة**: `useAuthStore.login()` يحفظ بيانات المستخدم في Zustand مع `persist`

### 5.3 إدارة الجلسة

- **Zustand Persist**: بيانات المستخدم محفوظة في `localStorage` باسم `zynex-auth-store`
- **البيانات المحفوظة**: `user` (id, email, name, role, balance) و `isAuthenticated`
- **تسجيل الخروج**: `useAuthStore.logout()` يمسح البيانات من الحالة و localStorage

### 5.4 الدخول كضيف

- يتيح للمستخدم تصفح المتجر بدون حساب
- ينشئ مستخدم مؤقت بـ ID عشوائي وبريد `guest@zynex.store`
- يمكن ترقيته لحساب حقيقي لاحقاً

### 5.5 تسجيل الدخول الاجتماعي (UI فقط)

- أزرار Google و Telegram موجودة في واجهة المستخدم
- تعرض رسالة "قريباً!" عند النقر
- البنية التحتية (Account, Session models) جاهزة لدمج NextAuth.js

### 5.6 تشفير كلمة المرور

> ⚠️ **ملاحظة**: النظام الحالي يستخدم تشفير بسيط (`simpleHash`) لأغراض العرض. في بيئة الإنتاج يجب استخدام `bcrypt` أو `argon2`.

**الخوارزمية الحالية**:
```typescript
function simpleHash(password: string): string {
  let hash = 0;
  for (let i = 0; i < password.length; i++) {
    const char = password.charCodeAt(i);
    hash = ((hash << 5) - hash) + char;
    hash = hash & hash;
  }
  return `hashed_${Math.abs(hash).toString(36)}_${password.length}`;
}
```

---

## 6. شرح الأمن والحماية

### 6.1 التحقق من المدخلات (Input Validation)

#### على مستوى العميل (Client-side)
- **نماذج التسجيل والدخول**: تحقق فوري من صحة البيانات قبل الإرسال
  - البريد الإلكتروني: regex `/^[^\s@]+@[^\s@]+\.[^\s@]+$/`
  - كلمة المرور: 6 أحرف على الأقل
  - الاسم: 3 أحرف على الأقل
  - الهاتف: regex `/^[\d+\-() ]{7,15}$/`
- **نموذج الطلب**: التحقق من الحساب، طريقة الدفع، الكمية (1-10)
- **رسائل خطأ عربية**: واضحة ومفيدة للمستخدم

#### على مستوى الخادم (Server-side)
- **جميع مسارات API**: تحقق من الحقول المطلوبة
- **أنواع البيانات**: التحقق من صحة القيم (مثلاً: حالة الطلب يجب أن تكون واحدة من القيم المسموحة)
- **تفرد البيانات**: البريد الإلكتروني فريد، slug الخدمة فريد، كود الكوبون فريد

### 6.2 حماية CSRF (Cross-Site Request Forgery)

- **Next.js API Routes**: تستخدم آليات الحماية المدمجة في Next.js
- **توصية للإنتاج**: إضافة CSRF token في headers لجميع طلبات POST/PATCH/DELETE
- **SameSite Cookies**: تفعيل خاصية SameSite على ملفات تعريف الارتباط

### 6.3 تحديد معدل الطلبات (Rate Limiting)

> ⚠️ **ملاحظة**: Rate limiting غير مفعل حالياً. يجب تفعيله في الإنتاج.

**التوصيات**:
```
POST /api/auth/login       → 5 طلبات/دقيقة لكل IP
POST /api/auth/register    → 3 طلبات/دقيقة لكل IP
POST /api/orders           → 10 طلبات/دقيقة لكل مستخدم
POST /api/coupons/validate → 20 طلبات/دقيقة لكل مستخدم
GET  /api/*                → 60 طلبات/دقيقة لكل IP
```

**أدوات مقترحة**: `express-rate-limit`, `rate-limiter-flexible`, أو middleware مخصص في Next.js

### 6.4 حماية قاعدة البيانات

- **Prisma ORM**: يمنع حقن SQL تلقائياً باستخدام المعلمات المُعدة (Prepared Statements)
- **معرفات CUID**: استخدام معرفات فريدة يصعب تخمينها بدلاً من أرقام تسلسلية
- **حذف متسلسل (Cascade Delete)**: عند حذف مستخدم يتم حذف جميع بياناته المرتبطة

### 6.5 حماية البيانات الحساسة

- **كلمات المرور**: لا يتم إرجاعها في أي استجابة API (يتم استبعادها باستخدام destructuring)
- **بيانات المستخدم**: تحديد الحقول المعادة في كل مسار (select) لتجنب تسريب بيانات حساسة
- **مفاتيح API**: يجب تخزينها في متغيرات البيئة وليس في الكود

### 6.6 أمان الاتصال

- **HTTPS**: إلزامي في بيئة الإنتاج
- **HTTP Headers**: تفعيل headers أمنية
  - `X-Content-Type-Options: nosniff`
  - `X-Frame-Options: DENY`
  - `X-XSS-Protection: 1; mode=block`
  - `Content-Security-Policy`
  - `Strict-Transport-Security`

### 6.7 توصيات تحسين الأمان للإنتاج

1. **تشفير كلمات المرور**: استبدال `simpleHash` بـ `bcrypt` (cost factor: 12+)
2. **JWT Tokens**: استخدام JSON Web Tokens مع مدة انتهاء قصيرة
3. **Refresh Tokens**: لتجديد الجلسة بدون إعادة تسجيل الدخول
4. **Two-Factor Authentication**: إضافة مصادقة ثنائية اختيارية
5. **IP Whitelisting**: لعمليات الإدارة
6. **Audit Logging**: تسجيل جميع العمليات الحساسة
7. **Data Encryption at Rest**: تشفير قاعدة البيانات في الإنتاج
8. **Content Security Policy**: تفعيل وتكوين CSP لمنع XSS
9. **Input Sanitization**: تنظيف جميع المدخلات النصية من HTML/JavaScript
10. **Regular Security Audits**: فحص أمني دوري للكود والبنية التحتية

---

<div align="center">

**تم إعداد هذا التوثيق بعناية لمشروع Zynex Store**

© 2025 Zynex Store

</div>
