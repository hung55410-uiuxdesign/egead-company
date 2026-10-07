import { NextRequest, NextResponse } from 'next/server';
import { getPostById, savePost, deletePost } from '@/lib/blogs';

export async function GET(
  _request: NextRequest,
  props: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await props.params;
    const post = await getPostById(id);

    if (!post) {
      return NextResponse.json(
        { success: false, error: 'Bài viết không tồn tại' },
        { status: 404 }
      );
    }

    return NextResponse.json({ success: true, data: post });
  } catch (error) {
    return NextResponse.json(
      { success: false, error: (error as Error).message },
      { status: 500 }
    );
  }
}

export async function PUT(
  request: NextRequest,
  props: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await props.params;
    const body = await request.json();

    const existing = await getPostById(id);
    if (!existing) {
      return NextResponse.json(
        { success: false, error: 'Bài viết không tồn tại' },
        { status: 404 }
      );
    }

    const updated = await savePost({ ...body, id });
    return NextResponse.json({ success: true, data: updated });
  } catch (error) {
    return NextResponse.json(
      { success: false, error: (error as Error).message },
      { status: 500 }
    );
  }
}

export async function DELETE(
  _request: NextRequest,
  props: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await props.params;
    const deleted = await deletePost(id);

    if (!deleted) {
      return NextResponse.json(
        { success: false, error: 'Bài viết không tồn tại để xoá' },
        { status: 404 }
      );
    }

    return NextResponse.json({ success: true, message: 'Đã xoá bài viết thành công' });
  } catch (error) {
    return NextResponse.json(
      { success: false, error: (error as Error).message },
      { status: 500 }
    );
  }
}
