import Link from "next/link";
import { MapPin, Phone, Mail, Share2, MessageCircle, Play } from "lucide-react";

export function Footer() {
  return (
    <footer
      style={{
        background: "#1a1a1a",
        color: "rgba(255,255,255,0.7)",
        paddingTop: "60px",
        paddingBottom: "32px",
        marginTop: "80px",
      }}
    >
      <div className="max-w-screen">
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fit, minmax(200px, 1fr))",
            gap: "40px",
            paddingBottom: "48px",
            borderBottom: "1px solid rgba(255,255,255,0.08)",
          }}
        >
          {/* Brand */}
          <div>
            <div style={{ display: "flex", alignItems: "center", gap: "10px", marginBottom: "16px" }}>
              <div
                style={{
                  width: "36px",
                  height: "36px",
                  background: "linear-gradient(135deg, #2D6A4F, #40916C)",
                  borderRadius: "10px",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  fontSize: "18px",
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
                  color: "white",
                }}
              >
                Kirana<span style={{ color: "#74C69D" }}>.</span>
              </span>
            </div>
            <p style={{ fontSize: "14px", lineHeight: 1.7, marginBottom: "20px" }}>
              Raigarh&apos;s trusted Kirana store — bringing mandi-fresh
              groceries to your doorstep in 30 minutes.
            </p>
            <div style={{ display: "flex", alignItems: "center", gap: "6px", marginBottom: "8px" }}>
              <MapPin size={14} color="#74C69D" />
              <span style={{ fontSize: "13px" }}>Raigarh, Chhattisgarh</span>
            </div>
            <div style={{ display: "flex", alignItems: "center", gap: "6px", marginBottom: "8px" }}>
              <Phone size={14} color="#74C69D" />
              <span style={{ fontSize: "13px" }}>+91 9993962007</span>
            </div>
            <div style={{ display: "flex", alignItems: "center", gap: "6px" }}>
              <Mail size={14} color="#74C69D" />
              <span style={{ fontSize: "13px" }}>rakeshsao589@gmail.com</span>
            </div>
          </div>

          {/* Shop */}
          <div>
            <h4 style={{ color: "white", fontFamily: "Cabinet Grotesk, sans-serif", fontWeight: 800, fontSize: "16px", marginBottom: "16px" }}>
              Shop
            </h4>
            {[
              { name: "Rice & Grains", id: "rice-grains" },
              { name: "Dals & Pulses", id: "dals-pulses" },
              { name: "Edible Oils", id: "edible-oils" },
              { name: "Snacks & Beverages", id: "snacks" },
              { name: "Dairy Products", id: "dairy" },
              { name: "Millets & Seeds", id: "millets" },
              { name: "Household", id: "household" },
              { name: "Personal Care", id: "personal-care" }
            ].map((item) => (
              <div key={item.name} style={{ marginBottom: "10px" }}>
                <button
                  onClick={() => {
                    window.dispatchEvent(new CustomEvent("filter-category", { detail: item.id }));
                    document.getElementById("products-section")?.scrollIntoView({ behavior: "smooth" });
                  }}
                  style={{
                    background: "none",
                    border: "none",
                    padding: 0,
                    color: "rgba(255,255,255,0.6)",
                    textDecoration: "none",
                    fontSize: "14px",
                    fontFamily: "Satoshi, sans-serif",
                    transition: "color 0.2s",
                    cursor: "pointer",
                    textAlign: "left"
                  }}
                  onMouseEnter={(e) => ((e.target as HTMLElement).style.color = "#74C69D")}
                  onMouseLeave={(e) => ((e.target as HTMLElement).style.color = "rgba(255,255,255,0.6)")}
                >
                  {item.name}
                </button>
              </div>
            ))}
          </div>

          {/* Account */}
          <div>
            <h4 style={{ color: "white", fontFamily: "Cabinet Grotesk, sans-serif", fontWeight: 800, fontSize: "16px", marginBottom: "16px" }}>
              Account
            </h4>
            {[
              { name: "Sign In", href: "/login" },
              { name: "My Orders", href: "/login" },
              { name: "Wishlist", href: "/login" },
              { name: "Register", href: "/register" },
            ].map((item) => (
              <div key={item.name} style={{ marginBottom: "10px" }}>
                <Link 
                  href={item.href} 
                  style={{ 
                    color: "rgba(255,255,255,0.6)", 
                    textDecoration: "none", 
                    fontSize: "14px", 
                    fontFamily: "Satoshi, sans-serif",
                    transition: "color 0.2s",
                  }}
                  onMouseEnter={(e) => ((e.target as HTMLElement).style.color = "#74C69D")}
                  onMouseLeave={(e) => ((e.target as HTMLElement).style.color = "rgba(255,255,255,0.6)")}
                >
                  {item.name}
                </Link>
              </div>
            ))}
          </div>

          {/* Support */}
          <div>
            <h4 style={{ color: "white", fontFamily: "Cabinet Grotesk, sans-serif", fontWeight: 800, fontSize: "16px", marginBottom: "16px" }}>
              Support
            </h4>
            {[
              { name: "Help Centre", href: "https://wa.me/919993962007" },
              { name: "Contact Us", href: "mailto:rakeshsao589@gmail.com" },
              { name: "Return Policy", href: "#" },
              { name: "Privacy Policy", href: "#" },
              { name: "Terms of Service", href: "#" },
              { name: "Track My Order", href: "/login" }
            ].map((item) => (
              <div key={item.name} style={{ marginBottom: "10px" }}>
                <a 
                  href={item.href} 
                  style={{ 
                    color: "rgba(255,255,255,0.6)", 
                    textDecoration: "none", 
                    fontSize: "14px", 
                    fontFamily: "Satoshi, sans-serif",
                    transition: "color 0.2s",
                    cursor: "pointer"
                  }}
                  onMouseEnter={(e) => ((e.target as HTMLElement).style.color = "#74C69D")}
                  onMouseLeave={(e) => ((e.target as HTMLElement).style.color = "rgba(255,255,255,0.6)")}
                >
                  {item.name}
                </a>
              </div>
            ))}

            {/* Social */}
            <div style={{ display: "flex", gap: "12px", marginTop: "24px" }}>
            {[Share2, MessageCircle, Play].map((Icon, i) => (
                <a
                  key={i}
                  href="#"
                  style={{
                    width: "38px",
                    height: "38px",
                    borderRadius: "10px",
                    background: "rgba(255,255,255,0.07)",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    transition: "background 0.2s",
                  }}
                  onMouseEnter={(e) => ((e.currentTarget as HTMLElement).style.background = "#2D6A4F")}
                  onMouseLeave={(e) => ((e.currentTarget as HTMLElement).style.background = "rgba(255,255,255,0.07)")}
                >
                  <Icon size={17} color="rgba(255,255,255,0.7)" />
                </a>
              ))}
            </div>
          </div>
        </div>

        {/* Bottom bar */}
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            paddingTop: "28px",
            flexWrap: "wrap",
            gap: "12px",
          }}
        >
          <p style={{ fontSize: "13px" }}>
            © 2025 Kirana Market. Made with ❤️ in Raigarh, Chhattisgarh.
          </p>
          <div style={{ display: "flex", gap: "8px", alignItems: "center" }}>
            {["UPI", "Visa", "Mastercard", "COD"].map((pay) => (
              <span
                key={pay}
                style={{
                  background: "rgba(255,255,255,0.08)",
                  padding: "4px 10px",
                  borderRadius: "6px",
                  fontSize: "11px",
                  fontWeight: 600,
                  color: "rgba(255,255,255,0.6)",
                  fontFamily: "Satoshi, sans-serif",
                }}
              >
                {pay}
              </span>
            ))}
          </div>
        </div>
      </div>
    </footer>
  );
}
