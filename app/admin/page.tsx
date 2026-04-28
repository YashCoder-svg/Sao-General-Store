"use client";

import { useState } from "react";
import Link from "next/link";
import {
  LayoutDashboard, Package, ShoppingBag, Plus, X,
  TrendingUp, AlertTriangle, CheckCircle2, Clock, XCircle,
  Edit, Eye, EyeOff, Star
} from "lucide-react";
import { PRODUCTS, CATEGORIES, Product } from "@/lib/products";

type OrderStatus = "Pending" | "Confirmed" | "Delivered" | "Cancelled";

const MOCK_ORDERS = [
  { id: "KM291847", customer: "Ravi Kumar", items: 3, total: 1249, status: "Delivered" as OrderStatus, time: "2:14 PM" },
  { id: "KM384920", customer: "Priya Sharma", items: 1, total: 399, status: "Confirmed" as OrderStatus, time: "2:31 PM" },
  { id: "KM102938", customer: "Suresh Reddy", items: 5, total: 892, status: "Pending" as OrderStatus, time: "2:55 PM" },
  { id: "KM847261", customer: "Lalitha Devi", items: 2, total: 318, status: "Pending" as OrderStatus, time: "3:02 PM" },
  { id: "KM019283", customer: "Arjun Varma", items: 4, total: 1650, status: "Cancelled" as OrderStatus, time: "1:45 PM" },
];

const STATUS_STYLES: Record<OrderStatus, { bg: string; color: string; icon: typeof CheckCircle2 }> = {
  Delivered: { bg: "#D8F3DC", color: "#2D6A4F", icon: CheckCircle2 },
  Confirmed: { bg: "#DBEAFE", color: "#2563EB", icon: Clock },
  Pending: { bg: "#FEF3C7", color: "#D97706", icon: Clock },
  Cancelled: { bg: "#FEE2E2", color: "#DC2626", icon: XCircle },
};

const EMPTY_PRODUCT = {
  name: "", brand: "", category: "atta-rice-dal", price: "", mrp: "",
  weight: "", image: "", badge: "", delivery: "30 min",
};

type Tab = "dashboard" | "products" | "orders";

function ProductImagePreview({
  src,
  alt,
}: {
  src: string;
  alt: string;
}) {
  const [failed, setFailed] = useState(!src);

  return (
    <div
      style={{
        width: "80px",
        height: "80px",
        background: "white",
        borderRadius: "8px",
        border: "1px solid #E8E4DC",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        overflow: "hidden",
        padding: "6px",
        flexShrink: 0,
      }}
    >
      {!failed && src ? (
        /* eslint-disable-next-line @next/next/no-img-element */
        <img
          src={src}
          alt={alt}
          style={{ width: "100%", height: "100%", objectFit: "contain" }}
          onError={() => setFailed(true)}
        />
      ) : (
        <div style={{ fontSize: "24px" }}>🛒</div>
      )}
    </div>
  );
}

export default function AdminPage() {
  const [tab, setTab] = useState<Tab>("dashboard");
  const [products, setProducts] = useState<Product[]>(PRODUCTS);
  const [orders, setOrders] = useState(MOCK_ORDERS);
  const [showAddForm, setShowAddForm] = useState(false);
  const [newProduct, setNewProduct] = useState(EMPTY_PRODUCT);
  const [formError, setFormError] = useState("");
  const hasPreviewInput = Boolean(newProduct.image);
  const previewImage = newProduct.image;

  const todayRevenue = MOCK_ORDERS.filter(o => o.status !== "Cancelled").reduce((a, o) => a + o.total, 0);
  const pendingCount = MOCK_ORDERS.filter(o => o.status === "Pending").length;
  const lowStock = products.filter(p => p.inStock === false).length;

  const handleAddProduct = () => {
    if (!newProduct.name || !newProduct.price || !newProduct.brand || !newProduct.image) {
      setFormError("Name, Brand, Price and Image URL are required.");
      return;
    }
    const p: Product = {
      id: "new-" + Date.now(),
      name: newProduct.name,
      brand: newProduct.brand,
      category: newProduct.category,
      price: Number(newProduct.price),
      mrp: Number(newProduct.mrp) || Number(newProduct.price),
      weight: newProduct.weight || "1 unit",
      delivery: newProduct.delivery,
      image: newProduct.image,
      badge: (newProduct.badge as Product["badge"]) || undefined,
      rating: 4.5,
      reviews: 0,
      inStock: true,
    };
    setProducts(prev => [p, ...prev]);
    setNewProduct(EMPTY_PRODUCT);
    setShowAddForm(false);
    setFormError("");
  };

  const toggleStock = (id: string) => {
    setProducts(prev => prev.map(p => p.id === id ? { ...p, inStock: !p.inStock } : p));
  };

  const updateOrderStatus = (id: string, status: OrderStatus) => {
    setOrders(prev => prev.map(o => o.id === id ? { ...o, status } : o));
  };

  const inputStyle = {
    width: "100%", padding: "10px 14px", borderRadius: "10px",
    border: "1.5px solid #E8E4DC", fontFamily: "Satoshi, sans-serif",
    fontSize: "13.5px", outline: "none", background: "white",
  };

  const labelStyle = {
    fontSize: "12px", fontWeight: 600, color: "#6b7280",
    fontFamily: "Satoshi, sans-serif", display: "block" as const, marginBottom: "6px",
  };

  return (
    <div style={{ minHeight: "100vh", background: "#F3F4F6", fontFamily: "Satoshi, sans-serif" }}>
      {/* Top bar */}
      <div style={{ background: "#0a0a0a", padding: "0 32px", height: "60px", display: "flex", alignItems: "center", justifyContent: "space-between" }}>
        <span style={{ fontFamily: "Cabinet Grotesk, sans-serif", fontWeight: 900, fontSize: "20px", letterSpacing: "-0.5px", color: "white" }}>
          Kirana<span style={{ color: "#74C69D" }}>.</span> Admin
        </span>
        <Link href="/" style={{ fontSize: "13px", color: "rgba(255,255,255,0.6)", textDecoration: "none", fontWeight: 600, transition: "color 0.2s" }}
          onMouseEnter={e => (e.currentTarget.style.color = "#74C69D")}
          onMouseLeave={e => (e.currentTarget.style.color = "rgba(255,255,255,0.6)")}>
          ← View Store
        </Link>
      </div>

      <div style={{ display: "grid", gridTemplateColumns: "220px 1fr", minHeight: "calc(100vh - 60px)" }}>
        {/* Sidebar */}
        <aside style={{ background: "white", borderRight: "1px solid #E8E4DC", padding: "24px 16px" }}>
          {[
            { id: "dashboard", label: "Dashboard", icon: LayoutDashboard },
            { id: "products", label: "Products", icon: Package },
            { id: "orders", label: "Orders", icon: ShoppingBag },
          ].map(({ id, label, icon: Icon }) => (
            <button
              key={id}
              onClick={() => setTab(id as Tab)}
              style={{
                width: "100%", display: "flex", alignItems: "center", gap: "10px",
                padding: "11px 14px", borderRadius: "10px", border: "none",
                background: tab === id ? "#D8F3DC" : "transparent",
                color: tab === id ? "#2D6A4F" : "#6b7280",
                fontFamily: "Satoshi, sans-serif", fontWeight: tab === id ? 700 : 500,
                fontSize: "14px", cursor: "pointer", marginBottom: "4px",
                transition: "all 0.2s", textAlign: "left" as const,
              }}
            >
              <Icon size={17} />
              {label}
            </button>
          ))}
        </aside>

        {/* Main content */}
        <main style={{ padding: "28px 32px" }}>

          {/* ── DASHBOARD ── */}
          {tab === "dashboard" && (
            <div>
              <h1 style={{ fontFamily: "Cabinet Grotesk, sans-serif", fontWeight: 900, fontSize: "26px", letterSpacing: "-0.5px", marginBottom: "24px", color: "#0a0a0a" }}>
                Dashboard
              </h1>

              {/* Stat cards */}
              <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(200px, 1fr))", gap: "16px", marginBottom: "32px" }}>
                {[
                  { label: "Today's Revenue", value: `₹${todayRevenue.toLocaleString()}`, icon: TrendingUp, color: "#2D6A4F", bg: "#D8F3DC" },
                  { label: "Total Orders", value: MOCK_ORDERS.length, icon: ShoppingBag, color: "#2563EB", bg: "#DBEAFE" },
                  { label: "Pending Orders", value: pendingCount, icon: Clock, color: "#D97706", bg: "#FEF3C7" },
                  { label: "Low Stock Items", value: lowStock, icon: AlertTriangle, color: "#DC2626", bg: "#FEE2E2" },
                  { label: "Total Products", value: products.length, icon: Package, color: "#7C3AED", bg: "#EDE9FE" },
                ].map(({ label, value, icon: Icon, color, bg }) => (
                  <div
                    key={label}
                    style={{
                      background: "white", borderRadius: "16px", padding: "20px",
                      border: "1px solid #E8E4DC", display: "flex", flexDirection: "column", gap: "12px",
                    }}
                  >
                    <div style={{ width: "40px", height: "40px", borderRadius: "10px", background: bg, display: "flex", alignItems: "center", justifyContent: "center" }}>
                      <Icon size={20} color={color} />
                    </div>
                    <div>
                      <p style={{ fontSize: "24px", fontFamily: "Cabinet Grotesk, sans-serif", fontWeight: 800, color: "#0a0a0a", lineHeight: 1 }}>{value}</p>
                      <p style={{ fontSize: "13px", color: "#6b7280", marginTop: "4px" }}>{label}</p>
                    </div>
                  </div>
                ))}
              </div>

              {/* Recent orders */}
              <div style={{ background: "white", borderRadius: "16px", border: "1px solid #E8E4DC", overflow: "hidden" }}>
                <div style={{ padding: "18px 20px", borderBottom: "1px solid #E8E4DC" }}>
                  <h3 style={{ fontFamily: "Cabinet Grotesk, sans-serif", fontWeight: 800, fontSize: "17px" }}>Recent Orders</h3>
                </div>
                <table style={{ width: "100%", borderCollapse: "collapse" }}>
                  <thead>
                    <tr style={{ background: "#FAFAF7" }}>
                      {["Order ID", "Customer", "Items", "Total", "Status", "Time"].map(h => (
                        <th key={h} style={{ padding: "11px 16px", textAlign: "left" as const, fontSize: "12px", fontWeight: 700, color: "#6b7280", textTransform: "uppercase" as const, letterSpacing: "0.07em" }}>{h}</th>
                      ))}
                    </tr>
                  </thead>
                  <tbody>
                    {orders.map((o, i) => {
                      const s = STATUS_STYLES[o.status];
                      const StatusIcon = s.icon;
                      return (
                        <tr key={o.id} style={{ borderTop: i > 0 ? "1px solid #E8E4DC" : "none" }}>
                          <td style={{ padding: "13px 16px", fontFamily: "Cabinet Grotesk, sans-serif", fontWeight: 700, fontSize: "13px" }}>#{o.id}</td>
                          <td style={{ padding: "13px 16px", fontSize: "13.5px", fontWeight: 600 }}>{o.customer}</td>
                          <td style={{ padding: "13px 16px", fontSize: "13.5px", color: "#6b7280" }}>{o.items} items</td>
                          <td style={{ padding: "13px 16px", fontFamily: "Cabinet Grotesk, sans-serif", fontWeight: 800, fontSize: "14px" }}>₹{o.total}</td>
                          <td style={{ padding: "13px 16px" }}>
                            <span style={{ display: "inline-flex", alignItems: "center", gap: "5px", background: s.bg, color: s.color, padding: "4px 10px", borderRadius: "6px", fontSize: "12px", fontWeight: 700 }}>
                              <StatusIcon size={11} /> {o.status}
                            </span>
                          </td>
                          <td style={{ padding: "13px 16px", fontSize: "13px", color: "#6b7280" }}>{o.time}</td>
                        </tr>
                      );
                    })}
                  </tbody>
                </table>
              </div>
            </div>
          )}

          {/* ── PRODUCTS ── */}
          {tab === "products" && (
            <div>
              <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "24px" }}>
                <h1 style={{ fontFamily: "Cabinet Grotesk, sans-serif", fontWeight: 900, fontSize: "26px", letterSpacing: "-0.5px", color: "#0a0a0a" }}>
                  Products ({products.length})
                </h1>
                <button
                  onClick={() => setShowAddForm(true)}
                  style={{
                    display: "flex", alignItems: "center", gap: "7px", padding: "11px 22px",
                    background: "#2D6A4F", color: "white", border: "none", borderRadius: "12px",
                    fontFamily: "Satoshi, sans-serif", fontWeight: 700, fontSize: "14px", cursor: "pointer",
                  }}
                >
                  <Plus size={16} /> Add Product
                </button>
              </div>

              {/* Add product form */}
              {showAddForm && (
                <div
                  style={{
                    background: "white", borderRadius: "16px", border: "2px solid #2D6A4F",
                    padding: "24px", marginBottom: "20px",
                  }}
                >
                  <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "20px" }}>
                    <h3 style={{ fontFamily: "Cabinet Grotesk, sans-serif", fontWeight: 800, fontSize: "18px" }}>Add New Product</h3>
                    <button onClick={() => { setShowAddForm(false); setFormError(""); }} style={{ border: "none", background: "none", cursor: "pointer" }}>
                      <X size={20} />
                    </button>
                  </div>

                  {formError && (
                    <div style={{ background: "#FEE2E2", color: "#DC2626", padding: "10px 14px", borderRadius: "8px", fontSize: "13px", marginBottom: "16px", fontWeight: 600 }}>
                      {formError}
                    </div>
                  )}

                  <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(200px, 1fr))", gap: "14px" }}>
                    {([
                      { key: "name", label: "Product Name *", placeholder: "e.g. Tata Salt", type: "text" },
                      { key: "brand", label: "Brand *", placeholder: "e.g. Tata", type: "text" },
                      { key: "price", label: "Price (₹) *", placeholder: "99", type: "number" },
                      { key: "mrp", label: "MRP (₹)", placeholder: "115", type: "number" },
                      { key: "weight", label: "Weight / Size", placeholder: "1 kg", type: "text" },
                      { key: "image", label: "Image URL *", placeholder: "https://...", type: "text" },
                    ] as const).map(({ key, label, placeholder, type }) => (
                      <div key={key}>
                        <label style={labelStyle}>{label}</label>
                        <input
                          type={type || "text"}
                          value={newProduct[key]}
                          onChange={e => setNewProduct(p => ({ ...p, [key]: e.target.value }))}
                          placeholder={placeholder}
                          style={inputStyle}
                        />
                      </div>
                    ))}

                    {/* Live image preview */}
                    {previewImage && (
                      <div style={{ gridColumn: "1 / -1", display: "flex", gap: "12px", alignItems: "center", marginTop: "4px", padding: "12px", background: "#F9FAFB", borderRadius: "10px", border: "1px solid #E8E4DC" }}>
                        <ProductImagePreview
                          key={previewImage}
                          src={previewImage}
                          alt={newProduct.name || "Preview"}
                        />
                        <div>
                          <p style={{ fontSize: "12px", fontWeight: 700, color: "#2D6A4F", fontFamily: "Satoshi, sans-serif" }}>✓ Image Preview</p>
                          <p style={{ fontSize: "11px", color: "#9CA3AF", marginTop: "2px", fontFamily: "Satoshi, sans-serif" }}>
                            Direct Image URL
                          </p>
                        </div>
                      </div>
                    )}

                    <div>
                      <label style={labelStyle}>Category</label>
                      <select
                        value={newProduct.category}
                        onChange={e => setNewProduct(p => ({ ...p, category: e.target.value }))}
                        style={{ ...inputStyle }}
                      >
                        {CATEGORIES.filter(c => c.id !== "all").map(c => (
                          <option key={c.id} value={c.id}>{c.label}</option>
                        ))}
                      </select>
                    </div>

                    <div>
                      <label style={labelStyle}>Badge</label>
                      <select
                        value={newProduct.badge}
                        onChange={e => setNewProduct(p => ({ ...p, badge: e.target.value }))}
                        style={{ ...inputStyle }}
                      >
                        <option value="">None</option>
                        {["Best Seller", "New", "Popular", "Fresh Today", "Organic"].map(b => (
                          <option key={b} value={b}>{b}</option>
                        ))}
                      </select>
                    </div>

                    <div>
                      <label style={labelStyle}>Delivery Time</label>
                      <select
                        value={newProduct.delivery}
                        onChange={e => setNewProduct(p => ({ ...p, delivery: e.target.value }))}
                        style={{ ...inputStyle }}
                      >
                        <option value="30 min">30 min</option>
                        <option value="By 7AM">By 7AM</option>
                        <option value="1 hour">1 hour</option>
                      </select>
                    </div>
                  </div>

                  <div style={{ display: "flex", gap: "10px", marginTop: "20px" }}>
                    <button
                      onClick={handleAddProduct}
                      style={{
                        padding: "12px 28px", background: "#2D6A4F", color: "white",
                        border: "none", borderRadius: "10px", fontFamily: "Satoshi, sans-serif",
                        fontWeight: 700, fontSize: "14px", cursor: "pointer",
                      }}
                    >
                      Add Product ✓
                    </button>
                    <button
                      onClick={() => { setShowAddForm(false); setFormError(""); }}
                      style={{
                        padding: "12px 20px", background: "white", color: "#6b7280",
                        border: "1.5px solid #E8E4DC", borderRadius: "10px",
                        fontFamily: "Satoshi, sans-serif", fontWeight: 600, fontSize: "14px", cursor: "pointer",
                      }}
                    >
                      Cancel
                    </button>
                  </div>
                </div>
              )}

              {/* Product table */}
              <div style={{ background: "white", borderRadius: "16px", border: "1px solid #E8E4DC", overflow: "hidden" }}>
                <table style={{ width: "100%", borderCollapse: "collapse" }}>
                  <thead>
                    <tr style={{ background: "#FAFAF7" }}>
                      {["Product", "Category", "Price", "MRP", "Badge", "Stock", "Actions"].map(h => (
                        <th key={h} style={{ padding: "12px 16px", textAlign: "left" as const, fontSize: "11.5px", fontWeight: 700, color: "#6b7280", textTransform: "uppercase" as const, letterSpacing: "0.07em" }}>{h}</th>
                      ))}
                    </tr>
                  </thead>
                  <tbody>
                    {products.map((p, i) => (
                      <tr key={p.id} style={{ borderTop: i > 0 ? "1px solid #E8E4DC" : "none" }}>
                        <td style={{ padding: "13px 16px" }}>
                          <div>
                            <p style={{ fontSize: "13.5px", fontWeight: 700, color: "#0a0a0a", marginBottom: "2px" }}>{p.name}</p>
                            <p style={{ fontSize: "12px", color: "#9CA3AF" }}>{p.brand} · {p.weight}</p>
                          </div>
                        </td>
                        <td style={{ padding: "13px 16px" }}>
                          <span style={{ fontSize: "12px", background: "#F3F4F6", padding: "3px 8px", borderRadius: "5px", fontWeight: 600, color: "#4B5563" }}>
                            {CATEGORIES.find(c => c.id === p.category)?.label || p.category}
                          </span>
                        </td>
                        <td style={{ padding: "13px 16px", fontFamily: "Cabinet Grotesk, sans-serif", fontWeight: 800, fontSize: "15px" }}>₹{p.price}</td>
                        <td style={{ padding: "13px 16px", fontSize: "13px", color: "#9CA3AF", textDecoration: "line-through" }}>₹{p.mrp}</td>
                        <td style={{ padding: "13px 16px" }}>
                          {p.badge ? (
                            <span
                              style={{
                                fontSize: "11px", fontWeight: 700, padding: "3px 8px", borderRadius: "5px",
                                background: p.badge === "Best Seller" ? "#FEE2E2" : p.badge === "New" ? "#D8F3DC" : p.badge === "Popular" ? "#FEF3C7" : p.badge === "Fresh Today" ? "#DBEAFE" : "#EDE9FE",
                                color: p.badge === "Best Seller" ? "#DC2626" : p.badge === "New" ? "#2D6A4F" : p.badge === "Popular" ? "#D97706" : p.badge === "Fresh Today" ? "#2563EB" : "#7C3AED",
                              }}
                            >
                              {p.badge}
                            </span>
                          ) : <span style={{ color: "#D1D5DB", fontSize: "13px" }}>—</span>}
                        </td>
                        <td style={{ padding: "13px 16px" }}>
                          <button
                            onClick={() => toggleStock(p.id)}
                            style={{
                              display: "flex", alignItems: "center", gap: "5px",
                              padding: "5px 12px", borderRadius: "6px", border: "none",
                              background: p.inStock ? "#D8F3DC" : "#FEE2E2",
                              color: p.inStock ? "#2D6A4F" : "#DC2626",
                              fontFamily: "Satoshi, sans-serif", fontWeight: 700,
                              fontSize: "12px", cursor: "pointer",
                            }}
                          >
                            {p.inStock ? <><Eye size={11} /> In Stock</> : <><EyeOff size={11} /> Out of Stock</>}
                          </button>
                        </td>
                        <td style={{ padding: "13px 16px" }}>
                          <button
                            style={{
                              padding: "5px 12px", borderRadius: "6px",
                              border: "1.5px solid #E8E4DC", background: "white",
                              fontFamily: "Satoshi, sans-serif", fontWeight: 600,
                              fontSize: "12px", cursor: "pointer", display: "flex",
                              alignItems: "center", gap: "4px",
                            }}
                          >
                            <Edit size={11} /> Edit
                          </button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          )}

          {/* ── ORDERS ── */}
          {tab === "orders" && (
            <div>
              <h1 style={{ fontFamily: "Cabinet Grotesk, sans-serif", fontWeight: 900, fontSize: "26px", letterSpacing: "-0.5px", marginBottom: "24px", color: "#0a0a0a" }}>
                Orders
              </h1>

              <div style={{ display: "flex", flexDirection: "column", gap: "12px" }}>
                {orders.map(o => {
                  const s = STATUS_STYLES[o.status];
                  const StatusIcon = s.icon;
                  return (
                    <div
                      key={o.id}
                      style={{
                        background: "white", borderRadius: "14px", border: "1px solid #E8E4DC",
                        padding: "18px 20px", display: "flex", alignItems: "center",
                        justifyContent: "space-between", gap: "16px", flexWrap: "wrap" as const,
                      }}
                    >
                      <div style={{ display: "flex", gap: "16px", alignItems: "center" }}>
                        <div>
                          <p style={{ fontFamily: "Cabinet Grotesk, sans-serif", fontWeight: 800, fontSize: "15px", color: "#0a0a0a" }}>
                            #{o.id}
                          </p>
                          <p style={{ fontSize: "13px", color: "#6b7280" }}>{o.customer} · {o.items} items · {o.time}</p>
                        </div>
                      </div>

                      <div style={{ display: "flex", alignItems: "center", gap: "12px" }}>
                        <span style={{ fontFamily: "Cabinet Grotesk, sans-serif", fontWeight: 800, fontSize: "16px" }}>₹{o.total}</span>

                        <span style={{ display: "inline-flex", alignItems: "center", gap: "5px", background: s.bg, color: s.color, padding: "5px 12px", borderRadius: "7px", fontSize: "12.5px", fontWeight: 700 }}>
                          <StatusIcon size={12} /> {o.status}
                        </span>

                        {/* Status update dropdown */}
                        <select
                          value={o.status}
                          onChange={e => updateOrderStatus(o.id, e.target.value as OrderStatus)}
                          style={{
                            padding: "6px 12px", borderRadius: "8px", border: "1.5px solid #E8E4DC",
                            fontFamily: "Satoshi, sans-serif", fontWeight: 600, fontSize: "12.5px",
                            cursor: "pointer", outline: "none", background: "white",
                          }}
                        >
                          {(["Pending", "Confirmed", "Delivered", "Cancelled"] as OrderStatus[]).map(s => (
                            <option key={s} value={s}>{s}</option>
                          ))}
                        </select>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          )}
        </main>
      </div>
    </div>
  );
}
