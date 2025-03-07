// next
import { ReadonlyURLSearchParams } from "next/navigation";

// other libraries
import SearchParamsState from "@/features/manager/SearchParamsState";

// components
import SectionHero from "@/features/manager/components/SectionHero";
import { default as CategoriesTableView } from "@/features/manager/categories/components/categories-table/View";

// assets
import bannerCategories from "@/assets/manager/banner-categories.webp";

// types
interface PageProps {
  searchParams: Promise<{ [key: string]: string | string[] | undefined }>;
}

export const metadata = {
  title: "NoLine-Deli ► Manager ► Categories",
};

export default async function Page(props: PageProps) {
  const searchParams = await props.searchParams;
  const searchParamsState = new SearchParamsState(new ReadonlyURLSearchParams(searchParams as any));

  return (
    <>
      <SectionHero heroBanner={bannerCategories} sectionTitle={"Categories"} />
      <CategoriesTableView searchParamsState={searchParamsState} />
    </>
  );
}
