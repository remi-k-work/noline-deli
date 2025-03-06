"use client";

// prisma and db access
import type { TotalNumbersData } from "@/features/manager/charts/db/types";

// other libraries
import { Bar, BarChart, CartesianGrid, Legend, ResponsiveContainer, Tooltip, XAxis, YAxis } from "recharts";

// types
interface TotalNumbersProps {
  data: TotalNumbersData;
}

export default function TotalNumbers({ data: { totalNumbers } }: TotalNumbersProps) {
  return (
    <ResponsiveContainer width="100%" minHeight={300}>
      <BarChart data={totalNumbers}>
        <CartesianGrid stroke="hsl(var(--muted))" />
        <XAxis dataKey="totCategory" stroke="hsl(var(--primary))" />
        <YAxis stroke="hsl(var(--primary))" hide={true} />
        <Tooltip
          cursor={{ fill: "hsl(var(--muted))" }}
          contentStyle={{ backgroundColor: "hsl(var(--background))" }}
          labelStyle={{ color: "var(--text-1)" }}
          itemStyle={{ color: "var(--text-2)" }}
        />
        <Legend />
        <Bar dataKey="itemsAdmin" stackId="items" name="Admin Approved" stroke="hsl(var(--primary-foreground))" fill="hsl(var(--primary))" />
        <Bar dataKey="itemsUser" stackId="items" name="Created by You" stroke="hsl(var(--secondary-foreground))" fill="hsl(var(--secondary))" />
      </BarChart>
    </ResponsiveContainer>
  );
}
