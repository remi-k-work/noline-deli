// components
import MainLayout, { MainLayoutMain, MainLayoutNavBar } from "@/features/storefront/components/main-layout";
import { default as CartTableView } from "@/features/cart/components/cart-table/View";
import CategoriesTreeView from "@/features/storefront/components/products/categories-tree-view";

export const metadata = {
  title: "NoLine-Deli ► Your Shopping Cart",
};

export default async function Page() {
  return (
    <MainLayout>
      <MainLayoutNavBar>
        <CategoriesTreeView />
      </MainLayoutNavBar>
      <MainLayoutMain heading="Your Shopping Cart">
        <CartTableView />
      </MainLayoutMain>
    </MainLayout>
  );
}
