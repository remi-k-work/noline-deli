// next
import { notFound } from "next/navigation";

// prisma and db access
import { getSubCategory, allCategories } from "@/features/manager/categories/db";

// components
import FormModal from "@/features/manager/components/FormModal";
import SubCategoryForm from "@/features/manager/subcategories/components/SubCategoryForm";

// assets
import { PencilSquareIcon } from "@heroicons/react/24/solid";

// types
interface PageProps {
  params: Promise<{ subCategoryId: string }>;
}

export default async function Page(props: PageProps) {
  const params = await props.params;

  const {
    subCategoryId
  } = params;

  // Retrieve all of the categories from an external source (database)
  const categories = await allCategories();

  // Get all the information you need about this particular subcategory
  const subCategory = await getSubCategory(subCategoryId);

  // Ensure the subcategory exists
  if (!subCategory) notFound();

  return (
    <FormModal
      title={
        <>
          <PencilSquareIcon width={32} height={32} />
          Edit SubCategory
        </>
      }
      description="Modify the details of this subcategory"
    >
      <SubCategoryForm subCategory={subCategory} categories={categories} isModal />
    </FormModal>
  );
}
