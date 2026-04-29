export const CATEGORY_FILTERS: Record<string, string[]> = {
  all: [],
  "atta-rice-dal": ["atta-rice-dal"],
  "cooking-oil": ["cooking-oil"],
  "ghee-dairy": ["ghee-dairy"],
  "masala-spices": ["masala-spices"],
  "dairy-breakfast": ["dairy-breakfast"],
  "organic-health": ["organic-health"],
  "biscuits-cookies": ["biscuits-cookies"],
  "noodles-ready-to-eat": ["noodles-ready-to-eat"],
  "chips-namkeen": ["chips-namkeen"],
  "tea-coffee": ["tea-coffee"],
  "health-drinks": ["health-drinks"],
  "oats-breakfast": ["oats-breakfast"],
  "home-cleaning": ["home-cleaning"],
  "personal-care": ["personal-care"],
  dairy: ["ghee-dairy", "dairy-breakfast"],
  snacks: ["biscuits-cookies", "noodles-ready-to-eat", "chips-namkeen"],
  beverages: ["tea-coffee", "health-drinks"],
  household: ["home-cleaning"],
  millets: ["organic-health", "oats-breakfast"],
  "rice-grains": ["atta-rice-dal"],
  "edible-oils": ["cooking-oil"],
  spices: ["masala-spices"],
};

export const CATEGORY_LABELS: Record<string, string> = {
  all: "All Products",
  dairy: "Dairy",
  snacks: "Snacks",
  beverages: "Beverages",
  household: "Household",
  millets: "Organic & Breakfast",
  "rice-grains": "Atta, Rice & Dal",
  "edible-oils": "Cooking Oil",
  spices: "Masala & Spices",
};

export function getCategoryFilterIds(category: string) {
  return CATEGORY_FILTERS[category] ?? [category];
}

export function getCategoryLabel(category: string) {
  if (CATEGORY_LABELS[category]) return CATEGORY_LABELS[category];

  return category
    .split("-")
    .map((w) => w.charAt(0).toUpperCase() + w.slice(1))
    .join(" & ");
}
