// component css styles
import styles from "./SubCategoriesTableEntry.module.css";

// next
import Link from "next/link";

// prisma and db access
import { SubCategoryWithUser } from "../dbCategories";
import { getCreatedByUser } from "../dbAccess";

// other libraries
import clsx from "clsx";
import PathFinder from "../PathFinder";

// components
import SubCategoriesTableActions from "./SubCategoriesTableActions";

// types
interface SubCategoriesTableEntryProps {
  subCategory: SubCategoryWithUser;
}

export default function SubCategoriesTableEntry({ subCategory }: SubCategoriesTableEntryProps) {
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
    <tr className={clsx(styles["subcategories-table-entry"], { "text-base-content": role === "ADMIN" || createdBy !== getCreatedByUser() })}>
      <td>
        <Link href={PathFinder.toSubCategoryEdit(id)} className="link-hover link">
          {name}
        </Link>
      </td>
      <td>{parentCategoryName}</td>
      <td>
        <SubCategoriesTableActions subCategoryId={id} subCategoryName={name} parentCategoryName={parentCategoryName} />
      </td>
    </tr>
  );
}
