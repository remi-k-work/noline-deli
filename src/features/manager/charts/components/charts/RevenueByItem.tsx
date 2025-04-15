/* eslint-disable @typescript-eslint/no-explicit-any */

"use client";

// prisma and db access
import type { RevenueByItemData } from "@/features/manager/charts/db/types";

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
        <CartesianGrid stroke="var(--muted)" />
        <XAxis type="number" dataKey="quantity" name="Quantity" stroke="var(--primary)" />
        <YAxis type="number" dataKey="total" name="Total" stroke="var(--primary)" tickFormatter={(tick) => formatCurrency(tick)} />
        <ZAxis type="category" dataKey="itemName" name="Item" />
        <Tooltip cursor={{ fill: "var(--muted)", strokeDasharray: "3 3" }} content={<CustomTooltip />} />
        <Scatter fill="var(--primary)" />
      </ScatterChart>
    </ResponsiveContainer>
  );
}

function CustomTooltip({ active, payload }: CustomTooltipProps) {
  if (active && payload && payload.length) {
    return (
      <p className="border-muted bg-background text-text-1 border p-2">
        <span className="text-accent">{payload[2].value}</span>
        <br />
        <span className="text-text-2">Quantity : </span>
        {payload[0].value}
        <br />
        <span className="text-text-2">Total : </span>
        {formatCurrency(payload[1].value)}
      </p>
    );
  }

  return null;
}
