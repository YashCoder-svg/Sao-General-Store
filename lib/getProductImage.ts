import { PRODUCT_PLACEHOLDER_IMAGE, productImages } from "./productImages";

export type ProductImageProduct = {
  name: string;
  image?: string;
  offImageUrl?: string;
  customImage?: string;
  barcode?: string;
};

export function getProductImage(product: ProductImageProduct): string {
  // Priority 1: admin-uploaded custom image
  if (product.customImage?.trim()) return product.customImage.trim();

  // Priority 2: productImages mapping
  if (productImages[product.name]) return productImages[product.name];

  // Priority 3: pre-verified Open Food Facts URL
  if (product.offImageUrl?.trim()) return product.offImageUrl.trim();

  // Priority 4: generic product.image field
  if (product.image?.trim()) return product.image.trim();

  // Fallback: placeholder
  return PRODUCT_PLACEHOLDER_IMAGE;
}
