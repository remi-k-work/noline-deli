// components
import MainLayout, { MainLayoutMain, MainLayoutNavBar, MainLayoutSideBar } from "@/features/storefront/components/main-layout";
import { CategoriesTreeViewSkeleton } from "@/features/storefront/components/products/categories-tree-view";
import { FeaturedProductsSkeleton } from "@/features/storefront/components/products/FeaturedProducts";
import { FeaturedBrandsSkeleton } from "@/features/storefront/components/products/FeaturedBrands";
import { CartTableSkeleton } from "@/features/cart/components/cart-table";

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
      <MainLayoutMain heading="Your Shopping Cart">
        <CartTableSkeleton />
      </MainLayoutMain>
    </MainLayout>
  );
}
