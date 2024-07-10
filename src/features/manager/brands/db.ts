// react
import { cache } from "react";

// prisma and db access
import { Prisma } from "@prisma/client";
import prisma from "@/lib/db/prisma";
import { whereAdminApproved } from "@/features/manager/auth/db";

// types
export type BrandWithUser = Prisma.BrandGetPayload<{ include: typeof INCLUDE_BRAND_WITH_USER }>;

const INCLUDE_BRAND_WITH_USER = { user: true } satisfies Prisma.BrandInclude;

// Create and where clause generators and helpers
function whereKeyword(keyword?: string): Prisma.BrandWhereInput {
  return keyword === undefined ? { OR: undefined } : { OR: [{ name: { contains: keyword, mode: "insensitive" } }] };
}

// Retrieve all of the brands from an external source (database)
export const allBrands = cache(() => {
  return prisma.brand.findMany({ where: { ...whereAdminApproved<Prisma.BrandWhereInput>() }, include: INCLUDE_BRAND_WITH_USER, orderBy: { name: "asc" } });
});

// Get all the information you need about this particular brand
export const getBrand = cache((brandId: string) => {
  return prisma.brand.findUnique({ where: { ...whereAdminApproved<Prisma.BrandWhereUniqueInput>(), id: brandId }, include: INCLUDE_BRAND_WITH_USER });
});

// Delete the given brand and its associated data
export function deleteBrand(brandId: string) {
  return prisma.brand.delete({ where: { ...whereAdminApproved<Prisma.BrandWhereUniqueInput>(), id: brandId } });
}

// To update an existing brand, we cannot delete it and recreate it with new data
// It would cascade and delete all related products that belong to this brand!
export function updateBrand(brandId: string, name: string, logoUrl: string) {
  return prisma.brand.update({ where: { ...whereAdminApproved<Prisma.BrandWhereUniqueInput>(), id: brandId }, data: { name, logoUrl } });
}

// Generate an entirely new brand with all the associated data
export function createBrand(createdBy: string, name: string, logoUrl: string) {
  return prisma.brand.create({ data: { name, logoUrl, createdBy } });
}

// Retrieve all brands from an external source (database) using offset pagination
export function allBrandsWithPagination(itemsPerPage: number, sortByField: string, sortByOrder: string, currentPage?: number, keyword?: string) {
  const indexOfLastItem = (currentPage ?? 1) * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;

  return Promise.all([
    prisma.brand.count({
      where: { ...whereAdminApproved<Prisma.BrandWhereInput>(), ...whereKeyword(keyword) },
    }),
    prisma.brand.findMany({
      where: { ...whereAdminApproved<Prisma.BrandWhereInput>(), ...whereKeyword(keyword) },
      include: INCLUDE_BRAND_WITH_USER,
      orderBy: { [sortByField]: sortByOrder },
      skip: indexOfFirstItem,
      take: itemsPerPage,
    }),
  ]);
}
