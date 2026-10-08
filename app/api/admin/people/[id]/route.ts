import { NextRequest, NextResponse } from 'next/server';
import { requireAdmin } from '@/lib/admin-auth';
import { getTeamMember, updateTeamMember, deleteTeamMember } from '@/lib/people';
import { teamMemberUpdateSchema } from '@/lib/validations/people';

interface RouteContext {
  params: Promise<{ id: string }>;
}

export async function GET(request: NextRequest, context: RouteContext) {
  try {
    const isAdmin = await requireAdmin();
    if (!isAdmin) {
      return NextResponse.json(
        { success: false, error: 'Unauthorized: Bạn không có quyền truy cập.' },
        { status: 401 }
      );
    }

    const { id } = await context.params;
    const member = await getTeamMember(id);

    if (!member) {
      return NextResponse.json(
        { success: false, error: `Không tìm thấy nhân sự có ID: ${id}` },
        { status: 404 }
      );
    }

    return NextResponse.json({ success: true, data: member });
  } catch (error) {
    console.error('API GET /api/admin/people/[id] error:', error);
    return NextResponse.json(
      { success: false, error: (error as Error).message },
      { status: 500 }
    );
  }
}

export async function PUT(request: NextRequest, context: RouteContext) {
  try {
    const isAdmin = await requireAdmin();
    if (!isAdmin) {
      return NextResponse.json(
        { success: false, error: 'Unauthorized: Bạn không có quyền truy cập.' },
        { status: 401 }
      );
    }

    const { id } = await context.params;
    const existing = await getTeamMember(id);
    if (!existing) {
      return NextResponse.json(
        { success: false, error: `Không tìm thấy nhân sự có ID: ${id}` },
        { status: 404 }
      );
    }

    const body = await request.json();
    const parsed = teamMemberUpdateSchema.safeParse(body);

    if (!parsed.success) {
      return NextResponse.json(
        {
          success: false,
          error: parsed.error.issues[0]?.message || 'Dữ liệu cập nhật không hợp lệ',
          details: parsed.error.issues,
        },
        { status: 400 }
      );
    }

    const updated = await updateTeamMember(id, parsed.data);
    return NextResponse.json({ success: true, data: updated });
  } catch (error) {
    console.error('API PUT /api/admin/people/[id] error:', error);
    return NextResponse.json(
      { success: false, error: (error as Error).message },
      { status: 500 }
    );
  }
}

export async function DELETE(request: NextRequest, context: RouteContext) {
  try {
    const isAdmin = await requireAdmin();
    if (!isAdmin) {
      return NextResponse.json(
        { success: false, error: 'Unauthorized: Bạn không có quyền truy cập.' },
        { status: 401 }
      );
    }

    const { id } = await context.params;
    const existing = await getTeamMember(id);
    if (!existing) {
      return NextResponse.json(
        { success: false, error: `Không tìm thấy nhân sự có ID: ${id}` },
        { status: 404 }
      );
    }

    await deleteTeamMember(id);
    return NextResponse.json({ success: true, data: { id } });
  } catch (error) {
    console.error('API DELETE /api/admin/people/[id] error:', error);
    return NextResponse.json(
      { success: false, error: (error as Error).message },
      { status: 500 }
    );
  }
}
