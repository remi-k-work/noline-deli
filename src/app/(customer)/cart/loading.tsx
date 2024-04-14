// component css styles
import styles from "./loading.module.css";

// other libraries
import clsx from "clsx";

// components
import NavBarDrawerContent from "@/components/NavBarDrawerContent";
import NavBarDrawerSide from "@/components/NavBarDrawerSide";

// assets
import { lusitana } from "@/assets/fonts";

export default function Loading() {
  return (
    <>
      <NavBarDrawerContent>
        <article className={styles["loading"]}>
          <h1 className={clsx(lusitana.className, "mb-8 text-xl lg:text-3xl")}>Your Shopping Cart</h1>
          <div className="grid h-full place-content-center">
            <span className="loading loading-dots loading-lg m-auto block" />
          </div>
        </article>
      </NavBarDrawerContent>
      <NavBarDrawerSide />
    </>
  );
}
