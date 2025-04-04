// next
import type { Metadata } from "next";
import { notFound } from "next/navigation";
import Link from "next/link";

// prisma and db access
import { getCustomer, getCustomerData } from "@/features/storefront/db/customers";

// other libraries
import PathFinder from "@/lib/PathFinder";
import stripe from "@/services/stripe";

// components
import { Button } from "@/components/ui/custom/button";
import MainLayout, { MainLayoutMain, MainLayoutNavBar, MainLayoutSideBar } from "@/features/storefront/components/main-layout";
import CustomerView from "@/features/storefront/components/customers/CustomerView";
import OrderComplete from "@/features/cart/components/order-complete";
import CategoriesTreeView from "@/features/storefront/components/products/categories-tree-view";

// assets
import { UserIcon } from "@heroicons/react/24/solid";

// types
interface PageProps {
  params: Promise<{ customerId: string }>;
  searchParams: Promise<{ [key: string]: string | string[] | undefined; session_id: string | undefined }>;
}

export async function generateMetadata({ params: paramsPromise }: PageProps): Promise<Metadata> {
  const { customerId } = await paramsPromise;

  // Get all the information you need about this particular customer
  const customer = await getCustomer(customerId);

  // Ensure the customer exists
  if (!customer) notFound();
  const { name } = customer;

  return { title: `NoLine-Deli ► Order Complete ► ${name}` };
}

export default async function Page({ params: paramsPromise, searchParams: searchParamsPromise }: PageProps) {
  const { customerId } = await paramsPromise;
  const { session_id } = await searchParamsPromise;
  if (!session_id) notFound();

  // As soon as the return/order complete page loads, retrieve the checkout session
  const checkoutSession = await stripe.checkout.sessions.retrieve(session_id, {
    expand: ["payment_intent.payment_method", "payment_intent.latest_charge", "shipping_cost.shipping_rate"],
  });

  // Get all the necessary data about this particular customer
  const customer = await getCustomerData(customerId);

  // Ensure the customer exists
  if (!customer) notFound();
  const { name } = customer;

  return (
    <MainLayout>
      <MainLayoutNavBar>
        <CategoriesTreeView />
      </MainLayoutNavBar>
      <MainLayoutSideBar>
        <CustomerView customer={customer} />
      </MainLayoutSideBar>
      <MainLayoutMain heading={`Order Complete ► ${name}`}>
        <OrderComplete checkoutSession={checkoutSession} />
        <br />
        <Button size="lg" className="float-end" asChild>
          <Link href={PathFinder.toSfCustomerAccount(customerId)}>
            <UserIcon width={24} height={24} />
            Go to My Account
          </Link>
        </Button>
      </MainLayoutMain>
    </MainLayout>
  );
}
