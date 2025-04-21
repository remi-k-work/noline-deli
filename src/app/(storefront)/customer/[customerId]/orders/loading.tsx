// components
import MainLayout, { MainLayoutMain, MainLayoutNavBar, MainLayoutSideBar } from "@/features/storefront/components/main-layout";
import { CategoriesTreeViewSkeleton } from "@/features/storefront/components/products/categories-tree-view";
import { CustomerViewSkeleton } from "@/features/storefront/components/customers/CustomerView";
import { OrdersTableViewSkeleton } from "@/features/storefront/components/customers/orders-table/View";

export default function Loading() {
  return (
    <MainLayout>
      <MainLayoutNavBar>
        <CategoriesTreeViewSkeleton />
      </MainLayoutNavBar>
      <MainLayoutSideBar>
        <CustomerViewSkeleton />
      </MainLayoutSideBar>
      <MainLayoutMain heading="... ► My Orders">
        <OrdersTableViewSkeleton />
      </MainLayoutMain>
    </MainLayout>
  );
}
