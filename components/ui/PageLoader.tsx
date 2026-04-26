"use client";

import { useEffect, useRef, useState } from "react";

export function PageLoader() {
  const [visible, setVisible] = useState(true);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
    const timer = setTimeout(() => {
      setVisible(false);
    }, 1800);
    return () => clearTimeout(timer);
  }, []);

  if (!mounted || !visible) return null;

  return (
    <div
      className="page-loader"
      style={{
        animation: visible ? "none" : "loaderFadeOut 0.5s ease forwards",
      }}
    >
      <div className="loader-wordmark">
        Kirana<span>.</span>
      </div>
      <div className="loader-bar-track">
        <div className="loader-bar-fill" />
      </div>
      <p
        style={{
          color: "rgba(255,255,255,0.4)",
          fontSize: "13px",
          fontFamily: "Satoshi, sans-serif",
          letterSpacing: "0.05em",
        }}
      >
        Raigarh&apos;s Finest Kirana
      </p>
    </div>
  );
}
