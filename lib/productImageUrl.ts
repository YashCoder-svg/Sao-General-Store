import type { Product } from "./products";

type ProductLike = Pick<Product, "id" | "name" | "brand" | "weight" | "image">;

const LOCAL_PRODUCT_IMAGES: Record<string, string> = {
  "ard-2": "/images/india_gate_rice.png",
  "ard-7": "/images/india_gate_rice.png",
  "spice-1": "/images/mdh_chana_masala.png",
  "spice-4": "/images/mdh_chana_masala.png",
  "spice-8": "/images/mdh_chana_masala.png",
  "cn-1": "/images/haldirams_aloo_bhujia.png",
  "cn-5": "/images/haldirams_aloo_bhujia.png",
  "cn-8": "/images/haldirams_aloo_bhujia.png",
  "hd-1": "/images/bournvita.png",
  "hd-3": "/images/bournvita.png",
  "hd-6": "/images/bournvita.png",
  "hd-7": "/images/bournvita.png",
  "hd-9": "/images/bournvita.png",
  "pc-5": "/images/dove_body_wash.png",
};

const BROKEN_IMAGE_HOSTS = ["m.media-amazon.com"];

function isKnownBrokenImage(url: string) {
  return BROKEN_IMAGE_HOSTS.some((host) => url.includes(host));
}

export function getProductImageUrl(product: ProductLike) {
  const localImage = LOCAL_PRODUCT_IMAGES[product.id];
  if (localImage) return localImage;

  if (product.image && !isKnownBrokenImage(product.image)) {
    return product.image;
  }

  const query = `${product.brand} ${product.name} ${product.weight} product pack`;
  return `https://tse4.mm.bing.net/th?q=${encodeURIComponent(query)}&w=420&h=420&c=7&rs=1&p=0&o=5&pid=1.7`;
}
