// other libraries
import { useTanTableInstanceContext } from "@/features/manager/products/stores/tan-table-instance";

export default function ByContext({ ...props }) {
  const {
    tableState: { currentBrand, currentCategory, currentSubCategory, isSearchMode, isBrowsingAll },
  } = useTanTableInstanceContext();

  if (isSearchMode) return <footer {...props}>Search Results</footer>;
  if (isBrowsingAll) return <footer {...props}>All Products</footer>;

  return (
    <footer {...props}>
      {currentBrand ? (
        <p>
          By Brand
          <br />
          <small>{currentBrand}</small>
        </p>
      ) : currentCategory && !currentSubCategory ? (
        <p>
          By Category
          <br />
          <small>{currentCategory}</small>
        </p>
      ) : (
        <p>
          By SubCategory
          <br />
          <small>
            {currentSubCategory}
            <br />
            {currentCategory}
          </small>
        </p>
      )}
    </footer>
  );
}
