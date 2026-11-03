import { NextRequest, NextResponse } from 'next/server';
import { revalidatePath } from 'next/cache';
import {
  getCareersPageConfig,
  updateCareersPageConfig,
} from '@/lib/services/careers-page-config.service';

export const dynamic = 'force-dynamic';

export async function GET() {
  try {
    const config = await getCareersPageConfig();
    return NextResponse.json({
      success: true,
      config,
    });
  } catch (error) {
    console.error('Error fetching careers page config:', error);
    return NextResponse.json(
      { success: false, error: 'Không thể tải cấu hình trang tuyển dụng' },
      { status: 500 }
    );
  }
}

export async function PUT(request: NextRequest) {
  try {
    const body = await request.json();
    const updated = await updateCareersPageConfig(body.data || body);

    revalidatePath('/careers');
    revalidatePath('/contact-us');
    revalidatePath('/admin/careers-page');
    revalidatePath('/', 'layout');

    return NextResponse.json({
      success: true,
      config: updated,
    });
  } catch (error: any) {
    console.error('Error updating careers page config:', error);
    return NextResponse.json(
      { success: false, error: error?.message || 'Không thể cập nhật cấu hình' },
      { status: 500 }
    );
  }
}
