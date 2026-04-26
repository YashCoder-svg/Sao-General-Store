"use client";

import { useState, useEffect } from "react";
import { Ticker } from "@/components/ui/Ticker";
import { Header } from "@/components/layout/Header";
import { CategoryNav } from "@/components/layout/CategoryNav";
import { Footer } from "@/components/layout/Footer";
import { HeroSection } from "@/components/home/HeroSection";
import { TrustBar } from "@/components/home/TrustBar";
import { CategoryGrid } from "@/components/home/CategoryGrid";
import { ProductGrid } from "@/components/home/ProductGrid";
import { OfferBanners } from "@/components/home/OfferBanners";

export default function HomePage() {
  const [activeCategory, setActiveCategory] = useState("all");
  const [searchQuery, setSearchQuery] = useState("");

  // Scroll reveal setup
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("visible");
          }
        });
      },
      { threshold: 0.08, rootMargin: "0px 0px -40px 0px" }
    );
    const timer = setTimeout(() => {
      document.querySelectorAll(".reveal").forEach((el) => observer.observe(el));
    }, 500);
    return () => { observer.disconnect(); clearTimeout(timer); };
  }, [activeCategory]);

  useEffect(() => {
    const handleFilter = (e: any) => {
      setActiveCategory(e.detail);
      setSearchQuery("");
    };
    window.addEventListener("filter-category", handleFilter);
    return () => window.removeEventListener("filter-category", handleFilter);
  }, []);

  const scrollToProducts = () => {
    document.getElementById("products-section")?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <>
      <Ticker />
      <Header 
        activeCategory={activeCategory} 
        onCategoryChange={setActiveCategory} 
        searchQuery={searchQuery}
        onSearchChange={setSearchQuery}
      />
      <CategoryNav active={activeCategory} onChange={(cat) => {
        setActiveCategory(cat);
        setSearchQuery(""); // Clear search when category changes
      }} />

      <main>
        <HeroSection onShopNow={scrollToProducts} />
        <TrustBar />
        <CategoryGrid onSelect={(id) => { setActiveCategory(id); scrollToProducts(); }} />

        <div id="products-section">
          <ProductGrid category={activeCategory} searchQuery={searchQuery} />
        </div>

        <OfferBanners />
      </main>

      <Footer />
    </>
  );
}
