import { getCategoriesWithCount } from "@/lib/services/category.service";
import { getAllPosts } from "@/lib/services/blog.service";
import CategoryManagerClient from "@/components/admin/CategoryManagerClient";

export const dynamic = "force-dynamic";

export default async function AdminCategoriesPage() {
  const categories = await getCategoriesWithCount();
  const allPosts = await getAllPosts();

  return (
    <CategoryManagerClient initialCategories={categories} allPosts={allPosts} />
  );
}
