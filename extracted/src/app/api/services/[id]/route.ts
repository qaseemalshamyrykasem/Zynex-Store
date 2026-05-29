import { NextResponse } from 'next/server';
import { db } from '@/lib/db';

export async function GET(
  request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;

    const service = await db.service.findUnique({
      where: { id },
      include: {
        category: {
          select: {
            id: true,
            name: true,
            nameEn: true,
            slug: true,
            icon: true,
            color: true,
            description: true,
          },
        },
        reviews: {
          take: 20,
          orderBy: { createdAt: 'desc' },
          select: {
            id: true,
            userId: true,
            rating: true,
            comment: true,
            isVerified: true,
            createdAt: true,
          },
        },
      },
    });

    if (!service) {
      return NextResponse.json(
        { success: false, error: 'Service not found' },
        { status: 404 }
      );
    }

    return NextResponse.json({
      success: true,
      data: service,
    });
  } catch (error) {
    console.error('Error fetching service:', error);
    return NextResponse.json(
      { success: false, error: 'Failed to fetch service' },
      { status: 500 }
    );
  }
}
