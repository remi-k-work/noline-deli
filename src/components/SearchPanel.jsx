"use client";

// component css styles
import styles from "./SearchPanel.module.css";

// next
import { useSearchParams, useRouter } from "next/navigation";

// other libraries
import clsx from "clsx";
import { useDebouncedCallback } from "use-debounce";
import { MagnifyingGlassCircleIcon } from "@heroicons/react/24/solid";

export default function SearchPanel() {
  const searchParams = useSearchParams();
  const { replace } = useRouter();

  const handleSearch = useDebouncedCallback((keyword) => {
    const params = new URLSearchParams();
    if (keyword) {
      params.set("keyword", keyword);
    } else {
      params.delete("keyword");
    }
    replace(`/products/search?${params.toString()}`);
  }, 600);

  return (
    <label className={clsx(styles["search-panel"], "input input-bordered")}>
      <input
        type="search"
        name="search"
        size={25}
        maxLength={50}
        aria-label="Search"
        placeholder="Search"
        className="grow"
        onChange={(ev) => handleSearch(ev.target.value)}
        defaultValue={searchParams.get("keyword")?.toString()}
      />
      <MagnifyingGlassCircleIcon width={24} height={24} />
    </label>
  );
}
