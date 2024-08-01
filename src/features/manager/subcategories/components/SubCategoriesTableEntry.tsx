// next
import Link from "next/link";

// prisma and db access
import { SubCategoryWithInfo } from "../../categories/db";

// other libraries
import { cn } from "@/lib/utils";
import PathFinder from "../../PathFinder";
import useMediaQuery from "@/lib/useMediaQuery";
import { formatDistanceToNow } from "date-fns";
import { ClockIcon } from "@heroicons/react/24/solid";

// components
import { TableCell, TableRow } from "@/components/ui/table";
import SubCategoriesTableActions from "./SubCategoriesTableActions";

// types
interface SubCategoriesTableEntryProps {
  subCategory: SubCategoryWithInfo;
  createdByUser?: string;
}

export default function SubCategoriesTableEntry({ subCategory, createdByUser }: SubCategoriesTableEntryProps) {
  // Small devices (landscape phones, less than 768px)
  const isSmall = useMediaQuery("(max-width: 767.98px)");

  // Ensure the subcategory exists
  if (!subCategory) {
    // To prevent receiving the "cannot destructure property of undefined" exception, do not attempt to render anything
    return null;
  }

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
    <TableRow
      className={cn("odd:bg-[--surface-3] even:bg-[--surface-4]", {
        "text-error": role === "ADMIN" || createdBy !== createdByUser,
      })}
    >
      <TableCell>
        <Link href={PathFinder.toSubCategoryEdit(id)} className="link-hover link">
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
        <SubCategoriesTableActions subCategoryId={id} subCategoryName={name} parentCategoryName={parentCategoryName} />
      </TableCell>
    </TableRow>
  );
}
