// components
import MainLayout, { MainLayoutMain, MainLayoutNavBar } from "@/features/storefront/components/main-layout";
import CategoriesTreeView from "@/features/storefront/components/products/categories-tree-view";
import TestCustomersList from "@/features/storefront/components/customers/TestCustomersList";

export const metadata = {
  title: "NoLine-Deli ► Checkout Page",
};

export default async function Page() {
  return (
    <MainLayout>
      <MainLayoutNavBar>
        <CategoriesTreeView />
      </MainLayoutNavBar>
      <MainLayoutMain heading="Checkout Page">
        <TestCustomersList goingTo="checkout" />
      </MainLayoutMain>
    </MainLayout>
  );
}
