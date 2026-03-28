import { useState, useEffect } from 'react';
import { Helmet } from 'react-helmet-async';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import {
  Search,
  Calendar,
  User,
  Clock,
  ArrowRight,
  Sparkles,
  BookOpen,
  TrendingUp,
  ChevronRight,
  Mail,
  Loader2,
} from 'lucide-react';
import { cn } from '@/lib/utils';
import { getBlogs, BlogPost } from '@/api/blogsApi';

const Blog = () => {
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [searchQuery, setSearchQuery] = useState('');
  const [blogPosts, setBlogPosts] = useState<BlogPost[]>([]);
  const [loading, setLoading] = useState(true);

  // Fetch blogs from API
  useEffect(() => {
    const fetchBlogs = async () => {
      setLoading(true);
      const { data, error } = await getBlogs();
      if (data && !error) {
        setBlogPosts(data);
      }
      setLoading(false);
    };
    fetchBlogs();
  }, []);

  // Extract unique categories from blog posts
  const categories = ['All', ...Array.from(new Set(blogPosts.map(post => post.category)))];

  const filteredPosts = blogPosts.filter((post) => {
    const matchesCategory =
      selectedCategory === 'All' || post.category === selectedCategory;
    const matchesSearch =
      post.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      post.excerpt.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  const featuredPost = blogPosts.find((post) => post.featured);
  const regularPosts = filteredPosts.filter(
    (post) => !post.featured || selectedCategory !== 'All'
  );

  // Show loading state
  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-slate-50">
        <div className="text-center">
          <Loader2 className="h-12 w-12 animate-spin text-blue-600 mx-auto mb-4" />
          <p className="text-slate-600">Loading blog posts...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-slate-50 min-h-screen">
      <Helmet>
        <title>Tech Blog & Buying Guides | Paradip Online</title>
        <meta name="description" content="Discover expert computer troubleshooting tips, PC buying guides, and enterprise IT solutions at Paradip Online's official tech blog." />
        <link rel="canonical" href="https://paradiponline.com/blog" />
      </Helmet>
      {/* 1. Hero Section */}
      <section className="relative py-20 bg-slate-900 overflow-hidden isolate">
        <div className="absolute inset-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-20 brightness-100 contrast-150 mix-blend-overlay"></div>
        <div className="absolute top-0 right-0 -translate-y-12 translate-x-12 blur-3xl opacity-30">
          <div className="aspect-[1097/845] w-[68.5625rem] bg-gradient-to-tr from-[#ff4694] to-[#776fff] opacity-20"></div>
        </div>

        <div className="container mx-auto px-4 text-center relative z-10">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-500/10 border border-blue-500/20 text-blue-400 text-sm font-medium mb-6">
            <BookOpen className="h-4 w-4" />
            <span>Knowledge Hub</span>
          </div>
          <h1 className="font-display text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-6 tracking-tight">
            Latest Tech Insights
          </h1>
          <p className="text-slate-400 text-lg md:text-xl max-w-2xl mx-auto leading-relaxed">
            Expert advice on hardware repairs, software updates, and maintaining
            your digital life.
          </p>
        </div>
      </section>

      <div className="container mx-auto px-4 -mt-10 relative z-20 pb-20">
        {/* 2. Controls Bar (Card Style) */}
        <div className="bg-white rounded-2xl shadow-xl shadow-slate-200/50 border border-slate-100 p-4 mb-12">
          <div className="flex flex-col md:flex-row gap-6 items-center justify-between">
            {/* Categories */}
            <div className="flex overflow-x-auto pb-2 md:pb-0 gap-2 w-full md:w-auto no-scrollbar mask-gradient">
              {categories.map((category) => (
                <button
                  key={category}
                  onClick={() => setSelectedCategory(category)}
                  className={cn(
                    'whitespace-nowrap px-4 py-2 rounded-lg text-sm font-medium transition-all duration-200 border',
                    selectedCategory === category
                      ? 'bg-slate-900 text-white border-slate-900 shadow-md'
                      : 'bg-white text-slate-600 border-slate-200 hover:border-slate-300 hover:bg-slate-50'
                  )}
                >
                  {category}
                </button>
              ))}
            </div>

            {/* Search */}
            <div className="relative w-full md:w-72 shrink-0">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-slate-400" />
              <Input
                placeholder="Search articles..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-10 bg-slate-50 border-slate-200 focus:bg-white transition-all"
              />
            </div>
          </div>
        </div>

        {/* 3. Featured Post (Magazine Layout) */}
        {selectedCategory === 'All' && featuredPost && !searchQuery && (
          <div className="mb-16 animate-fade-in-up">
            <Link
              to={`/blog/${featuredPost.slug}`}
              className="group relative grid lg:grid-cols-12 gap-0 bg-white rounded-3xl overflow-hidden border border-slate-200 shadow-lg hover:shadow-xl transition-shadow duration-300"
            >
              {/* Image Side */}
              <div className="lg:col-span-7 relative h-72 lg:h-auto overflow-hidden">
                <div className="absolute top-4 left-4 z-10">
                  <Badge className="bg-white/90 text-slate-900 hover:bg-white shadow-sm backdrop-blur-md border-0">
                    <Sparkles className="h-3 w-3 mr-1 text-amber-500" />
                    Featured
                  </Badge>
                </div>
                <img
                  src={featuredPost.image}
                  alt={featuredPost.title}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700 ease-out"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent lg:hidden"></div>
              </div>

              {/* Content Side */}
              <div className="lg:col-span-5 p-8 lg:p-12 flex flex-col justify-center relative">
                <div className="mb-4 flex items-center gap-3">
                  <Badge
                    variant="secondary"
                    className="bg-blue-50 text-blue-700 hover:bg-blue-100"
                  >
                    {featuredPost.category}
                  </Badge>
                  <span className="text-slate-400 text-xs font-medium flex items-center gap-1">
                    <Clock className="h-3 w-3" /> {featuredPost.readTime}
                  </span>
                </div>

                <h2 className="font-display text-2xl lg:text-3xl font-bold text-slate-900 mb-4 leading-tight group-hover:text-blue-600 transition-colors">
                  {featuredPost.title}
                </h2>
                <p className="text-slate-500 text-lg mb-8 leading-relaxed line-clamp-3">
                  {featuredPost.excerpt}
                </p>

                <div className="mt-auto pt-6 border-t border-slate-100 flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <div className="h-10 w-10 rounded-full bg-slate-100 flex items-center justify-center text-slate-500">
                      <User className="h-5 w-5" />
                    </div>
                    <div>
                      <p className="text-sm font-bold text-slate-900">
                        {featuredPost.author}
                      </p>
                    </div>
                  </div>
                  <Button variant="ghost" className="hidden sm:flex group/btn">
                    Read Article{' '}
                    <ArrowRight className="ml-2 h-4 w-4 group-hover/btn:translate-x-1 transition-transform" />
                  </Button>
                </div>
              </div>
            </Link>
          </div>
        )}

        {/* 4. Regular Grid */}
        <div className="mb-8 flex items-center gap-2">
          <TrendingUp className="h-5 w-5 text-blue-600" />
          <h3 className="text-xl font-bold text-slate-900">Latest Articles</h3>
        </div>

        {regularPosts.length > 0 ? (
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {regularPosts.map((post, index) => (
              <Link
                to={`/blog/${post.slug}`}
                key={post.id}
                className="group flex flex-col bg-white rounded-2xl border border-slate-200 overflow-hidden shadow-sm hover:shadow-xl hover:shadow-slate-200/50 hover:-translate-y-1 transition-all duration-300"
                style={{ animationDelay: `${index * 100}ms` }}
              >
                {/* Card Image */}
                <div className="aspect-[16/9] overflow-hidden relative">
                  <Badge className="absolute top-3 left-3 z-10 bg-white/90 text-slate-900 shadow-sm backdrop-blur-md border-0 hover:bg-white">
                    {post.category}
                  </Badge>
                  <img
                    src={post.image}
                    alt={post.title}
                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                  />
                </div>

                {/* Card Content */}
                <div className="p-6 flex flex-col flex-1">
                  <div className="flex items-center gap-2 text-xs text-slate-400 mb-3">
                    <span className="flex items-center gap-1">
                      <Calendar className="h-3 w-3" /> {post.date}
                    </span>
                    <span>•</span>
                    <span className="flex items-center gap-1">
                      <Clock className="h-3 w-3" /> {post.readTime}
                    </span>
                  </div>

                  <h3 className="font-display font-bold text-xl text-slate-900 mb-3 line-clamp-2 group-hover:text-blue-600 transition-colors">
                    {post.title}
                  </h3>

                  <p className="text-slate-500 text-sm leading-relaxed mb-6 line-clamp-3 flex-1">
                    {post.excerpt}
                  </p>

                  <div className="pt-4 border-t border-slate-100 flex items-center justify-between">
                    <span className="text-xs font-semibold text-slate-600">
                      {post.author}
                    </span>
                    <span className="text-blue-600 text-xs font-bold flex items-center gap-1 group-hover:translate-x-1 transition-transform">
                      Read <ChevronRight className="h-3 w-3" />
                    </span>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        ) : (
          <div className="text-center py-20 bg-white rounded-2xl border border-dashed border-slate-200">
            <div className="h-16 w-16 bg-slate-50 rounded-full flex items-center justify-center mx-auto mb-4">
              <Search className="h-8 w-8 text-slate-300" />
            </div>
            <p className="text-slate-500 text-lg">
              No articles found matching your criteria.
            </p>
            <Button
              variant="outline"
              className="mt-4"
              onClick={() => {
                setSelectedCategory('All');
                setSearchQuery('');
              }}
            >
              Clear Filters
            </Button>
          </div>
        )}

        {/* 5. Newsletter Section (Dark Card) */}
        <div className="mt-20">
          <div className="relative overflow-hidden rounded-3xl bg-slate-900 px-6 py-16 sm:px-12 sm:py-20 text-center shadow-2xl">
            {/* Background Effects */}
            <div className="absolute top-0 left-0 w-full h-full opacity-30 pointer-events-none">
              <div className="absolute right-0 top-0 -translate-y-1/2 translate-x-1/3 w-96 h-96 bg-blue-500 rounded-full blur-[100px]"></div>
              <div className="absolute left-0 bottom-0 translate-y-1/2 -translate-x-1/3 w-96 h-96 bg-purple-500 rounded-full blur-[100px]"></div>
            </div>

            <div className="relative z-10 max-w-2xl mx-auto">
              <div className="inline-flex items-center justify-center h-12 w-12 rounded-xl bg-white/10 mb-6 text-white">
                <Mail className="h-6 w-6" />
              </div>
              <h2 className="font-display text-3xl font-bold text-white mb-4">
                Join our Tech Community
              </h2>
              <p className="text-slate-400 mb-8 text-lg">
                Get exclusive repair tips, hardware deals, and industry news
                delivered straight to your inbox. No spam, ever.
              </p>

              <div className="flex flex-col sm:flex-row gap-3 max-w-md mx-auto">
                <Input
                  type="email"
                  placeholder="Enter your email address"
                  className="h-12 bg-white/10 border-white/10 text-white placeholder:text-slate-500 focus:bg-white/20 transition-all"
                />
                <Button className="h-12 px-8 bg-blue-600 hover:bg-blue-500 text-white shadow-lg shadow-blue-600/25">
                  Subscribe
                </Button>
              </div>
              <p className="text-slate-500 text-xs mt-4">
                By subscribing, you agree to our Privacy Policy and Terms of
                Service.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Blog;
