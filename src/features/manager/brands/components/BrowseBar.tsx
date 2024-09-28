// component css styles
import styles from "./BrowseBar.module.css";

// next
import Link from "next/link";

// other libraries
import { cn } from "@/lib/utils";
import PathFinder from "../../../../lib/PathFinder";

// components
import { Tooltip, TooltipContent, TooltipTrigger } from "@/components/ui/tooltip";
import SearchPanel from "../../components/SearchPanel";
import SortBy from "../../components/SortBy";
import Paginate from "../../components/Paginate";

// assets
import { lusitana } from "@/assets/fonts";
import { PlusCircleIcon } from "@heroicons/react/24/solid";

// types
interface BrowseBarProps {
  itemsPerPage: number;
  totalItems: number;
}

export default async function BrowseBar({ itemsPerPage, totalItems }: BrowseBarProps) {
  return (
    <section className={cn(lusitana.className, styles["browse-bar"], "bg-base-100")}>
      <header className={styles["browse-bar__total-items"]}>
        <span className="badge badge-info">{totalItems}</span>
      </header>
      <SearchPanel className={styles["browse-bar__search-panel"]} />
      <SortBy sortByFields={["id", "name"]} totalItems={totalItems} className={styles["browse-bar__sort-by"]} />
      <Paginate itemsPerPage={itemsPerPage} totalItems={totalItems} className={styles["browse-bar__paginate"]} />
      <footer className={styles["browse-bar__new-brand"]}>
        <Tooltip>
          <TooltipTrigger asChild>
            <Link href={PathFinder.toBrandNew()} className="btn btn-circle">
              <PlusCircleIcon width={24} height={24} />
            </Link>
          </TooltipTrigger>
          <TooltipContent>
            <p>Create a new brand</p>
          </TooltipContent>
        </Tooltip>
      </footer>
    </section>
  );
}
