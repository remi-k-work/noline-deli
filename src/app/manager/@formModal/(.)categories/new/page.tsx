// components
import FormModal from "@/features/manager/components/FormModal";
import CategoryForm from "@/features/manager/categories/components/CategoryForm";

// assets
import { PlusCircleIcon } from "@heroicons/react/24/solid";

export default async function Page() {
  return (
    <FormModal
      title={
        <>
          <PlusCircleIcon width={32} height={32} />
          New Category
        </>
      }
      description="Create a new category"
    >
      <CategoryForm isModal />
    </FormModal>
  );
}
