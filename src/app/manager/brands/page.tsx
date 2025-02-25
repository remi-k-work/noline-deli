// next
import { ReadonlyURLSearchParams } from "next/navigation";

// other libraries
import SearchParamsState from "@/features/manager/SearchParamsState";

// components
import SectionHero from "@/features/manager/components/SectionHero";
import { default as BrandsTableView } from "@/features/manager/brands/components/brands-table/View";

// assets
import bannerBrands from "@/assets/manager/banner-brands.webp";

// types
interface PageProps {
  searchParams: { [key: string]: string | string[] | undefined };
}

export const metadata = {
  title: "NoLine-Deli ► Manager ► Brands",
};

export default async function Page({ searchParams }: PageProps) {
  const searchParamsState = new SearchParamsState(new ReadonlyURLSearchParams(searchParams as any));

  return (
    <>
      <SectionHero heroBanner={bannerBrands} sectionTitle={"Brands"} />
      <BrandsTableView searchParamsState={searchParamsState} />
    </>
  );
}
