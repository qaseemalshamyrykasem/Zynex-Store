import { NextResponse } from 'next/server';
import { db } from '@/lib/db';

// GET /api/admin/services - List all services (including inactive)
export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    const category = searchParams.get('category');
    const status = searchParams.get('status');

    const where: Record<string, unknown> = {};

    if (category) {
      const cat = await db.category.findFirst({ where: { slug: category } });
      if (cat) where.categoryId = cat.id;
    }

    if (status === 'active') where.isAvailable = true;
    else if (status === 'inactive') where.isAvailable = false;

    const services = await db.service.findMany({
      where,
      include: {
        category: {
          select: {
            id: true,
            name: true,
            nameEn: true,
            slug: true,
          },
        },
      },
      orderBy: { createdAt: 'desc' },
    });

    return NextResponse.json({
      success: true,
      data: services,
      count: services.length,
    });
  } catch (error) {
    console.error('Error fetching admin services:', error);
    return NextResponse.json(
      { success: false, error: 'Failed to fetch services' },
      { status: 500 }
    );
  }
}

// POST /api/admin/services - Create a new service
export async function POST(request: Request) {
  try {
    const body = await request.json();
    const {
      categoryId,
      name,
      nameEn,
      slug,
      description,
      features,
      price,
      priceYER,
      priceSAR,
      originalPrice,
      image,
      icon,
      badge,
      deliveryTime,
      isAvailable,
      isFeatured,
      sortOrder,
      faq,
      requirements,
    } = body;

    // Validate required fields
    if (!categoryId || !name || !nameEn || !slug || !description || price === undefined) {
      return NextResponse.json(
        { success: false, error: 'Missing required fields: categoryId, name, nameEn, slug, description, price' },
        { status: 400 }
      );
    }

    // Validate category exists
    const category = await db.category.findUnique({ where: { id: categoryId } });
    if (!category) {
      return NextResponse.json(
        { success: false, error: 'Category not found' },
        { status: 404 }
      );
    }

    // Check slug uniqueness
    const existingService = await db.service.findUnique({ where: { slug } });
    if (existingService) {
      return NextResponse.json(
        { success: false, error: 'Service with this slug already exists' },
        { status: 409 }
      );
    }

    const service = await db.service.create({
      data: {
        categoryId,
        name,
        nameEn,
        slug,
        description,
        features: typeof features === 'object' ? JSON.stringify(features) : features || '[]',
        price,
        priceYER: priceYER || null,
        priceSAR: priceSAR || null,
        originalPrice: originalPrice || null,
        image: image || null,
        icon: icon || null,
        badge: badge || null,
        deliveryTime: deliveryTime || null,
        isAvailable: isAvailable !== undefined ? isAvailable : true,
        isFeatured: isFeatured || false,
        sortOrder: sortOrder || 0,
        faq: faq ? (typeof faq === 'object' ? JSON.stringify(faq) : faq) : null,
        requirements: requirements ? (typeof requirements === 'object' ? JSON.stringify(requirements) : requirements) : null,
      },
      include: {
        category: {
          select: {
            id: true,
            name: true,
            nameEn: true,
            slug: true,
          },
        },
      },
    });

    return NextResponse.json(
      {
        success: true,
        data: service,
        message: 'Service created successfully',
      },
      { status: 201 }
    );
  } catch (error) {
    console.error('Error creating service:', error);
    return NextResponse.json(
      { success: false, error: 'Failed to create service' },
      { status: 500 }
    );
  }
}
