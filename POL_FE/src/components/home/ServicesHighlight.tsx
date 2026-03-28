import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import {
  Wrench,
  Monitor,
  Cpu,
  Truck,
  HardDrive,
  Network,
  ArrowRight,
  LucideIcon,
} from 'lucide-react';
import { cn } from '@/lib/utils';
import { getServices, type Service } from '@/api/servicesApi';

// Helper function to map icon names to icon components
const getIconComponent = (iconName: string): LucideIcon => {
  const iconMap: Record<string, LucideIcon> = {
    Wrench,
    Monitor,
    Cpu,
    Truck,
    HardDrive,
    Network,
  };
  return iconMap[iconName] || Wrench;
};

// Helper function to map color names to CSS classes
const getColorClasses = (color: string) => {
  const colorMap: Record<string, { text: string; bg: string; border: string }> = {
    blue: {
      text: 'text-blue-600',
      bg: 'bg-blue-50 group-hover:bg-blue-600',
      border: 'group-hover:border-blue-100',
    },
    emerald: {
      text: 'text-emerald-600',
      bg: 'bg-emerald-50 group-hover:bg-emerald-600',
      border: 'group-hover:border-emerald-100',
    },
    purple: {
      text: 'text-purple-600',
      bg: 'bg-purple-50 group-hover:bg-purple-600',
      border: 'group-hover:border-purple-100',
    },
    orange: {
      text: 'text-orange-600',
      bg: 'bg-orange-50 group-hover:bg-orange-600',
      border: 'group-hover:border-orange-100',
    },
    rose: {
      text: 'text-rose-600',
      bg: 'bg-rose-50 group-hover:bg-rose-600',
      border: 'group-hover:border-rose-100',
    },
    cyan: {
      text: 'text-cyan-600',
      bg: 'bg-cyan-50 group-hover:bg-cyan-600',
      border: 'group-hover:border-cyan-100',
    },
  };
  return colorMap[color] || colorMap.blue;
};

interface ServicesHighlightProps {
  data?: {
    badge?: string;
    title?: string;
    description?: string;
  } | null;
}

export function ServicesHighlight({ data }: ServicesHighlightProps) {
  const [services, setServices] = useState<Service[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchServices = async () => {
      setLoading(true);
      const { data, error } = await getServices();
      if (data && !error) {
        // Filter enabled services, sort by order, and limit to first 6
        const enabledServices = data
          .filter(s => s.enabled)
          .sort((a, b) => a.order - b.order)
          .slice(0, 6);
        setServices(enabledServices);
      }
      setLoading(false);
    };
    fetchServices();
  }, []);

  if (data === null) return null;

  if (loading) {
    return (
      <section className="py-16 bg-white overflow-hidden">
        <div className="container mx-auto px-4">
          <div className="flex items-center justify-center min-h-[400px]">
            <div className="text-center">
              <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto"></div>
              <p className="mt-4 text-slate-600">Loading services...</p>
            </div>
          </div>
        </div>
      </section>
    );
  }

  return (
    <section className="py-16 lg:py-24 relative overflow-hidden">
      {/* Background Grid Pattern */}
      <div className="absolute inset-0 -z-10 bg-[linear-gradient(to_right,#80808008_1px,transparent_1px),linear-gradient(to_bottom,#80808008_1px,transparent_1px)] bg-[size:32px_32px]"></div>

      <div className="container mx-auto px-4">
        {/* Section Header */}
        <div className="text-center max-w-2xl mx-auto mb-16">
          <div className="inline-flex items-center rounded-full border border-primary/20 bg-white px-3 py-1 text-sm font-medium text-primary shadow-sm mb-6">
            {data?.badge || 'Reliable IT Support'}
          </div>

          <h2 className="font-display text-3xl md:text-5xl font-bold text-slate-900 mb-6 tracking-tight">
            {data?.title || 'Stop Worrying About Your Tech'}
          </h2>
          <p className="text-slate-600 text-lg leading-relaxed">
            {data?.description || 'From emergency repairs to proactive maintenance, we provide the expert solutions you need to stay productive and stress-free.'}
          </p>
        </div>

        {/* Services Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8">
          {services.map((service) => {
            const IconComponent = getIconComponent(service.icon);
            const colors = getColorClasses(service.color);

            return (
              <Link
                key={service.id}
                to={`/service/${service.id}`}
                className={cn(
                  'group relative overflow-hidden bg-white rounded-2xl border border-slate-200',
                  'hover:shadow-xl hover:shadow-slate-200/50 hover:-translate-y-1',
                  'transition-all duration-300 ease-out flex flex-col',
                  colors.border
                )}
              >
                {/* Service Image Container */}
                <div className="relative h-48 overflow-hidden bg-slate-100">
                  <img
                    src={service.image || `https://images.unsplash.com/photo-1518770660439-4636190af475?auto=format&fit=crop&q=80&w=800`}
                    alt={service.title}
                    loading="lazy"
                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent opacity-60"></div>

                  {/* Floating Icon */}
                  <div
                    className={cn(
                      'absolute bottom-4 left-4 h-12 w-12 rounded-xl flex items-center justify-center transition-colors duration-300 backdrop-blur-md border border-white/20',
                      colors.bg.replace('group-hover:', '') // Remove group-hover for default state
                    )}
                  >
                    <IconComponent
                      className={cn(
                        'h-6 w-6 transition-colors duration-300 text-white'
                      )}
                    />
                  </div>
                </div>

                {/* Text Content */}
                <div className="p-6 flex flex-col flex-1">
                  <h3 className="font-display text-xl font-bold text-slate-900 mb-3 group-hover:text-primary transition-colors">
                    {service.title}
                  </h3>

                  <p className="text-slate-500 mb-6 leading-relaxed flex-1">
                    {service.description}
                  </p>

                  {/* Call to Action with Slide Animation */}
                  <div className="flex items-center text-sm font-semibold text-primary pt-4 border-t border-slate-50">
                    <span className="relative after:content-[''] after:absolute after:bottom-0 after:left-0 after:w-0 after:h-px after:bg-primary after:transition-all after:duration-300 group-hover:after:w-full">
                      View More
                    </span>
                    <ArrowRight className="ml-2 h-4 w-4 transition-transform duration-300 group-hover:translate-x-1" />
                  </div>
                </div>
              </Link>
            );
          })}
        </div>
      </div>
    </section>
  );
}
