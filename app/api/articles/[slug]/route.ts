import { NextRequest, NextResponse } from 'next/server';
import { getPostBySlug, getAllPosts } from '@/lib/services/blog.service';

export const dynamic = 'force-dynamic';

interface RouteContext {
  params: Promise<{ slug: string }>;
}

/**
 * GET /api/articles/[slug]
 * Public API to fetch a single published article with related posts and next post.
 */
export async function GET(
  _request: NextRequest,
  context: RouteContext
) {
  try {
    const { slug } = await context.params;

    if (!slug) {
      return NextResponse.json(
        { success: false, error: 'Slug is required' },
        { status: 400 }
      );
    }

    const post = await getPostBySlug(slug);

    if (!post) {
      return NextResponse.json(
        { success: false, error: 'Article not found' },
        { status: 404 }
      );
    }

    // Fetch related articles (same category or tag, excluding current post)
    const allPosts = await getAllPosts({ status: 'published' });
    const otherPosts = allPosts.filter(
      (p) => p.slug !== slug && p.id !== post.id
    );

    const related = otherPosts
      .filter(
        (p) =>
          p.category.toLowerCase() === post.category.toLowerCase() ||
          p.tag.toLowerCase() === post.tag.toLowerCase()
      )
      .slice(0, 3);

    const fallbackRelated =
      related.length > 0 ? related : otherPosts.slice(0, 3);

    // Find next article in sequence
    const currentIndex = allPosts.findIndex((p) => p.slug === slug);
    const nextPost =
      currentIndex !== -1 && allPosts.length > 1
        ? allPosts[(currentIndex + 1) % allPosts.length]
        : null;

    return NextResponse.json({
      success: true,
      data: post,
      related: fallbackRelated,
      next: nextPost,
    });
  } catch (error) {
    console.error('API GET /api/articles/[slug] error:', error);
    return NextResponse.json(
      { success: false, error: (error as Error).message },
      { status: 500 }
    );
  }
}
