import "./globals.css";

/* the props */
import "open-props/style";

/* optional imports that use the props */
// import "open-props/normalize";
import "open-props/masks/edges";
import "open-props/masks/corner-cuts";

// component css styles
import styles from "./layout.module.css";

// prisma and db access
import { getCart } from "@/features/cart/cartDb";
import { allCategories, getProductFilterData } from "@/features/products/productsDb";

// other libraries
import clsx from "clsx";

// components
import Header from "@/components/Header";
import NavBar from "@/components/NavBar";
import Footer from "@/components/Footer";

// assets
import { inter } from "@/assets/fonts";

export const metadata = {
  metadataBase: new URL(process.env.WEBSITE_URL),
  title: "NoLine-Deli",
  description:
    "NoLine-Deli: Your European deli delivered! Enjoy fresh, organic, high-quality European foods at home, no matter where you are in the US. Find Polish favorites like pierogi & kielbasa, plus breads, coffees, desserts & more. We cater to individual needs & welcome your suggestions!",
};

export default async function Layout({ children }) {
  // Fetch all data in parallel if possible and pass it down to components that require it
  const [cart, categories, productFilterData] = await Promise.all([getCart(), allCategories(), getProductFilterData()]);

  return (
    <html lang="en">
      <body className={clsx(inter.className, "antialiased")}>
        <div className="drawer lg:drawer-open">
          <input id="navBar" type="checkbox" className="drawer-toggle" />
          <div className="drawer-content">
            <div className={styles["layout"]}>
              <Header cart={cart} />
              <main className={styles["main"]}>{children}</main>
              <Footer />
            </div>
          </div>
          <div className="drawer-side z-40">
            <label htmlFor="navBar" aria-label="close sidebar" className="drawer-overlay"></label>
            <div className="min-h-full w-80">
              <NavBar categories={categories} productFilterData={productFilterData} />
            </div>
          </div>
        </div>
      </body>
    </html>
  );
}
