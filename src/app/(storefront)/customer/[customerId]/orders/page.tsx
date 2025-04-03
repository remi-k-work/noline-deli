// next
import type { Metadata } from "next";
import { notFound } from "next/navigation";

// prisma and db access
import { getCustomer, getCustomerData } from "@/features/storefront/db/customers";

// components
import MainLayout, { MainLayoutMain, MainLayoutNavBar, MainLayoutSideBar } from "@/features/storefront/components/main-layout";
import CustomerView from "@/features/storefront/components/customers/CustomerView";
import { default as OrdersTableView } from "@/features/storefront/components/customers/orders-table/View";
import CategoriesTreeView from "@/features/storefront/components/products/categories-tree-view";

// types
interface PageProps {
  params: Promise<{ customerId: string }>;
}

export async function generateMetadata({ params: paramsPromise }: PageProps): Promise<Metadata> {
  const { customerId } = await paramsPromise;

  // Get all the information you need about this particular customer
  const customer = await getCustomer(customerId);

  // Ensure the customer exists
  if (!customer) notFound();
  const { name } = customer;

  return { title: `NoLine-Deli ► ${name} ► My Orders` };
}

export default async function Page({ params: paramsPromise }: PageProps) {
  const { customerId } = await paramsPromise;

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
      <MainLayoutMain heading={`${name} ► My Orders`}>
        <OrdersTableView customerId={customerId} />
      </MainLayoutMain>
    </MainLayout>
  );
}
