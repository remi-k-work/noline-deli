// component css styles
import styles from "./page.module.css";

// other libraries
import clsx from "clsx";

// components
import BrandForm from "@/features/manager/components/BrandForm";

// assets
import { lusitana } from "@/assets/fonts";

export const metadata = {
  title: "NoLine-Deli ► Manager ► New Brand",
};

export default async function Page() {
  return (
    <article className={styles["page"]}>
      <h1 className={clsx(lusitana.className, "mb-8 text-xl lg:text-3xl")}>Manager ► New Brand</h1>
      <BrandForm />
    </article>
  );
}
