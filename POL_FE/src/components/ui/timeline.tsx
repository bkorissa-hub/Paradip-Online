import * as React from 'react';
import { cn } from '@/lib/utils';

export function Timeline({ children }: { children: React.ReactNode }) {
  return (
    <div className="relative ml-3 md:ml-6 border-l border-slate-200 [&>*:last-child]:border-l-0">
      {children}
    </div>
  );
}

export function TimelineItem({
  children,
  className,
  isLast = false,
}: {
  children: React.ReactNode;
  className?: string;
  isLast?: boolean;
}) {
  return (
    <div
      className={cn('relative pl-8 md:pl-12', !isLast && 'pb-12', className)}
    >
      {children}
    </div>
  );
}

export function TimelineDot({ className }: { className?: string }) {
  return (
    <span
      className={cn(
        'absolute left-[-9px] top-2 h-4 w-4 rounded-full border-4 border-background bg-blue-600 shadow-sm',
        className
      )}
    />
  );
}

export function TimelineContent({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex flex-col sm:flex-row sm:items-baseline gap-2 sm:gap-4">
      {children}
    </div>
  );
}
