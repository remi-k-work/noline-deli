// react
import { cache } from "react";

// prisma and db access
import { Prisma } from "@prisma/client";
import prisma from "@/lib/db/prisma";
import { whereAdminApproved } from "@/features/manager/auth/db";

// other libraries
import { ProductFilterData } from "../types";

// Gather the necessary data for the product filter, such as a list of all available brands and pricing ranges
const productFilter = cache(async () => {
  const [
    byCompanyList,
    {
      _min: { price: byPriceBelowMin },
      _max: { price: byPriceBelowMax },
    },
  ] = await Promise.all([
    prisma.brand.findMany({
      where: { ...whereAdminApproved<Prisma.BrandWhereInput>() },
      orderBy: { name: "asc" },
    }),
    prisma.product.aggregate({
      _min: { price: true },
      _max: { price: true },
      where: { ...whereAdminApproved<Prisma.ProductWhereInput>() },
    }),
  ]);

  const data: ProductFilterData = { byCompanyList, byPriceBelowMin: byPriceBelowMin ?? 0, byPriceBelowMax: byPriceBelowMax ?? 900000000 };

  return data;
});

export default productFilter;
