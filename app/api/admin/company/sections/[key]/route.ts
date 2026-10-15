import { NextRequest, NextResponse } from 'next/server';
import { revalidatePath } from 'next/cache';
import {
  getCompanySectionByKey,
  updateCompanySection,
} from '@/lib/services/company-section.service';

export const dynamic = 'force-dynamic';

interface RouteContext {
  params: Promise<{ key: string }>;
}

export async function GET(request: NextRequest, { params }: RouteContext) {
  try {
    const { key } = await params;
    const section = await getCompanySectionByKey(key);

    if (!section) {
      return NextResponse.json(
        { success: false, error: 'Không tìm thấy section này' },
        { status: 404 }
      );
    }

    return NextResponse.json({
      success: true,
      section,
    });
  } catch (error) {
    console.error('Error fetching company section by key:', error);
    return NextResponse.json(
      { success: false, error: 'Không thể tải thông tin section' },
      { status: 500 }
    );
  }
}

export async function PUT(request: NextRequest, { params }: RouteContext) {
  try {
    const { key } = await params;
    const body = await request.json();

    const updated = await updateCompanySection(key, body);

    revalidatePath('/company');
    revalidatePath('/admin/company');
    revalidatePath(`/admin/company/${key}`);
    revalidatePath('/', 'layout');

    return NextResponse.json({
      success: true,
      section: updated,
    });
  } catch (error: any) {
    console.error('Error updating company section:', error);
    return NextResponse.json(
      { success: false, error: error.message || 'Không thể cập nhật section' },
      { status: 500 }
    );
  }
}
