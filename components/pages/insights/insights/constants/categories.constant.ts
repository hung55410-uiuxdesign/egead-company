type CategoryMeta = {
  title: string;
  subtitle: string;
  icon: string;
  link: string;
}

export const CATEGORY_MAP: Record<string, CategoryMeta> = {
  webinars: {
    title: 'Webinars',
    subtitle: "Join or watch our webinars to equip you for tomorrow's leadership.",
    icon: '/assets/icon_webinar.svg',
    link: '/webinars',
  },
  announcements: {
    title: 'Announcements',
    subtitle: 'Stay updated on product launches, strategic milestones, and company announcements.',
    icon: '/assets/icon_announcement.svg',
    link: '/announcements',
  },
  'white-papers': {
    title: 'White Papers',
    subtitle: 'In-depth research papers, enterprise blueprints, and strategic benchmarks.',
    icon: '/assets/icon_whitepaper.svg',
    link: '/white-papers',
  },
  blog: {
    title: 'Blog',
    subtitle: 'Thought leadership, industry perspectives, and technical architecture guides.',
    icon: '/assets/icon_blog.svg',
    link: '/blog',
  },
  blogs: {
    title: 'Blogs',
    subtitle: 'Thought leadership, industry perspectives, and technical architecture guides.',
    icon: '/assets/icon_blog.svg',
    link: '/blog',
  },
};
