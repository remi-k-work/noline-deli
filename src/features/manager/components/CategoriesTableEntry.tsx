// component css styles
import styles from "./CategoriesTableEntry.module.css";

// next
import Link from "next/link";

// prisma and db access
import { CategoryWithUser } from "../dbCategories";
import { getCreatedByUser } from "../dbAccess";

// other libraries
import clsx from "clsx";
import PathFinder from "../PathFinder";

// components
import CategoriesTableActions from "./CategoriesTableActions";

// types
interface CategoriesTableEntryProps {
  category: CategoryWithUser;
}

export default function CategoriesTableEntry({ category }: CategoriesTableEntryProps) {
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
    <tr className={clsx(styles["categories-table-entry"], { "text-base-content": role === "ADMIN" || createdBy !== getCreatedByUser() })}>
      <td>
        <Link href={PathFinder.toCategoryEdit(id)}>{name}</Link>
      </td>
      <td>
        <CategoriesTableActions categoryId={id} categoryName={name} />
      </td>
    </tr>
  );
}
