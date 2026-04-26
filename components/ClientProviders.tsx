"use client";

import { useEffect } from "react";
import { PageLoader } from "@/components/ui/PageLoader";
import { CustomCursor } from "@/components/ui/CustomCursor";
import { ToastProvider } from "@/components/ui/Toast";
import { CartDrawer } from "@/components/cart/CartDrawer";
import { CheckoutModal } from "@/components/checkout/CheckoutModal";
import { useCartStore } from "@/lib/store";

import { FloatingCart } from "@/components/ui/FloatingCart";

export function ClientProviders({ children }: { children: React.ReactNode }) {
  return (
    <>
      <PageLoader />
      <CustomCursor />
      <ToastProvider />
      {children}
      <CartDrawer />
      <CheckoutModal />
      <FloatingCart />
    </>
  );
}
