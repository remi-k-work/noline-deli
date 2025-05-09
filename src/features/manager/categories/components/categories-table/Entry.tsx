// next
import Link from "next/link";

// prisma and db access
import type { CategoryWithInfo } from "../../db";

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
  category: CategoryWithInfo;
  createdByUser?: string;
}

export default function Entry({ category }: EntryProps) {
  // Small devices (landscape phones, less than 768px)
  const isSmall = useMediaQuery("(max-width: 767.98px)");

  // Ensure the category exists
  if (!category) return null;

  const {
    id,
    name,
    _count: { subCategories, products },
    createdAt,
    updatedAt,
  } = category;

  return (
    <TableRow className="odd:bg-surface-3 even:bg-surface-4">
      <TableCell>
        <Link href={PathFinder.toCategoryEdit(id)} className="link" scroll={false}>
          {name}
        </Link>
      </TableCell>
      <TableCell className="text-center">{subCategories}</TableCell>
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
        <Actions categoryId={id} categoryName={name} />
      </TableCell>
    </TableRow>
  );
}
