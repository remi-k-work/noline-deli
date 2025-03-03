// prisma and db access
import { allCategories } from "@/features/manager/categories/db";

// components
import FormModal from "@/features/manager/components/FormModal";
import SubCategoryForm from "@/features/manager/subcategories/components/SubCategoryForm";

// assets
import { PlusCircleIcon } from "@heroicons/react/24/solid";

export default async function Page() {
  // Retrieve all of the categories from an external source (database)
  const categories = await allCategories();

  return (
    <FormModal
      title={
        <>
          <PlusCircleIcon width={32} height={32} />
          New SubCategory
        </>
      }
      description="Create a new subcategory"
    >
      <SubCategoryForm categories={categories} isModal />
    </FormModal>
  );
}
