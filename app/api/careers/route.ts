import { NextRequest, NextResponse } from 'next/server';
import { getAllJobs, getDepartments } from '@/lib/careers';
import { isLocale } from '@/lib/i18n/config';

export const dynamic = 'force-dynamic';

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const department = searchParams.get('department') || undefined;
    const search = searchParams.get('search') || undefined;
    const localeParam = searchParams.get('locale');
    const locale = isLocale(localeParam) ? localeParam : undefined;

    const [jobs, departments] = await Promise.all([
      getAllJobs({
        status: 'published',
        department,
        search,
        locale,
      }),
      getDepartments(),
    ]);

    return NextResponse.json({
      success: true,
      data: jobs,
      departments,
      total: jobs.length,
    });
  } catch (error) {
    const message = error instanceof Error ? error.message : 'Lỗi máy chủ khi lấy danh sách tuyển dụng';
    return NextResponse.json(
      { success: false, error: message },
      { status: 500 }
    );
  }
}
