import "./globals.css";

/* the props */
import "open-props/style";

/* optional imports that use the props */
import "open-props/masks/edges";
import "open-props/masks/corner-cuts";

// react
import { ReactNode } from "react";

// next
import type { Metadata } from "next";

// other libraries
import { Analytics } from "@vercel/analytics/next";

// components
import { TooltipProvider } from "@/components/ui/tooltip";

// assets
import { inter, lusitana, notoColorEmoji } from "@/assets/fonts";

// types
interface LayoutProps {
  children: ReactNode;
}

export const metadata: Metadata = {
  title: "NoLine-Deli",
  description:
    "Your European deli delivered! Enjoy fresh, organic, high-quality European foods at home, no matter where you are in the US. Find Polish favorites like pierogi & kielbasa, plus breads, coffees, desserts & more. We cater to individual needs & welcome your suggestions!",
  authors: [{ name: "Remi" }],
  robots: { index: true, follow: true },
  category: "e-commerce",
};

export default async function Layout({ children }: LayoutProps) {
  return (
    <html lang="en">
      <body className={`${inter.variable} ${lusitana.variable} ${notoColorEmoji.variable} font-inter antialiased`}>
        <TooltipProvider>{children}</TooltipProvider>
        <Analytics debug={false} />
      </body>
    </html>
  );
}
