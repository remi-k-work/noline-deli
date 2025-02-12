"use client";

// prisma and db access
import type { CustomersByDayData } from "../../db/types";

// other libraries
import { Bar, BarChart, CartesianGrid, ResponsiveContainer, Tooltip, XAxis, YAxis } from "recharts";

// types
interface CustomersByDayProps {
  data: CustomersByDayData;
}

export default function CustomersByDay({ data: { customersByDay } }: CustomersByDayProps) {
  return (
    <ResponsiveContainer width="100%" minHeight={300}>
      <BarChart data={customersByDay}>
        <CartesianGrid stroke="hsl(var(--muted))" />
        <XAxis dataKey="dayName" stroke="hsl(var(--primary))" />
        <YAxis stroke="hsl(var(--primary))" />
        <Tooltip
          cursor={{ fill: "hsl(var(--muted))" }}
          contentStyle={{ backgroundColor: "hsl(var(--background))" }}
          labelStyle={{ color: "var(--text-1)" }}
          itemStyle={{ color: "var(--text-2)" }}
        />
        <Bar dataKey="customers" name="New Customers" stroke="hsl(var(--muted))" fill="var(--brand)" />
      </BarChart>
    </ResponsiveContainer>
  );
}
