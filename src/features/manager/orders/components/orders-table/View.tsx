// prisma and db access
import { allOrdersForTableView, getBrowseBarData } from "@/features/manager/orders/db";

// components
import { TanTableInstanceProvider } from "@/features/manager/orders/stores/tan-table-instance";
import BrowseBar from "@/features/manager/orders/components/browse-bar";
import NotFound from "@/components/NotFound";
import OrdersTable from ".";

export default async function View() {
  // Retrieve all orders for the local in-memory representation used by the tanstack table
  const [orders, browseBarData] = await Promise.all([allOrdersForTableView(), getBrowseBarData()]);

  if (orders.length === 0)
    return (
      <TanTableInstanceProvider orders={orders} browseBarData={browseBarData}>
        <BrowseBar />
        <br />
        <NotFound message={"Orders were not found!"} />
      </TanTableInstanceProvider>
    );

  return (
    <TanTableInstanceProvider orders={orders} browseBarData={browseBarData}>
      <BrowseBar />
      <OrdersTable />
    </TanTableInstanceProvider>
  );
}
