import { NextResponse } from 'next/server';
import { getCategoriesWithCount } from '@/lib/services/category.service';

export const dynamic = 'force-dynamic';

export async function GET() {
  try {
    const categories = await getCategoriesWithCount();
    return NextResponse.json({ success: true, data: categories });
  } catch (error) {
    console.error('API GET /api/categories error:', error);
    return NextResponse.json(
      { success: false, error: (error as Error).message },
      { status: 500 }
    );
  }
}
