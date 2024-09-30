// prisma and db access
import productFilter from "@/features/products/db/get-data-for/productFilter";

// components
import SideBar from "@/components/SideBar";

// types
interface SideBarFetcherProps {
  filteredCount?: number;
  className: string;
}

export default async function SideBarFetcher({ filteredCount, className }: SideBarFetcherProps) {
  return <SideBar productFilterData={await productFilter()} filteredCount={filteredCount} className={className} />;
}
