# Zynex Store - دليل التوثيق الشامل

## 📋 محتويات مجلد التوثيق

| الملف | الوصف |
|-------|-------|
| `README.md` | شرح المشروع وطريقة التثبيت والتشغيل |
| `market-analysis.md` | تحليل السوق الرقمي الشامل |
| `brand-guidelines.md` | دليل الهوية البصرية الكامل |
| `documentation.md` | التوثيق التقني الشامل (APIs, Components, Database) |
| `project-context.md` | سياق المشروع وفلسفة التصميم وخطة التوسع |
| `deployment-guide.md` | دليل النشر الكامل (Vercel, VPS, Docker) |
| `database-schema.prisma` | مخطط قاعدة البيانات الكامل |
| `types-reference.ts` | مرجع أنواع TypeScript |
| `constants-reference.ts` | مرجع الثوابت والبيانات الثابتة |
| `api-reference.md` | مرجع API الشامل |
| `architecture-guide.md` | دليل البنية البرمجية |

## 🚀 البدء السريع

### 1. التثبيت
```bash
cd zynex-store
bun install
cp .env.example .env
bun run db:push
bun run prisma/seed.ts
bun run dev
```

### 2. بيانات الدخول
- **الأدمن**: admin@zynex.store / admin123
- **عميل تجريبي**: customer@test.com / test123
- **كوبونات**: ZYNEX10 (خصم 10%) - ZYNEX20 (خصم $5)

### 3. روابط مهمة
- المتجر: http://localhost:3000
- API الخدمات: http://localhost:3000/api/services
- API الإحصائيات: http://localhost:3000/api/stats

## 🏗️ البنية البرمجية

```
zynex-store/
├── src/
│   ├── app/                    # Next.js App Router
│   │   ├── layout.tsx          # التخطيط الرئيسي (RTL + Dark Mode)
│   │   ├── page.tsx            # الصفحة الرئيسية
│   │   ├── globals.css         # الأنماط العامة
│   │   └── api/                # API Routes
│   │       ├── services/       # خدمات المتجر
│   │       ├── orders/         # نظام الطلبات
│   │       ├── auth/           # المصادقة
│   │       ├── coupons/        # الكوبونات
│   │       ├── stats/          # الإحصائيات
│   │       └── admin/          # إدارة الأدمن
│   ├── components/
│   │   ├── layout/             # Header & Footer
│   │   ├── home/               # أقسام الصفحة الرئيسية
│   │   ├── services/           # بطاقات الخدمات ونافذة الطلب
│   │   ├── auth/               # نافذة المصادقة
│   │   ├── dashboard/          # لوحة تحكم المستخدم
│   │   ├── admin/              # لوحة تحكم الأدمن
│   │   ├── shared/             # مكونات مشتركة
│   │   └── ui/                 # shadcn/ui components
│   ├── lib/
│   │   ├── constants.ts        # الثوابت والبيانات
│   │   ├── utils.ts            # الدوال المساعدة
│   │   └── db.ts               # اتصال Prisma
│   ├── store/                  # Zustand stores
│   ├── types/                  # TypeScript types
│   └── hooks/                  # React hooks
├── prisma/
│   ├── schema.prisma           # مخطط قاعدة البيانات
│   └── seed.ts                 # بيانات تجريبية
├── public/
│   ├── logo.svg                # الشعار
│   └── favicon.svg             # أيقونة المتصفح
└── documentation/              # مجلد التوثيق
```

## 💡 للمزيد من التفاصيل
راجع كل ملف على حدة للحصول على الشرح الكامل والمفصل.
