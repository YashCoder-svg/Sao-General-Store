"use client";

import { useState } from "react";
import { Ticker } from "@/components/ui/Ticker";
import { Header } from "@/components/layout/Header";
import { CategoryNav } from "@/components/layout/CategoryNav";
import { Footer } from "@/components/layout/Footer";
import { ProductGrid } from "@/components/home/ProductGrid";

export default function ProductsPage() {
  const [activeCategory, setActiveCategory] = useState("all");

  return (
    <>
      <Ticker />
      <Header activeCategory={activeCategory} onCategoryChange={setActiveCategory} />
      <CategoryNav active={activeCategory} onChange={setActiveCategory} />
      <main style={{ minHeight: "calc(100vh - 200px)" }}>
        <div style={{ padding: "40px 0 0" }}>
          <div className="max-w-screen">
            <h1
              className="font-display"
              style={{
                fontSize: "clamp(28px, 4vw, 42px)",
                fontWeight: 900,
                letterSpacing: "-1.5px",
                color: "#0a0a0a",
                marginBottom: "8px",
              }}
            >
              All Products
            </h1>
            <p style={{ fontSize: "15px", color: "#6b7280", fontFamily: "Satoshi, sans-serif" }}>
              2400+ fresh groceries at mandi prices · 30-min delivery
            </p>
          </div>
        </div>
        <ProductGrid category={activeCategory} />
      </main>
      <Footer />
    </>
  );
}
