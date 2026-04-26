"use client";

import { useCartStore } from "@/lib/store";
import { ShoppingBag, ArrowRight } from "lucide-react";
import { useEffect, useState } from "react";

export function FloatingCart() {
  const { items, subtotal } = useCartStore();
  const [mounted, setMounted] = useState(false);
  const [isBouncing, setIsBouncing] = useState(false);

  const total = subtotal();
  const itemCount = items.reduce((acc, item) => acc + item.quantity, 0);

  useEffect(() => {
    setMounted(true);
  }, []);

  useEffect(() => {
    if (itemCount > 0) {
      setIsBouncing(true);
      const timer = setTimeout(() => setIsBouncing(false), 400);
      return () => clearTimeout(timer);
    }
  }, [itemCount]);

  if (!mounted || itemCount === 0) return null;

  return (
    <div
      style={{
        position: "fixed",
        bottom: "24px",
        left: "50%",
        transform: "translateX(-50%)",
        zIndex: 50,
        width: "calc(100% - 32px)",
        maxWidth: "400px",
      }}
    >
      <button
        onClick={() => window.dispatchEvent(new CustomEvent("open-cart"))}
        style={{
          width: "100%",
          background: "#2D6A4F",
          color: "white",
          borderRadius: "16px",
          padding: "16px 20px",
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          boxShadow: "0 20px 40px rgba(45,106,79,0.4), 0 0 0 1px rgba(255,255,255,0.1)",
          border: "none",
          cursor: "pointer",
          transition: "all 0.3s cubic-bezier(0.4,0,0.2,1)",
          transform: isBouncing ? "scale(1.05)" : "scale(1)",
        }}
        onMouseEnter={(e) => {
          (e.currentTarget as HTMLElement).style.background = "#1b4332";
          (e.currentTarget as HTMLElement).style.transform = "translateX(-50%) scale(1.02)";
        }}
        onMouseLeave={(e) => {
          (e.currentTarget as HTMLElement).style.background = "#2D6A4F";
          (e.currentTarget as HTMLElement).style.transform = "translateX(-50%) scale(1)";
        }}
      >
        <div style={{ display: "flex", alignItems: "center", gap: "12px" }}>
          <div
            style={{
              background: "rgba(255,255,255,0.2)",
              width: "32px",
              height: "32px",
              borderRadius: "8px",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            <ShoppingBag size={18} />
          </div>
          <div style={{ textAlign: "left" }}>
            <p style={{ fontSize: "12px", fontWeight: 600, opacity: 0.8, margin: 0, lineHeight: 1 }}>
              {itemCount} {itemCount === 1 ? "Item" : "Items"}
            </p>
            <p style={{ fontSize: "16px", fontWeight: 800, margin: 0, lineHeight: 1.2 }}>
              ₹{(total || 0).toLocaleString()}
            </p>
          </div>
        </div>

        <div style={{ display: "flex", alignItems: "center", gap: "8px", fontWeight: 700, fontSize: "15px" }}>
          View Cart <ArrowRight size={18} />
        </div>
      </button>

      <style>{`
        @keyframes cartBounce {
          0%, 100% { transform: translateX(-50%) scale(1); }
          50% { transform: translateX(-50%) scale(1.05); }
        }
      `}</style>
    </div>
  );
}
