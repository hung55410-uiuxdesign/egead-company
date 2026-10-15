import { NextRequest, NextResponse } from 'next/server';
import { getCompanySections } from '@/lib/services/company-section.service';

export const dynamic = 'force-dynamic';

export async function GET() {
  try {
    const sections = await getCompanySections();
    return NextResponse.json({
      success: true,
      sections,
    });
  } catch (error) {
    console.error('Error fetching company sections:', error);
    return NextResponse.json(
      { success: false, error: 'Không thể tải danh sách section trang company' },
      { status: 500 }
    );
  }
}
