"use client";

// prisma and db access
import { RevenueByItemData } from "../../db/types";

// other libraries
import { CartesianGrid, ResponsiveContainer, Scatter, ScatterChart, Tooltip, XAxis, YAxis, ZAxis } from "recharts";
import { formatCurrency } from "@/lib/formatters";

// types
interface RevenueByItemProps {
  data: RevenueByItemData;
}

interface CustomTooltipProps {
  active?: any;
  payload?: any;
  label?: any;
}

export default function RevenueByItem({ data: { revenueByItem } }: RevenueByItemProps) {
  return (
    <ResponsiveContainer width="100%" minHeight={300}>
      <ScatterChart data={revenueByItem}>
        <CartesianGrid stroke="hsl(var(--muted))" />
        <XAxis type="number" dataKey="quantity" name="Quantity" stroke="hsl(var(--primary))" />
        <YAxis type="number" dataKey="total" name="Total" stroke="hsl(var(--primary))" tickFormatter={(tick) => formatCurrency(tick)} />
        <ZAxis type="category" dataKey="itemName" name="Item" />
        <Tooltip cursor={{ fill: "hsl(var(--muted))", strokeDasharray: "3 3" }} content={<CustomTooltip />} />
        <Scatter fill="var(--brand)" />
      </ScatterChart>
    </ResponsiveContainer>
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
        {formatCurrency(payload[1].value)}
      </p>
    );
  }

  return null;
}
