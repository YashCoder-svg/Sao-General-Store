"use client";

import Link from "next/link";
import { useState } from "react";
import { Heart, ShoppingCart, Check, Clock } from "lucide-react";
import { Product, getDiscountPercent } from "@/lib/products";
import { useCartStore } from "@/lib/store";
import { useToast } from "@/components/ui/Toast";
import { ProductImage } from "@/components/product/ProductImage";

const BADGE_STYLES: Record<string, { bg: string; color: string }> = {
  "Best Seller": { bg: "#DC2626", color: "white" },
  New: { bg: "#2D6A4F", color: "white" },
  Popular: { bg: "#E9A23B", color: "#0a0a0a" },
  "Fresh Today": { bg: "#2563EB", color: "white" },
  Organic: { bg: "#7C3AED", color: "white" },
};

export function ProductCard({ product }: { product: Product }) {
  const [cartState, setCartState] = useState<"idle" | "adding" | "added">("idle");
  const { addItem, toggleWishlist, wishlist } = useCartStore();
  const { showToast } = useToast();
  const isWishlisted = wishlist.includes(product.id);
  const discount = getDiscountPercent(product.price, product.mrp);

  const handleAddToCart = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    if (cartState !== "idle") return;
    setCartState("adding");
    setTimeout(() => {
      addItem(product);
      setCartState("added");
      showToast(`${product.name} added to cart 🛒`);
      setTimeout(() => setCartState("idle"), 1800);
    }, 350);
  };

  const handleWishlist = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    toggleWishlist(product.id);
    showToast(isWishlisted ? "Removed from wishlist" : `${product.name} wishlisted ❤️`);
  };

  return (
    <Link
      href={`/products/${product.id}`}
      data-card
      style={{
        display: "block",
        background: "white",
        borderRadius: "18px",
        border: "1px solid #E8E4DC",
        overflow: "hidden",
        textDecoration: "none",
        color: "inherit",
        position: "relative",
        transition: "all 0.4s cubic-bezier(0.25, 1, 0.5, 1)",
        cursor: "pointer",
      }}
      onMouseEnter={(e) => {
        const el = e.currentTarget as HTMLElement;
        el.style.transform = "translateY(-6px)";
        el.style.boxShadow = "0 20px 60px rgba(0,0,0,0.12)";
      }}
      onMouseLeave={(e) => {
        const el = e.currentTarget as HTMLElement;
        el.style.transform = "translateY(0)";
        el.style.boxShadow = "none";
      }}
    >
      {/* ── Image area (Blinkit-style: white bg, contain, 12px pad, shimmer) ── */}
      <div style={{ position: "relative" }}>
        <ProductImage product={product} />

        {/* Badge */}
        {product.badge && BADGE_STYLES[product.badge] && (
          <span
            style={{
              position: "absolute",
              top: "10px",
              left: "10px",
              background: BADGE_STYLES[product.badge].bg,
              color: BADGE_STYLES[product.badge].color,
              fontSize: "10.5px",
              fontWeight: 700,
              fontFamily: "Satoshi, sans-serif",
              padding: "3px 9px",
              borderRadius: "6px",
              letterSpacing: "0.02em",
              zIndex: 3,
              pointerEvents: "none",
            }}
          >
            {product.badge}
          </span>
        )}

        {/* Discount — Blinkit blue */}
        {discount > 0 && (
          <span
            style={{
              position: "absolute",
              top: product.badge ? "36px" : "10px",
              left: "10px",
              background: "#EEF4FF",
              color: "#256FEF",
              fontSize: "10px",
              fontWeight: 700,
              fontFamily: "Satoshi, sans-serif",
              padding: "3px 8px",
              borderRadius: "6px",
              zIndex: 3,
              pointerEvents: "none",
            }}
          >
            {discount}% OFF
          </span>
        )}

        {/* Wishlist */}
        <button
          onClick={handleWishlist}
          style={{
            position: "absolute",
            top: "10px",
            right: "10px",
            width: "34px",
            height: "34px",
            borderRadius: "50%",
            background: "white",
            border: "none",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            cursor: "pointer",
            boxShadow: "0 2px 8px rgba(0,0,0,0.12)",
            transition: "transform 0.2s",
            zIndex: 3,
          }}
          onMouseEnter={(e) =>
            ((e.currentTarget as HTMLElement).style.transform = "scale(1.15)")
          }
          onMouseLeave={(e) =>
            ((e.currentTarget as HTMLElement).style.transform = "scale(1)")
          }
        >
          <Heart
            size={16}
            fill={isWishlisted ? "#DC2626" : "none"}
            color={isWishlisted ? "#DC2626" : "#9CA3AF"}
          />
        </button>
      </div>

      {/* Card body */}
      <div style={{ padding: "14px 14px 16px" }}>
        {/* Brand */}
        <span
          style={{
            fontSize: "10px",
            fontWeight: 700,
            color: "#2D6A4F",
            fontFamily: "Satoshi, sans-serif",
            textTransform: "uppercase",
            letterSpacing: "0.08em",
          }}
        >
          {product.brand}
        </span>

        {/* Name */}
        <h3
          style={{
            fontSize: "14px",
            fontWeight: 700,
            fontFamily: "Satoshi, sans-serif",
            color: "#0a0a0a",
            marginTop: "3px",
            marginBottom: "6px",
            lineHeight: 1.35,
            display: "-webkit-box",
            WebkitLineClamp: 2,
            WebkitBoxOrient: "vertical",
            overflow: "hidden",
          }}
        >
          {product.name}
        </h3>

        {/* Size + delivery */}
        <div
          style={{
            display: "flex",
            alignItems: "center",
            gap: "8px",
            marginBottom: "8px",
          }}
        >
          <span
            style={{
              fontSize: "12px",
              color: "#6b7280",
              fontFamily: "Satoshi, sans-serif",
              background: "#F3F4F6",
              padding: "2px 8px",
              borderRadius: "6px",
            }}
          >
            {product.size}
          </span>
          <span
            style={{
              fontSize: "11.5px",
              color: "#2D6A4F",
              fontFamily: "Satoshi, sans-serif",
              fontWeight: 600,
              display: "flex",
              alignItems: "center",
              gap: "3px",
            }}
          >
            <Clock size={11} />
            {product.deliveryTime}
          </span>
        </div>

        {/* Stars */}
        <div
          style={{
            display: "flex",
            alignItems: "center",
            gap: "4px",
            marginBottom: "10px",
          }}
        >
          <div style={{ display: "flex", gap: "1px" }}>
            {[1, 2, 3, 4, 5].map((s) => (
              <svg
                key={s}
                width="11"
                height="11"
                viewBox="0 0 24 24"
                fill={s <= Math.round(product.rating) ? "#F59E0B" : "#E5E7EB"}
              >
                <polygon points="12,2 15.09,8.26 22,9.27 17,14.14 18.18,21.02 12,17.77 5.82,21.02 7,14.14 2,9.27 8.91,8.26" />
              </svg>
            ))}
          </div>
          <span
            style={{
              fontSize: "11px",
              color: "#6b7280",
              fontFamily: "Satoshi, sans-serif",
            }}
          >
            ({product.reviews.toLocaleString()})
          </span>
        </div>

        {/* Price + Add to Cart */}
        <div
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            gap: "8px",
          }}
        >
          <div>
            <span
              style={{
                fontFamily: "Cabinet Grotesk, sans-serif",
                fontWeight: 800,
                fontSize: "18px",
                color: "#0a0a0a",
              }}
            >
              ₹{product.price}
            </span>
            {product.mrp > product.price && (
              <span
                style={{
                  fontSize: "12px",
                  color: "#9CA3AF",
                  textDecoration: "line-through",
                  marginLeft: "6px",
                  fontFamily: "Satoshi, sans-serif",
                }}
              >
                ₹{product.mrp}
              </span>
            )}
          </div>

          <button
            onClick={handleAddToCart}
            disabled={!product.inStock}
            style={{
              display: "flex",
              alignItems: "center",
              gap: "6px",
              background: cartState === "added" ? "#2D6A4F" : "#0a0a0a",
              color: "white",
              border: "none",
              borderRadius: "10px",
              padding: "8px 14px",
              fontFamily: "Satoshi, sans-serif",
              fontWeight: 700,
              fontSize: "12.5px",
              cursor: product.inStock ? "pointer" : "not-allowed",
              transition: "all 0.3s cubic-bezier(0.4,0,0.2,1)",
              transform: cartState === "added" ? "scale(1.08)" : "scale(1)",
              opacity: !product.inStock ? 0.5 : 1,
              whiteSpace: "nowrap",
              zIndex: 2,
              position: "relative",
            }}
            onMouseEnter={(e) => {
              if (cartState === "idle")
                (e.currentTarget as HTMLElement).style.background = "#2D6A4F";
            }}
            onMouseLeave={(e) => {
              if (cartState === "idle")
                (e.currentTarget as HTMLElement).style.background = "#0a0a0a";
            }}
          >
            {cartState === "added" ? (
              <>
                <Check size={13} />
                Added!
              </>
            ) : (
              <>
                <ShoppingCart size={13} />
                {product.inStock ? "Add" : "OOS"}
              </>
            )}
          </button>
        </div>
      </div>
    </Link>
  );
}
