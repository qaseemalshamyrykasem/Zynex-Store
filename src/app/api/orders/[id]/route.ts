import { NextResponse } from 'next/server';
import { db } from '@/lib/db';

// GET /api/orders/[id] - Get order details
export async function GET(
  request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;

    const order = await db.order.findUnique({
      where: { id },
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
                price: true,
                deliveryTime: true,
              },
            },
          },
        },
        transactions: true,
      },
    });

    if (!order) {
      return NextResponse.json(
        { success: false, error: 'Order not found' },
        { status: 404 }
      );
    }

    return NextResponse.json({
      success: true,
      data: order,
    });
  } catch (error) {
    console.error('Error fetching order:', error);
    return NextResponse.json(
      { success: false, error: 'Failed to fetch order' },
      { status: 500 }
    );
  }
}

// PATCH /api/orders/[id] - Update order status (admin only)
export async function PATCH(
  request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;
    const body = await request.json();
    const { status, paymentStatus } = body;

    // Check order exists
    const existingOrder = await db.order.findUnique({ where: { id } });
    if (!existingOrder) {
      return NextResponse.json(
        { success: false, error: 'Order not found' },
        { status: 404 }
      );
    }

    // Validate status values
    const validStatuses = ['pending', 'processing', 'completed', 'failed', 'refunded', 'cancelled'];
    const validPaymentStatuses = ['pending', 'paid', 'failed', 'refunded'];

    const updateData: Record<string, unknown> = {};

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
        { success: false, error: 'No valid fields to update' },
        { status: 400 }
      );
    }

    const order = await db.order.update({
      where: { id },
      data: updateData,
      include: {
        items: {
          include: {
            service: {
              select: {
                id: true,
                name: true,
                nameEn: true,
                slug: true,
              },
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
