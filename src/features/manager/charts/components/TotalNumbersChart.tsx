"use client";

// other libraries
import { Bar, BarChart, CartesianGrid, Legend, ResponsiveContainer, Tooltip, XAxis, YAxis } from "recharts";
import { TotalNumbersData } from "../db";

// types
interface TotalNumbersChartProps {
  data: TotalNumbersData[];
}

export default function TotalNumbersChart({ data }: TotalNumbersChartProps) {
  return (
    <ResponsiveContainer width="100%" minHeight={300}>
      <BarChart data={data}>
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
        <Bar dataKey="itemsAdmin" stackId="items" name="Admin Approved" stroke="hsl(var(--muted))" fill="var(--brand)" />
        <Bar dataKey="itemsUser" stackId="items" name="Created by You" stroke="hsl(var(--muted))" fill="hsl(var(--primary))" />
      </BarChart>
    </ResponsiveContainer>
  );
}
