// prisma and db access
import { allOrdersForTableView } from "@/features/manager/orders/db";

// components
import { TanTableInstanceProvider } from "../../stores/TanTableInstance";
import BrowseBar from "../browse-bar";
import NotFound from "@/components/NotFound";
import OrdersTable from ".";

export default async function View() {
  // Retrieve all orders for the local in-memory representation used by the tanstack table
  const orders = await allOrdersForTableView();

  if (orders.length === 0)
    return (
      <TanTableInstanceProvider orders={orders}>
        <BrowseBar />
        <br />
        <NotFound message={"Orders were not found!"} />
      </TanTableInstanceProvider>
    );

  return (
    <TanTableInstanceProvider orders={orders}>
      <BrowseBar />
      <OrdersTable />
    </TanTableInstanceProvider>
  );
}
