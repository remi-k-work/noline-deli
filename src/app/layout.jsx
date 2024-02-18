/* the props */
import "open-props/style";

/* optional imports that use the props */
import "open-props/normalize";

import "./globals.css";

// component css styles
import styles from "./layout.module.css";

// other libraries
import clsx from "clsx";

// components
import Header from "@/components/Header";
import NavBar from "@/components/NavBar";
import Footer from "@/components/Footer";

// assets
import { inter } from "@/assets/fonts";

export const metadata = {
  title: "NoLine-Deli",
  description:
    "NoLine-Deli: Your European deli delivered! Enjoy fresh, organic, high-quality European foods at home, no matter where you are in the US. Find Polish favorites like pierogi & kielbasa, plus breads, coffees, desserts & more. We cater to individual needs & welcome your suggestions!",
};

export default function Layout({ children }) {
  return (
    <html lang="en">
      <body className={clsx(styles["layout"], inter.className, "antialiased")}>
        <Header />
        <NavBar />
        <main className={styles["main"]}>{children}</main>
        <Footer />
      </body>
    </html>
  );
}
