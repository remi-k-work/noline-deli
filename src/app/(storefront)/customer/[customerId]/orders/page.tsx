// component css styles
import styles from "./page.module.css";

// next
import type { Metadata } from "next";
import { notFound } from "next/navigation";

// prisma and db access
import { getCustomer } from "@/features/storefront/db/customers";

// components
import MainLayout from "@/features/storefront/components/MainLayout";
import { default as OrdersTableView } from "@/features/storefront/components/customers/orders-table/View";

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

  // Get all the information you need about this particular customer
  const customer = await getCustomer(customerId);

  // Ensure the customer exists
  if (!customer) notFound();
  const { name } = customer;

  return (
    <MainLayout>
      <article className={styles["page"]}>
        <h1 className="font-lusitana mb-8 text-xl lg:text-3xl">{name} ► Orders</h1>
        <OrdersTableView customerId={customerId} />
      </article>
    </MainLayout>
  );
}
