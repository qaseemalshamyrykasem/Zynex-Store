import { PrismaClient } from '@prisma/client';
import { SERVICE_CATEGORIES, FEATURED_SERVICES } from '../src/lib/constants';

const prisma = new PrismaClient();

// Simple hash matching the auth routes
function simpleHash(password: string): string {
  let hash = 0;
  for (let i = 0; i < password.length; i++) {
    const char = password.charCodeAt(i);
    hash = ((hash << 5) - hash) + char;
    hash = hash & hash;
  }
  return `hashed_${Math.abs(hash).toString(36)}_${password.length}`;
}

async function main() {
  console.log('🌱 Seeding database...');

  // Clean existing data
  await prisma.review.deleteMany();
  await prisma.orderItem.deleteMany();
  await prisma.transaction.deleteMany();
  await prisma.order.deleteMany();
  await prisma.notification.deleteMany();
  await prisma.ticketMessage.deleteMany();
  await prisma.ticket.deleteMany();
  await prisma.wallet.deleteMany();
  await prisma.coupon.deleteMany();
  await prisma.service.deleteMany();
  await prisma.category.deleteMany();
  await prisma.user.deleteMany();
  await prisma.siteSetting.deleteMany();
  await prisma.analyticsEvent.deleteMany();
  await prisma.account.deleteMany();
  await prisma.session.deleteMany();
  await prisma.verificationToken.deleteMany();

  // ============================================
  // Create Admin User
  // ============================================
  const adminUser = await prisma.user.create({
    data: {
      email: 'admin@zynex.store',
      password: simpleHash('admin123'),
      name: 'Zynex Admin',
      role: 'admin',
      isVerified: true,
      balance: 0,
    },
  });
  console.log('✅ Admin user created:', adminUser.email);

  // Create a test customer
  const customerUser = await prisma.user.create({
    data: {
      email: 'customer@test.com',
      password: simpleHash('test123'),
      name: 'أحمد محمد',
      phone: '+967771234567',
      role: 'customer',
      isVerified: true,
      balance: 100,
    },
  });
  console.log('✅ Customer user created:', customerUser.email);

  // ============================================
  // Create Categories
  // ============================================
  const categoryMap: Record<string, string> = {};

  for (let i = 0; i < SERVICE_CATEGORIES.length; i++) {
    const cat = SERVICE_CATEGORIES[i];
    const category = await prisma.category.create({
      data: {
        name: cat.name,
        nameEn: cat.nameEn,
        slug: cat.slug,
        description: cat.description,
        icon: cat.icon,
        color: cat.color,
        sortOrder: i,
        isActive: true,
      },
    });
    categoryMap[cat.slug] = category.id;
    console.log(`✅ Category created: ${cat.nameEn}`);
  }

  // ============================================
  // Create Services
  // ============================================
  const serviceMap: Record<string, string> = {};

  for (const svc of FEATURED_SERVICES) {
    const categoryId = categoryMap[svc.categorySlug];
    if (!categoryId) {
      console.warn(`⚠️ Category not found for ${svc.categorySlug}, skipping ${svc.nameEn}`);
      continue;
    }

    const service = await prisma.service.create({
      data: {
        categoryId,
        name: svc.name,
        nameEn: svc.nameEn,
        slug: svc.slug,
        description: svc.description,
        features: JSON.stringify(svc.features),
        price: svc.price,
        priceYER: svc.priceYER || null,
        priceSAR: svc.priceSAR || null,
        originalPrice: svc.originalPrice || null,
        deliveryTime: svc.deliveryTime,
        badge: svc.badge || null,
        rating: svc.rating,
        reviewCount: svc.reviewCount,
        salesCount: svc.salesCount,
        isAvailable: true,
        isFeatured: true,
        sortOrder: 0,
      },
    });
    serviceMap[svc.slug] = service.id;
    console.log(`✅ Service created: ${svc.nameEn}`);
  }

  // ============================================
  // Create Sample Orders
  // ============================================
  const order1 = await prisma.order.create({
    data: {
      orderNumber: 'ZYN-000001',
      userId: customerUser.id,
      status: 'completed',
      totalAmount: 24.99,
      currency: 'USD',
      paymentMethod: 'jeib',
      paymentStatus: 'paid',
      items: {
        create: {
          serviceId: serviceMap['chatgpt-plus']!,
          quantity: 1,
          unitPrice: 24.99,
          totalPrice: 24.99,
          details: JSON.stringify({ username: 'ahmed@example.com' }),
          status: 'completed',
        },
      },
    },
  });
  console.log('✅ Order 1 created:', order1.orderNumber);

  const order2 = await prisma.order.create({
    data: {
      orderNumber: 'ZYN-000002',
      userId: customerUser.id,
      status: 'processing',
      totalAmount: 3.99,
      currency: 'USD',
      paymentMethod: 'jawali',
      paymentStatus: 'paid',
      items: {
        create: {
          serviceId: serviceMap['telegram-stars-500']!,
          quantity: 1,
          unitPrice: 3.99,
          totalPrice: 3.99,
          details: JSON.stringify({ channel: '@zynexstore' }),
          status: 'processing',
        },
      },
    },
  });
  console.log('✅ Order 2 created:', order2.orderNumber);

  const order3 = await prisma.order.create({
    data: {
      orderNumber: 'ZYN-000003',
      userId: customerUser.id,
      status: 'pending',
      totalAmount: 12.99,
      currency: 'USD',
      paymentMethod: 'floosk',
      paymentStatus: 'pending',
      items: {
        create: {
          serviceId: serviceMap['spotify-premium']!,
          quantity: 1,
          unitPrice: 12.99,
          totalPrice: 12.99,
          details: JSON.stringify({ email: 'ahmed@spotify.com' }),
          status: 'pending',
        },
      },
    },
  });
  console.log('✅ Order 3 created:', order3.orderNumber);

  // ============================================
  // Create Sample Reviews
  // ============================================
  await prisma.review.create({
    data: {
      serviceId: serviceMap['chatgpt-plus']!,
      userId: customerUser.id,
      rating: 5,
      comment: 'خدمة ممتازة وسريعة جداً! تم التسليم في أقل من ساعة.',
      isVerified: true,
    },
  });
  console.log('✅ Review 1 created for ChatGPT Plus');

  await prisma.review.create({
    data: {
      serviceId: serviceMap['telegram-stars-500']!,
      userId: customerUser.id,
      rating: 4,
      comment: 'خدمة جيدة والتسليم فوري، أنصح بها.',
      isVerified: true,
    },
  });
  console.log('✅ Review 2 created for Telegram Stars 500');

  await prisma.review.create({
    data: {
      serviceId: serviceMap['netflix-standard']!,
      userId: customerUser.id,
      rating: 5,
      comment: 'أفضل خدمة Netflix اشتركت فيها، جودة ممتازة!',
      isVerified: true,
    },
  });
  console.log('✅ Review 3 created for Netflix Standard');

  // ============================================
  // Create Sample Coupons
  // ============================================
  const now = new Date();
  const thirtyDaysFromNow = new Date(now.getTime() + 30 * 24 * 60 * 60 * 1000);

  await prisma.coupon.create({
    data: {
      code: 'ZYNEX10',
      discountType: 'percentage',
      discountValue: 10,
      minOrderAmount: 5,
      maxUses: 100,
      usedCount: 0,
      validFrom: now,
      validUntil: thirtyDaysFromNow,
      isActive: true,
    },
  });
  console.log('✅ Coupon ZYNEX10 created (10% off)');

  await prisma.coupon.create({
    data: {
      code: 'ZYNEX20',
      discountType: 'fixed',
      discountValue: 5,
      minOrderAmount: 10,
      maxUses: 50,
      usedCount: 0,
      validFrom: now,
      validUntil: thirtyDaysFromNow,
      isActive: true,
    },
  });
  console.log('✅ Coupon ZYNEX20 created ($5 off)');

  // ============================================
  // Create Site Settings
  // ============================================
  await prisma.siteSetting.createMany({
    data: [
      { key: 'site_name', value: 'Zynex Store', type: 'text' },
      { key: 'site_description', value: 'متجرك الأول للخدمات الرقمية', type: 'text' },
      { key: 'currency_default', value: 'USD', type: 'text' },
      { key: 'maintenance_mode', value: 'false', type: 'boolean' },
      { key: 'max_order_quantity', value: '10', type: 'number' },
    ],
  });
  console.log('✅ Site settings created');

  console.log('\n🎉 Seeding completed successfully!');
}

main()
  .catch((e) => {
    console.error('❌ Seeding failed:', e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
