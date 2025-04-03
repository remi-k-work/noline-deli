// components
import MainLayout, { MainLayoutMain, MainLayoutNavBar, MainLayoutSideBar } from "@/features/storefront/components/main-layout";
import { default as CartTableView } from "@/features/cart/components/cart-table/View";
import CategoriesTreeView from "@/features/storefront/components/products/categories-tree-view";
import FeaturedProducts from "@/features/storefront/components/products/FeaturedProducts";
import FeaturedBrands from "@/features/storefront/components/products/FeaturedBrands";

export const metadata = {
  title: "NoLine-Deli ► Your Shopping Cart",
};

export default async function Page() {
  return (
    <MainLayout>
      <MainLayoutNavBar>
        <CategoriesTreeView />
      </MainLayoutNavBar>
      <MainLayoutSideBar>
        <FeaturedProducts />
        <br />
        <FeaturedBrands />
      </MainLayoutSideBar>
      <MainLayoutMain heading="Your Shopping Cart">
        <CartTableView />
      </MainLayoutMain>
    </MainLayout>
  );
}
