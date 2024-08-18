// component css styles
import styles from "./index.module.css";

// next
import Link from "next/link";

// prisma and db access
import { allCategories } from "../../../categories/db";

// other libraries
import { cn } from "@/lib/utils";
import PathFinder from "../../../PathFinder";

// components
import { Tooltip, TooltipContent, TooltipTrigger } from "@/components/ui/tooltip";
import ByCategory from "./ByCategory";
import SearchPanel from "../../../components/SearchPanel";
import SortBy from "../../../components/SortBy";
import Paginate from "../../../components/Paginate";

// assets
import { lusitana } from "@/assets/fonts";
import { PlusCircleIcon } from "@heroicons/react/24/solid";

// types
interface BrowseBarProps {
  itemsPerPage: number;
  totalItems: number;
}

export default async function BrowseBar({ itemsPerPage, totalItems }: BrowseBarProps) {
  // Retrieve all of the categories from an external source (database)
  const categories = await allCategories();

  return (
    <section className={cn(lusitana.className, styles["browse-bar"], "bg-base-100")}>
      <ByCategory categories={categories} totalItems={totalItems} className={styles["browse-bar__browse-by-category"]} />
      <SearchPanel className={styles["browse-bar__search-panel"]} />
      <SortBy sortByFields={["id", "price", "name"]} totalItems={totalItems} className={styles["browse-bar__sort-by"]} />
      <Paginate itemsPerPage={itemsPerPage} totalItems={totalItems} className={styles["browse-bar__paginate"]} />
      <footer className={styles["browse-bar__new-product"]}>
        <Tooltip>
          <TooltipTrigger asChild>
            <Link href={PathFinder.toProductNew()} className="btn btn-circle">
              <PlusCircleIcon width={24} height={24} />
            </Link>
          </TooltipTrigger>
          <TooltipContent>
            <p>Create a new product</p>
          </TooltipContent>
        </Tooltip>
      </footer>
    </section>
  );
}
