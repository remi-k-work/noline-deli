// component css styles
import styles from "./loading.module.css";

// other libraries
import clsx from "clsx";

// components
import NavBarDrawerContent from "@/components/NavBarDrawerContent";
import NavBarDrawerSide from "@/components/NavBarDrawerSide";
import { SingleProductViewSkeleton } from "@/features/products/components/SingleProductView";

// assets
import { lusitana } from "@/assets/fonts";

export default function Loading() {
  return (
    <>
      <NavBarDrawerContent>
        <article className={styles["loading"]}>
          <h1 className={clsx(lusitana.className, "mb-8 text-xl lg:text-3xl")}>Product Details ► ...</h1>
          <SingleProductViewSkeleton />
        </article>
      </NavBarDrawerContent>
      <NavBarDrawerSide />
    </>
  );
}
