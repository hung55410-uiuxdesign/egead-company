import { NextRequest, NextResponse } from 'next/server';
import { requireAdmin } from '@/lib/admin-auth';
import { getTeamMembers, createTeamMember } from '@/lib/people';
import { teamMemberInputSchema } from '@/lib/validations/people';

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
    const page = parseInt(searchParams.get('page') || '1', 10);
    const limit = parseInt(searchParams.get('limit') || '20', 10);
    const department = searchParams.get('department') || undefined;
    const status = searchParams.get('status') || undefined;
    const search = searchParams.get('search') || undefined;
    const isLeaderParam = searchParams.get('isLeader');
    const isLeader =
      isLeaderParam === 'true' ? true : isLeaderParam === 'false' ? false : undefined;

    const data = await getTeamMembers({
      page,
      limit,
      department,
      status,
      search,
      isLeader,
    });

    return NextResponse.json({ success: true, data });
  } catch (error) {
    console.error('API GET /api/admin/people error:', error);
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
    const parsed = teamMemberInputSchema.safeParse(body);

    if (!parsed.success) {
      return NextResponse.json(
        {
          success: false,
          error: parsed.error.issues[0]?.message || 'Dữ liệu nhân sự không hợp lệ',
          details: parsed.error.issues,
        },
        { status: 400 }
      );
    }

    const created = await createTeamMember(parsed.data);
    return NextResponse.json({ success: true, data: created }, { status: 201 });
  } catch (error) {
    console.error('API POST /api/admin/people error:', error);
    return NextResponse.json(
      { success: false, error: (error as Error).message },
      { status: 500 }
    );
  }
}
