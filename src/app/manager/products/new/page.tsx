// component css styles
import styles from "./page.module.css";

// other libraries
import clsx from "clsx";

// components
import NewProductForm from "@/features/manager/components/NewProductForm";

// assets
import { lusitana } from "@/assets/fonts";

export const metadata = {
  title: "NoLine-Deli ► Manager ► New Product",
};

export default async function Page() {
  return (
    <article className={styles["page"]}>
      <h1 className={clsx(lusitana.className, "mb-8 text-xl lg:text-3xl")}>Manager ► New Product</h1>
      <NewProductForm />
    </article>
  );
}
