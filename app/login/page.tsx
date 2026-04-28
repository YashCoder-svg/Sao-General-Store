"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { ArrowLeft, Phone, ShieldCheck, Loader2, KeyRound, User as UserIcon, Lock, Mail } from "lucide-react";
import { useRouter } from "next/navigation";
import { initializeApp, getApps } from "firebase/app";
import { getAuth, RecaptchaVerifier, signInWithPhoneNumber, ConfirmationResult } from "firebase/auth";

// Firebase project config
const firebaseConfig = {
  apiKey: "AIzaSyAwB6u3URlHNvfIDZKFRz-2eDX7u-aDkQg",
  authDomain: "saogeneralstore.firebaseapp.com",
  projectId: "saogeneralstore",
  storageBucket: "saogeneralstore.firebasestorage.app",
  messagingSenderId: "82710028919",
  appId: "1:82710028919:web:efad8569c8620348fcdc72",
  measurementId: "G-EKCD4GMG49"
};

const app = getApps().length === 0 ? initializeApp(firebaseConfig) : getApps()[0];
const auth = getAuth(app);

export default function LoginPage() {
  const [loginType, setLoginType] = useState<"user" | "admin">("user");
  const [step, setStep] = useState<"phone" | "otp">("phone");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [otp, setOtp] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [timer, setTimer] = useState(30);
  const [confirmationResult, setConfirmationResult] = useState<ConfirmationResult | null>(null);
  const router = useRouter();

  useEffect(() => {
    let interval: NodeJS.Timeout;
    if (step === "otp" && timer > 0) {
      interval = setInterval(() => {
        setTimer((prev) => prev - 1);
      }, 1000);
    }
    return () => clearInterval(interval);
  }, [step, timer]);

  const setupRecaptcha = () => {
    // Always clear the old verifier — reusing a stale one after a re-render
    // causes "reCAPTCHA client element has been removed" errors.
    if (window.recaptchaVerifier) {
      try { window.recaptchaVerifier.clear(); } catch (_) {}
      window.recaptchaVerifier = null as any;
    }
    window.recaptchaVerifier = new RecaptchaVerifier(auth, 'recaptcha-container', {
      size: 'invisible',
      callback: () => {},
    });
  };

  const handleSendOTP = async (e: React.FormEvent) => {
    e.preventDefault();
    if (phoneNumber.length < 10) {
      alert("Please enter a valid 10-digit phone number");
      return;
    }

    setIsLoading(true);
    try {
      setupRecaptcha();
      const appVerifier = window.recaptchaVerifier;
      const formattedPhone = `+91${phoneNumber}`;
      const result = await signInWithPhoneNumber(auth, formattedPhone, appVerifier);
      setConfirmationResult(result);
      setStep("otp");
      setTimer(30);
    } catch (error: any) {
      console.error("Error:", error);
      // Reset verifier so the next attempt starts fresh
      if (window.recaptchaVerifier) {
        try { window.recaptchaVerifier.clear(); } catch (_) {}
        window.recaptchaVerifier = null as any;
      }
      alert(error.message || "Failed to send OTP. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };

  const handleVerifyOTP = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!confirmationResult) return;
    setIsLoading(true);
    try {
      const result = await confirmationResult.confirm(otp);
      
      // Try to sync the name from localStorage to the Firebase Profile
      const phone = result.user.phoneNumber || "";
      const savedName = localStorage.getItem(`name_${phone}`);
      if (savedName && !result.user.displayName) {
        try {
          const { updateProfile } = await import("firebase/auth");
          await updateProfile(result.user, { displayName: savedName });
        } catch (err) {
          console.error("Failed to update profile name:", err);
        }
      }

      alert("User Login successful!");
      router.push("/");
      // Force reload to ensure everything is fresh
      setTimeout(() => window.location.reload(), 500);
    } catch (error: any) {
      alert("Invalid OTP.");
    } finally {
      setIsLoading(false);
    }
  };

  const handleAdminLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    // Simulate admin login
    await new Promise((resolve) => setTimeout(resolve, 1500));
    if (email === "admin@kirana.com" && password === "admin123") {
      localStorage.setItem("kirana_admin_session", "true");
      alert("Admin Login successful!");
      router.push("/admin");
      // Use reload to ensure AuthContext picks up the new localStorage value immediately
      setTimeout(() => window.location.reload(), 500);
    } else {
      alert("Invalid Admin credentials. (Use admin@kirana.com / admin123)");
    }
    setIsLoading(false);
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
      }}
    >
      <div id="recaptcha-container"></div>

      {/* Login Card */}
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
        <div style={{ textAlign: "center", marginBottom: "32px" }}>
          <div
            style={{
              width: "56px",
              height: "56px",
              background: loginType === "user" ? "#2D6A4F" : "#1a1a1a",
              borderRadius: "16px",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              fontSize: "28px",
              margin: "0 auto 20px",
              color: "white"
            }}
          >
            {loginType === "user" ? "🛒" : "👨‍💼"}
          </div>
          <h1 style={{ fontSize: "26px", fontWeight: 800, fontFamily: "Cabinet Grotesk, sans-serif" }}>
            {loginType === "user" ? "User Login" : "Admin Login"}
          </h1>
          <p style={{ color: "#6b7280", fontSize: "14px", marginTop: "8px" }}>
            {loginType === "user" ? "Sign in to your customer account" : "Enter owner credentials to manage store"}
          </p>
        </div>

        {/* Tab Switcher */}
        <div style={{ display: "flex", background: "#f3f4f6", padding: "4px", borderRadius: "12px", marginBottom: "32px" }}>
          <button
            onClick={() => { setLoginType("user"); setStep("phone"); }}
            style={{
              flex: 1, padding: "10px", borderRadius: "10px", border: "none",
              background: loginType === "user" ? "white" : "transparent",
              fontWeight: 700, fontSize: "14px", cursor: "pointer",
              boxShadow: loginType === "user" ? "0 2px 8px rgba(0,0,0,0.05)" : "none",
              color: loginType === "user" ? "#2D6A4F" : "#6b7280"
            }}
          >
            User
          </button>
          <button
            onClick={() => setLoginType("admin")}
            style={{
              flex: 1, padding: "10px", borderRadius: "10px", border: "none",
              background: loginType === "admin" ? "white" : "transparent",
              fontWeight: 700, fontSize: "14px", cursor: "pointer",
              boxShadow: loginType === "admin" ? "0 2px 8px rgba(0,0,0,0.05)" : "none",
              color: loginType === "admin" ? "#1a1a1a" : "#6b7280"
            }}
          >
            Admin
          </button>
        </div>

        {loginType === "user" ? (
          /* USER FLOW */
          step === "phone" ? (
            <form onSubmit={handleSendOTP} style={{ display: "flex", flexDirection: "column", gap: "20px" }}>
              <div>
                <label style={{ display: "block", fontSize: "13px", fontWeight: 700, marginBottom: "8px" }}>Phone Number</label>
                <div style={{ position: "relative" }}>
                  <Phone size={18} style={{ position: "absolute", left: "16px", top: "50%", transform: "translateY(-50%)", color: "#9ca3af" }} />
                  <input
                    type="tel"
                    required
                    value={phoneNumber}
                    onChange={(e) => setPhoneNumber(e.target.value.replace(/\D/g, ""))}
                    placeholder="10 digit mobile number"
                    style={{ width: "100%", padding: "16px 16px 16px 48px", borderRadius: "14px", border: "1.5px solid #E8E4DC", fontSize: "15px", outline: "none" }}
                  />
                </div>
              </div>
              <button
                type="submit"
                disabled={isLoading}
                style={{ background: "#2D6A4F", color: "white", padding: "16px", borderRadius: "14px", border: "none", fontWeight: 700, fontSize: "16px", cursor: "pointer" }}
              >
                {isLoading ? <Loader2 size={20} className="animate-spin" /> : "Send OTP"}
              </button>
            </form>
          ) : (
            <form onSubmit={handleVerifyOTP} style={{ display: "flex", flexDirection: "column", gap: "20px" }}>
              <div>
                <label style={{ display: "block", fontSize: "13px", fontWeight: 700, marginBottom: "8px" }}>Enter 6-digit OTP</label>
                <input
                  type="text"
                  required
                  autoFocus
                  value={otp}
                  onChange={(e) => setOtp(e.target.value.replace(/\D/g, ""))}
                  placeholder="------"
                  style={{ width: "100%", padding: "16px", borderRadius: "14px", border: "1.5px solid #E8E4DC", fontSize: "20px", textAlign: "center", fontWeight: 700, letterSpacing: "8px" }}
                />
              </div>
              <button
                type="submit"
                disabled={isLoading}
                style={{ background: "#2D6A4F", color: "white", padding: "16px", borderRadius: "14px", border: "none", fontWeight: 700, fontSize: "16px", cursor: "pointer" }}
              >
                {isLoading ? <Loader2 size={20} className="animate-spin" /> : "Verify & Login"}
              </button>
              <button type="button" onClick={() => setStep("phone")} style={{ background: "none", border: "none", color: "#2D6A4F", fontWeight: 700, fontSize: "13px", cursor: "pointer" }}>Change Number</button>
            </form>
          )
        ) : (
          /* ADMIN FLOW */
          <form onSubmit={handleAdminLogin} style={{ display: "flex", flexDirection: "column", gap: "20px" }}>
            <div>
              <label style={{ display: "block", fontSize: "13px", fontWeight: 700, marginBottom: "8px" }}>Admin Email</label>
              <div style={{ position: "relative" }}>
                <Mail size={18} style={{ position: "absolute", left: "16px", top: "50%", transform: "translateY(-50%)", color: "#9ca3af" }} />
                <input
                  type="email"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="admin@kirana.com"
                  style={{ width: "100%", padding: "16px 16px 16px 48px", borderRadius: "14px", border: "1.5px solid #E8E4DC", fontSize: "15px", outline: "none" }}
                />
              </div>
            </div>
            <div>
              <label style={{ display: "block", fontSize: "13px", fontWeight: 700, marginBottom: "8px" }}>Password</label>
              <div style={{ position: "relative" }}>
                <Lock size={18} style={{ position: "absolute", left: "16px", top: "50%", transform: "translateY(-50%)", color: "#9ca3af" }} />
                <input
                  type="password"
                  required
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="••••••••"
                  style={{ width: "100%", padding: "16px 16px 16px 48px", borderRadius: "14px", border: "1.5px solid #E8E4DC", fontSize: "15px", outline: "none" }}
                />
              </div>
            </div>
            <button
              type="submit"
              disabled={isLoading}
              style={{ background: "#1a1a1a", color: "white", padding: "16px", borderRadius: "14px", border: "none", fontWeight: 700, fontSize: "16px", cursor: "pointer" }}
            >
              {isLoading ? <Loader2 size={20} className="animate-spin" /> : "Admin Login"}
            </button>
          </form>
        )}

        {loginType === "user" && (
          <div style={{ marginTop: "32px", textAlign: "center", fontSize: "14px", color: "#6b7280" }}>
            New to Kirana Market? <Link href="/register" style={{ color: "#2D6A4F", fontWeight: 700, textDecoration: "none" }}>Create Account</Link>
          </div>
        )}
      </div>

      <style jsx global>{`
        @keyframes spin { from { transform: rotate(0deg); } to { transform: rotate(360deg); } }
        .animate-spin { animation: spin 1s linear infinite; }
      `}</style>
    </div>
  );
}

declare global {
  interface Window { recaptchaVerifier: any; }
}
