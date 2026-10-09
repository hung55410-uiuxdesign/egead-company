import { getCategories } from '@/lib/blogs';
import { BlogEditorClient } from '@/components/admin/blogs';

export const dynamic = 'force-dynamic';

export default async function NewBlogPage() {
  const categories = await getCategories();

  return <BlogEditorClient categories={categories} />;
}
