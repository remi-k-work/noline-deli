// component css styles
import styles from "./BrandsTableView.module.css";

// prisma and db access
import { allBrandsWithPagination } from "../dbBrands";

// other libraries
import clsx from "clsx";
import SearchParamsState from "../SearchParamsState";

// components
import BrandsBrowseBar from "./BrandsBrowseBar";
import BrandsTableEntry from "./BrandsTableEntry";
import NotFound from "@/components/NotFound";

// assets
import { lusitana } from "@/assets/fonts";

// types
interface BrandsTableViewProps {
  searchParamsState: SearchParamsState;
}

export default async function BrandsTableView({ searchParamsState: { sortByField, sortByOrder, currentPage, keyword } }: BrandsTableViewProps) {
  // Retrieve all brands from an external source (database) using offset pagination
  const [totalItems, brands] = await allBrandsWithPagination(10, sortByField, sortByOrder, currentPage, keyword);

  if (brands.length === 0)
    return (
      <>
        <BrandsBrowseBar itemsPerPage={10} totalItems={totalItems} />
        <br />
        <NotFound message={"Brands were not found!"} />
      </>
    );

  return (
    <>
      <BrandsBrowseBar itemsPerPage={10} totalItems={totalItems} />
      <table className={styles["brands-table-view"]}>
        <thead className={clsx(lusitana.className)}>
          <tr>
            <th>&nbsp;</th>
            <th>Name</th>
            <th>Logo Url</th>
            <th>&nbsp;</th>
          </tr>
        </thead>
        <tbody>
          {brands.map((brand) => (
            <BrandsTableEntry key={brand.id} brand={brand} />
          ))}
        </tbody>
        <tfoot className={clsx(lusitana.className)}>
          <tr>
            <th>&nbsp;</th>
            <th>Name</th>
            <th>Logo Url</th>
            <th>&nbsp;</th>
          </tr>
        </tfoot>
      </table>
    </>
  );
}
