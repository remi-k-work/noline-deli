// prisma and db access
import { Prisma, Product } from "@prisma/client";

// interface ProductExcerptProps {
//   product: Prisma.ProductGetPayload<{ include: { moreImages: true } }>;
// }
interface ProductExcerptProps {
  product: Product;
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
