export interface BlogPost {
  id: number;
  slug: string;
  title: string;
  excerpt: string;
  image: string;
  category: string;
  author: string;
  role?: string;
  date: string;
  readTime: string;
  featured?: boolean;
  contentPath: string;
}

export const categories = [
  'All',
  'Tips & Tricks',
  'Hardware',
  'Software',
  'Security',
  'News',
];

export const blogPosts: BlogPost[] = [
  {
    id: 1,
    slug: 'speed-up-old-laptop',
    title: '10 Essential Tips to Speed Up Your Old Laptop',
    excerpt:
      'Is your laptop running slow? Learn these proven techniques to breathe new life into your aging device without spending money on expensive upgrades.',
    image:
      'https://images.unsplash.com/photo-1496181133206-80ce9b88a853?auto=format&fit=crop&w=800&q=80',
    category: 'Tips & Tricks',
    author: 'Rakesh Mohanty',
    role: 'Senior Tech',
    date: 'Dec 15, 2024',
    readTime: '5 min read',
    featured: true,
    contentPath: '/blogs/speed-up-old-laptop.md',
  },
  {
    id: 2,
    slug: 'choose-right-laptop',
    title: 'How to Choose the Right Laptop for Your Needs',
    excerpt:
      'Confused about which laptop to buy? Our comprehensive guide helps you navigate specs, brands, and features to find your perfect match.',
    image:
      'https://images.unsplash.com/photo-1525547719571-a2d4ac8945e2?auto=format&fit=crop&w=800&q=80',
    category: 'Hardware',
    author: 'Amit Sahoo',
    date: 'Dec 12, 2024',
    readTime: '8 min read',
    contentPath: '/blogs/choose-right-laptop.md',
  },
  {
    id: 3,
    slug: 'protecting-from-ransomware',
    title: 'Protecting Your Computer from Ransomware',
    excerpt:
      'Ransomware attacks are on the rise. Learn how to protect your data and what to do if you become a victim of this growing threat.',
    image:
      'https://images.unsplash.com/photo-1563206767-5b18f218e8de?auto=format&fit=crop&w=800&q=80',
    category: 'Security',
    author: 'Sunita Das',
    date: 'Dec 10, 2024',
    readTime: '6 min read',
    contentPath: '/blogs/protecting-from-ransomware.md',
  },
  {
    id: 4,
    slug: 'windows-11-vs-windows-10',
    title: 'Windows 11 vs Windows 10: The Verdict',
    excerpt:
      "Windows 11 has been out for a while now. We compare the two operating systems to help you decide if it's finally time to upgrade.",
    image:
      'https://images.unsplash.com/photo-1624571395765-47d4c9e48dbc?auto=format&fit=crop&w=800&q=80',
    category: 'Software',
    author: 'Rakesh Mohanty',
    date: 'Dec 8, 2024',
    readTime: '7 min read',
    contentPath: '/blogs/windows-11-vs-windows-10.md',
  },
  {
    id: 5,
    slug: 'building-gaming-pc',
    title: 'Building Your First Gaming PC: A Guide',
    excerpt:
      'Ready to build your dream gaming rig? Our step-by-step guide covers everything from component selection to assembly tips.',
    image:
      'https://images.unsplash.com/photo-1587202372775-e229f172b9d7?auto=format&fit=crop&w=800&q=80',
    category: 'Hardware',
    author: 'Amit Sahoo',
    date: 'Dec 5, 2024',
    readTime: '12 min read',
    contentPath: '/blogs/building-gaming-pc.md',
  },
  {
    id: 6,
    slug: 'data-backup-best-practices',
    title: 'Data Backup Best Practices for Business',
    excerpt:
      "Don't wait for disaster to strike. Learn the 3-2-1 backup rule and other strategies to keep your business data safe.",
    image:
      'https://images.unsplash.com/photo-1558494949-ef010cbdcc31?auto=format&fit=crop&w=800&q=80',
    category: 'Tips & Tricks',
    author: 'Sunita Das',
    date: 'Dec 2, 2024',
    readTime: '5 min read',
    contentPath: '/blogs/data-backup-best-practices.md',
  },
];

export const getBlogBySlug = (slug: string): BlogPost | undefined => {
  return blogPosts.find((post) => post.slug === slug);
};

export const getBlogById = (id: number): BlogPost | undefined => {
  return blogPosts.find((post) => post.id === id);
};
