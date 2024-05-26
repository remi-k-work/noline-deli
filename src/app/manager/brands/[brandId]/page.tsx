// component css styles
import styles from "./page.module.css";

// next
import { notFound } from "next/navigation";

// prisma and db access
import { getBrand } from "@/features/manager/dbBrands";

// other libraries
import clsx from "clsx";

// components
import BrandForm from "@/features/manager/components/BrandForm";

// assets
import { lusitana } from "@/assets/fonts";

// types
interface PageProps {
  params: { brandId: string };
}

export const metadata = {
  title: "NoLine-Deli ► Manager ► Edit Brand",
};

export default async function Page({ params: { brandId } }: PageProps) {
  // Get all the information you need about this particular brand
  const brand = await getBrand(brandId);

  // Ensure the brand exists
  if (!brand) {
    // Missing resource: redirect users to the 404 page
    notFound();
  }

  return (
    <article className={styles["page"]}>
      <h1 className={clsx(lusitana.className, "mb-8 text-xl lg:text-3xl")}>Manager ► Edit Brand</h1>
      <BrandForm brand={brand} />
    </article>
  );
}
