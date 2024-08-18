// components
import FormModal from "@/features/manager/components/FormModal";
import CategoryForm from "@/features/manager/categories/components/CategoryForm";

export default async function Page() {
  return (
    <FormModal>
      <CategoryForm />
    </FormModal>
  );
}
