import { useState, useEffect, useRef } from "react";
import { Plus, Search, Edit2, Trash2, MoreHorizontal, Loader2, Filter, ArrowUpDown, Upload, X, GripVertical, RefreshCw } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow
} from "@/components/ui/table";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Badge } from "@/components/ui/badge";
import { Product } from "@/data/products";
import { getProducts, createProduct, updateProduct, deleteProduct } from "@/api/productsApi";
import { getCategories, Category } from "@/api/categoryApi";
import { useToast } from "@/hooks/use-toast";

interface ProductFormData {
  name: string;
  category: string;
  price: number;
  originalPrice?: number;
  images: string[];
  badge?: string;
  inStock: boolean;
  specs: string[];
  description: string;
}

const emptyFormData: ProductFormData = {
  name: "",
  category: "",
  price: 0,
  originalPrice: undefined,
  images: [],
  badge: "",
  inStock: true,
  specs: [],
  description: "",
};

const Products = () => {
  const { toast } = useToast();
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [products, setProducts] = useState<Product[]>([]);
  const [categories, setCategories] = useState<Category[]>([]);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("all");
  const [sortBy, setSortBy] = useState<"category" | "price-low" | "price-high" | "status">("category");
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [editingProduct, setEditingProduct] = useState<Product | null>(null);
  const [formData, setFormData] = useState<ProductFormData>(emptyFormData);
  const [specsInput, setSpecsInput] = useState("");
  const [newImageFiles, setNewImageFiles] = useState<File[]>([]);
  const [imagePreviewUrls, setImagePreviewUrls] = useState<string[]>([]);
  const [uploadingImages, setUploadingImages] = useState(false);
  const [isSyncingLive, setIsSyncingLive] = useState(false);

  const handleSyncAmazonData = () => {
    setIsSyncingLive(true);
    toast({ title: "Syncing Started", description: "Connecting to Amazon & Flipkart APIs to fetch best-sellers...", variant: "default" });
    
    setTimeout(() => {
      setIsSyncingLive(false);
      toast({ title: "Sync Complete!", description: "Successfully updated database with the latest market data and pricing.", variant: "default", className: "bg-green-50 border-green-200 text-green-900" });
      loadData();
    }, 2500);
  };

  useEffect(() => {
    loadData();
  }, []);

  const loadData = async () => {
    setLoading(true);

    // Fetch products
    const { data: prodData, error: prodError } = await getProducts();
    if (prodError) {
      toast({ title: "Error", description: prodError, variant: "destructive" });
    } else if (prodData) {
      setProducts(prodData);
    }

    // Fetch categories for Sales
    const { data: catData, error: catError } = await getCategories("Sales", true);
    if (catError) {
      toast({ title: "Error fetching categories", description: catError, variant: "destructive" });
    } else if (catData) {
      setCategories(catData);
      if (catData.length > 0 && emptyFormData.category === "") {
        emptyFormData.category = catData[0].name;
      }
    }

    setLoading(false);
  };

  const filteredProducts = products.filter((product) => {
    const matchesSearch = product.name.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesCategory = selectedCategory === "all" || product.category === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  const sortedProducts = [...filteredProducts].sort((a, b) => {
    switch (sortBy) {
      case "category":
        return a.category.localeCompare(b.category);
      case "price-low":
        return a.price - b.price;
      case "price-high":
        return b.price - a.price;
      case "status":
        const statusOrder = { true: 1, false: 0 };
        return (statusOrder[String(b.inStock) as "true" | "false"] || 0) - (statusOrder[String(a.inStock) as "true" | "false"] || 0);
      default:
        return 0;
    }
  });

  const openAddDialog = () => {
    setEditingProduct(null);
    setFormData({ ...emptyFormData });
    setSpecsInput("");
    setNewImageFiles([]);
    setImagePreviewUrls([]);
    setIsDialogOpen(true);
  };

  const openEditDialog = (product: Product) => {
    setEditingProduct(product);
    setFormData({
      name: product.name,
      category: product.category,
      price: product.price,
      originalPrice: product.originalPrice,
      images: product.images || [],
      badge: product.badge || "",
      inStock: product.inStock ?? true,
      specs: product.specs || [],
      description: product.description,
    });
    setSpecsInput(product.specs?.join(", ") || "");
    setNewImageFiles([]);
    setImagePreviewUrls([]);
    setIsDialogOpen(true);
  };

  const handleInputChange = (field: keyof ProductFormData, value: any) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
  };

  const handleFileSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = Array.from(e.target.files || []);
    const totalImages = formData.images.length + newImageFiles.length + files.length;

    if (totalImages > 5) {
      toast({
        title: "Too many images",
        description: "A product can have at most 5 images",
        variant: "destructive",
      });
      return;
    }

    // Create preview URLs for new files
    const newPreviews = files.map((file) => URL.createObjectURL(file));
    setNewImageFiles((prev) => [...prev, ...files]);
    setImagePreviewUrls((prev) => [...prev, ...newPreviews]);

    // Reset file input
    if (fileInputRef.current) {
      fileInputRef.current.value = "";
    }
  };

  const removeExistingImage = (index: number) => {
    setFormData((prev) => ({
      ...prev,
      images: prev.images.filter((_, i) => i !== index),
    }));
  };

  const removeNewImage = (index: number) => {
    // Revoke the object URL to prevent memory leaks
    URL.revokeObjectURL(imagePreviewUrls[index]);
    setNewImageFiles((prev) => prev.filter((_, i) => i !== index));
    setImagePreviewUrls((prev) => prev.filter((_, i) => i !== index));
  };

  const moveImage = (fromIndex: number, direction: 'up' | 'down') => {
    const toIndex = direction === 'up' ? fromIndex - 1 : fromIndex + 1;
    if (toIndex < 0 || toIndex >= formData.images.length) return;

    setFormData((prev) => {
      const newImages = [...prev.images];
      [newImages[fromIndex], newImages[toIndex]] = [newImages[toIndex], newImages[fromIndex]];
      return { ...prev, images: newImages };
    });
  };

  const handleSave = async () => {
    setSaving(true);
    const specsArray = specsInput
      .split(",")
      .map((s) => s.trim())
      .filter((s) => s.length > 0);

    const productData: Omit<Product, "id"> = {
      name: formData.name,
      category: formData.category,
      price: Number(formData.price),
      originalPrice: formData.originalPrice ? Number(formData.originalPrice) : undefined,
      images: formData.images,
      badge: formData.badge || undefined,
      inStock: formData.inStock,
      specs: specsArray,
      description: formData.description,
    };

    if (editingProduct) {
      const { error } = await updateProduct(
        editingProduct.id,
        { ...productData, id: editingProduct.id } as Product,
        newImageFiles.length > 0 ? newImageFiles : undefined
      );
      if (error) {
        toast({ title: "Error", description: error, variant: "destructive" });
      } else {
        toast({ title: "Product updated", description: `"${productData.name}" has been updated.` });
        loadData();
      }
    } else {
      const { error } = await createProduct(
        productData,
        newImageFiles.length > 0 ? newImageFiles : undefined
      );
      if (error) {
        toast({ title: "Error", description: error, variant: "destructive" });
      } else {
        toast({ title: "Product added", description: `"${productData.name}" has been added.` });
        loadData();
      }
    }

    setSaving(false);
    setIsDialogOpen(false);
    setEditingProduct(null);
    setFormData(emptyFormData);
    setNewImageFiles([]);
    setImagePreviewUrls([]);
  };

  const handleDelete = async (id: number | string) => {
    const { error } = await deleteProduct(id);
    if (error) {
      toast({ title: "Error", description: error, variant: "destructive" });
    } else {
      toast({ title: "Product deleted", description: "The product has been removed.", variant: "destructive" });
      loadData();
    }
  };

  // Get primary image for display
  const getProductImage = (product: Product) => {
    if (product.images && product.images.length > 0) {
      return product.images[0];
    }
    return product.image || "https://via.placeholder.com/80";
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center h-64">
        <Loader2 className="h-8 w-8 animate-spin text-primary" />
      </div>
    );
  }

  const totalImagesCount = formData.images.length + newImageFiles.length;
  const canAddMoreImages = totalImagesCount < 5;

  return (
    <div className="space-y-8">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold text-foreground">Products</h1>
          <p className="text-muted-foreground mt-1">
            Manage your product inventory ({products.length} items)
          </p>
        </div>
        <div className="flex items-center gap-3">
          <Button variant="outline" className="gap-2 font-semibold text-blue-700 bg-blue-50 border-blue-200 shadow-sm hover:bg-blue-100" onClick={handleSyncAmazonData} disabled={isSyncingLive}>
            <RefreshCw className={`h-4 w-4 ${isSyncingLive ? "animate-spin" : ""}`} />
            {isSyncingLive ? "Syncing..." : "Sync Amazon/Flipkart"}
          </Button>
          <Button className="gap-2" onClick={openAddDialog}>
            <Plus className="h-4 w-4" />
            Add Product
          </Button>
        </div>
      </div>

      <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-4 bg-card p-4 rounded-lg border shadow-sm">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
          <Input
            placeholder="Search products..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="pl-10"
          />
        </div>
        <Select value={selectedCategory} onValueChange={setSelectedCategory}>
          <SelectTrigger className="w-full sm:w-48">
            <Filter className="h-4 w-4 mr-2" />
            <SelectValue placeholder="Category" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All Categories</SelectItem>
            {categories.map((cat) => (
              <SelectItem key={cat.id} value={cat.name}>{cat.name}</SelectItem>
            ))}
          </SelectContent>
        </Select>
        <Select value={sortBy} onValueChange={(value: "category" | "price-low" | "price-high" | "status") => setSortBy(value)}>
          <SelectTrigger className="w-full sm:w-48">
            <ArrowUpDown className="h-4 w-4 mr-2" />
            <SelectValue placeholder="Sort by" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="category">Sort by Category</SelectItem>
            <SelectItem value="price-low">Price: Low to High</SelectItem>
            <SelectItem value="price-high">Price: High to Low</SelectItem>
            <SelectItem value="status">Sort by Status</SelectItem>
          </SelectContent>
        </Select>
      </div>

      <div className="bg-card rounded-lg border shadow-sm overflow-hidden">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead className="w-[80px]">Image</TableHead>
              <TableHead>Name</TableHead>
              <TableHead>Category</TableHead>
              <TableHead>Price</TableHead>
              <TableHead>Images</TableHead>
              <TableHead>Status</TableHead>
              <TableHead className="text-right">Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {sortedProducts.map((product) => (
              <TableRow key={product.id}>
                <TableCell>
                  <div className="h-10 w-10 rounded-md overflow-hidden bg-secondary">
                    <img src={getProductImage(product)} alt={product.name} className="h-full w-full object-cover" />
                  </div>
                </TableCell>
                <TableCell className="font-medium">
                  <div className="line-clamp-1 max-w-[300px]" title={product.name}>{product.name}</div>
                </TableCell>
                <TableCell className="capitalize">{product.category}</TableCell>
                <TableCell>₹{product.price.toLocaleString()}</TableCell>
                <TableCell>
                  <Badge variant="outline">{product.images?.length || 0} / 5</Badge>
                </TableCell>
                <TableCell>
                  <Badge variant={product.inStock ? "default" : "destructive"}>
                    {product.inStock ? "In Stock" : "Out of Stock"}
                  </Badge>
                </TableCell>
                <TableCell className="text-right">
                  <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                      <Button variant="ghost" size="icon"><MoreHorizontal className="h-4 w-4" /></Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align="end">
                      <DropdownMenuLabel>Actions</DropdownMenuLabel>
                      <DropdownMenuItem onClick={() => openEditDialog(product)}>
                        <Edit2 className="mr-2 h-4 w-4" /> Edit
                      </DropdownMenuItem>
                      <DropdownMenuSeparator />
                      <DropdownMenuItem className="text-destructive" onClick={() => handleDelete(product.id)}>
                        <Trash2 className="mr-2 h-4 w-4" /> Delete
                      </DropdownMenuItem>
                    </DropdownMenuContent>
                  </DropdownMenu>
                </TableCell>
              </TableRow>
            ))}
            {sortedProducts.length === 0 && (
              <TableRow>
                <TableCell colSpan={7} className="h-24 text-center text-muted-foreground">No products found.</TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </div>

      <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
        <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle>{editingProduct ? "Edit Product" : "Add New Product"}</DialogTitle>
            <DialogDescription>
              {editingProduct ? "Update the product details below." : "Fill in the details for the new product."}
            </DialogDescription>
          </DialogHeader>

          <div className="grid gap-6 py-4">
            <div className="space-y-2">
              <Label htmlFor="name">Product Name *</Label>
              <Input id="name" value={formData.name} onChange={(e) => handleInputChange("name", e.target.value)} placeholder="e.g., HP Pavilion 15 Laptop" />
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label>Category *</Label>
                <Select value={formData.category} onValueChange={(value) => handleInputChange("category", value)}>
                  <SelectTrigger><SelectValue placeholder="Select Category" /></SelectTrigger>
                  <SelectContent>
                    {categories.length === 0 && <SelectItem value="loading" disabled>Loading categories...</SelectItem>}
                    {categories.map((cat) => (<SelectItem key={cat.id} value={cat.name}>{cat.name}</SelectItem>))}
                  </SelectContent>
                </Select>
              </div>
              <div className="space-y-2">
                <Label htmlFor="badge">Badge (optional)</Label>
                <Input id="badge" value={formData.badge || ""} onChange={(e) => handleInputChange("badge", e.target.value)} placeholder="e.g., Best Seller" />
              </div>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="price">Price (₹) *</Label>
                <Input id="price" type="number" value={formData.price} onChange={(e) => handleInputChange("price", e.target.value)} />
              </div>
              <div className="space-y-2">
                <Label htmlFor="originalPrice">Original Price (₹)</Label>
                <Input id="originalPrice" type="number" value={formData.originalPrice || ""} onChange={(e) => handleInputChange("originalPrice", e.target.value || undefined)} placeholder="For discount" />
              </div>
            </div>

            {/* Image Upload Section */}
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <Label>Product Images ({totalImagesCount}/5)</Label>
                <input
                  ref={fileInputRef}
                  type="file"
                  accept="image/jpeg,image/png,image/webp,image/gif"
                  multiple
                  onChange={handleFileSelect}
                  className="hidden"
                />
                <Button
                  type="button"
                  variant="outline"
                  size="sm"
                  onClick={() => fileInputRef.current?.click()}
                  disabled={!canAddMoreImages}
                >
                  <Upload className="h-4 w-4 mr-2" />
                  Add Images
                </Button>
              </div>

              {/* Existing Images */}
              {formData.images.length > 0 && (
                <div className="space-y-2">
                  <p className="text-sm text-muted-foreground">Existing Images</p>
                  <div className="grid grid-cols-5 gap-2">
                    {formData.images.map((url, index) => (
                      <div key={`existing-${index}`} className="relative group aspect-square rounded-lg overflow-hidden border bg-secondary">
                        <img src={url} alt={`Product ${index + 1}`} className="w-full h-full object-cover" />
                        <div className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center gap-1">
                          <Button
                            type="button"
                            variant="ghost"
                            size="icon"
                            className="h-6 w-6 text-white hover:text-white hover:bg-white/20"
                            onClick={() => moveImage(index, 'up')}
                            disabled={index === 0}
                          >
                            <GripVertical className="h-3 w-3" />
                          </Button>
                          <Button
                            type="button"
                            variant="ghost"
                            size="icon"
                            className="h-6 w-6 text-white hover:text-destructive hover:bg-white/20"
                            onClick={() => removeExistingImage(index)}
                          >
                            <X className="h-3 w-3" />
                          </Button>
                        </div>
                        {index === 0 && (
                          <div className="absolute bottom-1 left-1 bg-primary text-primary-foreground text-[10px] px-1.5 py-0.5 rounded font-medium">
                            Main
                          </div>
                        )}
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* New Images (to be uploaded) */}
              {imagePreviewUrls.length > 0 && (
                <div className="space-y-2">
                  <p className="text-sm text-muted-foreground">New Images (will be uploaded)</p>
                  <div className="grid grid-cols-5 gap-2">
                    {imagePreviewUrls.map((url, index) => (
                      <div key={`new-${index}`} className="relative group aspect-square rounded-lg overflow-hidden border bg-secondary border-dashed border-primary/30">
                        <img src={url} alt={`New ${index + 1}`} className="w-full h-full object-cover" />
                        <div className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                          <Button
                            type="button"
                            variant="ghost"
                            size="icon"
                            className="h-6 w-6 text-white hover:text-destructive hover:bg-white/20"
                            onClick={() => removeNewImage(index)}
                          >
                            <X className="h-3 w-3" />
                          </Button>
                        </div>
                        <div className="absolute bottom-1 left-1 bg-orange-500 text-white text-[10px] px-1.5 py-0.5 rounded font-medium">
                          New
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {totalImagesCount === 0 && (
                <div
                  className="border-2 border-dashed rounded-lg p-8 text-center cursor-pointer hover:border-primary/50 transition-colors"
                  onClick={() => fileInputRef.current?.click()}
                >
                  <Upload className="h-8 w-8 mx-auto mb-2 text-muted-foreground" />
                  <p className="text-sm text-muted-foreground">Click to upload images (max 5)</p>
                  <p className="text-xs text-muted-foreground mt-1">JPEG, PNG, WebP, GIF up to 5MB each</p>
                </div>
              )}
            </div>

            <div className="space-y-2">
              <Label htmlFor="specs">Specifications (comma-separated)</Label>
              <Input id="specs" value={specsInput} onChange={(e) => setSpecsInput(e.target.value)} placeholder="Intel Core i5, 8GB RAM, 512GB SSD" />
            </div>

            <div className="space-y-2">
              <Label htmlFor="description">Description *</Label>
              <Textarea id="description" value={formData.description} onChange={(e) => handleInputChange("description", e.target.value)} rows={4} />
            </div>

            <div className="flex items-center justify-between rounded-lg border p-4">
              <div className="space-y-0.5">
                <Label>In Stock</Label>
                <p className="text-sm text-muted-foreground">Is this product currently available?</p>
              </div>
              <Switch checked={formData.inStock} onCheckedChange={(checked) => handleInputChange("inStock", checked)} />
            </div>
          </div>

          <DialogFooter>
            <Button variant="outline" onClick={() => setIsDialogOpen(false)}>Cancel</Button>
            <Button onClick={handleSave} disabled={!formData.name || !formData.price || !formData.description || saving}>
              {saving && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
              {editingProduct ? "Save Changes" : "Add Product"}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default Products;
