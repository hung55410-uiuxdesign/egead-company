import type { Metadata } from 'next';
import ContactBlock from '@/components/ContactBlock';
import { MotionDiv } from '@/components/MotionSection';
import { getAllPosts, getInsightsHubData } from '@/lib/blogs';
import { getCategoriesWithCount } from '@/lib/services/category.service';
import { getCategoryHref } from '@/types/category';
import {
  InsightsHubView,
  InsightsCategoryView,
  CATEGORY_MAP,
} from '@/components/pages/insights/insights';

export const dynamic = 'force-dynamic';

export async function generateMetadata(props: {
  searchParams?: Promise<{ category?: string }>;
}): Promise<Metadata> {
  const searchParams = props.searchParams ? await props.searchParams : undefined;
  const currentCategory = searchParams?.category?.toLowerCase();

  if (currentCategory) {
    if (CATEGORY_MAP[currentCategory]) {
      const info = CATEGORY_MAP[currentCategory];
      return {
        title: `${info.title} | E-GEAD Insights`,
        description: info.subtitle,
      };
    }

    try {
      const categories = await getCategoriesWithCount();
      const dbCat = categories.find(
        (c) =>
          c.slug.toLowerCase() === currentCategory ||
          c.name.toLowerCase() === currentCategory
      );
      if (dbCat) {
        return {
          title: `${dbCat.name} | E-GEAD Insights`,
          description: dbCat.description || `Knowledge category: ${dbCat.name} by E-GEAD`,
        };
      }
    } catch {
      // Fallback
    }
  }

  return {
    title: 'Explore Expert Insights and Trends in Digital Transformation | E-GEAD',
    description:
      'Discover in-depth insights and the latest trends in digital transformation to empower your business strategy and drive innovation with expert analysis and resources.',
  };
}

interface InsightsPageProps {
  searchParams?: Promise<{ category?: string; tag?: string }>;
}

export default async function InsightsPage(props: InsightsPageProps) {
  const searchParams = props.searchParams ? await props.searchParams : undefined;
  const currentCategory = searchParams?.category?.toLowerCase();

  // 1. Specific Category View (/webinars, /blog, /announcements, etc.)
  if (currentCategory) {
    const dbCategories = await getCategoriesWithCount();
    const dbCategory = dbCategories.find(
      (c) =>
        c.slug.toLowerCase() === currentCategory ||
        c.name.toLowerCase() === currentCategory ||
        (currentCategory === 'blog' && c.slug.toLowerCase() === 'blogs') ||
        (currentCategory === 'blogs' && c.slug.toLowerCase() === 'blog')
    );

    if (CATEGORY_MAP[currentCategory] || dbCategory) {
      const catInfo = {
        title: dbCategory?.name || CATEGORY_MAP[currentCategory]?.title || currentCategory,
        subtitle:
          dbCategory?.description ||
          CATEGORY_MAP[currentCategory]?.subtitle ||
          `Knowledge category: ${dbCategory?.name || currentCategory} by E-GEAD`,
        icon: dbCategory?.icon || CATEGORY_MAP[currentCategory]?.icon || '',
        link: getCategoryHref(currentCategory),
      };

      const categoryPosts = await getAllPosts({
        status: 'published',
        category: currentCategory,
      });

      return (
        <div className="w-full overflow-hidden">
          <InsightsCategoryView
            categoryKey={currentCategory}
            categoryTitle={catInfo.title}
            categorySubtitle={catInfo.subtitle}
            categoryIcon={catInfo.icon}
            posts={categoryPosts}
          />

          <MotionDiv threshold={0.15}>
            <ContactBlock />
          </MotionDiv>
        </div>
      );
    }
  }

  // 2. Hub Overview View (/insights)
  const hubData = await getInsightsHubData();
  return <InsightsHubView hubData={hubData} />;
}
