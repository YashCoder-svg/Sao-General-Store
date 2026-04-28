"use client";

import { PageLoader } from "@/components/ui/PageLoader";
import { CustomCursor } from "@/components/ui/CustomCursor";
import { ToastProvider } from "@/components/ui/Toast";
import { CartDrawer } from "@/components/cart/CartDrawer";
import { CheckoutModal } from "@/components/checkout/CheckoutModal";
import { FloatingCart } from "@/components/ui/FloatingCart";
import { AuthProvider } from "@/lib/authContext";

export function ClientProviders({ children }: { children: React.ReactNode }) {
  return (
    <AuthProvider>
      <PageLoader />
      <CustomCursor />
      <ToastProvider />
      {children}
      <CartDrawer />
      <CheckoutModal />
      <FloatingCart />
    </AuthProvider>
  );
}
