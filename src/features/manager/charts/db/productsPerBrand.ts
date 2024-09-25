// react
import { cache } from "react";

// prisma and db access
import { Prisma } from "@prisma/client";
import prisma from "@/lib/db/prisma";
import { countAdminApprovedProducts, whereAdminApproved } from "@/features/manager/auth/db";

// other libraries
import { ProductsPerBrandData } from "./types";

const productsPerBrand = cache(async () => {
  const brands = await prisma.brand.findMany({
    where: { ...whereAdminApproved<Prisma.BrandWhereInput>() },
    select: { name: true, ...countAdminApprovedProducts<Prisma.BrandSelect>("OtM") },
  });

  const data: ProductsPerBrandData = { productsPerBrand: brands.map(({ name, _count: { products } }) => ({ brand: name, products: products })) };

  return data;
});

export default productsPerBrand;
