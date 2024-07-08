"use client";

// other libraries
import { Legend, Pie, PieChart, ResponsiveContainer, Tooltip } from "recharts";
import { ProductsPerBrandData } from "../db";

// types
interface ProductsPerBrandChartProps {
  data: ProductsPerBrandData[];
}

export default function ProductsPerBrandChart({ data }: ProductsPerBrandChartProps) {
  return (
    <ResponsiveContainer width="100%" minHeight={300}>
      <PieChart>
        <Tooltip
          cursor={{ fill: "hsl(var(--muted))" }}
          contentStyle={{ backgroundColor: "hsl(var(--background))" }}
          labelStyle={{ color: "var(--text-1)" }}
          itemStyle={{ color: "var(--text-2)" }}
        />
        <Legend />
        <Pie data={data} label={(item) => item.value} dataKey="products" nameKey="brand" stroke="hsl(var(--muted))" fill="var(--brand)" />
      </PieChart>
    </ResponsiveContainer>
  );
}
