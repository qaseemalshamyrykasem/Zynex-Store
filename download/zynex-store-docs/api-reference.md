# Zynex Store - مرجع API الشامل

## Base URL
```
http://localhost:3000/api
```

---

## 📦 الخدمات (Services)

### GET /api/services
جلب قائمة الخدمات المتاحة

**Query Parameters:**
| المعامل | النوع | الوصف |
|---------|-------|-------|
| `category` | string | تصفية حسب القسم |
| `search` | string | بحث في الاسم والوصف |
| `featured` | boolean | الخدمات المميزة فقط |
| `sort` | string | ترتيب: price, rating, sales |

**مثال الطلب:**
```bash
curl http://localhost:3000/api/services?category=ai-subscriptions&sort=rating
```

**مثال الاستجابة:**
```json
{
  "services": [
    {
      "id": "cm3x...",
      "name": "ChatGPT Plus",
      "nameEn": "ChatGPT Plus",
      "slug": "chatgpt-plus",
      "description": "اشتراك ChatGPT Plus لمدة شهر كامل",
      "price": 24.99,
      "priceYER": 6250,
      "priceSAR": 93.74,
      "originalPrice": 20,
      "badge": "popular",
      "rating": 4.9,
      "reviewCount": 342,
      "salesCount": 1250,
      "deliveryTime": "0-2 ساعة",
      "isAvailable": true,
      "isFeatured": true,
      "category": {
        "id": "cm3x...",
        "name": "اشتراكات الذكاء الاصطناعي",
        "slug": "ai-subscriptions",
        "color": "#06B6D4"
      }
    }
  ]
}
```

### GET /api/services/[id]
جلب تفاصيل خدمة واحدة مع التقييمات

**مثال الطلب:**
```bash
curl http://localhost:3000/api/services/cm3x123abc
```

**مثال الاستجابة:**
```json
{
  "service": {
    "id": "cm3x123abc",
    "name": "ChatGPT Plus",
    "description": "...",
    "features": ["وصول كامل إلى GPT-4", "إنشاء صور DALL-E"],
    "price": 24.99,
    "faq": [...],
    "requirements": [...],
    "category": {...},
    "reviews": [...]
  }
}
```

---

## 🛒 الطلبات (Orders)

### GET /api/orders
جلب طلبات المستخدم

**Query Parameters:**
| المعامل | النوع | مطلوب | الوصف |
|---------|-------|-------|-------|
| `userId` | string | نعم | معرف المستخدم |

**مثال الطلب:**
```bash
curl http://localhost:3000/api/orders?userId=cm3x123
```

### POST /api/orders
إنشاء طلب جديد

**Body:**
```json
{
  "userId": "cm3x123",
  "serviceId": "cm3x456",
  "quantity": 1,
  "details": "{\"account\": \"@username\"}",
  "paymentMethod": "jeib",
  "couponCode": "ZYNEX10"
}
```

**مثال الاستجابة:**
```json
{
  "order": {
    "id": "cm3x789",
    "orderNumber": "ZYN-000004",
    "status": "pending",
    "totalAmount": 22.49,
    "currency": "USD",
    "paymentMethod": "jeib",
    "paymentStatus": "pending",
    "couponCode": "ZYNEX10",
    "discountAmount": 2.50,
    "items": [
      {
        "serviceId": "cm3x456",
        "quantity": 1,
        "unitPrice": 24.99,
        "totalPrice": 24.99
      }
    ]
  }
}
```

### GET /api/orders/[id]
جلب تفاصيل طلب واحد

### PATCH /api/orders/[id]
تحديث حالة الطلب (للأدمن)

**Body:**
```json
{
  "status": "processing"
}
```

---

## 🔐 المصادقة (Authentication)

### POST /api/auth/register
تسجيل حساب جديد

**Body:**
```json
{
  "email": "user@example.com",
  "password": "password123",
  "name": "أحمد محمد",
  "phone": "+967771234567"
}
```

**مثال الاستجابة:**
```json
{
  "user": {
    "id": "cm3x123",
    "email": "user@example.com",
    "name": "أحمد محمد",
    "role": "customer",
    "balance": 0
  },
  "message": "تم إنشاء الحساب بنجاح"
}
```

### POST /api/auth/login
تسجيل الدخول

**Body:**
```json
{
  "email": "admin@zynex.store",
  "password": "admin123"
}
```

**مثال الاستجابة:**
```json
{
  "user": {
    "id": "cm3x123",
    "email": "admin@zynex.store",
    "name": "Admin",
    "role": "admin",
    "balance": 0
  },
  "message": "تم تسجيل الدخول بنجاح"
}
```

---

## 🎫 الكوبونات (Coupons)

### POST /api/coupons/validate
التحقق من صلاحية كوبون الخصم

**Body:**
```json
{
  "code": "ZYNEX10",
  "orderAmount": 24.99
}
```

**مثال الاستجابة (صالح):**
```json
{
  "valid": true,
  "coupon": {
    "code": "ZYNEX10",
    "discountType": "percentage",
    "discountValue": 10,
    "minOrderAmount": null
  },
  "discountAmount": 2.50
}
```

**مثال الاستجابة (غير صالح):**
```json
{
  "valid": false,
  "error": "كوبون الخصم غير صالح أو منتهي الصلاحية"
}
```

---

## 📊 الإحصائيات (Statistics)

### GET /api/stats
جلب إحصائيات الموقع

**مثال الاستجابة:**
```json
{
  "totalOrders": 157,
  "totalUsers": 42,
  "totalRevenue": 45250.00,
  "totalServices": 8,
  "completedOrders": 134,
  "pendingOrders": 23,
  "popularServices": [
    {
      "name": "نجوم تليجرام",
      "salesCount": 3400
    }
  ]
}
```

---

## ⚙️ إدارة الأدمن (Admin)

### GET /api/admin/services
جلب جميع الخدمات (بما فيها غير المتاحة)

### POST /api/admin/services
إنشاء خدمة جديدة

**Body:**
```json
{
  "name": "Midjourney Pro",
  "nameEn": "Midjourney Pro",
  "slug": "midjourney-pro",
  "categoryId": "cm3x...",
  "description": "اشتراك Midjourney Pro لتوليد الصور بالذكاء الاصطناعي",
  "features": "[\"توليد صور غير محدود\",\"جودة عالية\",\"وصول سريع\"]",
  "price": 29.99,
  "priceYER": 7500,
  "deliveryTime": "0-2 ساعة",
  "badge": "new"
}
```

### GET /api/admin/orders
جلب جميع الطلبات مع بيانات المستخدم

### PATCH /api/admin/orders
تحديث حالة طلب

**Body:**
```json
{
  "orderId": "cm3x123",
  "status": "completed"
}
```

---

## 🏷️ أكواد الكوبونات المتوفرة

| الكود | نوع الخصم | القيمة | الحد الأدنى |
|-------|-----------|--------|-------------|
| `ZYNEX10` | نسبة مئوية | 10% | بدون |
| `ZYNEX20` | مبلغ ثابت | $5 | بدون |

---

## 🔒 رؤوس الأمان

جميع استجابات API تتضمن رؤوس الأمان التالية:
- `Content-Type: application/json`
- التحقق من المدخلات عبر Zod
- حماية CSRF
- Rate Limiting (مقترح للإنتاج)

---

## ❌ رموز الأخطاء

| الرمز | المعنى |
|-------|--------|
| 400 | طلب غير صالح - بيانات مفقودة أو خاطئة |
| 401 | غير مصادق - تسجيل الدخول مطلوب |
| 403 | ممنوع - صلاحيات غير كافية |
| 404 | غير موجود - المورد غير موجود |
| 409 | تعارض - البريد الإلكتروني مسجل مسبقاً |
| 500 | خطأ في الخادم - خطأ داخلي |
