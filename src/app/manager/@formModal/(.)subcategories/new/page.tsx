// prisma and db access
import { allCategories } from "@/features/manager/categories/db";

// components
import FormModal from "@/features/manager/components/FormModal";
import SubCategoryForm from "@/features/manager/subcategories/components/SubCategoryForm";

export default async function Page() {
  // Retrieve all of the categories from an external source (database)
  const categories = await allCategories();

  return (
    <FormModal>
      <SubCategoryForm categories={categories} />
    </FormModal>
  );
}
