"use client";

// next
import { useRouter } from "next/navigation";

// prisma and db access
import { RevenueByItemData } from "../db";

// other libraries
import { CartesianGrid, ResponsiveContainer, Scatter, ScatterChart, Tooltip, XAxis, YAxis, ZAxis } from "recharts";
import useSearchParamsState from "../../hooks/useSearchParamsState";
import { RANGE_OPTIONS } from "@/lib/rangeOptions";
import { formatPrice } from "@/lib/helpers";

// components
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";

// types
interface RevenueByItemChartProps {
  data: RevenueByItemData;
}

interface CustomTooltipProps {
  active?: any;
  payload?: any;
  label?: any;
}

export default function RevenueByItemChart({ data: { revenueByItem } }: RevenueByItemChartProps) {
  return (
    <ResponsiveContainer width="100%" minHeight={300}>
      <ScatterChart data={revenueByItem}>
        <CartesianGrid stroke="hsl(var(--muted))" />
        <XAxis type="number" dataKey="quantity" name="Quantity" stroke="hsl(var(--primary))" />
        <YAxis type="number" dataKey="total" name="Total" stroke="hsl(var(--primary))" tickFormatter={(tick) => formatPrice(tick)} />
        <ZAxis type="category" dataKey="itemName" name="Item" />
        <Tooltip cursor={{ fill: "hsl(var(--muted))", strokeDasharray: "3 3" }} content={<CustomTooltip />} />
        <Scatter fill="var(--brand)" />
      </ScatterChart>
    </ResponsiveContainer>
  );
}

export function RevenueByItemOptions() {
  const searchParamsState = useSearchParamsState();
  const { chRbiRangeKey } = searchParamsState;
  const { replace } = useRouter();

  return (
    <Select
      name={"rangeOptions"}
      value={chRbiRangeKey ?? "All Time"}
      onValueChange={(value) => replace(searchParamsState.chartRbiRangeChanged(value), { scroll: false })}
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

function CustomTooltip({ active, payload }: CustomTooltipProps) {
  if (active && payload && payload.length) {
    return (
      <p className="border border-[hsl(var(--muted))] bg-[hsl(var(--background))] p-2 text-[var(--text-1)]">
        <span className="text-[var(--brand)]">{payload[2].value}</span>
        <br />
        <span className="text-[var(--text-2)]">Quantity : </span>
        {payload[0].value}
        <br />
        <span className="text-[var(--text-2)]">Total : </span>
        {formatPrice(payload[1].value)}
      </p>
    );
  }

  return null;
}
