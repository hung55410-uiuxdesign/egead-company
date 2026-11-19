import { notFound } from "next/navigation";
import type { Metadata } from "next";
import { getPostBySlug, getAllPosts } from "@/lib/blogs";
import { getPostSiblings } from "@/lib/services/blog.service";
import { getLocale } from "@/lib/i18n/server";
import { getDictionary } from "@/lib/i18n/dictionaries";
import { localizeHref } from "@/lib/i18n/config";
import { ArticleDetailView } from "@/components/pages/insights/articles/[slug]";
import { getMediaThumbnailUrl } from "@/lib/utils/media";

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

  // hreflang only when the article really exists in both languages
  const siblings = await getPostSiblings(post, { publishedOnly: true });
  const languages: Record<string, string> = {};
  if (siblings.length > 1) {
    siblings.forEach((s) => {
      languages[s.locale] = localizeHref(`/articles/${s.slug}`, s.locale);
    });
  }

  return {
    title: `${post.title} | E-GEAD Insights`,
    description: post.excerpt || post.subtitle || post.title,
    ...(Object.keys(languages).length > 0 ? { alternates: { languages } } : {}),
    openGraph: {
      title: post.title,
      description: post.excerpt || post.subtitle || post.title,
      images: post.heroImage ? [{ url: getMediaThumbnailUrl(post.heroImage) }] : undefined,
    },
  };
}

export default async function ArticleDetailPage({ params }: Props) {
  const { slug } = await params;
  const post = await getPostBySlug(slug);

  if (!post) {
    notFound();
  }

  const locale = await getLocale();
  const t = getDictionary(locale);
  const siblings = await getPostSiblings(post, { publishedOnly: true });

  // Fetch all posts (one version per article, in this article's language) to find next article
  const allPosts = await getAllPosts({
    status: "published",
    locale: post.locale || "en",
  });
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
  let backLabel = t.article.backToInsights;

  if (categoryLower.includes("webinar")) {
    backLink = "/webinars";
    backLabel = t.article.backToWebinars;
  } else if (categoryLower.includes("blog")) {
    backLink = "/blog";
    backLabel = t.article.backToBlog;
  } else if (categoryLower.includes("announcement")) {
    backLink = "/announcements";
    backLabel = t.article.backToAnnouncements;
  } else if (categoryLower.includes("white")) {
    backLink = "/white-papers";
    backLabel = t.article.backToWhitePapers;
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
      siblings={siblings}
    />
  );
}
