"use client";

// next
import { useRouter } from "next/navigation";

// prisma and db access
import { ProductsPerCategoryData } from "../../db/types";

// other libraries
import { Bar, BarChart, CartesianGrid, ResponsiveContainer, Tooltip, XAxis, YAxis } from "recharts";
import useSearchParamsState from "../../../hooks/useSearchParamsState";

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
  const { chPpcCategoryId } = searchParamsState;
  const { replace } = useRouter();

  return (
    <Select
      name={"categoryId"}
      value={chPpcCategoryId ?? categories[0]?.id}
      onValueChange={(value) => replace(searchParamsState.chartPpcCategoryChanged(value), { scroll: false })}
    >
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
