import { NextRequest, NextResponse } from 'next/server';
import { revalidatePath } from 'next/cache';
import { createJobTranslation } from '@/lib/services/career.service';
import { isLocale } from '@/lib/i18n/config';

export const dynamic = 'force-dynamic';

/**
 * POST /api/admin/careers/[id]/translate
 * Body: { locale: 'en' | 'vi' }
 * Creates the other-language version of a job as a draft copy.
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

    const created = await createJobTranslation(id, body.locale);
    revalidatePath('/admin/careers');
    return NextResponse.json({ success: true, data: created }, { status: 201 });
  } catch (error) {
    return NextResponse.json(
      { success: false, error: (error as Error).message },
      { status: 400 }
    );
  }
}
