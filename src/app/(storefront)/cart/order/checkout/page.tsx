// react
import { Suspense } from "react";

// prisma and db access
import { getCart } from "@/features/cart/db/cart";
import { getCustomerData } from "@/features/storefront/db/customers";

// components
import MainLayout, { MainLayoutMain, MainLayoutNavBar, MainLayoutSideBar } from "@/features/storefront/components/main-layout";
import CustomerView from "@/features/storefront/components/customers/CustomerView";
import Checkout from "@/features/cart/components/checkout";
import CategoriesTreeView, { CategoriesTreeViewSkeleton } from "@/features/storefront/components/products/categories-tree-view";

// types
interface PageProps {
  searchParams: Promise<{ [key: string]: string | string[] | undefined; guest_test_customer_id: string | undefined }>;
}

export const metadata = {
  title: "NoLine-Deli ► Checkout Page",
};

export default async function Page({ searchParams: searchParamsPromise }: PageProps) {
  const { guest_test_customer_id } = await searchParamsPromise;

  // Get an existing or brand-new empty cart from our database
  const cart = await getCart();

  // Has the guest test customer already been picked?
  const hasPickedCustomerId = !!guest_test_customer_id;

  return (
    <MainLayout>
      <MainLayoutNavBar>
        <Suspense fallback={<CategoriesTreeViewSkeleton />}>
          <CategoriesTreeView />
        </Suspense>
      </MainLayoutNavBar>
      {hasPickedCustomerId && (
        <MainLayoutSideBar>
          <Suspense>
            <CustomerView customer={await getCustomerData(guest_test_customer_id)} />
          </Suspense>
        </MainLayoutSideBar>
      )}
      <MainLayoutMain>
        <h1 className="font-lusitana mb-8 text-xl lg:text-3xl">Checkout Page</h1>
        <Checkout cart={cart} hasPickedCustomerId={hasPickedCustomerId} />
      </MainLayoutMain>
    </MainLayout>
  );
}
