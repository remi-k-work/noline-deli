// next
import { notFound } from "next/navigation";

// prisma and db access
import { getCategory } from "@/features/manager/categories/db";

// other libraries
import PathFinder from "@/lib/PathFinder";

// components
import SectionHero from "@/features/manager/components/SectionHero";
import CategoryForm from "@/features/manager/categories/components/CategoryForm";

// assets
import bannerCategories from "@/assets/manager/banner-categories.webp";

// types
interface PageProps {
  params: Promise<{ categoryId: string }>;
}

export const metadata = {
  title: "NoLine-Deli ► Manager ► Edit Category",
};

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
    <>
      <SectionHero heroBanner={bannerCategories} sectionTitle={"Categories"} sectionLink={PathFinder.toAllCategories()} />
      <CategoryForm category={category} />
    </>
  );
}
