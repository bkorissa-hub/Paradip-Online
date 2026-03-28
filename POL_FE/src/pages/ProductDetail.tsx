import { useState, useEffect } from 'react';
import { Helmet } from 'react-helmet-async';
import { useParams, Link } from 'react-router-dom';
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';
import { getProductById } from '@/api/productsApi';
import { Product } from '@/data/products';
import { Button } from '@/components/ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Badge } from '@/components/ui/badge';
import { Phone, Check, Truck, ShieldCheck, Loader2, ChevronLeft, ChevronRight, Zap, ArrowLeft } from 'lucide-react';
import { cn, getImageUrl } from '@/lib/utils';
import { FaWhatsapp } from 'react-icons/fa';
import { useSettings } from '@/contexts/SettingsContext';

const ProductDetail = () => {
  const { settings } = useSettings();
  const { id } = useParams();
  const [product, setProduct] = useState<Product | null>(null);
  const [loading, setLoading] = useState(true);

  const contact = settings?.contactDefaults || { salesPhone: "+91-9583839432" };
  const salesPhonePlain = contact.salesPhone.replace(/[\s-]/g, '').replace('+', '');
  const [selectedImageIndex, setSelectedImageIndex] = useState(0);

  useEffect(() => {
    if (id) {
      loadProduct(id);
    }
  }, [id]);

  const loadProduct = async (productId: string) => {
    setLoading(true);
    const { data } = await getProductById(productId);
    setProduct(data);
    setSelectedImageIndex(0);
    setLoading(false);
  };

  // Get all images from the product
  const getProductImages = (product: Product): string[] => {
    if (product.images && product.images.length > 0) {
      return product.images;
    }
    // Fallback to single image for backward compatibility
    if (product.image) {
      return [product.image];
    }
    return ['https://via.placeholder.com/800'];
  };

  const handlePreviousImage = () => {
    if (!product) return;
    const images = getProductImages(product);
    setSelectedImageIndex((prev) => (prev === 0 ? images.length - 1 : prev - 1));
  };

  const handleNextImage = () => {
    if (!product) return;
    const images = getProductImages(product);
    setSelectedImageIndex((prev) => (prev === images.length - 1 ? 0 : prev + 1));
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <Loader2 className="h-8 w-8 animate-spin text-primary" />
      </div>
    );
  }

  if (!product) {
    return (
      <div className="container mx-auto px-4 py-20 text-center">
        <h2 className="text-2xl font-bold mb-4">Product not found</h2>
        <Button asChild>
          <Link to="/sales">Back to Sales</Link>
        </Button>
      </div>
    );
  }

  const images = getProductImages(product);
  const hasMultipleImages = images.length > 1;

  return (
    <div className="min-h-screen bg-background pb-20">
      <Helmet>
        <title>{product.name} | Paradip Online</title>
        <meta name="description" content={product.description || `Buy ${product.name} at the best price in Paradip. Fast delivery and official warranty.`} />
        <link rel="canonical" href={`https://paradiponline.com/product/${product.id}`} />
        <script type="application/ld+json">
{JSON.stringify({
  "@context": "https://schema.org",
  "@type": "Product",
  "name": product.name,
  "image": images[0],
  "description": product.description || `Buy ${product.name} at the best price in Paradip.`,
  "sku": product.id,
  "offers": {
    "@type": "Offer",
    "url": `https://paradiponline.com/product/${product.id}`,
    "priceCurrency": "INR",
    "price": product.price,
    "itemCondition": "https://schema.org/NewCondition",
    "availability": product.inStock ? "https://schema.org/InStock" : "https://schema.org/OutOfStock",
    "seller": {
      "@type": "Organization",
      "name": "Paradip Online"
    }
  }
})}
        </script>
      </Helmet>
      <div className="bg-secondary/30 border-b border-border/50">
        <div className="container mx-auto px-4 py-4">
          <Link to="/sales" className="inline-flex items-center text-sm text-muted-foreground hover:text-primary transition-colors">
            <ArrowLeft className="h-4 w-4 mr-2" />
            Back to Products
          </Link>
        </div>
      </div>

      <div className="container mx-auto px-4 py-8 lg:py-12">
        {/* Top Fold: Gallery & Buy Box */}
        <div className="grid lg:grid-cols-12 gap-10 lg:gap-16 mb-16">
          {/* Left: Image Gallery (Span 7) */}
          <div className="lg:col-span-7 space-y-4">
            {/* Main Image */}
            <div className="relative aspect-square bg-white rounded-2xl border border-border overflow-hidden shadow-sm group">
              <img 
                src={getImageUrl(images[selectedImageIndex])} 
                alt={`${product.name} - Image ${selectedImageIndex + 1}`} 
                className="w-full h-full object-contain p-8 transition-transform duration-500" 
              />
              
              {/* Navigation Arrows */}
              {hasMultipleImages && (
                <>
                  <Button
                    variant="secondary"
                    size="icon"
                    className="absolute left-3 top-1/2 -translate-y-1/2 h-10 w-10 rounded-full shadow-md opacity-0 group-hover:opacity-100 transition-opacity bg-white/90 hover:bg-white"
                    onClick={handlePreviousImage}
                  >
                    <ChevronLeft className="h-5 w-5" />
                  </Button>
                  <Button
                    variant="secondary"
                    size="icon"
                    className="absolute right-3 top-1/2 -translate-y-1/2 h-10 w-10 rounded-full shadow-md opacity-0 group-hover:opacity-100 transition-opacity bg-white/90 hover:bg-white"
                    onClick={handleNextImage}
                  >
                    <ChevronRight className="h-5 w-5" />
                  </Button>
                </>
              )}
              
              {product.badge && (
                <div className="absolute top-4 left-4">
                  <Badge variant="secondary" className="px-3 py-1 font-semibold text-sm shadow-sm backdrop-blur-md bg-white/90">
                    {product.badge}
                  </Badge>
                </div>
              )}

              {/* Image Counter */}
              {hasMultipleImages && (
                <div className="absolute bottom-4 right-4 bg-black/60 text-white px-3 py-1.5 rounded-full text-sm font-medium backdrop-blur-sm">
                  {selectedImageIndex + 1} / {images.length}
                </div>
              )}
            </div>

            {/* Thumbnail Gallery */}
            {hasMultipleImages && (
              <div className="flex gap-2 overflow-x-auto pb-2">
                {images.map((img, index) => (
                  <button
                    key={index}
                    onClick={() => setSelectedImageIndex(index)}
                    className={cn(
                      "relative shrink-0 w-20 h-20 rounded-lg overflow-hidden border-2 transition-all",
                      selectedImageIndex === index 
                        ? "border-primary ring-2 ring-primary/20" 
                        : "border-border hover:border-primary/50"
                    )}
                  >
                    <img 
                      src={getImageUrl(img)} 
                      alt={`${product.name} thumbnail ${index + 1}`}
                      className="w-full h-full object-cover"
                    />
                  </button>
                ))}
              </div>
            )}
          </div>

          {/* Right: Sticky Buy Box & Quick Specs (Span 5) */}
          <div className="lg:col-span-5">
            <div className="sticky top-24">
              <div className="mb-3 text-primary font-bold text-sm uppercase tracking-wider">{product.category}</div>
              <h1 className="text-3xl md:text-5xl font-extrabold text-foreground mb-4 leading-tight tracking-tight">{product.name}</h1>

              <div className="flex items-center gap-4 mb-6">
                <div className="flex items-center gap-1.5 text-sm font-semibold px-4 py-2 rounded-full border bg-blue-50 text-blue-700 border-blue-200 shadow-sm">
                  <Check className="h-4 w-4" /> Check with Paradeep Online for availability
                </div>
              </div>

              <div className="flex flex-col mb-6 pb-6 border-b border-border">
                <div className="flex items-end gap-3">
                  <span className="text-xl font-medium text-slate-500 mb-1">Online Price:</span>
                  <div className="text-4xl lg:text-5xl font-black text-slate-900 tracking-tight flex items-baseline gap-1">
                    <span className="text-3xl">₹</span>
                    {product.price.toLocaleString('en-IN')}
                  </div>
                  {product.originalPrice && product.price > 0 && (
                    <>
                      <div className="text-xl text-muted-foreground line-through mb-2 font-medium">₹{product.originalPrice.toLocaleString()}</div>
                      <Badge variant="destructive" className="mb-2.5 ml-2 text-sm px-2">
                        {Math.round(((product.originalPrice - product.price) / product.originalPrice) * 100)}% OFF
                      </Badge>
                    </>
                  )}
                </div>
                <div className="text-sm font-bold text-green-600 mt-3 flex items-center">
                  <Zap className="h-4 w-4 mr-1.5" /> Call Paradeep Online for an even better local offer!
                </div>
              </div>

              {/* At A Glance Quick Specs */}
              {product.specs && product.specs.length > 0 && (
                <div className="mb-8 bg-slate-50/50 p-5 rounded-2xl border border-slate-100">
                  <h3 className="text-sm font-bold text-slate-900 uppercase tracking-wider mb-4 flex items-center">
                    <Zap className="h-4 w-4 text-amber-500 mr-2" />
                    Quick Glance
                  </h3>
                  <ul className="space-y-3">
                    {product.specs.slice(0, 4).map((spec, index) => (
                      <li key={index} className="flex items-start text-sm text-slate-700 font-medium">
                        <div className="h-2 w-2 rounded-full bg-blue-500 mt-1.5 mr-3 shrink-0" />
                        {spec}
                      </li>
                    ))}
                  </ul>
                  {product.specs.length > 4 && (
                    <p className="text-xs text-slate-400 mt-4 italic">See full specifications below.</p>
                  )}
                </div>
              )}

              {/* Action Buttons */}
              <div className="flex flex-col gap-3 mb-8">
                <Button asChild size="lg" className="w-full text-lg h-14 shadow-lg shadow-green-600/20 bg-green-600 hover:bg-green-700 text-white rounded-xl">
                  <a href={`https://wa.me/91${salesPhonePlain}`} target="_blank" rel="noopener noreferrer">
                    <FaWhatsapp className="mr-3 h-6 w-6" />
                    {product.price === 0 ? "Message Us For Quote" : "Buy via WhatsApp"}
                  </a>
                </Button>
                <Button asChild variant="outline" size="lg" className="w-full text-lg h-14 border-slate-300 hover:bg-slate-50 text-slate-700 rounded-xl">
                  <a href={`tel:${salesPhonePlain}`}>
                    <Phone className="mr-3 h-5 w-5" />
                    Call Expert for Details
                  </a>
                </Button>
              </div>

              {/* Trust Badges */}
              <div className="grid grid-cols-2 gap-4 text-sm font-medium text-slate-700 bg-blue-50/50 border border-blue-100/50 p-5 rounded-xl">
                <div className="flex items-center gap-3">
                  <Truck className="h-5 w-5 text-blue-600" />
                  <span>Free Local Delivery</span>
                </div>
                <div className="flex items-center gap-3">
                  <ShieldCheck className="h-5 w-5 text-blue-600" />
                  <span>Verified Warranty</span>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Fold: Deep Information Tabs */}
        <div className="mt-12 bg-white rounded-3xl border border-slate-200 shadow-sm overflow-hidden">
          <Tabs defaultValue="verdict" className="w-full">
            <div className="border-b border-slate-100 bg-slate-50/50 px-4 md:px-8 pt-4">
              <TabsList className="bg-transparent h-auto p-0 flex space-x-8">
                <TabsTrigger 
                  value="verdict" 
                  className="data-[state=active]:bg-transparent data-[state=active]:shadow-none data-[state=active]:border-b-2 data-[state=active]:border-blue-600 rounded-none pb-4 text-base font-semibold text-slate-500 data-[state=active]:text-slate-900"
                >
                  Paradeep Online Verdict
                </TabsTrigger>
                <TabsTrigger 
                  value="specs" 
                  className="data-[state=active]:bg-transparent data-[state=active]:shadow-none data-[state=active]:border-b-2 data-[state=active]:border-blue-600 rounded-none pb-4 text-base font-semibold text-slate-500 data-[state=active]:text-slate-900"
                >
                  Full Specifications
                </TabsTrigger>
                <TabsTrigger 
                  value="support" 
                  className="data-[state=active]:bg-transparent data-[state=active]:shadow-none data-[state=active]:border-b-2 data-[state=active]:border-blue-600 rounded-none pb-4 text-base font-semibold text-slate-500 data-[state=active]:text-slate-900 hidden sm:block"
                >
                  Service & Support
                </TabsTrigger>
              </TabsList>
            </div>

            <div className="p-6 md:p-10">
              <TabsContent value="verdict" className="mt-0">
                <div className="prose prose-lg prose-slate max-w-4xl prose-headings:font-display prose-headings:font-bold prose-p:leading-relaxed prose-a:text-blue-600 marker:text-blue-500">
                  <ReactMarkdown remarkPlugins={[remarkGfm]}>
                    {product.description}
                  </ReactMarkdown>
                </div>
              </TabsContent>

              <TabsContent value="specs" className="mt-0">
                <div className="max-w-4xl">
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between mb-8 gap-4">
                    <h3 className="text-2xl font-bold text-slate-900">Technical Specifications</h3>
                  </div>
                  
                  {product.specs && product.specs.length > 0 ? (
                    <div className="grid md:grid-cols-2 gap-4">
                      {product.specs.map((spec, index) => (
                        <div key={index} className="flex items-center gap-3 p-4 bg-slate-50 rounded-xl border border-slate-100 hover:border-slate-300 transition-colors">
                          <Check className="h-5 w-5 text-green-500 shrink-0" />
                          <span className="text-slate-700 font-medium">{spec}</span>
                        </div>
                      ))}
                    </div>
                  ) : (
                    <p className="text-slate-500">Full specifications are not available for this item.</p>
                  )}
                </div>
              </TabsContent>

              <TabsContent value="support" className="mt-0">
                <div className="max-w-3xl prose prose-slate">
                  <h3 className="text-2xl font-bold text-slate-900 mb-6">Local Paradip Guarantee</h3>
                  <div className="grid sm:grid-cols-2 gap-8">
                    <div>
                      <h4 className="flex items-center gap-2 text-lg font-bold text-slate-900"><ShieldCheck className="h-5 w-5 text-blue-600"/> Warranty Included</h4>
                      <p className="text-slate-600">All hardware purchased directly through Paradip Online is backed by official manufacturer warranties. We assist with all local RMAs so you don't have to ship anything back yourself.</p>
                    </div>
                    <div>
                      <h4 className="flex items-center gap-2 text-lg font-bold text-slate-900"><Truck className="h-5 w-5 text-blue-600"/> Hand Delivery</h4>
                      <p className="text-slate-600">Enjoy safe, fast, and free local delivery within the Paradip Port and Jagatsinghpur zones. Need setup? Our technicians will deliver and configure your new system on-site.</p>
                    </div>
                  </div>
                </div>
              </TabsContent>
            </div>
          </Tabs>
        </div>
      </div>
    </div>
  );
};

export default ProductDetail;
