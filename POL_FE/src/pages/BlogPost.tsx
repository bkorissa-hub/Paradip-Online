import { useEffect, useState } from 'react';
import { Helmet } from 'react-helmet-async';
import { useParams, Link, useNavigate } from 'react-router-dom';
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import {
  ArrowLeft,
  Calendar,
  Clock,
  User,
  Share2,
  BookmarkPlus,
  ChevronRight,
} from 'lucide-react';
import { getBlogs, getBlogBySlug, BlogPost as BlogPostType } from '@/api/blogsApi';

const BlogPost = () => {
  const { slug } = useParams<{ slug: string }>();
  const navigate = useNavigate();
  const [content, setContent] = useState<string>('');
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [post, setPost] = useState<BlogPostType | null>(null);
  const [blogPosts, setBlogPosts] = useState<BlogPostType[]>([]);

  // Fetch all blogs and find the current post
  useEffect(() => {
    const fetchBlogs = async () => {
      const { data, error: fetchError } = await getBlogs();
      if (data && !fetchError) {
        setBlogPosts(data);
        const foundPost = data.find(p => p.slug === slug);
        setPost(foundPost || null);
        if (!foundPost) {
          setError('Blog post not found');
        }
      } else {
        setError('Failed to load blogs');
      }
    };
    fetchBlogs();
  }, [slug]);

  // Get related posts (same category, excluding current)
  const relatedPosts = post
    ? blogPosts
        .filter((p) => p.category === post.category && p.id !== post.id)
        .slice(0, 3)
    : [];

  useEffect(() => {
    if (!post) {
      setError('Blog post not found');
      setIsLoading(false);
      return;
    }

    const fetchContent = async () => {
      try {
        setIsLoading(true);
        const response = await fetch(post.contentPath);
        if (!response.ok) {
          throw new Error('Failed to load blog content');
        }
        const text = await response.text();
        setContent(text);
        setError(null);
      } catch (err) {
        setError('Failed to load blog content');
        console.error('Error fetching blog content:', err);
      } finally {
        setIsLoading(false);
      }
    };

    fetchContent();
  }, [post]);

  if (error || !post) {
    return (
      <div className="min-h-screen bg-slate-50 flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-4xl font-bold text-slate-900 mb-4">
            Blog Post Not Found
          </h1>
          <p className="text-slate-500 mb-8">
            The blog post you're looking for doesn't exist or has been removed.
          </p>
          <Button onClick={() => navigate('/blog')}>
            <ArrowLeft className="mr-2 h-4 w-4" />
            Back to Blog
          </Button>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-slate-50 min-h-screen">
      <Helmet>
        <title>{post.title} | Paradip Online Blog</title>
        <meta name="description" content={post.excerpt} />
        <link rel="canonical" href={`https://paradiponline.com/blog/${post.slug}`} />
        <meta property="og:title" content={post.title} />
        <meta property="og:description" content={post.excerpt} />
        <meta property="og:image" content={post.image} />
        <script type="application/ld+json">
          {JSON.stringify({
            "@context": "https://schema.org",
            "@type": "Article",
            "headline": post.title,
            "image": post.image,
            "datePublished": post.date,
            "author": [{
              "@type": "Organization",
              "name": post.author,
              "url": "https://paradiponline.com"
            }],
            "description": post.excerpt
          })}
        </script>
      </Helmet>

      {/* Hero Section */}
      <section className="relative py-16 bg-slate-900 overflow-hidden">
        <div className="absolute inset-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-20 brightness-100 contrast-150 mix-blend-overlay"></div>
        <div className="absolute top-0 right-0 -translate-y-12 translate-x-12 blur-3xl opacity-30">
          <div className="aspect-[1097/845] w-[68.5625rem] bg-gradient-to-tr from-[#ff4694] to-[#776fff] opacity-20"></div>
        </div>

        <div className="container mx-auto px-4 relative z-10">
          {/* Breadcrumb */}
          <nav className="flex items-center gap-2 text-sm text-slate-400 mb-8">
            <Link to="/" className="hover:text-white transition-colors">
              Home
            </Link>
            <ChevronRight className="h-4 w-4" />
            <Link to="/blog" className="hover:text-white transition-colors">
              Blog
            </Link>
            <ChevronRight className="h-4 w-4" />
            <span className="text-slate-300">{post.category}</span>
          </nav>

          {/* Post Header */}
          <div className="max-w-4xl">
            <Badge className="mb-4 bg-blue-500/20 text-blue-300 hover:bg-blue-500/30 border-0">
              {post.category}
            </Badge>
            <h1 className="font-display text-3xl md:text-4xl lg:text-5xl font-bold text-white mb-6 leading-tight">
              {post.title}
            </h1>
            <p className="text-slate-400 text-lg md:text-xl mb-8 leading-relaxed">
              {post.excerpt}
            </p>

            {/* Meta Info */}
            <div className="flex flex-wrap items-center gap-6 text-sm">
              <div className="flex items-center gap-3">
                <div className="h-10 w-10 rounded-full bg-slate-700 flex items-center justify-center text-slate-300">
                  <User className="h-5 w-5" />
                </div>
                <div>
                  <p className="text-white font-medium">{post.author}</p>
                </div>
              </div>
              <div className="flex items-center gap-4 text-slate-400">
                <span className="flex items-center gap-1">
                  <Calendar className="h-4 w-4" /> {post.date}
                </span>
                <span className="flex items-center gap-1">
                  <Clock className="h-4 w-4" /> {post.readTime}
                </span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Featured Image */}
      <div className="container mx-auto px-4 -mt-8 relative z-20">
        <div className="max-w-4xl mx-auto">
          <div className="aspect-[16/9] rounded-2xl overflow-hidden shadow-2xl">
            <img
              src={post.image}
              alt={post.title}
              className="w-full h-full object-cover"
            />
          </div>
        </div>
      </div>

      {/* Content Section */}
      <div className="container mx-auto px-4 py-16">
        <div className="max-w-4xl mx-auto">
          <div className="flex gap-8">
            {/* Main Content */}
            <article className="flex-1 min-w-0">
              {isLoading ? (
                <div className="animate-pulse space-y-4">
                  <div className="h-4 bg-slate-200 rounded w-3/4"></div>
                  <div className="h-4 bg-slate-200 rounded"></div>
                  <div className="h-4 bg-slate-200 rounded w-5/6"></div>
                  <div className="h-4 bg-slate-200 rounded w-4/5"></div>
                  <div className="h-4 bg-slate-200 rounded"></div>
                </div>
              ) : (
                <div className="prose prose-lg prose-slate max-w-none prose-headings:font-display prose-headings:font-bold prose-a:text-blue-600 prose-img:rounded-xl">
                  <ReactMarkdown remarkPlugins={[remarkGfm]}>
                    {content}
                  </ReactMarkdown>
                </div>
              )}

              {/* Share & Actions */}
              <div className="mt-12 pt-8 border-t border-slate-200 flex flex-wrap items-center justify-between gap-4">
                <div className="flex items-center gap-3">
                  <span className="text-sm text-slate-500">
                    Share this article:
                  </span>
                  <Button variant="outline" size="sm">
                    <Share2 className="h-4 w-4" />
                  </Button>
                </div>
                <Button variant="outline" size="sm">
                  <BookmarkPlus className="h-4 w-4 mr-2" />
                  Save for later
                </Button>
              </div>
            </article>
          </div>

          {/* Related Posts */}
          {relatedPosts.length > 0 && (
            <div className="mt-20">
              <h2 className="text-2xl font-bold text-slate-900 mb-8">
                Related Articles
              </h2>
              <div className="grid md:grid-cols-3 gap-6">
                {relatedPosts.map((relatedPost) => (
                  <Link
                    key={relatedPost.id}
                    to={`/blog/${relatedPost.slug}`}
                    className="group bg-white rounded-xl border border-slate-200 overflow-hidden hover:shadow-lg transition-shadow"
                  >
                    <div className="aspect-[16/9] overflow-hidden">
                      <img
                        src={relatedPost.image}
                        alt={relatedPost.title}
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                      />
                    </div>
                    <div className="p-4">
                      <Badge variant="secondary" className="mb-2 text-xs">
                        {relatedPost.category}
                      </Badge>
                      <h3 className="font-semibold text-slate-900 line-clamp-2 group-hover:text-blue-600 transition-colors">
                        {relatedPost.title}
                      </h3>
                    </div>
                  </Link>
                ))}
              </div>
            </div>
          )}

          {/* Back to Blog */}
          <div className="mt-12 text-center">
            <Button variant="outline" onClick={() => navigate('/blog')}>
              <ArrowLeft className="mr-2 h-4 w-4" />
              Back to All Articles
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default BlogPost;
