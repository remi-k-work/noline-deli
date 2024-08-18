// next
import { notFound } from "next/navigation";

// prisma and db access
import { getCategory } from "@/features/manager/categories/db";

// components
import FormModal from "@/features/manager/components/FormModal";
import CategoryForm from "@/features/manager/categories/components/CategoryForm";

// types
interface PageProps {
  params: { categoryId: string };
}

export default async function Page({ params: { categoryId } }: PageProps) {
  // Get all the information you need about this particular category
  const category = await getCategory(categoryId);

  // Ensure the category exists
  if (!category) {
    // Missing resource: redirect users to the 404 page
    notFound();
  }

  return (
    <FormModal>
      <CategoryForm category={category} />
    </FormModal>
  );
}
