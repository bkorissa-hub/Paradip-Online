import { get, postFormData, putFormData, del, ApiResponse } from "./apiClient";
import { Product } from "@/data/products";

export async function getProducts(): Promise<ApiResponse<Product[]>> {
  return get<Product[]>("products");
}

export async function getProductById(id: number | string): Promise<ApiResponse<Product>> {
  return get<Product>(`products/${id}`);
}

export async function createProduct(
  productData: Omit<Product, "id">, 
  imageFiles?: File[]
): Promise<ApiResponse<Product>> {
  const formData = new FormData();
  
  formData.append("name", productData.name);
  formData.append("category", productData.category);
  formData.append("price", String(productData.price));
  if (productData.originalPrice) {
    formData.append("originalPrice", String(productData.originalPrice));
  }
  if (productData.badge) {
    formData.append("badge", productData.badge);
  }
  formData.append("inStock", String(productData.inStock ?? true));
  if (productData.specs) {
    formData.append("specs", productData.specs.join(","));
  }
  formData.append("description", productData.description);
  
  // Add existing image URLs (if any)
  if (productData.images && productData.images.length > 0) {
    formData.append("existingImages", JSON.stringify(productData.images));
  }
  
  // Add new image files
  if (imageFiles) {
    imageFiles.forEach((file) => {
      formData.append("images", file);
    });
  }
  
  return postFormData<Product>("products", formData);
}

export async function updateProduct(
  id: number | string, 
  productData: Product,
  newImageFiles?: File[]
): Promise<ApiResponse<Product>> {
  const formData = new FormData();
  
  formData.append("name", productData.name);
  formData.append("category", productData.category);
  formData.append("price", String(productData.price));
  if (productData.originalPrice) {
    formData.append("originalPrice", String(productData.originalPrice));
  }
  formData.append("badge", productData.badge || "");
  formData.append("inStock", String(productData.inStock ?? true));
  if (productData.specs) {
    formData.append("specs", productData.specs.join(","));
  }
  formData.append("description", productData.description);
  
  // Add existing image URLs
  formData.append("existingImages", JSON.stringify(productData.images || []));
  
  // Add new image files
  if (newImageFiles) {
    newImageFiles.forEach((file) => {
      formData.append("newImages", file);
    });
  }
  
  return putFormData<Product>(`products/${id}`, formData);
}

export async function deleteProduct(id: number | string): Promise<ApiResponse<{}>> {
  return del<{}>(`products/${id}`);
}

export async function addProductImages(
  productId: number | string, 
  imageFiles: File[]
): Promise<ApiResponse<Product>> {
  const formData = new FormData();
  imageFiles.forEach((file) => {
    formData.append("images", file);
  });
  return postFormData<Product>(`products/${productId}/images`, formData);
}

export async function deleteProductImage(
  productId: number | string, 
  imageIndex: number
): Promise<ApiResponse<Product>> {
  return del<Product>(`products/${productId}/images/${imageIndex}`);
}
