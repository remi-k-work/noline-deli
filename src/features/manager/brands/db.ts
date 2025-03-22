// react
import { cache } from "react";

// prisma and db access
import { Prisma } from "@prisma/client";
import prisma from "@/services/prisma";
import { whereAdminApproved } from "@/features/manager/login/db";

// types
export type BrandWithUser = Prisma.BrandGetPayload<{ include: typeof INCLUDE_BRAND_WITH_USER }>;
export type BrandWithInfo = Prisma.BrandGetPayload<{ include: typeof INCLUDE_BRAND_WITH_INFO }>;

// Prisma includes
const INCLUDE_BRAND_WITH_USER = { user: true } as const satisfies Prisma.BrandInclude;
const INCLUDE_BRAND_WITH_INFO = { user: true, _count: { select: { products: true } } } as const satisfies Prisma.BrandInclude;

// Create and where clause generators and helpers
function whereKeyword(keyword?: string): Prisma.BrandWhereInput {
  return keyword === undefined ? { OR: undefined } : { OR: [{ name: { contains: keyword, mode: "insensitive" } }] };
}

// Retrieve all of the brands from an external source (database)
export const allBrands = cache(async () => {
  return prisma.brand.findMany({
    where: { ...(await whereAdminApproved<Prisma.BrandWhereInput>()) },
    include: INCLUDE_BRAND_WITH_USER,
    orderBy: { name: "asc" },
  });
});

// Get all the information you need about this particular brand
export const getBrand = cache(async (brandId: string) => {
  return prisma.brand.findUnique({ where: { ...(await whereAdminApproved<Prisma.BrandWhereUniqueInput>()), id: brandId }, include: INCLUDE_BRAND_WITH_USER });
});

// Delete the given brand and its associated data
export async function deleteBrand(brandId: string) {
  return prisma.brand.delete({ where: { ...(await whereAdminApproved<Prisma.BrandWhereUniqueInput>()), id: brandId } });
}

// To update an existing brand, we cannot delete it and recreate it with new data
// It would cascade and delete all related products that belong to this brand!
export async function updateBrand(brandId: string, name: string, logoUrl: string) {
  return prisma.brand.update({ where: { ...(await whereAdminApproved<Prisma.BrandWhereUniqueInput>()), id: brandId }, data: { name, logoUrl } });
}

// Generate an entirely new brand with all the associated data
export function createBrand(createdBy: string, name: string, logoUrl: string) {
  return prisma.brand.create({ data: { name, logoUrl, createdBy } });
}

// Retrieve all brands from an external source (database) using offset pagination
export async function allBrandsWithPagination(itemsPerPage: number, sortByField: string, sortByOrder: string, currentPage?: number, keyword?: string) {
  const indexOfLastItem = (currentPage ?? 1) * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;

  return Promise.all([
    prisma.brand.count({
      where: { ...(await whereAdminApproved<Prisma.BrandWhereInput>()), ...whereKeyword(keyword) },
    }),
    prisma.brand.findMany({
      where: { ...(await whereAdminApproved<Prisma.BrandWhereInput>()), ...whereKeyword(keyword) },
      include: INCLUDE_BRAND_WITH_INFO,
      orderBy: { [sortByField]: sortByOrder },
      skip: indexOfFirstItem,
      take: itemsPerPage,
    }),
  ]);
}
