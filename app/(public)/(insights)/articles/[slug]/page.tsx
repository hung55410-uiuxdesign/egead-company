import { notFound } from "next/navigation";
import type { Metadata } from "next";
import { getPostBySlug, getAllPosts } from "@/lib/blogs";
import { ArticleDetailView } from "@/components/pages/insights/articles/[slug]";

export const dynamic = "force-dynamic";

type Props = {
  params: Promise<{ slug: string }>;
};

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const post = await getPostBySlug(slug);

  if (!post) {
    return {
      title: "Article Not Found | E-GEAD",
    };
  }

  return {
    title: `${post.title} | E-GEAD Insights`,
    description: post.excerpt || post.subtitle || post.title,
    openGraph: {
      title: post.title,
      description: post.excerpt || post.subtitle || post.title,
      images: post.heroImage ? [{ url: post.heroImage }] : undefined,
    },
  };
}

export default async function ArticleDetailPage({ params }: Props) {
  const { slug } = await params;
  const post = await getPostBySlug(slug);

  if (!post) {
    notFound();
  }

  // Fetch all posts to find next article
  const allPosts = await getAllPosts({ status: "published" });
  const currentIndex = allPosts.findIndex(
    (p) => p.slug === slug || p.slug.toLowerCase() === slug.toLowerCase(),
  );
  const nextArticle =
    currentIndex !== -1 && allPosts.length > 1
      ? allPosts[(currentIndex + 1) % allPosts.length]
      : allPosts.find((p) => p.slug !== slug) || null;

  // Determine back link and category label
  const categoryLower = (post.category || "insights").toLowerCase();
  let backLink = "/insights";
  let backLabel = "Back To Insights";

  if (categoryLower.includes("webinar")) {
    backLink = "/webinars";
    backLabel = "Back To Webinars";
  } else if (categoryLower.includes("blog")) {
    backLink = "/blog";
    backLabel = "Back To Blog";
  } else if (categoryLower.includes("announcement")) {
    backLink = "/announcements";
    backLabel = "Back To Announcements";
  } else if (categoryLower.includes("white")) {
    backLink = "/white-papers";
    backLabel = "Back To White Papers";
  }

  // Tags list
  const tagsList = [
    post.tag,
    post.category,
    "Digital Transformation",
    "Omnichannel",
  ].filter((t, i, arr): t is string => Boolean(t) && arr.indexOf(t) === i);

  return (
    <ArticleDetailView
      post={post}
      nextArticle={nextArticle}
      backLink={backLink}
      backLabel={backLabel}
      tagsList={tagsList}
      isWhitePaper={categoryLower.includes("white")}
    />
  );
}
