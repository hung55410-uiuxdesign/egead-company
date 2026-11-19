import { NextRequest, NextResponse } from 'next/server';
import { createPostTranslation } from '@/lib/services/blog.service';
import { isLocale } from '@/lib/i18n/config';

/**
 * POST /api/admin/blogs/[id]/translate
 * Body: { locale: 'en' | 'vi' }
 * Creates the other-language version of a post as a draft copy.
 */
export async function POST(
  request: NextRequest,
  props: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await props.params;
    const body = await request.json().catch(() => ({}));

    if (!isLocale(body?.locale)) {
      return NextResponse.json(
        { success: false, error: 'Ngôn ngữ không hợp lệ (chỉ hỗ trợ en, vi)' },
        { status: 400 }
      );
    }

    const created = await createPostTranslation(id, body.locale);
    return NextResponse.json({ success: true, data: created }, { status: 201 });
  } catch (error) {
    return NextResponse.json(
      { success: false, error: (error as Error).message },
      { status: 400 }
    );
  }
}
