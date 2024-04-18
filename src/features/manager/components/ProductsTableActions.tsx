// component css styles
import styles from "./ProductsTableActions.module.css";

// other libraries
import clsx from "clsx";
import { EllipsisVerticalIcon, PencilIcon, TrashIcon } from "@heroicons/react/24/solid";

export default function ProductsTableActions() {
  return (
    <div className="dropdown dropdown-left">
      <div tabIndex={0} role="button" className="btn btn-circle btn-ghost">
        <EllipsisVerticalIcon width={24} height={24} />
      </div>
      <ul tabIndex={0} className={clsx(styles["products-table-actions"], "dropdown-content -translate-y-1/4")}>
        <li className="btn">
          <PencilIcon width={24} height={24} />
          Edit
        </li>
        <li className="btn">
          <TrashIcon width={24} height={24} />
          Delete
        </li>
      </ul>
    </div>
  );
}
