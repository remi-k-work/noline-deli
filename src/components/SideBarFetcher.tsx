// prisma and db access
import { getProductFilterData } from "@/features/search/searchDb";

// components
import SideBar from "@/components/SideBar";

// types
interface SideBarFetcherProps {
  filteredCount?: number;
  className: string;
}

export default async function SideBarFetcher({ filteredCount, className }: SideBarFetcherProps) {
  return <SideBar productFilterData={await getProductFilterData()} filteredCount={filteredCount} className={className} />;
}
