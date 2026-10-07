import React from 'react';
import { getCategories } from '@/lib/blogs';
import BlogEditorClient from '@/components/admin/BlogEditorClient';

export const dynamic = 'force-dynamic';

export default async function NewBlogPage() {
  const categories = await getCategories();

  return <BlogEditorClient categories={categories} />;
}
