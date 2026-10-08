import { NextRequest, NextResponse } from 'next/server';
import { requireAdmin } from '@/lib/admin-auth';
import { getHierarchy, upsertHierarchy } from '@/lib/people';
import { hierarchyInputSchema } from '@/lib/validations/people';

export async function GET(request: NextRequest) {
  try {
    const isAdmin = await requireAdmin();
    if (!isAdmin) {
      return NextResponse.json(
        { success: false, error: 'Unauthorized: Bạn không có quyền truy cập.' },
        { status: 401 }
      );
    }

    const { searchParams } = new URL(request.url);
    const leaderId = searchParams.get('leaderId');

    if (!leaderId) {
      return NextResponse.json(
        { success: false, error: 'Tham số leaderId là bắt buộc' },
        { status: 400 }
      );
    }

    const data = await getHierarchy(leaderId);
    return NextResponse.json({ success: true, data });
  } catch (error) {
    console.error('API GET /api/admin/people/hierarchy error:', error);
    return NextResponse.json(
      { success: false, error: (error as Error).message },
      { status: 500 }
    );
  }
}

export async function POST(request: NextRequest) {
  try {
    const isAdmin = await requireAdmin();
    if (!isAdmin) {
      return NextResponse.json(
        { success: false, error: 'Unauthorized: Bạn không có quyền truy cập.' },
        { status: 401 }
      );
    }

    const body = await request.json();
    const parsed = hierarchyInputSchema.safeParse(body);

    if (!parsed.success) {
      return NextResponse.json(
        {
          success: false,
          error: parsed.error.issues[0]?.message || 'Dữ liệu sơ đồ tổ chức không hợp lệ',
          details: parsed.error.issues,
        },
        { status: 400 }
      );
    }

    const saved = await upsertHierarchy(parsed.data);
    return NextResponse.json({ success: true, data: saved }, { status: 200 });
  } catch (error) {
    console.error('API POST /api/admin/people/hierarchy error:', error);
    return NextResponse.json(
      { success: false, error: (error as Error).message },
      { status: 500 }
    );
  }
}
