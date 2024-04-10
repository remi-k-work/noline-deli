import "./globals.css";

/* the props */
import "open-props/style";

/* optional imports that use the props */
// import "open-props/normalize";
import "open-props/masks/edges";
import "open-props/masks/corner-cuts";

// component css styles
import styles from "./layout.module.css";

// other libraries
import clsx from "clsx";

// assets
import { inter } from "@/assets/fonts";

export const metadata = {
  metadataBase: new URL(process.env.WEBSITE_URL as string),
  title: "NoLine-Deli",
  description:
    "NoLine-Deli: Your European deli delivered! Enjoy fresh, organic, high-quality European foods at home, no matter where you are in the US. Find Polish favorites like pierogi & kielbasa, plus breads, coffees, desserts & more. We cater to individual needs & welcome your suggestions!",
};

export default async function Layout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body className={clsx(inter.className, styles["layout"])}>{children}</body>
    </html>
  );
}
