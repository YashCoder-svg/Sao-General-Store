// lib/getCategoryImage.ts

import { categoryImages } from "./categoryImages";

export function getCategoryImage(name: string): string {
  const key = Object.keys(categoryImages).find(
    (k) => k.toLowerCase() === name.toLowerCase()
  );

  return key ? categoryImages[key] : "/placeholder.png";
}
