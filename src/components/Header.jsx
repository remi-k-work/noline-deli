// component css styles
import styles from "./Header.module.css";

// next
import Link from "next/link";

// other libraries
import clsx from "clsx";

// components
import CartIndicator from "@/features/cart/components/CartIndicator";

// assets
import { lusitana } from "@/assets/fonts";

export default function Header() {
  return (
    <header className={clsx(styles["header"], "navbar")}>
      <div className="flex-1">
        <Link href={"/"}>
          <h1 className={clsx(lusitana.className, "text-5xl")}>NoLine-Deli</h1>
        </Link>
      </div>
      <div className="flex-none">
        <CartIndicator />
      </div>
    </header>
  );
}
