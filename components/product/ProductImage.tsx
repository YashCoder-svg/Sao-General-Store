"use client";

import Image from "next/image";
import { useState, useEffect } from "react";
import { getProductImage } from "@/lib/getProductImage";
import { PRODUCT_PLACEHOLDER_IMAGE } from "@/lib/productImages";
import { Product } from "@/lib/products";

interface ProductImageProps {
  product: Product;
  priority?: boolean;
}

export function ProductImage({ product, priority = false }: ProductImageProps) {
  const [imgSrc, setImgSrc] = useState(
    getProductImage(product) || PRODUCT_PLACEHOLDER_IMAGE
  );
  const [loaded, setLoaded] = useState(false);

  // Reset when product changes
  useEffect(() => {
    const newSrc = getProductImage(product) || PRODUCT_PLACEHOLDER_IMAGE;
    setImgSrc(newSrc);
    setLoaded(false);
  }, [product]);

  const handleError = () => {
    console.log("❌ Image failed:", imgSrc);

    // If current src is the mapped image, try offImageUrl directly
    if (imgSrc !== product.offImageUrl && product.offImageUrl) {
      setImgSrc(product.offImageUrl);
      return;
    }

    // If current src is offImageUrl, try product.image
    if (imgSrc !== product.image && product.image) {
      setImgSrc(product.image);
      return;
    }

    // Otherwise use placeholder
    if (imgSrc !== PRODUCT_PLACEHOLDER_IMAGE) {
      setImgSrc(PRODUCT_PLACEHOLDER_IMAGE);
    }
    setLoaded(true);
  };

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
          }}
        />
      )}

      <Image
        src={imgSrc || PRODUCT_PLACEHOLDER_IMAGE}
        alt={product?.name || "Product"}
        fill
        sizes="(max-width: 768px) 45vw, 220px"
        priority={priority}
        unoptimized
        onLoad={() => setLoaded(true)}
        onError={handleError}
        style={{
          objectFit: "contain",
          padding: "12px",
          boxSizing: "border-box",
          display: "block",
          opacity: loaded ? 1 : 0.85,
          transition: "opacity 0.3s ease, transform 0.3s ease",
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
