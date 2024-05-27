// component css styles
import styles from "./page.module.css";

// prisma and db access
import { allCategories } from "@/features/manager/dbCategories";

// other libraries
import clsx from "clsx";

// components
import SubCategoryForm from "@/features/manager/components/SubCategoryForm";

// assets
import { lusitana } from "@/assets/fonts";

export const metadata = {
  title: "NoLine-Deli ► Manager ► New SubCategory",
};

export default async function Page() {
  // Retrieve all of the categories from an external source (database)
  const categories = await allCategories();

  return (
    <article className={styles["page"]}>
      <h1 className={clsx(lusitana.className, "mb-8 text-xl lg:text-3xl")}>Manager ► New SubCategory</h1>
      <SubCategoryForm categories={categories} />
    </article>
  );
}
