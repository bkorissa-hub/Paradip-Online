import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function getImageUrl(path: string | undefined): string {
  if (!path) return 'https://via.placeholder.com/400';
  if (path.startsWith('http') || path.startsWith('data:')) return path;
  if (import.meta.env.DEV) return `http://localhost:5000${path.startsWith('/') ? '' : '/'}${path}`;
  return path;
}
