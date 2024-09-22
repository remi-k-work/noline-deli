// component css styles
import styles from "./page.module.css";

// next
import { ReadonlyURLSearchParams } from "next/navigation";

// prisma and db access
import { ordersByDay, productsPerBrand, productsPerCategory, revenueByItem, totalNumbers } from "@/features/manager/charts/db";

// other libraries
import SearchParamsState from "@/features/manager/SearchParamsState";
import { formatPrice } from "@/lib/helpers";

// components
import SectionHero from "@/features/manager/components/SectionHero";
import ChartCard from "@/features/manager/charts/components/ChartCard";
import TotalNumbersChart from "@/features/manager/charts/components/TotalNumbersChart";
import ProductsPerBrandChart from "@/features/manager/charts/components/ProductsPerBrandChart";
import ProductsPerCategoryChart, { ProductsPerCategoryOptions } from "@/features/manager/charts/components/ProductsPerCategoryChart";
import OrdersByDayChart, { OrdersByDayOptions } from "@/features/manager/charts/components/OrdersByDayChart";
import RevenueByItemChart, { RevenueByItemOptions } from "@/features/manager/charts/components/RevenueByItemChart";

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
  const { chPpcCategoryId, chObdRangeOption, chRbiRangeOption } = searchParamsState;

  // Collect all relevant totals (such as the total number of products and brands) plus other chart data
  const [totData, ppbData, ppcData, obdData, rbiData] = await Promise.all([
    totalNumbers(),
    productsPerBrand(),
    productsPerCategory(chPpcCategoryId),
    ordersByDay(chObdRangeOption),
    revenueByItem(chRbiRangeOption),
  ]);

  return (
    <article className={styles["page"]}>
      <SectionHero heroBanner={bannerCharts} sectionTitle={"Charts"} />
      <section className={styles["page__charts-view"]}>
        <ChartCard title={"Total Numbers"} subTitle={"Products, Brands, Categories, SubCategories, Product Images"}>
          <TotalNumbersChart data={totData} />
        </ChartCard>
        <ChartCard title={"Products per Brand"}>
          <ProductsPerBrandChart data={ppbData} />
        </ChartCard>
        <ChartCard title={"Products per Category"} options={<ProductsPerCategoryOptions data={ppcData} />}>
          <ProductsPerCategoryChart data={ppcData} />
        </ChartCard>
        <ChartCard
          title={"Orders by Day"}
          subTitle={`Total Orders: ${obdData.orders}, Total Sales: ${formatPrice(obdData.sales)}`}
          options={<OrdersByDayOptions />}
        >
          <OrdersByDayChart data={obdData} />
        </ChartCard>
        <ChartCard
          title={"Revenue by Item"}
          subTitle={`Total Quantity: ${rbiData.quantity}, Total Amount: ${formatPrice(rbiData.total)}`}
          options={<RevenueByItemOptions />}
        >
          <RevenueByItemChart data={rbiData} />
        </ChartCard>
      </section>
    </article>
  );
}
