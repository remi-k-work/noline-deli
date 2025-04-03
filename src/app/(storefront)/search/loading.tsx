// components
import MainLayout, { MainLayoutMain, MainLayoutNavBar, MainLayoutSideBar } from "@/features/storefront/components/main-layout";
import { PaginateSkeleton } from "@/features/storefront/components/Paginate";
import { ProductsListSkeleton } from "@/features/storefront/components/products/products-list";
import { CategoriesTreeViewSkeleton } from "@/features/storefront/components/products/categories-tree-view";
import { ProductFilterSkeleton } from "@/features/storefront/components/search/product-filter";
import { FeaturedBrandsSkeleton } from "@/features/storefront/components/products/FeaturedBrands";

export default function Loading() {
  return (
    <MainLayout>
      <MainLayoutNavBar>
        <CategoriesTreeViewSkeleton />
      </MainLayoutNavBar>
      <MainLayoutSideBar>
        <ProductFilterSkeleton />
        <br />
        <FeaturedBrandsSkeleton />
      </MainLayoutSideBar>
      <MainLayoutMain heading="Search Results ► ...">
        <PaginateSkeleton />
        <br />
        <ProductsListSkeleton />
        <br />
        <PaginateSkeleton />
      </MainLayoutMain>
    </MainLayout>
  );
}
