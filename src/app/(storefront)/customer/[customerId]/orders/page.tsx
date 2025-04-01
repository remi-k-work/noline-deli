// component css styles
import styles from "./page.module.css";

// react
import { Suspense } from "react";

// next
import type { Metadata } from "next";
import { notFound } from "next/navigation";

// prisma and db access
import { getCustomer, getCustomerData } from "@/features/storefront/db/customers";

// components
import MainLayout, { MainLayoutMain, MainLayoutNavBar } from "@/features/storefront/components/main-layout";
import CustomerView from "@/features/storefront/components/customers/CustomerView";
import { default as OrdersTableView } from "@/features/storefront/components/customers/orders-table/View";
import CategoriesTreeView, { CategoriesTreeViewSkeleton } from "@/features/storefront/components/products/categories-tree-view";

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

  return { title: `NoLine-Deli ► ${name} ► Orders` };
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
        <Suspense fallback={<CategoriesTreeViewSkeleton />}>
          <CategoriesTreeView />
        </Suspense>
      </MainLayoutNavBar>
      <MainLayoutMain>
        <article className={styles["page"]}>
          <h1 className="font-lusitana mb-8 text-xl lg:text-3xl">{name} ► Orders</h1>
          <CustomerView customer={customer} />
          <OrdersTableView customerId={customerId} />
        </article>
      </MainLayoutMain>
    </MainLayout>
  );
}
