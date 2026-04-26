"use client";

import { Zap, ShieldCheck, Award, CreditCard } from "lucide-react";

const TRUST_ITEMS = [
  {
    icon: Zap,
    iconBg: "#D8F3DC",
    iconColor: "#2D6A4F",
    title: "30-Min Delivery",
    desc: "Lightning-fast delivery straight from our local warehouse to your door.",
  },
  {
    icon: Award,
    iconBg: "#FEF3C7",
    iconColor: "#D97706",
    title: "Premium Quality",
    desc: "Handpicked products sourced directly from trusted farmers & brands.",
  },
  {
    icon: ShieldCheck,
    iconBg: "#DBEAFE",
    iconColor: "#2563EB",
    title: "100% Genuine",
    desc: "Every product is verified for authenticity. No compromises, ever.",
  },
  {
    icon: CreditCard,
    iconBg: "#EDE9FE",
    iconColor: "#7C3AED",
    title: "Secure Payments",
    desc: "UPI, Cards, Net Banking & COD — pay your way, safely & securely.",
  },
];

export function TrustBar() {
  return (
    <section
      style={{
        background: "white",
        borderBottom: "1px solid #E8E4DC",
      }}
    >
      <div
        className="max-w-screen"
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fit, minmax(220px, 1fr))",
          gap: "0",
          padding: "0",
        }}
      >
        {TRUST_ITEMS.map((item, i) => {
          const Icon = item.icon;
          return (
            <div
              key={item.title}
              className="reveal"
              style={{
                display: "flex",
                alignItems: "flex-start",
                gap: "16px",
                padding: "28px 28px",
                borderRight:
                  i < TRUST_ITEMS.length - 1 ? "1px solid #E8E4DC" : "none",
                transition: "background 0.2s",
              }}
              onMouseEnter={(e) =>
                ((e.currentTarget as HTMLElement).style.background = "#FAFAF7")
              }
              onMouseLeave={(e) =>
                ((e.currentTarget as HTMLElement).style.background = "white")
              }
            >
              <div
                style={{
                  width: "46px",
                  height: "46px",
                  borderRadius: "12px",
                  background: item.iconBg,
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  flexShrink: 0,
                }}
              >
                <Icon size={22} color={item.iconColor} />
              </div>
              <div>
                <h4
                  style={{
                    fontFamily: "Cabinet Grotesk, sans-serif",
                    fontWeight: 800,
                    fontSize: "15px",
                    color: "#0a0a0a",
                    marginBottom: "4px",
                  }}
                >
                  {item.title}
                </h4>
                <p
                  style={{
                    fontSize: "13px",
                    color: "#6b7280",
                    fontFamily: "Satoshi, sans-serif",
                    lineHeight: 1.55,
                  }}
                >
                  {item.desc}
                </p>
              </div>
            </div>
          );
        })}
      </div>
    </section>
  );
}
