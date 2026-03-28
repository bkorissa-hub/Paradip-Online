import { get, post, put, del, ApiResponse } from "./apiClient";

export interface BlogPost {
  id: number;
  slug: string;
  title: string;
  excerpt: string;
  image: string;
  category: string;
  author: string;
  date: string;
  readTime: string;
  featured?: boolean;
  contentPath: string;
}

export async function getBlogs(): Promise<ApiResponse<BlogPost[]>> {
  return get<BlogPost[]>("blogs");
}

export async function getBlogBySlug(slug: string): Promise<ApiResponse<BlogPost[]>> {
  return get<BlogPost[]>(`blogs?slug=${slug}`);
}

export async function createBlog(blog: Omit<BlogPost, "id">): Promise<ApiResponse<BlogPost>> {
  return post<BlogPost>("blogs", blog);
}

export async function updateBlog(id: number, blog: BlogPost): Promise<ApiResponse<BlogPost>> {
  return put<BlogPost>(`blogs/${id}`, blog);
}

export async function deleteBlog(id: number): Promise<ApiResponse<{}>> {
  return del<{}>(`blogs/${id}`);
}
