<div align="center">

# Zynex Store - متجرك الأول للخدمات الرقمية

[![Next.js](https://img.shields.io/badge/Next.js-16-black?logo=next.js)](https://nextjs.org/)
[![TypeScript](https://img.shields.io/badge/TypeScript-5-blue?logo=typescript)](https://www.typescriptlang.org/)
[![Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS-4-38B2AC?logo=tailwind-css)](https://tailwindcss.com/)
[![Prisma](https://img.shields.io/badge/Prisma-6-2D3748?logo=prisma)](https://www.prisma.io/)

**منصة عربية متكاملة لبيع وشراء الخدمات الرقمية**

The first Arabic digital services marketplace — built with modern web technologies for the Yemeni and Arab market.

[🚀 Getting Started](#-getting-started) • [📱 Features](#-features) • [🏗️ Architecture](#️-tech-stack) • [📖 Docs](#-api-endpoints)

</div>

---

## 🌐 Description | الوصف

**English**: Zynex Store is a professional digital services e-commerce platform designed for the Arab market, specifically Yemen. It offers subscriptions, AI tools, account verification, Telegram services, social media services, and more — with support for local Yemeni payment methods (Jeib, Jawali, Floosk, OneCash, Mahfazati) alongside international options (PayPal, Stripe, Binance, Crypto).

**العربية**: Zynex Store هي منصة احترافية متكاملة لبيع وشراء الخدمات الرقمية مصممة خصيصاً للسوق العربي واليمني. تقدم المنصة اشتراكات التطبيقات، أدوات الذكاء الاصطناعي، توثيق الحسابات، خدمات تليجرام، خدمات السوشيال ميديا، والمزيد — مع دعم كامل لطرق الدفع اليمنية المحلية (جيب، جوالي، فلوسك، ون كاش، محفظتي) بالإضافة إلى طرق الدفع الدولية.

---

## ✨ Features | المميزات

### 🛒 E-Commerce Core
- **Service Catalog** — Browse 120+ digital services across 7 categories
- **Smart Search** — Real-time search with popular suggestions and filters
- **Order System** — Complete order lifecycle with tracking and status updates
- **Coupon System** — Percentage and fixed-amount discount coupons with validation
- **Multi-Currency** — USD, YER (Yemeni Rial), SAR (Saudi Riyal) support

### 💳 Payment Integration
- **Yemeni Wallets** — Jeib, Jawali, Floosk, OneCash, Mahfazati
- **International** — PayPal, Stripe, Binance Pay, Cryptocurrency
- **Secure Processing** — Payment status tracking and receipt upload

### 👤 User Experience
- **Authentication** — Registration, login, guest access with form validation
- **User Dashboard** — Orders, wallet, support tickets, notifications, settings
- **Admin Dashboard** — Full management panel with analytics and charts
- **RTL Arabic** — Full right-to-left Arabic interface
- **Dark/Light Mode** — Theme switching with system preference detection

### 🤖 AI-Powered
- **Smart Recommendations** — AI-suggested services based on browsing patterns
- **Confidence Scores** — Visual confidence indicators for recommendations

### 🎨 Design
- **Futuristic UI** — Glass-morphism, gradient effects, animated elements
- **Framer Motion** — Smooth page transitions, hover effects, scroll animations
- **Responsive** — Mobile-first design with full responsiveness
- **Accessibility** — ARIA labels, keyboard navigation, semantic HTML

### 📊 Admin Features
- **Overview Dashboard** — Revenue charts, order statistics, key metrics
- **Order Management** — Status updates, refunds, payment tracking
- **Service Management** — CRUD operations, availability toggle, grid/list views
- **User Management** — Account details, activity status, role management
- **Coupon Management** — Create, track usage, toggle activation
- **Analytics** — Revenue trends, category distribution, payment method breakdown
- **Settings** — Site configuration, payment method toggles, notifications

---

## 🏗️ Tech Stack

| Technology | Version | Purpose |
|---|---|---|
| **Next.js** | 16 | Full-stack React framework with App Router |
| **TypeScript** | 5 | Type-safe development |
| **Tailwind CSS** | 4 | Utility-first styling |
| **shadcn/ui** | Latest | UI component library (New York style) |
| **Prisma** | 6 | ORM with SQLite database |
| **Zustand** | 5 | Client state management |
| **TanStack Query** | 5 | Server state management |
| **Framer Motion** | 12 | Animations and transitions |
| **Recharts** | 2 | Data visualization and charts |
| **next-themes** | 0.4 | Dark/light mode |
| **Sonner** | 2 | Toast notifications |
| **Lucide React** | 0.525 | Icon library |
| **Zod** | 4 | Schema validation |
| **React Hook Form** | 7 | Form management |
| **next-intl** | 4 | Internationalization |

---

## 📁 Project Structure

```
zynex-store/
├── prisma/
│   ├── schema.prisma          # Database schema (15 models)
│   └── seed.ts                # Database seeder
├── db/
│   └── custom.db              # SQLite database file
├── public/
│   ├── favicon.svg
│   ├── logo.svg
│   └── robots.txt
├── src/
│   ├── app/
│   │   ├── layout.tsx         # Root layout (RTL, ThemeProvider, QueryProvider)
│   │   ├── page.tsx           # Main SPA page with view routing
│   │   ├── globals.css        # Global styles and Tailwind
│   │   └── api/
│   │       ├── route.ts                     # Health check
│   │       ├── auth/
│   │       │   ├── login/route.ts           # POST login
│   │       │   └── register/route.ts        # POST register
│   │       ├── services/
│   │       │   ├── route.ts                 # GET services (filtered)
│   │       │   └── [id]/route.ts            # GET service by ID
│   │       ├── orders/
│   │       │   ├── route.ts                 # GET/POST orders
│   │       │   └── [id]/route.ts            # GET/PATCH order by ID
│   │       ├── coupons/
│   │       │   └── validate/route.ts        # POST validate coupon
│   │       ├── stats/route.ts               # GET site statistics
│   │       └── admin/
│   │           ├── orders/route.ts          # GET/PATCH admin orders
│   │           └── services/route.ts        # GET/POST admin services
│   ├── components/
│   │   ├── ui/               # 45+ shadcn/ui components
│   │   ├── layout/
│   │   │   ├── header.tsx    # Sticky header with glass-morphism
│   │   │   └── footer.tsx    # Dark footer with newsletter
│   │   ├── home/
│   │   │   ├── hero-section.tsx       # Animated hero with stats
│   │   │   ├── services-section.tsx   # Category grid
│   │   │   ├── popular-services.tsx   # Featured services grid
│   │   │   ├── ai-suggestions.tsx     # AI-powered recommendations
│   │   │   ├── stats-section.tsx      # Animated counter stats
│   │   │   ├── features-section.tsx   # Why Zynex features
│   │   │   ├── reviews-section.tsx    # Horizontal testimonials
│   │   │   └── cta-section.tsx        # Call-to-action section
│   │   ├── services/
│   │   │   ├── service-card.tsx       # Service card with gradient
│   │   │   └── order-modal.tsx        # Order placement modal
│   │   ├── auth/
│   │   │   └── auth-modal.tsx         # Login/Register modal
│   │   ├── dashboard/
│   │   │   ├── user-dashboard.tsx     # User dashboard (6 tabs)
│   │   │   └── order-tracking.tsx     # Visual order tracker
│   │   ├── admin/
│   │   │   └── admin-dashboard.tsx    # Admin dashboard (8 sections)
│   │   └── shared/
│   │       ├── theme-provider.tsx     # next-themes wrapper
│   │       ├── query-provider.tsx     # TanStack Query provider
│   │       ├── search-modal.tsx       # Global search (Ctrl+K)
│   │       └── dark-mode-toggle.tsx   # Theme switch button
│   ├── store/
│   │   └── index.ts           # Zustand stores (App, Auth, Notification)
│   ├── types/
│   │   └── index.ts           # TypeScript type definitions
│   ├── lib/
│   │   ├── constants.ts       # App constants, categories, services data
│   │   ├── db.ts              # Prisma client singleton
│   │   └── utils.ts           # Utility functions
│   └── hooks/
│       ├── use-toast.ts       # Toast hook
│       └── use-mobile.ts      # Mobile detection hook
├── download/                  # Documentation files
├── agent-ctx/                 # Agent context files
├── package.json
├── tailwind.config.ts
├── tsconfig.json
├── next.config.ts
├── Caddyfile                  # Gateway configuration
└── README.md
```

---

## 🚀 Getting Started

### Prerequisites | المتطلبات

- **Node.js** 18+ or **Bun** runtime
- **Git** for version control

### Installation | خطوات التثبيت

```bash
# 1. Clone the repository
git clone https://github.com/zynex-store/zynex-store.git
cd zynex-store

# 2. Install dependencies
bun install

# 3. Set up environment variables
cp .env.example .env

# 4. Push database schema
bun run db:push

# 5. Seed the database with sample data
bun run prisma/seed.ts

# 6. Start the development server
bun run dev
```

The application will be available at `http://localhost:3000`

---

## 🔐 Environment Variables

| Variable | Description | Default |
|---|---|---|
| `DATABASE_URL` | SQLite database path | `file:./db/custom.db` |
| `NEXT_PUBLIC_APP_URL` | Public application URL | `https://zynex.store` |
| `NEXTAUTH_SECRET` | NextAuth.js secret key | — |
| `NEXTAUTH_URL` | NextAuth.js callback URL | `http://localhost:3000` |

---

## 📜 Available Scripts

| Script | Command | Description |
|---|---|---|
| `dev` | `bun run dev` | Start development server (port 3000) |
| `build` | `bun run build` | Build for production |
| `start` | `bun run start` | Start production server |
| `lint` | `bun run lint` | Run ESLint checks |
| `db:push` | `bun run db:push` | Push Prisma schema to database |
| `db:generate` | `bun run db:generate` | Generate Prisma client |
| `db:migrate` | `bun run db:migrate` | Run database migrations |
| `db:reset` | `bun run db:reset` | Reset database completely |

---

## 🔌 API Endpoints

### Authentication
| Method | Endpoint | Description |
|---|---|---|
| `POST` | `/api/auth/register` | Register new user |
| `POST` | `/api/auth/login` | Login with credentials |

### Services
| Method | Endpoint | Description |
|---|---|---|
| `GET` | `/api/services` | List services (filter by category, search, featured, sort) |
| `GET` | `/api/services/[id]` | Get service details with reviews |

### Orders
| Method | Endpoint | Description |
|---|---|---|
| `GET` | `/api/orders?userId=xxx` | List user orders |
| `POST` | `/api/orders` | Create new order (with coupon support) |
| `GET` | `/api/orders/[id]` | Get order details |
| `PATCH` | `/api/orders/[id]` | Update order status |

### Coupons
| Method | Endpoint | Description |
|---|---|---|
| `POST` | `/api/coupons/validate` | Validate a coupon code |

### Statistics
| Method | Endpoint | Description |
|---|---|---|
| `GET` | `/api/stats` | Get site statistics |

### Admin
| Method | Endpoint | Description |
|---|---|---|
| `GET` | `/api/admin/orders` | List all orders (paginated) |
| `PATCH` | `/api/admin/orders` | Update order status (admin) |
| `GET` | `/api/admin/services` | List all services (including inactive) |
| `POST` | `/api/admin/services` | Create new service |

---

## 🔑 Admin Credentials

| Field | Value |
|---|---|
| **Email** | `admin@zynex.store` |
| **Password** | `admin123` |

### Test Customer
| Field | Value |
|---|---|
| **Email** | `customer@test.com` |
| **Password** | `test123` |

### Coupon Codes
| Code | Type | Value |
|---|---|---|
| `ZYNEX10` | Percentage | 10% off (min $5) |
| `ZYNEX20` | Fixed | $5 off (min $10) |

---

## 📸 Screenshots

> Screenshots placeholder — add actual screenshots after deployment

| Page | Description |
|---|---|
| ![Hero](placeholder) | Hero section with animated gradient orbs |
| ![Services](placeholder) | Services catalog with category filters |
| ![Dashboard](placeholder) | User dashboard with order tracking |
| ![Admin](placeholder) | Admin dashboard with analytics charts |
| ![Order](placeholder) | Order modal with payment selection |

---

## 📄 License

This project is licensed under the **MIT License**.

---

<div align="center">

**Built with ❤️ for the Arab digital community**

© 2025 Zynex Store. All rights reserved.

</div>
