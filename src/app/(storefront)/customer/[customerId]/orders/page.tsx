// next
import type { Metadata } from "next";
import { notFound } from "next/navigation";

// prisma and db access
import { getCustomer, getCustomerData } from "@/features/storefront/db/customers";

// components
import MainLayout, { MainLayoutMain, MainLayoutNavBar, MainLayoutSideBar } from "@/features/storefront/components/main-layout";
import CustomerView from "@/features/storefront/components/customers/CustomerView";
import OrdersTableView from "@/features/storefront/components/customers/orders-table/View";
import CategoriesTreeView from "@/features/storefront/components/products/categories-tree-view";

// openauth
import { auth } from "@/auth-client/actions";

// types
interface PageProps {
  params: Promise<{ customerId: string }>;
}

export async function generateMetadata({ params: paramsPromise }: PageProps): Promise<Metadata> {
  // Get the customer id from the params (this is the test customer)
  const { customerId: customerIdFromParams } = await paramsPromise;

  // Check if the user/customer is authenticated (this is the real customer)
  const subject = await auth();
  const customerIdFromSession = subject ? subject.properties.customerId : undefined;

  // Get all the information you need about this particular customer (either a real or test customer)
  const customer = await getCustomer(customerIdFromParams, customerIdFromSession);

  // Ensure the customer exists
  if (!customer) notFound();
  const { name } = customer;

  return { title: `NoLine-Deli ► ${name} ► My Orders` };
}

export default async function Page({ params: paramsPromise }: PageProps) {
  // Get the customer id from the params (this is the test customer)
  const { customerId: customerIdFromParams } = await paramsPromise;

  // Check if the user/customer is authenticated (this is the real customer)
  const subject = await auth();
  const customerIdFromSession = subject ? subject.properties.customerId : undefined;

  // Get all the necessary data about this particular customer (either a real or test customer)
  const customer = await getCustomerData(customerIdFromParams, customerIdFromSession);

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
      <MainLayoutMain heading={`${name} ► My Orders`}>
        <OrdersTableView customerId={customerIdFromSession ?? customerIdFromParams} />
      </MainLayoutMain>
    </MainLayout>
  );
}
