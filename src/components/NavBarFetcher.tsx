// prisma and db access
import categoriesTreeView from "@/features/storefront/db/get-data-for/categoriesTreeView";

// components
import NavBar from "@/components/NavBar";

// types
interface NavBarFetcherProps {
  className: string;
}

export default async function NavBarFetcher({ className }: NavBarFetcherProps) {
  return <NavBar categoriesTreeViewData={await categoriesTreeView()} className={className} />;
}
