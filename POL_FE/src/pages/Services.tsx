import { useState, useEffect } from 'react';
import { Helmet } from 'react-helmet-async';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import {
  Wrench,
  Monitor,
  Cpu,
  Truck,
  HardDrive,
  Network,
  Shield,
  Zap,
  Clock,
  CheckCircle2,
  ArrowRight,
  Phone,
  Sparkles,
  LucideIcon,
  Server,
  Globe,
  Compass,
  MessageSquare
} from 'lucide-react';
import { cn, getImageUrl } from '@/lib/utils';
import { FaWhatsapp } from 'react-icons/fa';
import { getServices, type Service } from '@/api/servicesApi';
import { pagesApi, Page } from "@/api/pagesApi";
import { useSettings } from '@/contexts/SettingsContext';

// Helper function to map icon names to icon components
const getIconComponent = (iconName: string): LucideIcon => {
  const iconMap: Record<string, LucideIcon> = {
    Wrench,
    Monitor,
    Cpu,
    Truck,
    HardDrive,
    Network,
    Zap,
    Server,
    Globe,
    Compass
  };
  return iconMap[iconName] || Wrench;
};



const whyChooseUs = [
  {
    icon: Shield,
    title: 'Certified Experts',
    description: 'Our team consists of certified hardware engineers.',
  },
  {
    icon: Zap,
    title: 'Express Service',
    description: 'Same-day diagnosis and 24-hour turnaround.',
  },
  {
    icon: Clock,
    title: 'Open 7 Days',
    description: 'We are available weekends for emergency repairs.',
  },
  {
    icon: CheckCircle2,
    title: '90-Day Warranty',
    description: 'We stand behind every repair we perform.',
  },
];

const Services = () => {
  const { settings } = useSettings();
  const [services, setServices] = useState<Service[]>([]);
  const [pageData, setPageData] = useState<Page | null>(null);
  const [loading, setLoading] = useState(true);

  const contact = settings?.contactDefaults || { salesPhone: "+91-9583839432" };
  const salesPhonePlain = contact.salesPhone.replace(/[\s-]/g, '');

  useEffect(() => {
    const loadContent = async () => {
      setLoading(true);
      try {
        const [{ data: servicesData }, { data: cmsData }] = await Promise.all([
          getServices(),
          pagesApi.getPage('services')
        ]);

        if (servicesData) {
          const enabledServices = servicesData.filter(s => s.enabled).sort((a, b) => a.order - b.order);
          setServices(enabledServices);
        }

        if (cmsData) {
          setPageData(cmsData);
        }
      } catch (error) {
        console.error("Error loading services/CMS:", error);
      } finally {
        setLoading(false);
      }
    };
    loadContent();
  }, []);

  const getSection = (id: string) => pageData?.sections.find(s => s.id === id);
  const heroSection = getSection('hero');

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto"></div>
          <p className="mt-4 text-slate-600">Loading services...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-slate-50 min-h-screen">
      <Helmet>
        <title>{pageData?.sections.find(s => s.id === 'seo')?.content?.metaTitle || "Professional IT Services in Paradip"}</title>
        <meta name="description" content={pageData?.sections.find(s => s.id === 'seo')?.content?.metaDescription || "Expert IT and repair services in Paradip."} />
        <link rel="canonical" href="https://paradiponline.com/services" />
        <script type="application/ld+json">
{JSON.stringify({
  "@context": "https://schema.org",
  "@type": "Service",
  "name": "IT Repair & Maintenance Services",
  "provider": {
    "@type": "LocalBusiness",
    "name": "Paradip Online"
  },
  "areaServed": {
    "@type": "City",
    "name": "Paradip"
  },
  "serviceType": "Computer Repair, Laptop Repair, CCTV Installation, IT AMC"
})}
        </script>
      </Helmet>
      {/* 1. Hero Section - Simplified & Professional */}
      <section className="relative py-20 lg:py-32 bg-slate-900 border-b border-white/5 overflow-hidden">
        {/* Subtle Background Pattern */}
        <div className="absolute inset-0 opacity-[0.03] pointer-events-none" 
             style={{ backgroundImage: 'radial-gradient(#fff 1px, transparent 1px)', backgroundSize: '30px 30px' }} />
        
        <div className="container mx-auto px-4 text-center relative z-10">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-500/10 border border-blue-500/20 text-blue-400 text-xs font-semibold mb-6 uppercase tracking-wider">
            <Sparkles className="h-3.5 w-3.5" />
            <span>{heroSection?.content.badge || "Professional IT Solutions"}</span>
          </div>
          <h1 className="font-display text-4xl md:text-5xl lg:text-7xl font-bold text-white mb-6 tracking-tight">
            {heroSection?.content.title || "Expert Repairs & Custom Solutions"}
          </h1>
          <p className="text-slate-400 text-lg md:text-xl max-w-2xl mx-auto leading-relaxed font-medium">
            {heroSection?.content.subtitle || "From cracked screens to complex networking, we deliver technology services that you can rely on. Fast, affordable, and guaranteed."}
          </p>
        </div>
      </section>

      {/* 2. Services Grid */}
      <section className="py-20 -mt-20 relative z-20">
        <div className="container mx-auto px-4 mt-20">
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {services.map((service) => {
              const IconComponent = getIconComponent(service.icon);


              return (
                <div
                  key={service.id}
                  className={cn(
                    'group relative flex flex-col bg-white rounded-2xl border border-slate-200 shadow-xl shadow-slate-200/50 overflow-hidden',
                    'hover:shadow-2xl hover:shadow-slate-300/50 hover:-translate-y-1 transition-all duration-300 ease-out',
                    service.popular && 'ring-2 ring-blue-500 ring-offset-2'
                  )}
                >
                  {/* Service Image */}
                  <div className="relative h-56 overflow-hidden bg-slate-100">
                    <img
                      src={service.image ? getImageUrl(service.image) : `https://images.unsplash.com/photo-1588702547319-b5cba599b703?auto=format&fit=crop&q=80&w=800`}
                      alt={service.title}
                      loading="lazy"
                      className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-slate-900/80 via-transparent to-transparent"></div>

                    {/* Floating Badges */}
                    <div className="absolute top-4 right-4 bg-white/95 backdrop-blur-sm px-3 py-1 rounded-full border border-slate-200 shadow-sm">
                      <span className="text-xs font-bold text-slate-700">
                        {service.price}
                      </span>
                    </div>

                    {service.popular && (
                      <div className="absolute top-4 left-4 bg-blue-600 text-white text-[10px] font-bold uppercase tracking-wider px-3 py-1 rounded-full shadow-lg">
                        Most Popular
                      </div>
                    )}
                  </div>

                  {/* Icon */}
                  <div
                    className={cn(
                      'absolute top-48 left-6 h-14 w-14 rounded-2xl flex items-center justify-center shadow-lg border-2 border-white transition-transform group-hover:scale-110 duration-300 z-10',
                      service.color ? `bg-${service.color}-50` : 'bg-blue-50'
                    )}
                  >
                    <IconComponent className={cn('h-7 w-7', service.color ? `text-${service.color}-600` : 'text-blue-600')} strokeWidth={2.5} />
                  </div>

                  <div className="p-8 pt-10 flex flex-col flex-1">
                    <h3 className="font-display text-xl font-bold text-slate-900 mb-3 group-hover:text-blue-600 transition-colors">
                      {service.title}
                    </h3>

                    <p className="text-slate-500 mb-6 leading-relaxed text-sm flex-1">
                      {service.description}
                    </p>

                    <div className="mt-auto">
                      <div className="w-full h-px bg-slate-100 mb-6" />
                      <ul className="grid grid-cols-1 gap-2 mb-8">
                        {(service.features || []).slice(0, 4).map((feature, idx) => (
                          <li
                            key={idx}
                            className="flex items-center gap-2 text-xs font-medium text-slate-600"
                          >
                            <CheckCircle2 className="h-3.5 w-3.5 text-emerald-500 shrink-0" />
                            <span className="truncate">{feature}</span>
                          </li>
                        ))}
                      </ul>

                      <Button
                        variant="default"
                        className="w-full justify-between hover:bg-blue-700 bg-blue-600 text-white group/btn h-12"
                        asChild
                      >
                        <Link to={`/service/${service.id}`}>
                          View More
                          <ArrowRight className="h-4 w-4 text-white/70 group-hover/btn:translate-x-1 group-hover/btn:text-white transition-all" />
                        </Link>
                      </Button>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* 3. Why Choose Us */}
      <section className="py-20 bg-white">
        <div className="container mx-auto px-4">
          <div className="text-center max-w-2xl mx-auto mb-16">
            <h2 className="font-display text-3xl md:text-4xl font-bold text-slate-900 mb-4">
              The Paradip Online Difference
            </h2>
            <p className="text-slate-500 text-lg">
              We don't just fix computers; we build trust. Here is why thousands
              of locals choose us.
            </p>
          </div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-8">
            {whyChooseUs.map((item) => (
              <div
                key={item.title}
                className="text-center p-6 rounded-2xl bg-slate-50 border border-slate-100 transition-all duration-300"
              >
                <div className="h-12 w-12 rounded-full bg-blue-100 flex items-center justify-center mx-auto mb-4 text-blue-600">
                  <item.icon className="h-6 w-6" />
                </div>
                <h3 className="font-bold text-slate-900 mb-2">{item.title}</h3>
                <p className="text-sm text-slate-500 leading-relaxed">
                  {item.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 4. CTA Section */}
      <section className="py-20 px-4">
        <div className="container mx-auto">
          <div className="relative rounded-3xl bg-slate-900 px-6 py-16 sm:px-12 sm:py-20 md:py-24 overflow-hidden text-center shadow-2xl">
            <div className="absolute top-0 left-0 w-full h-full opacity-30">
              <div className="absolute right-0 top-0 -translate-y-12 translate-x-12 w-64 h-64 bg-blue-500 rounded-full blur-[80px]"></div>
              <div className="absolute left-0 bottom-0 translate-y-12 -translate-x-12 w-64 h-64 bg-purple-500 rounded-full blur-[80px]"></div>
            </div>

            <div className="relative z-10 max-w-2xl mx-auto">
              <h2 className="font-display text-3xl md:text-4xl font-bold text-white mb-6">
                Computer Acting Up?
              </h2>
              <p className="text-slate-300 text-lg mb-10 leading-relaxed">
                Don't let tech issues slow you down. Get a free quote today and
                let our experts handle the rest.
              </p>

              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Button
                  size="lg"
                  variant="outline"
                  className="border-white/10 bg-white/5 text-white hover:bg-white hover:text-slate-900 h-12 px-8 backdrop-blur-sm"
                  asChild
                >
                  <a href={`tel:${salesPhonePlain}`}>
                    <Phone className="mr-2 h-5 w-5" />
                    Call {contact.salesPhone}
                  </a>
                </Button>
                <Button
                  size="lg"
                  variant="outline"
                  className="border-white/10 bg-white/5 text-white hover:bg-white hover:text-slate-900 h-12 px-8 backdrop-blur-sm"
                  asChild
                >
                  <a
                    href={`https://wa.me/91${salesPhonePlain.replace('+', '')}`}
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    <FaWhatsapp className="mr-2 h-5 w-5" />
                    WhatsApp Chat
                  </a>
                </Button>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Services;
