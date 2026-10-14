import { NextRequest, NextResponse } from 'next/server';
import {
  getPartnerItems,
  getPartnerItemStats,
  createPartnerItem,
} from '@/lib/services/partner-item.service';
import { prisma } from '@/lib/prisma';

export const dynamic = 'force-dynamic';

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const status = searchParams.get('status') || 'all';
    const search = searchParams.get('search') || '';

    const [items, stats] = await Promise.all([
      getPartnerItems({ status, search }),
      getPartnerItemStats(),
    ]);

    return NextResponse.json({
      success: true,
      items,
      stats,
    });
  } catch (error) {
    console.error('[API /api/admin/partners] Error fetching partners:', error);
    return NextResponse.json(
      { success: false, error: 'Không thể tải danh sách đối tác chiến lược' },
      { status: 500 }
    );
  }
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();

    if (!body.name) {
      return NextResponse.json(
        { success: false, error: 'Tên đối tác là bắt buộc' },
        { status: 400 }
      );
    }

    const slug =
      body.slug?.trim().toLowerCase() ||
      body.name
        .toLowerCase()
        .replace(/[^a-z0-9]+/g, '-')
        .replace(/(^-|-$)+/g, '');

    const newPartner = await createPartnerItem({
      ...body,
      slug,
    });

    return NextResponse.json({
      success: true,
      item: newPartner,
    });
  } catch (error: any) {
    console.error('[API /api/admin/partners] Error creating partner:', error);
    if (error.code === 'P2002') {
      return NextResponse.json(
        { success: false, error: 'Đường dẫn slug này đã tồn tại, vui lòng chọn slug khác' },
        { status: 400 }
      );
    }
    return NextResponse.json(
      { success: false, error: error.message || 'Không thể tạo đối tác mới' },
      { status: 500 }
    );
  }
}
