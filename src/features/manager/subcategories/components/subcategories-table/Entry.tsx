// next
import Link from "next/link";

// prisma and db access
import type { SubCategoryWithInfo } from "@/features/manager/categories/db";

// other libraries
import PathFinder from "@/lib/PathFinder";
import useMediaQuery from "@/hooks/useMediaQuery";
import { formatDistanceToNow } from "date-fns";

// components
import { TableCell, TableRow } from "@/components/ui/custom/table";
import Actions from "./Actions";

// assets
import { ClockIcon } from "@heroicons/react/24/solid";

// types
interface EntryProps {
  subCategory: SubCategoryWithInfo;
  createdByUser?: string;
}

export default function Entry({ subCategory, createdByUser }: EntryProps) {
  // Small devices (landscape phones, less than 768px)
  const isSmall = useMediaQuery("(max-width: 767.98px)");

  // Ensure the subcategory exists
  if (!subCategory) return null;

  const {
    id,
    name,
    createdBy,
    category: { name: parentCategoryName },
    user: { role },
    _count: { products },
    createdAt,
    updatedAt,
  } = subCategory;

  return (
    <TableRow className="odd:bg-(--surface-3) even:bg-(--surface-4)">
      <TableCell>
        <Link href={PathFinder.toSubCategoryEdit(id)} className="link" scroll={false}>
          {name}
        </Link>
      </TableCell>
      <TableCell>{parentCategoryName}</TableCell>
      <TableCell className="text-center">{products}</TableCell>
      {!isSmall && (
        <TableCell className="text-center">
          <span className="m-auto flex w-fit items-center gap-2">
            <ClockIcon width={24} height={24} className="min-w-max" />
            {formatDistanceToNow(createdAt)} ago
          </span>
          <hr className="border-dotted" />
          <span className="m-auto flex w-fit items-center gap-2">
            <ClockIcon width={24} height={24} className="min-w-max" />
            {formatDistanceToNow(updatedAt)} ago
          </span>
        </TableCell>
      )}
      <TableCell>
        <Actions subCategoryId={id} subCategoryName={name} parentCategoryName={parentCategoryName} />
      </TableCell>
    </TableRow>
  );
}
