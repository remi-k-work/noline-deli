// next
import { notFound } from "next/navigation";

// prisma and db access
import { getProduct } from "@/features/products/productsDb";

// layouts and pages
import ViewProductDetails from "@/ui/pages/products/ViewProductDetails";

export async function generateMetadata({ params: { productId } }) {
  // Get all the information you need about this particular product
  const product = await getProduct(productId);

  // Ensure the product exists
  if (!product) {
    notFound();
  }

  const { name, description, imageUrl } = product;

  return {
    title: `NoLine-Deli ► ${name}`,
    description: description,
    openGraph: {
      images: [{ url: imageUrl }],
    },
  };
}

export default function Page({ params: { productId } }) {
  return <ViewProductDetails productId={productId} />;
}
