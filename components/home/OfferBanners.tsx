"use client";

import Image from "next/image";
import { ArrowRight } from "lucide-react";

const BANNERS = [
  {
    title: "Healthy Millets Collection",
    subtitle: "Ancient grains, modern nutrition",
    desc: "Discover oats, foxtail, quinoa & more. Sourced from certified organic farms.",
    cta: "Shop Millets",
    category: "millets",
    gradient: "linear-gradient(135deg, #1b4332 0%, #2D6A4F 50%, #40916C 100%)",
    // Photo: bowl of healthy grains / oats
    image: "https://images.unsplash.com/photo-1512621776951-a57141f2eefd?w=600&q=80&auto=format&fit=crop",
    badge: "✨ Superfood",
    badgeBg: "rgba(116,198,157,0.2)",
    badgeColor: "#74C69D",
  },
  {
    title: "Premium Spices & Masalas",
    subtitle: "Flavours of Chhattisgarh",
    desc: "Hand-ground spices, fresh turmeric, red chilli & authentic masalas.",
    cta: "Explore Spices",
    category: "spices",
    gradient: "linear-gradient(135deg, #78350f 0%, #92400e 50%, #b45309 100%)",
    // Photo: colourful Indian spices spread
    image: "https://images.unsplash.com/photo-1532336414038-cf19250c5757?w=600&q=80&auto=format&fit=crop",
    badge: "🌶️ Fresh Ground",
    badgeBg: "rgba(251,191,36,0.15)",
    badgeColor: "#FCD34D",
  },
  {
    title: "Fresh Dairy & Bakery",
    subtitle: "Delivered by 7 AM daily",
    desc: "Amul milk, farm eggs, paneer, butter, breads — straight from the source.",
    cta: "Shop Fresh",
    category: "dairy",
    gradient: "linear-gradient(135deg, #1e3a5f 0%, #1d4ed8 50%, #3b82f6 100%)",
    // Photo: fresh dairy products milk pouring
    image: "https://images.unsplash.com/photo-1550583724-b2692b85b150?w=600&q=80&auto=format&fit=crop",
    badge: "🥛 Fresh Today",
    badgeBg: "rgba(147,197,253,0.2)",
    badgeColor: "#93C5FD",
  },
];

export function OfferBanners() {
  const scrollToProducts = (category: string) => {
    // Dispatch a custom event that app/page.tsx can listen to
    window.dispatchEvent(new CustomEvent("filter-category", { detail: category }));
    document.getElementById("products-section")?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <section style={{ padding: "0 0 64px" }}>
      <div className="max-w-screen">
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fit, minmax(320px, 1fr))",
            gap: "20px",
          }}
        >
          {BANNERS.map((b, i) => (
            <div
              key={b.title}
              className="reveal"
              style={{
                position: "relative",
                borderRadius: "24px",
                overflow: "hidden",
                padding: "36px",
                background: b.gradient,
                minHeight: "220px",
                display: "flex",
                flexDirection: "column",
                justifyContent: "space-between",
                cursor: "pointer",
                transition: "transform 0.3s cubic-bezier(0.4,0,0.2,1), box-shadow 0.3s",
                animationDelay: `${i * 0.1}s`,
              }}
              onMouseEnter={(e) => {
                const el = e.currentTarget as HTMLElement;
                el.style.transform = "translateY(-6px)";
                el.style.boxShadow = "0 24px 60px rgba(0,0,0,0.2)";
              }}
              onMouseLeave={(e) => {
                const el = e.currentTarget as HTMLElement;
                el.style.transform = "translateY(0)";
                el.style.boxShadow = "none";
              }}
            >
              {/* Background image */}
              <Image
                src={b.image}
                alt={b.title}
                fill
                style={{
                  objectFit: "cover",
                  opacity: 0.18,
                  mixBlendMode: "luminosity",
                }}
              />

              {/* Content */}
              <div style={{ position: "relative", zIndex: 1 }}>
                <span
                  style={{
                    display: "inline-block",
                    background: b.badgeBg,
                    color: b.badgeColor,
                    fontSize: "12px",
                    fontWeight: 700,
                    fontFamily: "Satoshi, sans-serif",
                    padding: "4px 12px",
                    borderRadius: "100px",
                    marginBottom: "16px",
                    border: `1px solid ${b.badgeColor}40`,
                  }}
                >
                  {b.badge}
                </span>
                <p
                  style={{
                    fontSize: "12px",
                    fontWeight: 600,
                    color: "rgba(255,255,255,0.6)",
                    fontFamily: "Satoshi, sans-serif",
                    textTransform: "uppercase",
                    letterSpacing: "0.08em",
                    marginBottom: "8px",
                  }}
                >
                  {b.subtitle}
                </p>
                <h3
                  style={{
                    fontFamily: "Cabinet Grotesk, sans-serif",
                    fontWeight: 900,
                    fontSize: "26px",
                    letterSpacing: "-0.5px",
                    color: "white",
                    marginBottom: "10px",
                  }}
                >
                  {b.title}
                </h3>
                <p
                  style={{
                    fontSize: "14px",
                    color: "rgba(255,255,255,0.65)",
                    fontFamily: "Satoshi, sans-serif",
                    lineHeight: 1.5,
                    marginBottom: "24px",
                    maxWidth: "280px",
                  }}
                >
                  {b.desc}
                </p>
                <button
                  onClick={() => scrollToProducts(b.category)}
                  style={{
                    display: "inline-flex",
                    alignItems: "center",
                    gap: "8px",
                    background: "white",
                    color: "#0a0a0a",
                    border: "none",
                    borderRadius: "12px",
                    padding: "11px 22px",
                    fontFamily: "Satoshi, sans-serif",
                    fontWeight: 700,
                    fontSize: "14px",
                    cursor: "pointer",
                    transition: "transform 0.2s, box-shadow 0.2s",
                  }}
                  onMouseEnter={(e) => {
                    const el = e.currentTarget as HTMLElement;
                    el.style.transform = "scale(1.04)";
                  }}
                  onMouseLeave={(e) => {
                    const el = e.currentTarget as HTMLElement;
                    el.style.transform = "scale(1)";
                  }}
                >
                  {b.cta} <ArrowRight size={15} />
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
