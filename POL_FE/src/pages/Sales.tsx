import { useState, useEffect } from "react";
import { Helmet } from "react-helmet-async";
import { Link } from "react-router-dom";
import { getProducts } from "@/api/productsApi";
import { Product } from "@/data/products";
import { pagesApi, Page } from "@/api/pagesApi";

import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Checkbox } from "@/components/ui/checkbox";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Search,
  Filter,
  Phone,
  MessageCircle,
  Grid,
  List,
  SlidersHorizontal,
  Loader2
} from "lucide-react";
import { cn, getImageUrl } from "@/lib/utils";
import { useSettings } from "@/contexts/SettingsContext";

const categories = [
  { id: "all", name: "All Products" },
  { id: "laptops", name: "Laptops" },
  { id: "monitors", name: "Monitors" },
  { id: "cpu", name: "CPU" },
  { id: "graphics-card", name: "Graphics Card" },
  { id: "motherboard", name: "Motherboard" },
  { id: "keyboard", name: "Keyboard" },
  { id: "mouse", name: "Mouse" },
  { id: "accessories", name: "Accessories" },
  { id: "components", name: "Components" },
  { id: "networking", name: "Networking" },
  { id: "printers", name: "Printers" },
  { id: "Security", name: "Security" },
];

const Sales = () => {
  const { settings } = useSettings();
  const [products, setProducts] = useState<Product[]>([]);
  const [pageData, setPageData] = useState<Page | null>(null);
  const [loading, setLoading] = useState(true);

  const contact = settings?.contactDefaults || { salesPhone: "+91-9583839432" };
  const salesPhonePlain = contact.salesPhone.replace(/[\s-]/g, '').replace('+', '');
  const [selectedCategory, setSelectedCategory] = useState("all");
  const [searchQuery, setSearchQuery] = useState("");
  const [sortBy, setSortBy] = useState("featured");
  const [viewMode, setViewMode] = useState<"grid" | "list">("grid");
  const [selectedBrands, setSelectedBrands] = useState<string[]>([]);
  const [selectedPriceRange, setSelectedPriceRange] = useState<string>("all");

  const BRANDS = ["HP", "Lenovo", "Dell", "ASUS", "Acer", "Apple"];
  const PRICE_RANGES = [
    { id: "all", label: "Any Price" },
    { id: "under40", label: "Under ₹40,000" },
    { id: "40to80", label: "₹40,000 - ₹80,000" },
    { id: "above80", label: "Above ₹80,000" },
  ];

  useEffect(() => {
    const loadContent = async () => {
      setLoading(true);
      try {
        const [{ data: productsData }, { data: cmsData }] = await Promise.all([
          getProducts(),
          pagesApi.getPage('products')
        ]);

        if (productsData) setProducts(productsData);
        if (cmsData) {
          setPageData(cmsData);
        }
      } catch (error) {
        console.error("Error loading products/CMS:", error);
      } finally {
        setLoading(false);
      }
    };
    loadContent();
  }, []);

  const getSection = (id: string) => pageData?.sections.find(s => s.id === id);
  const heroSection = getSection('hero');

  const filteredProducts = products.filter((product) => {
    const matchesCategory = selectedCategory === "all" || product.category.toLowerCase() === selectedCategory.toLowerCase();
    const matchesSearch = product.name.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesBrand = selectedBrands.length === 0 || selectedBrands.some(brand => product.name.toLowerCase().includes(brand.toLowerCase()));
    
    let matchesPrice = true;
    if (selectedPriceRange === "under40") matchesPrice = product.price > 0 && product.price <= 40000;
    else if (selectedPriceRange === "40to80") matchesPrice = product.price > 40000 && product.price <= 80000;
    else if (selectedPriceRange === "above80") matchesPrice = product.price > 80000;

    return matchesCategory && matchesSearch && matchesBrand && matchesPrice;
  });

  const sortedProducts = [...filteredProducts].sort((a, b) => {
    switch (sortBy) {
      case "price-low":
        return a.price - b.price;
      case "price-high":
        return b.price - a.price;
      default:
        return 0;
    }
  });

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <Loader2 className="h-8 w-8 animate-spin text-primary" />
      </div>
    );
  }

  return (
    <>
      <Helmet>
        <title>{pageData?.sections.find(s => s.id === 'seo')?.content?.metaTitle || "Computer Shop in Paradip | Laptops & Accessories"}</title>
        <meta name="description" content={pageData?.sections.find(s => s.id === 'seo')?.content?.metaDescription || "Best computer shop in Paradip. Wide selection of laptops, desktops, CCTVs, and accessories."} />
        <link rel="canonical" href="https://paradiponline.com/sales" />
      </Helmet>
      <section className="gradient-hero py-16">
        <div className="container mx-auto px-4 text-center">
          {heroSection?.content.badge && (
            <Badge className="mb-4 bg-white/20 text-white border-white/30 backdrop-blur-sm">
              {heroSection.content.badge}
            </Badge>
          )}
          <h1 className="font-display text-4xl md:text-5xl font-bold text-primary-foreground mb-4">
            {heroSection?.content.title || "Computer Sales"}
          </h1>
          <p className="text-primary-foreground/80 text-lg max-w-2xl mx-auto">
            {heroSection?.content.subtitle || "Browse our wide selection of quality computers, laptops, and accessories."}
          </p>
        </div>
      </section>

      <section className="py-8 lg:py-12 bg-slate-50">
        <div className="container mx-auto px-4">
          <div className="flex flex-col lg:flex-row gap-8">
            {/* Left Sidebar Filters (Flipkart Style) */}
            <div className="w-full lg:w-64 shrink-0 space-y-6">
              <div className="bg-white p-5 rounded-2xl border border-slate-200/60 shadow-sm sticky top-24">
                <div className="flex items-center justify-between mb-4 border-b border-slate-100 pb-4">
                  <h3 className="font-bold text-lg flex items-center gap-2">
                    <SlidersHorizontal className="h-5 w-5 text-blue-600" />
                    Filters
                  </h3>
                  <button 
                    onClick={() => { setSelectedBrands([]); setSelectedPriceRange("all"); setSelectedCategory("all"); }}
                    className="text-xs font-semibold text-blue-600 hover:text-blue-800 uppercase tracking-wider"
                  >
                    Clear All
                  </button>
                </div>

                {/* Categories */}
                <div className="mb-6">
                  <h4 className="text-sm font-bold text-slate-900 mb-3 uppercase tracking-wider">Categories</h4>
                  <div className="space-y-2">
                    <Select value={selectedCategory} onValueChange={setSelectedCategory}>
                      <SelectTrigger className="w-full bg-slate-50 border-slate-200">
                        <SelectValue placeholder="All Categories" />
                      </SelectTrigger>
                      <SelectContent>
                        {categories.map((cat) => (
                          <SelectItem key={cat.id} value={cat.id}>{cat.name}</SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>
                </div>

                {/* Brands */}
                <div className="mb-6">
                  <h4 className="text-sm font-bold text-slate-900 mb-3 uppercase tracking-wider">Brand</h4>
                  <div className="space-y-3">
                    {BRANDS.map((brand) => (
                      <div key={brand} className="flex items-center space-x-3">
                        <Checkbox 
                          id={`brand-${brand}`} 
                          checked={selectedBrands.includes(brand)}
                          onCheckedChange={(checked) => {
                            if (checked) setSelectedBrands([...selectedBrands, brand]);
                            else setSelectedBrands(selectedBrands.filter(b => b !== brand));
                          }}
                        />
                        <label htmlFor={`brand-${brand}`} className="text-sm leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70 text-slate-700 cursor-pointer">{brand}</label>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Price */}
                <div>
                  <h4 className="text-sm font-bold text-slate-900 mb-3 uppercase tracking-wider">Price</h4>
                  <div className="space-y-3">
                    {PRICE_RANGES.map((pr) => (
                      <div key={pr.id} className="flex items-center space-x-3">
                        <Checkbox 
                          id={`price-${pr.id}`} 
                          checked={selectedPriceRange === pr.id}
                          onCheckedChange={() => setSelectedPriceRange(pr.id)}
                        />
                        <label htmlFor={`price-${pr.id}`} className="text-sm leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70 text-slate-700 cursor-pointer">{pr.label}</label>
                      </div>
                    ))}
                  </div>
                </div>

              </div>
            </div>

            {/* Right Product Grid */}
            <div className="flex-1">
              <div className="flex flex-col sm:flex-row gap-4 mb-6 p-3 bg-white rounded-xl border border-slate-200/60 shadow-sm items-center justify-between">
                <div className="relative flex-1 w-full max-w-md">
                  <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-slate-400" />
                  <Input
                    placeholder="Search laptops, desktops..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="pl-10 bg-slate-50 border-slate-200"
                  />
                </div>

                <div className="flex items-center gap-3 w-full sm:w-auto">
                  <Select value={sortBy} onValueChange={setSortBy}>
                    <SelectTrigger className="w-full sm:w-[180px] bg-slate-50 border-slate-200">
                      <SelectValue placeholder="Sort by" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="featured">Popularity</SelectItem>
                      <SelectItem value="price-low">Price -- Low to High</SelectItem>
                      <SelectItem value="price-high">Price -- High to Low</SelectItem>
                    </SelectContent>
                  </Select>

                  <div className="flex border border-slate-200 rounded-lg overflow-hidden bg-slate-50 shrink-0">
                    <button onClick={() => setViewMode("grid")} className={cn("p-2 transition-colors", viewMode === "grid" ? "bg-blue-600 text-white" : "hover:bg-slate-200 text-slate-600")}>
                      <Grid className="h-4 w-4" />
                    </button>
                    <button onClick={() => setViewMode("list")} className={cn("p-2 transition-colors", viewMode === "list" ? "bg-blue-600 text-white" : "hover:bg-slate-200 text-slate-600")}>
                      <List className="h-4 w-4" />
                    </button>
                  </div>
                </div>
              </div>

              <p className="text-slate-500 font-medium mb-6 px-1">Showing {sortedProducts.length} results</p>

              <div className={cn(viewMode === "grid" ? "grid sm:grid-cols-2 xl:grid-cols-3 gap-6" : "space-y-4")}>
            {sortedProducts.map((product) => (
              <div
                key={product.id}
                className={cn(
                  "group bg-card rounded-xl border border-border overflow-hidden hover:shadow-card hover:border-primary/20 transition-all duration-300",
                  viewMode === "list" && "flex"
                )}
              >
                <div className={cn("relative bg-white flex items-center justify-center p-6 border-b border-slate-100", viewMode === "grid" ? "aspect-[4/3]" : "w-56 shrink-0 border-r border-b-0")}>
                  <Link to={`/product/${product.id}`} className="block w-full h-full flex items-center justify-center">
                    <img src={getImageUrl(product.images?.[0] || product.image)} alt={product.name} className="max-w-full max-h-full object-contain group-hover:scale-105 transition-transform duration-500 cursor-pointer drop-shadow-sm" />
                  </Link>
                  {product.badge && (
                    <Badge className={cn("absolute top-3 left-3 shadow-sm", product.badge === "Sale" ? "bg-red-500 hover:bg-red-600" : "bg-teal-500 hover:bg-teal-600")}>
                      {product.badge}
                    </Badge>
                  )}
                  <div className="absolute inset-0 bg-transparent flex items-center justify-center pointer-events-none opacity-0 group-hover:opacity-100 transition-opacity">
                      <span className="bg-slate-900/80 backdrop-blur-sm text-white px-4 py-2 rounded-lg font-bold text-[11px] shadow-xl text-center leading-tight">Check<br/>Availability</span>
                  </div>
                </div>

                <div className={cn("p-4 flex-1", viewMode === "list" && "flex flex-col justify-between")}>
                  <div>
                    <span className="text-xs text-muted-foreground uppercase tracking-wider">
                      {product.category}
                    </span>
                    <h3 className={cn("font-semibold text-foreground mt-1 mb-2 group-hover:text-primary transition-colors", viewMode === "grid" ? "line-clamp-2" : "line-clamp-1")}>
                      <Link to={`/product/${product.id}`} className="hover:underline">{product.name}</Link>
                    </h3>

                    {viewMode === "list" && product.specs && (
                      <div className="flex flex-wrap gap-2 mb-3">
                        {product.specs.map((spec, i) => (
                          <span key={i} className="text-xs bg-secondary px-2 py-1 rounded">{spec}</span>
                        ))}
                      </div>
                    )}

                    <div className="flex items-center gap-2 mb-4">
                      <span className="font-display font-bold text-lg text-foreground">₹{product.price.toLocaleString('en-IN')}</span>
                      {product.originalPrice && (
                        <span className="text-sm text-muted-foreground line-through">₹{product.originalPrice.toLocaleString('en-IN')}</span>
                      )}
                    </div>
                  </div>

                  <div className="flex gap-2">
                    <Button size="sm" className="flex-1 gradient-primary" asChild>
                      <a href={`tel:${salesPhonePlain}`}><Phone className="h-4 w-4 mr-1" />Call</a>
                    </Button>
                    <Button size="sm" variant="outline" className="flex-1" asChild>
                      <a href={`https://wa.me/91${salesPhonePlain}`} target="_blank" rel="noopener noreferrer"><MessageCircle className="h-4 w-4 mr-1" />WhatsApp</a>
                    </Button>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {sortedProducts.length === 0 && (
            <div className="text-center py-20 bg-white rounded-2xl border border-slate-100 shadow-sm mt-4">
              <div className="flex justify-center mb-4">
                <Search className="h-12 w-12 text-slate-300" />
              </div>
              <p className="text-slate-600 text-lg font-medium">We couldn't find any products matching your filters.</p>
              <Button className="mt-6 bg-blue-600 hover:bg-blue-700" onClick={() => { setSelectedBrands([]); setSelectedPriceRange("all"); setSelectedCategory("all"); setSearchQuery(""); }}>
                Reset All Filters
              </Button>
            </div>
          )}
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default Sales;
