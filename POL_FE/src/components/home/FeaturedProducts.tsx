import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { ArrowRight, Phone, Heart, ShoppingBag, Loader2 } from 'lucide-react';
import { cn } from '@/lib/utils';
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from '../ui/tooltip';
import { FaWhatsapp } from 'react-icons/fa';
import { getProducts } from '@/api/productsApi';
import { Product } from '@/data/products';
import { useSettings } from '@/contexts/SettingsContext';

interface FeaturedProductsProps {
  data?: {
    badge?: string;
    title?: string;
    description?: string;
  } | null;
}

export function FeaturedProducts({ data }: FeaturedProductsProps) {
  const { settings } = useSettings();
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);

  const contact = settings?.contactDefaults || { salesPhone: "+91-9583839432" };
  const salesPhonePlain = contact.salesPhone.replace(/[\s-]/g, '').replace('+', '');

  useEffect(() => {
    loadProducts();
  }, []);

  const loadProducts = async () => {
    setLoading(true);
    const { data } = await getProducts();
    if (data) {
      setProducts(data.slice(0, 4));
    }
    setLoading(false);
  };

  if (data === null) return null;

  if (loading) {
    return (
      <section className="py-16 lg:py-24 relative">
        <div className="container mx-auto px-4">
          <div className="flex items-center justify-center h-64">
            <Loader2 className="h-8 w-8 animate-spin text-primary" />
          </div>
        </div>
      </section>
    );
  }

  return (
    <section className="py-12 lg:py-16 relative">
      <div className="absolute inset-0 -z-10 bg-[linear-gradient(to_right,#80808008_1px,transparent_1px),linear-gradient(to_bottom,#80808008_1px,transparent_1px)] bg-[size:32px_32px]"></div>
      <div className="container mx-auto px-4">
        <div className="flex flex-col md:flex-row md:items-end md:justify-between mb-12 gap-6">
          <div className="max-w-2xl">
            <div className="inline-flex items-center rounded-full border border-primary/20 bg-white px-3 py-1 text-sm font-medium text-primary shadow-sm mb-4">
              <ShoppingBag className="h-3.5 w-3.5 mr-2" />
              {data?.badge || 'New Arrivals'}
            </div>
            <h2 className="font-display text-3xl md:text-4xl lg:text-5xl font-bold text-slate-900 mb-4 tracking-tight">
              {data?.title || 'Upgrade Your Setup'}
            </h2>
            <p className="text-slate-600 text-lg leading-relaxed">
              {data?.description || 'Hand-picked electronics and accessories, tested by our experts and ready for delivery.'}
            </p>
          </div>
          <Button asChild className="mt-4 md:mt-0 bg-blue-600 text-white hover:bg-blue-700 border-0 shadow-md transition-all duration-300 group">
            <Link to="/sales" className="flex items-center">
              View All Products
              <ArrowRight className="ml-2 h-4 w-4 group-hover:translate-x-1 transition-transform" />
            </Link>
          </Button>
        </div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6 p-4">
          {products.map((product, index) => (
            <div
              key={product.id}
              className={cn(
                'group relative bg-card rounded-2xl border border-border/50 overflow-hidden',
                'shadow-sm hover:shadow-xl hover:shadow-primary/5 hover:border-primary/20',
                'transition-all duration-300 ease-out flex flex-col'
              )}
              style={{ animationDelay: `${index * 75}ms` }}
            >
              <div className="relative aspect-[4/5] bg-secondary/30 overflow-hidden">
                <Link to={`/product/${product.id}`}>
                  <img
                    src={product.images?.[0] || product.image || 'https://via.placeholder.com/400'}
                    alt={product.name}
                    loading="lazy"
                    className="w-full h-full object-cover mix-blend-multiply opacity-95 group-hover:scale-105 group-hover:opacity-100 transition-all duration-500 ease-in-out cursor-pointer"
                  />
                </Link>

                {product.badge && (
                  <div className="absolute top-3 left-3">
                    <Badge
                      variant="secondary"
                      className={cn(
                        'backdrop-blur-md bg-white/90 shadow-sm border-0 px-3 py-1 text-xs font-semibold tracking-wide',
                        product.badge === 'Sale' ? 'text-destructive' : 'text-primary'
                      )}
                    >
                      {product.badge}
                    </Badge>
                  </div>
                )}

                <div className="absolute top-3 right-3 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                  <Button size="icon" variant="secondary" className="h-8 w-8 rounded-full shadow-md bg-white/90 hover:bg-white">
                    <Heart className="h-4 w-4 text-muted-foreground hover:text-red-500 transition-colors" />
                  </Button>
                </div>
              </div>

              <div className="p-5 flex flex-col flex-1">
                <div className="mb-3">
                  <span className="text-[10px] font-bold text-primary/80 uppercase tracking-widest bg-primary/10 px-2 py-0.5 rounded-sm">
                    {product.category}
                  </span>

                  <h3 className="font-semibold text-base leading-tight text-foreground line-clamp-2 min-h-[2.5rem] mt-2">
                    <Link to={`/product/${product.id}`} className="group-hover:text-primary transition-colors">
                      {product.name}
                    </Link>
                  </h3>
                </div>

                <div className="mt-auto pt-4 border-t border-border/50">
                  <div className="flex items-baseline gap-2 mb-4">
                    <span className="font-display font-bold text-xl text-foreground">
                      ₹{product.price.toLocaleString()}
                    </span>
                    {product.originalPrice && (
                      <span className="text-sm text-muted-foreground/60 line-through">
                        ₹{product.originalPrice.toLocaleString()}
                      </span>
                    )}
                  </div>

                  <div className="flex items-center gap-2">
                    <Button className="flex-1 shadow-md shadow-primary/20" asChild>
                      <a href={`https://wa.me/91${salesPhonePlain}`} target="_blank" rel="noopener noreferrer">
                        <FaWhatsapp className="h-4 w-4" />
                        WhatsApp
                      </a>
                    </Button>

                    <TooltipProvider delayDuration={0}>
                      <Tooltip>
                        <TooltipTrigger asChild>
                          <Button size="icon" variant="outline" className="border-primary/20 hover:bg-primary/5" asChild>
                            <a href={`tel:${salesPhonePlain}`}>
                              <Phone className="h-4 w-4" />
                            </a>
                          </Button>
                        </TooltipTrigger>
                        <TooltipContent><p>Call Support</p></TooltipContent>
                      </Tooltip>
                    </TooltipProvider>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
