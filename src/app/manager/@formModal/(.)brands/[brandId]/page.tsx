// next
import { notFound } from "next/navigation";

// prisma and db access
import { getBrand } from "@/features/manager/brands/db";

// components
import FormModal from "@/features/manager/components/FormModal";
import BrandForm from "@/features/manager/brands/components/brand-form";

// types
interface PageProps {
  params: { brandId: string };
}

export default async function Page({ params: { brandId } }: PageProps) {
  // Get all the information you need about this particular brand
  const brand = await getBrand(brandId);

  // Ensure the brand exists
  if (!brand) {
    // Missing resource: redirect users to the 404 page
    notFound();
  }

  return (
    <FormModal>
      <BrandForm brand={brand} />
    </FormModal>
  );
}
