// react
import { cache } from "react";

// prisma and db access
import type { Prisma } from "@prisma/client";
import prisma from "@/services/prisma";
import { countAdminApprovedProducts, whereAdminApproved } from "@/features/manager/login/db";

// other libraries
import type { ProductsPerBrandData } from "./types";

const productsPerBrand = cache(async () => {
  const brands = await prisma.brand.findMany({
    where: { ...whereAdminApproved<Prisma.BrandWhereInput>() },
    select: { name: true, ...countAdminApprovedProducts<Prisma.BrandSelect>("OtM") },
  });

  const data: ProductsPerBrandData = { productsPerBrand: brands.map(({ name, _count: { products } }) => ({ brand: name, products: products })) };

  return data;
});

export default productsPerBrand;
