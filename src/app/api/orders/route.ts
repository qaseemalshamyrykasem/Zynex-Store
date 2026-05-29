import { NextResponse } from 'next/server';
import { db } from '@/lib/db';

// GET /api/orders?userId=xxx - List orders for a user
export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    const userId = searchParams.get('userId');

    if (!userId) {
      return NextResponse.json(
        { success: false, error: 'userId query parameter is required' },
        { status: 400 }
      );
    }

    const orders = await db.order.findMany({
      where: { userId },
      include: {
        items: {
          include: {
            service: {
              select: {
                id: true,
                name: true,
                nameEn: true,
                slug: true,
                image: true,
                icon: true,
                deliveryTime: true,
              },
            },
          },
        },
      },
      orderBy: { createdAt: 'desc' },
    });

    return NextResponse.json({
      success: true,
      data: orders,
      count: orders.length,
    });
  } catch (error) {
    console.error('Error fetching orders:', error);
    return NextResponse.json(
      { success: false, error: 'Failed to fetch orders' },
      { status: 500 }
    );
  }
}

// POST /api/orders - Create a new order
export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { userId, serviceId, quantity = 1, details, paymentMethod, couponCode } = body;

    // Validate required fields
    if (!userId || !serviceId || !paymentMethod) {
      return NextResponse.json(
        { success: false, error: 'Missing required fields: userId, serviceId, paymentMethod' },
        { status: 400 }
      );
    }

    // Validate user exists
    const user = await db.user.findUnique({ where: { id: userId } });
    if (!user) {
      return NextResponse.json(
        { success: false, error: 'User not found' },
        { status: 404 }
      );
    }

    // Validate service exists and is available
    const service = await db.service.findUnique({ where: { id: serviceId } });
    if (!service) {
      return NextResponse.json(
        { success: false, error: 'Service not found' },
        { status: 404 }
      );
    }

    if (!service.isAvailable) {
      return NextResponse.json(
        { success: false, error: 'Service is currently unavailable' },
        { status: 400 }
      );
    }

    // Calculate pricing
    const unitPrice = service.price;
    const totalPrice = unitPrice * quantity;
    let discountAmount = 0;
    let appliedCouponCode: string | null = null;

    // Apply coupon if provided
    if (couponCode) {
      const coupon = await db.coupon.findUnique({
        where: { code: couponCode },
      });

      if (coupon) {
        const now = new Date();
        const isValid =
          coupon.isActive &&
          coupon.validFrom <= now &&
          coupon.validUntil >= now &&
          (coupon.maxUses === null || coupon.usedCount < coupon.maxUses) &&
          (coupon.minOrderAmount === null || totalPrice >= coupon.minOrderAmount);

        if (isValid) {
          appliedCouponCode = couponCode;
          if (coupon.discountType === 'percentage') {
            discountAmount = totalPrice * (coupon.discountValue / 100);
          } else {
            discountAmount = Math.min(coupon.discountValue, totalPrice);
          }

          // Increment coupon usage
          await db.coupon.update({
            where: { id: coupon.id },
            data: { usedCount: { increment: 1 } },
          });
        }
      }
    }

    const totalAmount = Math.max(totalPrice - discountAmount, 0);

    // Generate order number
    const orderCount = await db.order.count();
    const orderNumber = `ZYN-${String(orderCount + 1).padStart(6, '0')}`;

    // Create order + order item in a transaction
    const order = await db.$transaction(async (tx) => {
      const newOrder = await tx.order.create({
        data: {
          orderNumber,
          userId,
          status: 'pending',
          totalAmount,
          currency: 'USD',
          paymentMethod,
          paymentStatus: 'pending',
          couponCode: appliedCouponCode,
          discountAmount: discountAmount > 0 ? discountAmount : null,
          items: {
            create: {
              serviceId,
              quantity,
              unitPrice,
              totalPrice,
              details: details || null,
              status: 'pending',
            },
          },
        },
        include: {
          items: {
            include: {
              service: {
                select: {
                  id: true,
                  name: true,
                  nameEn: true,
                  slug: true,
                  image: true,
                  icon: true,
                },
              },
            },
          },
        },
      });

      return newOrder;
    });

    return NextResponse.json(
      {
        success: true,
        data: order,
        message: 'Order created successfully',
      },
      { status: 201 }
    );
  } catch (error) {
    console.error('Error creating order:', error);
    return NextResponse.json(
      { success: false, error: 'Failed to create order' },
      { status: 500 }
    );
  }
}
