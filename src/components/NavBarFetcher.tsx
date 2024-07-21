// prisma and db access
import { getCategoriesTreeViewData } from "@/features/search/searchDb";

// components
import NavBar from "@/components/NavBar";

// types
interface NavBarFetcherProps {
  className: string;
}

export default async function NavBarFetcher({ className }: NavBarFetcherProps) {
  return <NavBar categoriesTreeViewData={await getCategoriesTreeViewData()} className={className} />;
}
