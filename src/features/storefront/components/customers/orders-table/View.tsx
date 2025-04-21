// prisma and db access
import { allOrdersForTableView, getBrowseBarData } from "@/features/storefront/db/customers";

// components
import { InstanceProvider } from "@/features/storefront/stores/customers/orders-table";
import BrowseBar, { BrowseBarSkeleton } from "@/features/storefront/components/customers/browse-bar";
import OrdersTable, { OrdersTableSkeleton } from ".";

// types
interface OrdersTableViewProps {
  customerId: string;
}

export default async function OrdersTableView({ customerId }: OrdersTableViewProps) {
  // Retrieve all orders that belong to this customer for the local in-memory representation used by the tanstack table
  const [orders, browseBarData] = await Promise.all([allOrdersForTableView(customerId), getBrowseBarData(customerId)]);

  return (
    <InstanceProvider orders={orders} browseBarData={browseBarData}>
      <BrowseBar />
      <OrdersTable />
    </InstanceProvider>
  );
}

export function OrdersTableViewSkeleton() {
  return (
    <>
      <BrowseBarSkeleton />
      <OrdersTableSkeleton />
    </>
  );
}
