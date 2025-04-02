// react
import { Suspense } from "react";

// components
import MainLayout, { MainLayoutMain, MainLayoutNavBar, MainLayoutSideBar } from "@/features/storefront/components/main-layout";
import CategoriesTreeView, { CategoriesTreeViewSkeleton } from "@/features/storefront/components/products/categories-tree-view";
import TestCustomersList from "@/features/storefront/components/customers/TestCustomersList";

export const metadata = {
  title: "NoLine-Deli ► My Account",
};

export default async function Page() {
  return (
    <MainLayout>
      <MainLayoutNavBar>
        <Suspense fallback={<CategoriesTreeViewSkeleton />}>
          <CategoriesTreeView />
        </Suspense>
      </MainLayoutNavBar>
      <MainLayoutMain>
        <h1 className="font-lusitana mb-8 text-xl lg:text-3xl">My Account</h1>
        <TestCustomersList goingTo="my-account" />
      </MainLayoutMain>
    </MainLayout>
  );
}
