// react
import { Suspense } from "react";

// next
import { notFound } from "next/navigation";
import Link from "next/link";

// prisma and db access
import { getCustomerData } from "@/features/storefront/db/customers";

// other libraries
import PathFinder from "@/lib/PathFinder";
import stripe from "@/services/stripe";

// components
import { Button } from "@/components/ui/custom/button";
import MainLayout, { MainLayoutMain, MainLayoutNavBar, MainLayoutSideBar } from "@/features/storefront/components/main-layout";
import CustomerView from "@/features/storefront/components/customers/CustomerView";
import OrderComplete from "@/features/cart/components/order-complete";
import CategoriesTreeView, { CategoriesTreeViewSkeleton } from "@/features/storefront/components/products/categories-tree-view";

// assets
import { UserIcon } from "@heroicons/react/24/solid";

// types
interface PageProps {
  searchParams: Promise<{ [key: string]: string | string[] | undefined; session_id: string | undefined; guest_test_customer_id: string | undefined }>;
}

export const metadata = {
  title: "NoLine-Deli ► Order Complete",
};

export default async function Page({ searchParams: searchParamsPromise }: PageProps) {
  const { session_id, guest_test_customer_id } = await searchParamsPromise;
  if (!session_id) notFound();

  // As soon as the return/order complete page loads, retrieve the checkout session
  const checkoutSession = await stripe.checkout.sessions.retrieve(session_id, {
    expand: ["payment_intent.payment_method", "payment_intent.latest_charge", "shipping_cost.shipping_rate"],
  });

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
        <h1 className="font-lusitana mb-8 text-xl lg:text-3xl">Order Complete</h1>
        <OrderComplete checkoutSession={checkoutSession} />
        {hasPickedCustomerId && (
          <>
            <br />
            <Button size="lg" className="float-end" asChild>
              <Link href={PathFinder.toSfCustomerAccount(guest_test_customer_id)}>
                <UserIcon width={24} height={24} />
                Go to My Account
              </Link>
            </Button>
            <br />
            <br />
          </>
        )}
      </MainLayoutMain>
    </MainLayout>
  );
}
