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
import NavBarDrawerContent from "@/components/NavBarDrawerContent";
import NavBarDrawerSide from "@/components/NavBarDrawerSide";
import SingleProductView from "@/features/products/components/SingleProductView";

// assets
import { lusitana } from "@/assets/fonts";

// types
interface PageProps {
  params: { productId: string };
}

export async function generateMetadata({ params: { productId } }: PageProps) {
  // Get all the information you need about this particular product
  const product = await getProduct(productId);

  // Ensure the product exists
  if (!product) {
    // Missing resource: redirect users to the 404 page
    notFound();
  }

  const { name, description, imageUrl } = product;

  return {
    metadataBase: new URL(process.env.WEBSITE_URL as string),
    title: `NoLine-Deli ► ${name}`,
    description: description,
    openGraph: {
      images: [{ url: routeToProductImage(imageUrl) }],
    },
  };
}

export default async function Page({ params: { productId } }: PageProps) {
  // Get all the information you need about this particular product
  const product = await getProduct(productId);

  // Ensure the product exists
  if (!product) {
    // Missing resource: redirect users to the 404 page
    notFound();
  }

  const { name } = product;

  return (
    <>
      <NavBarDrawerContent>
        <article className={styles["page"]}>
          <h1 className={clsx(lusitana.className, "mb-8 text-xl lg:text-3xl")}>Product Details ► {name}</h1>
          <SingleProductView product={product} />
        </article>
      </NavBarDrawerContent>
      <NavBarDrawerSide />
    </>
  );
}
