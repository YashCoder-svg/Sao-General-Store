"use client";

import { use, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import {
  ArrowLeft, Heart, ShoppingCart, Check, Clock,
  Truck, ShieldCheck, RotateCcw, Star, Plus, Minus
} from "lucide-react";
import {
  Product,
  getDiscountPercent,
  PRODUCTS,
} from "@/lib/products";
import { useCartStore } from "@/lib/store";
import { useToast } from "@/components/ui/Toast";
import { Ticker } from "@/components/ui/Ticker";
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { ProductCard } from "@/components/product/ProductCard";
import { getProductImageUrl } from "@/lib/productImageUrl";

const BADGE_STYLES: Record<string, { bg: string; color: string }> = {
  "Best Seller": { bg: "#DC2626", color: "white" },
  New: { bg: "#2D6A4F", color: "white" },
  Popular: { bg: "#E9A23B", color: "#0a0a0a" },
  "Fresh Today": { bg: "#2563EB", color: "white" },
  Organic: { bg: "#7C3AED", color: "white" },
};

function ProductHeroImage({ product }: { product: Product }) {
  const [loaded, setLoaded] = useState(false);
  const imageUrl = getProductImageUrl(product);

  return (
    <div
      style={{
        position: "relative",
        width: "100%",
        height: "100%",
        background: "#ffffff",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        padding: "24px",
        overflow: "hidden",
        borderRadius: "24px",
      }}
    >
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
        fill
        sizes="(max-width: 768px) 90vw, 440px"
        unoptimized
        loading="eager"
        onLoad={() => setLoaded(true)}
        onError={(e) => {
          const img = e.currentTarget as HTMLImageElement;
          img.src = `https://tse3.mm.bing.net/th?q=${encodeURIComponent(`${product.brand} ${product.name} product`)}&w=520&h=520&c=7&rs=1&p=0&o=5&pid=1.7`;
        }}
        style={{
          width: "100%",
          height: "100%",
          objectFit: "contain",
          padding: "24px",
          boxSizing: "border-box",
          transition: "all 0.5s ease",
          opacity: loaded ? 1 : 0,
          zIndex: 2,
        }}
        onMouseEnter={(e) => ((e.currentTarget as HTMLElement).style.transform = "scale(1.04)")}
        onMouseLeave={(e) => ((e.currentTarget as HTMLElement).style.transform = "scale(1)")}
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

export default function ProductDetailPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = use(params);
  const product = PRODUCTS.find((p) => p.id === id);
  if (!product) notFound();

  const [qty, setQty] = useState(1);
  const [cartState, setCartState] = useState<"idle" | "added">("idle");
  const [activeCategory, setActiveCategory] = useState("all");
  const { addItem, toggleWishlist, wishlist } = useCartStore();
  const { showToast } = useToast();
  const isWishlisted = wishlist.includes(product.id);
  const discount = getDiscountPercent(product.price, product.mrp);

  const related = PRODUCTS.filter(
    (p) => p.category === product.category && p.id !== product.id
  ).slice(0, 4);

  const handleAddToCart = () => {
    for (let i = 0; i < qty; i++) addItem(product);
    setCartState("added");
    showToast(`${product.name} ×${qty} added to cart 🛒`);
    setTimeout(() => setCartState("idle"), 2000);
  };

  return (
    <>
      <Ticker />
      <Header activeCategory={activeCategory} onCategoryChange={setActiveCategory} />

      <main style={{ minHeight: "80vh", background: "#FAFAF7" }}>
        <div className="max-w-screen" style={{ padding: "32px 24px" }}>

          {/* Breadcrumb */}
          <div style={{ display: "flex", alignItems: "center", gap: "8px", marginBottom: "28px" }}>
            <Link
              href="/"
              style={{
                display: "flex", alignItems: "center", gap: "6px",
                color: "#6b7280", textDecoration: "none", fontSize: "13.5px",
                fontFamily: "Satoshi, sans-serif", fontWeight: 600,
                transition: "color 0.2s",
              }}
              onMouseEnter={(e) => ((e.currentTarget as HTMLElement).style.color = "#2D6A4F")}
              onMouseLeave={(e) => ((e.currentTarget as HTMLElement).style.color = "#6b7280")}
            >
              <ArrowLeft size={14} /> Home
            </Link>
            <span style={{ color: "#D1D5DB", fontSize: "13px" }}>›</span>
            <Link
              href="/products"
              style={{ color: "#6b7280", textDecoration: "none", fontSize: "13.5px", fontFamily: "Satoshi, sans-serif", fontWeight: 600 }}
            >
              Products
            </Link>
            <span style={{ color: "#D1D5DB", fontSize: "13px" }}>›</span>
            <span style={{ color: "#0a0a0a", fontSize: "13.5px", fontFamily: "Satoshi, sans-serif", fontWeight: 600 }}>
              {product.name}
            </span>
          </div>

          {/* Product section */}
          <div
            style={{
              display: "grid",
              gridTemplateColumns: "1fr 1fr",
              gap: "52px",
              marginBottom: "64px",
            }}
          >
            {/* Left — Image */}
            <div>
              <div
                style={{
                  position: "relative",
                  borderRadius: "24px",
                  overflow: "hidden",
                  height: "440px",
                  background: "white",
                  border: "1px solid #E8E4DC",
                }}
              >
                <ProductHeroImage key={product.id} product={product} />
                {product.badge && BADGE_STYLES[product.badge] && (
                  <span
                    style={{
                      position: "absolute", top: "18px", left: "18px",
                      background: BADGE_STYLES[product.badge].bg,
                      color: BADGE_STYLES[product.badge].color,
                      fontSize: "12px", fontWeight: 700, fontFamily: "Satoshi, sans-serif",
                      padding: "5px 12px", borderRadius: "8px",
                    }}
                  >
                    {product.badge}
                  </span>
                )}
                {discount > 0 && (
                  <span
                    style={{
                      position: "absolute",
                      top: product.badge ? "52px" : "18px",
                      left: "18px",
                      background: "#FFF3E0", color: "#E9A23B",
                      fontSize: "12px", fontWeight: 700, fontFamily: "Satoshi, sans-serif",
                      padding: "5px 12px", borderRadius: "8px",
                    }}
                  >
                    {discount}% OFF
                  </span>
                )}
              </div>
            </div>

            {/* Right — Details */}
            <div style={{ display: "flex", flexDirection: "column", gap: "20px" }}>
              {/* Brand */}
              <span style={{
                fontSize: "11px", fontWeight: 700, color: "#2D6A4F",
                fontFamily: "Satoshi, sans-serif", textTransform: "uppercase", letterSpacing: "0.1em",
              }}>
                {product.brand}
              </span>

              {/* Name */}
              <h1
                className="font-display"
                style={{
                  fontSize: "clamp(24px, 3vw, 34px)", fontWeight: 900,
                  letterSpacing: "-1px", color: "#0a0a0a", lineHeight: 1.1, margin: 0,
                }}
              >
                {product.name}
              </h1>

              {/* Stars */}
              <div style={{ display: "flex", alignItems: "center", gap: "8px" }}>
                <div style={{ display: "flex", gap: "2px" }}>
                  {[1, 2, 3, 4, 5].map((s) => (
                    <svg key={s} width="14" height="14" viewBox="0 0 24 24"
                      fill={s <= Math.round(product.rating) ? "#F59E0B" : "#E5E7EB"}>
                      <polygon points="12,2 15.09,8.26 22,9.27 17,14.14 18.18,21.02 12,17.77 5.82,21.02 7,14.14 2,9.27 8.91,8.26" />
                    </svg>
                  ))}
                </div>
                <span style={{ fontSize: "14px", fontWeight: 700, color: "#0a0a0a", fontFamily: "Satoshi, sans-serif" }}>
                  {product.rating}
                </span>
                <span style={{ fontSize: "13px", color: "#6b7280", fontFamily: "Satoshi, sans-serif" }}>
                  ({product.reviews.toLocaleString()} reviews)
                </span>
              </div>

              {/* Price */}
              <div style={{ display: "flex", alignItems: "baseline", gap: "14px" }}>
                <span className="font-display" style={{ fontSize: "38px", fontWeight: 900, color: "#0a0a0a", letterSpacing: "-1px" }}>
                  ₹{product.price}
                </span>
                {product.mrp > product.price && (
                  <>
                    <span style={{ fontSize: "20px", color: "#9CA3AF", textDecoration: "line-through", fontFamily: "Satoshi, sans-serif" }}>
                      ₹{product.mrp}
                    </span>
                    <span style={{
                      background: "#D8F3DC", color: "#2D6A4F",
                      fontSize: "14px", fontWeight: 700, fontFamily: "Satoshi, sans-serif",
                      padding: "4px 12px", borderRadius: "8px",
                    }}>
                      Save ₹{product.mrp - product.price}
                    </span>
                  </>
                )}
              </div>

              {/* Size + delivery */}
              <div style={{ display: "flex", gap: "10px", flexWrap: "wrap" }}>
                <span style={{
                  background: "#F3F4F6", color: "#4B5563", fontSize: "13px",
                  fontWeight: 600, fontFamily: "Satoshi, sans-serif",
                  padding: "6px 14px", borderRadius: "8px",
                }}>
                  📦 {product.weight}
                </span>
                <span style={{
                  background: "#D8F3DC", color: "#2D6A4F", fontSize: "13px",
                  fontWeight: 700, fontFamily: "Satoshi, sans-serif",
                  padding: "6px 14px", borderRadius: "8px",
                  display: "flex", alignItems: "center", gap: "5px",
                }}>
                  <Clock size={13} /> {product.delivery} delivery
                </span>
              </div>

              {/* Feature pills */}
              <div
                style={{
                  display: "grid", gridTemplateColumns: "1fr 1fr 1fr",
                  gap: "10px", padding: "18px",
                  background: "white", borderRadius: "16px", border: "1px solid #E8E4DC",
                }}
              >
                {[
                  { icon: Truck, label: "Free above ₹499", color: "#2D6A4F" },
                  { icon: ShieldCheck, label: "100% Genuine", color: "#2563EB" },
                  { icon: RotateCcw, label: "Easy Returns", color: "#7C3AED" },
                ].map(({ icon: Icon, label, color }) => (
                  <div key={label} style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: "6px", textAlign: "center" }}>
                    <div style={{
                      width: "36px", height: "36px", borderRadius: "10px",
                      background: `${color}15`, display: "flex", alignItems: "center", justifyContent: "center",
                    }}>
                      <Icon size={17} color={color} />
                    </div>
                    <span style={{ fontSize: "11.5px", color: "#6b7280", fontFamily: "Satoshi, sans-serif", fontWeight: 600 }}>
                      {label}
                    </span>
                  </div>
                ))}
              </div>

              {/* Qty + Add to cart */}
              <div style={{ display: "flex", gap: "12px", alignItems: "center" }}>
                {/* Qty selector */}
                <div style={{
                  display: "flex", alignItems: "center",
                  border: "1.5px solid #E8E4DC", borderRadius: "12px", overflow: "hidden",
                }}>
                  <button
                    onClick={() => setQty((q) => Math.max(1, q - 1))}
                    style={{
                      width: "42px", height: "48px", border: "none", background: "#F9F9F9",
                      cursor: "pointer", display: "flex", alignItems: "center", justifyContent: "center",
                      transition: "background 0.15s",
                    }}
                    onMouseEnter={(e) => ((e.currentTarget as HTMLElement).style.background = "#E8E4DC")}
                    onMouseLeave={(e) => ((e.currentTarget as HTMLElement).style.background = "#F9F9F9")}
                  >
                    <Minus size={15} />
                  </button>
                  <span style={{
                    padding: "0 20px", fontSize: "16px", fontWeight: 800,
                    fontFamily: "Cabinet Grotesk, sans-serif", minWidth: "52px", textAlign: "center",
                  }}>
                    {qty}
                  </span>
                  <button
                    onClick={() => setQty((q) => q + 1)}
                    style={{
                      width: "42px", height: "48px", border: "none", background: "#F9F9F9",
                      cursor: "pointer", display: "flex", alignItems: "center", justifyContent: "center",
                    }}
                    onMouseEnter={(e) => ((e.currentTarget as HTMLElement).style.background = "#E8E4DC")}
                    onMouseLeave={(e) => ((e.currentTarget as HTMLElement).style.background = "#F9F9F9")}
                  >
                    <Plus size={15} />
                  </button>
                </div>

                {/* Add to Cart */}
                <button
                  onClick={handleAddToCart}
                  style={{
                    flex: 1, padding: "14px 24px",
                    background: cartState === "added"
                      ? "linear-gradient(135deg, #2D6A4F, #40916C)"
                      : "#0a0a0a",
                    color: "white", border: "none", borderRadius: "14px",
                    fontFamily: "Cabinet Grotesk, sans-serif", fontWeight: 800, fontSize: "15px",
                    cursor: "pointer", display: "flex", alignItems: "center",
                    justifyContent: "center", gap: "8px",
                    transition: "all 0.3s cubic-bezier(0.4,0,0.2,1)",
                    transform: cartState === "added" ? "scale(1.02)" : "scale(1)",
                  }}
                  onMouseEnter={(e) => {
                    if (cartState === "idle") (e.currentTarget as HTMLElement).style.background = "#2D6A4F";
                  }}
                  onMouseLeave={(e) => {
                    if (cartState === "idle") (e.currentTarget as HTMLElement).style.background = "#0a0a0a";
                  }}
                >
                  {cartState === "added" ? (
                    <><Check size={17} /> Added to Cart!</>
                  ) : (
                    <><ShoppingCart size={17} /> Add {qty > 1 ? `×${qty}` : ""} to Cart</>
                  )}
                </button>

                {/* Wishlist */}
                <button
                  onClick={() => {
                    toggleWishlist(product.id);
                    showToast(isWishlisted ? "Removed from wishlist" : `${product.name} wishlisted ❤️`);
                  }}
                  style={{
                    width: "50px", height: "50px", borderRadius: "14px",
                    border: "1.5px solid #E8E4DC", background: "white",
                    display: "flex", alignItems: "center", justifyContent: "center",
                    cursor: "pointer", transition: "all 0.2s", flexShrink: 0,
                  }}
                  onMouseEnter={(e) => ((e.currentTarget as HTMLElement).style.borderColor = "#DC2626")}
                  onMouseLeave={(e) => ((e.currentTarget as HTMLElement).style.borderColor = "#E8E4DC")}
                >
                  <Heart
                    size={20}
                    fill={isWishlisted ? "#DC2626" : "none"}
                    color={isWishlisted ? "#DC2626" : "#9CA3AF"}
                  />
                </button>
              </div>

              {/* Total for qty > 1 */}
              {qty > 1 && (
                <p style={{ fontSize: "14px", color: "#6b7280", fontFamily: "Satoshi, sans-serif" }}>
                  Total:{" "}
                  <strong style={{ color: "#0a0a0a", fontFamily: "Cabinet Grotesk, sans-serif", fontWeight: 800, fontSize: "16px" }}>
                    ₹{(product.price * qty).toLocaleString()}
                  </strong>
                </p>
              )}
            </div>
          </div>

          {/* Related products */}
          {related.length > 0 && (
            <div>
              <div style={{ marginBottom: "24px" }}>
                <span style={{
                  fontSize: "12px", fontWeight: 700, color: "#2D6A4F",
                  textTransform: "uppercase", letterSpacing: "0.1em",
                  fontFamily: "Satoshi, sans-serif",
                }}>
                  From the same category
                </span>
                <h2 className="font-display" style={{
                  fontSize: "24px", fontWeight: 800, letterSpacing: "-0.5px",
                  color: "#0a0a0a", marginTop: "4px",
                }}>
                  You might also like
                </h2>
              </div>
              <div style={{
                display: "grid",
                gridTemplateColumns: "repeat(auto-fill, minmax(200px, 1fr))",
                gap: "18px",
              }}>
                {related.map((p) => <ProductCard key={p.id} product={p} />)}
              </div>
            </div>
          )}
        </div>
      </main>

      <Footer />
    </>
  );
}
