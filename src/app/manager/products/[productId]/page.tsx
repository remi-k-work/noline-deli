// component css styles
import styles from "./page.module.css";

// next
import { notFound } from "next/navigation";

// prisma and db access
import { getProduct } from "@/features/manager/managerDb";

// other libraries
import clsx from "clsx";

// assets
import { lusitana } from "@/assets/fonts";

// types
interface PageProps {
  params: { productId: string };
}

export const metadata = {
  title: "NoLine-Deli ► Manager ► Edit Product",
};

export default async function Page({ params: { productId } }: PageProps) {
  // Get all the information you need about this particular product
  const product = await getProduct(productId);

  // Ensure the product exists
  if (!product) {
    // Missing resource: redirect users to the 404 page
    notFound();
  }

  return (
    <article className={styles["page"]}>
      <h1 className={clsx(lusitana.className, "mb-8 text-xl lg:text-3xl")}>Manager ► Edit Product</h1>
    </article>
  );
}
