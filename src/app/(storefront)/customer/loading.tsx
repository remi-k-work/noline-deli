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
      <MainLayoutMain>
        <h1 className="font-lusitana mb-8 text-xl lg:text-3xl">My Account</h1>
        <TestCustomersListSkeleton goingTo="my-account" />
      </MainLayoutMain>
    </MainLayout>
  );
}
