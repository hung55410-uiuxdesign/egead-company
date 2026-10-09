import { NextRequest, NextResponse } from 'next/server';
import { getAllContactInquiries, getContactStats } from '@/lib/contacts';

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const status = searchParams.get('status') || undefined;
    const region = searchParams.get('region') || undefined;
    const search = searchParams.get('search') || undefined;
    const statsOnly = searchParams.get('statsOnly') === 'true';

    if (statsOnly) {
      const stats = await getContactStats();
      return NextResponse.json({ success: true, data: stats });
    }

    const [inquiries, stats] = await Promise.all([
      getAllContactInquiries({ status, region, search }),
      getContactStats(),
    ]);

    return NextResponse.json({
      success: true,
      data: inquiries,
      stats,
    });
  } catch (error) {
    return NextResponse.json(
      { success: false, error: (error as Error).message },
      { status: 500 }
    );
  }
}
