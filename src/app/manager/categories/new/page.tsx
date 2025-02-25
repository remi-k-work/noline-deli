// other libraries
import PathFinder from "@/lib/PathFinder";

// components
import SectionHero from "@/features/manager/components/SectionHero";
import CategoryForm from "@/features/manager/categories/components/CategoryForm";

// assets
import bannerCategories from "@/assets/manager/banner-categories.webp";

export const metadata = {
  title: "NoLine-Deli ► Manager ► New Category",
};

export default async function Page() {
  return (
    <>
      <SectionHero heroBanner={bannerCategories} sectionTitle={"Categories"} sectionLink={PathFinder.toAllCategories()} />
      <CategoryForm />
    </>
  );
}
