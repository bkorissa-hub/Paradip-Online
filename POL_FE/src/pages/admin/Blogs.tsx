import { useState, useEffect, useRef } from "react";
import { Upload, FileText, Loader2, Trash2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";
import { getBlogs, createBlog, deleteBlog, BlogPost } from "@/api/blogsApi";
import { getCategories, Category } from "@/api/categoryApi";
import { useToast } from "@/hooks/use-toast";
import { cn } from "@/lib/utils";

const Blogs = () => {
  const { toast } = useToast();
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [dragActive, setDragActive] = useState(false);
  const [posts, setPosts] = useState<BlogPost[]>([]);
  const [categories, setCategories] = useState<Category[]>([]);
  const [loading, setLoading] = useState(true);
  const [deletingPost, setDeletingPost] = useState<BlogPost | null>(null);
  const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false);

  useEffect(() => {
    loadData();
  }, []);

  const loadData = async () => {
    setLoading(true);

    // Load blogs
    const { data: blogData, error: blogError } = await getBlogs();
    if (blogError) {
      toast({ title: "Error", description: blogError, variant: "destructive" });
    } else if (blogData) {
      setPosts(blogData);
    }

    // Load blog categories
    const { data: catData } = await getCategories("Blog", true);
    if (catData) {
      setCategories(catData);
    }

    setLoading(false);
  };

  const handleDrag = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    if (e.type === "dragenter" || e.type === "dragover") {
      setDragActive(true);
    } else if (e.type === "dragleave") {
      setDragActive(false);
    }
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setDragActive(false);
    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      handleFile(e.dataTransfer.files[0]);
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    e.preventDefault();
    if (e.target.files && e.target.files[0]) {
      handleFile(e.target.files[0]);
    }
  };

  const handleFile = async (file: File) => {
    if (!file.name.endsWith(".md")) {
      toast({ title: "Invalid file type", description: "Please upload a Markdown (.md) file.", variant: "destructive" });
      return;
    }

    const text = await file.text();
    const title = file.name.replace(".md", "").replace(/-/g, " ");
    const preview = text.slice(0, 150) + "...";

    const newPost: Omit<BlogPost, "id"> = {
      title: title.charAt(0).toUpperCase() + title.slice(1),
      excerpt: preview,
      date: new Date().toLocaleDateString("en-US", { month: "short", day: "numeric", year: "numeric" }),
      readTime: `${Math.max(1, Math.ceil(text.split(" ").length / 200))} min read`,
      image: "https://images.unsplash.com/photo-1432821596592-e2c18b78144f?auto=format&fit=crop&w=800&q=80",
      category: categories.length > 0 ? categories[0].name : "Tech",
      slug: file.name.replace(".md", ""),
      author: "Admin",
      contentPath: `/blogs/${file.name}`,
    };

    const { error } = await createBlog(newPost);
    if (error) {
      toast({ title: "Error", description: error, variant: "destructive" });
    } else {
      toast({ title: "Blog post uploaded", description: `"${file.name}" has been added.` });
      // Reload everything
      loadData();
    }
  };

  const handleDeleteClick = (post: BlogPost) => {
    setDeletingPost(post);
    setIsDeleteDialogOpen(true);
  };

  const handleDeleteConfirm = async () => {
    if (!deletingPost) return;

    const { error } = await deleteBlog(deletingPost.id);
    if (error) {
      toast({ title: "Error", description: error, variant: "destructive" });
    } else {
      toast({ title: "Blog deleted", description: `"${deletingPost.title}" has been deleted.` });
      loadData();
    }
    setIsDeleteDialogOpen(false);
    setDeletingPost(null);
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center h-64">
        <Loader2 className="h-8 w-8 animate-spin text-primary" />
      </div>
    );
  }

  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-3xl font-bold text-foreground">Blog Management</h1>
        <p className="text-muted-foreground mt-1">Upload and manage your blog posts ({posts.length} posts)</p>
      </div>

      <div className="grid lg:grid-cols-3 gap-8">
        <div className="lg:col-span-1">
          <Card
            className={cn(
              "border-2 border-dashed transition-all duration-200 h-[300px] flex flex-col items-center justify-center text-center p-6 cursor-pointer",
              dragActive ? "border-primary bg-primary/5" : "border-border hover:border-primary/50"
            )}
            onDragEnter={handleDrag}
            onDragLeave={handleDrag}
            onDragOver={handleDrag}
            onDrop={handleDrop}
            onClick={() => fileInputRef.current?.click()}
          >
            <input ref={fileInputRef} className="hidden" type="file" accept=".md" onChange={handleChange} />
            <div className="h-16 w-16 rounded-full bg-secondary flex items-center justify-center mb-4">
              <Upload className="h-8 w-8 text-muted-foreground" />
            </div>
            <h3 className="font-semibold text-lg mb-1">Upload Article</h3>
            <p className="text-sm text-muted-foreground mb-4">Drag and drop your .md file here or click to browse</p>
            <Button variant="secondary" size="sm">Select File</Button>
          </Card>
        </div>

        <div className="lg:col-span-2 space-y-4">
          <h3 className="font-semibold text-lg">All Posts</h3>
          {posts.length === 0 ? (
            <p className="text-muted-foreground text-center py-8">No blog posts yet. Upload your first post!</p>
          ) : (
            posts.map((post) => (
              <Card key={post.id} className="overflow-hidden border shadow-sm hover:shadow-md transition-shadow">
                <CardContent className="p-0 flex flex-col sm:flex-row h-full">
                  <div className="sm:w-48 h-48 sm:h-auto bg-gray-100 shrink-0">
                    <img src={post.image} alt={post.title} className="w-full h-full object-cover" />
                  </div>
                  <div className="p-4 flex flex-col flex-1">
                    <div className="flex items-center justify-between mb-2">
                      <span className="text-xs font-semibold px-2 py-0.5 rounded-full bg-secondary text-secondary-foreground">{post.category}</span>
                      <span className="text-xs text-muted-foreground">{post.date}</span>
                    </div>
                    <h4 className="font-bold text-lg mb-1 line-clamp-1">{post.title}</h4>
                    <p className="text-sm text-muted-foreground line-clamp-2 mb-4 flex-1">{post.excerpt}</p>
                    <div className="flex items-center justify-between mt-auto pt-2 border-t">
                      <span className="text-xs text-muted-foreground flex items-center">
                        <FileText className="h-3 w-3 mr-1" />{post.readTime}
                      </span>
                      <Button
                        variant="ghost"
                        size="sm"
                        className="h-8 text-xs text-destructive hover:text-destructive hover:bg-destructive/10"
                        onClick={() => handleDeleteClick(post)}
                      >
                        <Trash2 className="h-4 w-4 mr-1" />
                        Delete
                      </Button>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))
          )}
        </div>
      </div>

      {/* Delete Confirmation Dialog */}
      <AlertDialog open={isDeleteDialogOpen} onOpenChange={setIsDeleteDialogOpen}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Are you sure?</AlertDialogTitle>
            <AlertDialogDescription>
              This will permanently delete "{deletingPost?.title}". This action cannot be undone.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel onClick={() => setDeletingPost(null)}>Cancel</AlertDialogCancel>
            <AlertDialogAction onClick={handleDeleteConfirm} className="bg-destructive text-destructive-foreground hover:bg-destructive/90">
              Delete
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </div>
  );
};

export default Blogs;
