import { NextResponse } from 'next/server';
import { db } from '@/lib/db';

// GET /api/admin/orders - List all orders with user info
export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    const status = searchParams.get('status');
    const page = parseInt(searchParams.get('page') || '1', 10);
    const limit = parseInt(searchParams.get('limit') || '20', 10);
    const skip = (page - 1) * limit;

    const where: Record<string, unknown> = {};
    if (status) where.status = status;

    const [orders, total] = await Promise.all([
      db.order.findMany({
        where,
        include: {
          user: {
            select: {
              id: true,
              name: true,
              email: true,
              phone: true,
              avatar: true,
            },
          },
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
        orderBy: { createdAt: 'desc' },
        skip,
        take: limit,
      }),
      db.order.count({ where }),
    ]);

    return NextResponse.json({
      success: true,
      data: orders,
      pagination: {
        page,
        limit,
        total,
        totalPages: Math.ceil(total / limit),
      },
    });
  } catch (error) {
    console.error('Error fetching admin orders:', error);
    return NextResponse.json(
      { success: false, error: 'Failed to fetch orders' },
      { status: 500 }
    );
  }
}

// PATCH /api/admin/orders - Update order status
export async function PATCH(request: Request) {
  try {
    const body = await request.json();
    const { orderId, status, paymentStatus } = body;

    if (!orderId) {
      return NextResponse.json(
        { success: false, error: 'orderId is required' },
        { status: 400 }
      );
    }

    // Check order exists
    const existingOrder = await db.order.findUnique({ where: { id: orderId } });
    if (!existingOrder) {
      return NextResponse.json(
        { success: false, error: 'Order not found' },
        { status: 404 }
      );
    }

    const updateData: Record<string, unknown> = {};

    const validStatuses = ['pending', 'processing', 'completed', 'failed', 'refunded', 'cancelled'];
    const validPaymentStatuses = ['pending', 'paid', 'failed', 'refunded'];

    if (status) {
      if (!validStatuses.includes(status)) {
        return NextResponse.json(
          { success: false, error: `Invalid status. Must be one of: ${validStatuses.join(', ')}` },
          { status: 400 }
        );
      }
      updateData.status = status;
    }

    if (paymentStatus) {
      if (!validPaymentStatuses.includes(paymentStatus)) {
        return NextResponse.json(
          { success: false, error: `Invalid payment status. Must be one of: ${validPaymentStatuses.join(', ')}` },
          { status: 400 }
        );
      }
      updateData.paymentStatus = paymentStatus;
    }

    if (Object.keys(updateData).length === 0) {
      return NextResponse.json(
        { success: false, error: 'No valid fields to update. Provide status or paymentStatus' },
        { status: 400 }
      );
    }

    // If order is completed, also update the service sales count
    if (status === 'completed' && existingOrder.status !== 'completed') {
      const orderItems = await db.orderItem.findMany({
        where: { orderId },
      });

      await db.$transaction([
        db.order.update({ where: { id: orderId }, data: updateData }),
        ...orderItems.map((item) =>
          db.service.update({
            where: { id: item.serviceId },
            data: { salesCount: { increment: item.quantity } },
          })
        ),
      ]);

      const updatedOrder = await db.order.findUnique({
        where: { id: orderId },
        include: {
          user: {
            select: { id: true, name: true, email: true },
          },
          items: {
            include: {
              service: {
                select: { id: true, name: true, nameEn: true },
              },
            },
          },
        },
      });

      return NextResponse.json({
        success: true,
        data: updatedOrder,
        message: 'Order updated successfully',
      });
    }

    const order = await db.order.update({
      where: { id: orderId },
      data: updateData,
      include: {
        user: {
          select: { id: true, name: true, email: true },
        },
        items: {
          include: {
            service: {
              select: { id: true, name: true, nameEn: true },
            },
          },
        },
      },
    });

    return NextResponse.json({
      success: true,
      data: order,
      message: 'Order updated successfully',
    });
  } catch (error) {
    console.error('Error updating order:', error);
    return NextResponse.json(
      { success: false, error: 'Failed to update order' },
      { status: 500 }
    );
  }
}
