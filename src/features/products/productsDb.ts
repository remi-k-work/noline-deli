// react
import { cache } from "react";

// prisma and db access
import { Prisma } from "@prisma/client";
import prisma from "@/lib/db/prisma";
import { whereAdminApproved, whereUserCreated } from "../manager/managerDb";

// Get all the information you need about this particular product
export const getProduct = cache((productId: string, createdBy?: string) => {
  // A user can create many brands, categories, subcategories, products, and product images
  // Therefore, live content should only come from trusted admins
  const product = prisma.product.findUnique({
    where: { ...whereAdminApproved<Prisma.ProductWhereUniqueInput>(), ...whereUserCreated<Prisma.ProductWhereUniqueInput>(createdBy), id: productId },
    include: { categories: { include: { category: true } }, subCategories: { include: { subCategory: true } }, moreImages: true, brand: true },
  });

  // The concept is that the user's content will eventually be integrated with live and published content and made only available to the user on their computer

  // We could conduct even more stringent checks to ensure that no products from unapproved categories, brands, and so on are returned
  // Currently, if the product is admin-approved, it will "slide in" despite being from a disapproved category or brand
  return product;
});

// Get all the information you need about this particular brand
export const getBrand = cache((brandId: string, createdBy?: string) => {
  return prisma.brand.findUnique({
    where: { ...whereAdminApproved<Prisma.BrandWhereUniqueInput>(), ...whereUserCreated<Prisma.BrandWhereUniqueInput>(createdBy), id: brandId },
  });
});

// Retrieve all of the categories from an external source (database)
export const allCategories = cache((createdBy?: string) => {
  return prisma.category.findMany({
    where: { ...whereAdminApproved<Prisma.CategoryWhereInput>(), ...whereUserCreated<Prisma.CategoryWhereInput>(createdBy) },
    include: {
      subCategories: {
        where: { ...whereAdminApproved<Prisma.SubCategoryWhereInput>(), ...whereUserCreated<Prisma.SubCategoryWhereInput>(createdBy) },
        orderBy: { name: "asc" },
      },
    },
    orderBy: { name: "asc" },
  });
});

function whereFilter(byBrandId: string, byPriceBelow: number, byFreeShipping: boolean): Prisma.ProductWhereInput {
  return {
    brandId: byBrandId ? { equals: byBrandId } : undefined,
    price: byPriceBelow ? { lte: byPriceBelow } : undefined,
    freeShipping: byFreeShipping ? { equals: true } : undefined,
  };
}

// Retrieve all products by brand
export function allProductsByBrand(
  brandId: string,
  currentPage: number,
  itemsPerPage: number,
  sortByField: string,
  sortByOrder: string,
  byPriceBelow: number,
  byFreeShipping: boolean,
  createdBy?: string,
) {
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;

  return Promise.all([
    prisma.product.count({
      where: {
        ...whereAdminApproved<Prisma.ProductWhereInput>(),
        ...whereUserCreated<Prisma.ProductWhereInput>(createdBy),
        ...whereFilter(brandId, byPriceBelow, byFreeShipping),
      },
    }),
    prisma.product.findMany({
      where: {
        ...whereAdminApproved<Prisma.ProductWhereInput>(),
        ...whereUserCreated<Prisma.ProductWhereInput>(createdBy),
        ...whereFilter(brandId, byPriceBelow, byFreeShipping),
      },
      orderBy: { [sortByField]: sortByOrder },
      skip: indexOfFirstItem,
      take: itemsPerPage,
    }),
  ]);
}

// Retrieve all products by category
export function allProductsByCategory(
  categoryId: string,
  currentPage: number,
  itemsPerPage: number,
  sortByField: string,
  sortByOrder: string,
  byBrandId: string,
  byPriceBelow: number,
  byFreeShipping: boolean,
  createdBy?: string,
) {
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;

  return Promise.all([
    prisma.product.count({
      where: {
        ...whereAdminApproved<Prisma.ProductWhereInput>(),
        ...whereUserCreated<Prisma.ProductWhereInput>(createdBy),
        categories: {
          some: {
            category: { is: { ...whereAdminApproved<Prisma.CategoryWhereInput>(), ...whereUserCreated<Prisma.CategoryWhereInput>(createdBy), id: categoryId } },
          },
        },
        ...whereFilter(byBrandId, byPriceBelow, byFreeShipping),
      },
    }),
    prisma.product.findMany({
      where: {
        ...whereAdminApproved<Prisma.ProductWhereInput>(),
        ...whereUserCreated<Prisma.ProductWhereInput>(createdBy),
        categories: {
          some: {
            category: { is: { ...whereAdminApproved<Prisma.CategoryWhereInput>(), ...whereUserCreated<Prisma.CategoryWhereInput>(createdBy), id: categoryId } },
          },
        },
        ...whereFilter(byBrandId, byPriceBelow, byFreeShipping),
      },
      orderBy: { [sortByField]: sortByOrder },
      skip: indexOfFirstItem,
      take: itemsPerPage,
    }),
  ]);
}

// Retrieve all products by category and subcategory
export function allProductsByCategoryAndSubCategory(
  categoryId: string,
  subCategoryId: string,
  currentPage: number,
  itemsPerPage: number,
  sortByField: string,
  sortByOrder: string,
  byBrandId: string,
  byPriceBelow: number,
  byFreeShipping: boolean,
  createdBy?: string,
) {
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;

  return Promise.all([
    prisma.product.count({
      where: {
        ...whereAdminApproved<Prisma.ProductWhereInput>(),
        ...whereUserCreated<Prisma.ProductWhereInput>(createdBy),
        categories: {
          some: {
            category: { is: { ...whereAdminApproved<Prisma.CategoryWhereInput>(), ...whereUserCreated<Prisma.CategoryWhereInput>(createdBy), id: categoryId } },
          },
        },
        subCategories: {
          some: {
            subCategory: {
              is: { ...whereAdminApproved<Prisma.SubCategoryWhereInput>(), ...whereUserCreated<Prisma.SubCategoryWhereInput>(createdBy), id: subCategoryId },
            },
          },
        },
        ...whereFilter(byBrandId, byPriceBelow, byFreeShipping),
      },
    }),
    prisma.product.findMany({
      where: {
        ...whereAdminApproved<Prisma.ProductWhereInput>(),
        ...whereUserCreated<Prisma.ProductWhereInput>(createdBy),
        categories: {
          some: {
            category: { is: { ...whereAdminApproved<Prisma.CategoryWhereInput>(), ...whereUserCreated<Prisma.CategoryWhereInput>(createdBy), id: categoryId } },
          },
        },
        subCategories: {
          some: {
            subCategory: {
              is: { ...whereAdminApproved<Prisma.SubCategoryWhereInput>(), ...whereUserCreated<Prisma.SubCategoryWhereInput>(createdBy), id: subCategoryId },
            },
          },
        },
        ...whereFilter(byBrandId, byPriceBelow, byFreeShipping),
      },
      orderBy: { [sortByField]: sortByOrder },
      skip: indexOfFirstItem,
      take: itemsPerPage,
    }),
  ]);
}

// Retrieve all products from an external source (database) using offset pagination
export function allProductsWithPagination(
  currentPage: number,
  itemsPerPage: number,
  sortByField: string,
  sortByOrder: string,
  byBrandId: string,
  byPriceBelow: number,
  byFreeShipping: boolean,
  createdBy?: string,
) {
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;

  return Promise.all([
    prisma.product.count({
      where: {
        ...whereAdminApproved<Prisma.ProductWhereInput>(),
        ...whereUserCreated<Prisma.ProductWhereInput>(createdBy),
        ...whereFilter(byBrandId, byPriceBelow, byFreeShipping),
      },
    }),
    prisma.product.findMany({
      where: {
        ...whereAdminApproved<Prisma.ProductWhereInput>(),
        ...whereUserCreated<Prisma.ProductWhereInput>(createdBy),
        ...whereFilter(byBrandId, byPriceBelow, byFreeShipping),
      },
      orderBy: { [sortByField]: sortByOrder },
      skip: indexOfFirstItem,
      take: itemsPerPage,
    }),
  ]);
}
