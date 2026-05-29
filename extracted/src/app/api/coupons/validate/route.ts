import { NextResponse } from 'next/server';
import { db } from '@/lib/db';

// POST /api/coupons/validate
export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { code, orderAmount } = body;

    if (!code) {
      return NextResponse.json(
        { success: false, error: 'Coupon code is required' },
        { status: 400 }
      );
    }

    const coupon = await db.coupon.findUnique({
      where: { code },
    });

    if (!coupon) {
      return NextResponse.json({
        success: true,
        data: {
          valid: false,
          reason: 'Coupon not found',
        },
      });
    }

    const now = new Date();

    // Check active
    if (!coupon.isActive) {
      return NextResponse.json({
        success: true,
        data: {
          valid: false,
          reason: 'Coupon is not active',
        },
      });
    }

    // Check expiry
    if (coupon.validUntil < now) {
      return NextResponse.json({
        success: true,
        data: {
          valid: false,
          reason: 'Coupon has expired',
        },
      });
    }

    // Check valid from
    if (coupon.validFrom > now) {
      return NextResponse.json({
        success: true,
        data: {
          valid: false,
          reason: 'Coupon is not yet valid',
        },
      });
    }

    // Check max uses
    if (coupon.maxUses !== null && coupon.usedCount >= coupon.maxUses) {
      return NextResponse.json({
        success: true,
        data: {
          valid: false,
          reason: 'Coupon has reached maximum uses',
        },
      });
    }

    // Check minimum order amount
    if (coupon.minOrderAmount !== null && orderAmount !== undefined && orderAmount < coupon.minOrderAmount) {
      return NextResponse.json({
        success: true,
        data: {
          valid: false,
          reason: `Minimum order amount is $${coupon.minOrderAmount}`,
        },
      });
    }

    // Calculate discount
    let discountAmount = 0;
    if (orderAmount) {
      if (coupon.discountType === 'percentage') {
        discountAmount = orderAmount * (coupon.discountValue / 100);
      } else {
        discountAmount = Math.min(coupon.discountValue, orderAmount);
      }
    }

    return NextResponse.json({
      success: true,
      data: {
        valid: true,
        code: coupon.code,
        discountType: coupon.discountType,
        discountValue: coupon.discountValue,
        minOrderAmount: coupon.minOrderAmount,
        discountAmount: Math.round(discountAmount * 100) / 100,
        message: coupon.discountType === 'percentage'
          ? `${coupon.discountValue}% discount applied`
          : `$${coupon.discountValue} discount applied`,
      },
    });
  } catch (error) {
    console.error('Error validating coupon:', error);
    return NextResponse.json(
      { success: false, error: 'Failed to validate coupon' },
      { status: 500 }
    );
  }
}
