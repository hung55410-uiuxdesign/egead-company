import { NextRequest, NextResponse } from 'next/server';
import {
  getServiceItems,
  getServiceItemStats,
  createServiceItem,
} from '@/lib/services/service-item.service';

export const dynamic = 'force-dynamic';

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const category = searchParams.get('category') || 'all';
    const status = searchParams.get('status') || 'all';
    const search = searchParams.get('search') || '';

    const [items, stats] = await Promise.all([
      getServiceItems({ category, status, search }),
      getServiceItemStats(),
    ]);

    return NextResponse.json({
      success: true,
      items,
      stats,
    });
  } catch (error) {
    console.error('Error fetching services:', error);
    return NextResponse.json(
      { success: false, error: 'Không thể tải danh sách dịch vụ & ngành nghề' },
      { status: 500 }
    );
  }
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();

    if (!body.title) {
      return NextResponse.json(
        { success: false, error: 'Tên dịch vụ / ngành nghề là bắt buộc' },
        { status: 400 }
      );
    }

    // Auto-generate slug if not provided
    const slug =
      body.slug?.trim() ||
      body.title
        .toLowerCase()
        .replace(/[^a-z0-9]+/g, '-')
        .replace(/(^-|-$)+/g, '');

    const newService = await createServiceItem({
      ...body,
      slug,
    });

    return NextResponse.json({
      success: true,
      item: newService,
    });
  } catch (error: any) {
    console.error('Error creating service item:', error);
    if (error.code === 'P2002') {
      return NextResponse.json(
        { success: false, error: 'Đường dẫn slug này đã tồn tại, vui lòng chọn slug khác' },
        { status: 400 }
      );
    }
    return NextResponse.json(
      { success: false, error: error.message || 'Không thể tạo dịch vụ' },
      { status: 500 }
    );
  }
}
