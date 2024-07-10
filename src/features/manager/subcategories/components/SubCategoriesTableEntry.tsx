// next
import Link from "next/link";

// prisma and db access
import { SubCategoryWithUser } from "../../categories/db";

// other libraries
import { cn } from "@/lib/utils";
import PathFinder from "../../PathFinder";

// components
import { TableCell, TableRow } from "@/components/ui/table";
import SubCategoriesTableActions from "./SubCategoriesTableActions";

// types
interface SubCategoriesTableEntryProps {
  subCategory: SubCategoryWithUser;
  createdByUser?: string;
}

export default function SubCategoriesTableEntry({ subCategory, createdByUser }: SubCategoriesTableEntryProps) {
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
      <TableCell>
        <SubCategoriesTableActions subCategoryId={id} subCategoryName={name} parentCategoryName={parentCategoryName} />
      </TableCell>
    </TableRow>
  );
}
