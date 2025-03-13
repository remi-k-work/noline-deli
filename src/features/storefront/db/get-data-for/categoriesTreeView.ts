// react
import { cache } from "react";

// prisma and db access
import { allCategories } from "@/features/storefront/db";

// other libraries
import PathFinder from "@/lib/PathFinder";
import type { CategoriesTreeViewData } from "@/features/storefront/db/types";

// Create a product category tree in the format that is needed by the categories tree view component
const categoriesTreeView = cache(async () => {
  const categories = await allCategories();

  const data: CategoriesTreeViewData = { categoriesTreeView: [] };
  for (const { id: categoryId, name: categoryName, subCategories } of categories) {
    data.categoriesTreeView.push({ label: categoryName, href: PathFinder.toSfProductsByCategory(categoryName, categoryId), subCategories: [] });
    for (const { id: subCategoryId, name: subCategoryName } of subCategories) {
      data.categoriesTreeView.at(-1)?.subCategories?.push({
        label: subCategoryName,
        href: PathFinder.toSfProductsByCategoryAndSubCategory(categoryName, categoryId, subCategoryName, subCategoryId),
        subCategories: [],
      });
    }
  }

  return { categoriesTreeView: [{ label: "All Products", href: PathFinder.toSfAllProducts(), subCategories: [...data.categoriesTreeView] }] };
});

export default categoriesTreeView;
