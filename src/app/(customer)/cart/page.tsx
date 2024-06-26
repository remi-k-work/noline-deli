// component css styles
import styles from "./page.module.css";

// prisma and db access
import { getCart } from "@/features/cart/cartDb";

// other libraries
import clsx from "clsx";

// components
import NavBarDrawerContent from "@/components/NavBarDrawerContent";
import NavBarDrawerSide from "@/components/NavBarDrawerSide";
import CartTableView from "@/features/cart/components/CartTableView";
import NotFound from "@/components/NotFound";

// assets
import { lusitana } from "@/assets/fonts";

export const metadata = {
  title: "NoLine-Deli ► Your Shopping Cart",
};

export default async function Page() {
  // Get an existing or brand-new empty cart from our database
  const cart = await getCart();

  return (
    <>
      <NavBarDrawerContent>
        <article className={styles["page"]}>
          <h1 className={clsx(lusitana.className, "mb-8 text-xl lg:text-3xl")}>Your Shopping Cart</h1>
          {cart && cart.cartItems.length > 0 ? <CartTableView cart={cart} /> : <NotFound message={"Your cart is empty!"} />}
        </article>
      </NavBarDrawerContent>
      <NavBarDrawerSide />
    </>
  );
}
