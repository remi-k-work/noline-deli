// components
import FormModal from "@/features/manager/components/FormModal";
import BrandForm from "@/features/manager/brands/components/brand-form";

export default async function Page() {
  return (
    <FormModal>
      <BrandForm />
    </FormModal>
  );
}
