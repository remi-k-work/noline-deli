// component css styles
import styles from "./page.module.css";

// other libraries
import clsx from "clsx";

// components
import CategoryForm from "@/features/manager/components/CategoryForm";

// assets
import { lusitana } from "@/assets/fonts";

export const metadata = {
  title: "NoLine-Deli ► Manager ► New Category",
};

export default async function Page() {
  return (
    <article className={styles["page"]}>
      <h1 className={clsx(lusitana.className, "mb-8 text-xl lg:text-3xl")}>Manager ► New Category</h1>
      <CategoryForm />
    </article>
  );
}
