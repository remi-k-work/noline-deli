// component css styles
import styles from "./page.module.css";

// prisma and db access
import { getProductFormData } from "@/features/manager/managerDb";

// other libraries
import clsx from "clsx";

// components
import ProductForm from "@/features/manager/components/ProductForm";

// assets
import { lusitana } from "@/assets/fonts";

export const metadata = {
  title: "NoLine-Deli ► Manager ► New Product",
};

export default async function Page() {
  // Gather the necessary data for the product form, such as a list of all available brands and categories
  const [brands, categories] = await getProductFormData();

  return (
    <article className={styles["page"]}>
      <h1 className={clsx(lusitana.className, "mb-8 text-xl lg:text-3xl")}>Manager ► New Product</h1>
      <ProductForm brands={brands} categories={categories} />
    </article>
  );
}
