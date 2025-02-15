// component css styles
import styles from "./Header.module.css";

// react
import { useEffect, useState } from "react";

// other libraries
import { cn } from "@/lib/utils";
import useSearchParamsState from "@/hooks/useSearchParamsState";
import { useDebouncedCallback } from "use-debounce";

// components
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";

// assets
import { QueueListIcon, TableCellsIcon, ArrowsUpDownIcon } from "@heroicons/react/24/solid";

// types
interface HeaderProps {
  totalProducts: number;
}

interface HeaderSkeletonProps {
  isListMode?: boolean;
  sortBy: string;
}

export default function Header({ totalProducts }: HeaderProps) {
  const { isListMode, sortBy, productsListViewModeChanged, productsListSortByChanged } = useSearchParamsState();
  const [currIsListMode, setCurrIsListMode] = useState(isListMode ?? false);
  const [currSortBy, setCurrSortBy] = useState(sortBy);

  useEffect(() => {
    // Keep the is list mode and sort by in sync with search params
    setCurrIsListMode(isListMode ?? false);
    setCurrSortBy(sortBy);
  }, [isListMode, sortBy]);

  const handleViewModeChanged = useDebouncedCallback((isListMode: boolean) => productsListViewModeChanged(isListMode), 600);
  const handleSortByChanged = useDebouncedCallback((sortBy: string) => productsListSortByChanged(sortBy), 600);

  return (
    <header className={cn(styles["header"], "mb-4 flex w-full flex-wrap items-center justify-end gap-4")}>
      <Label className="flex flex-none items-center gap-2">
        <TableCellsIcon width={24} height={24} />
        <Switch
          name="viewMode"
          checked={currIsListMode}
          onCheckedChange={(isListMode) => {
            setCurrIsListMode(isListMode);
            handleViewModeChanged(isListMode);
          }}
        />
        <QueueListIcon width={24} height={24} />
      </Label>
      <span className="flex-1 text-end">{totalProducts} Product(s) Found</span>
      <Label className="flex flex-initial basis-48 items-center gap-1">
        <ArrowsUpDownIcon width={24} height={24} />
        <Select
          name="sortBy"
          value={currSortBy}
          onValueChange={(sortBy) => {
            setCurrSortBy(sortBy);
            handleSortByChanged(sortBy);
          }}
        >
          <SelectTrigger>
            <SelectValue placeholder="Sort By" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="id,desc">Date (Newest)</SelectItem>
            <SelectItem value="id,asc">Date (Oldest)</SelectItem>
            <SelectItem value="price,asc">Price (Lowest)</SelectItem>
            <SelectItem value="price,desc">Price (Highest)</SelectItem>
            <SelectItem value="name,asc">Name (A to Z)</SelectItem>
            <SelectItem value="name,desc">Name (Z to A)</SelectItem>
          </SelectContent>
        </Select>
      </Label>
    </header>
  );
}

export function HeaderSkeleton({ isListMode, sortBy }: HeaderSkeletonProps) {
  return (
    <header className={cn(styles["header-skeleton"], "mb-4 flex w-full flex-wrap items-center justify-end gap-4")}>
      <Label className="flex flex-none items-center gap-2">
        <TableCellsIcon width={24} height={24} />
        <Switch name="viewMode" defaultChecked={isListMode ?? false} disabled />
        <QueueListIcon width={24} height={24} />
      </Label>
      <span className="flex-1 text-end">... Product(s) Found</span>
      <Label className="flex flex-initial basis-48 items-center gap-1">
        <ArrowsUpDownIcon width={24} height={24} />
        <Select name="sortBy" defaultValue={sortBy} disabled>
          <SelectTrigger>
            <SelectValue placeholder="Sort By" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="id|desc">Date (Newest)</SelectItem>
            <SelectItem value="id|asc">Date (Oldest)</SelectItem>
            <SelectItem value="price|asc">Price (Lowest)</SelectItem>
            <SelectItem value="price|desc">Price (Highest)</SelectItem>
            <SelectItem value="name|asc">Name (A to Z)</SelectItem>
            <SelectItem value="name|desc">Name (Z to A)</SelectItem>
          </SelectContent>
        </Select>
      </Label>
    </header>
  );
}
