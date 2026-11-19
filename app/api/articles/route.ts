import { NextRequest, NextResponse } from 'next/server';
import { getPaginatedPosts, getInsightsHubData, PostFilter } from '@/lib/services/blog.service';
import { isLocale } from '@/lib/i18n/config';

export const dynamic = 'force-dynamic';

/**
 * GET /api/articles
 * Public API to fetch published articles with filtering, searching, pagination,
 * or the aggregated Insights Hub structure.
 */
export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);

    const localeParam = searchParams.get('locale');
    const locale = isLocale(localeParam) ? localeParam : undefined;

    // 1. Hub view for overview page
    const view = searchParams.get('view');
    if (view === 'hub') {
      const hubData = await getInsightsHubData(locale);
      return NextResponse.json({
        success: true,
        data: hubData,
      });
    }

    // 2. Query parameters for filtered & paginated articles
    const category = searchParams.get('category') || undefined;
    const tag = searchParams.get('tag') || undefined;
    const search = searchParams.get('search') || undefined;
    const sortParam = searchParams.get('sort');
    const featuredParam = searchParams.get('featured');
    const pageParam = parseInt(searchParams.get('page') || '1', 10);
    const limitParam = parseInt(searchParams.get('limit') || '9', 10);
    const status = searchParams.get('status') || 'published';

    const sort: PostFilter['sort'] =
      sortParam === 'oldest' || sortParam === 'popular' || sortParam === 'newest'
        ? sortParam
        : 'newest';

    const featured =
      featuredParam === 'true' ? true : featuredParam === 'false' ? false : undefined;

    const result = await getPaginatedPosts({
      status,
      category,
      tag,
      search,
      featured,
      locale,
      sort,
      page: isNaN(pageParam) ? 1 : pageParam,
      limit: isNaN(limitParam) ? 9 : limitParam,
    });

    return NextResponse.json({
      success: true,
      data: result.posts,
      pagination: {
        page: result.page,
        limit: result.limit,
        total: result.total,
        totalPages: result.totalPages,
      },
    });
  } catch (error) {
    console.error('API GET /api/articles error:', error);
    return NextResponse.json(
      {
        success: false,
        error: (error as Error).message,
      },
      { status: 500 }
    );
  }
}
