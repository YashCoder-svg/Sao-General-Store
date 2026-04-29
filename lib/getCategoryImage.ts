import { categoryImages } from "./categoryImages";

export function getCategoryImage(name: string): string {
  const key = Object.keys(categoryImages).find(
    (k) => k.toLowerCase() === name.toLowerCase()
  );

  if (key) return categoryImages[key];

  return `https://tse4.mm.bing.net/th?q=${encodeURIComponent(`${name} grocery products`)}&w=520&h=360&c=7&rs=1&p=0&o=5&pid=1.7`;
}
