// components
import MainLayout, { MainLayoutMain, MainLayoutNavBar } from "@/features/storefront/components/main-layout";
import { TestCustomersListSkeleton } from "@/features/storefront/components/customers/TestCustomersList";
import { CategoriesTreeViewSkeleton } from "@/features/storefront/components/products/categories-tree-view";

export default function Loading() {
  return (
    <MainLayout>
      <MainLayoutNavBar>
        <CategoriesTreeViewSkeleton />
      </MainLayoutNavBar>
      <MainLayoutMain heading="Checkout Page">
        <TestCustomersListSkeleton goingTo="checkout" />
      </MainLayoutMain>
    </MainLayout>
  );
}
