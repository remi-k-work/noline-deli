// components
import MainLayout, { MainLayoutMain, MainLayoutNavBar, MainLayoutSideBar } from "@/features/storefront/components/main-layout";
import { CategoriesTreeViewSkeleton } from "@/features/storefront/components/products/categories-tree-view";
import { CustomerViewSkeleton } from "@/features/storefront/components/customers/CustomerView";

// assets
import { Loader } from "lucide-react";

export default function Loading() {
  return (
    <MainLayout>
      <MainLayoutNavBar>
        <CategoriesTreeViewSkeleton />
      </MainLayoutNavBar>
      <MainLayoutSideBar>
        <CustomerViewSkeleton />
      </MainLayoutSideBar>
      <MainLayoutMain heading="Order Complete">
        <div className="grid h-full place-content-center">
          <Loader className="text-muted-foreground size-48 animate-spin" />
        </div>
      </MainLayoutMain>
    </MainLayout>
  );
}
