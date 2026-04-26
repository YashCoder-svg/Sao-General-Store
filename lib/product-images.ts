export const VERIFIED_OFF_IMAGE_URLS: Record<string, string> = {
  "7613035352681":
    "https://images.openfoodfacts.org/images/products/761/303/535/2681/front_en.5.400.jpg",
  "8901030004177":
    "https://images.openfoodfacts.org/images/products/890/103/000/4177/front_en.3.400.jpg",
  "8901030012913":
    "https://images.openfoodfacts.org/images/products/890/103/001/2913/front_en.3.400.jpg",
  "8901030014276":
    "https://images.openfoodfacts.org/images/products/890/103/001/4276/front_en.3.400.jpg",
  "8901030743291":
    "https://images.openfoodfacts.org/images/products/890/103/074/3291/front_en.3.400.jpg",
  "8901030756000":
    "https://images.openfoodfacts.org/images/products/890/103/075/6000/front_en.3.400.jpg",
  "8901030756130":
    "https://images.openfoodfacts.org/images/products/890/103/075/6130/front_en.3.400.jpg",
  "8901058850015":
    "https://images.openfoodfacts.org/images/products/890/105/885/0015/front_en.3.400.jpg",
  "8901063000101":
    "https://images.openfoodfacts.org/images/products/890/106/300/0101/front_en.3.400.jpg",
  "8901063104017":
    "https://images.openfoodfacts.org/images/products/890/106/310/4017/front_en.3.400.jpg",
  "8901063710126":
    "https://images.openfoodfacts.org/images/products/890/106/371/0126/front_en.3.400.jpg",
  "8901063750016":
    "https://images.openfoodfacts.org/images/products/890/106/375/0016/front_en.3.400.jpg",
  "8901267023636":
    "https://images.openfoodfacts.org/images/products/890/126/702/3636/front_en.3.400.jpg",
  "8901314005872":
    "https://images.openfoodfacts.org/images/products/890/131/400/5872/front_en.3.400.jpg",
  "8901396013207":
    "https://images.openfoodfacts.org/images/products/890/139/601/3207/front_en.3.400.jpg",
  "8901396111145":
    "https://images.openfoodfacts.org/images/products/890/139/611/1145/front_en.3.400.jpg",
  "8901491101091":
    "https://images.openfoodfacts.org/images/products/890/149/110/1091/front_en.3.400.jpg",
  "8901584006203":
    "https://images.openfoodfacts.org/images/products/890/158/400/6203/front_en.3.400.jpg",
  "8901719110085":
    "https://images.openfoodfacts.org/images/products/890/171/911/0085/front_en.5.400.jpg",
  "8906002350023":
    "https://images.openfoodfacts.org/images/products/890/600/235/0023/front_en.3.400.jpg",
};

export type ProductImageInput = {
  barcode?: string | null;
  customImage?: string | null;
  offImageUrl?: string | null;
};

export function normalizeBarcode(barcode?: string | null): string {
  return barcode?.replace(/\D/g, "") ?? "";
}

export function buildOpenFoodFactsImageUrl(barcode?: string | null): string {
  const normalized = normalizeBarcode(barcode);

  if (normalized.length !== 13) {
    return "";
  }

  const path = normalized.replace(
    /(\d{3})(\d{3})(\d{3})(\d+)/,
    "$1/$2/$3/$4",
  );

  return `https://images.openfoodfacts.org/images/products/${path}/front_en.3.400.jpg`;
}

export function getVerifiedOffImageUrl(barcode?: string | null): string {
  const normalized = normalizeBarcode(barcode);
  return VERIFIED_OFF_IMAGE_URLS[normalized] ?? "";
}

export function getPreferredProductImageUrl(
  product: ProductImageInput,
): string {
  const customImage = product.customImage?.trim();
  const offImageUrl = product.offImageUrl?.trim();

  return (
    customImage ||
    getVerifiedOffImageUrl(product.barcode) ||
    offImageUrl ||
    buildOpenFoodFactsImageUrl(product.barcode)
  );
}

export function getProductImageFallbackLabel(
  brand?: string | null,
  alt?: string | null,
): string {
  return (brand?.trim() || alt?.trim() || "?").charAt(0).toUpperCase() || "?";
}
