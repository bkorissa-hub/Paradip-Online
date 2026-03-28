import { useState, useEffect } from 'react';
import { Helmet } from 'react-helmet-async';
import { useParams, Link } from 'react-router-dom';
import { getService, type Service } from '@/api/servicesApi';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import {
    Phone,
    ArrowLeft,
    CheckCircle2,
    Loader2,
    MessageSquare,
    Clock,
    ShieldCheck,
    Zap,
    ChevronRight
} from 'lucide-react';
import { cn, getImageUrl } from '@/lib/utils';
import { FaWhatsapp } from 'react-icons/fa';
import * as Icons from 'lucide-react';
import { useSettings } from '@/contexts/SettingsContext';

const ServiceDetail = () => {
    const { settings } = useSettings();
    const { id } = useParams();
    const [service, setService] = useState<Service | null>(null);
    const [loading, setLoading] = useState(true);

    const contact = settings?.contactDefaults || { salesPhone: "+91-9583839432" };
    const salesPhonePlain = contact.salesPhone.replace(/[\s-]/g, '').replace('+', '');

    useEffect(() => {
        if (id) {
            loadService(id);
        }
    }, [id]);

    const loadService = async (serviceId: string) => {
        setLoading(true);
        const { data } = await getService(serviceId);
        setService(data);
        setLoading(false);
    };

    if (loading) {
        return (
            <div className="flex items-center justify-center min-h-screen">
                <Loader2 className="h-8 w-8 animate-spin text-primary" />
            </div>
        );
    }

    if (!service) {
        return (
            <div className="container mx-auto px-4 py-20 text-center">
                <h2 className="text-2xl font-bold mb-4">Service not found</h2>
                <Button asChild>
                    <Link to="/services">Back to Services</Link>
                </Button>
            </div>
        );
    }

    const IconComponent = (Icons as any)[service.icon] || Icons.Wrench;

    return (
        <div className="min-h-screen bg-white">
            <Helmet>
                <title>{service.title} | Paradip Online</title>
                <meta name="description" content={service.description || `Professional ${service.title} in Paradip by certified experts. Fast and reliable.`} />
                <link rel="canonical" href={`https://paradiponline.com/service/${service.id}`} />
                <script type="application/ld+json">
{JSON.stringify({
  "@context": "https://schema.org",
  "@type": "Service",
  "name": service.title,
  "description": service.description || `Professional ${service.title} in Paradip by certified experts.`,
  "provider": {
    "@type": "LocalBusiness",
    "name": "Paradip Online"
  },
  "areaServed": {
    "@type": "City",
    "name": "Paradip"
  },
  "offers": {
    "@type": "Offer",
    "priceSpecification": {
      "@type": "UnitPriceSpecification",
      "priceType": "https://schema.org/Minimum",
      "priceCurrency": "INR"
    }
  }
})}
                </script>
            </Helmet>
            {/* Breadcrumb / Back */}
            <div className="bg-slate-50 border-b border-slate-100">
                <div className="container mx-auto px-4 py-4">
                    <nav className="flex items-center text-sm text-slate-500">
                        <Link to="/services" className="hover:text-primary transition-colors flex items-center">
                            Services
                        </Link>
                        <ChevronRight className="h-4 w-4 mx-2 text-slate-300" />
                        <span className="text-slate-900 font-medium truncate">{service.title}</span>
                    </nav>
                </div>
            </div>

            {/* Hero Section */}
            <section className="relative py-12 lg:py-20 overflow-hidden">
                <div className="container mx-auto px-4">
                    <div className="grid lg:grid-cols-2 gap-12 lg:gap-20 items-center">
                        {/* Content side */}
                        <div className="order-2 lg:order-1">
                            {service.popular && (
                                <Badge className="mb-4 bg-blue-100 text-blue-700 hover:bg-blue-100 border-none px-3 py-1">
                                    Most Popular Service
                                </Badge>
                            )}
                            <h1 className="text-4xl lg:text-5xl font-display font-bold text-slate-900 mb-6 leading-tight">
                                {service.title}
                            </h1>
                            <p className="text-xl text-slate-600 mb-8 leading-relaxed">
                                {service.description}
                            </p>

                            <div className="flex flex-wrap gap-4 mb-10">
                                <div className="flex items-center gap-2 px-4 py-2 bg-slate-50 rounded-full border border-slate-100">
                                    <Clock className="h-4 w-4 text-blue-600" />
                                    <span className="text-sm font-medium text-slate-700">Quick Turnaround</span>
                                </div>
                                <div className="flex items-center gap-2 px-4 py-2 bg-slate-50 rounded-full border border-slate-100">
                                    <ShieldCheck className="h-4 w-4 text-emerald-600" />
                                    <span className="text-sm font-medium text-slate-700">Certified Experts</span>
                                </div>
                                <div className="flex items-center gap-2 px-4 py-2 bg-slate-50 rounded-full border border-slate-100">
                                    <Zap className="h-4 w-4 text-orange-500" />
                                    <span className="text-sm font-medium text-slate-700">{service.price}</span>
                                </div>
                            </div>

                             <div className="flex flex-col sm:flex-row gap-4">
                                <Button asChild size="lg" className="h-14 px-8 text-base bg-blue-600 hover:bg-blue-700 text-white shadow-lg shadow-blue-200">
                                    <a href={`https://wa.me/91${salesPhonePlain}?text=I am interested in ${service.title}`}>
                                        <FaWhatsapp className="mr-2 h-5 w-5" />
                                        Book on WhatsApp
                                    </a>
                                </Button>
                                <Button asChild variant="outline" size="lg" className="h-14 px-8 text-base border-slate-200 hover:bg-slate-50">
                                    <a href={`tel:${salesPhonePlain}`}>
                                        <Phone className="mr-2 h-5 w-5" />
                                        Call for Inquiry
                                    </a>
                                </Button>
                            </div>
                        </div>

                        {/* Image side */}
                        <div className="order-1 lg:order-2">
                            <div className="relative group">
                                <div className="absolute -inset-4 bg-gradient-to-tr from-blue-600 to-cyan-500 rounded-[2rem] opacity-10 blur-2xl group-hover:opacity-20 transition-opacity"></div>
                                <div className="relative rounded-3xl overflow-hidden border-8 border-white shadow-2xl bg-slate-100 aspect-[4/3]">
                                    <img
                                        src={service.image ? getImageUrl(service.image) : `https://images.unsplash.com/photo-1518770660439-4636190af475?auto=format&fit=crop&q=80&w=1200`}
                                        alt={service.title}
                                        className="w-full h-full object-cover"
                                    />
                                    <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent"></div>

                                    {/* Floating Icon Overlay */}
                                    <div className="absolute bottom-6 left-6 h-20 w-20 rounded-2xl bg-white/90 backdrop-blur-md flex items-center justify-center shadow-xl border border-white/50">
                                        <IconComponent className="h-10 w-10 text-blue-600" />
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* Detailed Description Section */}
            <section className="py-20 bg-slate-50">
                <div className="container mx-auto px-4">
                    <div className="max-w-4xl mx-auto">
                        <div className="bg-white rounded-3xl p-8 lg:p-12 shadow-sm border border-slate-100">
                            <h2 className="text-3xl font-bold text-slate-900 mb-8 border-b border-slate-100 pb-6">
                                Service Overview
                            </h2>

                            <div className="prose prose-slate prose-lg max-w-none text-slate-600 mb-12 leading-relaxed">
                                {service.detailedDescription ? (
                                    <div dangerouslySetInnerHTML={{ __html: service.detailedDescription.replace(/\n/g, '<br />') }} />
                                ) : (
                                    <p>Our professional {service.title} service is designed to provide you with the most reliable and efficient solutions in the industry. We use state-of-the-art tools and follow best practices to ensure your technology needs are met with precision and care.</p>
                                )}
                            </div>

                            <div className="grid md:grid-cols-2 gap-8">
                                <div>
                                    <h3 className="text-xl font-bold text-slate-900 mb-6 flex items-center gap-2">
                                        <CheckCircle2 className="h-5 w-5 text-emerald-500" />
                                        What's Included
                                    </h3>
                                    <ul className="space-y-4">
                                        {service.features.map((feature, idx) => (
                                            <li key={idx} className="flex items-start gap-3 text-slate-600">
                                                <div className="h-2 w-2 rounded-full bg-blue-500 mt-2 shrink-0" />
                                                <span>{feature}</span>
                                            </li>
                                        ))}
                                    </ul>
                                </div>

                                <div className="bg-blue-600 rounded-2xl p-8 text-white">
                                    <h3 className="text-xl font-bold mb-4">Need Help Fast?</h3>
                                    <p className="text-blue-100 mb-6">Our technicians are ready to assist you. Get a free consultation today.</p>
                                    <Button asChild className="w-full bg-white text-blue-600 hover:bg-blue-50 shadow-lg">
                                        <a href={`https://wa.me/91${salesPhonePlain}`}>
                                            Get a Quote
                                        </a>
                                    </Button>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* SEO Section / Bottom CTA */}
            <section className="py-20">
                <div className="container mx-auto px-4 text-center">
                    <h2 className="text-2xl font-bold text-slate-900 mb-4">
                        Reliable {service.title} in Odisha
                    </h2>
                    <p className="text-slate-500 mb-10 max-w-2xl mx-auto">
                        We provide professional technology services across Odisha, ensuring your devices and networks run smoothly at all times.
                    </p>
                    <div className="flex items-center justify-center gap-8 opacity-50 grayscale hover:grayscale-0 transition-all duration-500">
                        {/* Placeholders for partner/brand logos */}
                        <div className="h-8 w-24 bg-slate-300 rounded-md"></div>
                        <div className="h-8 w-24 bg-slate-300 rounded-md"></div>
                        <div className="h-8 w-24 bg-slate-300 rounded-md"></div>
                        <div className="h-8 w-24 bg-slate-300 rounded-md"></div>
                    </div>
                </div>
            </section>
        </div>
    );
};

export default ServiceDetail;
