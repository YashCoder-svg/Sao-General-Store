import { categoryImages } from "./categoryImages";

export function getCategoryImage(name: string): string {
  const key = Object.keys(categoryImages).find(
    (k) => k.toLowerCase() === name.toLowerCase()
  );

  return key ? categoryImages[key] : "https://images.unsplash.com/photo-1542838132-92c53300491e?w=400&q=80";
}
