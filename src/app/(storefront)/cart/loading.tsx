// components
import MainLayout, { MainLayoutMain, MainLayoutNavBar } from "@/features/storefront/components/main-layout";
import { CategoriesTreeViewSkeleton } from "@/features/storefront/components/products/categories-tree-view";

// assets
import { Loader } from "lucide-react";

export default function Loading() {
  return (
    <MainLayout>
      <MainLayoutNavBar>
        <CategoriesTreeViewSkeleton />
      </MainLayoutNavBar>
      <MainLayoutMain heading="Your Shopping Cart">
        <div className="grid h-full place-content-center">
          <Loader className="text-muted-foreground size-48 animate-spin" />
        </div>
      </MainLayoutMain>
    </MainLayout>
  );
}
