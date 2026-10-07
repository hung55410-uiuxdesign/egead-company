import { NextRequest, NextResponse } from 'next/server';
import { getAllPosts, savePost } from '@/lib/blogs';

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const status = searchParams.get('status');
    const search = searchParams.get('search')?.toLowerCase();
    const tag = searchParams.get('tag');

    let posts = await getAllPosts();

    if (status && status !== 'all') {
      posts = posts.filter((p) => p.status === status);
    }

    if (tag && tag !== 'all') {
      posts = posts.filter((p) => p.tag === tag || p.category === tag);
    }

    if (search) {
      posts = posts.filter(
        (p) =>
          p.title.toLowerCase().includes(search) ||
          p.excerpt.toLowerCase().includes(search) ||
          p.slug.toLowerCase().includes(search)
      );
    }

    return NextResponse.json({ success: true, data: posts });
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
        { success: false, error: 'Tiêu đề bài viết không được để trống' },
        { status: 400 }
      );
    }

    const saved = await savePost(body);
    return NextResponse.json({ success: true, data: saved }, { status: 201 });
  } catch (error) {
    return NextResponse.json(
      { success: false, error: (error as Error).message },
      { status: 500 }
    );
  }
}
