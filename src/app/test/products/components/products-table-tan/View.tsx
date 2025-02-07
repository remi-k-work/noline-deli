// prisma and db access
import { allProductsForTableView } from "@/features/manager/products/db";
import { allCategories } from "@/features/manager/categories/db";
import { getCreatedByUser } from "@/features/manager/login/db";

// components
import { TanTableInstanceProvider } from "../../stores/TanTableInstance";
import BrowseBar from "../browse-bar-tan";
import NotFound from "@/components/NotFound";
import ProductsTable from ".";

export default async function View() {
  // Retrieve all products for the local in-memory representation used by the tanstack table
  const [products, categories] = await Promise.all([allProductsForTableView(), allCategories()]);

  if (products.length === 0)
    return (
      <TanTableInstanceProvider products={products} categories={categories} createdByUser={getCreatedByUser()}>
        <BrowseBar />
        <br />
        <NotFound message={"Products were not found!"} />
      </TanTableInstanceProvider>
    );

  return (
    <TanTableInstanceProvider products={products} categories={categories} createdByUser={getCreatedByUser()}>
      <BrowseBar />
      <ProductsTable />
    </TanTableInstanceProvider>
  );
}
