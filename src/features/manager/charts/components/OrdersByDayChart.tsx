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

const CustomTooltip = ({ active, payload, label }: { active?: any; payload?: any; label?: any }) => {
  if (active && payload && payload.length) {
    return (
      <p className="border border-[hsl(var(--muted))] bg-[hsl(var(--background))] p-2 text-[var(--text-1)]">
        <span className="text-[var(--brand)]">{label}</span>
        <br />
        <span className="text-[var(--text-2)]">Orders : </span>
        {payload[0].value}
        <br />
        <span className="text-[var(--text-2)]">Sales : </span>
        {formatPrice(payload[1].value)}
      </p>
    );
  }

  return null;
};

export default function OrdersByDayChart({ data: { ordersByDay } }: OrdersByDayChartProps) {
  return (
    <ResponsiveContainer width="100%" minHeight={300}>
      <LineChart data={ordersByDay}>
        <CartesianGrid stroke="hsl(var(--muted))" />
        <XAxis dataKey="dayName" stroke="hsl(var(--primary))" />
        <YAxis stroke="hsl(var(--primary))" tickFormatter={(tick) => formatPrice(tick)} />
        <Tooltip content={<CustomTooltip />} />
        <Line dataKey="orders" type="monotone" name="Orders" stroke="hsl(var(--primary))" />
        <Line dataKey="sales" type="monotone" name="Sales" stroke="var(--brand)" />
      </LineChart>
    </ResponsiveContainer>
  );
}

export function OrdersByDayOptions() {
  const searchParamsState = useSearchParamsState();
  const { chObdRangeKey } = searchParamsState;
  const { replace } = useRouter();

  return (
    <Select
      name={"rangeOptions"}
      value={chObdRangeKey ?? "All Time"}
      onValueChange={(value) => replace(searchParamsState.chartObdRangeChanged(value), { scroll: false })}
    >
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
