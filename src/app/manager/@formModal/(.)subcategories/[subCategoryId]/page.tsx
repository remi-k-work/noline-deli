// next
import { notFound } from "next/navigation";

// prisma and db access
import { getSubCategory, allCategories } from "@/features/manager/categories/db";

// components
import FormModal from "@/features/manager/components/FormModal";
import SubCategoryForm from "@/features/manager/subcategories/components/SubCategoryForm";

// types
interface PageProps {
  params: { subCategoryId: string };
}

export default async function Page({ params: { subCategoryId } }: PageProps) {
  // Retrieve all of the categories from an external source (database)
  const categories = await allCategories();

  // Get all the information you need about this particular subcategory
  const subCategory = await getSubCategory(subCategoryId);

  // Ensure the subcategory exists
  if (!subCategory) {
    // Missing resource: redirect users to the 404 page
    notFound();
  }

  return (
    <FormModal>
      <SubCategoryForm subCategory={subCategory} categories={categories} />
    </FormModal>
  );
}
