"use client";

// next
import { useRouter } from "next/navigation";

// prisma and db access
import { OrdersByDayData } from "../db";

// other libraries
import { CartesianGrid, Line, LineChart, ResponsiveContainer, Tooltip, XAxis, YAxis } from "recharts";
import useSearchParamsState from "../../hooks/useSearchParamsState";
import { RANGE_OPTIONS } from "@/lib/rangeOptions";
import { formatPrice } from "@/lib/helpers";

// components
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";

// types
interface OrdersByDayChartProps {
  data: OrdersByDayData;
}

export default function OrdersByDayChart({ data: { ordersByDay } }: OrdersByDayChartProps) {
  return (
    <ResponsiveContainer width="100%" minHeight={300}>
      <LineChart data={ordersByDay}>
        <CartesianGrid stroke="hsl(var(--muted))" />
        <XAxis dataKey="dayName" stroke="hsl(var(--primary))" />
        <YAxis stroke="hsl(var(--primary))" tickFormatter={(tick) => formatPrice(tick)} />
        <Tooltip
          cursor={{ fill: "hsl(var(--muted))" }}
          contentStyle={{ backgroundColor: "hsl(var(--background))" }}
          labelStyle={{ color: "var(--text-1)" }}
          itemStyle={{ color: "var(--text-2)" }}
          formatter={(value) => formatPrice(value as number)}
        />
        <Line dot={false} dataKey="orders" type="monotone" name="Orders" stroke="hsl(var(--primary))" />
        <Line dot={false} dataKey="sales" type="monotone" name="Sales" stroke="hsl(var(--secondary))" />
      </LineChart>
    </ResponsiveContainer>
  );
}

export function OrdersByDayOptions() {
  const searchParamsState = useSearchParamsState();
  const { replace } = useRouter();

  function handleOptionChanged(newOption: string) {
    replace(searchParamsState.chartsChanged("obd", newOption), { scroll: false });
  }

  return (
    <Select name={"rangeOptions"} defaultValue={"All Time"} onValueChange={(value) => handleOptionChanged(value)}>
      <SelectTrigger>
        <SelectValue placeholder="Choose Range" />
      </SelectTrigger>
      <SelectContent>
        <SelectItem value="All Time">All Time</SelectItem>
        {Object.entries(RANGE_OPTIONS).map(([key, rangeOption]) => (
          <SelectItem key={key} value={key}>
            {rangeOption.label}
          </SelectItem>
        ))}
      </SelectContent>
    </Select>
  );
}
