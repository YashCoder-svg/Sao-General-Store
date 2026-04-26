"use client";

import { useRef, useState } from "react";
import { CATEGORIES } from "@/lib/products";

export function CategoryNav({
  active,
  onChange,
}: {
  active: string;
  onChange: (id: string) => void;
}) {
  return (
    <nav
      style={{
        background: "white",
        borderBottom: "1px solid #E8E4DC",
        overflowX: "auto",
        scrollbarWidth: "none",
      }}
    >
      <style>{`nav::-webkit-scrollbar{display:none}`}</style>
      <div
        className="max-w-screen"
        style={{
          display: "flex",
          alignItems: "center",
          gap: "4px",
          padding: "0 24px",
          height: "50px",
        }}
      >
        {CATEGORIES.map((cat) => {
          const isActive = active === cat.id;
          const isMillets = cat.id === "millets";
          return (
            <button
              key={cat.id}
              onClick={() => onChange(cat.id)}
              style={{
                display: "flex",
                alignItems: "center",
                gap: "6px",
                padding: "6px 14px",
                border: "none",
                background: "transparent",
                cursor: "pointer",
                fontFamily: "Satoshi, sans-serif",
                fontWeight: isActive ? 700 : 600,
                fontSize: "13.5px",
                color: isActive
                  ? "#2D6A4F"
                  : isMillets && !isActive
                  ? "#E9A23B"
                  : "#4B5563",
                position: "relative",
                whiteSpace: "nowrap",
                transition: "color 0.2s",
                flexShrink: 0,
              }}
            >
              <span style={{ fontSize: "15px" }}>{cat.icon}</span>
              {cat.label}

              {/* Animated underline */}
              {isActive && (
                <span
                  style={{
                    position: "absolute",
                    bottom: "-1px",
                    left: 0,
                    right: 0,
                    height: "2.5px",
                    background: isMillets ? "#E9A23B" : "#2D6A4F",
                    borderRadius: "2px 2px 0 0",
                    animation: "underlineScale 0.25s cubic-bezier(0.4,0,0.2,1) forwards",
                    transformOrigin: "center",
                  }}
                />
              )}
            </button>
          );
        })}
      </div>
    </nav>
  );
}
