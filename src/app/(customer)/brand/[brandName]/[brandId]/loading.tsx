// component css styles
import styles from "./loading.module.css";

// other libraries
import clsx from "clsx";

// components
import NavBarDrawerContent from "@/components/NavBarDrawerContent";
import NavBarDrawerSide from "@/components/NavBarDrawerSide";
import { PaginateSkeleton } from "@/components/Paginate";
import { ProductsListSkeleton } from "@/features/products/components/ProductsList";

// assets
import { lusitana } from "@/assets/fonts";

export default function Loading() {
  return (
    <>
      <NavBarDrawerContent>
        <article className={styles["loading"]}>
          <h1 className={clsx(lusitana.className, "mb-8 text-xl lg:text-3xl")}>...</h1>
          <PaginateSkeleton />
          <br />
          <ProductsListSkeleton />
          <br />
          <PaginateSkeleton />
        </article>
      </NavBarDrawerContent>
      <NavBarDrawerSide />
    </>
  );
}
