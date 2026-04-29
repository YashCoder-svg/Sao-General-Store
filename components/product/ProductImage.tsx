"use client";

import Image from "next/image";
import { useState } from "react";
import { Product } from "@/lib/products";
import { getProductImageUrl } from "@/lib/productImageUrl";

interface ProductImageProps {
  product: Product;
  priority?: boolean;
}

export function ProductImage({ product, priority = false }: ProductImageProps) {
  const [loaded, setLoaded] = useState(false);
  const imageUrl = getProductImageUrl(product);

  if (!product.image) {
    console.warn("Missing image for product:", product.name);
  }

  return (
    <div
      style={{
        position: "relative",
        width: "100%",
        aspectRatio: "1 / 1",
        background: "linear-gradient(180deg, #f8f8f8 0%, #ffffff 100%)",
        overflow: "hidden",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        padding: "16px",
        boxSizing: "border-box",
      }}
    >
      {/* Shimmer Loader */}
      {!loaded && (
        <div
          style={{
            position: "absolute",
            inset: 0,
            background:
              "linear-gradient(90deg, #f5f5f5 25%, #ebebeb 50%, #f5f5f5 75%)",
            backgroundSize: "200% 100%",
            animation: "productShimmer 1.4s infinite linear",
            zIndex: 1,
          }}
        />
      )}

      <Image
        src={imageUrl}
        alt={product.name}
        width={300}
        height={300}
        unoptimized
        loading={priority ? "eager" : "lazy"}
        style={{
          width: "100%",
          height: "100%",
          objectFit: "contain",
          padding: "12px",
          boxSizing: "border-box",
          display: "block",
          opacity: loaded ? 1 : 0,
          transition: "opacity 0.4s ease, transform 0.4s ease",
          zIndex: 2,
        }}
        onLoad={() => setLoaded(true)}
        onError={(e) => {
          const img = e.currentTarget as HTMLImageElement;
          img.src = `https://tse3.mm.bing.net/th?q=${encodeURIComponent(`${product.brand} ${product.name} product`)}&w=420&h=420&c=7&rs=1&p=0&o=5&pid=1.7`;
        }}
        onMouseEnter={(e) => {
          (e.currentTarget as HTMLElement).style.transform = "scale(1.05)";
        }}
        onMouseLeave={(e) => {
          (e.currentTarget as HTMLElement).style.transform = "scale(1)";
        }}
      />

      <style>{`
        @keyframes productShimmer {
          0% { background-position: -200% 0; }
          100% { background-position: 200% 0; }
        }
      `}</style>
    </div>
  );
}
