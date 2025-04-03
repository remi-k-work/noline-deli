// components
import MainLayout, { MainLayoutMain, MainLayoutNavBar } from "@/features/storefront/components/main-layout";
import { ProductViewSkeleton } from "@/features/storefront/components/products/product-view";
import { CategoriesTreeViewSkeleton } from "@/features/storefront/components/products/categories-tree-view";

export default function Loading() {
  return (
    <MainLayout>
      <MainLayoutNavBar>
        <CategoriesTreeViewSkeleton />
      </MainLayoutNavBar>
      <MainLayoutMain heading="Product Details ► ...">
        <ProductViewSkeleton />
      </MainLayoutMain>
    </MainLayout>
  );
}
