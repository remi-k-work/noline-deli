// prisma and db access
import { allOrdersForTableView, getBrowseBarData } from "@/features/storefront/db/customers";

// components
import { InstanceProvider } from "@/features/storefront/stores/customers/orders-table";
import BrowseBar from "@/features/storefront/components/customers/browse-bar";
import OrdersTable from ".";

// types
interface ViewProps {
  customerId: string;
}

export default async function View({ customerId }: ViewProps) {
  // Retrieve all orders that belong to this customer for the local in-memory representation used by the tanstack table
  const [orders, browseBarData] = await Promise.all([allOrdersForTableView(customerId), getBrowseBarData(customerId)]);

  return (
    <InstanceProvider orders={orders} browseBarData={browseBarData}>
      <BrowseBar />
      <OrdersTable />
    </InstanceProvider>
  );
}
