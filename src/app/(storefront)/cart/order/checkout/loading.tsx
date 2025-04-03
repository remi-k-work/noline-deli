// components
import MainLayout, { MainLayoutMain, MainLayoutNavBar, MainLayoutSideBar } from "@/features/storefront/components/main-layout";
import { TestCustomersListSkeleton } from "@/features/storefront/components/customers/TestCustomersList";
import { CategoriesTreeViewSkeleton } from "@/features/storefront/components/products/categories-tree-view";
import { CustomerViewSkeleton } from "@/features/storefront/components/customers/CustomerView";

export default function Loading() {
  return (
    <MainLayout>
      <MainLayoutNavBar>
        <CategoriesTreeViewSkeleton />
      </MainLayoutNavBar>
      <MainLayoutSideBar>
        <CustomerViewSkeleton />
      </MainLayoutSideBar>
      <MainLayoutMain heading="Checkout Page">
        <TestCustomersListSkeleton goingTo="checkout" />
      </MainLayoutMain>
    </MainLayout>
  );
}
