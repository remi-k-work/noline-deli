import "./globals.css";

/* the props */
import "open-props/style";

/* optional imports that use the props */
import "open-props/normalize";

// component css styles
import styles from "./layout.module.css";

// prisma and db access
import { getCart } from "@/features/cart/cartDb";
import { allCategories } from "@/features/products/productsDb";

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

export default async function Layout({ children }) {
  // Fetch all data in parallel if possible and pass it down to components that require it
  const [cart, categories] = await Promise.all([getCart(), allCategories()]);

  return (
    <html lang="en">
      <body className={clsx(styles["layout"], inter.className, "antialiased")}>
        <Header cart={cart} />
        <NavBar categories={categories} />
        <main className={styles["main"]}>{children}</main>
        <Footer />
      </body>
    </html>
  );
}
