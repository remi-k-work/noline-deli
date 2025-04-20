// component css styles
import styles from "./BrowseBar.module.css";

// next
import Link from "next/link";

// other libraries
import { cn } from "@/lib/utils";
import PathFinder from "@/lib/PathFinder";

// components
import { Badge } from "@/components/ui/custom/badge";
import { Button } from "@/components/ui/custom/button";
import { Tooltip, TooltipContent, TooltipTrigger } from "@/components/ui/tooltip";
import SearchPanel from "@/features/manager/components/SearchPanel";
import SortBy from "@/features/manager/components/SortBy";
import Paginate from "@/features/manager/components/Paginate";

// assets
import { PlusCircleIcon } from "@heroicons/react/24/solid";

// types
interface BrowseBarProps {
  itemsPerPage: number;
  totalItems: number;
}

export default async function BrowseBar({ itemsPerPage, totalItems }: BrowseBarProps) {
  return (
    <section className={cn("font-lusitana", styles["browse-bar"])}>
      <header className={styles["browse-bar__total-items"]}>
        <Badge className="w-fit text-base">{totalItems}</Badge>
      </header>
      <SearchPanel className={styles["browse-bar__search-panel"]} />
      <SortBy sortByFields={["id", "name"]} totalItems={totalItems} className={styles["browse-bar__sort-by"]} />
      <Paginate itemsPerPage={itemsPerPage} totalItems={totalItems} className={styles["browse-bar__paginate"]} />
      <footer className={styles["browse-bar__new-subcategory"]}>
        <Tooltip>
          <TooltipTrigger asChild>
            <Button type="button" size="icon" variant="outline" asChild>
              <Link href={PathFinder.toSubCategoryNew()} scroll={false}>
                <PlusCircleIcon width={24} height={24} />
              </Link>
            </Button>
          </TooltipTrigger>
          <TooltipContent>
            <p>Create a new subcategory</p>
          </TooltipContent>
        </Tooltip>
      </footer>
    </section>
  );
}
