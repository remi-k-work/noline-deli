// components
import FormModal from "@/features/manager/components/FormModal";
import BrandForm from "@/features/manager/brands/components/brand-form";

// assets
import { PlusCircleIcon } from "@heroicons/react/24/solid";

export default async function Page() {
  return (
    <FormModal
      title={
        <>
          <PlusCircleIcon width={32} height={32} />
          New Brand
        </>
      }
      description="Create a new brand"
    >
      <BrandForm isModal />
    </FormModal>
  );
}
