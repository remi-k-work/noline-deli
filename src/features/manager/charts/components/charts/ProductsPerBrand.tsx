"use client";

// prisma and db access
import type { ProductsPerBrandData } from "@/features/manager/charts/db/types";

// other libraries
import { Legend, Pie, PieChart, ResponsiveContainer, Tooltip } from "recharts";

// types
interface ProductsPerBrandProps {
  data: ProductsPerBrandData;
}

export default function ProductsPerBrand({ data: { productsPerBrand } }: ProductsPerBrandProps) {
  return (
    <ResponsiveContainer width="100%" minHeight={300}>
      <PieChart>
        <Tooltip
          cursor={{ fill: "var(--muted)" }}
          contentStyle={{ backgroundColor: "var(--background)" }}
          labelStyle={{ color: "var(--text-1)" }}
          itemStyle={{ color: "var(--text-2)" }}
        />
        <Legend />
        <Pie data={productsPerBrand} label={(item) => item.value} dataKey="products" nameKey="brand" stroke="var(--primary-foreground)" fill="var(--primary)" />
      </PieChart>
    </ResponsiveContainer>
  );
}
