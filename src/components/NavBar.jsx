// component css styles
import styles from "./NavBar.module.css";

// next
import Link from "next/link";

// components
import CategoriesTreeView from "@/features/products/components/CategoriesTreeView";

const categoriesList = [
  {
    label: "Sweets",
    href: "/",
    subCategories: [
      {
        label: "Chocoalte",
        href: "/",
      },
      {
        label: "Candy",
        href: "/",
      },
      {
        label: "Bars",
        href: "/",
      },
    ],
  },
  {
    label: "Beverages",
    href: "/",
    subCategories: [
      {
        label: "Diet",
        href: "/",
      },
      {
        label: "Pepsi",
        href: "/",
      },
      {
        label: "Cola",
        href: "/",
      },
    ],
  },
];

export default function NavBar() {
  return (
    <nav className={styles["navbar"]}>
      <CategoriesTreeView categoriesList={categoriesList} />
      <ul className={styles["navbar__list"]}>
        <li>
          <Link href={"/"}>Home</Link>
        </li>
        <li>
          <Link href={"/products"}>
            <span className={styles["navbar__view-all-posts"]}></span>
          </Link>
        </li>
        <li>
          <Link href={"/"}>
            <span className={styles["navbar__create-a-new-post"]}></span>
          </Link>
        </li>
        <li>
          <Link href={"/"}>
            <span className={styles["navbar__view-all-users"]}></span>
          </Link>
        </li>
      </ul>
    </nav>
  );
}
