/* eslint-disable @typescript-eslint/no-explicit-any */

"use client";

// prisma and db access
import type { OrdersByDayData } from "@/features/manager/charts/db/types";

// other libraries
import { CartesianGrid, Line, LineChart, ResponsiveContainer, Tooltip, XAxis, YAxis } from "recharts";
import { formatCurrency } from "@/lib/formatters";

// types
interface OrdersByDayProps {
  data: OrdersByDayData;
}

interface CustomTooltipProps {
  active?: any;
  payload?: any;
  label?: any;
}

export default function OrdersByDay({ data: { ordersByDay } }: OrdersByDayProps) {
  return (
    <ResponsiveContainer width="100%" minHeight={300}>
      <LineChart data={ordersByDay}>
        <CartesianGrid stroke="var(--muted)" />
        <XAxis dataKey="dayName" stroke="var(--primary)" />
        <YAxis stroke="var(--primary)" tickFormatter={(tick) => formatCurrency(tick)} />
        <Tooltip cursor={{ fill: "var(--muted)", strokeDasharray: "3 3" }} content={<CustomTooltip />} />
        <Line dot={false} dataKey="orders" type="monotone" name="Orders" stroke="var(--primary-foreground)" />
        <Line dataKey="sales" type="monotone" name="Sales" stroke="var(--secondary-foreground)" />
      </LineChart>
    </ResponsiveContainer>
  );
}

function CustomTooltip({ active, payload, label }: CustomTooltipProps) {
  if (active && payload && payload.length) {
    return (
      <p className="border-muted bg-background text-text-1 border p-2">
        <span className="text-accent">{label}</span>
        <br />
        <span className="text-text-2">Orders : </span>
        {payload[0].value}
        <br />
        <span className="text-text-2">Sales : </span>
        {formatCurrency(payload[1].value)}
      </p>
    );
  }

  return null;
}
