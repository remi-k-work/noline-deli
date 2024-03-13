// component css styles
import styles from "./Header.module.css";

// next
import Link from "next/link";

// other libraries
import clsx from "clsx";
import { Bars4Icon } from "@heroicons/react/24/solid";

// components
import CartIndicator from "@/features/cart/components/CartIndicator";
import SearchPanel from "./SearchPanel";

// assets
import { lusitana } from "@/assets/fonts";

export default function Header({ cart }) {
  return (
    <header className={clsx(styles["header"], "navbar z-30 flex-wrap gap-4")}>
      <div className="flex-1">
        <Link href={"/"}>
          <h1 className={clsx(lusitana.className, "text-4xl lg:text-5xl")}>NoLine-Deli</h1>
        </Link>
      </div>
      <div className="flex-none">
        <CartIndicator cart={cart} />
      </div>
      <div className="flex-none lg:hidden">
        <label htmlFor="navBar" className="btn btn-square btn-ghost drawer-button">
          <Bars4Icon width={24} height={24} />
        </label>
      </div>
      <div className="flex-none">
        <SearchPanel />
      </div>
    </header>
  );
}
