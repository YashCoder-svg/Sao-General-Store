"use client";

import Image from "next/image";
import { useEffect, useState } from "react";
import { X, Plus, Minus, Trash2, ShoppingBag } from "lucide-react";
import { useCartStore } from "@/lib/store";

export function CartDrawer() {
  const { items, isOpen, closeCart, updateQty, subtotal } = useCartStore();
  const [mounted, setMounted] = useState(false);
  useEffect(() => {
    const frame = requestAnimationFrame(() => setMounted(true));
    return () => cancelAnimationFrame(frame);
  }, []);

  const sub = mounted ? subtotal() : 0;
  const cartItems = mounted ? items : [];
  const deliveryFree = sub >= 499;
  const delivery = deliveryFree ? 0 : 40;
  const savings = cartItems.reduce(
    (acc, i) => acc + (i.mrp - i.price) * i.quantity,
    0
  );
  const isDrawerOpen = mounted && isOpen;

  return (
    <>
      {/* Backdrop */}
      {isDrawerOpen && (
        <div
          onClick={closeCart}
          style={{
            position: "fixed",
            inset: 0,
            background: "rgba(0,0,0,0.5)",
            backdropFilter: "blur(4px)",
            zIndex: 5000,
            animation: "fadeIn 0.25s ease",
          }}
        />
      )}

      {/* Drawer */}
      <aside
        style={{
          position: "fixed",
          top: 0,
          right: 0,
          bottom: 0,
          width: "min(420px, 100vw)",
          background: "white",
          zIndex: 5001,
          display: "flex",
          flexDirection: "column",
          transform: isDrawerOpen ? "translateX(0)" : "translateX(100%)",
          transition: "transform 0.35s cubic-bezier(0.4,0,0.2,1)",
          boxShadow: isDrawerOpen ? "-8px 0 40px rgba(0,0,0,0.12)" : "none",
        }}
      >
        {/* Header */}
        <div
          style={{
            padding: "20px 22px",
            borderBottom: "1px solid #E8E4DC",
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
          }}
        >
          <div>
            <h2
              style={{
                fontFamily: "Cabinet Grotesk, sans-serif",
                fontWeight: 800,
                fontSize: "20px",
                letterSpacing: "-0.3px",
                color: "#0a0a0a",
              }}
            >
              Your Cart
            </h2>
            <p
              style={{
                fontSize: "13px",
                color: "#6b7280",
                fontFamily: "Satoshi, sans-serif",
              }}
            >
              {cartItems.length === 0
                ? "Add some items to get started"
                : `${cartItems.reduce((a, i) => a + i.quantity, 0)} items`}
            </p>
          </div>
          <button
            onClick={closeCart}
            style={{
              width: "36px",
              height: "36px",
              borderRadius: "50%",
              border: "1.5px solid #E8E4DC",
              background: "white",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              cursor: "pointer",
              transition: "all 0.2s",
            }}
          >
            <X size={17} />
          </button>
        </div>

        {/* Free delivery banner */}
        {!deliveryFree && sub > 0 && (
          <div
            style={{
              background: "#D8F3DC",
              padding: "10px 22px",
              fontSize: "13px",
              fontFamily: "Satoshi, sans-serif",
              fontWeight: 600,
              color: "#2D6A4F",
            }}
          >
            🚚 Add ₹{499 - sub} more for FREE delivery!
          </div>
        )}
        {deliveryFree && sub > 0 && (
          <div
            style={{
              background: "#2D6A4F",
              padding: "10px 22px",
              fontSize: "13px",
              fontFamily: "Satoshi, sans-serif",
              fontWeight: 600,
              color: "white",
            }}
          >
            🎉 You&apos;ve unlocked FREE delivery!
          </div>
        )}

        {/* Items */}
        <div style={{ flex: 1, overflowY: "auto", padding: "16px 22px" }}>
          {cartItems.length === 0 ? (
            <div
              style={{
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                justifyContent: "center",
                height: "100%",
                gap: "12px",
                color: "#9CA3AF",
              }}
            >
              <ShoppingBag size={52} color="#D8F3DC" />
              <p
                style={{
                  fontFamily: "Satoshi, sans-serif",
                  fontWeight: 600,
                  fontSize: "15px",
                  color: "#6b7280",
                }}
              >
                Your cart is empty
              </p>
              <p style={{ fontSize: "13px", color: "#9CA3AF", fontFamily: "Satoshi, sans-serif" }}>
                Start adding fresh groceries!
              </p>
            </div>
          ) : (
            <div style={{ display: "flex", flexDirection: "column", gap: "14px" }}>
              {cartItems.map((item) => (
                <div
                  key={item.id}
                  style={{
                    display: "flex",
                    gap: "12px",
                    padding: "14px",
                    borderRadius: "14px",
                    border: "1px solid #E8E4DC",
                    background: "#FAFAF7",
                  }}
                >
                  {/* Image */}
                  <div
                    style={{
                      width: "64px",
                      height: "64px",
                      borderRadius: "10px",
                      overflow: "hidden",
                      flexShrink: 0,
                      position: "relative",
                    }}
                  >
                    <Image
                      src={item.image}
                      alt={item.name}
                      fill
                      unoptimized
                      style={{ objectFit: "contain" }}
                    />
                  </div>

                  {/* Info */}
                  <div style={{ flex: 1, minWidth: 0 }}>
                    <p
                      style={{
                        fontSize: "10px",
                        color: "#2D6A4F",
                        fontWeight: 700,
                        fontFamily: "Satoshi, sans-serif",
                        textTransform: "uppercase",
                        letterSpacing: "0.06em",
                      }}
                    >
                      {item.brand}
                    </p>
                    <p
                      style={{
                        fontSize: "13.5px",
                        fontWeight: 700,
                        fontFamily: "Satoshi, sans-serif",
                        color: "#0a0a0a",
                        overflow: "hidden",
                        textOverflow: "ellipsis",
                        whiteSpace: "nowrap",
                        marginBottom: "2px",
                      }}
                    >
                      {item.name}
                    </p>
                    <p
                      style={{
                        fontSize: "12px",
                        color: "#9CA3AF",
                        fontFamily: "Satoshi, sans-serif",
                        marginBottom: "8px",
                      }}
                    >
                      {item.weight}
                    </p>

                    {/* Qty + price */}
                    <div
                      style={{
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "space-between",
                      }}
                    >
                      <div
                        style={{
                          display: "flex",
                          alignItems: "center",
                          gap: "2px",
                          border: "1.5px solid #E8E4DC",
                          borderRadius: "8px",
                          overflow: "hidden",
                        }}
                      >
                        <button
                          onClick={() => updateQty(item.id, item.quantity - 1)}
                          style={{
                            width: "28px",
                            height: "28px",
                            border: "none",
                            background: "#F9F9F9",
                            cursor: "pointer",
                            display: "flex",
                            alignItems: "center",
                            justifyContent: "center",
                            transition: "background 0.15s",
                          }}
                        >
                          {item.quantity === 1 ? (
                            <Trash2 size={12} color="#DC2626" />
                          ) : (
                            <Minus size={12} />
                          )}
                        </button>
                        <span
                          style={{
                            padding: "0 10px",
                            fontSize: "13px",
                            fontWeight: 700,
                            fontFamily: "Satoshi, sans-serif",
                          }}
                        >
                          {item.quantity}
                        </span>
                        <button
                          onClick={() => updateQty(item.id, item.quantity + 1)}
                          style={{
                            width: "28px",
                            height: "28px",
                            border: "none",
                            background: "#F9F9F9",
                            cursor: "pointer",
                            display: "flex",
                            alignItems: "center",
                            justifyContent: "center",
                          }}
                        >
                          <Plus size={12} />
                        </button>
                      </div>

                      <span
                        style={{
                          fontFamily: "Cabinet Grotesk, sans-serif",
                          fontWeight: 800,
                          fontSize: "16px",
                          color: "#0a0a0a",
                        }}
                      >
                        ₹{(item.price * item.quantity).toLocaleString()}
                      </span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Footer */}
        {cartItems.length > 0 && (
          <div
            style={{
              borderTop: "1px solid #E8E4DC",
              padding: "18px 22px 22px",
              background: "white",
            }}
          >
            {/* Totals */}
            <div style={{ display: "flex", flexDirection: "column", gap: "8px", marginBottom: "16px" }}>
              <div style={{ display: "flex", justifyContent: "space-between" }}>
                <span style={{ fontSize: "13.5px", color: "#6b7280", fontFamily: "Satoshi, sans-serif" }}>
                  Subtotal
                </span>
                <span style={{ fontSize: "13.5px", fontWeight: 600, fontFamily: "Satoshi, sans-serif" }}>
                  ₹{sub.toLocaleString()}
                </span>
              </div>
              <div style={{ display: "flex", justifyContent: "space-between" }}>
                <span style={{ fontSize: "13.5px", color: "#6b7280", fontFamily: "Satoshi, sans-serif" }}>
                  Delivery
                </span>
                <span
                  style={{
                    fontSize: "13.5px",
                    fontWeight: 600,
                    fontFamily: "Satoshi, sans-serif",
                    color: deliveryFree ? "#2D6A4F" : "#0a0a0a",
                  }}
                >
                  {deliveryFree ? "FREE" : `₹${delivery}`}
                </span>
              </div>
              {savings > 0 && (
                <div style={{ display: "flex", justifyContent: "space-between" }}>
                  <span style={{ fontSize: "13.5px", color: "#2D6A4F", fontFamily: "Satoshi, sans-serif" }}>
                    Total Savings 🎉
                  </span>
                  <span style={{ fontSize: "13.5px", fontWeight: 700, color: "#2D6A4F", fontFamily: "Satoshi, sans-serif" }}>
                    -₹{savings.toLocaleString()}
                  </span>
                </div>
              )}
              <div
                style={{
                  display: "flex",
                  justifyContent: "space-between",
                  borderTop: "1px solid #E8E4DC",
                  paddingTop: "10px",
                  marginTop: "4px",
                }}
              >
                <span
                  style={{
                    fontSize: "15px",
                    fontFamily: "Cabinet Grotesk, sans-serif",
                    fontWeight: 800,
                  }}
                >
                  Total
                </span>
                <span
                  style={{
                    fontSize: "18px",
                    fontFamily: "Cabinet Grotesk, sans-serif",
                    fontWeight: 800,
                  }}
                >
                  ₹{(sub + delivery).toLocaleString()}
                </span>
              </div>
            </div>

            <CheckoutButton />
          </div>
        )}
      </aside>
    </>
  );
}

function CheckoutButton() {
  const { closeCart } = useCartStore();
  return (
    <button
      onClick={() => {
        closeCart();
        // Trigger checkout modal via a custom event
        window.dispatchEvent(new CustomEvent("open-checkout"));
      }}
      style={{
        width: "100%",
        padding: "15px",
        background: "linear-gradient(135deg, #2D6A4F, #40916C)",
        color: "white",
        border: "none",
        borderRadius: "14px",
        fontFamily: "Cabinet Grotesk, sans-serif",
        fontWeight: 800,
        fontSize: "16px",
        cursor: "pointer",
        letterSpacing: "-0.2px",
        transition: "transform 0.2s, box-shadow 0.2s",
      }}
      onMouseEnter={(e) => {
        const el = e.currentTarget as HTMLElement;
        el.style.transform = "scale(1.02)";
        el.style.boxShadow = "0 8px 24px rgba(45,106,79,0.4)";
      }}
      onMouseLeave={(e) => {
        const el = e.currentTarget as HTMLElement;
        el.style.transform = "scale(1)";
        el.style.boxShadow = "none";
      }}
    >
      Proceed to Checkout →
    </button>
  );
}
