import fs from 'fs/promises';
import path from 'path';
import { BlogPost, BlogStats, BlogCategory } from '@/types/blog';
import initialBlogs from '@/data/blogs.json';

const BLOGS_FILE_PATH = path.join(process.cwd(), 'data', 'blogs.json');

export async function getAllPosts(): Promise<BlogPost[]> {
  try {
    const fileContent = await fs.readFile(BLOGS_FILE_PATH, 'utf-8');
    const posts: BlogPost[] = JSON.parse(fileContent);
    return posts.sort(
      (a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
    );
  } catch {
    return initialBlogs as BlogPost[];
  }
}

export async function getPostBySlug(slug: string): Promise<BlogPost | null> {
  const posts = await getAllPosts();
  return posts.find((p) => p.slug === slug) || null;
}

export async function getPostById(id: string): Promise<BlogPost | null> {
  const posts = await getAllPosts();
  return posts.find((p) => p.id === id) || null;
}

export async function getBlogStats(): Promise<BlogStats> {
  const posts = await getAllPosts();
  const totalPosts = posts.length;
  const publishedPosts = posts.filter((p) => p.status === 'published').length;
  const draftPosts = posts.filter((p) => p.status === 'draft').length;
  const totalViews = posts.reduce((acc, curr) => acc + (curr.views || 0), 0);

  return {
    totalPosts,
    publishedPosts,
    draftPosts,
    totalViews,
  };
}

export async function getCategories(): Promise<BlogCategory[]> {
  const posts = await getAllPosts();
  const categoryMap = new Map<string, number>();

  posts.forEach((post) => {
    const cat = post.tag || post.category || 'General';
    categoryMap.set(cat, (categoryMap.get(cat) || 0) + 1);
  });

  return Array.from(categoryMap.entries()).map(([name, count], index) => ({
    id: `cat-${index + 1}`,
    name,
    slug: name.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, ''),
    count,
  }));
}

export async function savePost(
  postData: Partial<BlogPost> & { title: string }
): Promise<BlogPost> {
  const posts = await getAllPosts();
  const now = new Date().toISOString();

  let postToSave: BlogPost;

  if (postData.id) {
    const index = posts.findIndex((p) => p.id === postData.id);
    if (index === -1) {
      throw new Error(`Post with id "${postData.id}" not found`);
    }

    postToSave = {
      ...posts[index],
      ...postData,
      updatedAt: now,
    };
    posts[index] = postToSave;
  } else {
    const id = `post-${Date.now()}`;
    const slug =
      postData.slug ||
      postData.title
        .toLowerCase()
        .replace(/[^a-z0-9]+/g, '-')
        .replace(/(^-|-$)/g, '');

    postToSave = {
      id,
      slug,
      title: postData.title,
      subtitle: postData.subtitle || '',
      tag: postData.tag || 'General',
      category: postData.category || 'Insights',
      date: new Date().toLocaleDateString('en-US', {
        month: 'long',
        day: '2-digit',
        year: 'numeric',
      }),
      readTime: postData.readTime || '5 mins read',
      heroImage: postData.heroImage || '/assets/case_brother.jpg',
      excerpt: postData.excerpt || '',
      content: Array.isArray(postData.content)
        ? postData.content
        : [postData.content || ''],
      author: postData.author || {
        name: 'E-GEAD Team',
        role: 'Editor',
      },
      status: postData.status || 'draft',
      views: postData.views || 0,
      featured: postData.featured || false,
      createdAt: now,
      updatedAt: now,
    };
    posts.unshift(postToSave);
  }

  await fs.writeFile(BLOGS_FILE_PATH, JSON.stringify(posts, null, 2), 'utf-8');
  return postToSave;
}

export async function deletePost(id: string): Promise<boolean> {
  const posts = await getAllPosts();
  const filtered = posts.filter((p) => p.id !== id);

  if (filtered.length === posts.length) {
    return false;
  }

  await fs.writeFile(BLOGS_FILE_PATH, JSON.stringify(filtered, null, 2), 'utf-8');
  return true;
}
