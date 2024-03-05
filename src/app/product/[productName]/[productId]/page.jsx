// component css styles
import styles from "./page.module.css";

// next
import { notFound } from "next/navigation";

// prisma and db access
import { getProduct } from "@/features/products/productsDb";

// other libraries
import clsx from "clsx";
import { routeToProductImage } from "@/features/products/helpers";

// components
import SingleProductView from "@/features/products/components/SingleProductView";

// assets
import { lusitana } from "@/assets/fonts";

export async function generateMetadata({ params: { productId } }) {
  // Get all the information you need about this particular product
  const product = await getProduct(productId);

  // Ensure the product exists
  if (!product) {
    // Missing resource: redirect users to the 404 page
    notFound();
  }

  const { name, description, imageUrl } = product;

  return {
    metadataBase: new URL(process.env.WEBSITE_URL),
    title: `NoLine-Deli ► Product Details ► ${name}`,
    description: description,
    openGraph: {
      images: [{ url: routeToProductImage(imageUrl) }],
    },
  };
}

export default async function Page({ params: { productId } }) {
  // Get all the information you need about this particular product
  const product = await getProduct(productId);

  // Ensure the product exists
  if (!product) {
    // Missing resource: redirect users to the 404 page
    notFound();
  }

  const { name } = product;

  return (
    <article className={styles["page"]}>
      <h3 className={clsx(lusitana.className, "mb-8 text-4xl")}>Product Details ► {name}</h3>
      <SingleProductView product={product} />
    </article>
  );
}
