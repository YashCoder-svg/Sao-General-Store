"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import { X, Check, ChevronRight, MapPin, CreditCard, Smartphone, Building2, Banknote, QrCode, Loader2 } from "lucide-react";
import { getProductImage } from "@/lib/getProductImage";
import { useCartStore } from "@/lib/store";

type Step = 1 | 2 | 3 | 4;

type CheckoutForm = {
  firstName: string;
  lastName: string;
  mobile: string;
  address: string;
  city: string;
  pincode: string;
};

const DELIVERY_SLOTS = [
  "Express (30 min)",
  "Today 6–8 PM",
  "Today 8–10 PM",
  "Tomorrow 7–9 AM",
  "Tomorrow 6–8 PM",
];

const PAYMENT_OPTIONS = [
  { id: "upi", icon: Smartphone, label: "UPI / PhonePe / GPay", desc: "Instant & secure" },
  { id: "qr", icon: QrCode, label: "Scan QR Code", desc: "Pay via any UPI app" },
  { id: "card", icon: CreditCard, label: "Credit / Debit Card", desc: "All major cards" },
  { id: "netbanking", icon: Building2, label: "Net Banking", desc: "100+ banks" },
  { id: "cod", icon: Banknote, label: "Cash on Delivery", desc: "Pay when you receive" },
];

export function CheckoutModal() {
  const [open, setOpen] = useState(false);
  const [step, setStep] = useState<Step>(1);
  const [orderId, setOrderId] = useState("");
  const [selectedPayment, setSelectedPayment] = useState("upi");
  const [selectedSlot, setSelectedSlot] = useState(DELIVERY_SLOTS[0]);
  const [isLoading, setIsLoading] = useState(false);
  const [form, setForm] = useState<CheckoutForm>({
    firstName: "", lastName: "", mobile: "",
    address: "", city: "Raigarh", pincode: "496001",
  });
  const { items, subtotal, clearCart } = useCartStore();
  const sub = subtotal();
  const deliveryFee = sub >= 499 ? 0 : 40;
  const total = sub + deliveryFee;

  useEffect(() => {
    const handler = () => { setOpen(true); setStep(1); };
    window.addEventListener("open-checkout", handler);

    // Load Razorpay script dynamically
    if (!document.querySelector('script[src="https://checkout.razorpay.com/v1/checkout.js"]')) {
      const script = document.createElement("script");
      script.src = "https://checkout.razorpay.com/v1/checkout.js";
      script.async = true;
      document.body.appendChild(script);
    }

    return () => window.removeEventListener("open-checkout", handler);
  }, []);

  const handleClose = () => {
    setOpen(false);
    setTimeout(() => { if (step === 4) clearCart(); setStep(1); }, 300);
  };

  const handlePlaceOrder = () => {
    const id = "KM" + Math.floor(100000 + Math.random() * 900000);
    setOrderId(id);
    setStep(4);
  };

  const handleRazorpayPayment = () => {
    const id = "KM" + Math.floor(100000 + Math.random() * 900000);
    setOrderId(id);

    if (selectedPayment === "cod") {
      setStep(4);
      return;
    }

    if (selectedPayment === "qr" || selectedPayment === "upi") {
      // Custom QR flow for both UPI and QR
      setStep(3.5 as any);
      return;
    }

    // For Card/Netbanking, simulate a professional processing state
    setIsLoading(true);
    setTimeout(() => {
      setIsLoading(false);
      handlePlaceOrder();
    }, 2000);
  };

  if (!open) return null;

  return (
    <>
      {/* Backdrop */}
      <div
        onClick={handleClose}
        style={{
          position: "fixed",
          inset: 0,
          background: "rgba(0,0,0,0.6)",
          backdropFilter: "blur(6px)",
          zIndex: 9000,
          animation: "fadeIn 0.2s ease",
        }}
      />

      {/* Modal */}
      <div
        style={{
          position: "fixed",
          top: "50%",
          left: "50%",
          transform: "translate(-50%, -50%)",
          width: "min(560px, 95vw)",
          maxHeight: "90vh",
          background: "white",
          borderRadius: "24px",
          zIndex: 9001,
          overflow: "hidden",
          animation: "scaleIn 0.35s cubic-bezier(0.34,1.56,0.64,1) forwards",
          display: "flex",
          flexDirection: "column",
        }}
      >
        {/* Modal Header */}
        {step !== 4 && (
          <div
            style={{
              padding: "22px 24px",
              borderBottom: "1px solid #E8E4DC",
              display: "flex",
              alignItems: "center",
              justifyContent: "space-between",
            }}
          >
            {/* Step indicators */}
            <div style={{ display: "flex", alignItems: "center", gap: "8px" }}>
              {[1, 2, 3].map((s) => (
                <div
                  key={s}
                  style={{
                    display: "flex",
                    alignItems: "center",
                    gap: "6px",
                  }}
                >
                  <div
                    style={{
                      width: "28px",
                      height: "28px",
                      borderRadius: "50%",
                      background: step >= s ? "#2D6A4F" : "#E8E4DC",
                      color: step >= s ? "white" : "#9CA3AF",
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      fontSize: "12px",
                      fontWeight: 700,
                      fontFamily: "Satoshi, sans-serif",
                      transition: "all 0.3s",
                    }}
                  >
                    {step > s ? <Check size={13} /> : s}
                  </div>
                  {s < 3 && (
                    <div
                      style={{
                        width: "24px",
                        height: "2px",
                        background: step > s ? "#2D6A4F" : "#E8E4DC",
                        transition: "background 0.3s",
                      }}
                    />
                  )}
                </div>
              ))}
              <span
                style={{
                  marginLeft: "8px",
                  fontSize: "14px",
                  fontWeight: 700,
                  fontFamily: "Satoshi, sans-serif",
                  color: "#0a0a0a",
                }}
              >
                {step === 1 ? "Cart Review" : step === 2 ? "Delivery Details" : "Payment"}
              </span>
            </div>
            <button
              onClick={handleClose}
              style={{
                width: "34px",
                height: "34px",
                border: "1.5px solid #E8E4DC",
                borderRadius: "50%",
                background: "white",
                cursor: "pointer",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
              }}
            >
              <X size={15} />
            </button>
          </div>
        )}

        {/* Content */}
        <div style={{ overflowY: "auto", flex: 1 }}>
          {/* Step 1 — Cart Review */}
          {step === 1 && (
            <div style={{ padding: "20px 24px" }}>
              <div style={{ display: "flex", flexDirection: "column", gap: "12px", marginBottom: "20px" }}>
                {items.map((item) => (
                  <div
                    key={item.id}
                    style={{
                      display: "flex",
                      gap: "12px",
                      alignItems: "center",
                      padding: "12px",
                      borderRadius: "12px",
                      background: "#FAFAF7",
                      border: "1px solid #E8E4DC",
                    }}
                  >
                    <div style={{ width: "48px", height: "48px", borderRadius: "8px", overflow: "hidden", position: "relative", flexShrink: 0 }}>
                      <Image src={getProductImage(item)} alt={item.name} fill unoptimized style={{ objectFit: "contain" }} />
                    </div>
                    <div style={{ flex: 1 }}>
                      <p style={{ fontSize: "13.5px", fontWeight: 700, fontFamily: "Satoshi, sans-serif" }}>
                        {item.name}
                      </p>
                      <p style={{ fontSize: "12px", color: "#6b7280", fontFamily: "Satoshi, sans-serif" }}>
                        {item.size} × {item.quantity}
                      </p>
                    </div>
                    <span style={{ fontFamily: "Cabinet Grotesk, sans-serif", fontWeight: 800, fontSize: "15px" }}>
                      ₹{(item.price * item.quantity).toLocaleString()}
                    </span>
                  </div>
                ))}
              </div>
              <div style={{ background: "#FAFAF7", borderRadius: "14px", padding: "16px", border: "1px solid #E8E4DC" }}>
                <div style={{ display: "flex", justifyContent: "space-between", marginBottom: "8px" }}>
                  <span style={{ fontSize: "13.5px", color: "#6b7280", fontFamily: "Satoshi, sans-serif" }}>Subtotal</span>
                  <span style={{ fontSize: "13.5px", fontWeight: 600, fontFamily: "Satoshi, sans-serif" }}>₹{sub}</span>
                </div>
                <div style={{ display: "flex", justifyContent: "space-between", marginBottom: "8px" }}>
                  <span style={{ fontSize: "13.5px", color: "#6b7280", fontFamily: "Satoshi, sans-serif" }}>Delivery</span>
                  <span style={{ fontSize: "13.5px", fontWeight: 600, fontFamily: "Satoshi, sans-serif", color: deliveryFee === 0 ? "#2D6A4F" : "#0a0a0a" }}>{deliveryFee === 0 ? "FREE" : `₹${deliveryFee}`}</span>
                </div>
                <div style={{ display: "flex", justifyContent: "space-between", borderTop: "1px solid #E8E4DC", paddingTop: "10px", marginTop: "4px" }}>
                  <span style={{ fontSize: "16px", fontFamily: "Cabinet Grotesk, sans-serif", fontWeight: 800 }}>Total</span>
                  <span style={{ fontSize: "18px", fontFamily: "Cabinet Grotesk, sans-serif", fontWeight: 800 }}>₹{total}</span>
                </div>
              </div>
            </div>
          )}

          {/* Step 2 — Delivery */}
          {step === 2 && (
            <div style={{ padding: "20px 24px" }}>
              <div style={{ display: "flex", alignItems: "center", gap: "8px", marginBottom: "20px" }}>
                <MapPin size={18} color="#2D6A4F" />
                <span style={{ fontSize: "14px", fontWeight: 700, fontFamily: "Cabinet Grotesk, sans-serif" }}>
                  Delivery Address
                </span>
              </div>
              <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "12px", marginBottom: "12px" }}>
                {([
                  { key: "firstName", label: "First Name", placeholder: "Ravi" },
                  { key: "lastName", label: "Last Name", placeholder: "Kumar" },
                ] as const).map(({ key, label, placeholder }) => (
                  <div key={key}>
                    <label style={{ fontSize: "12px", fontWeight: 600, color: "#6b7280", fontFamily: "Satoshi, sans-serif", display: "block", marginBottom: "6px" }}>{label}</label>
                    <input
                      value={form[key]}
                      onChange={(e) => setForm((f) => ({ ...f, [key]: e.target.value }))}
                      placeholder={placeholder}
                      style={{ width: "100%", padding: "10px 14px", borderRadius: "10px", border: "1.5px solid #E8E4DC", fontFamily: "Satoshi, sans-serif", fontSize: "14px", outline: "none" }}
                    />
                  </div>
                ))}
              </div>
              {([
                { key: "mobile", label: "Mobile Number", placeholder: "+91 9993962007" },
                { key: "address", label: "Full Address", placeholder: "House No., Street, Landmark" },
              ] as const).map(({ key, label, placeholder }) => (
                <div key={key} style={{ marginBottom: "12px" }}>
                  <label style={{ fontSize: "12px", fontWeight: 600, color: "#6b7280", fontFamily: "Satoshi, sans-serif", display: "block", marginBottom: "6px" }}>{label}</label>
                  <input
                    value={form[key]}
                    onChange={(e) => setForm((f) => ({ ...f, [key]: e.target.value }))}
                    placeholder={placeholder}
                    style={{ width: "100%", padding: "10px 14px", borderRadius: "10px", border: "1.5px solid #E8E4DC", fontFamily: "Satoshi, sans-serif", fontSize: "14px", outline: "none" }}
                  />
                </div>
              ))}
              <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "12px", marginBottom: "20px" }}>
                {([
                  { key: "city", label: "City", placeholder: "Raigarh" },
                  { key: "pincode", label: "Pincode", placeholder: "533101" },
                ] as const).map(({ key, label, placeholder }) => (
                  <div key={key}>
                    <label style={{ fontSize: "12px", fontWeight: 600, color: "#6b7280", fontFamily: "Satoshi, sans-serif", display: "block", marginBottom: "6px" }}>{label}</label>
                    <input
                      value={form[key]}
                      onChange={(e) => setForm((f) => ({ ...f, [key]: e.target.value }))}
                      placeholder={placeholder}
                      style={{ width: "100%", padding: "10px 14px", borderRadius: "10px", border: "1.5px solid #E8E4DC", fontFamily: "Satoshi, sans-serif", fontSize: "14px", outline: "none" }}
                    />
                  </div>
                ))}
              </div>
              <div>
                <label style={{ fontSize: "12px", fontWeight: 600, color: "#6b7280", fontFamily: "Satoshi, sans-serif", display: "block", marginBottom: "8px" }}>
                  Delivery Slot
                </label>
                <div style={{ display: "flex", gap: "8px", flexWrap: "wrap" }}>
                  {DELIVERY_SLOTS.map((slot) => (
                    <button
                      key={slot}
                      onClick={() => setSelectedSlot(slot)}
                      style={{
                        padding: "7px 14px",
                        borderRadius: "8px",
                        border: `1.5px solid ${selectedSlot === slot ? "#2D6A4F" : "#E8E4DC"}`,
                        background: selectedSlot === slot ? "#D8F3DC" : "white",
                        color: selectedSlot === slot ? "#2D6A4F" : "#6b7280",
                        fontFamily: "Satoshi, sans-serif",
                        fontWeight: 600,
                        fontSize: "12.5px",
                        cursor: "pointer",
                        transition: "all 0.2s",
                      }}
                    >
                      {slot}
                    </button>
                  ))}
                </div>
              </div>
            </div>
          )}

          {/* Step 3 — Payment */}
          {step === 3 && (
            <div style={{ padding: "20px 24px" }}>
              <div style={{ display: "flex", alignItems: "center", gap: "8px", marginBottom: "20px" }}>
                <CreditCard size={18} color="#2D6A4F" />
                <span style={{ fontSize: "14px", fontWeight: 700, fontFamily: "Cabinet Grotesk, sans-serif" }}>
                  Select Payment Method
                </span>
              </div>
              <div style={{ display: "flex", flexDirection: "column", gap: "10px" }}>
                {PAYMENT_OPTIONS.map((opt) => {
                  const Icon = opt.icon;
                  const isSelected = selectedPayment === opt.id;
                  return (
                    <button
                      key={opt.id}
                      onClick={() => setSelectedPayment(opt.id)}
                      style={{
                        display: "flex",
                        alignItems: "center",
                        gap: "14px",
                        padding: "14px 16px",
                        borderRadius: "12px",
                        border: `2px solid ${isSelected ? "#2D6A4F" : "#E8E4DC"}`,
                        background: isSelected ? "#D8F3DC" : "white",
                        cursor: "pointer",
                        transition: "all 0.2s",
                        textAlign: "left",
                      }}
                    >
                      <div
                        style={{
                          width: "40px",
                          height: "40px",
                          borderRadius: "10px",
                          background: isSelected ? "#2D6A4F" : "#F3F4F6",
                          display: "flex",
                          alignItems: "center",
                          justifyContent: "center",
                          flexShrink: 0,
                        }}
                      >
                        <Icon size={20} color={isSelected ? "white" : "#6b7280"} />
                      </div>
                      <div>
                        <p style={{ fontSize: "14px", fontWeight: 700, fontFamily: "Satoshi, sans-serif", color: "#0a0a0a" }}>{opt.label}</p>
                        <p style={{ fontSize: "12px", color: "#6b7280", fontFamily: "Satoshi, sans-serif" }}>{opt.desc}</p>
                      </div>
                      {isSelected && (
                        <div style={{ marginLeft: "auto" }}>
                          <Check size={18} color="#2D6A4F" />
                        </div>
                      )}
                    </button>
                  );
                })}
              </div>
              {/* Order summary */}
              <div style={{ background: "#FAFAF7", borderRadius: "14px", padding: "14px", border: "1px solid #E8E4DC", marginTop: "20px" }}>
                <div style={{ display: "flex", justifyContent: "space-between" }}>
                  <span style={{ fontFamily: "Cabinet Grotesk, sans-serif", fontWeight: 800, fontSize: "15px" }}>Total to Pay</span>
                  <span style={{ fontFamily: "Cabinet Grotesk, sans-serif", fontWeight: 800, fontSize: "18px", color: "#2D6A4F" }}>₹{total}</span>
                </div>
              </div>
            </div>
          )}

          {/* Step 3.5 — QR Scanner Simulation */}
          {(step as any) === 3.5 && (
            <div style={{ padding: "40px 24px", display: "flex", flexDirection: "column", alignItems: "center", textAlign: "center" }}>
              <div style={{ 
                background: "white", 
                padding: "24px", 
                borderRadius: "24px", 
                border: "2px solid #2D6A4F",
                boxShadow: "0 10px 40px rgba(45,106,79,0.1)",
                marginBottom: "24px",
                position: "relative"
              }}>
                {/* Real Dynamic UPI QR Code */}
                <div style={{ width: "220px", height: "220px", background: "white", display: "flex", alignItems: "center", justifyContent: "center", borderRadius: "12px", overflow: "hidden" }}>
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img 
                    src={`https://api.qrserver.com/v1/create-qr-code/?size=300x300&data=${encodeURIComponent(`upi://pay?pa=Q579556231@ybl&pn=Sao%20General%20Store&am=${total}&cu=INR&tn=Order_${orderId}`)}`}
                    alt="Payment QR Code"
                    style={{ width: "100%", height: "100%", objectFit: "contain" }}
                  />
                </div>
                {/* Scanner Line Animation */}
                <div style={{
                  position: "absolute",
                  top: "24px",
                  left: "24px",
                  right: "24px",
                  height: "2px",
                  background: "#2D6A4F",
                  boxShadow: "0 0 10px #2D6A4F",
                  animation: "scan 2s ease-in-out infinite"
                }} />
              </div>
              <h3 style={{ fontFamily: "Cabinet Grotesk, sans-serif", fontWeight: 800, fontSize: "18px", marginBottom: "8px" }}>Scan to Pay ₹{total}</h3>
              <p style={{ fontSize: "14px", color: "#6b7280", maxWidth: "280px" }}>Open PhonePe, Google Pay or any UPI app to scan and complete payment.</p>
              
              <div style={{ marginTop: "32px", display: "flex", gap: "12px" }}>
                <div style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: "6px" }}>
                  <div style={{ width: "40px", height: "40px", borderRadius: "10px", background: "#f3f4f6", display: "flex", alignItems: "center", justifyContent: "center" }}>
                    <Smartphone size={20} color="#2D6A4F" />
                  </div>
                  <span style={{ fontSize: "11px", fontWeight: 700, color: "#6b7280" }}>Waiting...</span>
                </div>
                <button 
                  onClick={handlePlaceOrder}
                  style={{ background: "#2D6A4F", color: "white", border: "none", borderRadius: "12px", padding: "10px 24px", fontWeight: 700, cursor: "pointer" }}
                >
                  Simulate Success ✓
                </button>
              </div>
            </div>
          )}

          {/* Step 4 — Confirmation */}
          {step === 4 && (
            <div
              style={{
                padding: "48px 32px",
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                textAlign: "center",
                gap: "16px",
              }}
            >
              {/* Success Celebration */}
              <div
                style={{
                  width: "80px",
                  height: "80px",
                  background: "#f0fdf4",
                  borderRadius: "50%",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  margin: "0 auto 24px",
                  position: "relative",
                }}
              >
                <div className="confetti-burst" />
                <Check size={40} color="#22c55e" strokeWidth={3} />
              </div>

              <h2
                style={{
                  fontFamily: "Cabinet Grotesk, sans-serif",
                  fontSize: "28px",
                  fontWeight: 900,
                  color: "#0a0a0a",
                  marginBottom: "12px",
                }}
              >
                Order Placed! 🎉
              </h2>
              <p style={{ fontSize: "15px", color: "#6b7280", fontFamily: "Satoshi, sans-serif", maxWidth: "320px", lineHeight: 1.6 }}>
                Your fresh groceries are being packed and will reach you in 30–45 minutes.
              </p>

              {/* Order ID */}
              <div
                style={{
                  background: "#D8F3DC",
                  borderRadius: "14px",
                  padding: "16px 28px",
                  marginTop: "8px",
                }}
              >
                <p style={{ fontSize: "12px", color: "#2D6A4F", fontFamily: "Satoshi, sans-serif", fontWeight: 600, textTransform: "uppercase", letterSpacing: "0.08em" }}>
                  Order ID
                </p>
                <p style={{ fontFamily: "Cabinet Grotesk, sans-serif", fontWeight: 900, fontSize: "22px", color: "#0a0a0a", letterSpacing: "-0.3px" }}>
                  #{orderId}
                </p>
              </div>

              <div
                style={{
                  display: "flex",
                  alignItems: "center",
                  gap: "8px",
                  background: "#FFF3E0",
                  padding: "10px 20px",
                  borderRadius: "10px",
                }}
              >
                <span style={{ fontSize: "18px" }}>🚀</span>
                <span style={{ fontSize: "14px", fontWeight: 700, fontFamily: "Satoshi, sans-serif", color: "#D97706" }}>
                  ETA: 30–45 minutes
                </span>
              </div>

              <button
                onClick={handleClose}
                style={{
                  marginTop: "16px",
                  padding: "14px 36px",
                  background: "#2D6A4F",
                  color: "white",
                  border: "none",
                  borderRadius: "14px",
                  fontFamily: "Cabinet Grotesk, sans-serif",
                  fontWeight: 800,
                  fontSize: "15px",
                  cursor: "pointer",
                  transition: "all 0.2s",
                }}
              >
                Continue Shopping →
              </button>
            </div>
          )}
        </div>

        {/* Footer CTA */}
        {step !== 4 && (
          <div
            style={{
              padding: "16px 24px",
              borderTop: "1px solid #E8E4DC",
              display: "flex",
              gap: "10px",
            }}
          >
            {step > 1 && (
              <button
                onClick={() => setStep((s) => (s - 1) as Step)}
                style={{
                  padding: "13px 22px",
                  border: "1.5px solid #E8E4DC",
                  borderRadius: "12px",
                  background: "white",
                  fontFamily: "Satoshi, sans-serif",
                  fontWeight: 600,
                  fontSize: "14px",
                  cursor: "pointer",
                }}
              >
                Back
              </button>
            )}
            <button
              onClick={step === 3 ? handleRazorpayPayment : (step as any) === 3.5 ? handlePlaceOrder : () => setStep((s) => (s + 1) as Step)}
              style={{
                flex: 1,
                padding: "13px",
                background: "linear-gradient(135deg, #2D6A4F, #40916C)",
                color: "white",
                border: "none",
                borderRadius: "12px",
                fontFamily: "Cabinet Grotesk, sans-serif",
                fontWeight: 800,
                fontSize: "15px",
                cursor: "pointer",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                gap: "6px",
                transition: "all 0.2s",
              }}
              onMouseEnter={(e) => { (e.currentTarget as HTMLElement).style.transform = "scale(1.02)"; }}
              onMouseLeave={(e) => { (e.currentTarget as HTMLElement).style.transform = "scale(1)"; }}
            >
              {isLoading ? (
                <Loader2 size={18} style={{ animation: "spin 1s linear infinite" }} />
              ) : step === 1
                ? "Continue to Delivery"
                : step === 2
                ? "Continue to Payment"
                : `Pay ₹${total}`}
              {!isLoading && <ChevronRight size={16} />}
            </button>
          </div>
        )}
      </div>
        {/* Animation Styles */}
        <style jsx global>{`
          @keyframes scan {
            0% { top: 0%; opacity: 0; }
            10% { opacity: 1; }
            90% { opacity: 1; }
            100% { top: 100%; opacity: 0; }
          }

          .confetti-burst {
            position: absolute;
            inset: -20px;
            pointer-events: none;
          }

          .confetti-burst::before, .confetti-burst::after {
            content: "";
            position: absolute;
            inset: 0;
            background-image: radial-gradient(#22c55e 2px, transparent 2px), radial-gradient(#E9A23B 2px, transparent 2px), radial-gradient(#3b82f6 2px, transparent 2px);
            background-size: 15px 15px, 20px 20px, 25px 25px;
            background-position: 0 0, 5px 5px, 10px 10px;
            animation: confetti 1.5s ease-out forwards;
            opacity: 0;
          }

          @keyframes confetti {
            0% { transform: scale(0.5); opacity: 0; }
            20% { opacity: 1; }
            100% { transform: scale(2); opacity: 0; }
          }
          @keyframes fadeIn {
            from { opacity: 0; }
            to { opacity: 1; }
          }
          @keyframes scaleIn {
            from { opacity: 0; transform: translate(-50%, -45%) scale(0.95); }
            to { opacity: 1; transform: translate(-50%, -50%) scale(1); }
          }
        `}</style>
    </>
  );
}
