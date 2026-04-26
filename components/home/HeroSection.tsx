"use client";

import Image from "next/image";
import { useEffect, useState } from "react";
import { ArrowRight, Leaf } from "lucide-react";

const HERO_PHOTOS = [
  "https://images.unsplash.com/photo-1542838132-92c53300491e?w=600&q=80",
  "https://images.unsplash.com/photo-1598170845058-32b9d6a5da37?w=600&q=80",
  "https://images.unsplash.com/photo-1506368249639-73a05d6f6488?w=600&q=80",
  "https://images.unsplash.com/photo-1604719312566-8912e9227c6a?w=600&q=80",
];

const STATS = [
  { value: "2400+", label: "Products" },
  { value: "30 Min", label: "Delivery" },
  { value: "100%", label: "Quality" },
  { value: "Mandi", label: "Prices" },
];

export function HeroSection({ onShopNow }: { onShopNow?: () => void }) {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    const t = setTimeout(() => setMounted(true), 100);
    return () => clearTimeout(t);
  }, []);

  return (
    <section
      style={{
        position: "relative",
        background: "#0a0a0a",
        overflow: "hidden",
        minHeight: "580px",
        display: "flex",
        alignItems: "center",
      }}
    >
      {/* Background photo with zoom */}
      <div
        style={{
          position: "absolute",
          inset: 0,
          animation: "heroZoom 8s ease-in-out infinite",
        }}
      >
        <Image
          src="https://images.unsplash.com/photo-1542838132-92c53300491e?w=1600&q=80"
          alt="Kirana grocery store"
          fill
          sizes="100vw"
          style={{ objectFit: "cover", opacity: 0.35 }}
          priority
        />
      </div>

      {/* Grain texture overlay */}
      <div
        style={{
          position: "absolute",
          inset: 0,
          backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.65' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)' opacity='0.08'/%3E%3C/svg%3E")`,
          opacity: 0.5,
          pointerEvents: "none",
        }}
      />

      {/* Gradient overlays */}
      <div
        style={{
          position: "absolute",
          inset: 0,
          background:
            "linear-gradient(105deg, rgba(10,10,10,0.92) 0%, rgba(10,10,10,0.6) 50%, rgba(10,10,10,0.2) 100%)",
        }}
      />

      {/* Floating orbs */}
      <div
        style={{
          position: "absolute",
          width: "400px",
          height: "400px",
          borderRadius: "50%",
          background: "radial-gradient(circle, rgba(45,106,79,0.18) 0%, transparent 70%)",
          top: "-100px",
          right: "10%",
          animation: "float 8s ease-in-out infinite",
          pointerEvents: "none",
        }}
      />
      <div
        style={{
          position: "absolute",
          width: "300px",
          height: "300px",
          borderRadius: "50%",
          background: "radial-gradient(circle, rgba(233,162,59,0.12) 0%, transparent 70%)",
          bottom: "-60px",
          left: "30%",
          animation: "float2 8s ease-in-out infinite 2s",
          pointerEvents: "none",
        }}
      />
      <div
        style={{
          position: "absolute",
          width: "250px",
          height: "250px",
          borderRadius: "50%",
          background: "radial-gradient(circle, rgba(116,198,157,0.1) 0%, transparent 70%)",
          top: "30%",
          right: "35%",
          animation: "float3 8s ease-in-out infinite 4s",
          pointerEvents: "none",
        }}
      />

      {/* Content */}
      <div
        className="max-w-screen"
        style={{
          position: "relative",
          zIndex: 2,
          display: "grid",
          gridTemplateColumns: "1fr 420px",
          gap: "60px",
          alignItems: "center",
          padding: "80px 24px",
        }}
      >
        {/* Left — Text */}
        <div>
          {/* Chip */}
          <div
            style={{
              display: "inline-flex",
              alignItems: "center",
              gap: "8px",
              background: "rgba(45,106,79,0.2)",
              border: "1px solid rgba(116,198,157,0.3)",
              borderRadius: "100px",
              padding: "6px 16px 6px 10px",
              marginBottom: "28px",
              animation: mounted ? "fadeUp 0.6s ease 0.1s both" : "none",
              backdropFilter: "blur(8px)",
            }}
          >
            <span
              style={{
                width: "8px",
                height: "8px",
                borderRadius: "50%",
                background: "#74C69D",
                display: "inline-block",
                animation: "chipPulse 2s ease-in-out infinite",
              }}
            />
            <span
              style={{
                fontSize: "12.5px",
                fontWeight: 600,
                color: "#74C69D",
                fontFamily: "Satoshi, sans-serif",
                letterSpacing: "0.04em",
              }}
            >
              Raigarh&apos;s Finest Kirana
            </span>
          </div>

          {/* H1 */}
          <h1
            style={{
              fontFamily: "Cabinet Grotesk, sans-serif",
              fontWeight: 900,
              fontSize: "clamp(36px, 4.5vw, 62px)",
              lineHeight: 1.05,
              letterSpacing: "-2px",
              color: "white",
              marginBottom: "22px",
              animation: mounted ? "fadeUp 0.6s ease 0.2s both" : "none",
            }}
          >
            Fresh Groceries,
            <br />
            <span style={{ color: "#E9A23B" }}>Delivered Fast.</span>
          </h1>

          {/* Subtitle */}
          <p
            style={{
              fontSize: "16.5px",
              color: "rgba(255,255,255,0.65)",
              fontFamily: "Satoshi, sans-serif",
              lineHeight: 1.7,
              maxWidth: "460px",
              marginBottom: "36px",
              animation: mounted ? "fadeUp 0.6s ease 0.3s both" : "none",
            }}
          >
            Mandi-fresh prices on rice, dal, oils, spices & more — delivered in
            30 minutes to your doorstep in Raigarh.
          </p>

          {/* CTAs */}
          <div
            style={{
              display: "flex",
              gap: "14px",
              flexWrap: "wrap",
              marginBottom: "44px",
              animation: mounted ? "fadeUp 0.6s ease 0.4s both" : "none",
            }}
          >
            <button
              onClick={onShopNow}
              style={{
                display: "flex",
                alignItems: "center",
                gap: "8px",
                background: "#E9A23B",
                color: "#0a0a0a",
                border: "none",
                borderRadius: "14px",
                padding: "14px 28px",
                fontFamily: "Satoshi, sans-serif",
                fontWeight: 700,
                fontSize: "15px",
                cursor: "pointer",
                transition: "all 0.28s cubic-bezier(0.4,0,0.2,1)",
              }}
              onMouseEnter={(e) => {
                const el = e.currentTarget as HTMLElement;
                el.style.transform = "translateY(-3px)";
                el.style.boxShadow = "0 10px 30px rgba(233,162,59,0.4)";
              }}
              onMouseLeave={(e) => {
                const el = e.currentTarget as HTMLElement;
                el.style.transform = "translateY(0)";
                el.style.boxShadow = "none";
              }}
            >
              Shop Now <ArrowRight size={17} />
            </button>

            <button
              style={{
                display: "flex",
                alignItems: "center",
                gap: "8px",
                background: "transparent",
                color: "white",
                border: "1.5px solid rgba(255,255,255,0.3)",
                borderRadius: "14px",
                padding: "14px 24px",
                fontFamily: "Satoshi, sans-serif",
                fontWeight: 600,
                fontSize: "15px",
                cursor: "pointer",
                transition: "all 0.28s",
              }}
              onMouseEnter={(e) => {
                const el = e.currentTarget as HTMLElement;
                el.style.borderColor = "#74C69D";
                el.style.color = "#74C69D";
              }}
              onMouseLeave={(e) => {
                const el = e.currentTarget as HTMLElement;
                el.style.borderColor = "rgba(255,255,255,0.3)";
                el.style.color = "white";
              }}
            >
              <Leaf size={16} />
              View Millets
            </button>
          </div>

          {/* Stat pills */}
          <div
            style={{
              display: "flex",
              gap: "10px",
              flexWrap: "wrap",
              animation: mounted ? "fadeUp 0.6s ease 0.5s both" : "none",
            }}
          >
            {STATS.map((s) => (
              <div
                key={s.label}
                style={{
                  background: "rgba(255,255,255,0.07)",
                  backdropFilter: "blur(12px)",
                  border: "1px solid rgba(255,255,255,0.12)",
                  borderRadius: "100px",
                  padding: "8px 18px",
                  display: "flex",
                  flexDirection: "column",
                  alignItems: "center",
                }}
              >
                <span
                  style={{
                    fontFamily: "Cabinet Grotesk, sans-serif",
                    fontWeight: 800,
                    fontSize: "17px",
                    color: "white",
                    lineHeight: 1,
                  }}
                >
                  {s.value}
                </span>
                <span
                  style={{
                    fontSize: "11px",
                    color: "rgba(255,255,255,0.5)",
                    fontFamily: "Satoshi, sans-serif",
                    fontWeight: 500,
                  }}
                >
                  {s.label}
                </span>
              </div>
            ))}
          </div>
        </div>

        {/* Right — 2x2 photo grid */}
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "1fr 1fr",
            gridTemplateRows: "1fr 1fr",
            gap: "12px",
            animation: mounted ? "slideRight 0.8s ease 0.4s both" : "none",
          }}
        >
          {HERO_PHOTOS.map((src, i) => (
            <div
              key={i}
              style={{
                borderRadius: i === 0 ? "20px 20px 4px 20px" : i === 1 ? "20px 20px 20px 4px" : i === 2 ? "20px 4px 4px 20px" : "4px 20px 20px 4px",
                overflow: "hidden",
                height: i === 0 ? "200px" : "160px",
                position: "relative",
              }}
            >
              <Image
                src={src}
                alt={`Food ${i + 1}`}
                fill
                sizes="(max-width: 768px) 50vw, 200px"
                style={{
                  objectFit: "cover",
                  transition: "transform 0.5s ease",
                }}
                onMouseEnter={(e) =>
                  ((e.target as HTMLElement).style.transform = "scale(1.08)")
                }
                onMouseLeave={(e) =>
                  ((e.target as HTMLElement).style.transform = "scale(1)")
                }
              />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
