// component css styles
import styles from "./page.module.css";

// next
import { ReadonlyURLSearchParams } from "next/navigation";

// prisma and db access
import ordersByDay from "@/features/manager/charts/db/ordersByDay";
import productsPerBrand from "@/features/manager/charts/db/productsPerBrand";
import productsPerCategory from "@/features/manager/charts/db/productsPerCategory";
import revenueByItem from "@/features/manager/charts/db/revenueByItem";
import totalNumbers from "@/features/manager/charts/db/totalNumbers";
import customersByDay from "@/features/manager/charts/db/customersByDay";

// other libraries
import SearchParamsState from "@/features/manager/SearchParamsState";
import { formatCurrency } from "@/lib/formatters";

// components
import SectionHero from "@/features/manager/components/SectionHero";
import { default as ChartCard } from "@/features/manager/charts/components/cards/Chart";
import TimeRangeOptions from "@/features/manager/charts/components/charts/TimeRangeOptions";
import TotalNumbers from "@/features/manager/charts/components/charts/TotalNumbers";
import ProductsPerBrand from "@/features/manager/charts/components/charts/ProductsPerBrand";
import ProductsPerCategory, { ProductsPerCategoryOptions } from "@/features/manager/charts/components/charts/ProductsPerCategory";
import OrdersByDay from "@/features/manager/charts/components/charts/OrdersByDay";
import RevenueByItem from "@/features/manager/charts/components/charts/RevenueByItem";
import CustomersByDay from "@/features/manager/charts/components/charts/CustomersByDay";

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
  const searchParamsState = new SearchParamsState(new ReadonlyURLSearchParams(searchParams as any));
  const { chPpcCategoryId, chObdRangeKey, chRbiRangeKey, chCbdRangeKey, rangeOptionFromKey } = searchParamsState;

  // Collect all relevant totals (such as the total number of products and brands) plus other chart data
  const [totData, ppbData, ppcData, obdData, rbiData, cbdData] = await Promise.all([
    totalNumbers(),
    productsPerBrand(),
    productsPerCategory(chPpcCategoryId),
    ordersByDay(rangeOptionFromKey(chObdRangeKey)),
    revenueByItem(rangeOptionFromKey(chRbiRangeKey)),
    customersByDay(rangeOptionFromKey(chCbdRangeKey)),
  ]);

  return (
    <article className={styles["page"]}>
      <SectionHero heroBanner={bannerCharts} sectionTitle={"Charts"} />
      <section className={styles["page__charts-view"]}>
        <ChartCard title={"Total Numbers"} subTitle={"Products, Brands, Categories, SubCategories, Product Images"}>
          <TotalNumbers data={totData} />
        </ChartCard>
        <ChartCard title={"Products per Brand"}>
          <ProductsPerBrand data={ppbData} />
        </ChartCard>
        <ChartCard title={"Products per Category"} options={<ProductsPerCategoryOptions data={ppcData} />}>
          <ProductsPerCategory data={ppcData} />
        </ChartCard>
        <ChartCard
          title={"Orders by Day"}
          subTitle={`Total Orders: ${obdData.orders}, Total Sales: ${formatCurrency(obdData.sales)}`}
          options={<TimeRangeOptions chartType="obd" rangeKey={chObdRangeKey} startDate={obdData.startDate} endDate={obdData.endDate} />}
        >
          <OrdersByDay data={obdData} />
        </ChartCard>
        <ChartCard
          title={"Revenue by Item"}
          subTitle={`Total Quantity: ${rbiData.quantity}, Total Amount: ${formatCurrency(rbiData.total)}`}
          options={<TimeRangeOptions chartType="rbi" rangeKey={chRbiRangeKey} startDate={rbiData.startDate} endDate={rbiData.endDate} />}
        >
          <RevenueByItem data={rbiData} />
        </ChartCard>
        <ChartCard
          title={"Customers by Day"}
          subTitle={`Total Customers: ${cbdData.customers}`}
          options={<TimeRangeOptions chartType="cbd" rangeKey={chCbdRangeKey} startDate={cbdData.startDate} endDate={cbdData.endDate} />}
        >
          <CustomersByDay data={cbdData} />
        </ChartCard>
      </section>
    </article>
  );
}
