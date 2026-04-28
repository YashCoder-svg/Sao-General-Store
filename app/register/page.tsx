"use client";

import React, { useState } from "react";
import Link from "next/link";
import { ArrowLeft, User, Phone, Mail, ShieldCheck, Loader2 } from "lucide-react";
import { useRouter } from "next/navigation";

export default function RegisterPage() {
  const [isLoading, setIsLoading] = useState(false);
  const [formData, setFormData] = useState({ name: "", phone: "", email: "" });
  const router = useRouter();

  const handleRegister = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    
    // Save name to localStorage for the AuthContext to pick up after login
    const formattedPhone = `+91${formData.phone}`;
    localStorage.setItem(`name_${formattedPhone}`, formData.name);
    
    // Simulate registration delay
    await new Promise((resolve) => setTimeout(resolve, 1000));
    
    setIsLoading(false);
    alert(`Registration successful for ${formData.name}! Please login with your phone number.`);
    router.push("/login");
  };

  return (
    <div 
      style={{ 
        minHeight: "100vh", 
        background: "#FAFAF7",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        padding: "24px",
        position: "relative"
      }}
    >
      {/* Back Button */}
      <Link 
        href="/login"
        style={{
          position: "absolute",
          top: "40px",
          left: "40px",
          display: "flex",
          alignItems: "center",
          gap: "8px",
          color: "#6b7280",
          textDecoration: "none",
          fontSize: "14px",
          fontWeight: 600,
          zIndex: 10
        }}
      >
        <ArrowLeft size={18} />
        Back to Login
      </Link>

      <div
        style={{
          background: "white",
          width: "100%",
          maxWidth: "440px",
          borderRadius: "32px",
          padding: "48px",
          boxShadow: "0 20px 60px rgba(0,0,0,0.05)",
          border: "1px solid rgba(232,228,220,0.6)",
        }}
      >
        <div style={{ textAlign: "center", marginBottom: "40px" }}>
          <h1 style={{ 
            fontSize: "28px", 
            fontWeight: 800, 
            color: "#0a0a0a", 
            marginBottom: "12px", 
            fontFamily: "Cabinet Grotesk, sans-serif" 
          }}>
            Create Account
          </h1>
          <p style={{ color: "#6b7280", fontSize: "15px" }}>
            Join Kirana Market for fast delivery in Raigarh.
          </p>
        </div>

        <form onSubmit={handleRegister} style={{ display: "flex", flexDirection: "column", gap: "20px" }}>
          <div>
            <label style={{ display: "block", fontSize: "13px", fontWeight: 700, marginBottom: "8px" }}>Full Name</label>
            <div style={{ position: "relative" }}>
              <User size={18} style={{ position: "absolute", left: "16px", top: "50%", transform: "translateY(-50%)", color: "#9ca3af" }} />
              <input
                type="text"
                required
                value={formData.name}
                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                placeholder="Enter your name"
                style={{
                  width: "100%",
                  padding: "16px 16px 16px 48px",
                  borderRadius: "14px",
                  border: "1.5px solid #E8E4DC",
                  fontSize: "15px",
                  outline: "none"
                }}
              />
            </div>
          </div>

          <div>
            <label style={{ display: "block", fontSize: "13px", fontWeight: 700, marginBottom: "8px" }}>Phone Number</label>
            <div style={{ position: "relative" }}>
              <Phone size={18} style={{ position: "absolute", left: "16px", top: "50%", transform: "translateY(-50%)", color: "#9ca3af" }} />
              <input
                type="tel"
                required
                value={formData.phone}
                onChange={(e) => setFormData({ ...formData, phone: e.target.value.replace(/\D/g, "") })}
                placeholder="10 digit mobile number"
                style={{
                  width: "100%",
                  padding: "16px 16px 16px 48px",
                  borderRadius: "14px",
                  border: "1.5px solid #E8E4DC",
                  fontSize: "15px",
                  outline: "none"
                }}
              />
            </div>
          </div>

          <div>
            <label style={{ display: "block", fontSize: "13px", fontWeight: 700, marginBottom: "8px" }}>Email (Optional)</label>
            <div style={{ position: "relative" }}>
              <Mail size={18} style={{ position: "absolute", left: "16px", top: "50%", transform: "translateY(-50%)", color: "#9ca3af" }} />
              <input
                type="email"
                value={formData.email}
                onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                placeholder="name@example.com"
                style={{
                  width: "100%",
                  padding: "16px 16px 16px 48px",
                  borderRadius: "14px",
                  border: "1.5px solid #E8E4DC",
                  fontSize: "15px",
                  outline: "none"
                }}
              />
            </div>
          </div>

          <button
            type="submit"
            disabled={isLoading}
            style={{
              background: "#2D6A4F",
              color: "white",
              padding: "16px",
              borderRadius: "14px",
              border: "none",
              fontWeight: 700,
              fontSize: "16px",
              cursor: "pointer",
              marginTop: "10px",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              gap: "10px"
            }}
          >
            {isLoading ? <Loader2 size={20} className="animate-spin" /> : "Sign Up"}
          </button>
        </form>

        <div style={{ marginTop: "32px", textAlign: "center", fontSize: "14px", color: "#6b7280" }}>
          Already have an account? <Link href="/login" style={{ color: "#2D6A4F", fontWeight: 700, textDecoration: "none" }}>Sign In</Link>
        </div>
      </div>

      <style jsx global>{`
        @keyframes spin { from { transform: rotate(0deg); } to { transform: rotate(360deg); } }
        .animate-spin { animation: spin 1s linear infinite; }
      `}</style>
    </div>
  );
}
