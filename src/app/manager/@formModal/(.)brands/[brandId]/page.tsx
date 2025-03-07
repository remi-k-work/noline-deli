// next
import { notFound } from "next/navigation";

// prisma and db access
import { getBrand } from "@/features/manager/brands/db";

// components
import FormModal from "@/features/manager/components/FormModal";
import BrandForm from "@/features/manager/brands/components/brand-form";

// assets
import { PencilSquareIcon } from "@heroicons/react/24/solid";

// types
interface PageProps {
  params: Promise<{ brandId: string }>;
}

export default async function Page(props: PageProps) {
  const params = await props.params;

  const {
    brandId
  } = params;

  // Get all the information you need about this particular brand
  const brand = await getBrand(brandId);

  // Ensure the brand exists
  if (!brand) notFound();

  return (
    <FormModal
      title={
        <>
          <PencilSquareIcon width={32} height={32} />
          Edit Brand
        </>
      }
      description="Modify the details of this brand"
    >
      <BrandForm brand={brand} isModal />
    </FormModal>
  );
}
