// prisma and db access
import { allProductsForTableView, getBrowseBarData } from "@/features/manager/products/db";
import { getCreatedByUser } from "@/features/manager/login/db";

// components
import { TanTableInstanceProvider } from "../../stores/tan-table-instance";
import BrowseBar from "../browse-bar";
import NotFound from "@/components/NotFound";
import ProductsTable from ".";

export default async function View() {
  // Retrieve all products for the local in-memory representation used by the tanstack table
  const [products, browseBarData] = await Promise.all([allProductsForTableView(), getBrowseBarData()]);

  if (products.length === 0)
    return (
      <TanTableInstanceProvider products={products} browseBarData={browseBarData} createdByUser={getCreatedByUser()}>
        <BrowseBar />
        <br />
        <NotFound message={"Products were not found!"} />
      </TanTableInstanceProvider>
    );

  return (
    <TanTableInstanceProvider products={products} browseBarData={browseBarData} createdByUser={getCreatedByUser()}>
      <BrowseBar />
      <ProductsTable />
    </TanTableInstanceProvider>
  );
}
