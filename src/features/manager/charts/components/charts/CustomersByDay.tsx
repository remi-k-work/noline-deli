"use client";

// prisma and db access
import type { CustomersByDayData } from "@/features/manager/charts/db/types";

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
        <CartesianGrid stroke="var(--muted)" />
        <XAxis dataKey="dayName" stroke="var(--primary)" />
        <YAxis stroke="var(--primary)" />
        <Tooltip
          cursor={{ fill: "var(--muted)" }}
          contentStyle={{ backgroundColor: "var(--background)" }}
          labelStyle={{ color: "var(--text-1)" }}
          itemStyle={{ color: "var(--text-2)" }}
        />
        <Bar dataKey="customers" name="New Customers" stroke="var(--primary-foreground)" fill="var(--primary)" />
      </BarChart>
    </ResponsiveContainer>
  );
}
