"use client";

// react
import { forwardRef } from "react";

// other libraries
import { useTanTableInstanceContext } from "../../../stores/tan-table-instance";

const ByContext = forwardRef<HTMLElement>(({ ...props }, ref) => {
  const {
    tableState: { currentCategory, currentSubCategory, isSearchMode, isBrowsingAll },
  } = useTanTableInstanceContext();

  if (isSearchMode)
    return (
      <footer ref={ref} {...props}>
        Search Results
      </footer>
    );

  if (isBrowsingAll)
    return (
      <footer ref={ref} {...props}>
        All Products
      </footer>
    );

  return (
    <footer ref={ref} {...props}>
      {currentCategory && !currentSubCategory ? (
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
});
ByContext.displayName = "ByContext";

export default ByContext;
