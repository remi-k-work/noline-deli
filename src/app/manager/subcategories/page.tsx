// next
import { ReadonlyURLSearchParams } from "next/navigation";

// other libraries
import SearchParamsState from "@/features/manager/SearchParamsState";

// components
import SectionHero from "@/features/manager/components/SectionHero";
import { default as SubCategoriesTableView } from "@/features/manager/subcategories/components/subcategories-table/View";

// assets
import bannerSubCategories from "@/assets/manager/banner-subcategories.webp";

// types
interface PageProps {
  searchParams: Promise<{ [key: string]: string | string[] | undefined }>;
}

export const metadata = {
  title: "NoLine-Deli ► Manager ► SubCategories",
};

export default async function Page(props: PageProps) {
  const searchParams = await props.searchParams;
  const searchParamsState = new SearchParamsState(new ReadonlyURLSearchParams(searchParams as any));

  return (
    <>
      <SectionHero heroBanner={bannerSubCategories} sectionTitle={"SubCategories"} />
      <SubCategoriesTableView searchParamsState={searchParamsState} />
    </>
  );
}
