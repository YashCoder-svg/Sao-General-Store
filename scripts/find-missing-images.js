
import fs from 'fs';
import path from 'path';

const productsContent = fs.readFileSync('c:/Users/vaiss/OneDrive/Desktop/Sao_General_Store/kirana-market/lib/products.ts', 'utf8');
const productImagesContent = fs.readFileSync('c:/Users/vaiss/OneDrive/Desktop/Sao_General_Store/kirana-market/lib/productImages.ts', 'utf8');

// Simple regex to extract product names from lib/products.ts
// Format is usually name: "...",
const nameRegex = /name:\s*["'](.+?)["']/g;
const products = [];
let match;
while ((match = nameRegex.exec(productsContent)) !== null) {
    products.push(match[1]);
}

// Simple regex to extract keys from productImages in lib/productImages.ts
const keyRegex = /"(.+?)":\s*"/g;
const imageKeys = new Set();
while ((match = keyRegex.exec(productImagesContent)) !== null) {
    imageKeys.add(match[1]);
}

const missing = products.filter(p => !imageKeys.has(p));
console.log(JSON.stringify(Array.from(new Set(missing)), null, 2));
