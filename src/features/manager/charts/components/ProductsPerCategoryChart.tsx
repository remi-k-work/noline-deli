"use client";

// next
import { useRouter } from "next/navigation";

// prisma and db access
import { ProductsPerCategoryData } from "../db";

// other libraries
import { Bar, BarChart, CartesianGrid, ResponsiveContainer, Tooltip, XAxis, YAxis } from "recharts";
import useSearchParamsState from "../../hooks/useSearchParamsState";

// components
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";

// types
interface ProductsPerCategoryChartProps {
  data: ProductsPerCategoryData;
}

interface ProductsPerCategoryOptionsProps {
  data: ProductsPerCategoryData;
}

export default function ProductsPerCategoryChart({ data: { productsPerCategory } }: ProductsPerCategoryChartProps) {
  return (
    <ResponsiveContainer width="100%" minHeight={300}>
      <BarChart data={productsPerCategory} layout="vertical">
        <CartesianGrid stroke="hsl(var(--muted))" />
        <XAxis type="number" stroke="hsl(var(--primary))" />
        <YAxis dataKey="category" type="category" stroke="hsl(var(--primary))" hide={true} />
        <Tooltip
          cursor={{ fill: "hsl(var(--muted))" }}
          contentStyle={{ backgroundColor: "hsl(var(--background))" }}
          labelStyle={{ color: "var(--text-1)" }}
          itemStyle={{ color: "var(--text-2)" }}
        />
        <Bar dataKey="mCatProd" stackId="products" name="Products" stroke="hsl(var(--muted))" fill="var(--brand)" />
        <Bar dataKey="sCatProd" stackId="products" name="Products" stroke="hsl(var(--muted))" fill="hsl(var(--primary))" />
      </BarChart>
    </ResponsiveContainer>
  );
}

export function ProductsPerCategoryOptions({ data: { categories } }: ProductsPerCategoryOptionsProps) {
  const searchParamsState = useSearchParamsState();
  const { replace } = useRouter();

  function handleOptionChanged(newOption: string) {
    replace(searchParamsState.chartsChanged("ppc", newOption), { scroll: false });
  }

  return (
    <Select name={"categoryId"} defaultValue={categories[0]?.id} onValueChange={(value) => handleOptionChanged(value)}>
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
