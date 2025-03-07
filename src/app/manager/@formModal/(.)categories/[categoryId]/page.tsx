// next
import { notFound } from "next/navigation";

// prisma and db access
import { getCategory } from "@/features/manager/categories/db";

// components
import FormModal from "@/features/manager/components/FormModal";
import CategoryForm from "@/features/manager/categories/components/CategoryForm";

// assets
import { PencilSquareIcon } from "@heroicons/react/24/solid";

// types
interface PageProps {
  params: Promise<{ categoryId: string }>;
}

export default async function Page(props: PageProps) {
  const params = await props.params;

  const {
    categoryId
  } = params;

  // Get all the information you need about this particular category
  const category = await getCategory(categoryId);

  // Ensure the category exists
  if (!category) notFound();

  return (
    <FormModal
      title={
        <>
          <PencilSquareIcon width={32} height={32} />
          Edit Category
        </>
      }
      description="Modify the details of this category"
    >
      <CategoryForm category={category} isModal />
    </FormModal>
  );
}
