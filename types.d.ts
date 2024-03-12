// prisma and db access
import { Brand, Prisma, Product } from "@prisma/client";

interface ProductExcerptProps {
  product: Prisma.ProductGetPayload<{
    include: { categories: { include: { category: true } }; subCategories: { include: { subCategory: true } }; moreImages: true; brand: true };
  }>;
}

interface ProductInfoProps {
  product: Prisma.ProductGetPayload<{
    include: { categories: { include: { category: true } }; subCategories: { include: { subCategory: true } }; moreImages: true; brand: true };
  }>;
}

interface BrandPreviewProps {
  brand: Brand | null;
}

interface BrandTagProps {
  brand: Brand | null;
  isCompact?: boolean;
}

interface CategoriesListProps {
  categoriesList: CategoriesTreeViewCategory[];
}

interface CategoriesItemProps {
  categoriesItem: CategoriesTreeViewCategory;
}

type CategoriesTreeViewInputData = Prisma.CategoryGetPayload<{ include: { subCategories: true } }>;

interface CategoriesTreeViewCategory {
  label: string;
  href: string;
  subCategories?: CategoriesTreeViewData[];
}
