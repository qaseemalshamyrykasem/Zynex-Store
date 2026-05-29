import { NextResponse } from 'next/server';
import { db } from '@/lib/db';

export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    const category = searchParams.get('category');
    const search = searchParams.get('search');
    const featured = searchParams.get('featured');
    const sort = searchParams.get('sort') || 'sortOrder';

    const where: Record<string, unknown> = {
      isAvailable: true,
    };

    if (category) {
      // Look up category by slug
      const cat = await db.category.findFirst({
        where: { slug: category },
      });
      if (cat) {
        where.categoryId = cat.id;
      }
    }

    if (search) {
      where.OR = [
        { name: { contains: search } },
        { nameEn: { contains: search } },
        { description: { contains: search } },
      ];
    }

    if (featured === 'true') {
      where.isFeatured = true;
    }

    type OrderBy = Record<string, string>;
    let orderBy: OrderBy = { sortOrder: 'asc' };
    if (sort === 'price_asc') orderBy = { price: 'asc' };
    else if (sort === 'price_desc') orderBy = { price: 'desc' };
    else if (sort === 'rating') orderBy = { rating: 'desc' };
    else if (sort === 'popular') orderBy = { salesCount: 'desc' };
    else if (sort === 'newest') orderBy = { createdAt: 'desc' };

    const services = await db.service.findMany({
      where,
      include: {
        category: {
          select: {
            id: true,
            name: true,
            nameEn: true,
            slug: true,
            icon: true,
            color: true,
          },
        },
      },
      orderBy,
    });

    return NextResponse.json({
      success: true,
      data: services,
      count: services.length,
    });
  } catch (error) {
    console.error('Error fetching services:', error);
    return NextResponse.json(
      { success: false, error: 'Failed to fetch services' },
      { status: 500 }
    );
  }
}
