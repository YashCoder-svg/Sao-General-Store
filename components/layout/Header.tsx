"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import { ShoppingCart, User, Search, ChevronDown, X, Phone, Mail, Lock, LogOut } from "lucide-react";
import { useCartStore } from "@/lib/store";
import { useAuth } from "@/lib/authContext";
import { CATEGORIES, PRODUCTS } from "@/lib/products";

export function Header({ activeCategory, onCategoryChange, searchQuery = "", onSearchChange = () => {} }: {
  activeCategory?: string;
  onCategoryChange?: (cat: string) => void;
  searchQuery?: string;
  onSearchChange?: (query: string) => void;
}) {
  const [scrolled, setScrolled] = useState(false);
  const [showSuggestions, setShowSuggestions] = useState(false);
  const [mounted, setMounted] = useState(false);
  const { openCart, totalItems } = useCartStore();
  const { currentUser, logout, loading } = useAuth();

  const safeQuery = searchQuery ?? "";
  const suggestions = safeQuery.length > 0
    ? PRODUCTS.filter(p => 
        p.name.toLowerCase().includes(safeQuery.toLowerCase()) ||
        p.brand.toLowerCase().includes(safeQuery.toLowerCase())
      ).slice(0, 6)
    : [];

  useEffect(() => {
    const frame = requestAnimationFrame(() => setMounted(true));
    return () => cancelAnimationFrame(frame);
  }, []);
  const itemCount = mounted ? totalItems() : 0;

  useEffect(() => {
    const handler = () => setScrolled(window.scrollY > 60);
    window.addEventListener("scroll", handler);
    return () => window.removeEventListener("scroll", handler);
  }, []);

  return (
    <header
      style={{
        position: "sticky",
        top: 0,
        zIndex: 1000,
        backdropFilter: "blur(20px)",
        WebkitBackdropFilter: "blur(20px)",
        background: scrolled
          ? "rgba(250,250,247,0.95)"
          : "rgba(250,250,247,0.88)",
        height: scrolled ? "60px" : "72px",
        transition: "height 0.3s cubic-bezier(0.4,0,0.2,1), box-shadow 0.3s",
        boxShadow: scrolled ? "0 4px 24px rgba(0,0,0,0.08)" : "none",
        borderBottom: "1px solid rgba(232,228,220,0.6)",
      }}
    >
      {/* Gradient bottom line */}
      <div
        style={{
          position: "absolute",
          bottom: 0,
          left: 0,
          right: 0,
          height: "2px",
          background:
            "linear-gradient(90deg, #2D6A4F, #E9A23B 50%, #2D6A4F)",
          opacity: 0.6,
        }}
      />

      <div
        className="max-w-screen"
        style={{
          height: "100%",
          display: "flex",
          alignItems: "center",
          gap: "20px",
        }}
      >
        {/* Logo */}
        <Link
          href="/"
          style={{
            display: "flex",
            alignItems: "center",
            gap: "10px",
            textDecoration: "none",
            flexShrink: 0,
          }}
        >
          <div
            style={{
              width: "36px",
              height: "36px",
              background: "linear-gradient(135deg, #2D6A4F, #40916C)",
              borderRadius: "10px",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              fontSize: "20px",
            }}
          >
            🛒
          </div>
          <span
            style={{
              fontFamily: "Cabinet Grotesk, sans-serif",
              fontWeight: 900,
              fontSize: "22px",
              letterSpacing: "-1px",
              color: "#0a0a0a",
            }}
          >
            Kirana
            <span style={{ color: "#2D6A4F" }}>.</span>
          </span>
        </Link>

        {/* Search bar — center */}
        <div
          style={{
            flex: 1,
            display: "flex",
            alignItems: "center",
            background: "white",
            border: "1.5px solid #E8E4DC",
            borderRadius: "12px",
            overflow: "hidden",
            maxWidth: "620px",
            transition: "border-color 0.2s, box-shadow 0.2s",
          }}
          onFocus={(e) =>
            ((e.currentTarget as HTMLElement).style.borderColor = "#2D6A4F")
          }
          onBlur={(e) =>
            ((e.currentTarget as HTMLElement).style.borderColor = "#E8E4DC")
          }
        >
          {/* Category dropdown */}
          <div
            style={{
              display: "flex",
              alignItems: "center",
              padding: "0 12px",
              gap: "4px",
              borderRight: "1px solid #E8E4DC",
              cursor: "pointer",
              whiteSpace: "nowrap",
            }}
          >
            <span
              style={{
                fontSize: "13px",
                fontWeight: 600,
                color: "#6b7280",
                fontFamily: "Satoshi, sans-serif",
              }}
            >
              All
            </span>
            <ChevronDown size={14} color="#6b7280" />
          </div>

          <div
            style={{
              position: "relative",
              flex: 1,
              display: "flex",
              flexDirection: "column"
            }}
          >
            <input
              type="text"
              placeholder="Search for rice, dal, oil, spices..."
              value={safeQuery}
              onChange={(e) => {
                onSearchChange(e.target.value);
                setShowSuggestions(true);
              }}
              onFocus={() => setShowSuggestions(true)}
              style={{
                flex: 1,
                padding: "10px 16px",
                border: "none",
                outline: "none",
                fontSize: "14px",
                fontFamily: "Satoshi, sans-serif",
                background: "transparent",
                color: "#1a1a1a",
              }}
            />

            {/* Suggestions Dropdown */}
            {showSuggestions && suggestions.length > 0 && (
              <div
                style={{
                  position: "absolute",
                  top: "100%",
                  left: 0,
                  right: 0,
                  background: "white",
                  border: "1px solid #E8E4DC",
                  borderRadius: "0 0 12px 12px",
                  boxShadow: "0 10px 25px rgba(0,0,0,0.1)",
                  zIndex: 1001,
                  marginTop: "1.5px",
                  maxHeight: "300px",
                  overflowY: "auto",
                }}
              >
                {suggestions.map((p) => (
                  <div
                    key={p.id}
                    onClick={() => {
                      onSearchChange(p.name);
                      setShowSuggestions(false);
                      // Scroll to products section
                      document.getElementById("products-section")?.scrollIntoView({ behavior: "smooth" });
                    }}
                    style={{
                      padding: "10px 16px",
                      cursor: "pointer",
                      display: "flex",
                      alignItems: "center",
                      gap: "12px",
                      borderBottom: "1px solid #f0f0f0",
                      transition: "background 0.2s",
                    }}
                    onMouseEnter={(e) => (e.currentTarget.style.background = "#f9f9f8")}
                    onMouseLeave={(e) => (e.currentTarget.style.background = "transparent")}
                  >
                    <div style={{ width: "32px", height: "32px", position: "relative", borderRadius: "4px", overflow: "hidden", background: "#f5f5f5" }}>
                      <Image src={p.image} alt={p.name} fill style={{ objectFit: "contain" }} />
                    </div>
                    <div>
                      <div style={{ fontSize: "13px", fontWeight: 600, color: "#1a1a1a" }}>{p.name}</div>
                      <div style={{ fontSize: "11px", color: "#6b7280" }}>{p.brand} • {p.size}</div>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>

          <button
            style={{
              background: "#2D6A4F",
              color: "white",
              border: "none",
              padding: "9px 18px",
              cursor: "pointer",
              display: "flex",
              alignItems: "center",
              gap: "6px",
              fontFamily: "Satoshi, sans-serif",
              fontWeight: 700,
              fontSize: "13px",
              transition: "background 0.2s",
            }}
            onMouseEnter={(e) =>
              ((e.currentTarget as HTMLElement).style.background = "#40916C")
            }
            onMouseLeave={(e) =>
              ((e.currentTarget as HTMLElement).style.background = "#2D6A4F")
            }
          >
            <Search size={16} />
          </button>
        </div>

        {/* Right actions */}
        <div style={{ display: "flex", alignItems: "center", gap: "10px", flexShrink: 0 }}>
          <a
            href="https://wa.me/919993962007"
            target="_blank"
            rel="noopener noreferrer"
            style={{
              display: "flex",
              alignItems: "center",
              gap: "7px",
              padding: "8px 16px",
              border: "1.5px solid #25D366",
              borderRadius: "12px",
              background: "rgba(37, 211, 102, 0.05)",
              cursor: "pointer",
              fontFamily: "Satoshi, sans-serif",
              fontWeight: 700,
              fontSize: "13px",
              color: "#128C7E",
              transition: "all 0.2s",
              textDecoration: "none"
            }}
            onMouseEnter={(e) => {
              const el = e.currentTarget as HTMLElement;
              el.style.background = "#25D366";
              el.style.color = "white";
            }}
            onMouseLeave={(e) => {
              const el = e.currentTarget as HTMLElement;
              el.style.background = "rgba(37, 211, 102, 0.05)";
              el.style.color = "#128C7E";
            }}
          >
            <Phone size={14} />
            <span className="hidden lg:inline">Help</span>
          </a>

          {loading || !mounted ? (
            <div style={{ width: "90px", height: "36px", background: "#f3f4f6", borderRadius: "12px", animate: "pulse 1.5s infinite" }} />
          ) : currentUser ? (
            <div style={{ display: "flex", alignItems: "center", gap: "8px" }}>
              <div
                style={{
                  display: "flex",
                  alignItems: "center",
                  gap: "7px",
                  padding: "8px 16px",
                  border: "1.5px solid #2D6A4F",
                  borderRadius: "12px",
                  background: "rgba(45, 106, 79, 0.05)",
                  fontFamily: "Satoshi, sans-serif",
                  fontWeight: 700,
                  fontSize: "13.5px",
                  color: "#2D6A4F",
                }}
              >
                <User size={15} />
                <span>{currentUser.displayName}</span>
              </div>
              <button
                onClick={logout}
                title="Logout"
                style={{
                  background: "none",
                  border: "1.5px solid #ff4d4d",
                  borderRadius: "12px",
                  padding: "8px",
                  cursor: "pointer",
                  color: "#ff4d4d",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  transition: "all 0.2s",
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.background = "#ff4d4d";
                  e.currentTarget.style.color = "white";
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.background = "none";
                  e.currentTarget.style.color = "#ff4d4d";
                }}
              >
                <LogOut size={16} />
              </button>
            </div>
          ) : (
            <Link
              href="/login"
              style={{
                display: "flex",
                alignItems: "center",
                gap: "7px",
                padding: "8px 16px",
                border: "1.5px solid #E8E4DC",
                borderRadius: "12px",
                background: "white",
                cursor: "pointer",
                fontFamily: "Satoshi, sans-serif",
                fontWeight: 600,
                fontSize: "13.5px",
                color: "#1a1a1a",
                transition: "all 0.2s",
                textDecoration: "none"
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
              <User size={15} />
              <span className="hidden md:inline">Sign In</span>
            </Link>
          )}

          {/* Cart button */}
          <button
            onClick={openCart}
            style={{
              display: "flex",
              alignItems: "center",
              gap: "8px",
              padding: "8px 18px",
              background: "#0a0a0a",
              color: "white",
              border: "none",
              borderRadius: "12px",
              cursor: "pointer",
              fontFamily: "Satoshi, sans-serif",
              fontWeight: 700,
              fontSize: "13.5px",
              transition: "all 0.2s",
              position: "relative",
              animation: itemCount > 0 ? "heartbeat 0.6s ease" : "none",
            }}
            onMouseEnter={(e) =>
              ((e.currentTarget as HTMLElement).style.background = "#2D6A4F")
            }
            onMouseLeave={(e) =>
              ((e.currentTarget as HTMLElement).style.background = "#0a0a0a")
            }
          >
            <ShoppingCart size={16} />
            <span className="hidden sm:inline">Cart</span>
            {itemCount > 0 && (
              <span
                style={{
                  background: "#E9A23B",
                  color: "#0a0a0a",
                  width: "20px",
                  height: "20px",
                  borderRadius: "50%",
                  fontSize: "11px",
                  fontWeight: 800,
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  animation: "heartbeat 0.5s ease",
                }}
              >
                {itemCount}
              </span>
            )}
          </button>
        </div>
      </div>
    </header>
  );
}
