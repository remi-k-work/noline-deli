"use client";

// prisma and db access
import type { OrdersByDayData } from "../../db/types";

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
        <CartesianGrid stroke="hsl(var(--muted))" />
        <XAxis dataKey="dayName" stroke="hsl(var(--primary))" />
        <YAxis stroke="hsl(var(--primary))" tickFormatter={(tick) => formatCurrency(tick)} />
        <Tooltip cursor={{ fill: "hsl(var(--muted))", strokeDasharray: "3 3" }} content={<CustomTooltip />} />
        <Line dot={false} dataKey="orders" type="monotone" name="Orders" stroke="hsl(var(--primary))" />
        <Line dataKey="sales" type="monotone" name="Sales" stroke="var(--brand)" />
      </LineChart>
    </ResponsiveContainer>
  );
}

function CustomTooltip({ active, payload, label }: CustomTooltipProps) {
  if (active && payload && payload.length) {
    return (
      <p className="border border-[hsl(var(--muted))] bg-[hsl(var(--background))] p-2 text-[var(--text-1)]">
        <span className="text-[var(--brand)]">{label}</span>
        <br />
        <span className="text-[var(--text-2)]">Orders : </span>
        {payload[0].value}
        <br />
        <span className="text-[var(--text-2)]">Sales : </span>
        {formatCurrency(payload[1].value)}
      </p>
    );
  }

  return null;
}
