"use client";

import { useEffect, useRef } from "react";

const MESSAGES = [
  "🚀 FREE Express Delivery",
  "🌾 Mandi Fresh Grains",
  "💰 Buy Rs.999 Get Rs.100 Cashback",
  "⚡ 30-Min Delivery",
  "🛒 2400+ Products",
  "🌿 100% Genuine Quality",
  "🎉 New Arrivals Every Week",
  "✨ Premium Millets Collection",
];

export function Ticker() {
  return (
    <div
      style={{
        background: "#0a0a0a",
        overflow: "hidden",
        position: "relative",
        height: "38px",
        display: "flex",
        alignItems: "center",
      }}
    >
      {/* Fade masks */}
      <div
        style={{
          position: "absolute",
          left: 0,
          top: 0,
          bottom: 0,
          width: "80px",
          background: "linear-gradient(to right, #0a0a0a, transparent)",
          zIndex: 2,
          pointerEvents: "none",
        }}
      />
      <div
        style={{
          position: "absolute",
          right: 0,
          top: 0,
          bottom: 0,
          width: "80px",
          background: "linear-gradient(to left, #0a0a0a, transparent)",
          zIndex: 2,
          pointerEvents: "none",
        }}
      />

      {/* Ticker track — doubled for seamless loop */}
      <div
        style={{
          display: "flex",
          alignItems: "center",
          gap: "0",
          animation: "ticker 28s linear infinite",
          whiteSpace: "nowrap",
          willChange: "transform",
        }}
      >
        {[...MESSAGES, ...MESSAGES].map((msg, i) => (
          <span
            key={i}
            style={{
              display: "inline-flex",
              alignItems: "center",
              gap: "8px",
              padding: "0 28px",
              color: "rgba(255,255,255,0.85)",
              fontSize: "12.5px",
              fontFamily: "Satoshi, sans-serif",
              fontWeight: 500,
              letterSpacing: "0.02em",
            }}
          >
            {msg}
            {i < MESSAGES.length * 2 - 1 && (
              <span
                style={{
                  display: "inline-block",
                  width: "4px",
                  height: "4px",
                  borderRadius: "50%",
                  background: "#e9a23b",
                  opacity: 0.8,
                }}
              />
            )}
          </span>
        ))}
      </div>
    </div>
  );
}
