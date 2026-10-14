import { NextRequest, NextResponse } from 'next/server';
import { syncPartnersFromHeaderMenu } from '@/lib/services/partner-item.service';

export const dynamic = 'force-dynamic';

export async function POST(request: NextRequest) {
  try {
    let body: any = null;
    try {
      body = await request.json();
    } catch {
      // Body may be empty if called without payload
      body = null;
    }

    const partners = Array.isArray(body?.partners) ? body.partners : undefined;
    const result = await syncPartnersFromHeaderMenu(partners);

    return NextResponse.json({
      success: true,
      message: `Đã đồng bộ ${result.count} đối tác từ Menu Header thành công!`,
      count: result.count,
      items: result.items,
    });
  } catch (error: any) {
    console.error('[API /api/admin/partners/sync-menu] Error:', error);
    return NextResponse.json(
      {
        success: false,
        error: error?.message || 'Không thể đồng bộ đối tác từ Menu Header',
      },
      { status: 500 }
    );
  }
}
