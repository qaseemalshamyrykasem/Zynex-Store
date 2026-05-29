import { NextResponse } from 'next/server';
import { db } from '@/lib/db';

// GET /api/stats - Get site statistics
export async function GET() {
  try {
    // Get total counts
    const [totalOrders, totalUsers, totalServices, orders] = await Promise.all([
      db.order.count(),
      db.user.count(),
      db.service.count({ where: { isAvailable: true } }),
      db.order.findMany({
        select: { totalAmount: true, status: true, createdAt: true },
      }),
    ]);

    // Calculate total revenue from completed orders
    const totalRevenue = orders
      .filter((o) => o.status === 'completed')
      .reduce((sum, o) => sum + o.totalAmount, 0);

    // Recent orders (last 30 days)
    const thirtyDaysAgo = new Date();
    thirtyDaysAgo.setDate(thirtyDaysAgo.getDate() - 30);
    const recentOrdersCount = orders.filter(
      (o) => new Date(o.createdAt) >= thirtyDaysAgo
    ).length;

    // Pending orders
    const pendingOrdersCount = orders.filter(
      (o) => o.status === 'pending'
    ).length;

    // Popular services (by sales count)
    const popularServices = await db.service.findMany({
      where: { isAvailable: true },
      orderBy: { salesCount: 'desc' },
      take: 5,
      include: {
        category: {
          select: {
            name: true,
            nameEn: true,
            slug: true,
          },
        },
      },
    });

    return NextResponse.json({
      success: true,
      data: {
        totalOrders,
        totalUsers,
        totalRevenue: Math.round(totalRevenue * 100) / 100,
        totalServices,
        recentOrdersCount,
        pendingOrdersCount,
        completedOrders: orders.filter((o) => o.status === 'completed').length,
        popularServices,
      },
    });
  } catch (error) {
    console.error('Error fetching stats:', error);
    return NextResponse.json(
      { success: false, error: 'Failed to fetch statistics' },
      { status: 500 }
    );
  }
}
