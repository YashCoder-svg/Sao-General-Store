import type { Metadata } from "next";
import "./globals.css";
import { ClientProviders } from "@/components/ClientProviders";

export const metadata: Metadata = {
  title: "Kirana Market — Fresh Groceries, Delivered Fast | Raigarh",
  description:
    "Shop fresh groceries, dals, rice, edible oils, snacks, beverages, dairy & millets at Mandi-fresh prices. 30-minute delivery in Raigarh, Chhattisgarh.",
  keywords:
    "kirana store, grocery delivery, raigarh, chhattisgarh, online grocery, rice, dal, oil, millets",
  openGraph: {
    title: "Kirana Market — Fresh Groceries, Delivered Fast",
    description:
      "Mandi-fresh prices · 30-minute delivery · 2400+ products in Raigarh",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body>
        <ClientProviders>{children}</ClientProviders>
      </body>
    </html>
  );
}
