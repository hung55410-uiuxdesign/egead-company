import { notFound } from 'next/navigation';
import { getPostById, getCategories } from '@/lib/blogs';
import { BlogEditorClient } from '@/components/admin/blogs';

export const dynamic = 'force-dynamic';

interface PageProps {
  params: Promise<{ id: string }>;
}

export default async function EditBlogPage({ params }: PageProps) {
  const { id } = await params;
  const post = await getPostById(id);

  if (!post) {
    notFound();
  }

  const categories = await getCategories();

  return <BlogEditorClient initialPost={post} categories={categories} />;
}
