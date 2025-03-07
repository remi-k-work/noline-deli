"use client";

// prisma and db access
import type { ProductsPerCategoryData } from "@/features/manager/charts/db/types";

// other libraries
import { Bar, BarChart, CartesianGrid, ResponsiveContainer, Tooltip, XAxis, YAxis } from "recharts";
import useSearchParamsState from "@/features/manager/hooks/useSearchParamsState";

// components
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";

// types
interface ProductsPerCategoryProps {
  data: ProductsPerCategoryData;
}

interface ProductsPerCategoryOptionsProps {
  data: ProductsPerCategoryData;
}

export default function ProductsPerCategory({ data: { productsPerCategory } }: ProductsPerCategoryProps) {
  return (
    <ResponsiveContainer width="100%" minHeight={300}>
      <BarChart data={productsPerCategory} layout="vertical">
        <CartesianGrid stroke="var(--muted)" />
        <XAxis type="number" stroke="var(--primary)" />
        <YAxis dataKey="category" type="category" stroke="var(--primary)" hide={true} />
        <Tooltip
          cursor={{ fill: "var(--muted)" }}
          contentStyle={{ backgroundColor: "var(--background)" }}
          labelStyle={{ color: "var(--text-1)" }}
          itemStyle={{ color: "var(--text-2)" }}
        />
        <Bar dataKey="mCatProd" stackId="products" name="Products" stroke="var(--secondary-foreground)" fill="var(--secondary)" />
        <Bar dataKey="sCatProd" stackId="products" name="Products" stroke="var(--primary-foreground)" fill="var(--primary)" />
      </BarChart>
    </ResponsiveContainer>
  );
}

export function ProductsPerCategoryOptions({ data: { categories } }: ProductsPerCategoryOptionsProps) {
  const { chPpcCategoryId, chartPpcCategoryChanged } = useSearchParamsState();

  return (
    <Select name={"categoryId"} value={chPpcCategoryId ?? categories[0]?.id} onValueChange={(value) => chartPpcCategoryChanged(value)}>
      <SelectTrigger>
        <SelectValue placeholder="Choose Category" />
      </SelectTrigger>
      <SelectContent>
        {categories.map(({ id, name }) => (
          <SelectItem key={id} value={id}>
            {name}
          </SelectItem>
        ))}
      </SelectContent>
    </Select>
  );
}
