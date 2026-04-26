"use client";

import Link from "next/link";

export default function NotFound() {
  return (
    <div
      style={{
        minHeight: "100vh",
        background: "#FAFAF7",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        textAlign: "center",
        padding: "40px 24px",
        fontFamily: "Satoshi, sans-serif",
      }}
    >
      <div
        style={{
          fontSize: "80px",
          marginBottom: "20px",
          animation: "float 3s ease-in-out infinite",
        }}
      >
        🛒
      </div>

      <span
        style={{
          fontSize: "12px",
          fontWeight: 700,
          color: "#2D6A4F",
          textTransform: "uppercase",
          letterSpacing: "0.1em",
          marginBottom: "12px",
          display: "block",
        }}
      >
        404 — Aisle not found
      </span>

      <h1
        style={{
          fontFamily: "Cabinet Grotesk, sans-serif",
          fontWeight: 900,
          fontSize: "clamp(32px, 5vw, 56px)",
          letterSpacing: "-2px",
          color: "#0a0a0a",
          marginBottom: "16px",
          lineHeight: 1.05,
        }}
      >
        This page went out of stock!
      </h1>

      <p
        style={{
          fontSize: "16px",
          color: "#6b7280",
          maxWidth: "380px",
          lineHeight: 1.7,
          marginBottom: "36px",
        }}
      >
        The page you were looking for doesn&apos;t exist or has been moved.
        Let&apos;s get you back to the fresh groceries.
      </p>

      <Link
        href="/"
        style={{
          display: "inline-flex",
          alignItems: "center",
          gap: "8px",
          padding: "14px 32px",
          background: "#2D6A4F",
          color: "white",
          textDecoration: "none",
          borderRadius: "14px",
          fontFamily: "Cabinet Grotesk, sans-serif",
          fontWeight: 800,
          fontSize: "16px",
          letterSpacing: "-0.2px",
          transition: "all 0.25s",
        }}
        onMouseEnter={(e) => {
          (e.currentTarget as HTMLElement).style.background = "#40916C";
          (e.currentTarget as HTMLElement).style.transform = "translateY(-3px)";
        }}
        onMouseLeave={(e) => {
          (e.currentTarget as HTMLElement).style.background = "#2D6A4F";
          (e.currentTarget as HTMLElement).style.transform = "translateY(0)";
        }}
      >
        🏠 Back to Home
      </Link>
    </div>
  );
}
