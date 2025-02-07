import "./globals.css";

/* the props */
import "open-props/style";

/* optional imports that use the props */
// import "open-props/normalize";
import "open-props/masks/edges";
import "open-props/masks/corner-cuts";

// component css styles
import styles from "./layout.module.css";

// react
import { ReactNode } from "react";

// other libraries
import { cn } from "@/lib/utils";
import { Analytics } from "@vercel/analytics/next";

// components
import { TooltipProvider } from "@/components/ui/tooltip";

// assets
import { inter } from "@/assets/fonts";

// types
interface LayoutProps {
  children: ReactNode;
}

export const metadata = {
  metadataBase: new URL(process.env.WEBSITE_URL as string),
  title: "NoLine-Deli",
  description:
    "NoLine-Deli: Your European deli delivered! Enjoy fresh, organic, high-quality European foods at home, no matter where you are in the US. Find Polish favorites like pierogi & kielbasa, plus breads, coffees, desserts & more. We cater to individual needs & welcome your suggestions!",
};

export default async function Layout({ children }: LayoutProps) {
  return (
    <html lang="en">
      <body className={cn(inter.className, styles["layout"])}>
        <TooltipProvider>{children}</TooltipProvider>
        <Analytics debug={false} />
      </body>
    </html>
  );
}
