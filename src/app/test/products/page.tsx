// component css styles
import styles from "./page.module.css";

// next
import { ReadonlyURLSearchParams } from "next/navigation";

// prisma and db access
import ordersByDay from "@/features/manager/charts/db/ordersByDay";

// other libraries
import SearchParamsState from "@/features/manager/SearchParamsState";
import { formatCurrency } from "@/lib/formatters";

// components
import { default as ChartCard } from "@/features/manager/charts/components/cards/Chart";
import TimeRangeOptions from "@/features/manager/charts/components/charts/TimeRangeOptions";
import OrdersByDay from "@/features/manager/charts/components/charts/OrdersByDay";

// types
interface PageProps {
  searchParams: { [key: string]: string | string[] | undefined };
}

export const metadata = {
  title: "NoLine-Deli ► Manager ► Products",
};

export default async function Page({ searchParams }: PageProps) {
  const searchParamsState = new SearchParamsState("", new ReadonlyURLSearchParams(new URLSearchParams(searchParams as any)));
  const { chObdRangeKey, rangeOptionFromKey } = searchParamsState;

  const obdData = await ordersByDay(rangeOptionFromKey(chObdRangeKey));

  // console.log(await ordersByDay(RANGE_OPTIONS.LAST_YEAR));
  // console.log(a, b);

  return (
    <article className={styles["page"]}>
      <ChartCard
        title={"Orders by Day"}
        subTitle={`Total Orders: ${obdData.orders}, Total Sales: ${formatCurrency(obdData.sales)}`}
        options={<TimeRangeOptions chartType="obd" rangeKey={chObdRangeKey} startDate={obdData.startDate} endDate={obdData.endDate} />}
      >
        <OrdersByDay data={obdData} />
      </ChartCard>
    </article>
  );
}
