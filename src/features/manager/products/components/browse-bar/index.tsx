"use client";

// component css styles
import styles from "./index.module.css";

// next
import Link from "next/link";

// other libraries
import { cn } from "@/lib/utils";
import PathFinder from "@/lib/PathFinder";

// components
import { Button } from "@/components/ui/custom/button";
import { Tooltip, TooltipContent, TooltipTrigger } from "@/components/ui/tooltip";
import BrowseBy from "./browse-by";
import SearchPanel from "./SearchPanel";
import Paginate from "./Paginate";

// assets
import { PlusCircleIcon } from "@heroicons/react/24/solid";

export default function BrowseBar() {
  return (
    <section className={cn("font-lusitana", styles["browse-bar"])}>
      <BrowseBy className={styles["browse-bar__browse-by"]} />
      <SearchPanel className={styles["browse-bar__search-panel"]} />
      <Paginate className={styles["browse-bar__paginate"]} />
      <footer className={styles["browse-bar__new-product"]}>
        <Tooltip>
          <TooltipTrigger asChild>
            <Button type="button" size="icon" variant="outline" asChild>
              <Link href={PathFinder.toProductNew()} scroll={false}>
                <PlusCircleIcon width={24} height={24} />
              </Link>
            </Button>
          </TooltipTrigger>
          <TooltipContent>
            <p>Create a new product</p>
          </TooltipContent>
        </Tooltip>
      </footer>
    </section>
  );
}
