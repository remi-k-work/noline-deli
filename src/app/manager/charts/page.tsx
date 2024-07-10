// component css styles
import styles from "./page.module.css";

// next
import { ReadonlyURLSearchParams } from "next/navigation";

// prisma and db access
import { productsPerBrand, totalNumbers, productsPerCategory, allCategories, ProductsPerCategoryData } from "@/features/manager/charts/db";

// other libraries
import SearchParamsState from "@/features/manager/SearchParamsState";

// components
import SectionHero from "@/features/manager/components/SectionHero";
import ChartCard from "@/features/manager/charts/components/ChartCard";
import TotalNumbersChart from "@/features/manager/charts/components/TotalNumbersChart";
import ProductsPerBrandChart from "@/features/manager/charts/components/ProductsPerBrandChart";
import ProductsPerCategoryChart, { ProductsPerCategoryOptions } from "@/features/manager/charts/components/ProductsPerCategoryChart";

// assets
import bannerCharts from "@/assets/manager/banner-charts.webp";

// types
interface PageProps {
  searchParams: { [key: string]: string | string[] | undefined };
}

export const metadata = {
  title: "NoLine-Deli ► Manager ► Charts",
};

export default async function Page({ searchParams }: PageProps) {
  const searchParamsState = new SearchParamsState("", new ReadonlyURLSearchParams(new URLSearchParams(searchParams as any)));

  // Collect all relevant totals (such as the total number of products and brands) plus other chart data
  const [totData, ppbData, categories] = await Promise.all([totalNumbers(), productsPerBrand(), allCategories()]);

  // For products per category, use the selected chart's option if specified
  const { chartKind, chartOption } = searchParamsState;
  let ppcData: ProductsPerCategoryData[] = [];
  if (chartKind === "ppc" && chartOption) {
    ppcData = await productsPerCategory(chartOption);
  } else {
    // No option was supplied; default to the first option, but only if any options are available
    if (categories.length > 0) ppcData = await productsPerCategory(categories[0].id);
  }

  return (
    <article className={styles["page"]}>
      <SectionHero heroBanner={bannerCharts} sectionTitle={"Charts"} />
      <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3">
        <ChartCard title={"Total Numbers"} subTitle={"Products, Brands, Categories, SubCategories, Product Images"}>
          <TotalNumbersChart data={totData} />
        </ChartCard>
        <ChartCard title={"Products per Brand"}>
          <ProductsPerBrandChart data={ppbData} />
        </ChartCard>
        <ChartCard title={"Products per Category"} options={<ProductsPerCategoryOptions categories={categories} />}>
          <ProductsPerCategoryChart data={ppcData} />
        </ChartCard>
      </div>
    </article>
  );
}
