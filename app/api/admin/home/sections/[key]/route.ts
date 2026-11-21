import { NextRequest, NextResponse } from 'next/server';
import { revalidatePath, revalidateTag } from 'next/cache';
import { PUBLIC_DATA_TAG } from '@/lib/cache/public-data';
import {
  getHomeSectionByKey,
  updateHomeSection,
} from '@/lib/services/home-section.service';

export const dynamic = 'force-dynamic';

interface RouteContext {
  params: Promise<{ key: string }>;
}

export async function GET(request: NextRequest, { params }: RouteContext) {
  try {
    const { key } = await params;
    const section = await getHomeSectionByKey(key);

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
    console.error('Error fetching home section by key:', error);
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

    const updated = await updateHomeSection(key, body);

    revalidatePath('/');
    revalidatePath('/admin/home');
    revalidatePath(`/admin/home/${key}`);
    revalidatePath('/', 'layout');
    // Drop the cached public-site reads (header menu, footer, home sections) so the edit shows at once.
    revalidateTag(PUBLIC_DATA_TAG, { expire: 0 });

    return NextResponse.json({
      success: true,
      section: updated,
    });
  } catch (error: any) {
    console.error('Error updating home section:', error);
    return NextResponse.json(
      { success: false, error: error.message || 'Không thể cập nhật section' },
      { status: 500 }
    );
  }
}
