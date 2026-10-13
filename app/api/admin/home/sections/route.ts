import { NextRequest, NextResponse } from 'next/server';
import { getHomeSections } from '@/lib/services/home-section.service';

export const dynamic = 'force-dynamic';

export async function GET() {
  try {
    const sections = await getHomeSections();
    return NextResponse.json({
      success: true,
      sections,
    });
  } catch (error) {
    console.error('Error fetching home sections:', error);
    return NextResponse.json(
      { success: false, error: 'Không thể tải danh sách section trang chủ' },
      { status: 500 }
    );
  }
}
