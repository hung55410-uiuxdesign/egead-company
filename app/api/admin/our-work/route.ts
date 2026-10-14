import { NextRequest, NextResponse } from 'next/server';
import {
  getCaseStudies,
  getCaseStudyStats,
  createCaseStudy,
} from '@/lib/services/casestudy.service';

export const dynamic = 'force-dynamic';

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const status = searchParams.get('status') || 'all';
    const search = searchParams.get('search') || '';

    const [items, stats] = await Promise.all([
      getCaseStudies({ status, search }),
      getCaseStudyStats(),
    ]);

    return NextResponse.json({
      success: true,
      items,
      stats,
    });
  } catch (error) {
    console.error('Error fetching case studies:', error);
    return NextResponse.json(
      { success: false, error: 'Không thể tải danh sách Case Studies' },
      { status: 500 }
    );
  }
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();

    if (!body.title || !body.customer) {
      return NextResponse.json(
        { success: false, error: 'Tiêu đề dự án và tên khách hàng là bắt buộc' },
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

    const newCaseStudy = await createCaseStudy({
      ...body,
      slug,
    });

    return NextResponse.json({
      success: true,
      item: newCaseStudy,
    });
  } catch (error: any) {
    console.error('Error creating case study:', error);
    if (error.code === 'P2002') {
      return NextResponse.json(
        { success: false, error: 'Đường dẫn slug này đã tồn tại, vui lòng chọn slug khác' },
        { status: 400 }
      );
    }
    return NextResponse.json(
      { success: false, error: error.message || 'Không thể tạo Case Study' },
      { status: 500 }
    );
  }
}
