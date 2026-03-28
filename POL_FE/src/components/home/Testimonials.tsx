import { Star, Quote } from 'lucide-react';
import { cn } from '@/lib/utils';

const testimonials = [
  {
    id: 1,
    name: 'Rajesh Kumar',
    role: 'Business Owner',
    content:
      'Excellent service! They fixed my laptop in just 2 hours. Very professional team and reasonable prices. Highly recommended for urgent repairs.',
    rating: 5,
    avatar:
      'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=200&q=80',
  },
  {
    id: 2,
    name: 'Priya Sharma',
    role: 'Teacher',
    content:
      "Got a custom PC built for my son's gaming needs. The team understood exactly what we needed and delivered a perfect setup within budget.",
    rating: 5,
    avatar:
      'https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&w=200&q=80',
  },
  {
    id: 3,
    name: 'Amit Patel',
    role: 'Software Developer',
    content:
      'Their on-site support is fantastic. They set up our entire office network quickly and efficiently. The ongoing support has been flawless.',
    rating: 5,
    avatar:
      'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=200&q=80',
  },
];

export function Testimonials() {
  return (
    <section className="pt-4 pb-8 lg:pt-8 lg:pb-12 relative overflow-hidden">
      {/* Background Grid */}
      <div className="absolute inset-0 -z-10 bg-[linear-gradient(to_right,#80808008_1px,transparent_1px),linear-gradient(to_bottom,#80808008_1px,transparent_1px)] bg-[size:32px_32px]"></div>
      {/* <div className="absolute inset-0 -z-10 bg-[linear-gradient(to_right,#80808020_1px,transparent_1px),linear-gradient(to_bottom,#80808020_1px,transparent_1px)] bg-[size:32px_32px]"></div> */}

      <div className="container mx-auto px-4">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <div className="inline-flex items-center rounded-full border border-primary/20 bg-primary/5 px-3 py-1 text-sm font-medium text-primary mb-6">
            Customer Stories
          </div>

          <h2 className="font-display text-3xl md:text-5xl font-bold text-slate-900 mb-6 tracking-tight">
            Trusted by locals and <br className="hidden sm:block" /> businesses
            alike.
          </h2>
          <p className="text-slate-600 text-lg md:text-xl leading-relaxed">
            We take pride in our work. Here is what our community has to say
            about their experience with our repair services.
          </p>
        </div>

        {/* Testimonials Grid */}
        <div className="grid md:grid-cols-3 gap-8">
          {testimonials.map((testimonial, index) => (
            <div
              key={testimonial.id}
              className={cn(
                'group relative bg-white p-8 rounded-2xl shadow-sm border border-slate-100',
                'hover:shadow-xl hover:shadow-slate-200/50 hover:-translate-y-1',
                'transition-all duration-300 ease-out flex flex-col'
              )}
            >
              {/* Large Decor Quote Icon */}
              <Quote className="absolute top-6 right-6 h-12 w-12 text-primary/5 -rotate-12 transition-transform group-hover:rotate-0 group-hover:scale-110" />

              {/* Stars */}
              <div className="flex gap-1 mb-6">
                {[...Array(5)].map((_, i) => (
                  <Star
                    key={i}
                    className={cn(
                      'h-4 w-4',
                      i < testimonial.rating
                        ? 'fill-amber-400 text-amber-400'
                        : 'fill-slate-200 text-slate-200'
                    )}
                  />
                ))}
              </div>

              {/* Content */}
              <blockquote className="flex-1 mb-6">
                <p className="text-slate-700 leading-relaxed italic relative z-10">
                  "{testimonial.content}"
                </p>
              </blockquote>

              {/* Author & Footer */}
              <div className="flex items-center gap-4 pt-6 border-t border-slate-100 mt-auto">
                <div className="relative">
                  <div className="absolute inset-0 rounded-full bg-primary/20 blur-sm group-hover:blur-md transition-all"></div>
                  <img
                    src={testimonial.avatar}
                    alt={testimonial.name}
                    loading="lazy"
                    className="relative h-12 w-12 rounded-full object-cover ring-2 ring-white"
                  />
                </div>
                <div>
                  <h4 className="font-bold text-slate-900 text-sm group-hover:text-primary transition-colors">
                    {testimonial.name}
                  </h4>
                  <p className="text-xs font-medium text-slate-500 uppercase tracking-wide">
                    {testimonial.role}
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
