"use client";

// component css styles
import styles from "./index.module.css";

// next
import Link from "next/link";

// other libraries
import { cn } from "@/lib/utils";
import PathFinder from "@/lib/PathFinder";

// components
import { Tooltip, TooltipContent, TooltipTrigger } from "@/components/ui/tooltip";
import ByCategory from "./ByCategory";
import SearchPanel from "./SearchPanel";
import Paginate from "./Paginate";

// assets
import { lusitana } from "@/assets/fonts";
import { PlusCircleIcon } from "@heroicons/react/24/solid";

export default function BrowseBar() {
  return (
    <section className={cn(lusitana.className, styles["browse-bar"], "bg-base-100")}>
      <ByCategory className={styles["browse-bar__browse-by-category"]} />
      <SearchPanel className={styles["browse-bar__search-panel"]} />
      <Paginate className={styles["browse-bar__paginate"]} />
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
