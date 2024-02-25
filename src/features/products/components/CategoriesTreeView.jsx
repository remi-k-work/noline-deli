// component css styles
import styles from "./CategoriesTreeView.module.css";

// next
import Link from "next/link";

// other libraries
import clsx from "clsx";

export default function CategoriesTreeView({ categories = [] }) {
  if (categories.length === 0) {
    return null;
  }

  // Create a product category tree in the format specified by this component:
  // [{ label: "", href: "", subCategories: [{ label: "", href: "", subCategories: [{ ... }] }] }]
  const productCategories = [];
  for (const { name: categoryName, subCategories } of categories) {
    productCategories.push({ label: categoryName, href: `/products/${encodeURIComponent(categoryName)}/`, subCategories: [] });
    for (const { name: subCategoryName } of subCategories) {
      productCategories.at(-1).subCategories.push({
        label: subCategoryName,
        href: `/products/${encodeURIComponent(categoryName)}/${encodeURIComponent(subCategoryName)}`,
        subCategories: [],
      });
    }
  }
  const categoriesList = [{ label: "All Products", href: "/products", subCategories: productCategories }];

  return (
    <article className={clsx(styles["categories-tree-view"], "menu rounded-box bg-base-200")}>
      <CategoriesList categoriesList={categoriesList} />
    </article>
  );
}

function CategoriesList({ categoriesList = [] }) {
  if (categoriesList.length === 0) {
    return null;
  }

  return (
    <ul className={styles["categories-list"]}>
      {categoriesList.map((categoriesItem, index) => (
        <CategoriesItem key={index} categoriesItem={categoriesItem} />
      ))}
    </ul>
  );
}

function CategoriesItem({ categoriesItem }) {
  // Ensure the categories item exists
  if (!categoriesItem) {
    // To prevent receiving the "cannot destructure property of undefined" exception, do not attempt to render anything
    return null;
  }

  const { label, href, subCategories = [] } = categoriesItem;

  return (
    <li className={styles["categories-item"]}>
      {subCategories.length > 0 ? (
        <details open>
          <summary>{label}</summary>
          <CategoriesList categoriesList={subCategories} />
        </details>
      ) : (
        <Link href={href}>{label}</Link>
      )}
    </li>
  );
}
