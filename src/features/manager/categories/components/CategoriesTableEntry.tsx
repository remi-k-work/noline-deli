// next
import Link from "next/link";

// prisma and db access
import { CategoryWithUser } from "../db";

// other libraries
import { cn } from "@/lib/utils";
import PathFinder from "../../PathFinder";

// components
import { TableCell, TableRow } from "@/components/ui/table";
import CategoriesTableActions from "./CategoriesTableActions";

// types
interface CategoriesTableEntryProps {
  category: CategoryWithUser;
  createdByUser?: string;
}

export default function CategoriesTableEntry({ category, createdByUser }: CategoriesTableEntryProps) {
  // Ensure the category exists
  if (!category) {
    // To prevent receiving the "cannot destructure property of undefined" exception, do not attempt to render anything
    return null;
  }

  const {
    id,
    name,
    createdBy,
    user: { role },
  } = category;

  return (
    <TableRow
      className={cn("odd:bg-[--surface-3] even:bg-[--surface-4]", {
        "text-error": role === "ADMIN" || createdBy !== createdByUser,
      })}
    >
      <TableCell>
        <Link href={PathFinder.toCategoryEdit(id)} className="link-hover link">
          {name}
        </Link>
      </TableCell>
      <TableCell>
        <CategoriesTableActions categoryId={id} categoryName={name} />
      </TableCell>
    </TableRow>
  );
}
