// next
import { notFound } from "next/navigation";

// prisma and db access
import { getProduct, getProductFormData } from "@/features/manager/products/db";

// components
import FormModal from "@/features/manager/components/FormModal";
import ProductForm from "@/features/manager/products/components/product-form";

// assets
import { PencilSquareIcon } from "@heroicons/react/24/solid";

// types
interface PageProps {
  params: { productId: string };
}

export default async function Page({ params: { productId } }: PageProps) {
  // Gather the necessary data for the product form, such as a list of all available brands and categories
  const [brands, categories] = await getProductFormData();

  // Get all the information you need about this particular product
  const product = await getProduct(productId);

  // Ensure the product exists
  if (!product) notFound();

  return (
    <FormModal
      title={
        <>
          <PencilSquareIcon width={32} height={32} />
          Edit Product
        </>
      }
      description="Modify the details of this product"
    >
      <ProductForm product={product} brands={brands} categories={categories} isModal />
    </FormModal>
  );
}
