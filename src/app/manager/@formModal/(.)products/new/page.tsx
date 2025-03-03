// prisma and db access
import { getProductFormData } from "@/features/manager/products/db";

// components
import FormModal from "@/features/manager/components/FormModal";
import ProductForm from "@/features/manager/products/components/product-form";

// assets
import { PlusCircleIcon } from "@heroicons/react/24/solid";

export default async function Page() {
  // Gather the necessary data for the product form, such as a list of all available brands and categories
  const [brands, categories] = await getProductFormData();

  return (
    <FormModal
      title={
        <>
          <PlusCircleIcon width={32} height={32} />
          New Product
        </>
      }
      description="Create a new product"
    >
      <ProductForm brands={brands} categories={categories} isModal />
    </FormModal>
  );
}
