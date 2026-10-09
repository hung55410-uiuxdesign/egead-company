import { getAllPosts, getCategories } from "@/lib/blogs";
import { BlogListClient } from "@/components/admin/blogs";

export const dynamic = "force-dynamic";

export default async function AdminBlogsPage() {
  const posts = await getAllPosts();
  const categories = await getCategories();

  return <BlogListClient initialPosts={posts} categories={categories} />;
}
