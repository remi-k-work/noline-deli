// components
import MainLayout, { MainLayoutMain, MainLayoutNavBar, MainLayoutSideBar } from "@/features/storefront/components/main-layout";
import { ProductViewSkeleton } from "@/features/storefront/components/products/product-view";
import { CategoriesTreeViewSkeleton } from "@/features/storefront/components/products/categories-tree-view";
import { FeaturedProductsSkeleton } from "@/features/storefront/components/products/FeaturedProducts";
import { FeaturedBrandsSkeleton } from "@/features/storefront/components/products/FeaturedBrands";

export default function Loading() {
  return (
    <MainLayout>
      <MainLayoutNavBar>
        <CategoriesTreeViewSkeleton />
      </MainLayoutNavBar>
      <MainLayoutSideBar>
        <FeaturedProductsSkeleton />
        <br />
        <FeaturedBrandsSkeleton />
      </MainLayoutSideBar>
      <MainLayoutMain heading="Product Details ► ...">
        <ProductViewSkeleton />
      </MainLayoutMain>
    </MainLayout>
  );
}
