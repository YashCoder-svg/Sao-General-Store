"use client";

import { useEffect, useRef, useState } from "react";
import { ArrowRight } from "lucide-react";
import { ProductCard } from "@/components/product/ProductCard";
import { Product, PRODUCTS } from "@/lib/products";

function SkeletonCard() {
  return (
    <div
      style={{
        background: "white",
        borderRadius: "20px",
        border: "1px solid #E8E4DC",
        overflow: "hidden",
      }}
    >
      <div className="skeleton" style={{ height: "190px" }} />
      <div style={{ padding: "14px" }}>
        <div className="skeleton" style={{ height: "12px", width: "40%", marginBottom: "8px" }} />
        <div className="skeleton" style={{ height: "16px", width: "85%", marginBottom: "4px" }} />
        <div className="skeleton" style={{ height: "16px", width: "65%", marginBottom: "12px" }} />
        <div className="skeleton" style={{ height: "32px", borderRadius: "10px" }} />
      </div>
    </div>
  );
}

export function ProductGrid({ category, searchQuery = "" }: { category: string, searchQuery?: string }) {
  const [loading, setLoading] = useState(true);
  const [products, setProducts] = useState<Product[]>([]);
  const gridRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    let active = true;
    const frame = requestAnimationFrame(() => {
      if (active) setLoading(true);
    });
    const t = setTimeout(() => {
      let nextProducts = category === "all" 
        ? PRODUCTS 
        : PRODUCTS.filter(p => p.category === category);

      if (searchQuery) {
        const query = searchQuery.toLowerCase();
        nextProducts = nextProducts.filter(p => 
          p.name.toLowerCase().includes(query) ||
          p.brand.toLowerCase().includes(query) ||
          p.category.toLowerCase().includes(query)
        );
      }

      nextProducts = [...nextProducts].sort((a, b) => {
        if (b.rating !== a.rating) {
          return b.rating - a.rating;
        }
        return a.name.localeCompare(b.name);
      });

      setProducts(nextProducts);
      setLoading(false);
    }, 600);
    return () => {
      active = false;
      cancelAnimationFrame(frame);
      clearTimeout(t);
    };
  }, [category, searchQuery]);

  // Scroll reveal via IntersectionObserver
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("visible");
          }
        });
      },
      { threshold: 0.1 }
    );

    const reveals = document.querySelectorAll(".reveal");
    reveals.forEach((el) => observer.observe(el));
    return () => observer.disconnect();
  }, [products]);

  const catLabel =
    category === "all"
      ? "All Products"
      : category
          .split("-")
          .map((w) => w.charAt(0).toUpperCase() + w.slice(1))
          .join(" & ");

  return (
    <section style={{ padding: "64px 0" }}>
      <div className="max-w-screen">
        {/* Section header */}
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "flex-end",
            marginBottom: "32px",
          }}
        >
          <div>
            <span
              style={{
                fontSize: "12px",
                fontWeight: 700,
                color: "#2D6A4F",
                textTransform: "uppercase",
                letterSpacing: "0.1em",
                fontFamily: "Satoshi, sans-serif",
              }}
            >
              {loading ? "Loading..." : `${products.length} items`}
            </span>
            <h2
              className="font-display"
              style={{
                fontSize: "28px",
                fontWeight: 800,
                letterSpacing: "-0.5px",
                color: "#0a0a0a",
                marginTop: "4px",
              }}
            >
              {catLabel}
            </h2>
          </div>
          <button
            style={{
              display: "flex",
              alignItems: "center",
              gap: "6px",
              background: "transparent",
              border: "1.5px solid #E8E4DC",
              borderRadius: "12px",
              padding: "8px 18px",
              fontFamily: "Satoshi, sans-serif",
              fontWeight: 600,
              fontSize: "13.5px",
              cursor: "pointer",
              color: "#1a1a1a",
              transition: "all 0.2s",
            }}
            onMouseEnter={(e) => {
              const el = e.currentTarget as HTMLElement;
              el.style.borderColor = "#2D6A4F";
              el.style.color = "#2D6A4F";
            }}
            onMouseLeave={(e) => {
              const el = e.currentTarget as HTMLElement;
              el.style.borderColor = "#E8E4DC";
              el.style.color = "#1a1a1a";
            }}
          >
            View All <ArrowRight size={14} />
          </button>
        </div>

        {/* Grid */}
        {products.length === 0 && !loading ? (
          <div style={{ textAlign: "center", padding: "80px 0", background: "white", borderRadius: "20px", border: "1px dashed #E8E4DC" }}>
            <div style={{ fontSize: "40px", marginBottom: "16px" }}>🔍</div>
            <h3 style={{ fontSize: "18px", fontWeight: 700, color: "#1a1a1a" }}>No products found</h3>
            <p style={{ color: "#6b7280", fontSize: "14px", marginTop: "4px" }}>
              Try searching for something else or browse categories.
            </p>
          </div>
        ) : (
          <div
            ref={gridRef}
            style={{
              display: "grid",
              gridTemplateColumns: "repeat(auto-fill, minmax(200px, 1fr))",
              gap: "18px",
            }}
          >
            {loading
              ? Array.from({ length: 8 }).map((_, i) => (
                  <SkeletonCard key={i} />
                ))
              : products.map((product, i) => (
                  <div
                    key={product.id}
                    className="reveal"
                    style={{ transitionDelay: `${Math.min(i * 0.05, 0.4)}s` }}
                  >
                    <ProductCard product={product} />
                  </div>
                ))}
          </div>
        )}
      </div>
    </section>
  );
}
