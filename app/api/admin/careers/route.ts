import { NextRequest, NextResponse } from 'next/server';
import { revalidatePath } from 'next/cache';
import { getAllJobs, saveJob } from '@/lib/careers';

export const dynamic = 'force-dynamic';

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const status = searchParams.get('status') || undefined;
    const department = searchParams.get('department') || undefined;
    const search = searchParams.get('search') || undefined;
    const languageParam = searchParams.get('language');
    const language =
      languageParam === 'en' || languageParam === 'vi' ? languageParam : undefined;

    const jobs = await getAllJobs({ status, department, search, language });
    return NextResponse.json({ success: true, data: jobs });
  } catch (error) {
    return NextResponse.json(
      { success: false, error: (error as Error).message },
      { status: 500 }
    );
  }
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();

    if (!body.title) {
      return NextResponse.json(
        { success: false, error: 'Tiêu đề tin tuyển dụng không được để trống' },
        { status: 400 }
      );
    }

    const saved = await saveJob(body);

    revalidatePath('/careers');
    revalidatePath(`/careers/${saved.slug}`);
    revalidatePath('/admin/careers');

    return NextResponse.json({ success: true, data: saved }, { status: 201 });
  } catch (error) {
    return NextResponse.json(
      { success: false, error: (error as Error).message },
      { status: 500 }
    );
  }
}
